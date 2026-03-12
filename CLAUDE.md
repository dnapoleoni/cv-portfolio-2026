# CLAUDE.md — Portfolio Site for Dan Napoleoni

## Who is Dan

Melbourne-based frontend developer, 15+ years experience, currently job hunting after redundancy. Career path: Flash → banners → eDMs → Vue → React. Agencies: Isobar, Clemenger, Honest Fox, The Royals, Cummins & Partners, Trout, AdTorque Edge, Everest Engineering.

Core identity line: "A developer who thinks like a designer and communicates like a human."

Strengths: communication, UX/CX mindset, creative problem-solving, AI-assisted dev, questioning briefs, culture contribution (social clubs, ARGs, events).

Limitations (never list as weaknesses — frame as self-awareness or deliberate positioning): ADHD, limited testing/TDD, not full-stack, not pursuing management, overwhelmed by vague briefs. "Not pursuing team lead" = frame as "senior IC by choice."

Post-COVID short stints are contracts and redundancies, not performance. Timeline entries have a type field (contract/redundancy/permanent) to contextualise.

## Links

- Portfolio: danielnapoleoni.dev
- LinkedIn: linkedin.com/in/daniel-napoleoni
- Repo: github.com/dnapoleoni/cv-portfolio-2026
- Hosting: Netlify. Domain: GoDaddy.

## Reference Documents

- `docs/daniel-napoleoni-cv-2026.pdf` — Dan's current PDF resume. Canonical source of truth for work history, dates, company names, role titles, and descriptions. Cross-reference this for accuracy when writing copy for role pages or the CV page.

## Target Audience

Primary visitor: recruiter or hiring manager clicking a link from Dan's job application. They have 30 seconds. Primary entry points are role-specific pages, not the home page. Home page is a fallback for LinkedIn or direct traffic.

The site is: portfolio, online CV, code sample (the repo demonstrates skills), and personality showcase.

Target roles: Frontend Developer, Digital Marketing Specialist, UX-Minded Engineer, Chief Vibes Officer, Creative Technologist, Design Technologist, UI Engineer, Digital Producer.

## Tech Stack

- Next.js 14 App Router, React 18, TypeScript
- Single `globals.css` with modern CSS: custom properties, fluid `clamp()` type/spacing, CSS Grid
- No Tailwind, no external CSS frameworks
- Google Fonts via `<link>` tags in head (NOT `next/font` — build environment limitation): Outfit, JetBrains Mono, Cormorant Garamond, Caveat
- Netlify Forms with honeypot for contact
- No external JS libraries unless genuinely needed

## Architecture Rules

- Server components by default. Only use `'use client'` when state, effects, or browser APIs are required. Current client components: ThemeProvider, Header, TestimonialCarousel.
- CSS classes must be location-independent. NEVER use names like "header-link", "footer-controls", "cv-download". Use generic reusable names: `nav-link`, `btn-outline`, `btn-accent`, `control-btn`, `control-select`, `link-muted`, `link-mono`, `link-group`, `nav-row`, `control-group`.
- All content data in `/data/` (roles.ts, testimonials.ts, themes.ts). Components receive data as props.
- Role pages are top-level routes: `/frontend-developer`, `/digital-marketing`, `/ux-engineer`, `/chief-vibes-officer`. NOT nested under `/role/`. Each page file wraps a shared `RolePageView` component.
- Always prefer simplicity. No JS when CSS works. No scroll listeners when structural CSS works. No blur when solid background works. No floating widgets when nav links work.

## Design System

### Fonts (each has a specific purpose)

- **Outfit** = body, UI
- **JetBrains Mono** = code, technical elements, skill tags, wordmark, mono buttons
- **Cormorant Garamond** = editorial, testimonials, "designer" tagline segment
- **Caveat** = warmth, personality, "human" tagline segment, accent colour

### Three-Font Tagline (signature element)

Monospace / italic serif / handwritten Caveat. Role-specific variants:

