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

- Next.js 16 App Router, React 19, TypeScript
- Single `globals.css` with modern CSS: custom properties, fluid `clamp()` type/spacing, CSS Grid
- No Tailwind, no external CSS frameworks
- Google Fonts via `<link>` tags in head (NOT `next/font` — build environment limitation): Outfit, JetBrains Mono, Libre Baskerville, Caveat
- Netlify Forms with honeypot for contact and reference collection
- Netlify Blobs for reference/testimonial data storage
- `@react-pdf/renderer` for build-time PDF generation
- `simple-icons` for brand SVG icons in TechIcons component
- No external JS libraries unless genuinely needed

### Key Dependencies

```
next: ^14.2.35
react: ^18.3.1
@react-pdf/renderer: ^4.3.2
@netlify/blobs: ^10.7.3
simple-icons: ^16.11.0
```

Dev: `tsx` (PDF generation script), `dotenv`, `prettier`, `typescript`.

## Architecture Rules

- Server components by default. Only use `'use client'` when state, effects, or browser APIs are required.
- CSS classes must be location-independent. NEVER use names like "header-link", "footer-controls", "cv-download". Use generic reusable names: `nav-link`, `btn-outline`, `btn-solid-accent`, `control-btn`, `link-mono`, `link-group`, `nav-row`, `control-group`.
- All content data in `/data/`. Components receive data as props.
- Role pages are top-level routes: `/frontend-developer`, `/digital-marketer`, `/ux-engineer`, `/chief-vibes-officer`, `/the-full-picture`. NOT nested under `/role/`. Each page file wraps a shared `RolePageView` component.
- Always prefer simplicity. No JS when CSS works. No scroll listeners when structural CSS works. No blur when solid background works. No floating widgets when nav links work.

### Client Components

These are the ONLY files that should have `'use client'`:

- `components/theme/ThemeProvider.tsx` — theme/mode state, localStorage, system preference detection
- `components/theme/ThemePicker.tsx` — popover state, click-outside
- `components/theme/DarkModeToggle.tsx` — theme context consumer
- `components/layout/Header.tsx` — `usePathname()` for active state, mobile menu toggle
- `components/layout/Footer.tsx` — wraps ThemePicker and DarkModeToggle
- `components/sections/TestimonialCarousel.tsx` — auto-rotation, navigation state
- `components/ContactForm.tsx` — form submission state
- `app/contact/ContactPageContent.tsx` — reads URL search params, reference selection
- `components/ui/ContextLink.tsx` — appends current path to link href
- `components/ui/EmailLink.tsx` — assembles mailto link client-side
- `components/ui/ConsoleGreeting.tsx` — `useEffect` for console.log
- `app/reference/page.tsx` — code validation, form submission, Netlify Blobs lookup

## Directory Structure

