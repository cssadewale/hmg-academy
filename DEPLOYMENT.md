# HMG Academy v2 — Deployment Guide (Free Only)

**Goal:** Deploy this self-contained static site to a free platform so it becomes your live website (e.g., hmgacademy.pages.dev or custom).

**Requirements:** 
- A free GitHub account (for GitHub Pages) **OR** a free Cloudflare account (for Cloudflare Pages).
- No paid tools, no AI APIs, no servers.
- The site uses only Tailwind CSS via CDN (no build step), Vanilla JS, and static assets.
- All forms are WhatsApp prefill (works immediately after deploy).

**Recommended Free Platforms (Both Excellent):**
1. **GitHub Pages** (easiest if you already use GitHub for the projects).
2. **Cloudflare Pages** (often faster global CDN, free custom domains, great analytics).

**Both support the exact structure here (root HTML files + /assets/images/).**

---

## Option 1: Deploy to GitHub Pages (Recommended for Most Users)

### Step 1: Prepare Your Local Files (One-Time)
- The folder you have is `Academy v2/`. This is your complete site.
- Inside it you have all .html files at root + `assets/images/` (with your uploaded logo and founder photo already copied in).

### Step 2: Create a New GitHub Repository (Free)
1. Go to https://github.com (log in or create free account).
2. Click the **+** icon (top right) → **New repository**.
3. Repository name: `hmgacademy` (or `academy` or whatever you want — this will determine the URL like yourusername.github.io/hmgacademy).
4. **Important**: Make it **Public** (required for free GitHub Pages).
5. **Do NOT** initialize with README (you will push your files).
6. Click **Create repository**.

### Step 3: Upload Your Files to GitHub
**Easiest method (no Git command line needed):**
1. On the new repo page, click **uploading an existing file** (or the "Add file" dropdown → "Upload files").
2. Drag and drop **ALL** the contents of your `Academy v2/` folder into the GitHub upload area:
   - All the .html files (index.html, about.html, etc.)
   - The entire `assets/` folder (including images and README.md inside it)
   - README.md and DEPLOYMENT.md
3. In the commit message box, type something like "Initial HMG Academy v2 deploy".
4. Check **"Commit directly to the main branch"**.
5. Click **Commit changes**.

