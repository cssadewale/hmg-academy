# HMG Academy Production Fix — Clean Public Platform + Tutor Operations

This package is a production-focused cleanup and feature enhancement of HMG Academy.

It removes developer-facing/version-history content from the public site and improves the platform for real end users: learners, parents, tutors and schools.

## Major production fixes

### Removed from public-facing homepage

The following internal/developer sections were removed from the public homepage:

- What changed in v4
- Academy v5/v6/v7/v8/v9 version blocks
- Static architecture explanations intended for developers
- Ctrl/⌘ + K public UX note
- Immediate update model explanation
- Admin/cPanel promotional blocks

The homepage now focuses on what end users need:

- Book a tutor
- Take a free assessment
- Become a tutor
- Virtual home schooling
- Exam prep
- LMS/CBT tools
- Parent monitoring
- School partnerships

## New production features

### 1. Tutor Registration

Page:

`tutor-register.html`

Collects:

- Personal information
- Contact information
- Subjects and levels
- Qualification
- Years of experience
- Teaching bio
- Availability
- Device/internet readiness
- Bank name
- Account name
- Account number
- ID/credential reference

This is designed for Supabase storage with Row Level Security.

### 2. Tutor Jobs Board

Pages:

- `jobs.html`
- `job-apply.html`

Tutors can view open jobs and apply.

### 3. Tutor Dashboard

Page:

`tutor-dashboard.html`

Tutors can:

- Add/schedule lessons
- View assigned lessons
- Mark lessons complete
- Add lesson notes

### 4. Parent Lesson Monitoring

Page:

`parent-monitoring.html`

Parents can monitor:

- Lesson date and time
- Tutor assigned
- Subject
- Lesson status
- Tutor notes

### 5. Admin Job Posting

Page:

`admin-jobs.html`

Admin can post tutor jobs. This page is restricted/protected for admin use.

### 6. Restricted Admin and cPanel

Public admin/cPanel exposure was fixed.

Login pages:

- `admin.html`
- `cpanel.html`

Internal dashboards:

- `admin-dashboard.html`
- `cpanel-dashboard.html`

These are intended to be used with Supabase Auth credentials.

## Supabase schema

New documentation:

`docs/TUTOR_MARKETPLACE_SCHEMA.md`

Includes SQL and RLS starter policies for:

- Tutor applications
- Tutor jobs
- Job applications
- Lesson tracking

## Existing features preserved

The following remain available:

- Tutor marketplace
- Booking form
- Virtual home schooling
- Exam prep
- LMS platforms
- Tools/projects page
- Parent dashboard
- Assessment tool
- Course catalogue
- Assignment tracker
- Attendance log
- Certificate generator
- Backup Center
- Supabase CMS support
- PWA support
- School enterprise pages

## No paid AI API

No paid AI API is used. The platform continues to use free/static tools, optional Supabase free tier and WhatsApp workflows.

## Deployment

Read:

`DEPLOYMENT.md`

## Recommended live deployment steps

1. Upload this package to GitHub or Cloudflare Pages.
2. Configure Supabase using:
   - `docs/SUPABASE_CMS_SETUP.md`
   - `docs/TUTOR_MARKETPLACE_SCHEMA.md`
3. Update `assets/js/config.js` with Supabase URL and anon key.
4. Create your Supabase admin user.
5. Test admin login.
6. Test tutor registration.
7. Test job posting and application.
8. Test tutor lesson tracking.
9. Test parent monitoring.

## Deliverable zip

`academy v10.zip`
