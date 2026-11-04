# LinkVault Deployment Guide for GitHub Pages

Deploying LinkVault to GitHub Pages is completely free, automated, and requires zero servers or third-party paid accounts.

---

## 1. Quick Setup (Automated GitHub Actions)

LinkVault includes an enterprise-grade GitHub Actions workflow in `.github/workflows/deploy.yml`.

### Step 1: Enable GitHub Pages in your Repository Settings
1. Navigate to your repository on GitHub: `https://github.com/<your-username>/<repo-name>`.
2. Go to **Settings** → **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`.

### Step 2: Push your Changes
Whenever you push to the `main` branch, GitHub Actions will automatically:
1. Run profile schema validation (`npm run validate`).
2. Run TypeScript type checks (`npm run typecheck`).
3. Run Vitest unit tests (`npm run test`).
4. Build the production static site (`npm run build`).
5. Deploy the compiled assets directly to GitHub Pages.

---

## 2. Base Path Handling

GitHub Pages hosts sites under two structures:

1. **User / Organization Site**: `https://<username>.github.io`
   - Repository name: `<username>.github.io`
   - Base Path: `/`
2. **Project Site**: `https://<username>.github.io/<repo-name>`
   - Repository name: `<repo-name>` (e.g. `LinkVault`)
   - Base Path: `/<repo-name>/` (e.g. `/LinkVault/`)

LinkVault's `vite.config.ts` automatically detects the repository type via `process.env.GITHUB_REPOSITORY` in CI and configures the base path seamlessly!

### Custom Base Path Override
If you want to manually specify a custom base path, you can set the `VITE_BASE_PATH` environment variable:
```bash
VITE_BASE_PATH=/my-custom-path/ npm run build
```

---

## 3. Configuring a Custom Domain (Optional)

To use your own domain (e.g. `links.yourname.com` or `yourname.dev`):

1. Go to **Settings** → **Pages** → **Custom domain**.
2. Enter your domain (e.g., `id.yourdomain.com`).
3. In your DNS provider (Cloudflare, Namecheap, Route53, etc.), add:
   - For a subdomain: A `CNAME` record pointing to `<username>.github.io`.
   - For an apex domain: Four `A` records pointing to GitHub's IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
4. Enable **Enforce HTTPS** in GitHub Pages settings.

---

## 4. Production Security Guarantees

When deployed to GitHub Pages:
- The local visual Studio is **strictly excluded** from the static build.
- No file write APIs exist on static GitHub Pages.
- No private credentials or secrets are packaged.
- Outbound links enforce `rel="noopener noreferrer"`.