```
app/
  layout.tsx                  — Root layout, fonts, metadata, viewport, ThemeProvider
  page.tsx                    — Home: Hero + RoleGrid + Testimonials + ContactCTA
  globals.css                 — Full CSS design system
  sitemap.ts                  — Auto-generated sitemap.xml
  robots.ts                   — Auto-generated robots.txt
  favicon.ico                 — Favicon (auto-served by Next.js)
  loading.tsx                 — Global loading state
  not-found.tsx               — 404 page (hero--centered)
  frontend-developer/page.tsx — Role page (RolePageView slug="frontend-developer")
  digital-marketer/page.tsx   — Role page (RolePageView slug="digital-marketer")
  ux-engineer/page.tsx        — Role page (RolePageView slug="ux-engineer")
  chief-vibes-officer/page.tsx — Role page (RolePageView slug="chief-vibes-officer")
  the-full-picture/page.tsx   — Complete CV (RolePageView slug="the-full-picture")
  work/page.tsx               — Portfolio & case studies page
  contact/
    page.tsx                  — Contact page (Suspense wrapper)
    layout.tsx                — Contact layout (metadata)
    ContactPageContent.tsx    — Client component (reads ?from= param, reference selection)
    success/page.tsx          — Form submission success page
  reference/
    page.tsx                  — Reference/testimonial collection (code-protected, client)
    actions.ts                — Server action for Netlify Blobs lookup
    success/page.tsx          — Reference submission success page
  api/
    reference/route.ts        — Legacy API route (superseded by actions.ts, can be removed)

components/
  layout/
    Header.tsx                — Sticky header, wordmark, nav, mobile menu
    Footer.tsx                — Copyright + theme/mode controls
  ui/
    Icon.tsx                  — SVG icon system (menu, close, download, sun, moon, chevrons)
    DownloadButton.tsx        — Reusable download link with SVG icon, sr-only PDF label
    ContextLink.tsx           — Link that appends current path as ?from= param
    EmailLink.tsx             — Client-side mailto link assembly (obfuscates email)
    SkillTags.tsx             — Renders skill tag list
    Loading.tsx               — Loading spinner/message
    ConsoleGreeting.tsx       — console.log greeting for devs
  sections/
    Hero.tsx                  — Home page hero (compact, photo + text)
    RoleHero.tsx              — Role page tagline hero (three-font)
    Timeline.tsx              — Experience timeline with type labels
    TestimonialCarousel.tsx   — Auto-rotating testimonial quotes
    ContactCTA.tsx            — Universal contact call-to-action
    RoleCrossNav.tsx          — Cross-navigation cards to other roles
    RoleGrid.tsx              — Home page role card grid
    RoleCard.tsx              — Individual role card
  theme/
    ThemeProvider.tsx          — Theme context, localStorage, system preference
    ThemePicker.tsx            — Theme selection popover
    DarkModeToggle.tsx         — Light/dark toggle button
  RolePageView.tsx            — Shared role page template (all role pages use this)
  ContactForm.tsx             — Netlify Forms contact form
  TechIcons.tsx               — SVG tech icons (simple-icons + custom)
  index.ts                    — Barrel export file

data/
  roles.ts                    — Role definitions + navRoleSlugs array
  experiences.ts              — Work history entries with role-specific variants
  content-items.ts            — Case studies, achievements, stories
  testimonials.ts             — Testimonial quotes (partially real, partially placeholder)
  themes.ts                   — 12 theme definitions (light + dark)
  contact.ts                  — Centralised contact URLs and email subject templates

lib/
  roles.ts                    — getRoleBySlug, getDisplayRoles, getOtherRoles, getPdfForSlug
  experiences.ts              — resolveVariant, getTimelineForRole, getTypeLabel
  content.ts                  — getContentItems, getAllCaseStudies
  testimonials.ts             — getTestimonialsForRole, getFeaturedTestimonials, getContactTestimonials
  themes.ts                   — getThemeById

hooks/
  useClickOutside.ts          — Click outside handler
  useEscapeKey.ts             — Escape key handler
  useMobileMenu.ts            — Mobile menu state + body scroll lock
  useFromContext.ts            — Reads ?from= URL param for contact page

types/
  index.ts                    — All shared TypeScript interfaces
  css.d.ts                    — CSS module type declarations

scripts/
  generate-pdfs.tsx           — Build-time PDF generation (5 PDFs)
  pdf/CVTemplate.tsx          — PDF template component (@react-pdf/renderer)

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
  'digital-marketer',
  'ux-engineer',
  'chief-vibes-officer',
];
```

Five roles exist:

- **Frontend Developer** (slug: `frontend-developer`) — primary technical role, IN nav
- **Digital Marketer** (slug: `digital-marketer`) — eDMs, banners, campaigns, IN nav
- **UX Engineer** (slug: `ux-engineer`) — UX-focused development, IN nav
- **Chief Vibes Officer** (slug: `chief-vibes-officer`) — culture, variant: vibes, IN nav
- **The Full Picture** (slug: `the-full-picture`) — complete CV, NOT in nav

"The Full Picture" is NOT in `navRoleSlugs` — it doesn't appear in the home grid, mobile nav, or cross-nav, but it shows cross-nav links TO the other roles.

The `/work` page is NOT in `navRoleSlugs` but is linked from: home page hero, role page headers, and mobile nav.

Key helpers:

- `getDisplayRoles()` — returns roles in navRoleSlugs order
- `getOtherRoles(slug)` — returns display roles minus the current one
- `getPdfForSlug(slug)` — returns the correct PDF href and label

## Data Architecture

### Centralised Experiences

All experience entries live in `data/experiences.ts`. Each role references experiences by ID via `experienceIds: string[]`.

Fields that vary by role use the `RoleVariant` type: either a plain string (same everywhere) or an array of `{ id, value }` pairs. The resolver tries: exact role slug match → `'default'` → first entry.

### ContentSection

