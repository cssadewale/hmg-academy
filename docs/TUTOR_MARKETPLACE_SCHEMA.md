# HMG Academy — Tutor Marketplace, Jobs, Lessons and Parent Monitoring Schema

This document extends the free Supabase backend for the production tutor marketplace.

## Purpose

The new production flow supports:

- Tutor registration
- Tutor personal/profile information
- Tutor bank/payment information
- Tutor job postings
- Tutor job applications
- Lesson scheduling and tracking
- Tutor lesson completion notes
- Parent lesson monitoring
- Admin review and assignment workflow

## Important privacy note

Tutor bank details and personal information must never be displayed publicly. They should be stored only in Supabase with proper Row Level Security.

## SQL starter schema

```sql
create table if not exists public.hmg_tutor_applications (
  id text primary key,
  full_name text not null,
  phone text not null,
  email text not null,
  location text,
  subjects text,
  levels text,
  qualification text,
  experience_years int,
  teaching_bio text,
  availability text,
  internet_device text,
  bank_name text,
  account_name text,
  account_number text,
  id_reference text,
  status text default 'pending_review',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.hmg_tutor_jobs (
  id text primary key,
  title text not null,
  subject text,
  level text,
  schedule text,
  budget text,
  description text,
  status text default 'open',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.hmg_job_applications (
  id text primary key,
  "Job ID" text,
  "Job Title" text,
  "Tutor Name" text,
  "Phone" text,
  "Email" text,
  "Expected Rate" text,
  "Why Fit" text,
  status text default 'submitted',
  created_at timestamptz default now()
);

create table if not exists public.hmg_lessons_tracking (
  id text primary key default gen_random_uuid()::text,
  tutor text,
  student text,
  parent text,
  subject text,
  lesson_date date,
  lesson_time time,
  status text default 'Scheduled',
  lesson_note text,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## RLS starter policies

For demo/simple production, you may start with authenticated admin writes and public read only for jobs.

```sql
alter table public.hmg_tutor_applications enable row level security;
alter table public.hmg_tutor_jobs enable row level security;
alter table public.hmg_job_applications enable row level security;
alter table public.hmg_lessons_tracking enable row level security;

-- Public can read open jobs.
create policy "public read open jobs"
on public.hmg_tutor_jobs
for select
to anon
using (status = 'open');

-- Public can submit tutor applications.
create policy "public submit tutor applications"
on public.hmg_tutor_applications
for insert
to anon
with check (true);

-- Public can submit job applications.
create policy "public submit job applications"
on public.hmg_job_applications
for insert
to anon
with check (true);

-- Admin/authenticated can manage jobs and lesson tracking.
create policy "authenticated manage tutor jobs"
on public.hmg_tutor_jobs
for all
to authenticated
using (true)
with check (true);

create policy "authenticated read tutor applications"
on public.hmg_tutor_applications
for select
to authenticated
using (true);

create policy "authenticated update tutor applications"
on public.hmg_tutor_applications
for update
to authenticated
using (true)
with check (true);

create policy "authenticated manage lessons"
on public.hmg_lessons_tracking
for all
to authenticated
using (true)
with check (true);

-- For parent/tutor public demo read, do not expose sensitive data.
-- For real production, create user profiles and restrict lesson records by tutor_id/parent_id/student_id.
```

## Production recommendation

For a real multi-user deployment, replace name-based lesson fields with IDs:

- `tutor_id`
- `student_id`
- `parent_id`
- `school_id`

Then restrict RLS:

- Tutor sees only assigned lessons.
- Parent sees only linked child lessons.
- Admin sees all.
- Student sees own lessons and assignments.

## No paid AI API

This feature uses Supabase free tier and browser JavaScript only. No paid AI API is required.