**Alternative (if you prefer command line / Git):**
```bash
cd "/path/to/your/Academy v2"
git init
git add .
git commit -m "Initial HMG Academy v2 deploy"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/hmgacademy.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. In your repo, go to **Settings** tab (top).
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** (or master)
   - Folder: **/ (root)**
4. Click **Save**.
5. Wait 1–2 minutes. GitHub will show a green "Your site is published at https://YOUR-USERNAME.github.io/hmgacademy/" (or whatever your repo name is).

### Step 5: Verify & Custom Domain (Optional, Free)
- Visit the URL above. Test all pages, forms (they should open WhatsApp with prefilled text), links (especially the live tool links like CBT Pro, LMS, ML apps), and images (logo + founder photo must load).
- To use a custom domain (e.g., academy.hmgconcepts.com or hmgacademy.com):
  1. Buy a cheap domain (Namecheap, GoDaddy, etc. — many under $10/year).
  2. In GitHub Pages settings, add your custom domain and follow their DNS instructions (add CNAME record).
  3. Cloudflare is often easier for free custom domains (see Option 2).

### Step 6: Future Updates (Asset Changes, Content Tweaks)
- Edit any .html file or replace `assets/images/hmg-academy-logo.png` / `founder.jpg` locally.
- Upload the changed files the same way (or `git push`).
- GitHub Pages auto-redeploys in ~1 minute.
- See `assets/images/README.md` for exact asset update instructions (no code changes needed).

**Common Issues & Fixes:**
- Images not loading: Make sure filenames are exact (`hmg-academy-logo.png`, `founder.jpg`) and in `assets/images/`.
- Mobile menu not working: JavaScript is vanilla and included inline — should work everywhere.
- Forms: They construct a WhatsApp URL — test on phone or desktop (wa.me link works universally).

---

## Option 2: Deploy to Cloudflare Pages (Often Faster + Better Free Custom Domains)

### Step 1: Prepare Files (Same as Above)
Same as GitHub Step 1–2. Have your `Academy v2/` folder ready with all files.

### Step 2: Create Cloudflare Account & Project
1. Go to https://dash.cloudflare.com (sign up free — uses email or GitHub login).
2. After login, in the sidebar click **Pages**.
3. Click **Create a project** → **Connect to Git** (or "Upload assets" for direct upload — easiest for beginners).

**Easiest: Direct Upload (no Git needed)**
1. Choose **"Upload assets"**.
2. Drag the entire contents of `Academy v2/` (or zip the folder and upload — Cloudflare accepts folder upload).
3. Give the project a name (e.g., `hmg-academy-v2`).
4. Click **Deploy site**.

**Git-based (recommended for ongoing updates):**
1. Connect your GitHub account.
2. Select the repo you created in Option 1 (or create one).
3. Cloudflare will detect it's a static site.
4. Build settings: Leave as default (no build command needed — it's pure static HTML).
5. Click **Save and Deploy**.

### Step 3: Get Your Live URL
- Cloudflare gives you a free `*.pages.dev` URL immediately (e.g., hmg-academy-v2.pages.dev).
- It is usually live in under 1 minute.

### Step 4: Add Custom Domain (Free & Easy on Cloudflare)
1. In your Pages project dashboard, go to **Custom domains**.
2. Click **Add domain**.
3. Enter your domain (you must own it).
4. Follow the prompts — Cloudflare will give you the exact DNS records to add at your registrar (often just one CNAME).
5. SSL (HTTPS) is automatic and free.

### Step 5: Verify
- Visit the URL.
- Test everything (links, forms, images, mobile).
- Update assets the same way as GitHub (push or re-upload changed files).

---

## Post-Deployment Checklist (Do This After Every Deploy)
1. Open the live site on desktop + mobile.
2. Click every nav link and confirm pages load.
3. Test 2–3 WhatsApp forms (fill, submit — should open WhatsApp with full prefilled message including your name/phone/role/service/message).
4. Click all "Live" buttons for CBT Pro, the 11 LMS, 7 ML apps, 11 Simulators, InstaDocs — confirm they open the correct external apps.
5. Check logo and founder photo load (high quality, no distortion).
6. Scroll through "Detailed Explanations" sections — confirm text is readable (high contrast).
7. Test the **Parent Dashboard Demo** on homeschooling.html (add a fake student, mark lessons complete, generate report — data should persist in browser localStorage even after refresh).
8. Check ecosystem links in footer/nav go to the correct external sites.
9. (Optional) Submit a test enquiry and confirm you receive the WhatsApp.

**If anything is broken:** Re-upload the fixed file(s) — redeploy is instant on both platforms.

---

## Updating the Site Later (Content, New Features, Assets)
- Edit the .html files in a text editor (VS Code recommended — free).
- For new images: Replace the files in `assets/images/` (keep exact names).
- Push/upload the changed files only.
- Both GitHub Pages and Cloudflare Pages redeploy automatically.

**Pro Tip for Large Updates:** Keep a local copy of `Academy v2/`. Make changes, then upload the whole folder again (or use Git for version control).

---

## Why These Platforms Are Perfect & Free
- **Zero cost**: No hosting fees, no bandwidth charges for normal traffic.
- **Fast global delivery**: Cloudflare especially.
- **HTTPS automatic**.
- **Custom domains supported** (free on Cloudflare, easy on GitHub).
- **No build tools needed**: Pure static files = instant deploys.
- **Matches our philosophy**: Free tools only, cost-effective for Nigerian schools and partners.

## Alternative (Quick Test Only)
You can open `index.html` directly in a browser from your computer (double-click) for local preview. All JS and forms will work locally. Not for public sharing.

---

**You now have a fully deployable, enterprise-grade, free-tool website.**

If you need help with any step (screenshots, specific domain setup, or minor content tweaks), just WhatsApp +234 810 086 6322 with the step number you're on.

**Live site examples from the ecosystem (for reference):**  
- https://hmgconcepts.pages.dev/ (GitHub Pages style)  
- https://cssadewale.pages.dev/ (similar static approach)

Congratulations on the v2 launch!

— HMG Academy Team (Built with deliberate care, 2026)
