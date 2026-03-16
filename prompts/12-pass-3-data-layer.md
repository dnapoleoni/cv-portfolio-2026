# Pass 3 — Data Layer Cleanup

> Part 3 of 4 in the codebase refactor. See `prompts/09-codebase-refactor-plan.md` for the full plan.
>
> **Branch:** `claude/refactor-data-layer` (from `claude/refactor` parent branch)
> **Risk:** LOW — if imports resolve, it works
> **Scope:** `data/` files, `types/` files, new `lib/` directory, and import path updates in components. No CSS changes, no component logic changes.

## Git Setup

Before making any code changes:
1. Confirm you are on the `claude/refactor` branch
2. Create a sub-branch: `git checkout -b claude/refactor-data-layer`
3. Make all changes on this branch
4. **Do not commit.** Dan will review on localhost, then commit and merge into `claude/refactor` manually.

## Context

After Pass 1 (CSS) and Pass 2 (components), the frontend is clean and well-organised. But `data/roles.ts` is doing too much at 587 lines — it holds type definitions, static data arrays, AND accessor/resolver functions all in one file. This pass properly separates concerns:

- `types/` — type definitions only
- `data/` — pure static content (arrays, objects, no logic)
- `lib/` — accessor and resolver functions that operate on the data

This creates a one-directional dependency graph: `lib/ → data/ → types/`. No circular imports are possible by design.

**The cardinal rule remains: nothing should look or behave differently after this pass.** We are splitting files and separating concerns, not changing any rendering logic.

## Current State

`data/roles.ts` (587 lines) currently mixes:
- Type definitions: `TechIconId`, `RoleVariant`, `Experience`, `ResolvedTimelineEntry`, `ContentSection`, `Tagline`, `RoleData` (lines 1–75)
- Static data: `navRoleSlugs`, `experiences` array, `roles` array (lines 78–540)
- Logic: `resolveVariant`, `resolveExperience`, `getTimelineForRole`, `getRoleBySlug`, `getDisplayRoles`, `getOtherRoles`, `getPdfForSlug` (lines 25–32, 542–587)

`data/testimonials.ts` (71 lines) similarly mixes types, data and logic — but it's small enough that the main fix is just moving the type out.

## Target Architecture

```
types/
  index.ts              → all shared type definitions
  css.d.ts              → existing, unchanged

data/
  roles.ts              → roles array, navRoleSlugs (pure data, no functions)
  experiences.ts        → experiences array (pure data)
  content-items.ts      → contentItems array (pure data)
  testimonials.ts       → testimonials array (pure data)
  themes.ts             → unchanged

lib/
  roles.ts              → getRoleBySlug, getDisplayRoles, getOtherRoles, getPdfForSlug
  experiences.ts        → resolveVariant, getTimelineForRole
  content.ts            → getContentItems, getAllCaseStudies
  testimonials.ts       → getTestimonialsForRole, getFeaturedTestimonials
```

**Dependency direction (one-way only):**
```
Components → lib/ → data/ → types/
Components → types/ (for type-only imports)
```

No file in `data/` imports from `lib/`. No file in `types/` imports from anything.

## Instructions

### Step 1: Read everything first

Before making any changes:
1. Read `CLAUDE.md` in full
2. Read `prompts/09-codebase-refactor-plan.md` — specifically the Pass 3 section
3. Read `data/roles.ts` in full — understand every type, every data entry, every function
4. Read `data/testimonials.ts` in full
5. Read `components/RolePageView.tsx` to understand how `contentSection` is consumed
6. Grep for all imports from `@/data/roles` and `@/data/testimonials` across the codebase to map every consumer

### Step 2: Create type definition files

**Create `types/index.ts`** — the central types file. Move ALL shared types here:

```ts
/** Tech icons used in role cards and headers */
export type TechIconId =
  | 'react'
  | 'typescript'
  | 'vue'
  | 'javascript'
  | 'html'
  | 'css'
  | 'nextjs'
  | 'salesforce'
  | 'figma'
  | 'git'
  | 'sparkles'
  | 'puzzle'
  | 'users'
  | 'accessibility';

/** A field that's either universal (string) or has role-specific variants */
export type RoleVariant = string | { id: string; value: string }[];

/** Timeline entry after resolving role-specific variants */
export interface ResolvedTimelineEntry {
  date: string;
  role: string;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent';
  description: string;
}

/** Three-font tagline used on role hero sections */
export interface Tagline {
  mono: string;
  serif: string;
  hand: string;
}

/** A content item — case study, achievement, story, or plain paragraph */
export interface ContentItem {
  id: string;
  title?: string;
  description: string;
}

/** A role's content section configuration — heading + references to content items */
export interface ContentSection {
  heading: string;
  itemIds: string[];
}

/** Testimonial quote with role relevance tagging */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  relevantRoles: string[];
  contactable?: boolean;
}

/** Full role definition */
export interface RoleData {
  slug: string;
  title: string;
  shortDesc: string;
  subtitle: string;
  tagline?: Tagline;
  intro: string[];
  variant?: 'vibes';
  contactHeading?: string;
  icons?: TechIconId[];
  skills: string[];
  experienceIds: string[];
  contentSection?: ContentSection;
}
```

