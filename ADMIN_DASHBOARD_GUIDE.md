# HMG Academy v6 — Full Admin Dashboard Guide

## Purpose
The v6 admin dashboard gives HMG Academy practical control over website content without editing code every time.

It supports:

- Creating new pages
- Editing existing pages
- Unpublishing/deleting CMS pages
- Changing pictures
- Uploading media
- Managing navigation
- Managing announcement bar
- Editing brand/site settings
- Exporting/importing CMS backups
- Optional Supabase live storage
- Audit logging

## Important explanation
Because this is a free/static website designed for GitHub Pages or Cloudflare Pages, the browser cannot physically edit deployed `.html` files on the server. That would require either:

1. A paid/full backend server, or
2. A GitHub API integration with private tokens, or
3. Manual redeployment.

Instead, HMG Academy v6 uses a better free-tool architecture:

- Static files remain deployed.
- Supabase free tier stores editable content.
- Public pages load the latest published content when visitors open the site.
- Updates appear immediately after refresh.

This is how the dashboard gives real-time control without paid servers or AI APIs.

## Admin page
Open:

`admin.html`

## Dynamic page viewer
New CMS pages are viewed through:

`page.html?slug=your-page-slug`

## Editing existing static pages
To override an existing page, create a CMS page with the same slug:

| Static page | CMS slug |
|---|---|
| `index.html` | `index` |
| `about.html` | `about` |
| `services.html` | `services` |
| `tools.html` | `tools` |
| `lms.html` | `lms` |
| `contact.html` | `contact` |

When a visitor opens that static page, the CMS loader checks Supabase and replaces the main content with the published CMS version.

## Page statuses

### Draft
Only stored in CMS. The public loader treats it as unavailable.

### Published
Visible to the public immediately.

### Deleted
Used as a soft-delete/unpublish state. The record remains in the CMS but the public page is unavailable.

### Hard delete
Removes the CMS record from Supabase/local CMS list. It does not remove physical static files.

## Pictures and media

The media panel supports:

- Uploading image files
- Saving them to Supabase Storage if configured
- Local base64 demo upload if Supabase is not configured
- Copying image URL
- Using image URL as logo, founder hero image, founder profile image or page hero image

## Site settings

The settings panel controls:

- Brand name
- Browser title suffix
- Primary WhatsApp number
- Announcement bar
- Logo URL override
- Founder hero image override
- Founder profile image override

## Navigation
Each CMS page has:

- Show in navigation toggle
- Navigation label
- Navigation order

Published CMS pages marked for navigation are added to the public site navigation automatically.

## Backup

There are two backup systems:

### 1. CMS JSON export/import
Exports CMS pages, media list, settings and audit data.

### 2. Feature Backup Center
Backs up platform data such as:

- Saved tutors
- Assignments
- Attendance
- Certificates
- Study desk
- Support tickets
- Dashboard records

This can use local JSON or optional Supabase free tier.

## Recommended admin workflow

1. Login to `admin.html`.
2. Create a new page in draft.
3. Edit and preview.
4. Upload/select images.
5. Set SEO description.
6. Decide if it should appear in navigation.
7. Publish.
8. Open public page to confirm.
9. Export CMS backup weekly.

## No paid AI API
The dashboard does not use AI generation. HMG Academy keeps human editorial control and avoids recurring API costs.

## Production recommendation
For live use:

- Configure Supabase Auth.
- Use a strong password.
- Restrict admin user creation.
- Keep regular CMS JSON exports.
- Use Supabase Storage for public images.
- Avoid storing sensitive student data in CMS pages.

## cPanel-like Operations Hub

Academy v6 includes a free control panel page:

`cpanel.html`

Use it as your operational home for:

- Opening the admin dashboard
- Opening Backup Center
- Checking whether Supabase is configured
- Exporting local data
- Tracking deployment checklist items
- Accessing setup documentation quickly

It is not a replacement for a real hosting cPanel. It is a free static-site operations hub built specifically for HMG Academy's architecture.

