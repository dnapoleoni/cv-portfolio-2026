# Dan Napoleoni — Portfolio & CV

> A developer who thinks like a designer and communicates like a human.

**Live site:** [danielnapoleoni.dev](https://danielnapoleoni.dev)

## Hey there

If you're a hiring manager or recruiter poking around this repo — welcome, and thanks for digging deeper than the PDF. This site _is_ the code sample. It's a portfolio, an online CV, a personality test, and a reference collection tool — all built with the same care I'd bring to your codebase.

If you like what you see (the code or the human behind it), the fastest way to reach me is through the [contact page](https://danielnapoleoni.dev/contact) or [LinkedIn](https://www.linkedin.com/in/daniel-napoleoni).

If you're a developer looking at how the site is put together — the `/prompts` directory contains the AI prompts used during the build. They tell part of the story, but not all of it — a lot of the architecture decisions, copy, data structure, and polish happened through manual iteration between prompts. It's AI-assisted development, not AI-generated.

---

## What this site does

Five role-specific CV pages, each pulling from a shared data layer with role-aware content variants. A recruiter clicking a link from a job application lands directly on the relevant role — frontend, marketing, UX, or vibes — with tailored experience descriptions, skills, testimonials, and a role-specific downloadable PDF. They never need to see the home page. But if they want the full picture, it's one click away.

All of this is powered by a single set of experiences and content blocks. Change a job description once, it updates everywhere.

---

> **⚠️ Next.js Version Notice**
>
> This project runs on **Next.js 14** (App Router). Next.js 16 is now available and an upgrade is planned but not yet scheduled. Considerations for the upgrade include `@react-pdf/renderer` compatibility with newer React versions, the `next/font` limitation (currently working around it with `<link>` tags), and Netlify adapter support. The architecture is straightforward enough that the migration should be low-risk, but the PDF generation pipeline will need testing.

---

## Tech Stack

- **Next.js 14** App Router, **React 18**, **TypeScript**
- **Modern CSS** — custom properties, fluid `clamp()` typography and spacing, CSS Grid. No Tailwind, no component libraries, no external CSS frameworks.
- **Google Fonts** — Outfit (body), JetBrains Mono (code/UI), Libre Baskerville (editorial), Caveat (personality)
- **12 colour themes** × light/dark mode — all WCAG AAA compliant
- **Netlify Forms** with honeypot spam protection
- **Netlify Blobs** for reference/testimonial data storage
- **@react-pdf/renderer** for build-time PDF generation (5 role-specific CVs)
- **simple-icons** for brand SVG icons

## Architecture

### Layers

Three layers with a one-directional dependency graph:

- **`types/`** — shared TypeScript interfaces (imports nothing)
- **`data/`** — pure static content arrays (imports from types only)
- **`lib/`** — accessor and resolver functions (imports from data and types)

Components import from `lib/` and `types/`. Data is never imported directly into components except where unavoidable (e.g. theme arrays in ThemeProvider).

### Client vs Server

Server components by default. Client components are limited to elements that genuinely need state, effects, or browser APIs: the theme system, mobile menu, testimonial carousel, form submission, URL param reading, mailto assembly, and the console greeting.

### Data Architecture

Experiences and content fields use a **variant resolver** — either a plain string (same for all roles) or an array of `{ id, value }` pairs for role-specific copy. The resolver tries: exact role slug match → `'default'` entry → first entry. This is how five different role pages can show the same job with different descriptions without duplicating data.

Content items (case studies, achievements, stories) are stored centrally with IDs. Each role's `contentSection` references items by ID. Items with a `title` render as titled blocks; items without render as plain paragraphs.

### CSS Design System

Single `globals.css` organised in layers: custom properties → reset → utilities → primitives (buttons, links, cards, forms, tags, controls) → layout → sections → animations → print → responsive.

Fluid typography scales from `--text-xs` to `--text-hero` across 8 steps. Fluid spacing from `--space-xs` to `--space-2xl` across 6 steps. All responsive styles consolidated in media query blocks at the bottom. No inline styles anywhere.

### PDF Generation

Five PDFs generated at build time via `@react-pdf/renderer` and a `tsx` script. The full CV uses categorised skill groups; role-specific PDFs use flat skill lists. PDFs are gitignored and regenerated on every Netlify deploy. Known limitation: `@react-pdf/renderer` doesn't produce tagged/accessible PDFs.

### Reference Collection

The `/reference` route is a code-protected page for collecting testimonials from former colleagues. Referees receive a direct link with a unique code, validate it against Netlify Blobs via a server action, and submit testimonials through a pre-filled form. Not linked anywhere in public navigation.

Reference data is stored in Netlify Blobs (store: `"references"`). Each entry is a JSON object keyed by a unique code containing the referee's name, role, company, email, and a personalised message. Entries are managed via the Netlify CLI or dashboard — see [CLAUDE.md](./CLAUDE.md) for the full setup guide including entry shape, CLI commands, and local development instructions.

## Directory Structure

```
app/
  layout.tsx                  — Root layout, fonts, metadata, ThemeProvider
  page.tsx                    — Home: Hero + RoleGrid + Testimonials + ContactCTA
  globals.css                 — Full CSS design system
  frontend-developer/         — Role-specific CV page
  digital-marketer/           — Role-specific CV page
  ux-engineer/                — Role-specific CV page
  chief-vibes-officer/        — Role-specific CV page
  the-full-picture/           — Complete CV (all roles combined)
  work/                       — Portfolio & case studies page
  contact/                    — Contact form with role-aware context + reference selection
  reference/                  — Reference collection (code-protected)
  api/reference/              — Legacy API route (superseded by server action)
  sitemap.ts, robots.ts       — Auto-generated SEO files
  not-found.tsx               — 404 page

components/
  layout/                     — Header, Footer
  ui/                         — Icon, DownloadButton, ContextLink, EmailLink, SkillTags,
                                Loading, ConsoleGreeting
  sections/                   — Hero, RoleHero, Timeline, TestimonialCarousel, ContactCTA,
                                RoleCrossNav, RoleGrid, RoleCard
  theme/                      — ThemeProvider, ThemePicker, DarkModeToggle
  RolePageView.tsx            — Shared role page template
  ContactForm.tsx             — Netlify Forms integration
  TechIcons.tsx               — SVG tech icons (simple-icons + custom)

data/                         — Pure content: roles, experiences, content-items,
                                testimonials, themes, contact
lib/                          — Accessors: role getters, variant resolver, testimonial
                                filtering, theme lookup
hooks/                        — useClickOutside, useEscapeKey, useMobileMenu, useFromContext
types/                        — All shared TypeScript interfaces
scripts/                      — Build-time PDF generation
prompts/                      — Every AI prompt used to build this site
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` (see `.env.example`):

```
CONTACT_EMAIL=your@email.com
CONTACT_PHONE=0400000000
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
```

These are used by the PDF generation script (build-time) and the EmailLink component (client-side). In production they're set in the Netlify dashboard and never committed.

### Scripts

| Script                  | What it does                                      |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Start dev server                                  |
| `npm run build`         | Production build                                  |
| `npm run lint`          | Next.js linter                                    |
| `npm run generate-pdfs` | Generate 5 role-specific PDFs into `public/pdfs/` |

## Deployment

Hosted on **Netlify**. Domain via **GoDaddy**. The build command runs PDF generation before the Next.js build:

```
npm run generate-pdfs && npm run build
```

## Use This as a Starting Point

If you're a developer looking for a portfolio base — feel free to fork or clone this repo and make it your own. Strip out my content, keep whatever structural patterns are useful to you, and go build something that represents _you_.

All I'd ask is that you don't pass off my personal content (copy, work history, testimonials) as your own, and maybe throw a small credit in your README if the architecture was helpful. The code patterns and structure are yours to use freely.

## For the Full Picture

Detailed architecture rules, design system documentation, coding conventions, CSS layer structure, accessibility decisions, and known tech debt are all in [CLAUDE.md](./CLAUDE.md). It's written as AI assistant context but doubles as comprehensive project documentation for anyone reading the code.
