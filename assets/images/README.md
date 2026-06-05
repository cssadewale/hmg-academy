# HMG Academy Assets Upload Guide

This folder is ready for your brand assets. The website is designed to automatically use them once uploaded — no code changes needed.

## Required Files (Upload These)

1. **hmg-academy-logo.png** (or .svg if preferred)
   - Your official HMG Academy logo.
   - Recommended: Transparent background, 512x512 or similar square/rect.
   - Used in navbar, footer, hero.

2. **founder.jpg** (or founder.png)
   - High-quality professional photo of Adewale Samson Adeagbo (the Visioner).
   - Recommended: Headshot or upper-body, good lighting, professional yet approachable. 800x800+ px.
   - Used in About, Founder section, testimonials if needed.

## Optional / Future Assets
- og-image.jpg or social-preview.jpg (for sharing cards, 1200x630 recommended)
- favicon.ico or favicon.png (for browser tab)
- hero-bg.jpg or background image if you want custom hero (currently gradient/decorative)
- Any additional icons or illustrations (keep minimal for performance)

## How to Upload (Easiest for .pages.dev / GitHub Pages)

**Best Option: GitHub (if deploying from repo)**
1. Go to your GitHub repo for this site (or create one).
2. Upload the files directly into `assets/images/` folder.
3. Commit and push.
4. The site (if using GitHub Pages or Cloudflare Pages connected to repo) will automatically detect and display the new assets for ALL visitors.

**Alternative: Direct to Hosting**
- If using Cloudflare Pages or similar dashboard: Upload via file manager or deploy tool into the assets/images path.

**Local Testing**
- Just place the files in this folder.
- Run a local server: `python -m http.server 8000` (from project root) or use Live Server in VS Code.
- View at http://localhost:8000

## Fallbacks
- If files are missing, the site uses:
  - Text-based logo fallback ("HMG ACADEMY") with styling.
  - Generic placeholder or emoji for founder photo.
- Site remains fully functional and professional even without uploads.

## Tips
- Optimize images (compress with TinyPNG or similar) for fast load.
- Use consistent naming if you add variants (e.g. founder-dark.jpg).
- Update this README if you add more assets.
- For logo updates later: Same process — just replace the file in the folder and redeploy.

Once uploaded, the entire HMG Academy site (and future pages) will reflect your real branding instantly.

Questions? Contact via WhatsApp +234 810 086 6322.

— Built as part of HMG Concepts ecosystem rebuild.