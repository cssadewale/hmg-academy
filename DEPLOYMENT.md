# HMG Academy v9 — Deployment Guide

This guide explains how to deploy HMG Academy v9, the enterprise EdTech platform and operations suite.

## What v9 contains

- Static-first public website
- Admin CMS dashboard
- cPanel-like operations hub
- PWA support
- Role portals
- LMS gateway
- Tutor marketplace
- Enterprise school portal
- Admissions CRM
- Finance/invoice center
- Timetable planner
- Notification center
- Content workflow
- Reports center
- Security center
- School onboarding wizard
- Supabase-ready CMS and platform data layer

## Free tools used

- GitHub Pages or Cloudflare Pages
- Supabase free tier
- GitHub Actions
- Vite
- Browser APIs
- WhatsApp links

## Not used

- No paid AI APIs
- No paid hosting required
- No paid CMS required
- No paid CRM required
- No paid invoicing software required

---

# 1. Static deployment

## GitHub Pages

1. Open or create your GitHub repository.
2. Upload the **contents** of `academy v9` to the repository root.
3. Ensure `index.html` is in the root.
4. Commit with message:

`Deploy HMG Academy v9 enterprise platform`

5. Go to **Settings** → **Pages**.
6. Source: Deploy from branch.
7. Branch: `main`.
8. Folder: `/root`.
9. Save and wait for deployment.

## Cloudflare Pages

1. Push the files to GitHub.
2. Go to Cloudflare Dashboard.
3. Open **Workers & Pages**.
4. Create Pages project.
5. Connect your repository.
6. For raw static deployment:
   - Framework: None
   - Build command: blank
   - Output directory: `/`
7. Deploy.

## Vite deployment option

If using Vite build:

```bash
npm install
npm run build
```

Then deploy the `dist` folder.

For HMG Academy, raw static deployment is still the simplest.

---

# 2. Supabase CMS setup

Do this if you want live admin edits visible to all users.

1. Create Supabase free project.
2. Create admin user under Authentication.
3. Run CMS SQL from:

`docs/SUPABASE_CMS_SETUP.md`

4. Create public Storage bucket:

`hmg-media`

5. Update:

`assets/js/config.js`

Replace:

```js
window.HMG_SUPABASE = null;
```

With:

```js
window.HMG_SUPABASE = {
  url: "https://YOUR_PROJECT_ID.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY",
  table: "hmg_backup_storage"
};
```

6. Redeploy.
7. Login to `admin.html`.
8. Create and publish a CMS page.

---

# 3. Supabase platform schema

Do this if you want real student/parent/tutor/school data.

Run:

`docs/SUPABASE_PLATFORM_SCHEMA.md`

Then configure proper RLS policies.

Recommended role rules:

- Student: own records only
- Parent: linked child records only
- Tutor: assigned learners only
- School admin: own school records only
- Super admin: all records

---

# 4. Test PWA

PWA requires HTTPS or localhost.

Test:

- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`
- Install prompt
- Offline fallback

---

# 5. Generate search index

If pages change, regenerate:

```bash
npm install
npm run generate:search
```

Commit the updated:

`search-index.json`

---

# 6. Check links

Before deployment:

```bash
npm run check:links
```

---

# 7. Enterprise feature testing

Test these pages:

- `operations-suite.html`
- `admissions-crm.html`
- `finance-center.html`
- `timetable-planner.html`
- `notification-center.html`
- `content-workflow.html`
- `form-builder-v9.html`
- `reports-center.html`
- `security-center.html`
- `api-docs.html`
- `school-onboarding.html`

Test these functions:

- Add CRM lead
- Move CRM lead through stages
- Generate invoice
- Add timetable slot
- Add notification
- Generate form HTML
- Print report
- Export operations data

---

# 8. Post-deployment checklist

1. Open `index.html`.
2. Open `platform.html`.
3. Open `operations-suite.html`.
4. Test command palette with `Ctrl/⌘ + K`.
5. Test admin dashboard.
6. Test cPanel page.
7. Test Supabase if configured.
8. Test WhatsApp forms.
9. Test LMS/tool links.
10. Test PWA install/offline.
11. Export backups.

---

# 9. Security notes

- Never expose Supabase service role key in frontend.
- Use anon key only with correct RLS.
- Keep admin password strong.
- Export backups regularly.
- Do not store highly sensitive student data in public CMS content.

---

# 10. No paid AI API policy

HMG Academy v9 does not use paid AI APIs. This keeps the platform cost-effective and aligned with HMG's free-tool discipline.