A single flexible section per role sits between Skills and Testimonials. Uses `itemIds: string[]` referencing items in `data/content-items.ts`. Items with a `title` render as titled blocks. Items without a `title` render as plain paragraphs. Optional — not all roles need one.

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
- `Dan-Napoleoni-CV-digital-marketer.pdf` — flat skills
- `Dan-Napoleoni-CV-ux-engineer.pdf` — flat skills
- `Dan-Napoleoni-CV-chief-vibes-officer.pdf` — flat skills

PDFs are gitignored and generated at Netlify build time. Known limitation: `@react-pdf/renderer` does not produce tagged/accessible PDFs.

### Reference Collection

The `/reference` page is a code-protected form for collecting testimonials from former colleagues. It works like this:

1. Dan creates a JSON entry for each referee and uploads it to Netlify Blobs (store: `"references"`) keyed by a unique code
2. The referee receives a link like `danielnapoleoni.dev/reference?code=theircode`
3. The page validates the code via a server action (`app/reference/actions.ts`), which looks it up in Netlify Blobs
4. If valid, the form pre-fills with the referee's name, role, and company, and presents fields for role-specific testimonial quotes and an opt-in to be listed as a contactable reference
5. Submissions go through Netlify Forms (form name: `"reference"`)

#### Netlify Blobs Setup

