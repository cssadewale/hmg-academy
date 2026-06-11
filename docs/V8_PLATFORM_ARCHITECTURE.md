# HMG Academy v8 — Platform Architecture

## Expert recommendation implemented

HMG Academy v8 follows this recommended architecture:

> Static-first JAMstack EdTech platform + Supabase CMS + PWA + LMS gateway + tutor marketplace + enterprise school portal.

## Architecture layers

### 1. Static-first frontend

Files:

- HTML pages
- `assets/css/styles.css`
- Vanilla JavaScript modules
- PWA manifest and service worker

Benefits:

- Fast
- Secure
- Free hosting
- Easy GitHub/Cloudflare deployment
- Low maintenance

### 2. Modern tooling layer

Files:

- `package.json`
- Vite scripts
- Search index generator
- Link checker
- GitHub Actions workflow

Purpose:

- Modern local development
- Static checks
- Search index generation
- Optional build output

### 3. CMS layer

Files:

- `admin.html`
- `page.html`
- `assets/js/admin.js`
- `assets/js/cms-loader.js`
- Supabase CMS tables

Purpose:

- Create pages
- Edit pages
- Change pictures
- Manage navigation
- Manage announcements
- Publish/unpublish content instantly

### 4. Platform data layer

Files:

- `assets/js/platform.js`
- `assets/js/portal-v8.js`
- `docs/SUPABASE_PLATFORM_SCHEMA.md`

Purpose:

- Role portals
- Courses
- Lessons
- Enrolments
- Assignments
- Attendance
- Grades
- Certificates
- Messages
- School data

### 5. PWA layer

Files:

- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`

Purpose:

- Installable app-like experience
- Core file caching
- Offline fallback

### 6. HMG ecosystem/LMS layer

Pages:

- `lms.html`
- `tools.html`
- External HMG LMS URLs
- External HMG EdTech/DataTech tools

Purpose:

- Keep existing HMG platforms linked and organized
- Avoid rebuilding every LMS inside one site
- Maintain free hosting strategy

### 7. Enterprise school layer

Pages:

- `school-portal.html`
- `school-os.html`
- `enterprise.html`
- `analytics.html`
- `platform-admin.html`

Purpose:

- School rollout
- Teacher training
- CBT/LMS deployment
- Progress reporting
- Multi-role governance

## No paid AI API

HMG Academy v8 does not use paid AI APIs. The platform avoids recurring AI costs and keeps human educators in control.

## Deployment model

Recommended:

- Cloudflare Pages or GitHub Pages for static frontend
- Supabase free tier for CMS/data/storage/auth
- WhatsApp for enquiries and support
- GitHub for version control

## Why this architecture is best for HMG Academy

It gives HMG Academy:

- Free hosting
- Admin editing
- Role portals
- PWA features
- LMS gateway
- Tutor marketplace
- School enterprise features
- Upgrade path to a real multi-user platform
- No paid AI API costs
