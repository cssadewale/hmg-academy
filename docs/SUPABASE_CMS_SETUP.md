# HMG Academy v6 — Supabase CMS Setup Guide

This guide enables the full live admin dashboard.

Without Supabase, the admin dashboard runs in local demo mode and changes are visible only in the same browser. With Supabase free tier configured, changes become visible to site visitors immediately on page refresh because public pages load CMS content from Supabase.

## What Supabase powers

- Create new CMS pages
- Edit existing page content by slug
- Unpublish/delete CMS pages
- Manage dynamic navigation links
- Save site settings
- Change logo and founder images
- Show/hide announcement bar
- Upload and manage pictures through Supabase Storage
- Store audit logs
- Backup feature data through the v5/v6 backup system

## Important static-site limitation

A GitHub Pages or Cloudflare Pages static site cannot physically rewrite files like `index.html` without redeploying or using a GitHub API token.

HMG Academy v6 solves immediate updates using a CMS layer:

1. Static files remain deployed.
2. Admin saves content to Supabase.
3. Public pages load CMS content on page load.
4. End users see the update immediately after refresh.

To override an existing static page, create a CMS page with the same slug:

- `index` overrides `index.html`
- `about` overrides `about.html`
- `services` overrides `services.html`
- `tools` overrides `tools.html`
- `contact` overrides `contact.html`

New pages use:

`page.html?slug=your-page-slug`

## Step 1 — Create Supabase project

1. Go to https://supabase.com.
2. Create a free account.
3. Create a new project.
4. Save your database password.
5. Wait for the project to finish provisioning.

## Step 2 — Create an admin user

1. In Supabase, go to **Authentication**.
2. Click **Users**.
3. Click **Add user**.
4. Enter your admin email and password.
5. Confirm the user if required.

This email/password is what you use on `admin.html`.

## Step 3 — Create CMS tables and policies

Open Supabase SQL Editor and run:

```sql
-- Pages table
create table if not exists public.hmg_cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  seo_description text,
  content_html text,
  status text not null default 'draft' check (status in ('draft','published','deleted')),
  show_in_nav boolean default false,
  nav_label text,
  nav_order int default 100,
  hero_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Settings table
create table if not exists public.hmg_cms_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Media table
create table if not exists public.hmg_cms_media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  type text,
  size bigint,
  created_at timestamptz default now()
);

-- Audit log table
create table if not exists public.hmg_cms_audit (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  detail jsonb,
  actor text,
  created_at timestamptz default now()
);

-- Feature backup table used by Backup Center
create table if not exists public.hmg_backup_storage (
  id uuid primary key default gen_random_uuid(),
  owner_key text not null,
  namespace text not null default 'academy_v5',
  payload jsonb not null,
  updated_at timestamptz default now()
);
create unique index if not exists hmg_backup_unique on public.hmg_backup_storage(owner_key, namespace);

-- Enable RLS
alter table public.hmg_cms_pages enable row level security;
alter table public.hmg_cms_settings enable row level security;
alter table public.hmg_cms_media enable row level security;
alter table public.hmg_cms_audit enable row level security;
alter table public.hmg_backup_storage enable row level security;

-- Public read policies. Public site needs to read CMS records.
create policy "public read cms pages" on public.hmg_cms_pages for select to anon using (true);
create policy "public read cms settings" on public.hmg_cms_settings for select to anon using (true);
create policy "public read cms media" on public.hmg_cms_media for select to anon using (true);

-- Authenticated admin write policies.
create policy "authenticated insert pages" on public.hmg_cms_pages for insert to authenticated with check (true);
create policy "authenticated update pages" on public.hmg_cms_pages for update to authenticated using (true) with check (true);
create policy "authenticated delete pages" on public.hmg_cms_pages for delete to authenticated using (true);

create policy "authenticated insert settings" on public.hmg_cms_settings for insert to authenticated with check (true);
create policy "authenticated update settings" on public.hmg_cms_settings for update to authenticated using (true) with check (true);

create policy "authenticated insert media" on public.hmg_cms_media for insert to authenticated with check (true);
create policy "authenticated update media" on public.hmg_cms_media for update to authenticated using (true) with check (true);
create policy "authenticated delete media" on public.hmg_cms_media for delete to authenticated using (true);

create policy "authenticated insert audit" on public.hmg_cms_audit for insert to authenticated with check (true);
create policy "authenticated read audit" on public.hmg_cms_audit for select to authenticated using (true);

-- Backup table policies. Simple backup-key model for free static site.
create policy "anon insert backup" on public.hmg_backup_storage for insert to anon with check (true);
create policy "anon read backup" on public.hmg_backup_storage for select to anon using (true);
create policy "anon update backup" on public.hmg_backup_storage for update to anon using (true) with check (true);
```

## Step 4 — Create public storage bucket

1. Go to **Storage** in Supabase.
2. Create a bucket named:

`hmg-media`

3. Make it public.
4. Add this storage policy if needed:

```sql
create policy "authenticated upload hmg media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'hmg-media');

create policy "authenticated update hmg media"
on storage.objects
for update
to authenticated
using (bucket_id = 'hmg-media')
with check (bucket_id = 'hmg-media');

create policy "public read hmg media"
on storage.objects
for select
to anon
using (bucket_id = 'hmg-media');
```

## Step 5 — Configure the site

Open:

`assets/js/config.js`

Replace the default null config with:

```js
window.HMG_SUPABASE = {
  url: "https://YOUR_PROJECT_ID.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY",
  table: "hmg_backup_storage"
};
```

Get these from Supabase Project Settings → API.

## Step 6 — Deploy/redeploy

Upload the updated files to GitHub Pages or Cloudflare Pages.

## Step 7 — Use the dashboard

1. Visit `admin.html`.
2. Login with your Supabase admin user.
3. Create a sample page.
4. Publish it.
5. Open `page.html?slug=your-slug`.
6. Confirm it appears publicly.

## Recommended workflow

- Use draft status while editing.
- Publish only when ready.
- Use `deleted` status to remove a page from public viewing.
- Use hard delete only if you are sure.
- Export CMS JSON weekly.
- Keep Supabase credentials private except anon key, which is safe for browser use when RLS policies are correct.

## Security note

The included policies are simple for a small admin-only site. For larger teams, add an `admin_profiles` table and restrict write policies to approved user IDs.

## No AI API

This CMS does not call any AI API. It is manually controlled and uses Supabase free tier only for storage and authentication.
