# CLAUDE.md — Portfolio Site for Dan Napoleoni

## Prompt Files

Prompt files live in `/prompts/` and contain step-by-step instructions for specific changes. When Dan says "run prompt 07" or "implement 07-data-restructure-cv-as-role.md", read the file from the prompts directory and execute all changes described in it. Always read CLAUDE.md first (you're doing that now), then read the prompt file, then implement.

Current prompt files:

- `01-initial-one-shot-build.md` — original site generation
- `02-structural-rework.md` — component architecture rebuild
- `03-css-rename-sticky-header.md` — CSS class refactor, sticky header
- `04-claude-code-restructure.md` — top-level routes, taglines, contact page
- `05-new-themes.md` — 12-theme replacement
- `06-first-pass-copy-changes.md` — copy audit fixes, metadata, skills updates
- `07-data-restructure-cv-as-role.md` — centralised experiences, contentSection

These are historical records of how the site was built. New prompt files may be added as the project evolves.

## Who is Dan

Melbourne-based frontend developer, 15+ years experience, currently job hunting after redundancy. Career path: Flash > banners > eDMs > Vue > React. Agencies: Isobar, Clemenger, Honest Fox, The Royals, Cummins & Partners, Trout, AdTorque Edge, Everest Engineering.

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

Target roles: Frontend Developer, Digital Marketer, UX Engineer, Chief Vibes Officer, Creative Technologist, Design Technologist, UI Engineer, Digital Producer.

## Tech Stack

- Next.js 14 App Router, React 18, TypeScript
- Single `globals.css` with modern CSS: custom properties, fluid `clamp()` type/spacing, CSS Grid
- No Tailwind, no external CSS frameworks
- Google Fonts via `<link>` tags in head (NOT `next/font` — build environment limitation): Outfit, JetBrains Mono, Cormorant Garamond, Caveat
- Netlify Forms with honeypot for contact
- No external JS libraries unless genuinely needed

## Architecture Rules

- Server components by default. Only use `'use client'` when state, effects, or browser APIs are required. Current client components: ThemeProvider, Header, TestimonialCarousel.
- CSS classes must be location-independent. NEVER use names like "header-link", "footer-controls", "cv-download". Use generic reusable names: `nav-link`, `btn-outline`, `btn-accent`, `btn-solid-accent`, `control-btn`, `control-select`, `link-muted`, `link-mono`, `link-group`, `nav-row`, `control-group`.
- All content data in `/data/` (roles.ts, testimonials.ts, themes.ts). Components receive data as props.
- Role pages are top-level routes: `/frontend-developer`, `/digital-marketing`, `/ux-engineer`, `/chief-vibes-officer`, `/the-full-picture`. NOT nested under `/role/`. Each page file wraps a shared `RolePageView` component.
- Always prefer simplicity. No JS when CSS works. No scroll listeners when structural CSS works. No blur when solid background works. No floating widgets when nav links work.

## Navigation Architecture

Which roles appear in the home page grid and cross-nav is controlled by a single `navRoleSlugs` array in `data/roles.ts`. This is an explicit allowlist — roles not in this array still exist as pages but won't appear in navigation. Currently:

```typescript
export const navRoleSlugs = [
  'frontend-developer',
  'digital-marketing',
  'ux-engineer',
  'chief-vibes-officer',
];
```

"The Full Picture" (`/the-full-picture`) is the complete CV role — it contains all experiences and a combined skills list. It is NOT in `navRoleSlugs` so it doesn't appear in the home grid or cross-nav, but it does show cross-nav links TO the other roles (because `getOtherRoles` returns the nav roles minus the current one). To add it to the home grid in future, just add its slug to `navRoleSlugs`.

Key helpers:

- `getDisplayRoles()` — returns roles in `navRoleSlugs` order (for home grid)
- `getOtherRoles(slug)` — returns display roles minus the current one (for cross-nav)
- `getPdfForSlug(slug)` — returns the correct PDF href and label for any role

## Data Architecture

### Centralised Experiences

All experience entries live in a single `experiences` array in `data/roles.ts`. Each role references experiences by ID via `experienceIds: string[]`.

Fields that vary by role use the `RoleVariant` type: either a plain string (same everywhere) or an array of `{ id, value }` pairs. The resolver tries: exact role slug match → `'default'` → first entry.

```typescript
type RoleVariant = string | { id: string; value: string }[];
```

### ContentSection

A single flexible section per role sits between Skills and Testimonials. Used for "How I work", "Also", case studies, achievements, or anything else. Optional — not all roles need one.

```typescript
interface ContentSection {
  heading: string;
  items: { title?: string; description: string }[];
}
```

Items with a `title` render as titled blocks (case-study styling). Items without a `title` render as plain paragraphs.

### Contact Page Customisation

Roles can optionally set `contactHeading` to override the default "Looking for a [title]?" heading on the contact page. Used by The Full Picture which sets `contactHeading: 'Read enough?'`.

### Shared Components

- `DownloadButton` — reusable download link with SVG icon. Accepts `href`, `label`, and `className`. Used in Header, Hero, and RolePageView. Includes `sr-only` "(PDF)" for screen readers.

### Key Roles

Five roles exist in the data:

| Role                | Slug                  | In navRoleSlugs | Variant | Notes                        |
| ------------------- | --------------------- | --------------- | ------- | ---------------------------- |
| Frontend Developer  | `frontend-developer`  | Yes             | —       | Primary technical role       |
| Digital Marketer    | `digital-marketing`   | Yes             | —       | eDMs, banners, campaigns     |
| UX Engineer         | `ux-engineer`         | Yes             | —       | UX-focused development       |
| Chief Vibes Officer | `chief-vibes-officer` | Yes             | `vibes` | Dashed border card           |
| The Full Picture    | `the-full-picture`    | No              | —       | Complete CV, all experiences |

## Design System

### Fonts (each has a specific purpose)

- **Outfit** = body, UI
- **JetBrains Mono** = code, technical elements, skill tags, wordmark, mono buttons
- **Cormorant Garamond** = editorial, testimonials, "designer" tagline segment
- **Caveat** = warmth, personality, "human" tagline segment, accent colour

### Three-Font Tagline (signature element)

Monospace / italic serif / handwritten Caveat. Role-specific variants:

- Frontend Developer: "A developer" / "who thinks like a designer" / "and communicates like a human."
- Digital Marketer: "A developer" / "who speaks marketing" / "and builds campaigns that actually work."
- UX Engineer: "A developer" / "who asks why before asking how" / "and fights for the user."
- Chief Vibes Officer: "A developer" / "who builds culture" / "as carefully as code."
- Home page: general-purpose version, not role-specific.
- The Full Picture: no tagline (tagline field is optional).

### Themes & Accessibility

12 themes (Claude, GitHub, Linear, Vercel, Stripe, Spotify, Desert Sand, Coral, Vintage Grape, Tangerine, Sea Grass, Blush) x light/dark. All WCAG AAA: 7:1 normal text, 4.5:1 large text. `textTertiary` only for large text or decorative elements. Persisted to localStorage, defaults to `prefers-color-scheme`.

### Typography & Spacing

Fluid typography: `clamp()` from `--text-xs` to `--text-hero`. Fluid spacing: `--space-xs` to `--space-2xl`.

### Animation

Subtle fadeUp with stagger. Always respect `prefers-reduced-motion`.

### Styling

Never use inline styles. All styles go in `globals.css` as reusable classes.

## UX Decisions

### Header

Sticky, always compact (small padding, hero padding creates breathing room), solid background (no blur/transparency). Contains: wordmark (`danielnapoleoni.dev` — non-clickable span on home, link elsewhere), "Download CV" (role-aware via `getPdfForSlug` — downloads role-specific PDF on role pages, full CV elsewhere), "Contact Dan" (links to `/contact?from=[current path]`). Mobile menu adds LinkedIn and GitHub links.

### Footer

Copyright + theme/mode controls only. No nav links.

### Contact

Dedicated `/contact` page. Reads `?from=` param to tailor heading and mailto subject. Roles can set `contactHeading` for custom headings (e.g., The Full Picture uses "Read enough?" instead of "Looking for a The Full Picture?"). Netlify Forms + honeypot. Email obfuscated via JS string assembly. Phone only in PDF, never on site. No floating widgets.

### Home Page

Compact hero (no min-height) with profile image, subtitle, "Based in Melbourne, available now.", and a link group with "View CV" (links to `/the-full-picture`) and "Download CV" (downloads full PDF via `DownloadButton`). Role cards immediately below with minimal scroll. Cards are the primary interaction. Includes testimonial carousel.

### Role Pages

Must stand alone (recruiter may never see home). Contains: role-specific tagline hero (if tagline exists), intro, experience (ABOVE skills always), skill tags, contentSection (if exists), role-specific testimonials, contact CTA linking to `/contact`, cross-nav to other roles at bottom (renders if `otherRoles.length > 0`). Each has a role-specific `DownloadButton` near the top.

### The Full Picture (Full CV)

Uses `RolePageView` like any other role. Has no tagline hero (tagline field is undefined), no icons (icons field is undefined). Shows all experiences, combined curated skills list, and "Also" contentSection for non-dev interests. Cross-nav renders showing all four main roles. Contact CTA uses custom heading "Read enough?" via `contactHeading` field.

### Cards

Equal-height role cards via CSS Grid (grid items `display:flex`, cards stretch). Vibes card: dashed border, solid on hover.

### Links

Styled consistently regardless of internal/external. External links distinguished only by arrow character. Visual hierarchy based on user intent, not destination.

### Testimonials

Placeholder data, will be replaced with real references (with consent). Supports homepage carousel and role-specific filtering.

### Accessibility

Skip link, ARIA labels, semantic HTML, `focus-visible`, keyboard nav, `.sr-only` utility class, AAA contrast throughout. `DownloadButton` uses `sr-only` to convey file format "(PDF)" to screen readers without cluttering visible text.

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
