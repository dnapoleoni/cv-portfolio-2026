# Pass 4 — Polish & Refinement

> Part 4 of 4 in the codebase refactor. See `prompts/09-codebase-refactor-plan.md` for the full plan.
>
> **Branch:** `claude/refactor-polish` (from `claude/refactor` parent branch)
> **Risk:** LOW — small targeted improvements
> **Scope:** Various files. Type import cleanup, themes consistency, dead code removal, bug fix, README rewrite.

## Git Setup

Before making any code changes:
1. Confirm you are on the `claude/refactor` branch
2. Create a sub-branch: `git checkout -b claude/refactor-polish`
3. Make all changes on this branch
4. **Do not commit.** Dan will review on localhost, then commit and merge into `claude/refactor` manually.

## Context

After Pass 1 (CSS), Pass 2 (components), and Pass 3 (data layer), the codebase is well-structured. This final pass cleans up leftover inconsistencies: type re-export crutches that should be direct imports, the themes file that wasn't part of Pass 3's separation, a broken CSS transition value, unused CSS utilities, an unnecessarily exported interface, and a README that's completely out of date.

**The cardinal rule remains: nothing should look or behave differently after this pass** (except the broken transition, which currently does nothing).

## Instructions

### Step 1: Read everything first

Before making any changes:
1. Read `CLAUDE.md` in full
2. Read `prompts/09-codebase-refactor-plan.md`
3. Skim all files modified in Passes 1–3 to understand current state

### Step 2: Clean up type imports — remove re-export crutches

Currently `data/roles.ts` and `data/testimonials.ts` have re-export lines that exist purely so component type imports didn't need updating in Pass 3. This is confusing — types should come from `@/types`, not be re-exported through data files.

**A. Update these 6 component files to import types directly from `@/types`:**

`components/TechIcons.tsx`:
```tsx
// Before:
import type { TechIconId } from '@/data/roles';
// After:
import type { TechIconId } from '@/types';
```

`components/sections/RoleCard.tsx`:
```tsx
// Before:
import type { RoleData } from '@/data/roles';
// After:
import type { RoleData } from '@/types';
```

`components/sections/RoleCrossNav.tsx`:
```tsx
// Before:
import type { RoleData } from '@/data/roles';
// After:
import type { RoleData } from '@/types';
```

`components/sections/RoleHero.tsx`:
```tsx
// Before:
import type { Tagline } from '@/data/roles';
// After:
import type { Tagline } from '@/types';
```

`components/sections/Timeline.tsx`:
```tsx
// Before:
import type { ResolvedTimelineEntry } from '@/data/roles';
// After:
import type { ResolvedTimelineEntry } from '@/types';
```

`components/sections/TestimonialCarousel.tsx`:
```tsx
// Before:
import type { Testimonial } from '@/data/testimonials';
// After:
import type { Testimonial } from '@/types';
```

**B. Remove the re-export lines from data files:**

`data/roles.ts` — remove this line:
```ts
export type { RoleData, Tagline, TechIconId, ResolvedTimelineEntry } from '@/types';
```