**Keep `types/css.d.ts`** as-is.

Note the key changes from current types:
- `ContentSection.items` becomes `ContentSection.itemIds` (string array of IDs instead of inline objects)
- New `ContentItem` type with an `id` field
- `Testimonial` moves here from `data/testimonials.ts`
- `RoleVariant` is now exported (currently it's a non-exported `type` in roles.ts)

### Step 3: Create `data/experiences.ts` (pure data)

Extract the `experiences` array from `data/roles.ts`. This file exports data only, no functions:

```ts
import type { RoleVariant } from '@/types';

export interface Experience {
  id: string;
  date: RoleVariant;
  role: RoleVariant;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent';
  description: RoleVariant;
}

export const experiences: Experience[] = [
  // ... all 11 entries, copied exactly as they currently exist in roles.ts
  // (everest, mira, world-vision, adtorque, honest-fox, bower-house,
  //  clemenger, freelance-contract, isobar, cre8ive, cvo-off-the-clock)
];
```

Note: `Experience` interface stays here since it describes the raw data shape — consumers work with `ResolvedTimelineEntry` from `@/types`.

### Step 4: Create `data/content-items.ts` (pure data)

Extract all `contentSection.items` into a standalone file with IDs:

```ts
import type { ContentItem } from '@/types';

export const contentItems: ContentItem[] = [
  // Frontend Developer — "How I work"
  {
    id: 'fe-flow-modal',
    title: 'I see repetitive patterns and build systems instead.',
    description: '...',  // FULL existing text from frontend-developer contentSection
  },
  {
    id: 'fe-honest-fox-cms',
    title: 'I tend to go beyond the brief when it makes sense.',
    description: '...',  // FULL existing text
  },

  // Digital Marketing — "Achievements"
  {
    id: 'dm-auspost-overhaul',
    title: 'Redesigning how Australia Post briefed and built emails.',
    description: '...',  // FULL existing text
  },
  {
    id: 'dm-aussuper-banners',
    title: 'Building banners so flexible that Google made them a case study.',
    description: '...',  // FULL existing text
  },
  {
    id: 'dm-myer-edm',
    title: 'Running the Myer email machine solo.',
    description: '...',  // FULL existing text
  },

  // UX Engineer — "How I work"
  {
    id: 'ux-splose-dashboard',
    title: 'I fill in what the spec leaves out.',
    description: '...',  // FULL existing text
  },
  {
    id: 'ux-smith-family',
    title: "I build logic when the designs don't have any.",
    description: '...',  // FULL existing text
  },

  // Chief Vibes Officer — "The vibes archive"
  {
    id: 'cvo-easter-bunny',
    title: 'The Easter Bunny who leaked company secrets.',
    description: '...',  // FULL existing text
  },
  {
    id: 'cvo-panem-travel',
    title: 'A fake travel agency, hidden codes, and office-wide assassination.',
    description: '...',  // FULL existing text
  },
  {
    id: 'cvo-five-clubs',
    title: 'Five clubs, a live auction, and eventually, the onboarding deck.',
    description: '...',  // FULL existing text
  },

  // The Full Picture — "Also" (no title — prose paragraph)
  {
    id: 'full-picture-also',
    description: '...',  // FULL existing text (the "Beyond the day job..." paragraph)
  },
];
```

**CRITICAL:** Copy the full description text from the existing `contentSection.items` in roles.ts — do not abbreviate or modify any copy. The `'...'` above is just a placeholder for this prompt.

### Step 5: Update `data/roles.ts` (pure data)

Slim down to role definitions and the `navRoleSlugs` array only. No functions.

**Remove:**
- All type definitions (now in `types/index.ts`)
- The `experiences` array (now in `data/experiences.ts`)
- ALL functions: `resolveVariant`, `resolveExperience`, `getTimelineForRole`, `getRoleBySlug`, `getDisplayRoles`, `getOtherRoles`, `getPdfForSlug` (now in `lib/`)

**Add imports:**
```ts
import type { TechIconId, RoleData } from '@/types';
```

**Update each role's `contentSection`** to use `itemIds` instead of inline `items`:

The complete mapping:
- `frontend-developer`: `itemIds: ['fe-flow-modal', 'fe-honest-fox-cms']`
- `digital-marketing`: `itemIds: ['dm-auspost-overhaul', 'dm-aussuper-banners', 'dm-myer-edm']`
- `ux-engineer`: `itemIds: ['ux-splose-dashboard', 'ux-smith-family']`
- `chief-vibes-officer`: `itemIds: ['cvo-easter-bunny', 'cvo-panem-travel', 'cvo-five-clubs']`
- `the-full-picture`: `itemIds: ['full-picture-also']`

**Re-export types** for convenience so existing component type imports still work without changes:
```ts
export type { RoleData, Tagline, TechIconId, ResolvedTimelineEntry } from '@/types';
```

### Step 6: Update `data/testimonials.ts` (pure data)

- Remove the `Testimonial` interface (now in `types/index.ts`)
- Remove the `getTestimonialsForRole` and `getFeaturedTestimonials` functions (moving to `lib/testimonials.ts`)
- Import type: `import type { Testimonial } from '@/types';`
- Keep only the `testimonials` array export
- Re-export type: `export type { Testimonial } from '@/types';`

### Step 7: Create `lib/` directory with accessor functions

**Create `lib/roles.ts`:**
```ts
import type { RoleData } from '@/types';
import { roles, navRoleSlugs } from '@/data/roles';

export function getRoleBySlug(slug: string): RoleData | undefined {
  return roles.find((r) => r.slug === slug);
}

export function getDisplayRoles(): RoleData[] {
  return navRoleSlugs
    .map((slug) => roles.find((r) => r.slug === slug))
    .filter((r): r is RoleData => r !== undefined);
}

export function getOtherRoles(currentSlug: string): RoleData[] {
  return getDisplayRoles().filter((r) => r.slug !== currentSlug);
}

export function getPdfForSlug(slug?: string): { href: string; label: string } {
  if (!slug || slug === 'the-full-picture') {
    return { href: '/Dan-Napoleoni-CV.pdf', label: 'Download CV' };
  }
  const role = getRoleBySlug(slug);
  if (role) {
    return { href: `/Dan-Napoleoni-CV-${slug}.pdf`, label: `Download CV - ${role.title}` };
  }
  return { href: '/Dan-Napoleoni-CV.pdf', label: 'Download CV' };
}
```

**Create `lib/experiences.ts`:**
```ts
import type { RoleVariant, ResolvedTimelineEntry } from '@/types';
import { experiences } from '@/data/experiences';

/**
 * Resolve a RoleVariant field for a given role.
 * Tries: exact role match → 'default' → first entry.
 */
export function resolveVariant(field: RoleVariant, roleId: string): string {
  if (typeof field === 'string') return field;
  const match = field.find((v) => v.id === roleId);
  if (match) return match.value;
  const defaultMatch = field.find((v) => v.id === 'default');
  if (defaultMatch) return defaultMatch.value;
  return field[0].value;
}

function resolveExperience(id: string, roleId: string): ResolvedTimelineEntry | null {
  const exp = experiences.find((e) => e.id === id);
  if (!exp) return null;
  return {
    date: resolveVariant(exp.date, roleId),
    role: resolveVariant(exp.role, roleId),
    company: exp.company,
    type: exp.type,
    description: resolveVariant(exp.description, roleId),
  };
}

/** Get resolved timeline entries for a role */
export function getTimelineForRole(experienceIds: string[], roleSlug: string): ResolvedTimelineEntry[] {
  return experienceIds
    .map((id) => resolveExperience(id, roleSlug))
    .filter((e): e is ResolvedTimelineEntry => e !== null);
}
```

Note: `getTimelineForRole` takes `experienceIds` directly instead of looking up the role — this keeps the dependency graph clean (`lib/experiences` only imports from `data/experiences`, never from `lib/roles` or `data/roles`).

**Create `lib/content.ts`:**
```ts
import type { ContentItem } from '@/types';
import { contentItems } from '@/data/content-items';

/** Resolve content items from a list of IDs */
export function getContentItems(itemIds: string[]): ContentItem[] {
  return itemIds
    .map((id) => contentItems.find((item) => item.id === id))
    .filter((item): item is ContentItem => item !== undefined);
}

/** Get all content items that have titles (for future portfolio/work page) */
export function getAllCaseStudies(): ContentItem[] {
  return contentItems.filter((item) => item.title !== undefined);
}
```

**Create `lib/testimonials.ts`:**
```ts
import type { Testimonial } from '@/types';
import { testimonials } from '@/data/testimonials';

export function getTestimonialsForRole(slug: string): Testimonial[] {
  return testimonials.filter((t) => t.relevantRoles.includes(slug));
}

export function getFeaturedTestimonials(count = 3): Testimonial[] {
  return testimonials.slice(0, count);
}
```

### Step 8: Update all component and page imports

Components should now import **functions from `lib/`** and **types from `@/types`** (or via the re-exports from `data/` files for convenience).

**`components/RolePageView.tsx`** — the biggest change:
```tsx
// Before:
import { getRoleBySlug, getOtherRoles, getTimelineForRole, getPdfForSlug } from '@/data/roles';
import { getTestimonialsForRole } from '@/data/testimonials';

// After:
import { getRoleBySlug, getOtherRoles, getPdfForSlug } from '@/lib/roles';
import { getTimelineForRole } from '@/lib/experiences';
import { getTestimonialsForRole } from '@/lib/testimonials';
import { getContentItems } from '@/lib/content';
```

Also update the timeline call:
```tsx
// Before:
const timeline = getTimelineForRole(slug);
// After:
const timeline = getTimelineForRole(role.experienceIds, slug);
```

And update the contentSection rendering to use `getContentItems`:
```tsx
const contentItems = role.contentSection
  ? getContentItems(role.contentSection.itemIds)
  : [];

// In JSX (replace the existing contentSection block):
{role.contentSection && contentItems.length > 0 && (
  <section className="role-section" aria-labelledby="content-section-heading">
    <h2 id="content-section-heading">{role.contentSection.heading}</h2>
    {contentItems.map((item) => (
      <div key={item.id} className={item.title ? 'case-study' : ''}>
        {item.title && <h3>{item.title}</h3>}
        <p>{item.description}</p>
      </div>
    ))}
  </section>
)}
```

**`components/layout/Header.tsx`:**
```tsx
// Before:
import { getPdfForSlug } from '@/data/roles';
// After:
import { getPdfForSlug } from '@/lib/roles';
```

**`components/sections/RoleGrid.tsx`:**
```tsx
// Before:
import { getDisplayRoles } from '@/data/roles';
// After:
import { getDisplayRoles } from '@/lib/roles';
```

**`components/ContactPageContent.tsx`:**
```tsx
// Before:
import { getRoleBySlug } from '@/data/roles';
// After:
import { getRoleBySlug } from '@/lib/roles';
```

**`app/page.tsx`:**
```tsx
// Before:
import { getFeaturedTestimonials } from '@/data/testimonials';
// After:
import { getFeaturedTestimonials } from '@/lib/testimonials';
```

**These files should NOT need import changes** (they only import types, which are re-exported from data files):
- `components/sections/RoleCard.tsx` — `type { RoleData }` from `@/data/roles` ✓
- `components/sections/RoleCrossNav.tsx` — `type { RoleData }` from `@/data/roles` ✓
- `components/sections/RoleHero.tsx` — `type { Tagline }` from `@/data/roles` ✓
- `components/sections/Timeline.tsx` — `type { ResolvedTimelineEntry }` from `@/data/roles` ✓
- `components/TechIcons.tsx` — `type { TechIconId }` from `@/data/roles` ✓
- `components/sections/TestimonialCarousel.tsx` — `type { Testimonial }` from `@/data/testimonials` ✓

### Step 9: Verify

After all changes:
1. **Dependency graph is one-directional:** `lib/` → `data/` → `types/`. No file in `data/` imports from `lib/`. No file in `types/` imports from anything.
2. **Content is preserved:** Count content items (should be 11: 2 + 3 + 2 + 3 + 1). Verify each ID matches what its role references.
3. **Timeline is unchanged:** `getTimelineForRole` produces identical results with the new signature.
4. **No circular imports:** No file imports from a file that imports from it.
5. **All re-exports work:** Components that import types from `@/data/roles` or `@/data/testimonials` still resolve.

## Output

Provide a summary of:
- Files created (with purpose and what layer they belong to)
- Files modified (what changed)
- Dependency graph: confirm the one-directional flow
- Count of content items extracted and their IDs

## Verification checklist for Dan

After this pass, check on localhost:

- [ ] Every role page: content section renders with correct heading and items
- [ ] Frontend Developer: "How I work" with 2 titled case studies
- [ ] Digital Marketing: "Achievements" with 3 titled case studies
- [ ] UX Engineer: "How I work" with 2 titled case studies
- [ ] Chief Vibes Officer: "The vibes archive" with 3 titled stories
- [ ] The Full Picture: "Also" with 1 untitled paragraph
- [ ] Experience sections render correctly on all pages
- [ ] No console errors
- [ ] All other page sections unchanged (hero, skills, testimonials, contact, cross-nav)
