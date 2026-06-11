# HMG Academy v9 — Enterprise Features and Explanations

Academy v9 preserves all v8 features and adds an enterprise operating layer for running HMG Academy as a serious virtual institution.

## New v9 enterprise modules

### 1. Operations Suite
Page: `operations-suite.html`

Purpose: A central landing page for back-office operations.

Features:
- Admissions CRM
- Finance Center
- Timetable Planner
- Notification Center
- Content Workflow
- Form Builder
- Reports Center
- Security Center

### 2. Admissions CRM
Page: `admissions-crm.html`

Purpose: Track parent, student and school enquiries from first contact to enrolment.

Feature explanation:
A school/academy loses money when enquiries remain scattered inside WhatsApp chats. The CRM board organizes leads into pipeline stages: New, Consultation, Proposal and Won.

Free-tool implementation:
- Browser localStorage demo
- WhatsApp follow-up links
- Supabase-ready data structure

### 3. Finance Center
Page: `finance-center.html`

Purpose: Generate quotes and invoices for tutoring, exam prep, school rollout and training.

Feature explanation:
Many academies need lightweight billing but cannot afford paid invoicing SaaS. This tool generates printable invoices using browser tools.

Free-tool implementation:
- HTML form
- JavaScript invoice generation
- Print/save as PDF from browser

### 4. Timetable Planner
Page: `timetable-planner.html`

Purpose: Plan recurring lessons, CBT sessions, teacher training and parent reviews.

Feature explanation:
Virtual academies need schedule visibility. This tool creates a simple weekly timetable without paid calendar software.

### 5. Notification Center
Page: `notification-center.html`

Purpose: Track reminders and operational notices.

Feature explanation:
Not every notification needs SMS or paid software. A local notification center helps track tasks, reminders and follow-ups.

### 6. Content Workflow
Page: `content-workflow.html`

Purpose: Manage content governance: Draft → Review → Approve → Publish.

Feature explanation:
Enterprise platforms should not publish content carelessly. Pages, notes, course content and announcements need review.

### 7. Form Builder
Page: `form-builder-v9.html`

Purpose: Generate WhatsApp-ready HTML forms quickly.

Feature explanation:
Instead of hand-coding every new form, admins can define form fields and generate HTML for the CMS/admin editor.

### 8. Reports Center
Page: `reports-center.html`

Purpose: Provide report templates for parents, schools, tutors and operations.

Feature explanation:
Reports turn activity into decisions. Parents and schools need clear weekly/monthly reports.

### 9. Security Center
Page: `security-center.html`

Purpose: Document security, backups and access control.

Feature explanation:
As HMG Academy becomes a platform, data governance becomes critical. The Security Center explains RLS, backups, data minimization and role access.

### 10. API Docs
Page: `api-docs.html`

Purpose: Document Supabase REST endpoints and integration guidance.

Feature explanation:
Supabase gives REST endpoints for database tables. This page explains safe API usage and warns never to expose service role keys.

### 11. School Onboarding
Page: `school-onboarding.html`

Purpose: Provide a structured onboarding wizard for schools.

Feature explanation:
Schools need a guided implementation process, not just tool links.

## Modern tooling retained

- Vite-ready package
- Static link checker
- Search index generator
- GitHub Actions workflow
- PWA manifest and service worker
- Supabase CMS/data support

## No AI API

No paid AI API is used in v9. All features are implemented with static files, browser JavaScript, Supabase free tier and WhatsApp workflows.
