# PROJECT GUIDELINES — Ahmed Mostafa Portfolio Refinement

## Mission
Help Ahmed land a **marketing-related internship in Belgium or Europe** by shipping a recruiter-first, credible, professionally polished personal portfolio website.

---

## Primary Audience
1. **Recruiters** — scanning for role fit, location, availability, and contact path (30s rule)
2. **Hiring managers** — evaluating projects, skills, and work quality
3. **Internship decision-makers** — in marketing, communication, digital marketing, growth, MarTech, or analytics roles

---

## Brand Direction
- **Professional, recruiter-friendly, modern, calm, premium**
- Not overly flashy, not executive, not startup-bro, not developer-portfolio
- **Communicate a hybrid profile:** marketing + business + automation + analytics + MarTech + digital execution
- **Avoid appearing overqualified** for an internship role
- **Tone:** Show potential, clarity, and relevance

---

## Site Strategy — Prioritized
1. **Fast understanding** of who Ahmed is (role fit, experience, availability)
2. **Strong fit signal** for marketing-related internships
3. **Proof through projects** — 3 featured case studies
4. **Easy access** to CV, LinkedIn, and contact
5. **Clear CTA paths** for recruiters (Download CV → Contact)

---

## Locked Homepage Structure
```
1. Header (sticky, nav, theme toggle, CV button, LinkedIn)
2. Hero (positioning, CTA, no oversized bio)
3. Proof strip (3 key proof points)
4. Featured work (3 project cards, asymmetric grid)
5. Capability pillars (interactive reveal: Research, Content/Campaign, Data/Automation)
6. Selected journey (timeline of key experience)
7. Recruiter FAQ (role, location, team fit, differentiator, availability)
8. Contact / CTA
9. Footer
```

---

## Implementation Principles — Non-negotiable
- **Preserve existing visual system** unless a change clearly improves recruiter clarity
- **Favor clean hierarchy, clarity, and trust** over decorative complexity
- **Keep edits controlled and production-safe** — minimize regressions
- **Do not rewrite large sections** unless explicitly asked
- **When changing copy:** Make it sharper, simpler, more recruiter-readable
- **When changing code:** Minimize regressions, preserve working behavior

---

## Current Priorities — In Order
1. ✅ **Verify site completeness** (architecture, pages, sections, design system)
2. ⬜ **Replace placeholders with real content** (CV, project images, copy)
3. ⬜ **Improve recruiter-facing copy** (sharper CTAs, clearer role/fit messaging)
4. ⬜ **Finalize featured project cards** (real challenges, roles, outcomes)
5. ⬜ **Add SEO essentials** (schema, sitemap, robots.txt, meta tags)
6. ⬜ **Improve launch readiness** (accessibility audit, mobile QA, analytics setup)
7. ⬜ **Keep the site easy to maintain** (data-driven content, clear component architecture)

---

## Decision-Making Framework

### Before editing many files:
1. Explain which files need changes and why
2. Suggest the **smallest safe implementation path** first
3. Get approval before proceeding

### Always:
- Keep accessibility and responsive behavior intact
- Prefer incremental edits over large rewrites
- Test changes across mobile, tablet, desktop
- Verify no regressions in existing functionality
- Link changes back to recruiter clarity or internship fit

### Red flags (ask before proceeding):
- Changing the homepage section order
- Removing or hiding key recruiter information (CV, LinkedIn, contact)
- Adding new pages or major features
- Rewriting more than 3 content sections at once
- Changing the visual system (colors, typography, spacing)

---

## File Organization Reference

**Frontend:**
- `/frontend/src/lib/data.js` — centralized content (profile, projects, capabilities, journey, FAQ)
- `/frontend/src/components/` — reusable components
- `/frontend/src/pages/` — 5 main pages (Home, Projects, ProjectDetail, About, Contact)
- `/frontend/public/` — static assets (CV, OG image, favicon)

**Backend:**
- `/backend/server.py` — FastAPI endpoints (health, contact, status)
- `/backend/tests/` — pytest suite

**Design:**
- `design_guidelines.json` — color palette, typography, spacing, motion rules
- `/frontend/src/index.css` — token variables, custom utilities

---

## Communication Defaults
- **Keep responses concise** — explain what, why, how in 2–3 sentences
- **Show file changes upfront** before implementing
- **Flag risks or unknowns** early
- **Provide small, testable steps** over big rewrites
