# HMG Academy — Assets Folder

## Folder Structure

```
assets/
├── images/
│   ├── og-image.png          ← Open Graph image (1200×630px) — used for social sharing
│   ├── logo.png              ← HMG Academy logo (transparent background)
│   ├── logo-white.png        ← White version for dark backgrounds
│   ├── adewale-headshot.webp ← Founder photo — used on About page
│   ├── favicon.ico           ← Browser tab icon
│   └── hero-bg.webp          ← Optional hero background image
│
├── notes/
│   └── (lesson note PDFs hosted on Google Drive — links managed via admin panel)
│
└── uploads/
    └── (images uploaded via admin panel — stored here)
```

## Image Specifications

| File | Size | Format | Notes |
|------|------|--------|-------|
| og-image.png | 1200×630px | PNG/JPG | Used on Facebook, Twitter, WhatsApp previews |
| logo.png | 400×120px | PNG (transparent) | Nav and footer logo |
| adewale-headshot.webp | 800×800px | WebP | Compress below 100KB |
| favicon.ico | 32×32px | ICO | Browser tab icon |

## How to Add Files via Admin Panel

1. Open admin.html and log in
2. Navigate to "Media Manager" in sidebar
3. Click "Upload File" and select your image or document
4. Copy the generated path and paste it into the relevant page field

## Notes on Google Drive PDF Hosting

Lesson notes are hosted on Google Drive (free).
To get a direct download link from Google Drive:
1. Upload PDF to Google Drive
2. Right-click → Share → Anyone with link → Viewer
3. Copy the share link
4. Replace /file/d/FILE_ID/view with /uc?export=download&id=FILE_ID
5. Paste this link into the admin panel lesson notes manager