- Frontend Developer: "A developer" / "who thinks like a designer" / "and communicates like a human."
- Digital Marketing: "A developer" / "who speaks marketing" / "and builds campaigns that actually work."
- UX Engineer: "A developer" / "who asks why before asking how" / "and fights for the user."
- Chief Vibes Officer: "A developer" / "who builds culture" / "as carefully as code."
- Home page: general-purpose version, not role-specific. TBD.

### Themes & Accessibility

6 themes (Warm, Ink, Midnight, Forest, Ocean, Sunset) × light/dark. All WCAG AAA: 7:1 normal text, 4.5:1 large text. `textTertiary` only for large text or decorative elements. Persisted to localStorage, defaults to `prefers-color-scheme`.

### Typography & Spacing

Fluid typography: `clamp()` from `--text-xs` to `--text-hero`. Fluid spacing: `--space-xs` to `--space-2xl`.

### Animation

Subtle fadeUp with stagger. Always respect `prefers-reduced-motion`.

### Styling

Never use inline styles. All styles go in `globals.css` as reusable classes.

## UX Decisions

### Header

Sticky, always compact (small padding, hero padding creates breathing room), solid background (no blur/transparency). Contains: wordmark (`danielnapoleoni.dev` — non-clickable span on home, link elsewhere), "View CV", "Download PDF", "Get in touch". "Get in touch" links to `/contact?from=[current path]`.

### Footer

Copyright + theme/mode controls only. No nav links.

### Contact

Dedicated `/contact` page. Reads `?from=` param to tailor heading and mailto subject. Netlify Forms + honeypot. Email obfuscated via JS string assembly. Phone only in PDF, never on site. No floating widgets.

### Home Page

Compact hero (no min-height) with general tagline, then role cards immediately with minimal scroll. Cards are the primary interaction. Heading like "Currently available for..." Includes testimonial carousel.

### Role Pages

Must stand alone (recruiter may never see home). Contains: role-specific tagline hero, intro, experience (ABOVE skills always), skill tags, case studies, role-specific testimonials, contact CTA linking to `/contact`, cross-nav to other roles at bottom.

### CV Page

Experience above skills. Summary, timeline, skills, non-dev interests, contact CTA.

### Cards

Equal-height role cards via CSS Grid (grid items `display:flex`, cards stretch). Vibes card: dashed border, solid on hover.

### Links

Styled consistently regardless of internal/external. External links distinguished only by arrow character. Visual hierarchy based on user intent, not destination.

### Testimonials

Placeholder data, will be replaced with real references (with consent). Supports homepage carousel and role-specific filtering.

### Accessibility

Skip link, ARIA labels, semantic HTML, `focus-visible`, keyboard nav, `.sr-only` utility class, AAA contrast throughout. PDF link and web CV grouped in nav with descriptive `aria-label` so web version = accessible alternative.

## Copy and Tone

Warm, confident, self-aware, occasionally cheeky. Never at expense of clarity. UI chrome is purely functional — personality in content only. No emojis. Don't list weaknesses, reframe as self-awareness. Speak to hiring managers directly, not third person. Short stints get context labels (Contract, Role made redundant), not defensive explanations.

## Git Workflow

- Do not use git worktrees
- When making changes, create a single branch from main (e.g., `claude/description-of-change`), make all changes there, and stop before committing
- Do not create multiple branches per prompt
- Do not commit automatically
- Dan will review changes on localhost, then commit and merge to main manually
- If Dan asks for a small tweak or fix, work directly on whatever branch is currently checked out

## DO NOT

- Use `localStorage`/`sessionStorage` in components (except ThemeProvider)
- Use `next/font` imports
- Create CSS classes tied to component location
- Put phone numbers or raw emails in static HTML
- Use floating/fixed contact widgets
- Use `backdrop-filter` blur on header
- Use scroll-based JS for CSS-achievable effects
- Put skills above experience on any page
- Duplicate contact links across multiple sections
- Use Tailwind or external CSS frameworks
- Add external dependencies without strong justification
