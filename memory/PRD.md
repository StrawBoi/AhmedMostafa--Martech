# PRD — Ahmed Mostafa Recruiter-First Portfolio

## Original problem statement
Build a new personal portfolio website for Ahmed Mostafa. Recruiter-first experience with stronger visual system, clearer hierarchy, smoother UX. Primary audience: recruiters, HR managers, hiring managers. Goal: help Ahmed land a marketing-related internship in Belgium or Europe. Position him as a marketing / growth / research / analytics intern with an unusual hybrid analytics + automation strength — not as a senior IT professional.

Visual direction: editorial premium, brighter than old all-black site, light mode default + dark mode supported, warm neutral / soft stone palette + one controlled accent, strong typography and whitespace, restrained motion, no AI gradients or floating blobs.

## User personas
- Recruiter / HR — scans page in 30s, needs role fit, location, availability, fast contact path.
- Hiring manager — reads featured work for substance, scans capabilities, downloads CV.
- Direct stakeholder (founder of small team) — reads journey + recruiter FAQ, contacts via form.

## Core requirements (static)
- Pages: Home, Projects (list), Projects/:slug (case study template), About, Contact.
- Homepage section order: Header → Hero → Proof strip → Featured work (3) → Capability pillars → Selected journey → Recruiter FAQ → Contact CTA.
- Sticky scroll-aware header; nav (Projects, About, Contact); LinkedIn + Download CV utilities; theme toggle.
- Hero: positioning headline, subheadline, View Projects (primary), Download CV (secondary); no autoplay video; no oversized bio.
- Featured work: 3 cards, first dominant (asymmetric), each with title, challenge, role, visual, takeaway, CTA.
- Capability pillars: Research & Insight, Campaign & Content Thinking, Data/Automation/Execution — interactive reveal.
- Recruiter FAQ: targeted role, location, team fit, differentiator, availability.
- Contact: real backend form + mailto fallback.

## Architecture & tasks done
- **Stack**: FastAPI + MongoDB backend, React 19 + React Router 7 + Tailwind + shadcn/ui frontend.
- **Design system**: Editorial palette (warm bone `#F5F3E9`, ink `#1E1C1A`, terracotta accent `#C45532`), Fraunces serif + DM Sans + JetBrains Mono. Tokens in `index.css`, custom utilities (`.btn-primary`, `.btn-ghost`, `.link-underline`, `.reveal`).
- **Backend** (`/app/backend/server.py`):
  - `GET /api/` — health
  - `POST /api/status` / `GET /api/status` — preserved
  - `POST /api/contact` (Pydantic `ContactCreate` w/ EmailStr, min 10-char message) → 201 + `ContactMessage`
  - `GET /api/contact` — list, sorted by `created_at` desc, `_id` excluded
- **Frontend pages**: `HomePage`, `ProjectsPage`, `ProjectDetailPage`, `AboutPage`, `ContactPage`.
- **Components**: `Header` (sticky/glassmorphic), `Footer`, `ThemeToggle` (light/dark via `localStorage` + `.dark` class), `useReveal` hook (IntersectionObserver-based fade-up).
- **Sections**: `Hero`, `ProofStrip`, `FeaturedWork`, `CapabilityPillars`, `Journey`, `RecruiterFAQ`, `ContactCTA`.
- **Data**: centralized in `/app/frontend/src/lib/data.js` — `profile`, `proofPoints`, `featuredProjects` (3), `allProjects` (5), `capabilities`, `journeyChapters`, `recruiterFAQ`.
- **Form UX**: client-side validation, axios POST, sonner toast on success/error, mailto fallback link prefilled with current draft.
- **Accessibility**: semantic HTML, aria-expanded/aria-controls on accordions, keyboard-focusable buttons, contrast-checked palette, `data-testid` on every interactive/critical element.

