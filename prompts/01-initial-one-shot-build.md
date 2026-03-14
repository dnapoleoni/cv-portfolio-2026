# Initial One-Shot Build — Full Next.js Portfolio Site

Build a complete Next.js 14 portfolio site for Dan Napoleoni, a Melbourne-based frontend developer with 15+ years experience. This is a from-scratch build.

---

## Tech Stack

- Next.js 14 App Router, React 18, TypeScript
- Single `globals.css` with modern CSS: custom properties, fluid `clamp()` type/spacing, CSS Grid
- No Tailwind, no external CSS frameworks
- Google Fonts via `<link>` tags in head (NOT next/font): Outfit, JetBrains Mono, Cormorant Garamond, Caveat

---

## Site Structure

### Home Page (`app/page.tsx`)
- "Hi, I'm Dan" hero with profile image
- Three-font tagline treatment: monospace (JetBrains Mono) / italic serif (Cormorant Garamond) / handwritten (Caveat, accent colour)
- Role navigation cards leading to role-specific pages
- Testimonial carousel
- Contact CTA section

### Role Pages (`app/role/[slug]/page.tsx`)
Four role variants, each as a dynamic route:
- `frontend-developer` — React, TypeScript, Vue.js, 15+ years
- `digital-marketing-specialist` — eDMs, HTML banners, Salesforce Marketing Cloud
- `ux-engineer` — UX advocacy, accessibility, questioning briefs
- `chief-vibes-officer` — social clubs, ARGs, events, culture (dashed border card variant)

Each role page includes: tagline hero, intro paragraphs, experience timeline, skill tags, case studies, role-specific testimonials, contact CTA.

### CV Page (`app/cv/page.tsx`)
- Summary, full experience timeline, combined skills, "Also" section for non-dev interests
- Experience ABOVE skills on all pages

### Other Pages
- `app/not-found.tsx` — personality-driven 404 page
- Contact CTA sections linking to email/LinkedIn

---

## Design System

### Typography
Four fonts, each with specific purpose:
- Outfit = body, UI
- JetBrains Mono = code, technical elements, skill tags, wordmark
- Cormorant Garamond = editorial, testimonials, "designer" tagline segment
- Caveat = warmth, personality, "human" tagline segment, accent colour

Fluid typography using `clamp()` from `--text-xs` to `--text-hero`.
Fluid spacing: `--space-xs` to `--space-2xl`.

### Themes
6 colour themes (Warm, Ink, Midnight, Forest, Ocean, Sunset) x light/dark mode. All WCAG AAA compliant: 7:1 normal text, 4.5:1 large text. `textTertiary` only for large text or decorative elements. Persisted to localStorage, defaults to `prefers-color-scheme`.

### Accessibility
- Skip link, ARIA labels, semantic HTML
- `focus-visible` styling, keyboard navigation
- `.sr-only` utility class
- `prefers-reduced-motion` respected for all animations
- Animations: subtle fadeUp with stagger

---

## Data Architecture

All content data in `/data/` directory:
- `roles.ts` — 4 roles with skills, timelines, case studies, tagline data, tech icon references
- `testimonials.ts` — placeholder testimonials with role-specific filtering and `relevantRoles` field
- `themes.ts` — 6 themes with light/dark variants, all CSS custom properties

Timeline entries include a `type` field: `'contract'` | `'redundancy'` | `'permanent'` to contextualise short stints.

---

## Architecture Rules

- Server components by default. Only use `'use client'` when state, effects, or browser APIs are required.
- Components receive data as props.
- CSS classes must be location-independent (no `header-link`, `footer-controls`).
- Equal-height role cards via CSS Grid (grid items `display: flex`, cards stretch).
- Chief Vibes Officer card: dashed border, solid on hover.

---

## Files to Create

- `app/layout.tsx` — ThemeProvider wrapper, Google Fonts via link tags
- `app/page.tsx` — Hero + RoleGrid + Testimonials + Contact
- `app/cv/page.tsx` — full timeline CV
- `app/role/[slug]/page.tsx` — dynamic role pages
- `app/not-found.tsx`
- `app/globals.css` — full design system
- `components/TechIcons.tsx` — inline SVG tech icons
- `data/roles.ts`, `data/testimonials.ts`, `data/themes.ts`
- `tsconfig.json`, `next.config.js`, `package.json`, `.gitignore`, `README.md`
