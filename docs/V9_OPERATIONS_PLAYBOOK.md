# HMG Academy v9 — Operations Playbook

This playbook explains how to operate the v9 platform day-to-day.

## Daily operations

1. Open `cpanel.html`.
2. Check deployment and CMS readiness.
3. Open `operations-suite.html`.
4. Review admissions leads in `admissions-crm.html`.
5. Review notifications in `notification-center.html`.
6. Check assignments, attendance and support tickets.
7. Export backups if major changes were made.

## Admissions workflow

1. Parent/student/school submits enquiry via WhatsApp form.
2. Admin adds lead to `admissions-crm.html`.
3. Move lead through stages:
   - New
   - Consultation
   - Proposal
   - Won
4. When won, create course/enrolment record in platform data or Supabase.

## Finance workflow

1. Open `finance-center.html`.
2. Enter client name.
3. Enter items in format:

`Item name | Quantity | Price`

4. Generate invoice.
5. Print/save PDF.
6. Send to client via WhatsApp or email.

## Timetable workflow

1. Open `timetable-planner.html`.
2. Add weekly class/session slots.
3. Use timetable for tutor planning and parent communication.

## Content publishing workflow

1. Draft content in `page-builder.html` or admin CMS.
2. Review using `content-workflow.html` process.
3. Approve content.
4. Publish through `admin.html`.
5. Confirm public page updates.

## School onboarding workflow

1. Open `school-onboarding.html`.
2. Complete four stages:
   - School profile
   - Digital readiness
   - Tool setup
   - Pilot and report
3. Use `school-os.html` for enterprise rollout.
4. Use `reports-center.html` for school reporting.

## Backup workflow

1. Export CMS JSON from `admin.html`.
2. Export feature data from `backup-center.html`.
3. Export platform data from `platform-data.html`.
4. Store backup files safely.

## Security workflow

1. Review `security-center.html`.
2. Ensure Supabase RLS is active.
3. Never expose service role key.
4. Use strong admin password.
5. Do not store sensitive student data in public CMS pages.

## No paid AI API

Do not add paid AI API calls unless the founder explicitly changes the cost policy. HMG Academy uses human-controlled, free-tool-first workflows.
