# Dan Napoleoni — Portfolio & CV

> A developer who thinks like a designer and communicates like a human.

A portfolio site, online CV, code sample, and personality showcase — built in public and designed to be read by both recruiters and developers.

**Live site:** [danielnapoleoni.dev](https://danielnapoleoni.dev)

## Tech Stack

- **Next.js 14** (App Router, server components by default)
- **React 18** with TypeScript
- **Modern CSS** — custom properties, fluid clamp() typography/spacing, CSS Grid, no frameworks
- **Google Fonts** — Outfit, JetBrains Mono, Cormorant Garamond, Caveat
- **12 color themes** × light/dark mode — all WCAG AAA compliant
- **Netlify Forms** with honeypot spam protection

## Architecture

### Layers

The codebase separates concerns into three layers with a one-directional dependency graph:

- **`types/`** — shared TypeScript interfaces and types (imports nothing)
- **`data/`** — pure static content arrays (imports from types only)
- **`lib/`** — accessor and resolver functions (imports from data and types)

Components import functions from `lib/`, types from `types/`, and data directly only when needed (e.g. theme arrays).

### Directory Structure

```
app/
  layout.tsx                  — Root layout, fonts, ThemeProvider
  page.tsx                    — Home: Hero + RoleGrid + Testimonials + Contact
  globals.css                 — Full CSS design system
  frontend-developer/         — Role-specific CV page
  digital-marketing/          — Role-specific CV page
  ux-engineer/                — Role-specific CV page
  chief-vibes-officer/        — Role-specific CV page
  the-full-picture/           — Complete CV (all roles combined)
  contact/                    — Contact form with role-aware context

components/
  layout/                     — Header, Footer
  ui/                         — Icon, DownloadButton, ContextLink, EmailLink, SkillTags, Loading
  sections/                   — Hero, RoleHero, Timeline, TestimonialCarousel, ContactSection,
                                RoleCrossNav, RoleGrid, RoleCard
  theme/                      — ThemeProvider, ThemePicker, DarkModeToggle
  RolePageView.tsx            — Shared role page template
  ContactForm.tsx             — Netlify Forms integration
  ContactPageContent.tsx      — Contact page with ?from= context
  TechIcons.tsx               — Brand icon system (simple-icons)

data/
  roles.ts                    — Role definitions (pure data)
  experiences.ts              — Work history entries with role-specific variants
  content-items.ts            — Case studies, achievements, stories
  testimonials.ts             — Testimonial quotes (placeholder — real ones coming)
  themes.ts                   — 12 AAA-compliant color themes

lib/
  roles.ts                    — Role getters (getRoleBySlug, getDisplayRoles, getPdfForSlug)
  experiences.ts              — Timeline resolver (resolveVariant, getTimelineForRole)
  content.ts                  — Content item resolver (getContentItems, getAllCaseStudies)
  testimonials.ts             — Testimonial getters
  themes.ts                   — Theme getter (getThemeById)

hooks/
  useClickOutside.ts          — Click-outside detection
  useEscapeKey.ts             — Escape key handler
  useMobileMenu.ts            — Mobile menu state + body scroll lock
  useFromContext.ts           — URL ?from= parameter reader

types/
  index.ts                    — All shared type definitions
```

### Client vs Server

Server components by default. Client components are limited to:
- **ThemeProvider** — theme/mode state, localStorage, system preference detection
- **Header** — `usePathname()` for active state, mobile menu toggle
- **Footer** — wraps ThemePicker and DarkModeToggle
- **ThemePicker** — popover state, click-outside
- **DarkModeToggle** — theme context consumer
- **TestimonialCarousel** — auto-rotation, navigation state
- **ContactForm** — form submission state
- **ContactPageContent** — reads URL search params
- **ContextLink** — appends current path to link href

### CSS Design System

Single `globals.css` organised in layers: custom properties → reset → utilities → primitives (buttons, links, cards, forms, tags, controls) → layout → sections → animations → print → responsive.

- Fluid typography: `clamp()` from `--text-xs` to `--text-hero`
- Fluid spacing: `--space-xs` to `--space-2xl`
- Reusable `.card` base class with `.role-card` and `.cross-nav-card` extensions
- Shared button base selector for `.btn-outline`, `.btn-solid-accent`, `.role-card-cta`
- All responsive styles consolidated in one `@media` block at the bottom

### Data Architecture

**Role-specific content** uses a variant resolver system. Experiences and other fields can be a plain string (same for all roles) or an array of `{ id, value }` pairs for role-specific copy. The resolver tries: exact role match → 'default' → first entry.

**Content items** (case studies, achievements, stories) are stored centrally with IDs. Each role's `contentSection` references items by ID via `itemIds`. Items with a `title` render as titled blocks; items without render as plain paragraphs.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Hosted on **Netlify**. Domain via **GoDaddy**.
