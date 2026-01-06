# Complete deploy.yml with Vercel Deployment

This document provides the complete `deploy.yml` workflow configuration for deploying to Vercel when a GitHub Release is published.

Creating a markdown file with the complete `deploy.yml` configuration. Checking the existing Vercel deployment documentation first:

Reading more of the existing documentation:

Creating a focused markdown file with the complete `deploy.yml` configuration:

Created a markdown file at `docs/DEPLOY_YML_COMPLETE.md` with:

1. **Complete `deploy.yml` configuration** — ready to copy
2. **How it works** — workflow explanation
3. **Workflow flow diagram** — visual representation
4. **Required GitHub Secrets** — setup instructions
5. **Alternative methods** — getting Vercel IDs via CLI
6. **Workflow features** — what it includes
7. **Testing instructions** — how to test
8. **Troubleshooting** — common issues and solutions
9. **Related workflows** — context about other workflows

The file includes the complete `deploy.yml` configuration with Vercel deployment steps, plus setup and troubleshooting guidance.

You can copy the YAML configuration from the file and use it to update your `.github/workflows/deploy.yml` file.

## Complete deploy.yml Configuration

```yaml
name: Deploy

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
```

## How It Works

1. **Trigger**: The workflow runs automatically when a GitHub Release is published
2. **Build**: Installs dependencies and builds the project
3. **Deploy**: Deploys the built application to Vercel production environment

## Workflow Flow

```
Tag Push (v1.0.0)
    ↓
release.yml runs → Creates GitHub Release
    ↓
Release Published Event
    ↓
deploy.yml runs → Deploys to Vercel Production
```

## Required GitHub Secrets

Before using this workflow, you need to add the following secrets to your GitHub repository:

### 1. VERCEL_TOKEN
- Go to [Vercel Account Settings](https://vercel.com/account/tokens)
- Create a new token
- Copy the token and add it as `VERCEL_TOKEN` in GitHub Secrets

### 2. VERCEL_ORG_ID
- Run: `vercel whoami` or check your Vercel dashboard
- Or use: `vercel link` and check `.vercel/project.json`
- Add the Organization ID as `VERCEL_ORG_ID`

### 3. VERCEL_PROJECT_ID
- Run: `vercel link` in your project directory
- Check `.vercel/project.json` for the project ID
- Add it as `VERCEL_PROJECT_ID`

### How to Add Secrets in GitHub

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with its corresponding value

## Alternative: Get IDs via Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Link your project
vercel link

# Check the project.json file
cat .vercel/project.json
```

The file will contain:
```json
{
  "orgId": "your-org-id",
  "projectId": "your-project-id"
}
```

## Workflow Features

- ✅ **Automatic deployment** on release publish
- ✅ **Production deployment** using `--prod` flag
- ✅ **Cached dependencies** for faster builds
- ✅ **Node.js 22** matching your project version
- ✅ **Clean install** using `npm ci` for reproducible builds

## Testing the Workflow

1. Create and push a tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. The `release.yml` workflow will create a GitHub Release

3. Once the release is published, `deploy.yml` will automatically:
   - Build your project
   - Deploy to Vercel production

## Troubleshooting

### Workflow not triggering
- Ensure the release is **published** (not draft)
- Check that the tag format matches `v*` pattern
- Verify GitHub Actions are enabled for your repository

### Deployment fails
- Verify all three secrets are correctly set
- Check Vercel token has proper permissions
- Ensure project is linked in Vercel dashboard
- Review workflow logs in GitHub Actions tab

### Build errors
- Ensure `package.json` has a `build` script
- Check Node.js version matches your project requirements
- Verify all dependencies are listed in `package.json`

## Notes

- This workflow complements Vercel's auto-deployment from `main` branch
- Releases provide versioned deployments separate from continuous deployment
- The `--prod` flag ensures deployment to production environment
- Build artifacts are created fresh for each deployment

## Related Workflows

- **ci.yml**: Runs on push to `main` and PRs (lint, typecheck, test, build)
- **release.yml**: Creates GitHub Release when tag is pushed
- **deploy.yml**: Deploys to Vercel when release is published (this file)

