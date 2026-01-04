Adding watch commands for lint and typecheck. Checking available tools and adding the scripts:

Adding watch commands for lint and typecheck. TypeScript has built-in watch; for ESLint we'll use nodemon (already in backend) or install it for the frontend.

Adding watch scripts to the frontend:

Fixing the frontend lint:watch command since ESLint 9 doesn't use the `--ext` flag:

Added watch commands for both projects. Summary:

## Added watch commands

### Backend (`note-creator-backend`)

1. `lint:watch` — Watches TypeScript files and runs ESLint on changes
   ```bash
   npm run lint:watch
   ```

2. `typecheck:watch` — Watches TypeScript files and runs type checking on changes
   ```bash
   npm run typecheck:watch
   ```

### Frontend (`note-creator-frontend`)

1. `lint:watch` — Watches source files and runs ESLint on changes
   ```bash
   npm run lint:watch
   ```

2. `typecheck:watch` — Watches TypeScript files and runs type checking on changes
   ```bash
   npm run typecheck:watch
   ```

## How they work

- `lint:watch`: Uses `nodemon` to watch file changes and automatically runs the lint command
- `typecheck:watch`: Uses TypeScript's built-in `--watch` flag to continuously check types

## Usage examples

**Backend:**
```bash
# Watch for linting errors
npm run lint:watch

# Watch for type errors
npm run typecheck:watch
```

**Frontend:**
```bash
# Watch for linting errors
npm run lint:watch

# Watch for type errors
npm run typecheck:watch
```

## Optional: Run both together

If you want to run both lint and typecheck in watch mode simultaneously, you can install `concurrently` and add a combined script:

```bash
npm install --save-dev concurrently
```

Then add to `package.json`:
```json
"watch:all": "concurrently \"npm run lint:watch\" \"npm run typecheck:watch\""
```

The watch commands are ready to use. They will automatically re-run when you save files, helping catch errors during development.
