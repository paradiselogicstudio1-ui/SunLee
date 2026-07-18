# Sanli Stone Consultancy — Build Plan

## Goal
3-page site for a stone consultancy ("Sanli"):
1. **Index (`/`)** — 3D scroll-driven storytelling page built from `video/video.mp4` using `.claude/skills/video-to-website.md`
2. **Materials Consultancy (`/materials-consultancy`)** — 4-step process timeline + interactive "Stone Matchmaker" quiz (React state) + contact form
3. **Production Consultancy (`/production-consultancy`)** — industrial/blueprint layout, 3 service blocks + "Factory Efficiency Simulator" (sliders + bottleneck visualization) + booking form

## Tech Stack Decision
Vite + React + TypeScript + Tailwind CSS + react-router-dom.
- Index page implemented as a React component, but follows the vanilla-skill architecture closely (canvas ref, Lenis + GSAP ScrollTrigger in useEffect, frame preloader, marquee, dark overlay, circle-wipe hero).
- Frames served from `public/frames/`.
- Pages 2 & 3 use Tailwind + React state per the user's spec.

## Video Analysis (DONE)
- 1280x720, 24fps, 10s, 240 frames — within the 150-300 sweet spot.
- Extraction command: `ffmpeg -i video/video.mp4 -vf "fps=24,scale=1280:-1" -c:v libwebp -quality 80 public/frames/frame_%04d.webp`
- FRAME_SPEED target: 2.0, IMAGE_SCALE: 0.85

## Phases / Checklist

### Phase 0 — Project Scaffold
- [x] `npm create vite@latest . -- --template react-ts` (in websiteSanli root)
- [x] Install: `gsap`, `lenis`, `react-router-dom`, `tailwindcss` (+ postcss/autoprefixer or Tailwind v4 vite plugin)
- [x] Configure Tailwind, base layout, router with 3 routes
- [x] Shared `Header`/`Nav` (logo "Sanli", links: Home / Materials Consultancy / Production Consultancy) + `Footer`

### Phase 1 — Frame Extraction
- [x] `mkdir -p public/frames`
- [x] Run ffmpeg extraction command above
- [x] Verify frame count == 240 (`ls public/frames | wc -l`)

### Phase 2 — Index Page (3D Storytelling)
- [x] Loader (brand "Sanli", progress bar)
- [x] Hero standalone (100vh) — massive typography, word-split heading, tagline, scroll indicator
- [x] Canvas renderer (padded cover, IMAGE_SCALE 0.85, bg color sampling, devicePixelRatio)
- [x] Dark overlay element + logic
- [x] 1+ horizontal marquee (12vw+ text, e.g. "NATURAL STONE — ENGINEERED PRECISION —")
- [x] 6 scroll sections w/ varied animation types (fade-up, slide-left, slide-right, scale-up, rotate-in, stagger-up / clip-reveal — never repeat consecutively), side-aligned (align-left/align-right), copy themed around stone sourcing → production → installation → maintenance
- [x] Stats section (dark overlay, counters: e.g. years experience, projects completed, materials sourced, countries)
- [x] CTA section (`data-persist`) — links into Materials & Production Consultancy pages
- [x] Lenis smooth scroll + GSAP ScrollTrigger wiring (frame binding FRAME_SPEED 2.0, circle-wipe hero, section animation system, counters, marquee, dark overlay)
- [ ] Mobile responsive collapse (<768px) — CSS written, not yet device-tested
- [x] Test in browser: scroll through, verify all 14 checklist items from skill

### Phase 3 — Materials Consultancy Page
- [x] Hero/intro header for the division
- [x] 4-step horizontal process timeline cards:
  1. Sourcing & Selection
  2. Production Oversight
  3. Installation Mastery
  4. Enduring Maintenance
- [x] "Stone Matchmaker" quiz (React state, 3 steps):
  - Step 1: Project Location (Kitchen Countertop / Outdoor Facade / High-Traffic Commercial Lobby / Luxury Bathroom)
  - Step 2: Aesthetic Vibe (Bold Veining / Minimalist & Clean / Dark & Dramatic)
  - Step 3: Performance Priority (Scratch/Stain Resistance / Pure Luxury-Uniqueness / Budget-Friendly)
  - Recommendation engine: small materials dataset (Quartzite, Marble, Sintered Stone, Granite, Porcelain) scored against answers → render 2-3 results w/ pros/cons + CTA "Consult with us on this material"
- [x] Contact/inquiry form "Discuss Your Project Fleet"
- [x] Test in browser

