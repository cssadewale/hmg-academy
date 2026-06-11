# HMG Academy Production Fix — Deployment Guide

This guide explains how to deploy the cleaned and enhanced HMG Academy production package.

## What changed in this production package

The public site has been cleaned for end users. Internal version-history sections and developer-facing details were removed from the homepage. Admin/cPanel pages are now restricted behind login pages.

New production features include:

- Tutor registration with bank/payment details
- Tutor jobs board
- Tutor job application flow
- Tutor lesson dashboard
- Parent lesson monitoring
- Admin job posting
- Supabase schema for tutor marketplace operations

## Free tools used

- GitHub Pages or Cloudflare Pages for hosting
- Supabase free tier for CMS/data/storage/auth
- WhatsApp for communication/forms
- Browser localStorage for demo/local fallback
- Static HTML/CSS/JS

## No paid AI API

No paid AI APIs are used. This keeps the platform cost-effective and suitable for affordable education.

---

# 1. Deploy static files

## GitHub Pages

1. Open your HMG Academy GitHub repository.
2. Upload the **contents** of `academy v10` to the repository root.
3. Confirm `index.html` is at the root.
4. Commit with message:

`Deploy cleaned HMG Academy production platform`

5. Go to **Settings** → **Pages**.
6. Source: Deploy from branch.
7. Branch: `main`.
8. Folder: `/root`.
9. Save.

## Cloudflare Pages

1. Push the same files to GitHub.
2. Open Cloudflare Dashboard.
3. Go to **Workers & Pages**.
4. Create/connect a Pages project.
5. Use these settings for raw static deployment:
   - Framework preset: `None`
   - Build command: blank
   - Output directory: `/`
6. Deploy.

---

# 2. Configure Supabase

Supabase is needed for production storage and admin login.

## Step 1: Create Supabase project

1. Go to https://supabase.com.
2. Create a free project.
3. Copy project URL and anon key from Project Settings → API.

## Step 2: Create admin user

1. Go to Supabase Authentication → Users.
2. Add your admin email and password.
3. Confirm the user if necessary.

## Step 3: Run CMS SQL

Run the SQL in:

`docs/SUPABASE_CMS_SETUP.md`

This enables CMS pages, settings, media and audit logs.

## Step 4: Run tutor marketplace SQL

Run the SQL in:

`docs/TUTOR_MARKETPLACE_SCHEMA.md`

This enables:

- Tutor applications
- Tutor jobs
- Job applications
- Lesson tracking

## Step 5: Configure frontend

Open:

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

Redeploy after editing.

---

# 3. Test admin restriction

Open:

`admin.html`

Expected:

- You should see login page.
- You should not see the full dashboard without login.

After login:

- You should be redirected to `admin-dashboard.html`.

Open:

`cpanel.html`

Expected:

- Owner control panel login page.
- Dashboard accessible only after login.

---

# 4. Test tutor workflow

## Tutor registration

Open:

`tutor-register.html`

Submit a test tutor application.

Check Supabase table:

`hmg_tutor_applications`

## Admin job posting

Open:

`admin-jobs.html`

Post a tutor job.

Check public jobs page:

`jobs.html`

## Job application

Open:

`jobs.html`

Click Apply.

Submit application.

Check table:

`hmg_job_applications`

## Tutor lesson tracking

Open:

`tutor-dashboard.html`

Add/schedule a lesson.

Mark it complete.

Check table:

`hmg_lessons_tracking`

## Parent monitoring

Open:

`parent-monitoring.html`

Confirm lesson record appears.

---

# 5. Post-deployment checklist

Test these public pages:

- `index.html`
- `tutors.html`
- `book-tutor.html`
- `tutor-register.html`
- `jobs.html`
- `job-apply.html`
- `tutor-dashboard.html`
- `parent-monitoring.html`
- `homeschooling.html`
- `exam-prep.html`
- `lms.html`
- `for-schools.html`
- `contact.html`

Test these restricted pages:

- `admin.html`
- `admin-dashboard.html`
- `admin-jobs.html`
- `cpanel.html`
- `cpanel-dashboard.html`

Test these features:

- WhatsApp booking form
- Tutor registration form
- Tutor job application
- Admin job posting
- Lesson scheduling
- Lesson completion
- Parent monitoring
- Supabase inserts
- PWA/offline fallback if needed

---

# 6. Security notes

- Never expose Supabase service role key in frontend.
- Use only anon key with proper RLS policies.
- Bank details must not be publicly readable.
- Tutor applications should be readable only by authenticated admin users.
- Lesson tracking should later be restricted by tutor/parent/student IDs.
- Use strong admin password.
- Export backups regularly.

---

# 7. Recommended next production improvement

After confirming workflows, upgrade lesson tracking from name-based records to ID-based records:

- `tutor_id`
- `student_id`
- `parent_id`
- `school_id`

Then enforce strict Supabase Row Level Security so tutors and parents see only their assigned records.
