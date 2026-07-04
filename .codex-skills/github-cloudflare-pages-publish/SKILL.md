---
name: github-cloudflare-pages-publish
description: Publish static or mostly-static websites through a GitHub repository and GitHub-backed Cloudflare Pages. Use when Codex needs to take a local site from build-ready code to a live custom domain on Cloudflare, create or connect the GitHub repo, configure Pages build settings, bind the domain, troubleshoot deploy failures, and verify the production URL, robots.txt, and sitemap before claiming the site is live.
---

# GitHub Cloudflare Pages Publish

## Operating Rules

- Prefer GitHub-backed Cloudflare Pages for user websites unless the user explicitly asks for Direct Upload.
- Do not claim a site is live until the production URL has been checked over HTTP.
- Treat Direct Upload and GitHub-backed Pages as different project shapes. If an existing Direct Upload project blocks GitHub integration, create a new GitHub-backed Pages project rather than trying to convert it in place.
- Build locally before commit and before Cloudflare configuration. Fix local build failures first.
- Keep secrets out of commits. Check `.env*`, tokens, downloaded credentials, and local build outputs before staging.
- Remove placeholder Cloudflare bindings, KV namespaces, and environment variables before first deploy unless the real resources already exist.
- If sandbox networking blocks `gh`, `git push`, `wrangler`, or API calls, rerun the same command with escalated network access.

## Workflow

1. Preflight the repository.
   - Read `package.json`, framework config, Cloudflare config, and `.gitignore`.
   - Run the project typecheck/build command, usually `npm run build`, `pnpm run build`, or the existing repo script.
   - Confirm the expected output directory: `dist` for Astro/Vite, `out` for static Next export, or the repo's documented output.
   - Check `git status --short` and inspect staged files before committing.

2. Prepare GitHub.
   - Verify auth with `gh auth status`.
   - If no remote exists, create a repository under the user's GitHub account or organization.
   - Commit with a descriptive message, then push the production branch, usually `main`.
   - If `gh` is unavailable but git credentials work, add the HTTPS remote and push with `git push`.

3. Prepare Cloudflare Pages.
   - Verify auth with `npx wrangler whoami` or an available `CLOUDFLARE_API_TOKEN`.
   - Prefer a GitHub-connected Pages project with:
     - production branch: `main` unless the repo uses another default branch
     - build command: the local build command that passed
     - build output directory: the verified static output directory
     - root directory: repo root unless the site is in a subdirectory
   - For Astro static sites with Pages Functions, keep `functions/` at the repo root and output static assets to `dist`.
   - Add required production environment variables only after confirming their names and values.

4. Bind the custom domain.
   - Add the apex domain and `www` if the site should serve both.
   - Configure DNS through Cloudflare when the zone is available in the same account.
   - Choose one canonical host, then verify redirects/canonicals/metadata align with it.

5. Verify production.
   - Check the Cloudflare Pages deployment status or logs.
   - Fetch the Pages preview URL first if the custom domain is still propagating.
   - Fetch the custom domain with `curl -I` and a normal GET.
   - Verify `/robots.txt`, `/sitemap.xml`, key SEO pages, and at least one dynamic/API route if present.
   - If a response is stale, wait and retry before declaring failure; propagation can lag after GitHub-backed setup.

## Troubleshooting

- GitHub repo already exists: add it as `origin`, fetch cautiously, and compare before pushing. Never overwrite unrelated remote history without explicit user approval.
- Cloudflare project already exists as Direct Upload: create a new GitHub-backed Pages project or ask before replacing the old project.
- Build passes locally but Cloudflare fails: check Node version, package manager lockfile, output directory, missing env vars, and build logs.
- Custom domain returns 404 or old content: check DNS target, Pages custom domain status, canonical host, and deployment timestamp.
- `wrangler whoami` works but Git-backed project creation is not available from CLI: use the Cloudflare dashboard/API if credentials are available, or stop with a precise credential/action request.

## Final Report

Report the GitHub repo URL, Cloudflare project name, production URL, domain binding status, exact verification URLs checked, and any credentials or dashboard actions still needed. Include failed command names and the exact reason when blocked.
