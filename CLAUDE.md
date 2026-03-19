# CLAUDE.md — Portfolio Site for Dan Napoleoni

## Prompt Files

Prompt files live in `/prompts/` and contain step-by-step instructions for specific changes. When Dan says "run prompt 18" or "implement 18-reference-collection.md", read the file from the prompts directory and execute all changes described in it. Always read CLAUDE.md first (you're doing that now), then read the prompt file, then implement.

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
- Google Fonts via `<link>` tags in head (NOT `next/font` — build environment limitation): Outfit, JetBrains Mono, Libre Baskerville, Caveat
- Netlify Forms with honeypot for contact and reference collection
- Netlify Blobs for reference/testimonial data storage
- `@react-pdf/renderer` for build-time PDF generation
- No external JS libraries unless genuinely needed

## Architecture Rules

- Server components by default. Only use `'use client'` when state, effects, or browser APIs are required.
- Current client components: ThemeProvider, Header, TestimonialCarousel, ContactPageContent, EmailLink, ContextLink, ConsoleGreeting, reference page.
- CSS classes must be location-independent. NEVER use names like "header-link", "footer-controls", "cv-download". Use generic reusable names: `nav-link`, `btn-outline`, `btn-solid-accent`, `control-btn`, `link-mono`, `link-group`, `nav-row`, `control-group`.
- All content data in `/data/` (roles.ts, testimonials.ts, themes.ts, contact.ts). Components receive data as props.
- Role pages are top-level routes: `/frontend-developer`, `/digital-marketing`, `/ux-engineer`, `/chief-vibes-officer`, `/the-full-picture`. NOT nested under `/role/`. Each page file wraps a shared `RolePageView` component. `/cv` permanently redirects to `/the-full-picture`.
- Always prefer simplicity. No JS when CSS works. No scroll listeners when structural CSS works. No blur when solid background works. No floating widgets when nav links work.

## Directory Structure

```
app/
  layout.tsx                  — Root layout, fonts, metadata, viewport, ThemeProvider
  page.tsx                    — Home: Hero + RoleGrid + Testimonials + ContactCTA
  globals.css                 — Full CSS design system
  sitemap.ts                  — Auto-generated sitemap.xml
  robots.ts                   — Auto-generated robots.txt
  favicon.ico                 — Favicon (auto-served by Next.js)
  not-found.tsx               — 404 page (hero--centered)
  frontend-developer/         — Role-specific CV page
  digital-marketing/          — Role-specific CV page
  ux-engineer/                — Role-specific CV page
  chief-vibes-officer/        — Role-specific CV page
  the-full-picture/           — Complete CV (all roles combined)
  work/                       — Portfolio & case studies page
  contact/                    — Contact form with role-aware context
    ContactPageContent.tsx    — Client component (reads ?from= param)
    success/                  — Form submission success page
  reference/                  — Reference/testimonial collection (code-protected)
    success/                  — Reference submission success page
  api/
    reference/route.ts        — API route for Netlify Blobs lookup

components/
  layout/                     — Header, Footer
  ui/                         — Icon, DownloadButton, ContextLink, EmailLink, SkillTags, Loading, ConsoleGreeting
  sections/                   — Hero, RoleHero, Timeline, TestimonialCarousel, ContactCTA,
                                RoleCrossNav, RoleGrid, RoleCard
  theme/                      — ThemeProvider, ThemePicker, DarkModeToggle
  RolePageView.tsx            — Shared role page template
  ContactForm.tsx             — Netlify Forms contact form
  TechIcons.tsx               — SVG tech icons with lookup

data/
  roles.ts                    — Role definitions, navRoleSlugs, experiences array
  testimonials.ts             — Testimonial quotes (placeholder until real ones collected)
  themes.ts                   — 12 theme definitions (light + dark)
  contact.ts                  — Centralised contact URLs and email subject templates
  content-items.ts            — Case study and content items referenced by ID

lib/
  roles.ts                    — getRoleBySlug, getDisplayRoles, getOtherRoles, getPdfForSlug
  experiences.ts              — resolveVariant, getTimelineForRole
  content.ts                  — getContentItems, getAllCaseStudies
  testimonials.ts             — getTestimonialsForRole, getFeaturedTestimonials
  themes.ts                   — getThemeById

hooks/
  useClickOutside.ts          — Click outside handler
  useEscapeKey.ts             — Escape key handler
  useMobileMenu.ts            — Mobile menu state
  useFromContext.ts            — Reads ?from= URL param for contact page

types/
  index.ts                    — All shared TypeScript interfaces

scripts/
  generate-pdfs.tsx           — Build-time PDF generation
  pdf/CVTemplate.tsx          — PDF template component

public/
  images/                     — Profile photo, OG image
  pdfs/                       — Generated PDFs (gitignored, built at deploy)
  __forms.html                — Netlify Forms detection (contact + reference forms)
  apple-touch-icon.png        — iOS home screen icon
  favicon.svg                 — SVG favicon
```

## Navigation Architecture

Which roles appear in the home page grid, mobile nav, and cross-nav is controlled by a single `navRoleSlugs` array in `data/roles.ts`.

```typescript
export const navRoleSlugs = [
  'frontend-developer',
  'digital-marketing',
  'ux-engineer',
  'chief-vibes-officer',
];
```

"The Full Picture" (`/the-full-picture`) is NOT in `navRoleSlugs` — it doesn't appear in the home grid, mobile nav, or cross-nav, but it shows cross-nav links TO the other roles.

The `/work` page is NOT in `navRoleSlugs` but is linked from:
- Home page hero (as "View Portfolio" text link)
- Role page headers (as "View Portfolio" text link)
- Mobile nav (as "View Portfolio" between dividers)

Key helpers:
- `getDisplayRoles()` — returns roles in navRoleSlugs order
- `getOtherRoles(slug)` — returns display roles minus the current one
- `getPdfForSlug(slug)` — returns the correct PDF href and label

## Data Architecture

### Centralised Experiences

All experience entries live in a single `experiences` array in `data/experiences.ts`. Each role references experiences by ID via `experienceIds: string[]`.

Fields that vary by role use the `RoleVariant` type: either a plain string (same everywhere) or an array of `{ id, value }` pairs. The resolver tries: exact role slug match → `'default'` → first entry.

### ContentSection

A single flexible section per role sits between Skills and Testimonials. Uses `itemIds: string[]` referencing items in `data/content-items.ts`.

### Contact Data

Centralised in `data/contact.ts`:
- `contact.linkedIn` — LinkedIn URL
- `contact.gitHub` — GitHub repo URL
- `contact.site` — Site domain
- `emailSubjects.default` — Default email subject
- `emailSubjects.role(title)` — Role-specific email subject

### ContactCTA

Universal contact call-to-action component used on every page. Props:
- `heading` — defaults to "Let's talk"
- `description` — defaults to general availability message
- `slug` — passes role context to EmailLink
- `hideContactLink` — hides the "Send me a message" button (used on contact page)

Role-specific CTA copy lives in the role data as `ctaHeading` and `ctaDescription`.

### Environment Variables

- `CONTACT_EMAIL` — used by PDF generation script (build-time)
- `CONTACT_PHONE` — used by PDF generation script (build-time)
- `NEXT_PUBLIC_CONTACT_EMAIL` — used by EmailLink component (client-side)

All set in Netlify dashboard, not committed to repo.

### PDF Generation

5 PDFs generated at build time via `npm run generate-pdfs`:
- `Dan-Napoleoni-CV.pdf` — full picture, categorised skills
- `Dan-Napoleoni-CV-frontend-developer.pdf` — flat skills
- `Dan-Napoleoni-CV-digital-marketing.pdf` — flat skills
- `Dan-Napoleoni-CV-ux-engineer.pdf` — flat skills
- `Dan-Napoleoni-CV-chief-vibes-officer.pdf` — flat skills

PDFs are gitignored and generated at Netlify build time. Known limitation: `@react-pdf/renderer` does not produce tagged/accessible PDFs — note this in the README.

### Reference Collection

Reference/testimonial data stored in Netlify Blobs (store: "references"). Each entry keyed by a unique code. The `/reference` page validates codes via an API route and presents a pre-filled form for the referee to complete. Submissions go to Netlify Forms.

## Design System

### Fonts

- **Outfit** = body, UI
- **JetBrains Mono** = code, technical elements, skill tags, wordmark, mono buttons
- **Libre Baskerville** = editorial, testimonials, "designer" tagline segment
- **Caveat** = warmth, personality, "human" tagline segment, accent colour

### Three-Font Tagline (signature element)

Monospace / italic serif / handwritten Caveat. Role-specific variants exist for each role. The Full Picture has no tagline.

### Themes & Accessibility

12 themes × light/dark, all WCAG AAA compliant:

Notion (default), Figma, Supabase, Linear, Spotify, Arc, Plum, Ember, Rust, Vintage Grape, Crimson & Gold, Spotify.

`textTertiary` only for large text or decorative elements. Persisted to localStorage, defaults to `prefers-color-scheme`. Default theme: Notion.

Use `.link-contrast` class for links on `bgElevated` backgrounds (uses accentHover for normal state, accent for hover — ensures contrast on elevated surfaces).

### Hero Variants

Three hero variants, all composing from `.hero` base:
- `.hero--tagline` — dramatic full-height centered tagline (role pages)
- `.hero--compact` — photo + text side by side (home page)
- `.hero--centered` — centered text (404, success pages)

### Typography & Spacing

Fluid typography: `clamp()` from `--text-xs` to `--text-hero`. Fluid spacing: `--space-xs` to `--space-2xl`.

**Important:** Do not use `clamp()` with viewport units (`vw`/`vh`) in `padding` on `.page-wrapper` or `.site-header-wrapper` — this triggers a WebKit compositing bug that breaks `position: sticky` on iOS Safari. Use fixed values with media query steps instead.

### Animation

Subtle fadeUp with stagger. Always respect `prefers-reduced-motion`.

### Styling

Never use inline styles. All styles go in `globals.css` as reusable classes.

## UX Decisions

### Header

Outside `.page-wrapper` (to avoid iOS Safari stacking context bug). Sticky with solid background. Contains wrapper → contents with: wordmark, "Download CV" (role-aware), "Contact Dan" button. Mobile menu contains role page links, divider, "View Portfolio", "Download CV", "Contact Dan".

When mobile menu is open, `.page-wrapper` and `.skip-link` get `inert` and `aria-hidden="true"` attributes to trap focus within the menu.

### Footer

Copyright + theme/mode controls only. No nav links.

### Contact Page

Dedicated `/contact` page. Reads `?from=` param to tailor heading and email subject. Two-column layout when real testimonials exist (testimonials left 60%, form card right 40%). Falls back to single-column when testimonials are placeholder. ContactCTA at bottom with `hideContactLink`.

### Home Page

Compact hero with profile image. Link group: "View Portfolio" and "View CV" as text links, "Download CV" as solid button (button last in DOM for accessible tab order). Role cards immediately below. Testimonial carousel. ContactCTA.

### Role Pages

Must stand alone. Contains: tagline hero (if exists), role header with title/subtitle/download button/portfolio link, intro, experience (ABOVE skills always), skill tags, contentSection (if exists), testimonials, ContactCTA with role-specific copy, cross-nav.

### Work Page

Portfolio & case studies at `/work`. Not in navRoleSlugs but linked from home hero, role page headers, and mobile nav. Contains: intro explaining lack of visual portfolio, "This site" case study section with repo link, grouped case studies by role. ContactCTA and RoleCrossNav at bottom.

### Cards

Equal-height role cards via CSS Grid. Vibes card: dashed border, accent on hover.

### Links & External Indicators

External links use `↗` character and `aria-label` with "(opens in new tab)". All external links have `target="_blank"` and `rel="noopener noreferrer"`.

GitHub repo link appears on the work page and in a `console.log` greeting (ConsoleGreeting component). LinkedIn appears in ContactCTA on every page.

### Accessibility

- Skip link targeting `#main-content`
- ARIA labels on all interactive elements
- Semantic HTML throughout (`header`, `main`, `footer`, `nav`, `article`, `section`, `blockquote`)
- `focus-visible` styles on links, buttons, cards
- `.sr-only` utility class
- AAA contrast on all 12 themes (verified with WAVE)
- `inert` focus trap on mobile menu
- Testimonial dots are decorative (no tablist/tab roles)
- Form error messages use `role="alert"`
- `type="button"` on all non-submit buttons
- Heading hierarchy: h1 → h2 → h3 → h4 (work page uses deeper nesting)
- iOS safe area handling: `env(safe-area-inset-top)` on body/header, `env(safe-area-inset-left/right)` on page-wrapper/header-wrapper

Known limitation: Generated PDFs are not tagged for screen reader accessibility (limitation of `@react-pdf/renderer`).

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
- Use Tailwind or external CSS frameworks
- Add external dependencies without strong justification
- Use `clamp()` with viewport units in padding on page-wrapper or header-wrapper (iOS Safari bug)
- Use `flex-direction: column-reverse` or CSS `order` to reorder interactive elements (WCAG tab order mismatch)
