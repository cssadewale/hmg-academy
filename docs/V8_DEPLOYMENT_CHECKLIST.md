# HMG Academy v8 — Deployment Checklist

Use this checklist after deploying the v8 platform.

## Static hosting

- [ ] Upload all files to GitHub repository root or Cloudflare Pages.
- [ ] Confirm `index.html` loads.
- [ ] Confirm `manifest.webmanifest` loads.
- [ ] Confirm `service-worker.js` loads on HTTPS.
- [ ] Confirm `search-index.json` loads.
- [ ] Confirm `assets/css/styles.css` loads.

## Supabase CMS

- [ ] Create Supabase project.
- [ ] Run `docs/SUPABASE_CMS_SETUP.md` SQL.
- [ ] Create `hmg-media` public bucket.
- [ ] Update `assets/js/config.js`.
- [ ] Login to `admin.html`.
- [ ] Create and publish a CMS page.
- [ ] Confirm `page.html?slug=...` works.

## Supabase platform data

- [ ] Run `docs/SUPABASE_PLATFORM_SCHEMA.md` SQL.
- [ ] Decide RLS policy by role.
- [ ] Create test student, parent, tutor and school admin profiles.
- [ ] Test student portal.
- [ ] Test parent portal.
- [ ] Test tutor portal.
- [ ] Test school portal.

## PWA

- [ ] Test install prompt.
- [ ] Test offline fallback.
- [ ] Confirm service worker is active.

## Enterprise features

- [ ] Test cPanel checklist.
- [ ] Test Backup Center JSON export.
- [ ] Test assignment tracker.
- [ ] Test attendance log.
- [ ] Test certificate generator.
- [ ] Test page builder.
- [ ] Test bulk import preview.

## Content

- [ ] Confirm founder images display.
- [ ] Confirm HMG Academy logo displays.
- [ ] Confirm LMS links work.
- [ ] Confirm tools links work.
- [ ] Confirm WhatsApp forms open correctly.
- [ ] Confirm no paid AI API calls exist.

## Security

- [ ] Use strong Supabase admin password.
- [ ] Restrict production RLS policies.
- [ ] Do not store highly sensitive student data in public CMS pages.
- [ ] Export CMS backup regularly.
