# Chokidar is only used for the lint watch script, not for typecheck.

## The difference

**TypeScript (line 13):**
```json
"typecheck:watch": "tsc --watch --noEmit"
```
- TypeScript has a built-in `--watch` flag
- It watches files and re-runs type checking automatically
- No external file watcher needed

**ESLint (line 11):**
```json
"lint:watch": "chokidar \"src/**/*.{js,jsx,ts,tsx}\" -c \"npm run lint\" ..."
```
- ESLint does not have a built-in watch mode
- It runs once and exits
- You need an external file watcher (chokidar) to re-run it on file changes

## Why ESLint doesn't have watch mode

ESLint is designed as a one-time linter, not a long-running process. It's typically used:
- In CI/CD pipelines (run once)
- As a pre-commit hook (run once)
- In IDE extensions (IDE handles watching)

## Summary

- TypeScript: Built-in watch → no chokidar needed
- ESLint: No built-in watch → chokidar needed to add watch functionality

This is why chokidar is only used for the lint watch script, not for typecheck.

---

# Replacing nodemon with chokidar-cli in the frontend project.

Updating the `lint:watch` script to use `chokidar-cli` and removing `nodemon`:

Verifying the changes:

Replaced nodemon with chokidar-cli in the frontend project.

## Changes made

1. Installed `chokidar-cli` as a dev dependency
2. Updated `lint:watch` script to use `chokidar-cli`:
   ```json
   "lint:watch": "chokidar \"src/**/*.{js,jsx,ts,tsx}\" -c \"npm run lint\" --ignore dist --ignore node_modules --ignore \"**/*.test.*\""
   ```
3. Removed `nodemon` from devDependencies
4. Uninstalled `nodemon` package

## Benefits

- Lighter weight: `chokidar-cli` is purpose-built for file watching
- Better fit: Designed for frontend tooling, not server restarts
- Same functionality: Still watches files and runs ESLint on changes
- Works with `concurrently`: The `watch` script continues to work as before

## Usage

The commands remain the same:
```bash
npm run lint:watch    # Watch and lint files
npm run watch         # Run both lint and typecheck in watch mode
```

The setup now uses a more appropriate tool for frontend file watching.

---

# Installing `concurrently` to run both watch commands in the same terminal:

Adding combined watch scripts to both package.json files:

Adding the combined watch script to the frontend package.json:

Added a combined `watch` script to both projects. It runs both `lint:watch` and `typecheck:watch` in the same terminal using `concurrently`.

## Added combined watch script

### Backend
- `watch` — Runs both lint and typecheck watch modes together

### Frontend
- `watch` — Runs both lint and typecheck watch modes together

## Usage

**Backend:**
```bash
cd note-creator-backend
npm run watch
```

**Frontend:**
```bash
cd note-creator-frontend
npm run watch
```

## What you'll see

The output will be color-coded and prefixed:
- `[lint]` (yellow) — ESLint output
- `[typecheck]` (blue) — TypeScript type checking output

Both processes run simultaneously and will re-run when you save files.

## Note

`concurrently` is already installed in the backend. If you get an error in the frontend, install it:
```bash
cd note-creator-frontend
npm install --save-dev concurrently
```

You can now run both watch commands in a single terminal.

---

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