Also clean up the import at the top — `data/roles.ts` only needs `TechIconId` and `RoleData` for its own array type annotations. Check if `Tagline` is also used directly in the roles array (it is, for the tagline objects). Update to only import what the file actually uses:
```ts
import type { TechIconId, RoleData } from '@/types';
```
(If `Tagline` isn't referenced directly in the array type annotations — the roles array is typed as `RoleData[]` which includes `Tagline` implicitly — then it doesn't need importing. Check and only import what's needed.)

`data/testimonials.ts` — remove this line:
```ts
export type { Testimonial } from '@/types';
```

### Step 3: Bring themes into the architecture

`data/themes.ts` still has its own inline interfaces (`ThemeColors`, `Theme`) and a function (`getThemeById`). This is the same pattern we cleaned up in Pass 3 for roles and testimonials.

**A. Move theme types to `types/index.ts`:**

Add at the end of `types/index.ts`:
```ts
/** Color values for a single theme mode (light or dark) */
export interface ThemeColors {
  bg: string;
  bgElevated: string;
  bgHover: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentHover: string;
  border: string;
  borderSubtle: string;
}

/** A complete theme with light and dark modes */
export interface Theme {
  id: string;
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}
```

**B. Update `data/themes.ts`:**
- Remove the `ThemeColors` and `Theme` interface definitions
- Add: `import type { Theme } from '@/types';`
- Remove the `getThemeById` function (moving to lib)
- Keep: `themes` array, `defaultThemeId`

**C. Create `lib/themes.ts`:**
```ts
import type { Theme } from '@/types';
import { themes } from '@/data/themes';

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
```

**D. Update theme component imports:**

`components/theme/ThemeProvider.tsx`:
```tsx
// Before:
import { themes, defaultThemeId, getThemeById, type Theme } from '@/data/themes';
// After:
import type { Theme } from '@/types';
import { themes, defaultThemeId } from '@/data/themes';
import { getThemeById } from '@/lib/themes';
```

`components/theme/ThemePicker.tsx`:
```tsx
// This file only imports { themes } from '@/data/themes' — no change needed
```

### Step 4: Make Experience interface non-exported

In `data/experiences.ts`, the `Experience` interface is exported but never imported by any other file. It only types the array within that file. Change:

```ts
// Before:
export interface Experience {
// After:
interface Experience {
```

### Step 5: Fix broken CSS transition

In `app/globals.css`, line 1147 (inside the responsive section, `.nav-row-mobile`), there's a broken transition value missing the `ms` unit:

```css
/* Before: */
transition: all 1000 ease-in-out;
/* After: */
transition: all 1000ms ease-in-out;
```

### Step 6: Remove unused CSS utilities

These utility classes were added in Pass 1 but are not used by any component:
- `.mt-sm`
- `.mt-lg`
- `.mt-xl`
- `.mobile-text-center`

Remove them from `app/globals.css`. Only `.mt-md` is actually used. If they're needed in future, they can be re-added — dead code shouldn't live in a portfolio piece.

### Step 7: TechIcons inline style

`components/TechIcons.tsx` line 85 has `style={{ flexShrink: 0 }}`. Add a `.flex-shrink-0` utility to `app/globals.css` in the utilities section and replace the inline style:

```css
.flex-shrink-0 { flex-shrink: 0; }
```

In TechIcons.tsx:
```tsx
// Before:
style={{ flexShrink: 0 }}
// After:
className={className ? `${className} flex-shrink-0` : 'flex-shrink-0'}
```

Wait — TechIcons already accepts a `className` prop. Check how it's used: `<TechIcon id={id} size={size} />` inside TechIconRow, no className passed. So the simpler change is:

```tsx
// Before:
    <svg
      ...
      className={className}
      style={{ flexShrink: 0 }}
    >

// After:
    <svg
      ...
      className={`flex-shrink-0${className ? ` ${className}` : ''}`}
    >
```

Remove the `style` prop entirely.

### Step 8: README rewrite

The README is significantly out of date — it references a flat component structure, old data architecture, wrong theme count, non-existent routes (`cv/page.tsx`, `role/[slug]/page.tsx`), and has stale next steps. Rewrite it to reflect the current architecture.

```markdown
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
  useFromContext.ts            — URL ?from= parameter reader

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
```

### Step 9: Code comments

Add brief JSDoc comments to non-obvious functions in `lib/`. These should explain *intent*, not repeat the function name:

**`lib/experiences.ts`** — `resolveVariant`:
```ts
/**
 * Resolve a RoleVariant field for a given role.
 * A RoleVariant is either a plain string (universal) or an array of
 * { id, value } pairs for role-specific copy. Resolution order:
 * exact role match → 'default' entry → first entry.
 */
```
(This already exists — verify it's present and accurate.)

**`lib/roles.ts`** — `getPdfForSlug`:
```ts
/** Return the correct PDF href and download label for a role slug.
 *  Falls back to the general CV for unknown slugs or 'the-full-picture'. */
```

**`lib/content.ts`** — `getAllCaseStudies`:
```ts
/** Get all titled content items — used by the future portfolio/work page. */
```

Don't add comments to obvious functions like `getRoleBySlug` or `getTestimonialsForRole`.

### Step 10: Verify

After all changes:
1. `npx tsc --noEmit` passes with no errors
2. No component imports from `@/data/roles` or `@/data/testimonials` for types (grep to confirm)
3. `data/` files export only data arrays and constants — no functions, no type re-exports
4. `lib/` files contain all accessor functions
5. `types/index.ts` contains all shared types including theme types
6. No inline `style=` props remain except ThemePicker (dynamic colours) and ThemeProvider (FOUC prevention)
7. README accurately describes the current architecture

## Output

Provide a summary of:
- Files modified and what changed
- Files created (lib/themes.ts)
- Dead code removed
- Bug fixed (transition unit)
- Import path changes

## Verification checklist for Dan

After this pass, check on localhost:

- [ ] Theme switching still works (ThemeProvider refactored)
- [ ] All role pages render correctly
- [ ] Mobile menu opens/closes (transition fix)
- [ ] TechIcons render correctly (inline style removed)
- [ ] No console errors
- [ ] `npx tsc --noEmit` passes
- [ ] Review README.md — does it accurately describe the repo?

After merging this into `claude/refactor`:
- [ ] Review the entire `claude/refactor` branch against `main`
- [ ] Test the full site one more time
- [ ] Merge `claude/refactor` into `main`
- [ ] Celebrate — the codebase is now a portfolio piece