### Phase 4 — Production Consultancy Page
- [x] Industrial/blueprint-style layout (subtle grid lines, technical accents)
- [x] 3 service blocks:
  1. Machinery & Tooling Procurement
  2. Facility Layout & Workflow Design
  3. Efficiency & Performance Audits
- [x] "Factory Efficiency Simulator":
  - Sliders: Bridge Saws (1-5), Avg Slab Handling Time (5-30 min), Manual Fabricators (1-10)
  - Horizontal workflow visualization: Slab Storage → Saws → Edge Polishing → Hand Finishing
  - Bottleneck logic: imbalance → red highlight animation on bottlenecked station + dynamic text readout
  - Badge: "Our layout designs eliminate this exact bottleneck. Let's optimize your floor plan."
- [x] Consultation booking form
- [x] Test in browser

### Phase 5 — Final Pass
- [x] Cross-page nav consistency, run `npm run build` to confirm no type/build errors
- [x] Dev server smoke test of all 3 routes (use `run`/browser skill)

## Status Log
- 2026-06-13: Plan created. Video analyzed (240 frames @ 1280x720, 24fps). Skill file confirmed at `.claude/skills/video-to-website.md`. Starting Phase 0.
- 2026-06-13: Phases 0-2 complete. Index page built (loader, hero, canvas scroll-bound video, 5 entrance-animated sections, marquee, stats w/ counters, persistent CTA). Fixed a StrictMode + GSAP `immediateRender`/`.kill()` bug (sections stuck at opacity:0) by wrapping all animations in `gsap.context()` + `ctx.revert()` on cleanup. `npm run build` clean, verified via Playwright screenshot sweep (0/15/40/65/80/97%) — all checklist items pass. Mobile responsive CSS written but not device-tested. Next: Phase 3 (Materials Consultancy page).
- 2026-06-13: Phases 3-5 complete. Materials Consultancy page: hero, 4-step process timeline with connector line, "Stone Matchmaker" quiz (3 steps, scoring-based recommendation engine over 5-material dataset in `src/data/materials.ts`, rendered via `StoneMatchmaker.tsx`), "Discuss Your Project Fleet" contact form (`ContactForm.tsx`, shared component). Production Consultancy page: dark blueprint-grid theme, 3 tech-card service blocks with corner-bracket accents, "Factory Efficiency Simulator" (`FactoryEfficiencySimulator.tsx`) with 3 sliders driving a 4-station workflow visualization, dynamic bottleneck detection/highlighting and messaging, plus consultation booking form. All temporary debug/verify scripts removed. `npm run build` clean, full 3-route smoke test passed with zero console errors and working nav. Project complete.
- 2026-06-13: Phase 6 (email backend) complete. Added `server/index.js` (Express, serves built `dist/` + `/api/contact`) and `server/mailer.js` (Nodemailer SMTP transport, builds email from form fields). Config via `.env` (template in `.env.example`: SMTP_HOST/PORT/SECURE/USER/PASS, MAIL_FROM, MAIL_TO, PORT) — `.env` gitignored. `ContactForm.tsx` now POSTs JSON to `/api/contact` with a `source` prop ("Materials Consultancy" / "Production Consultancy") and shows sending/error states. Vite dev proxy added (`/api` → `localhost:3001`). New scripts: `npm run server` (run mail API alone) and `npm run start` (build + serve dist + API on one port, for production). Verified end-to-end with a temporary Ethereal SMTP account + Playwright form submission — email sent successfully, validation (missing fields / bad email / bad source) all return proper errors. Test `.env` removed after verification.
- 2026-06-13: Email "From" header now set to the submitter's own name/email (`"${name}" <${email}>` in `mailer.js`) instead of a fixed `MAIL_FROM`; removed `MAIL_FROM` from `.env.example` and added a deliverability/spam caveat comment on `MAIL_TO`. Added "Consult with us on this material" auto-fill: `StoneMatchmaker` now takes an `onConsult(message)` callback, builds a summary message (material name/tagline + quiz answers) and smooth-scrolls to `#contact`; `ContactForm`'s "Project Details"/"Facility Details" textarea is now controlled via an optional `prefillDetails` prop (editable after prefill); `MaterialsConsultancy` lifts `prefillDetails` state between `StoneMatchmaker` and `ContactForm`. `npm run build` clean; verified end-to-end via Playwright (quiz → consult → scroll → prefilled, editable textarea, no console errors). Temporary verification script removed.
