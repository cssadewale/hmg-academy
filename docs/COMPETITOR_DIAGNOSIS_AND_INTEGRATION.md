# HMG Academy v4 — Competitor Diagnosis & Integration Blueprint

Date: 2026-06-11  
Prepared for: HMG Academy rebuild

## Scope
The user requested an expert review of major tutor marketplaces, online learning portals, virtual classroom platforms, study-help sites and Nigerian tutoring competitors, then integration of missing useful features into HMG Academy using free-based tools only.

Sites reviewed or attempted:
- https://tuteria.com / v2.tuteria.com
- https://prepclass.com.ng
- https://app.gradely.co/
- https://kalvie.com/
- https://www.superprof.ng/
- https://preply.com
- https://www.tutorocean.com/
- https://aventolinkshub.com/
- https://www.teacheron.com/
- https://en.amazingtalker.com/
- https://upskillstutor.com.ng/
- https://www.tutorpoint.ng/
- https://clascity.com
- https://www.coursehero.com/ (blocked by Cloudflare during fetch)
- https://www.classgap.com/
- https://spires.co/application/ (resolved to Spires main site during fetch)
- https://gostudent.org
- https://www.tutopiya.com/
- https://etutor.ng/ (fetch failed; supplemented by public snippets/search visibility)
- https://jarada.com.ng/

## Common competitor patterns discovered

### 1. Search-first tutor marketplace
Common features:
- Search by subject, location/online, level, price, availability.
- Tutor cards with rating, reviews, session counts, verification badges and specialties.
- Profile browsing before commitment.
- Featured tutors and popular subjects.

HMG v4 integration:
- `tutors.html` includes a searchable/filterable tutor marketplace demo.
- Filters: subject, level, class type, rating/reviews sorting.
- Tutor cards include rating, review count, verification badge, subject coverage, language and bio.
- Save/compare feature implemented with localStorage.
- Booking routes to WhatsApp to avoid backend cost.

### 2. Matching and trial/evaluation workflow
Common features:
- “Find my tutor” or “get tutor matches” flows.
- Trial/free first lesson promises.
- Pre-assessment before tutor placement.
- Manual or AI matching.

HMG v4 integration:
- `book-tutor.html` contains structured WhatsApp matching form.
- `assessment.html` provides browser-based diagnostic placement demo.
- Matching remains human-reviewed because HMG avoids paid AI APIs.

### 3. Progress tracking and parent reporting
Common features:
- TutorPoint/Gradely-style assessment and measurable improvement.
- Parent-friendly reports.
- Progress dashboards and weak-area diagnosis.

HMG v4 integration:
- `dashboard.html` implements a localStorage parent dashboard demo.
- `assessment.html` stores a diagnostic result in browser.
- `homeschooling.html` explains weekly reporting and parent visibility.
- Reports can be printed or sent to WhatsApp manually.

### 4. Virtual classroom
Common features:
- Video, whiteboard, chat, file sharing, document editor, recordings, scheduling.
- Some competitors provide proprietary classrooms.

HMG v4 integration:
- `virtual-classroom.html` adds a canvas whiteboard demo with clear/download.
- The workflow recommends free tools: Google Meet/Zoom free plans, WhatsApp, shared files, downloaded whiteboards and LMS links.
- Session checklist included for tutor consistency.

### 5. Exam-specific pages and curriculum clusters
Common features:
- UTME/JAMB, WAEC/NECO, IGCSE, GCSE, A-Level, IB, IELTS, TOEFL, GRE, GMAT, SAT.
- Category landing pages and exam-focused CTAs.

HMG v4 integration:
- `exam-prep.html` includes local and international exam prep categories.
- `curriculum.html` preserves and expands curriculum overview.
- `lms.html` links Junior Class and Senior Class for Nigerian curriculum support.

### 6. Tutor application and tutor upliftment
Common features:
- Become a tutor pages.
- Tests, interviews, demo lessons, training, earning opportunities.

HMG v4 integration:
- `become-tutor.html` includes a full tutor application form via WhatsApp.
- `vetting-process.html` documents vetting stages.
- Tutor upliftment messaging preserved.

### 7. School partnerships and enterprise features
Common features:
- School dashboards, teacher training, software installation, branded programs.
- Analytics and certificates.

HMG v4 integration:
- `for-schools.html` includes CBT Pro rollout, LMS onboarding, teacher training, reports, branded programs and documentation.
- Uses HMG's existing free-tool ecosystem: CBT System, Timetable Craft, Student Tracker, Student at Risk Predictor, Schooldocforge and LMS platforms.

### 8. Study help, Q&A, assignments and resources
Common features:
- Homework help, question banks, resources, notes, study documents.
- CourseHero-like resource libraries and TeacherOn assignment help.

HMG v4 integration:
- `resources.html` introduces Study Desk: save homework questions, lesson note requests and resource needs in browser localStorage.
- Ethical framing: explanation, tutoring and learning support, not malpractice.
- Escalation to WhatsApp for tutor support.

### 9. Trust, safety and satisfaction guarantee
Common features:
- ID/credential checks, reviews, protected payments, dispute resolution, satisfaction guarantees.

HMG v4 integration:
- `vetting-process.html` documents subject mastery, teaching demo, credential/background checks, code of conduct and ongoing monitoring.
- `pricing.html` and `book-tutor.html` explain transparent quote process.
- Jarada-like escrow is noted conceptually, but not implemented because this is a static free-tool build.

### 10. Free-tool constraints
Many competitors use paid infrastructure, AI systems, payment gateways and proprietary classrooms. HMG's requirement is different: free-based tools and no paid AI API.

HMG v4 implementation approach:
- Static HTML/CSS/JS.
- Browser localStorage for demos.
- WhatsApp prefilled messages for forms.
- Existing free-hosted HMG tools on Vercel/Streamlit.
- No paid AI APIs.
- No backend storage in this package.

## Pages/features added or enhanced in Academy v4
- `index.html` — premium landing page with new founder image and v4 positioning.
- `tutors.html` — searchable tutor marketplace.
- `book-tutor.html` — structured WhatsApp matching form.
- `assessment.html` — diagnostic placement demo.
- `dashboard.html` — parent progress dashboard demo.
- `virtual-classroom.html` — whiteboard and free-tool classroom workflow.
- `resources.html` — Study Desk/Q&A/resource request tool.
- `tools.html` — updated EdTech, DataTech and ML project listings.
- `lms.html` — 12 HMG Academy LMS platforms, including Virtual Lab.
- `for-schools.html` — enterprise school rollout features.
- `become-tutor.html` and `vetting-process.html` — tutor onboarding and safety.
- Existing concepts preserved: virtual home schooling, exam prep, success stories, blog/resources, partners/ecosystem, contact, privacy, FAQ, notes, curriculum, webinars and admin demo.

## Final recommendation
HMG Academy should position itself differently from generic tutor marketplaces:

> A strictly virtual, educator-led, Nigerian-first learning institution that combines vetted tutors, CBT, LMS, diagnostics, parent reporting, school transformation and DataTech/EdTech proof — built with cost discipline and free tools.
