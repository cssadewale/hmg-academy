# HMG Academy v8 — Supabase Platform Schema

This schema upgrades HMG Academy from a static CMS-enabled website into a role-based EdTech platform while still using free-based tools.

## Purpose

The v8 architecture supports:

- Students
- Parents
- Tutors
- School admins
- Super admins
- Courses
- Lessons
- Enrolments
- Assignments
- Attendance
- Grades
- Certificates
- Messages
- Booking requests
- School enterprise rollout

## SQL starter schema

Run this after the v6 CMS SQL if you want the full platform tables.

```sql
create table if not exists public.hmg_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete set null,
  role text not null check (role in ('student','parent','tutor','school_admin','super_admin')),
  full_name text not null,
  email text,
  phone text,
  school_id uuid,
  linked_student_ids uuid[] default '{}',
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.hmg_schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_email text,
  contact_phone text,
  plan text default 'Free Pilot',
  settings jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists public.hmg_courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text,
  level text,
  description text,
  status text default 'draft' check (status in ('draft','published','archived')),
  lms_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.hmg_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.hmg_courses(id) on delete cascade,
  title text not null,
  description text,
  order_no int default 1,
  type text default 'lesson',
  resource_url text,
  created_at timestamptz default now()
);

create table if not exists public.hmg_enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.hmg_profiles(id) on delete cascade,
  course_id uuid references public.hmg_courses(id) on delete cascade,
  status text default 'active',
  progress numeric default 0,
  started_at timestamptz default now(),
  completed_at timestamptz
);

create table if not exists public.hmg_assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.hmg_courses(id) on delete set null,
  student_id uuid references public.hmg_profiles(id) on delete cascade,
  tutor_id uuid references public.hmg_profiles(id) on delete set null,
  title text not null,
  instructions text,
  status text default 'assigned',
  due_date date,
  submission_text text,
  feedback text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.hmg_attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.hmg_profiles(id) on delete cascade,
  course_id uuid references public.hmg_courses(id) on delete set null,
  session_title text,
  session_date date default current_date,
  status text default 'present' check (status in ('present','late','absent','excused')),
  note text,
  created_at timestamptz default now()
);

create table if not exists public.hmg_grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.hmg_profiles(id) on delete cascade,
  course_id uuid references public.hmg_courses(id) on delete set null,
  assessment_type text,
  score numeric,
  max_score numeric default 100,
  feedback text,
  created_at timestamptz default now()
);

create table if not exists public.hmg_certificates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.hmg_profiles(id) on delete cascade,
  course_id uuid references public.hmg_courses(id) on delete set null,
  certificate_code text unique not null,
  title text not null,
  issued_at timestamptz default now(),
  metadata jsonb default '{}'
);

create table if not exists public.hmg_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.hmg_profiles(id) on delete set null,
  recipient_id uuid references public.hmg_profiles(id) on delete set null,
  from_role text,
  to_role text,
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.hmg_booking_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  phone text,
  email text,
  role text,
  programme text,
  subject text,
  level text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);
```

## RLS recommendation

For production, do not leave all records publicly writable. Use Supabase Auth and policies:

- Students can read their own profile/enrolments/assignments/grades.
- Parents can read linked student records.
- Tutors can read assigned students and update feedback.
- School admins can read records for their school.
- Super admins can manage all records.

The exact RLS should be added after confirming user/team workflow.

## Free-tool note

This schema uses Supabase free tier and does not require any paid AI API.
