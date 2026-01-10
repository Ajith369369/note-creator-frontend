# Using a single `isLoading` boolean causes all buttons to show "Loading...". Tracking the specific note ID being loaded instead:

Checking for linting errors:

Reading the file to check its current state:

The file looks correct. Rechecking lints to confirm they're resolved:

All changes are complete and there are no linting errors.

**Summary of changes:**

1. Changed `isLoading` from a boolean to `loadingNoteId` (string | null) to track which specific note is loading
2. Updated `handleNavigateToView` to:
   - Set `loadingNoteId` to the specific note's `_id` when loading starts
   - Reset it to `null` when loading completes
   - Added a check to return early if the note doesn't have an `_id`
3. Updated the button to check `loadingNoteId === note._id` instead of a global `isLoading` state
4. Updated the loading spinner condition to check `loadingNoteId` instead of `isLoading`

Now, when you click "Read More" on a specific note:
- Only that button shows "Loading..." and is disabled
- Other "Read More" buttons remain enabled and show "Read More"
- The loading spinner appears only when navigating to that specific note

This ensures each note's loading state is tracked independently.
