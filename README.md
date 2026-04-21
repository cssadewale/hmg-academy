# HMG Academy — Official Website

> **Nigeria's Full-Service Virtual Learning Institution**  
> Built by an educator who codes. Hosted free. Deployed globally.

[![Live Site](https://img.shields.io/badge/Live%20Site-hmgacademy.pages.dev-0F2547?style=for-the-badge&logo=cloudflare&logoColor=white)](https://hmgacademy.pages.dev)
[![Cloudflare Pages](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-F6821F?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![GitHub Pages](https://img.shields.io/badge/CBT%20Pro-GitHub%20Pages-181717?style=for-the-badge&logo=github)](https://cssadewale.github.io/cbt-system)
[![Analytics](https://img.shields.io/badge/Analytics-GA4%20Active-E37400?style=for-the-badge&logo=googleanalytics&logoColor=white)](https://analytics.google.com)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-E05A3A?style=for-the-badge)](#license)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Who This Is For](#2-who-this-is-for)
3. [Live URLs & Key Links](#3-live-urls--key-links)
4. [Repository Structure](#4-repository-structure)
5. [Technology Stack](#5-technology-stack)
6. [Design System](#6-design-system)
7. [Page-by-Page Documentation](#7-page-by-page-documentation)
   - [index.html — Homepage](#71-indexhtml--homepage)
   - [about.html — About](#72-abouthtml--about)
   - [services.html — Services](#73-serviceshtml--services)
   - [tools.html — Tools & Projects](#74-toolshtml--tools--projects)
   - [notes.html — Lesson Notes](#75-noteshtml--lesson-notes)
   - [register.html — Register](#76-registerhtml--register)
   - [contact.html — Contact](#77-contacthtml--contact)
   - [admin.html — Admin Panel](#78-adminhtml--admin-panel)
   - [404.html — Error Page](#79-404html--error-page)
8. [Shared Components](#8-shared-components)
9. [Admin Panel — Architecture & Setup](#9-admin-panel--architecture--setup)
   - [Authentication System](#91-authentication-system)
   - [GitHub Gist Cross-Device Sync](#92-github-gist-cross-device-sync)
   - [GitHub API One-Click Deploy](#93-github-api-one-click-deploy)
   - [Content Management Panels](#94-content-management-panels)
10. [SEO Implementation](#10-seo-implementation)
11. [Analytics — Google Analytics 4](#11-analytics--google-analytics-4)
12. [Integrations & Third-Party Services](#12-integrations--third-party-services)
13. [Deployed Projects Showcase](#13-deployed-projects-showcase)
14. [Deployment Guide — Cloudflare Pages](#14-deployment-guide--cloudflare-pages)
15. [Post-Deployment Checklist](#15-post-deployment-checklist)
16. [Google Search Console Setup](#16-google-search-console-setup)
17. [Pending Assets & TODOs](#17-pending-assets--todos)
18. [Contact & Social Media](#18-contact--social-media)
19. [About the Founder](#19-about-the-founder)
20. [License](#20-license)

---

## 1. Project Overview

This repository contains the complete source code for the official **HMG Academy** website — the primary digital presence of a strictly virtual Nigerian EdTech institution founded in 2015.

**HMG Academy is not a personal tutoring service.** It is a full-service virtual school with a team of seasoned, experienced teachers covering **all subjects, all levels, and every major Nigerian and international examination** — WAEC, NECO, GCE, BECE, UTME, Post-UTME, IGCSE, IELTS, JUPEB, and SAT.

The website serves four distinct audiences simultaneously:
- **Parents and students** looking for quality virtual education
- **Schools** seeking a free CBT exam platform (CBT Pro)
- **Recruiters and investors** evaluating the technical capability of the founder
- **Collaborators** interested in EdTech partnerships

### What Makes This Different

Most school websites are generic. This site is built by **Adewale Samson Adeagbo** — an educator with 15+ years of classroom experience who is also a Data Scientist and AI-Augmented Solutions Developer. Every design decision, every copy choice, and every feature reflects that dual identity. The site looks like a funded EdTech product. It costs ₦0 to run.

---

## 2. Who This Is For

| Audience | What They Find |
|---|---|
| Parents of JSS/SSS students | Enrolment info, services, WhatsApp contact |
| Students | Free lesson notes, CBT access, registration |
| School administrators | CBT Pro free platform, school partnerships |
| Recruiters and EdTech investors | 12 live deployed projects, founder credentials |
| Collaborators | GitHub profile, contact form, LinkedIn |

---

## 3. Live URLs & Key Links

| Resource | URL |
|---|---|
| 🌐 Live Website | https://hmgacademy.pages.dev |
| 🏠 Homepage | https://hmgacademy.pages.dev/index.html |
| 👤 About | https://hmgacademy.pages.dev/about.html |
| 🎓 Services | https://hmgacademy.pages.dev/services.html |
| 🔧 Tools & Projects | https://hmgacademy.pages.dev/tools.html |
| 📝 Lesson Notes | https://hmgacademy.pages.dev/notes.html |
| ✍️ Register | https://hmgacademy.pages.dev/register.html |
| 📞 Contact | https://hmgacademy.pages.dev/contact.html |
| 🔒 Admin Panel | https://hmgacademy.pages.dev/admin.html |
| 🗺️ Sitemap | https://hmgacademy.pages.dev/sitemap.xml |
| 🤖 Robots | https://hmgacademy.pages.dev/robots.txt |
| 💻 CBT Pro (Teacher) | https://cssadewale.github.io/cbt-system/teacher.html |
| 🎓 CBT Pro (Student) | https://cssadewale.github.io/cbt-system/student.html |
| 📦 GitHub Profile | https://github.com/cssadewale |
| 🧑‍💼 Personal Portfolio | https://cssadewale.pages.dev |
| 🏢 HMG Concepts | https://hmgconcepts.business.site |

---

## 4. Repository Structure

```
hmg-academy/
│
├── index.html          # Homepage — hero, services overview, founder strip, tools
├── about.html          # About page — academy story, founder bio, HMG Concepts
├── services.html       # Services — detailed descriptions of all 6 service lines
├── tools.html          # Tools & Projects — all 12 live EdTech/ML deployments
├── notes.html          # Lesson Notes — filterable PDF library for students
├── register.html       # Registration — enrolment forms and booking
├── contact.html        # Contact — form, WhatsApp, social media
├── admin.html          # Admin Panel — CMS, deploy engine, sync (see §9)
├── 404.html            # Custom 404 error page with branded navigation
│
├── _shared.css         # Global design system — all shared styles and tokens
├── _shared.js          # Global JavaScript — nav, scroll reveal, shared utilities
│
├── sitemap.xml         # SEO sitemap — 7 URLs, GSC-compatible, no XML comments
├── robots.txt          # Crawler rules — admin.html blocked, sitemap declared
│
└── assets/
    ├── og-image.png         # ⚠️ PENDING — 1200×630px social share image
    ├── favicon.ico          # ⚠️ PENDING — 32×32px browser tab icon
    ├── adewale-headshot.webp # ⚠️ PENDING — 800×800px founder photo
    └── images/
        └── hero-bg.webp     # ⚠️ OPTIONAL — hero background (under 200KB)
```

> **Note on admin.html:** This file is intentionally excluded from the sitemap and blocked in `robots.txt`. It contains a full content management and deployment system (see [Section 9](#9-admin-panel--architecture--setup)).

---

## 5. Technology Stack

This site was built using **zero paid tools**. Every component is free to use and free to host.

### Core Stack

| Layer | Technology | Why |
|---|---|---|
| **Structure** | HTML5 (semantic) | Maximum compatibility, no build step |
| **Styling** | CSS3 with Custom Properties | Design tokens, responsive, no preprocessor needed |
| **Interactivity** | Vanilla JavaScript (ES6+) | Zero dependencies, fast load on Nigerian networks |
| **Hosting** | Cloudflare Pages | Free, global CDN, unlimited bandwidth, auto SSL |
| **Version Control** | GitHub | Free, integrates with Cloudflare auto-deploy |
| **CBT Platform** | GitHub Pages (separate repo) | Free static hosting for cssadewale/cbt-system |

### Integrations & Services

| Service | Purpose | Cost |
|---|---|---|
| **Cloudflare Pages** | Hosting + global CDN | Free |
| **GitHub** | Version control + auto-deploy trigger | Free |
| **Google Analytics 4** | Traffic and behaviour analytics | Free |
| **Formspree** | Contact form submissions → email | Free (50/month) |
| **Google Drive** | Lesson note PDF hosting and delivery | Free |
| **WhatsApp Business** | Primary parent/student communication | Free |
| **Zoom / Google Meet** | Virtual class delivery | Free tiers |
| **GitHub Gist** | Admin panel cross-device sync + password hashing | Free |
| **GitHub API** | One-click site deployment from admin panel | Free |
| **Web Crypto API** | SHA-256 password hashing (browser-native) | Free/built-in |

### No Frameworks. No npm. No Node.js. No Build Tools.

This is a deliberate architectural choice. The site loads fast on slow Nigerian mobile networks because there is no JavaScript framework overhead, no heavy bundling, no runtime compilation. What you see in the source files is exactly what the browser renders.

---

## 6. Design System

The design system lives in `_shared.css` and is applied consistently across all pages.

### Color Palette

```css
:root {
  /* Primary */
  --navy:        #0F2547;   /* Royal Blue — institutional authority */
  --navy-deep:   #081730;   /* Deep navy — hero backgrounds, sidebar */
  --navy-mid:    #1B3A6B;   /* Mid navy — card backgrounds */
  --navy-light:  #2E5490;   /* Light navy — hover states */
  --navy-pale:   #EEF3FA;   /* Pale navy — section backgrounds */

  /* Accent */
  --gold:        #E8A020;   /* Warm Gold — primary accent */
  --gold-bright: #F5B942;   /* Bright Gold — hover, highlights */
  --gold-muted:  #C8891A;   /* Muted Gold — subtle elements */

  /* Status */
  --emerald:     #0D9E6A;   /* Green — live status, success */
  --coral:       #E05A3A;   /* Red/Coral — urgent, warnings */

  /* Neutral */
  --white:       #FFFFFF;
  --off-white:   #F9FAFB;
  --grey-100:    #F3F4F6;
  --grey-200:    #E5E7EB;
  --grey-400:    #9CA3AF;
  --grey-600:    #4B5563;
  --grey-800:    #1F2937;
}
```

### Typography

```css
--font-display: 'Fraunces', Georgia, serif;  /* Headings — editorial gravitas */
--font-body:    'DM Sans', system-ui, sans-serif;  /* Body — clean, readable */
```

Both fonts are loaded from Google Fonts with `preconnect` for performance. `Fraunces` is an optical-size variable font that gives headings a premium editorial quality. `DM Sans` is a geometric sans-serif that reads cleanly at small sizes on mobile screens.

### Admin Panel Typography (separate)
```css
--font:  'Plus Jakarta Sans', sans-serif;   /* Admin UI */
--mono:  'JetBrains Mono', monospace;       /* Code inputs, tokens */
```

### Spacing & Radius System

```css
--radius-sm:  6px;    /* Buttons, tags */
--radius:     10px;   /* Cards, inputs */
--radius-lg:  16px;   /* Large cards */
--radius-xl:  24px;   /* Hero card, modals */
```

### Animation System

All scroll-triggered animations use `IntersectionObserver` (no library required). Elements with the `.reveal` class fade and slide into view when they enter the viewport. The threshold is set at `0.12` with a `-40px` root margin for a natural feel.

```javascript
// _shared.js — Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### Responsive Breakpoints

```css
@media (max-width: 1100px)  { /* Desktop to tablet */  }
@media (max-width: 768px)   { /* Tablet to mobile */   }
@media (max-width: 480px)   { /* Small phones */       }
```

All layouts use CSS Grid and Flexbox. No float-based layouts. Mobile-first media queries with graceful enhancement for larger screens.

---

## 7. Page-by-Page Documentation

### 7.1 `index.html` — Homepage

**Title:** `HMG Academy — Nigeria's Full-Service Virtual Learning Institution`  
**Description:** `HMG Academy is a full-service virtual learning institution — not a tutoring service. A team of seasoned teachers. All subjects. All levels. WAEC, NECO, BECE, UTME, IGCSE, IELTS, JUPEB, SAT. Lagos & Ogun State, Nigeria.`

**Sections:**

1. **Announcement Bar** — Dismissable gold banner for urgent notices (e.g. exam registration deadlines). Closes on click and stores state in `sessionStorage`.

2. **Navigation** — Sticky navbar with HMG logo mark, 7 nav links, WhatsApp CTA button. Mobile: hamburger menu with full-screen slide-down panel. Becomes opaque with box-shadow on scroll.

3. **Hero** — Full-height section with gradient background and radial glow effects. Split layout: left side has eyebrow label, animated heading (line 1 + italic gold line 2), description paragraph, institution distinction note, two CTA buttons, and trust strip with 5 key stats. Right side has a floating glass-morphism card listing core services with live badge.

4. **Exam Marquee** — Infinite-scrolling horizontal ticker listing every supported examination (WAEC · NECO · GCE · BECE · UTME · Post-UTME · IGCSE · IELTS · JUPEB · SAT) with a gold pulsing dot. CSS-only animation via `@keyframes marquee`.

5. **Institution Distinction** — Three-column grid explaining the key differentiator: HMG Academy is a team, not a solo tutor. Cards cover: team of specialist teachers, comprehensive curriculum (all subjects), and real technology infrastructure.

6. **Services Overview** — Six service cards in a responsive grid: Virtual Classes, CBT Pro, International Exams, Lesson Notes, Data Science Training, Exam Registration & Admission. Each card links to the relevant section of `services.html`.

7. **CBT Pro Highlight** — Full-width dark feature section spotlighting CBT Pro with key stats (mock exams, questions, anti-cheat), two direct links to Teacher and Student portals, and GitHub link.

8. **Founder Strip** — Brief founder identity section: photo placeholder, name, title, dual identity (educator + data scientist), slogan, two CTA buttons. Links to `about.html` and personal portfolio.

9. **Tools Preview** — Grid of 4 featured tools linking to `tools.html` for the full 12-project showcase.

10. **Testimonials** — Placeholder cards for student/parent testimonials (to be populated via admin panel).

11. **Stats Strip** — Five animated counter cards: 15+ Years Teaching, 10+ Major Exams, All Subjects, Free CBT Platform, 12 Live Projects.

12. **CTA Section** — Final conversion section with registration button and WhatsApp link.

13. **Footer** — Four-column layout: brand + tagline + social icons, Services links, Academy links, Contact details. Copyright line. Animated particle background via Canvas API.

---

### 7.2 `about.html` — About

**Title:** `About — HMG Academy | Adewale Samson Adeagbo | Lagos & Ogun State Nigeria`

**Sections:**

1. **Page Hero** — Breadcrumb + heading + subtitle section explaining the page purpose.

2. **Academy Story** — The institutional origin: why HMG Academy was founded, what it stands for, and what separates it from ordinary tutoring.

3. **Founder Profile** — Adewale Samson Adeagbo's full profile: 15+ years teaching, data scientist, AI-Augmented Solutions Developer, founder of HMG Concepts. Includes teaching school history (God of Seed Academy, Dave Model School, Fredaks Group, High Favour School, Marie Group, and more from 2009 to present), qualifications, and the 3MTT origin story.

4. **Origin Story Highlight** — The turning point: how joining 3MTT in 2025 unlocked the technical capability that led to CBT Pro and 12 deployed projects.

5. **Philosophy Cards** — Six work philosophy principles: Problem First, Constraints Are Creative, Learning Deliberately, Built for Nigerian Context, Explainability Matters, Teaching Authentically.

6. **HMG Concepts Family** — Parent company overview with four subsidiary cards: HMG Academy, HMG Technologies, HMG Media, HMG Concepts. Academy card includes all exam badges (WAEC through SAT).

7. **Teaching Record Table** — Chronological table of all teaching positions from 2009 to present with school name, subjects, and level.

8. **CTAs** — Links to Projects, Contact, and Enrolment.

---

### 7.3 `services.html` — Services

**Title:** `Our Services — HMG Academy | Virtual Classes, CBT, Tutoring & Data Science`

**Six Full Service Sections:**

| # | Service | Target Audience |
|---|---|---|
| 1 | **Virtual Classes — All Subjects** | JSS1–SSS3 students needing structured lessons |
| 2 | **CBT Pro — Free Exam Platform** | Schools and students needing digital exam tools |
| 3 | **International Exam Preparation** | Students targeting IGCSE, IELTS, JUPEB, SAT |
| 4 | **Lesson Notes & Study Materials** | All students needing WAEC/NECO-aligned PDFs |
| 5 | **Data Science Training** | SS3 leavers and undergraduates entering tech |
| 6 | **Exam Registration & Admission** | Parents needing WAEC/NECO registration handled |

Each service section includes: full description, who it is for, what it covers, how to get started, and a CTA (WhatsApp or Register).

Additional sections:
- **Educator Services** — CBT lab setup, student counselling, academic seminars, inter-school quiz/debate competitions, digital skill empowerment.
- **Examination Matrix** — Visual grid showing which examinations HMG Academy covers across Nigerian and international systems.

---

### 7.4 `tools.html` — Tools & Projects

**Title:** `Tools & Projects — HMG Academy | 12 Live EdTech & Data Science Solutions`

This page showcases all 12 deployed projects built by Adewale Samson Adeagbo. It is evidence of technical capability, not just a list.

**Filter System:** Category filter bar (All, EdTech, ML Classification, ML Regression, NLP, Data Analytics) powered by Vanilla JS `data-category` attributes.

**Project Cards Include:**
- Category badge (colour-coded by type)
- Project name and one-line problem statement
- Key metric badge with real numbers (AUC, F1, R², accuracy)
- Tech stack tags
- Live App and GitHub buttons
- Status badge (Live / In Progress)
- Special badges (3MTT Capstone, Highest AUC, Only Regression, etc.)

**All 12 Projects:**

| # | Project | Type | Key Metric | Live App |
|---|---|---|---|---|
| 1 | CBT Pro | EdTech / Full-Stack | — | [Teacher](https://cssadewale.github.io/cbt-system/teacher.html) · [Student](https://cssadewale.github.io/cbt-system/student.html) |
| 2 | Student Performance Tracker | EdTech / Analytics | — | [App](https://adewale-student-performance-tracker.streamlit.app) |
| 3 | Student At-Risk Predictor | EdTech / ML | RF + SHAP | [App](https://student-at-risk-predictor.streamlit.app) |
| 4 | Student Study Plan Generator | EdTech / AI | — | [App](https://student-study-plan-generator.streamlit.app) |
| 5 | CBT Question Bank Manager | EdTech / Full-Stack | SQLite | [App](https://adewale-cbt-question-bank.streamlit.app) |
| 6 | Fake News Detector — TruthLens | NLP / Classification | AUC 0.9393 | [App](https://adewale-fake-news-detector.streamlit.app) |
| 7 | Employee Burnout Predictor — NeuroWell | ML Regression | R² 0.855 | [App](https://adewale-burnout-prediction.streamlit.app) |
| 8 | Insurance Claim Prediction | ML Classification | CV F1 0.7921 | [App](https://adewale-insurance-claim-prediction.streamlit.app) |
| 9 | Staff Promotion Prediction — Yakub | ML Classification | ROC-AUC 0.891 | [App](https://yakub-promotion-prediction.streamlit.app) |
| 10 | Bank Customer Churn Prediction | ML Classification | ROC-AUC 0.8675 | [App](https://adewale-bank-customer-churn-prediction.streamlit.app) |
| 11 | Income Level Prediction | ML Classification | Best of 5 models | [App](https://adewale-income-level-prediction.streamlit.app) |
| 12 | SwiftChain Delivery Delay Prediction | ML Multi-class | Weighted F1 0.5791 | [App](https://adewale-swiftchain-delivery-prediction.streamlit.app) |

All source code is at **[github.com/cssadewale](https://github.com/cssadewale)**.

---

### 7.5 `notes.html` — Lesson Notes

**Title:** `Lesson Notes — HMG Academy | Free WAEC/NECO Study Materials`

A filterable library of downloadable PDF lesson notes written by HMG Academy teachers.

**Filter System:** Two-level filter (Subject + Class Level) using JavaScript. Dynamic note count updates as filters are applied.

**Subjects Covered:** Mathematics, Further Mathematics, Physics, Chemistry, Biology, English Language, Economics, Government, Computer Science, Data Science, and more.

**Class Levels:** JSS1, JSS2, JSS3, SSS1, SSS2, SSS3, WAEC Prep, NECO Prep, UTME Prep, IGCSE, IELTS.

**Note Cards Include:** Subject tag, topic title, class level, term, short description, and a Download PDF button (linked to Google Drive with `uc?export=download` for direct download).

**Google Drive Integration:** All PDFs are hosted on Google Drive. The link format used is:
```
https://drive.google.com/uc?export=download&id=FILE_ID
```
To add a note: upload the PDF to Google Drive → share as "Anyone with link can view" → copy the file ID from the URL → paste into the Admin Panel's Lesson Notes form.

---

### 7.6 `register.html` — Register

**Title:** `Register — HMG Academy | Enrol for Classes & Training`

Registration and enrolment page for all HMG Academy services.

**Sections:**
- **Service Selection** — Cards for each service (Virtual Classes, One-on-One Tutoring, Data Science Training, CBT Lab Setup) with a Register button per card.
- **Google Form Embeds** — Direct embeds of Google Forms for structured data collection (student name, class level, contact, subject selection).
- **WhatsApp Registration Option** — Direct WhatsApp link pre-filled with enquiry message for instant contact.
- **Exam Registration** — Separate card for WAEC/NECO/GCE/UTME registration requests with form fields and submission.

---

### 7.7 `contact.html` — Contact

**Title:** `Contact — HMG Academy | Get in Touch`

**Contact Methods:**

| Method | Detail |
|---|---|
| WhatsApp (Primary) | +2348100866322 |
| WhatsApp (Secondary) | +2348094481488 |
| Brand Email | hismarvellousgrace@gmail.com |
| Tech Email | buildingmyictcareer@gmail.com |
| Contact Form | Formspree (action URL pending — see §17) |

**Form Fields:** Name, Email, Subject (dropdown with 6 categories), Message, Submit button.

**Formspree Integration:** The contact form uses Formspree for serverless form handling. Submissions are emailed directly to `hismarvellousgrace@gmail.com`. The Formspree endpoint ID is **pending setup** — see [Section 17](#17-pending-assets--todos).

**Social Media Strip:** LinkedIn, GitHub, YouTube, Instagram, X/Twitter (both personal and brand handles).

---

### 7.8 `admin.html` — Admin Panel

The admin panel is a complete, self-contained content management and deployment system built in Vanilla JavaScript. It has no external CMS dependency.

> **Access:** [hmgacademy.pages.dev/admin.html](https://hmgacademy.pages.dev/admin.html)  
> **Default password:** `hmgadmin2026`  
> **Security:** `noindex, nofollow` meta tag + blocked in `robots.txt`

See [Section 9](#9-admin-panel--architecture--setup) for full technical documentation.

---

### 7.9 `404.html` — Error Page

Custom branded 404 error page that matches the site design.

**Features:**
- Styled 404 heading with HMG Academy branding
- Human-friendly error message
- 6 suggested destination links (Services, Tools, Notes, Register, Contact, About)
- WhatsApp contact button
- Floating WhatsApp button (same as all pages)
- Full navigation and footer

**Cloudflare Pages Configuration:** Cloudflare Pages automatically serves `404.html` for any unmatched route. No additional configuration needed.

---

## 8. Shared Components

### `_shared.css`

The global stylesheet imports Google Fonts, defines all CSS custom properties (design tokens), and provides reusable component styles used across all pages:

- Navigation (sticky navbar, mobile hamburger, slide-down menu)
- Button system (`.btn`, `.btn-gold`, `.btn-navy`, `.btn-ghost`, `.btn-white-ghost`, etc.)
- Card system (`.card`, `.field-card`, service cards, tool cards)
- Badge system (`.badge`, `.badge-live`, `.badge-soon`, `.badge-navy`)
- Section layouts (`.section`, `.container`, `.page-hero`)
- Footer (four-column grid, social icons, copyright)
- WhatsApp float button (`.wa-float` — bottom-right fixed)
- Reveal animation classes (`.reveal`, `.reveal.visible`)
- Responsive utility classes

### `_shared.js`

Global JavaScript providing:

```javascript
// 1. Sticky navbar — adds 'scrolled' class on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. Mobile hamburger menu
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// 3. IntersectionObserver scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// 4. Dynamic copyright year
document.getElementById('year').textContent = new Date().getFullYear();
```

---

## 9. Admin Panel — Architecture & Setup

The admin panel (`admin.html`) is a 125KB standalone file containing a full CMS with three major engineering achievements: secure password hashing, cross-device sync via GitHub Gist, and one-click GitHub API deployment.

### 9.1 Authentication System

**Problem solved:** The previous admin panel stored passwords as plaintext in `localStorage`, which is both insecure and not cross-device.

**Solution:** Passwords are hashed using the **Web Crypto API** (`crypto.subtle.digest`), which is built into every modern browser — no library required.

```javascript
// SHA-256 hashing — browser-native, no library
async function sha256(str) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
```

**Login flow:**
1. User enters password in the login gate
2. If a GitHub Gist is connected, the admin panel fetches the stored hash from the Gist
3. The entered password is hashed with SHA-256
4. The two hashes are compared — never the plaintext passwords
5. If they match, the admin panel unlocks

**What is stored where:**

| Item | Where Stored | Format |
|---|---|---|
| Password hash | GitHub Gist + localStorage fallback | SHA-256 hex string |
| Gist ID | localStorage only | Reference key |
| GitHub token | localStorage only | Encrypted by browser |
| Plaintext password | **Nowhere** | Not stored ever |

**Reset to default:**
```javascript
async function doReset() {
  const hash = await sha256('hmgadmin2026');  // Hash of default password
  STATE.pwHash = hash;
  saveLocal();                                // Update local cache
  if (STATE.gistId) await pushToGist();       // Push to Gist if connected
  toast('Password reset to default: hmgadmin2026', 'ok');
}
```
The reset button on the login screen is wired to `confirmReset()` which opens a confirmation modal. Only on confirmation does `doReset()` execute.

---

### 9.2 GitHub Gist Cross-Device Sync

**Problem solved:** Any changes made on a tablet (notes added, testimonials created, password changed) should automatically be available when accessing the admin panel on another device.

**Architecture:** A **private GitHub Gist** (free, no repository needed) stores a single JSON file called `hmg-academy-admin-config.json`. This file is the single source of truth for:
- The SHA-256 password hash
- All lesson notes
- All tool/project entries
- All testimonials
- All WhatsApp templates
- Upload file records

Any device that opens the admin panel reads from the same Gist. Any change pushes back to the Gist.

**Gist JSON structure:**
```json
{
  "pwHash": "b1f6543a4e7c9c98...",
  "notes": [...],
  "tools": [...],
  "testi": [...],
  "uploads": [...],
  "waTemplates": [...],
  "updatedAt": "2026-04-19T10:30:00.000Z"
}
```

**Key functions:**
```javascript
// Read from Gist
async function gistRead() {
  const r = await fetch('https://api.github.com/gists/' + STATE.gistId, {
    headers: { 'Authorization': 'Bearer ' + STATE.gistToken }
  });
  const d = await r.json();
  return JSON.parse(d.files['hmg-academy-admin-config.json'].content);
}

// Write to Gist
async function gistWrite(data) {
  return await fetch('https://api.github.com/gists/' + STATE.gistId, {
    method: 'PATCH',
    headers: { 'Authorization': 'Bearer ' + STATE.gistToken },
    body: JSON.stringify({ files: { 'hmg-academy-admin-config.json': {
      content: JSON.stringify(data, null, 2)
    }}})
  });
}
```

**First-time setup (Step by step):**

**Step 1 — Create a GitHub Personal Access Token**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token → Fine-grained token**
3. Set name: `HMG Academy Admin`
4. Set expiration: 1 year (or No expiration)
5. Under **Permissions → Gist** → set to **Read and write**
6. Click **Generate token**
7. Copy the token immediately (it is shown only once)

**Step 2 — Connect in the admin panel**
1. Open [hmgacademy.pages.dev/admin.html](https://hmgacademy.pages.dev/admin.html)
2. Click **"Configure GitHub Gist sync"** on the login screen
3. Paste your token and GitHub username (`cssadewale`)
4. Leave "Existing Gist ID" blank (for first setup)
5. Click **Connect Gist**
6. The admin panel creates a private Gist automatically
7. A Gist ID is displayed — **save this ID** (e.g. `abc123def456...`)

**Step 3 — Reconnect from another device**
1. On the new device, open the admin panel
2. Click **"Configure GitHub Gist sync"**
3. Enter your token and username
4. Paste your saved Gist ID into the "Existing Gist ID" field
5. Click **Connect Gist** → all content and password sync instantly

**Offline fallback:** If the Gist is unreachable, the admin panel falls back to the locally stored data (in `localStorage`). Changes made offline are pushed to the Gist when connection is restored via the **↻ Sync Now** button in Settings.

---

### 9.3 GitHub API One-Click Deploy

**What it does:** Pushes selected site files directly to your GitHub repository via the GitHub REST API. Cloudflare Pages detects the commit and automatically rebuilds the live site in approximately 30 seconds.

**Required token permissions:** Fine-grained token → Repository → Selected repository (your HMG Academy repo) → Contents → **Read and write**.

> **This is a different token from the Gist token.** The deploy token needs `repo:contents` write access. The Gist token only needs `gist` access. They can be the same token if you set both permissions on one fine-grained token.

**Deploy flow:**

```javascript
async function deployNow() {
  // 1. Get files selected in the checkbox list
  const files = getSelectedFiles();

  // 2. For each file, get current SHA (required by GitHub API to update a file)
  const sha = await getSHA(token, user, repo, branch, filename);

  // 3. Encode file content as base64 (GitHub API requirement)
  const encoded = btoa(unescape(encodeURIComponent(content)));

  // 4. PUT to GitHub Contents API
  await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${filename}`, {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({
      message: commitMessage,
      content: encoded,
      sha: sha,        // required for updating existing files
      branch: branch
    })
  });

  // 5. Log result → Cloudflare Pages auto-detects the push → live in ~30 seconds
}
```

**Files that can be deployed:** index.html, about.html, services.html, tools.html, notes.html, register.html, contact.html, sitemap.xml, robots.txt.

**Special handling:** `sitemap.xml` and `robots.txt` are regenerated fresh on every deploy (with today's date for the sitemap `<lastmod>` field), ensuring they are always current without manual editing.

**Rate limiting:** A 350ms delay is introduced between each file push to respect GitHub API rate limits and ensure reliable deployment.

---

### 9.4 Content Management Panels

The admin panel has **13 sidebar sections**:

| Panel | What It Manages |
|---|---|
| **Dashboard** | Stats overview, quick actions, health checklist, deploy bar |
| **Deploy to GitHub** | Token config, file selector, deploy log, test connection |
| **Site Content** | Hero text, bio, services header, contact info, footer (5 tabs) |
| **Announcements** | Homepage announcement bar with live preview and colour themes |
| **Lesson Notes** | Add/delete notes with subject, level, term, and Google Drive link |
| **Tools & Projects** | All 12 projects pre-loaded; add/delete tools |
| **Testimonials** | Add/delete with name, role, rating, avatar emoji |
| **File Uploads** | Drag-and-drop upload tracker with file type icons |
| **Pages** | All 7 pages with preview links; generate new page modal |
| **SEO Manager** | Per-page title/description with char counters, GSC guide |
| **WhatsApp Templates** | 4 pre-written templates; add/delete/copy to clipboard |
| **Settings & Sync** | Gist connection, GitHub deploy config, data export/import |
| **Change Password** | SHA-256 hashed, synced to Gist, with strength meter |

**Keyboard shortcuts (when admin panel is open):**

| Shortcut | Action |
|---|---|
| `Alt + D` | Go to Dashboard |
| `Alt + N` | Go to Lesson Notes |
| `Alt + P` | Go to Deploy |
| `Alt + M` | Go to Media / Uploads |
| `Alt + S` | Go to Settings |

---

## 10. SEO Implementation

Every page in this project follows a consistent SEO pattern. This is documented here so that any future page or update maintains the same standard.

### Per-Page SEO Elements

```html
<!-- 1. Title — unique per page, target 50–60 characters -->
<title>Page Name — HMG Academy | Short Descriptor</title>

<!-- 2. Meta description — 130–160 characters, includes keywords -->
<meta name="description" content="..." />

<!-- 3. Canonical URL — prevents duplicate content issues -->
<link rel="canonical" href="https://hmgacademy.pages.dev/page.html" />

<!-- 4. Open Graph — for Facebook, LinkedIn, WhatsApp sharing -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://hmgacademy.pages.dev/page.html" />
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
<meta property="og:image" content="https://hmgacademy.pages.dev/assets/og-image.png" />
<meta property="og:site_name" content="HMG Academy" />

<!-- 5. Twitter Card — for X/Twitter sharing -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@hmgconcepts" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://hmgacademy.pages.dev/assets/og-image.png" />

<!-- 6. Admin page only: noindex, nofollow -->
<meta name="robots" content="noindex, nofollow" />
```

### JSON-LD Structured Data (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "HMG Academy",
  "alternateName": "His Marvellous Grace Academy",
  "url": "https://hmgacademy.pages.dev",
  "description": "HMG Academy is a full-service virtual learning institution...",
  "foundingDate": "2015",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NG",
    "addressRegion": "Lagos / Ogun State"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+2348100866322",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://linkedin.com/in/hmgconcepts",
    "https://instagram.com/hmgconcepts",
    "https://youtube.com/@hmgconcepts",
    "https://facebook.com/hmgconceptspg"
  ],
  "founder": {
    "@type": "Person",
    "name": "Adewale Samson Adeagbo",
    "url": "https://cssadewale.pages.dev"
  }
}
```

### Sitemap (`sitemap.xml`)

The sitemap is XML-comment-free (Google Search Console rejects sitemaps with comments inside the `<urlset>` block). It declares 7 URLs:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://hmgacademy.pages.dev/</loc><priority>1.0</priority></url>
  <url><loc>https://hmgacademy.pages.dev/about.html</loc><priority>0.9</priority></url>
  <url><loc>https://hmgacademy.pages.dev/services.html</loc><priority>0.9</priority></url>
  <url><loc>https://hmgacademy.pages.dev/register.html</loc><priority>0.85</priority></url>
  <url><loc>https://hmgacademy.pages.dev/contact.html</loc><priority>0.85</priority></url>
  <url><loc>https://hmgacademy.pages.dev/tools.html</loc><priority>0.80</priority></url>
  <url><loc>https://hmgacademy.pages.dev/notes.html</loc><priority>0.75</priority></url>
</urlset>
```

Note: `admin.html` and `404.html` are intentionally excluded.

### Robots (`robots.txt`)

```
User-agent: *
Allow: /
Disallow: /admin.html
Sitemap: https://hmgacademy.pages.dev/sitemap.xml

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /
```

### Target Keywords

| Keyword | Difficulty | Intent |
|---|---|---|
| `virtual school Nigeria` | Medium | Informational / Commercial |
| `WAEC preparation Nigeria` | Medium | Commercial |
| `IELTS preparation Nigeria` | Medium | Commercial |
| `IGCSE tutor Lagos` | Low | Commercial |
| `free CBT exam platform Nigeria` | Low | Commercial |
| `data science training Nigeria` | Low | Commercial |
| `HMG Academy` | Brand | Navigational |
| `Adewale Samson Adeagbo` | Brand | Navigational |
| `virtual classes Lagos Nigeria` | Low | Commercial |

---

## 11. Analytics — Google Analytics 4

**Measurement ID:** `G-J5C7CTP1N5`

GA4 is installed on **all pages** (index, about, services, tools, notes, register, contact). The admin panel (`admin.html`) does include the GA4 snippet to avoid tracking internal admin visits — however, since the admin panel has a `noindex` meta tag, admin visits will be in your analytics data but will not appear in search results.

**Installation (on each page):**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-J5C7CTP1N5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-J5C7CTP1N5');
</script>
```

**To view your analytics:** Go to [analytics.google.com](https://analytics.google.com) and sign in with the Google account linked to `G-J5C7CTP1N5`.

**Key metrics to monitor:**
- Sessions by page (which pages get the most traffic)
- Traffic source (WhatsApp referral, Google search, direct)
- Device breakdown (expect high mobile from Nigerian users)
- Events (button clicks, form submissions if tagged)

---

## 12. Integrations & Third-Party Services

### Cloudflare Pages (Hosting)

**How auto-deploy works:**
1. You push a commit to your GitHub repository (manually or via the admin panel deploy button)
2. Cloudflare Pages detects the push via webhook
3. Cloudflare builds and deploys the site globally in approximately 30 seconds
4. No build command is needed — this is pure HTML/CSS/JS

**Cloudflare Pages configuration:**
- Build command: *(none — static site)*
- Build output directory: `/` *(root)*
- Root directory: `/` *(root)*
- Node.js version: *(not applicable)*

### WhatsApp Integration

WhatsApp links use the `wa.me` format with pre-filled messages:

```html
<!-- Basic contact link -->
<a href="https://wa.me/2348100866322?text=Hello%20HMG%20Academy%2C%20I%20am%20interested%20in%20your%20services."
   target="_blank" rel="noopener">Chat on WhatsApp</a>

<!-- Subject-specific links (e.g. for a service page) -->
<a href="https://wa.me/2348100866322?text=Hello%2C%20I%20want%20to%20register%20for%20Virtual%20Classes."
   target="_blank" rel="noopener">Register via WhatsApp</a>
```

**Primary number:** +2348100866322  
**Secondary (WhatsApp only):** +2348094481488

### Formspree (Contact Form)

**Status:** ⚠️ Pending — Formspree endpoint ID not yet configured.

**To set up:**
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form → copy the form ID (e.g. `xyzabcde`)
3. In `contact.html`, update the form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Deploy via the admin panel

**Free tier:** 50 submissions per month. Submissions are emailed to `hismarvellousgrace@gmail.com`.

### Google Drive (Lesson Notes)

Lesson note PDFs are uploaded to Google Drive and linked via:
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

**To get the file ID from a Google Drive link:**
```
https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OEXKR2QI/view
                                  ↑ This is the FILE_ID
```

**Folder structure recommendation:**
```
HMG Academy Lesson Notes/
├── Mathematics/
│   ├── JSS1/
│   ├── JSS2/
│   └── SSS3/
├── Further Mathematics/
├── Physics/
├── Chemistry/
└── ...
```

### Google Fonts

Two font families are loaded with `preconnect` for performance:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@...&family=DM+Sans:...&display=swap" rel="stylesheet" />
```

`display=swap` ensures text is visible immediately while fonts load, preventing flash of invisible text (FOIT) on slow connections.

---

## 13. Deployed Projects Showcase

All 12 projects are hosted separately from the main website. The main website showcases them on `tools.html`. Every project follows the same GitHub/Streamlit pattern:

| Pattern | Format |
|---|---|
| GitHub repo | `github.com/cssadewale/{repo-name}` |
| Streamlit app | `adewale-{repo-name}.streamlit.app` (most) |
| Exceptions | `yakub-promotion-prediction.streamlit.app`, `student-study-plan-generator.streamlit.app`, `student-at-risk-predictor.streamlit.app` (no prefix) |

**CBT Pro** is the exception — it is hosted on GitHub Pages, not Streamlit:
```
Teacher portal: cssadewale.github.io/cbt-system/teacher.html
Student portal: cssadewale.github.io/cbt-system/student.html
```

### Active Upskilling Programmes (as of April 2026)

| Programme | Provider | Track |
|---|---|---|
| DeepTech_Ready | DSN × 3MTT × Google.org | DSML, Cohort 3 |
| Applied Data Science Lab | WorldQuant University | Ongoing |
| Machine Learning Core | Kodecamp Cohort 6 | ML Track |

---

## 14. Deployment Guide — Cloudflare Pages

### First-Time Setup

**Prerequisites:**
- A GitHub account
- A Cloudflare account (free at [cloudflare.com](https://cloudflare.com))
- This repository pushed to GitHub as `hmg-academy` (or your chosen repo name)

**Step 1 — Push to GitHub**
```bash
# If starting fresh
git init
git add .
git commit -m "Initial commit — HMG Academy website"
git branch -M main
git remote add origin https://github.com/cssadewale/hmg-academy.git
git push -u origin main

# For subsequent updates
git add .
git commit -m "Update: [describe your changes]"
git push
```

**Step 2 — Connect to Cloudflare Pages**
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Authorize Cloudflare to access your GitHub account
3. Select your `hmg-academy` repository
4. Configure build settings:
   - **Project name:** `hmgacademy` (this becomes your subdomain: `hmgacademy.pages.dev`)
   - **Production branch:** `main`
   - **Build command:** *(leave blank — static site)*
   - **Build output directory:** `/` or leave blank
5. Click **Save and Deploy**
6. Wait ~30 seconds for the first build to complete

**Step 3 — Verify Live URL**

Visit [https://hmgacademy.pages.dev](https://hmgacademy.pages.dev). The site should be live.

### Deploying Updates

**Option A — Admin Panel (recommended)**
1. Open [hmgacademy.pages.dev/admin.html](https://hmgacademy.pages.dev/admin.html)
2. Log in with your admin password
3. Make your content changes in the relevant panel
4. Click **🚀 Deploy Changes Live Now** in the Dashboard or Deploy panel
5. Cloudflare Pages rebuilds in ~30 seconds

**Option B — GitHub directly (for HTML file edits)**
```bash
# Edit files locally or on GitHub.com
git add .
git commit -m "Update: describe changes"
git push
# Cloudflare auto-detects push → rebuilds live site
```

### Custom Domain (Optional — when ready)

1. In Cloudflare Pages → your project → **Custom Domains** → **Set up a custom domain**
2. Enter your domain (e.g. `hmgacademy.com.ng`)
3. Follow Cloudflare's DNS instructions to add a CNAME record
4. SSL certificate is provisioned automatically (free)
5. Update all canonical URLs in HTML files and the sitemap

---

## 15. Post-Deployment Checklist

Run through this checklist every time you deploy a major update.

### Immediately After First Deployment

- [ ] Visit [hmgacademy.pages.dev](https://hmgacademy.pages.dev) and verify all pages load
- [ ] Test the navigation menu on mobile (hamburger)
- [ ] Test all 7 nav links resolve correctly
- [ ] Test the WhatsApp button opens chat with pre-filled message
- [ ] Test the announcement bar dismisses on click
- [ ] Verify `admin.html` is accessible but does not appear in search (check `robots.txt`)

### SEO Checks

- [ ] Verify `sitemap.xml` loads at `hmgacademy.pages.dev/sitemap.xml`
- [ ] Verify `robots.txt` loads at `hmgacademy.pages.dev/robots.txt`
- [ ] Submit to Google Search Console (see Section 16)
- [ ] Upload `og-image.png` (1200×630px) to `assets/`
- [ ] Test social sharing preview using [opengraph.xyz](https://opengraph.xyz)
- [ ] Upload `favicon.ico` (32×32px) — generate at [favicon.io](https://favicon.io)

### Functionality Checks

- [ ] Formspree endpoint configured in `contact.html`
- [ ] Test contact form submission (submit → check email inbox)
- [ ] Verify all 12 tool links on `tools.html` open correctly
- [ ] Verify CBT Pro links open teacher and student portals
- [ ] Test filter bar on `notes.html`
- [ ] Test registration forms on `register.html`
- [ ] Verify Google Analytics is receiving data (check Realtime in GA4)
- [ ] Test admin panel login with default password
- [ ] Configure GitHub Gist sync in admin panel
- [ ] Configure GitHub deploy token in admin panel
- [ ] Test one-click deploy from admin panel

### Content Checks

- [ ] Replace founder photo placeholder on `about.html`
- [ ] Replace team photo placeholder on `index.html`
- [ ] Add first lesson note via admin panel
- [ ] Add first testimonial via admin panel

---

## 16. Google Search Console Setup

**Step-by-step guide to verify ownership and submit your sitemap.**

### 1. Add Property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property** → **URL prefix**
3. Enter: `https://hmgacademy.pages.dev`
4. Click **Continue**

### 2. Verify Ownership (HTML Tag Method — recommended for Cloudflare Pages)

1. Select the **HTML tag** verification method
2. Copy the meta tag provided, e.g.:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. Paste it inside the `<head>` tag of `index.html` (before `</head>`)
4. Commit and push — or use the Admin Panel to deploy the updated `index.html`
5. Return to Search Console and click **Verify**
6. Verification should succeed within a few minutes

### 3. Submit Sitemap

1. In Search Console left sidebar, click **Sitemaps**
2. In the "Add a new sitemap" field, enter:
   ```
   sitemap.xml
   ```
   (Search Console prepends the domain automatically)
3. Click **Submit**
4. Status should change to **Success** within 24–72 hours

### 4. Monitor Performance

- **Coverage** tab — shows which URLs are indexed vs. errors
- **Performance** tab — shows impressions, clicks, CTR, and average position for each keyword
- **Core Web Vitals** — performance scores for LCP, INP, CLS

Check these tabs weekly for the first month, then monthly thereafter.

---

## 17. Pending Assets & TODOs

These items are required for the site to be fully production-ready:

### Critical (Must Do Before Launch)

| Item | Description | How To Create |
|---|---|---|
| `assets/og-image.png` | Social sharing preview (1200×630px) | Use [Canva](https://canva.com) — use HMG Academy navy and gold branding |
| `assets/favicon.ico` | Browser tab icon (32×32px) | Use [favicon.io](https://favicon.io) with the HMG mark |
| Formspree endpoint | Contact form delivery | Sign up at [formspree.io](https://formspree.io) → paste ID into `contact.html` |
| GSC Verification | Google Search Console | Follow Section 16 |

### Important (Do Within First Week)

| Item | Description |
|---|---|
| `assets/adewale-headshot.webp` | Founder photo for About page and Founder Strip (800×800px, square, WebP) |
| Admin panel Gist setup | Connect GitHub Gist for cross-device sync (see Section 9.2) |
| Admin panel deploy setup | Configure GitHub token for one-click deploy (see Section 9.3) |
| First lesson note | Add at least one note via admin panel so the Notes page has content |

### Optional (Ongoing Improvements)

| Item | Description |
|---|---|
| `assets/images/hero-bg.webp` | Hero background image (1400×800px, under 200KB) |
| Testimonials | Paste real WhatsApp/email feedback via admin panel |
| Blog posts | Article content for SEO — learning journey, WAEC tips, data science |
| Newsletter | Set up Brevo (free — 300 emails/day) for student announcements |
| CBT Lab video | Short YouTube explainer embedded on Services page |
| Inter-school hackathon page | Future service — secondary school hackathon for EdTech impact |

---

## 18. Contact & Social Media

### Direct Contact

| Channel | Detail |
|---|---|
| 📱 WhatsApp (Primary) | [+2348100866322](https://wa.me/2348100866322) |
| 📱 WhatsApp (Secondary) | [+2348094481488](https://wa.me/2348094481488) |
| 📞 Phone | +2349077907677 |
| 📧 Brand Email | hismarvellousgrace@gmail.com |
| 📧 Tech Email | buildingmyictcareer@gmail.com |
| 📧 Official Email | adeagboadewalesamson@gmail.com |

### HMG Concepts Brand Presence

| Platform | Handle / URL |
|---|---|
| LinkedIn | [linkedin.com/in/hmgconcepts](https://linkedin.com/in/hmgconcepts) |
| Instagram | [instagram.com/hmgconcepts](https://instagram.com/hmgconcepts) |
| YouTube | [youtube.com/@hmgconcepts](https://youtube.com/@hmgconcepts) |
| Facebook | [facebook.com/hmgconceptspg](https://facebook.com/hmgconceptspg) |
| X (Twitter) | [x.com/hmgconcepts](https://x.com/hmgconcepts) |
| Website | [hmgacademy.pages.dev](https://hmgacademy.pages.dev) |

### Personal / Technical

| Platform | Handle / URL |
|---|---|
| GitHub | [github.com/cssadewale](https://github.com/cssadewale) |
| Personal Portfolio | [cssadewale.pages.dev](https://cssadewale.pages.dev) |
| LinkedIn | [linkedin.com/in/adewalesamsonadeagbo](https://linkedin.com/in/adewalesamsonadeagbo) |
| Instagram | [instagram.com/cssadewale](https://instagram.com/cssadewale) |
| X (Twitter) | [x.com/cssadewale](https://x.com/cssadewale) |

---

## 19. About the Founder

**Adewale Samson Adeagbo** is the Founder and Director of HMG Concepts (est. 2015) and the Data Lead of HMG Academy. He is a Data Scientist, AI-Augmented Solutions Developer, and Educator with 15+ years of classroom experience across Lagos and Ogun State, Nigeria.

His formal tech journey began with the **3MTT Programme in 2025** — the turning point that transformed 15 years of classroom observations into deployable technical solutions. Since then he has shipped 12 live projects across EdTech, insurance, HR, banking, logistics, NLP, and healthcare.

He does not code HTML/CSS/JS in the traditional sense. He uses AI as a force multiplier — the same way a senior data scientist uses Python: as a tool in service of clear thinking about real problems. CBT Pro was built on an Android tablet with no laptop and zero budget. It is actively used by real students.

His philosophy: *"Data science taught me that if you can think through a problem clearly, you can find a path to a solution — even in unfamiliar territory."*

His slogan: *"Learning Deliberately. Teaching Authentically."*

**Active programmes (2026):**
- DeepTech_Ready — DSN × 3MTT × Google.org (DSML Track, Cohort 3)
- Applied Data Science Lab — WorldQuant University (ongoing)
- Machine Learning Core — Kodecamp Cohort 6

**B.Sc.(Ed) Computer Science Education** — Lagos State University, 2023.

---

## 20. License

```
Copyright © 2026 Adewale Samson Adeagbo | HMG Concepts
All Rights Reserved.

This repository contains the source code for hmgacademy.pages.dev.

You may NOT:
- Copy, fork, or redistribute this code for commercial purposes
- Use the HMG Academy branding, name, or assets in any other project
- Deploy a copy of this site as your own without written permission

You MAY:
- Study the code for educational purposes
- Reference specific techniques (CSS patterns, JavaScript functions) in your own original work
- Link to the live site from articles, portfolios, or social media

For permissions or enquiries: hismarvellousgrace@gmail.com
```

---

<div align="center">

**Built by [Adewale Samson Adeagbo](https://cssadewale.pages.dev)**  
*Learning Deliberately. Teaching Authentically.*

[![HMG Academy](https://img.shields.io/badge/HMG%20Academy-hmgacademy.pages.dev-0F2547?style=flat-square)](https://hmgacademy.pages.dev)
[![Personal Portfolio](https://img.shields.io/badge/Portfolio-cssadewale.pages.dev-E8A020?style=flat-square)](https://cssadewale.pages.dev)
[![GitHub](https://img.shields.io/badge/GitHub-cssadewale-181717?style=flat-square&logo=github)](https://github.com/cssadewale)

*Hosted free on Cloudflare Pages · Built in HTML, CSS & Vanilla JavaScript · Zero budget, production quality*

</div>
