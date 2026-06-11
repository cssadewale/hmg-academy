# Modern Site-Building Tools Used in HMG Academy v7

The user requested modern site-building tools while preserving free-based tools and avoiding paid AI APIs. HMG Academy v7 is therefore built as a **static-first, modern-tool-ready** project.

## 1. Static-first HTML/CSS/JavaScript

The website can still be uploaded directly to GitHub Pages or Cloudflare Pages. This is important because it keeps hosting simple and free.

## 2. Vite-ready development

`package.json` includes Vite scripts:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Vite is free and open source. It gives modern local development without forcing a complex deployment.

## 3. PWA support

Files:

- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`

Benefits:

- Installable site experience.
- Faster repeat visits.
- Offline fallback.

## 4. Search index generation

File:

- `tools/generate-search-index.mjs`

Command:

```bash
npm run generate:search
```

This creates `search-index.json` for the command palette.

## 5. Internal link checking

File:

- `tools/check-links.mjs`

Command:

```bash
npm run check:links
```

This checks missing internal references before deployment.

## 6. GitHub Actions

File:

- `.github/workflows/static-check.yml`

Purpose:

- Runs static link checks on push.
- Helps prevent broken internal references.

## 7. Supabase free tier

Used optionally for:

- CMS data
- Admin Auth
- Media Storage
- Backup Storage
- Audit Logs

Supabase is not required for local/static preview, but it enables live admin updates.

## 8. Browser APIs

The platform uses free browser capabilities:

- localStorage
- FileReader
- Canvas API
- Service Worker API
- Clipboard API
- Fetch API

## 9. No paid AI APIs

No paid AI API is used anywhere. This keeps the project cost-effective for Nigerian schools, parents and learners.

## Recommended workflow

### For quick edits
Edit HTML/CSS/JS directly and upload to GitHub.

### For modern development
Use:

```bash
npm install
npm run dev
```

### Before deployment
Run:

```bash
npm run generate:search
npm run check:links
```

Then upload or push to GitHub/Cloudflare.
