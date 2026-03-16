# Codebase Refactor Plan

> Reference document for the 4-pass codebase uplift. If context is lost mid-process, this document plus the current state of `main` is enough to continue.

## Goal

Make the codebase worthy of being a portfolio piece. The repo is linked from the site — a hiring manager clicking through to GitHub should see clean architecture, DRY code, clear separation of concerns, and a well-organised CSS system.

## Git Strategy

**Parent feature branch with sub-branches per pass. Main stays untouched until everything is verified.**

```
main
 └── claude/refactor                        ← parent feature branch (from main)
      ├── claude/refactor-css-foundation    → merges into claude/refactor
      ├── claude/refactor-components        → merges into claude/refactor
      ├── claude/refactor-data-layer        → merges into claude/refactor
      └── claude/refactor-polish            → merges into claude/refactor
                                            then claude/refactor → main
```

| Pass | Branch name | Risk level |
|------|-------------|------------|
| 1 — CSS Foundation | `claude/refactor-css-foundation` | HIGH |
| 2 — Component Organisation | `claude/refactor-components` | MEDIUM |
| 3 — Data Layer Cleanup | `claude/refactor-data-layer` | LOW |
| 4 — Polish & Refinement | `claude/refactor-polish` | LOW |

**Setup (once, done by Dan):**
1. `git checkout -b claude/refactor` from `main`

**Workflow per pass:**
1. Each pass prompt instructs Code to create a sub-branch from `claude/refactor` (e.g. `git checkout -b claude/refactor-css-foundation`)
2. Code makes all changes, does not commit
3. Dan reviews every page on localhost (visual diff — does it look identical?)
4. Dan commits and merges sub-branch into `claude/refactor`
5. Next pass prompt is written against the updated `claude/refactor`

**If something goes wrong mid-refactor:** Delete the broken sub-branch. `claude/refactor` is clean at the last successfully merged pass. Re-run the failed pass with adjustments. Main is completely untouched throughout.

**Final merge:** Once all 4 passes are merged into `claude/refactor` and everything is verified as a whole, merge `claude/refactor` into `main`.

**If other work happens on main during the refactor:** Merge main into `claude/refactor` before continuing with the next pass, to keep things in sync.

**Verification checklist (run after every pass):**
- [ ] Home page renders correctly (hero, role cards, testimonials, contact)
- [ ] Each role page renders correctly (tagline hero, header, experience, skills, content section, testimonials, contact CTA, cross-nav)
- [ ] The Full Picture page renders correctly (no tagline, all experiences, combined skills, "Also" content section)
- [ ] Contact page renders correctly (with and without ?from= param)
- [ ] Theme picker works (all 12 themes × light/dark)
- [ ] Mobile menu opens/closes, links work
- [ ] Download CV buttons link to correct PDFs per role
- [ ] No console errors
- [ ] Sticky header works on scroll
- [ ] Vibes card/cross-nav has dashed border

---

## Pass 1 — CSS Foundation & Utilities

**Branch:** `claude/refactor-css-foundation`
**Risk:** HIGH — visual regressions possible
**Changes:** globals.css only (no component files)

### What's wrong now

1. **Duplicate button patterns:** `.role-card-cta` (line 726) rebuilds `.btn-accent` from scratch. `.carousel-btn` and `.theme-picker-btn` reinvent pieces of `.control-btn`.
2. **Card pattern duplicated:** `.role-card` and `.cross-nav-card` share ~80% of styling (border, radius, text-decoration, colour, transitions, hover, vibes variant).
3. **Scattered media queries:** At least 4 separate `@media (max-width: 640px)` blocks throughout the file, making responsive behaviour hard to trace.
4. **No utility classes:** `.mobile-center` exists alone. No other layout/spacing utilities.
5. **Inline styles in components:** `style={{ marginTop: 'var(--space-md)' }}` in RolePageView and ContactSection.
6. **Debug artifact:** Line 857 has `background-color: #c0ffee` in `.carousel-btn:before`.
7. **`.back-link` overlaps with `.nav-link`** — similar colour, size, transition patterns.

### What to do

