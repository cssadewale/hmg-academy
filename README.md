# HMG Academy v9 — Enterprise EdTech Platform and Operations Suite

HMG Academy v9 is the enhanced enterprise version of the HMG Academy platform.

It preserves all v8 features and adds a stronger operations layer for admissions, finance, scheduling, notifications, content governance, reports, security and school onboarding.

## Architecture

HMG Academy v9 continues the recommended architecture:

> Static-first JAMstack EdTech platform + Supabase CMS + PWA + LMS gateway + tutor marketplace + enterprise school portal.

## Core principle

> Free-based tools first. No paid AI APIs. No unnecessary recurring costs.

## What v9 adds

### Enterprise operations pages

- `operations-suite.html` — central enterprise operations hub
- `admissions-crm.html` — lead/enrolment pipeline board
- `finance-center.html` — quote and invoice generator
- `timetable-planner.html` — weekly class/session timetable
- `notification-center.html` — reminder and notification tracker
- `content-workflow.html` — content approval workflow
- `form-builder-v9.html` — WhatsApp-ready form generator
- `reports-center.html` — report templates for parents/schools/tutors/admin
- `security-center.html` — security, backups and access matrix
- `api-docs.html` — Supabase REST/API guidance
- `school-onboarding.html` — school onboarding wizard

### Enterprise JavaScript

- `assets/js/v9-enterprise.js`

This powers:

- CRM pipeline
- Invoice generator
- Timetable planner
- Notification list
- Form builder
- Approval workflow
- Local operations export

### Enterprise documentation

- `docs/V9_ENTERPRISE_FEATURES.md`
- `docs/V9_OPERATIONS_PLAYBOOK.md`

## Preserved from v8

- Static-first platform architecture
- PWA support
- Command palette and search
- Admin dashboard and CMS
- cPanel-like control panel
- Supabase CMS support
- Role portals: student, parent, tutor, school
- Course player
- School OS
- Platform data model
- Tutor marketplace
- LMS gateway
- Tools and projects
- Backup Center
- Analytics
- Page Builder
- Theme Studio
- Bulk Import
- Governance and Data Room

## Modern site-building tools

v9 includes:

- Vite-ready `package.json`
- `vite.config.js`
- `.editorconfig`
- GitHub Actions static check workflow
- Node search index generator
- Node link checker
- PWA manifest and service worker
- Modular JavaScript architecture

## No paid AI API

HMG Academy v9 does not use paid AI APIs. All features are powered by:

- Static HTML/CSS/JS
- Browser APIs
- localStorage
- Supabase free tier when configured
- WhatsApp workflows
- HMG's existing LMS/CBT/DataTech tools

## Local preview

```bash
cd "academy v9"
python3 -m http.server 8000
```

Open:

`http://localhost:8000`

## Modern development

```bash
npm install
npm run dev
npm run generate:search
npm run check:links
```

## Deployment

Read:

`DEPLOYMENT.md`

## Recommended first pages to review

- `index.html`
- `platform.html`
- `operations-suite.html`
- `admissions-crm.html`
- `finance-center.html`
- `school-os.html`
- `admin.html`
- `cpanel.html`
- `security-center.html`
- `reports-center.html`

## Zip package

The downloadable package is:

`academy v9.zip`
