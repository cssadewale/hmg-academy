# HMG Academy v5 — Optional Supabase Free-Tier Backup Setup

The site works without Supabase. Supabase is only for optional backup storage for features that need persistence beyond one browser.

## What can be backed up
- Saved tutors
- Compared tutors
- Assessment report
- Parent dashboard students
- Study Desk items
- Course enrolment interests
- Assignments
- Attendance logs
- Certificate records
- Support tickets

## Step 1 — Create a Supabase project
1. Go to https://supabase.com.
2. Create a free account.
3. Create a new project.
4. Wait for the project to finish provisioning.

## Step 2 — Create the backup table
Open Supabase SQL Editor and run:

```sql
create table if not exists public.hmg_backup_storage (
  id uuid primary key default gen_random_uuid(),
  owner_key text not null,
  namespace text not null default 'academy_v5',
  payload jsonb not null,
  updated_at timestamptz default now()
);

create unique index if not exists hmg_backup_unique
on public.hmg_backup_storage(owner_key, namespace);

alter table public.hmg_backup_storage enable row level security;

create policy "anon insert backup"
on public.hmg_backup_storage
for insert to anon
with check (true);

create policy "anon read backup"
on public.hmg_backup_storage
for select to anon
using (true);

create policy "anon update backup"
on public.hmg_backup_storage
for update to anon
using (true)
with check (true);
```

## Step 3 — Add your config
1. Open `assets/js/config.example.js`.
2. Copy it as `assets/js/config.js`.
3. Replace the URL and anon key with values from Supabase Project Settings → API.

Example:

```js
window.HMG_SUPABASE = {
  url: "https://your-project-id.supabase.co",
  anonKey: "your-anon-key",
  table: "hmg_backup_storage"
};
```

## Step 4 — Use Backup Center
Open `backup-center.html`.

You can:
- Backup to Supabase
- Restore from Supabase
- Export JSON backup
- Import JSON backup

## Security note
This is a static-site backup system using user-provided backup keys. Do not store highly sensitive personal data in this demo. For production schools, implement authenticated Supabase users and stricter RLS policies.

## Why Supabase free tier
Supabase free tier gives a low-cost path for storage without running a paid server. It fits HMG Academy's principle of free-based tools and cost discipline.