**A. Restructure the file into clear layers (reorder, don't rename yet):**
```
1. Custom Properties (tokens)
2. Reset & Base
3. Utilities (NEW — spacing, alignment, display helpers)
4. Primitives (buttons, links, cards, form elements, tags)
5. Layout (page-wrapper, site-header, site-footer)
6. Sections (hero, role-nav, role-page, timeline, testimonials, contact, cross-nav, theme-picker)
7. Animations
8. Print
9. Responsive (ALL media queries consolidated here)
```

**B. Extract shared primitives:**

- **Base `.card` class** from `.role-card` and `.cross-nav-card`:
  ```css
  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    text-decoration: none;
    color: var(--color-text);
    background: transparent;
    transition: background-color var(--duration-slow) var(--ease-out),
                border-color var(--duration-slow) var(--ease-out);
  }
  .card:hover {
    background-color: var(--color-bg-elevated);
    border-color: var(--color-text-tertiary);
    color: var(--color-text);
  }
  .card--vibes { border-style: dashed; }
  .card--vibes:hover { border-style: solid; }
  ```
  Then `.role-card` and `.cross-nav-card` extend it with their specifics only.

- **Unified `.btn` base** — shared inline-flex, align-items, gap, border-radius, transition pattern:
  ```css
  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-out),
                color var(--duration-fast) var(--ease-out),
                border-color var(--duration-fast) var(--ease-out);
  }
  ```
  Then `.btn-outline`, `.btn-accent`, `.btn-solid-accent` only declare their unique properties (colours, padding, fonts). This also means `.role-card-cta` can just be `.btn-accent` with a parent-hover modifier.

**C. Add utility classes:**
```css
/* Spacing */
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }

/* Alignment */
.text-center-mobile { /* replaces .mobile-center */ }

/* Flex helpers */
.flex-col { display: flex; flex-direction: column; }
.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
```
Only add utilities that replace existing inline styles or one-off patterns. Don't create a full Tailwind-lite — just what's needed.

**D. Consolidate all media queries into one responsive section at the bottom.**

**E. Remove:**
- `#c0ffee` debug background on `.carousel-btn:before`
- Commented-out CSS (lines 1207-1212)
- Any orphaned classes not used by any component

**F. Add class replacements for inline styles:**
- `.mt-md` replaces `style={{ marginTop: 'var(--space-md)' }}` (used in RolePageView and ContactSection)

### What NOT to do in this pass
- Do not rename any existing classes that components reference (yet)
- Do not change component files (those inline styles stay until Pass 2 swaps them for utility classes)
- Do not change the visual output of anything

---

## Pass 2 — Component Organisation & DRY-up

**Branch:** `claude/refactor-components`
**Risk:** MEDIUM — import paths change but no logic changes
**Changes:** Component files, barrel exports, hooks

### Directory structure (target)

```
components/
  layout/
    Header.tsx
    Footer.tsx
  ui/
    DownloadButton.tsx
    Icon.tsx          (NEW — extracted SVG icon system)
    SkillTags.tsx
    ContextLink.tsx
    EmailLink.tsx
  sections/
    Hero.tsx
    RoleHero.tsx
    Timeline.tsx
    TestimonialCarousel.tsx
    ContactSection.tsx
    RoleCrossNav.tsx
    RoleGrid.tsx
    RoleCard.tsx
  theme/
    ThemeProvider.tsx
    ThemePicker.tsx
    DarkModeToggle.tsx
  ContactForm.tsx
  ContactPageContent.tsx
  RolePageView.tsx
  Loading.tsx
  index.ts            (updated barrel exports)
```

### Extractions

**A. Icon component** (`components/ui/Icon.tsx`)
Header, DarkModeToggle, TestimonialCarousel, DownloadButton, and RolePageView all contain inline SVGs. Extract a lookup-based Icon component:
```tsx
type IconName = 'download' | 'chevron-left' | 'chevron-right' | 'close' | 'menu' | 'sun' | 'moon' | 'arrow-left';

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  // SVG path lookup table
}
```
TechIcons stays separate — it's a different system (brand icons from simple-icons).

**B. Reusable hooks** (`hooks/`)

- `useClickOutside(ref, callback)` — extracted from ThemePicker
- `useEscapeKey(callback, isActive)` — extracted from ThemePicker
- `useMobileMenu()` — extracted from Header (returns `{ isOpen, toggle, close }`, handles body scroll lock and route-change cleanup)
- `useFromContext` — already exists, stays as-is

**C. Swap inline styles for utility classes:**
- RolePageView: `style={{ marginTop: 'var(--space-md)' }}` → `className="mt-md"`
- ContactSection: same pattern

**D. Apply base CSS classes from Pass 1:**
- RoleCard: apply `.card` base class alongside `.role-card`
- RoleCrossNav cards: apply `.card` base class alongside `.cross-nav-card`
- `.role-card-cta` → `.btn-accent` (with appropriate modifier if parent-hover behaviour needs CSS adjustment)

**E. Update barrel exports** (`components/index.ts`) to reflect new paths.

### What NOT to do in this pass
- Do not change any data files
- Do not change page files (app/ routes) beyond import path updates
- Do not change any rendered HTML structure or visual output

---

## Pass 3 — Data Layer Cleanup

**Branch:** `claude/refactor-data-layer`
**Risk:** LOW — if imports resolve, it works
**Changes:** `data/` files, `types/` files, new `lib/` directory, import path updates

### Architecture change

Separate concerns into three layers with a one-directional dependency graph:
- `types/` — type definitions only (imports nothing)
- `data/` — pure static content, arrays and objects (imports from `types/` only)
- `lib/` — accessor and resolver functions (imports from `data/` and `types/`)

Dependency flow: `Components → lib/ → data/ → types/`. No circular imports possible by design.

### Extractions

**A. `types/index.ts`** — all shared types in one file:
`RoleData`, `ResolvedTimelineEntry`, `ContentSection`, `ContentItem`, `Tagline`, `TechIconId`, `RoleVariant`, `Testimonial`

**B. `data/` files (pure data, no functions):**
- `data/experiences.ts` — the `experiences` array, `Experience` interface
- `data/content-items.ts` — extracted content items with IDs, referenced by roles via `contentSection.itemIds`
- `data/roles.ts` — slimmed to `roles` array, `navRoleSlugs`, and type re-exports for convenience
- `data/testimonials.ts` — slimmed to `testimonials` array and type re-export

**C. `lib/` files (accessor functions):**
- `lib/roles.ts` — `getRoleBySlug`, `getDisplayRoles`, `getOtherRoles`, `getPdfForSlug`
- `lib/experiences.ts` — `resolveVariant`, `getTimelineForRole` (takes experienceIds directly, not slug)
- `lib/content.ts` — `getContentItems`, `getAllCaseStudies`
- `lib/testimonials.ts` — `getTestimonialsForRole`, `getFeaturedTestimonials`

**D. Verify all imports resolve.** Components that import functions switch from `@/data/` to `@/lib/`. Components that only import types continue working via re-exports from `data/` files.

### What NOT to do in this pass
- Do not change component rendering logic
- Do not change CSS
- Do not add new features (portfolio page comes later, in a separate prompt)

---

## Pass 4 — Polish & Refinement

**Branch:** `claude/refactor-polish`
**Risk:** LOW — small targeted improvements
**Changes:** Various files, minor tweaks

### Tasks

**A. Type import cleanup:**
Remove re-export crutches from `data/roles.ts` and `data/testimonials.ts`. Update 6 components to import types directly from `@/types` instead of via data files.

**B. Themes consistency:**
Move `ThemeColors` and `Theme` interfaces to `types/index.ts`. Move `getThemeById` to `lib/themes.ts`. Update `data/themes.ts` to pure data only. Update ThemeProvider imports.

**C. Experience interface:**
Make `Experience` in `data/experiences.ts` non-exported (it's only used within that file).

**D. Bug fix:**
Fix broken CSS transition `all 1000 ease-in-out` → `all 1000ms ease-in-out` in mobile nav.

**E. Dead code removal:**
Remove unused CSS utilities (`.mt-sm`, `.mt-lg`, `.mt-xl`, `.mobile-text-center`). Replace `TechIcons.tsx` inline `style={{ flexShrink: 0 }}` with a utility class.

**F. README rewrite:**
Full rewrite to reflect current architecture — directory structure, layer separation, data flow, CSS system, client vs server strategy.

**G. Code comments:**
Brief JSDoc comments on non-obvious `lib/` functions (`resolveVariant`, `getPdfForSlug`, `getAllCaseStudies`).

---

## Future work (not part of this refactor)

These are separate features that should be their own prompts after the refactor is complete:

- **Portfolio / Work page** — new route, pulls from `content-items.ts` via `getAllCaseStudies`, brief intro explaining agency work context
- **References on contact page** — small addition to ContactPageContent
- **Resume PDF generation** — build script using role data, potentially `@react-pdf/renderer`
- **OG image & meta tags** — per-page metadata, share card generation
- **Accessibility audit** — Lighthouse / axe, fix findings
- **Testimonials** — replace placeholder data with real quotes once collected
- **SEO basics** — robots.txt, sitemap, canonical URLs

---

## Quick reference: file sizes after Passes 1–3

| File | Lines | Layer |
|------|-------|-------|
| `app/globals.css` | 1270 | CSS design system |
| `data/roles.ts` | 236 | Data (was 588 — split into 3 files + lib) |
| `data/experiences.ts` | 184 | Data |
| `data/themes.ts` | 393 | Data (to be cleaned up in Pass 4) |
| `data/content-items.ts` | 78 | Data |
| `data/testimonials.ts` | 57 | Data |
| `types/index.ts` | 74 | Types |
| `lib/experiences.ts` | 34 | Logic |
| `lib/roles.ts` | 27 | Logic |
| `lib/content.ts` | 14 | Logic |
| `lib/testimonials.ts` | 10 | Logic |