## Implementation log
- **2026-05-07**: Initial MVP shipped — full design system + backend contact endpoint + 5 pages + 7 home sections. Tested 100% backend (8/8 pytest), 100% frontend (22 checkpoints). Minor refactor: logger hoisted above route definitions; ThemeToggle uses lazy initializer to avoid first-paint flicker.
- **2026-05-07 (iter 2 — launch readiness)**:
  - Real LinkedIn URL wired (`linkedin.com/in/ahmed-mohsen-hanafy`).
  - Email kept private — every visible mailto link removed; contact form is now the sole inbound channel; the address lives in `data.js` for backend / future use only.
  - New `<CVButton>` component — replaces every dead `#` link with a polished disabled `<button aria-disabled="true">` that swaps the icon + label to "Coming soon" on hover and exposes a `[SOON]` badge in compact variants. Variants: primary / ghost / header / footer / inverted.
  - Backend `/api/contact` hardened: hidden `website` honeypot field (silent 201 + no persistence), IP-based rate limit (max 5 / hour, 429 response, supports `x-forwarded-for`/`x-real-ip`), `_ip` field excluded from public reads, compound index `(_ip, created_at)` ensured on startup.
  - PostHog analytics wired via `lib/analytics.js` on hero View Projects, every CV touch, every LinkedIn click, contact submit (intent / success / error), featured project card clicks.
  - Custom 404 page (`NotFoundPage`) added at catch-all route with home + projects CTAs.
  - SEO/social: `<title>`, `meta description`, OpenGraph + Twitter Card meta, editorial SVG OG image, "AM" terracotta SVG favicon.
  - Tested 100% backend (9/9 pytest) + 100% frontend (38/38 + 7 regression).
  - Post-test polish: unified analytics events (single `cv_download_clicked` with `source` + `variant` props instead of per-source event names).

## What's been implemented
- ✅ Home with all 8 ordered sections
- ✅ Projects index + dynamic case study template (`/projects/:slug`)
- ✅ About + Contact pages
- ✅ Sticky scroll-aware header w/ mobile menu, theme toggle, LinkedIn, Download CV
- ✅ Light + dark mode (light default), persisted in localStorage
- ✅ Reusable component + design system (palette tokens, typography, motion)
- ✅ Real contact form → MongoDB + mailto fallback
- ✅ Smooth scroll, restrained reveals, asymmetric featured grid
- ✅ Mobile-responsive across all pages
- ✅ data-testid coverage

## Backlog — prioritized

### P0 — required before sharing with recruiters
- Upload the real CV PDF to `/app/frontend/public/Ahmed-Mostafa-CV.pdf`, then flip `profile.cvAvailable = true` and `profile.cvUrl = "/Ahmed-Mostafa-CV.pdf"` in `/app/frontend/src/lib/data.js`. Every CV button across the site will switch from "Coming soon" to a real download in one edit.
- Replace the 5 project images and write the real challenge/role/takeaway copy per project in `data.js`.
- Replace the editorial OG image (`/app/frontend/public/og-image.svg`) with a real branded preview when ready.

### P1 — strongly recommended polish
- Hero portrait slot (currently no photo — design is intentionally clean — add when photo is ready).
- Full case-study Approach + Outcome bodies per project (currently surfaces an honest "draft / on request" message instead of fictional content).
- JSON-LD `Person` schema, sitemap.xml, robots.txt.
- Real apple-touch-icon PNG (favicon.svg currently does double-duty).

### P2 — growth / lead-quality wins
- Email forwarding/notification on new `/api/contact` submission (Resend integration) so Ahmed gets notified instantly.
- Analytics dashboard / weekly digest from PostHog of hero CTA → contact conversion.
- "What I'm reading / writing" mini journal — keeps the site fresh between job searches.
- Featured testimonial / endorsement strip when Ahmed has 1–2 quotes.

## Known limitations
- Project images are Unsplash slot placeholders.
- CV link is `#`; will 404 if clicked.
- `/api/contact` does not email Ahmed yet — submissions live only in MongoDB.
- No admin/back-office to read submissions; query Mongo directly or build later.
