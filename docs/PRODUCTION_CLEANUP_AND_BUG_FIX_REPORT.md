# HMG Academy — Production Cleanup and Bug Fix Report

## Diagnosis from live site

The live homepage exposed internal development/version sections that end users do not need, including:

- What changed in v4
- Academy v5 enterprise upgrade
- Academy v6 admin control
- Academy v7 modern upgrade
- Academy v8 recommended architecture
- Academy v9 enterprise operations
- Technical explanations about static architecture and update models
- Keyboard shortcut/theme/help controls that are more useful to admins than learners/parents

## Why this was a problem

End users need to understand:

- What HMG Academy offers
- How to book a tutor
- How virtual schooling works
- How parents monitor progress
- How tutors register
- How schools partner with HMG

They do not need internal version history, implementation notes, or developer architecture details on the public homepage.

## Bugs/issues identified

1. **Homepage content was developer-facing instead of customer-facing.**
2. **Admin and cPanel pages were publicly visible and opened in demo mode.**
3. **Footer/navigation exposed internal documentation and admin tools.**
4. **Some important platform roles were not covered clearly enough:**
   - Tutor registration with payment/bank details
   - Tutor lesson tracking
   - Parent lesson monitoring
   - Admin job posting
   - Tutor job application flow
5. **Public pages contained version-specific language not suitable for production.**
6. **The public user journey was unclear because too many internal modules were exposed.**

## Fixes applied

### 1. Cleaned homepage

The homepage is now a professional landing page focused on:

- Book a tutor
- Take free assessment
- Become a tutor
- Virtual home schooling
- Exam prep
- LMS and CBT tools
- Parent monitoring
- School partnerships

### 2. Removed extraneous version information

All public v4/v5/v6/v7/v8/v9 changelog-style footer links and homepage blocks were removed from the production-facing pages.

### 3. Restricted admin/cPanel access

New login gate pages:

- `admin.html`
- `cpanel.html`

Full dashboards moved to:

- `admin-dashboard.html`
- `cpanel-dashboard.html`

These are protected by `secure-gate.js` and intended for Supabase Auth login.

### 4. Added tutor registration

New page:

- `tutor-register.html`

Collects:

- Personal information
- Contact details
- Subjects and levels
- Qualifications
- Teaching experience
- Availability
- Device/internet readiness
- Bank details for payment
- ID/credential reference

### 5. Added tutor jobs board

New pages:

- `jobs.html`
- `job-apply.html`

Tutors can view jobs and apply.

### 6. Added tutor lesson dashboard

New page:

- `tutor-dashboard.html`

Tutors can:

- Add/schedule lessons
- View lessons
- Mark lessons complete
- Add lesson notes

### 7. Added parent lesson monitoring

New page:

- `parent-monitoring.html`

Parents can monitor:

- Lesson dates
- Tutor name
- Subject
- Completion status
- Tutor notes

### 8. Added admin job posting

New restricted page:

- `admin-jobs.html`

Admin can post tutor jobs that appear on the public jobs page.

### 9. Added Supabase schema documentation

New document:

- `docs/TUTOR_MARKETPLACE_SCHEMA.md`

Includes tables and RLS starter policies for:

- Tutor applications
- Tutor jobs
- Job applications
- Lesson tracking

## Result

The site is now more professional, customer-facing and production-ready while preserving the free-tool, no-paid-AI-API architecture.
