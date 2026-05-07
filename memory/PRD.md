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
- Replace placeholder CV `#` with the real PDF (frontend/public + update `profile.cvUrl` in `data.js`).
- Replace Ahmed's email placeholder in `data.js` with the real address.
- Replace the 5 project images and write the real challenge/role/takeaway copy per project.
- Real LinkedIn URL (currently `linkedin.com/in/ahmed-mostafa/` — verify slug).

### P1 — strongly recommended polish
- Hero portrait slot (currently no photo — design intentionally clean — add when photo is ready).
- Full case-study body content per project (Approach + Outcome currently say "coming soon").
- SEO: og:image, og:title, og:description, JSON-LD `Person` schema, sitemap.xml, robots.txt.
- Favicon set + apple-touch-icon.
- Custom 404 route.

### P2 — growth / lead-quality wins
- Email forwarding/notification on new `/api/contact` submission (Resend integration) so Ahmed gets notified instantly.
- Anti-spam: simple honeypot field + rate-limit by IP on `/api/contact`.
- Analytics events (PostHog already loaded) on hero CTAs, FAQ opens, project clicks, contact submit.
- Featured testimonial / endorsement strip when Ahmed has 1–2 quotes.
- "What I'm reading / writing" mini journal — keeps the site fresh between job searches.

## Known limitations
- Project images are Unsplash slot placeholders.
- CV link is `#`; will 404 if clicked.
- `/api/contact` does not email Ahmed yet — submissions live only in MongoDB.
- No admin/back-office to read submissions; query Mongo directly or build later.