Reference data is managed via the [Netlify Blobs API](https://docs.netlify.com/blobs/overview/) or the Netlify CLI. Each entry is a JSON object stored with a lowercase string key (the code).

**Entry shape:**

```json
{
  "name": "Jane Smith",
  "role": "Engineering Manager",
  "company": "Acme Corp",
  "email": "jane@example.com",
  "phone": "+61400000000",
  "message": "Hey Jane! Thanks for agreeing to this — fill in whatever feels right and skip anything that doesn't apply."
}
```

**To add a reference entry via Netlify CLI:**

```bash
# Install Netlify CLI if needed
npm install -g netlify-cli

# Link to your site (one-time)
netlify link

# Upload a reference entry
echo '{"name":"Jane Smith","role":"Engineering Manager","company":"Acme Corp","email":"jane@example.com","phone":"","message":"Hey Jane! Thanks for agreeing to this."}' | netlify blobs:set references janecode --input -
```

Or via the Netlify dashboard: go to **Blobs** → store `references` → add an entry with the code as the key and the JSON as the value.

**Local development:** The server action falls back to hardcoded test data in `LOCAL_TEST_DATA` when `NODE_ENV === 'development'`. Use the code `testcode` to test the flow locally without needing Netlify Blobs.

#### Netlify Forms Setup

Two forms are registered in `public/__forms.html` (Netlify's form detection file):

- **`contact`** — the main contact form (name, email, message, requested-references)
- **`reference`** — the reference/testimonial form (code, name, role, company, quotes per role, contact details, is-reference opt-in)

These are static HTML forms that Netlify scans at build time. The actual form submissions happen from the React components via `fetch('/__forms.html', ...)` with URL-encoded form data.

Note: `app/api/reference/route.ts` is a legacy API route superseded by the server action approach. It remains for local dev testing fallback but can be removed.

## Design System

### Fonts

- **Outfit** = body, UI
- **JetBrains Mono** = code, technical elements, skill tags, wordmark, mono buttons
- **Libre Baskerville** = editorial, testimonials, "designer" tagline segment
- **Caveat** = warmth, personality, "human" tagline segment, accent colour

### Three-Font Tagline (signature element)

Monospace / italic serif / handwritten Caveat. Role-specific variants:

- Frontend Developer: "A developer" / "who thinks like a designer" / "and communicates like a human."
- Digital Marketer: "A developer" / "who speaks marketing" / "and builds campaigns that actually work."
- UX Engineer: "A developer" / "who asks why before asking how" / "and fights for the user."
- Chief Vibes Officer: "A developer" / "who builds culture" / "as carefully as code."
- The Full Picture: no tagline (tagline field is optional).

### Themes & Accessibility

12 themes x light/dark, all WCAG AAA compliant. Default theme: Notion.

Themes: Notion, Figma, Supabase, Linear, Spotify, Arc, Plum, Ember, Rust, Vintage Grape, Crimson & Gold.

`textTertiary` only for large text or decorative elements. Persisted to localStorage, defaults to `prefers-color-scheme`.

Use `.link-contrast` class for links on `bgElevated` backgrounds (uses accentHover for normal state, accent for hover — ensures contrast on elevated surfaces).

### CSS Design System (globals.css)

Single `globals.css` organised in layers:

1. Custom Properties — colours, fonts, fluid type scale, fluid spacing, motion, layout
2. Reset & Base — box-sizing, html/body, headings, paragraphs, links, images, lists
3. Utilities — skip-link, sr-only, loading, spacing utilities (mt-xs through mt-2xl), flex utilities
4. Primitives — Buttons (shared base selector, btn-outline, btn-solid-accent)
5. Primitives — Links (nav-row, nav-link, link-mono, link-contrast, link-group)
6. Primitives — Cards (card base, card--vibes)
7. Primitives — Contact Layout (contact-layout grid, contact-form-card, reference selection)
8. Primitives — Form Elements (contact-form, toggle, inputs, textareas)
9. Primitives — Tags (skill-tags, skill-tag)
10. Primitives — Controls (control-group, control-btn)
11. Layout (page-wrapper, page-header, content-page, section-heading)
12. Sections — Header, Footer, Hero variants, Role Navigation, Role Page, Timeline, Testimonials, Contact CTA, Cross Nav, Theme Picker
13. Animations — fadeUp keyframe, prefers-reduced-motion
14. Print — hide nav/footer/controls
15. Responsive — 640px (mobile), 768px (contact layout)

### Fluid Typography & Spacing

```
--text-xs → --text-sm → --text-base → --text-lg → --text-xl → --text-2xl → --text-3xl → --text-hero
--space-xs → --space-sm → --space-md → --space-lg → --space-xl → --space-2xl
```

**Important:** Do not use `clamp()` with viewport units (`vw`/`vh`) in `padding` on `.page-wrapper` or `.site-header-wrapper` — this triggers a WebKit compositing bug that breaks `position: sticky` on iOS Safari.

### Hero Variants

Three hero variants, all composing from `.hero` base:

- `.hero--tagline` — dramatic full-height centered tagline (role pages)
- `.hero--compact` — photo + text side by side (home page)
- `.hero--centered` — centered text (404, success pages)

## UX Decisions

### Header

Outside `.page-wrapper` (to avoid iOS Safari stacking context bug). Sticky with solid background. Contains wrapper → contents with: wordmark, "Download CV" (role-aware via getPdfForSlug), "Contact Dan" button. Mobile menu contains role page links, divider, "View Portfolio", "Download CV", "Contact Dan".

When mobile menu is open, `.page-wrapper` and `.skip-link` get `inert` and `aria-hidden="true"` attributes to trap focus within the menu.

### Footer

Copyright + theme/mode controls only. No nav links.

### Contact Page

Dedicated `/contact` page. Reads `?from=` param to tailor heading and email subject. Two-column layout when real (contactable) testimonials exist (references left 60%, form card right 40%). Falls back to single-column when no contactable testimonials. Includes reference selection — users can add/remove references to request alongside their message. ContactCTA at bottom with `hideContactLink`.

### Home Page

Compact hero with profile image. Link group: "Get the full picture", "View Portfolio" (text links), "Download CV" (solid button). Role cards immediately below (2-column prominent grid). Testimonial carousel. ContactCTA.

### Role Pages

Must stand alone (recruiter may never see home). Contains: tagline hero (if exists), role header with title/subtitle/icons/download button/portfolio link, intro, experience (ABOVE skills always), skill tags, contentSection (if exists), testimonials, ContactCTA with role-specific copy, cross-nav to other roles.

### Work Page

Portfolio & case studies at `/work`. Not in navRoleSlugs but linked from home hero, role page headers, and mobile nav. Contains: intro, "this site" case study with repo link, grouped case studies by role. ContactCTA and RoleCrossNav at bottom.

### Accessibility

- Skip link targeting `#main-content`
- ARIA labels on all interactive elements
- Semantic HTML throughout
- `focus-visible` styles on links, buttons, cards
- `.sr-only` utility class
- AAA contrast on all 12 themes
- `inert` focus trap on mobile menu
- Testimonial dots are decorative (no tablist/tab roles)
- Form error messages use `role="alert"`
- `type="button"` on all non-submit buttons
- iOS safe area handling via `env(safe-area-inset-*)`
- Known limitation: Generated PDFs are not tagged for screen reader accessibility

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

## Known Issues / Tech Debt
