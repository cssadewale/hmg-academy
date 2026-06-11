# HMG Academy v7 — Feature and Enterprise Enhancement Guide

HMG Academy v7 preserves all v6 features and adds a modern static-site platform layer, enterprise workflows and free-tool operational improvements.

## Preserved from v6

- Full CMS admin dashboard
- cPanel-like operations hub
- Supabase CMS support
- Dynamic pages through `page.html?slug=...`
- Media upload and image overrides
- Site settings and announcement bar
- CMS audit log
- Backup Center
- Tutor marketplace
- Course catalogue
- Parent dashboard
- Assignment tracker
- Attendance log
- Certificate generator
- Virtual classroom whiteboard
- Tools and LMS pages
- Enterprise suite
- Support tickets

## New in v7

### 1. Modern site-building stack
Files:

- `package.json`
- `tools/generate-search-index.mjs`
- `tools/check-links.mjs`
- `.github/workflows/static-check.yml`

Purpose:

- Allows optional Vite-based development.
- Keeps static deployment compatibility.
- Provides automated internal link checks.
- Generates search index for command palette.

### 2. PWA support
Files:

- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`

Purpose:

- Makes the site installable on supported devices.
- Caches core files for faster repeat visits.
- Provides offline fallback page.

### 3. Command palette and global search
File:

- `assets/js/v7-modern.js`

Purpose:

- Press `Ctrl/⌘ + K` to search pages and launch actions.
- Uses `search-index.json`.
- Provides a modern app-like navigation experience.

### 4. Theme quick controls
File:

- `assets/js/v7-modern.js`

Purpose:

- Local user theme customization.
- Accent color, font size and density controls.
- Saves preference in localStorage.

### 5. System Status
Page:

- `system-status.html`

Purpose:

- Checks hosting mode, service worker support, localStorage and Supabase configuration.
- Helps admins know whether the platform is production-ready.

### 6. Integrations Hub
Page:

- `integrations.html`

Purpose:

- Documents free-tool integrations: Supabase, GitHub, Cloudflare, WhatsApp, Vercel, Streamlit and browser APIs.

### 7. Bulk Import Studio
Page:

- `bulk-import.html`

Purpose:

- Browser-based CSV parsing for pages, courses, tutors, learners and assignments.
- Exports JSON for review/import workflows.
- Saves parsed data locally for admin review.

### 8. Page Builder
Page:

- `page-builder.html`

Purpose:

- Block-based page content builder.
- Generates HTML for the CMS editor.
- Free alternative to paid page builders.

### 9. Theme Studio
Page:

- `theme-studio.html`

Purpose:

- Generate CSS design tokens for HMG brand themes.
- Supports brand consistency without paid design systems.

### 10. Governance and Security
Page:

- `governance.html`

Purpose:

- Documents privacy, access control, backups, incident response and no-AI-API policy.

### 11. Data Room
Page:

- `data-room.html`

Purpose:

- Central documentation hub for partners, schools and internal deployment teams.

### 12. Modern Stack Page
Page:

- `modern-stack.html`

Purpose:

- Explains Vite, PWA, GitHub Actions, Supabase and static-first deployment.

## No paid AI API policy

HMG Academy v7 does not use paid AI APIs. The platform avoids recurring API costs and protects cost discipline. Human educators remain responsible for content, pedagogy, feedback and decisions.

## Storage approach

- localStorage for local demos and personal settings.
- Supabase free tier for CMS, backup and media when configured.
- JSON export/import for offline resilience.

## Deployment approach

- Works as plain static files.
- Can be developed with Vite.
- Can be hosted on GitHub Pages, Cloudflare Pages, Vercel or Netlify free tiers.
