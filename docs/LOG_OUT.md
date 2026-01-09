# Move `dispatch(logout())` after navigation:

Verifying the final implementation:

Changes applied.

**Summary of the fix:**

1. **Moved `dispatch(logout())` after `navigate("/")`** — Prevents `ProtectedRoute` from unmounting `Layout` before navigation completes.

2. **Clear `sessionStorage` first** — Doesn't trigger re-renders, so it's safe to do early.

3. **Navigate before dispatching logout** — Keeps `Layout` mounted so the spinner stays visible during navigation.

**How it works now:**
1. Click Log Out → `isLoggingOut` set to `true`, timer starts
2. Wait for React to render spinner (double `requestAnimationFrame` + 50ms)
3. Clear `sessionStorage` (no re-renders)
4. Wait for minimum 500ms
5. Navigate to "/" (Layout stays mounted)
6. Dispatch logout after navigation (ProtectedRoute won't interfere)

**Why this fixes the issue:**
- `ProtectedRoute` checks `isAuthenticated` from Redux
- If `logout()` is dispatched before navigation, `isAuthenticated` becomes `false` immediately
- This causes `ProtectedRoute` to redirect and unmount `Layout` before the spinner is visible
- By navigating first, then dispatching logout, `Layout` stays mounted and the spinner remains visible

The spinner should now be visible for at least 500ms before navigation, and it will stay visible during navigation because `Layout` remains mounted. No linting errors. Ready to test.

---
