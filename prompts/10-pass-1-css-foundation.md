# Pass 1 — CSS Foundation & Utilities

> Part 1 of 4 in the codebase refactor. See `prompts/09-codebase-refactor-plan.md` for the full plan.
>
> **Branch:** `claude/refactor-css-foundation` (from `claude/refactor` parent branch)
> **Risk:** HIGH — visual regressions possible. Test every page after.
> **Scope:** `app/globals.css` ONLY. Do not modify any component files, page files, or data files.

## Context

The CSS in `globals.css` has accumulated debt across multiple development passes. There is significant duplication between similar elements (cards, buttons, links), scattered media queries, no utility classes, a debug artifact, and commented-out code. This pass restructures and deduplicates the CSS without changing any visual output.

**The cardinal rule: nothing should look different after this pass.** Every page, every state, every hover, every responsive breakpoint must render identically. We are reorganising and deduplicating, not redesigning.

## Git Setup

Before making any code changes:
1. Confirm you are on the `claude/refactor` branch (Dan will have created this from `main`)
2. Create a sub-branch: `git checkout -b claude/refactor-css-foundation`
3. Make all changes on this branch
4. **Do not commit.** Dan will review on localhost, then commit and merge into `claude/refactor` manually.

## Instructions

### Step 1: Read the current file and the plan

Before making any changes:
1. Read `app/globals.css` in full
2. Read `prompts/09-codebase-refactor-plan.md` — specifically the Pass 1 section
3. Read every component in `components/` to understand which CSS classes are actually used and how

Build a mental map of which classes are used where. **Do not remove any class that is referenced by a component**, even if it looks redundant.

### Step 2: Restructure the file into layers

Reorder the existing CSS into these sections, each with a clear comment header:

```
/* === CUSTOM PROPERTIES === */
/* === RESET & BASE === */
/* === UTILITIES === */
/* === PRIMITIVES — Buttons === */
/* === PRIMITIVES — Links === */
/* === PRIMITIVES — Cards === */
/* === PRIMITIVES — Form Elements === */
/* === PRIMITIVES — Tags === */
/* === PRIMITIVES — Controls === */
/* === LAYOUT === */
/* === SECTIONS — Hero === */
/* === SECTIONS — Role Navigation === */
/* === SECTIONS — Role Page === */
/* === SECTIONS — Timeline === */
/* === SECTIONS — Testimonials === */
/* === SECTIONS — Contact === */
/* === SECTIONS — Cross Navigation === */
/* === SECTIONS — Theme Picker === */
/* === ANIMATIONS === */
/* === PRINT === */
/* === RESPONSIVE === */
```

### Step 3: Extract a base `.card` class

`.role-card` and `.cross-nav-card` share these properties:
- `display: flex; flex-direction: column`
- `padding: var(--space-md)`
- `border: 1px solid var(--color-border)`
- `border-radius` (8px vs 6px — use 6px as base)
- `text-decoration: none`
- `color: var(--color-text)`
- `background: transparent`
- `transition: background-color, border-color`
- Hover: `background-color: var(--color-bg-elevated); border-color: var(--color-text-tertiary)`
- `--vibes` variant: dashed border, solid on hover

Create a `.card` base class with these shared properties. Then `.role-card` and `.cross-nav-card` become modifiers that only add their unique properties:

- `.role-card` adds: `width: 100%`, `gap: 24px`, `border-radius: 8px` (override), focus-visible
- `.cross-nav-card` adds: `gap: var(--space-xs)`, `font-size: var(--text-sm)`, `font-weight: 500`

The `.card--vibes` modifier replaces both `.role-card--vibes` and `.cross-nav-card--vibes`.

**IMPORTANT:** Keep the old class names (`.role-card`, `.cross-nav-card`, `.role-card--vibes`, `.cross-nav-card--vibes`) — components still reference them. The old names should now just contain the delta from `.card`. Components will be updated to add `.card` in Pass 2.

Actually — scratch that. Since we can't touch components in this pass, we need the old class names to still contain ALL their current properties. Instead:

**Approach:** Create `.card` as a new class containing the shared base. Keep `.role-card` and `.cross-nav-card` as-is for now — they'll be refactored in Pass 2 when we can also update the component JSX. In this pass, just ensure `.card` exists and is documented as the intended base. Add a comment: `/* .role-card and .cross-nav-card to be refactored to extend .card in Pass 2 */`

### Step 4: Extract a `.btn` base class

All button variants share these properties:
- `display: inline-flex`
- `align-items: center`
- `gap` (varies per variant)
- `border-radius` (5-6px range)
- `text-decoration: none`
- `font-weight: 500`
- `transition: background, color, border-color`

Create a `.btn` base class. Keep `.btn-outline`, `.btn-accent`, `.btn-solid-accent` as they are — they still need to work standalone since components reference them directly. But deduplicate: remove any properties from the variants that are now in `.btn` base, then have each variant also include `.btn` in a comment noting they should compose with it.

**WAIT — same problem.** Components use `className="btn-outline"` not `className="btn btn-outline"`. We can't add `.btn` to component markup in this pass.

**Revised approach:** Don't create `.btn` as a separate class yet. Instead, deduplicate the EXISTING button classes using CSS nesting or a shared selector:

```css
.btn-outline,
.btn-accent,
.btn-solid-accent {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 500;
  border-radius: 5px;
  transition:
    background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}
```

Then each individual class only declares its unique properties (padding, gap, font-family, font-size, colours, border).

### Step 5: Deduplicate `.role-card-cta`

`.role-card-cta` is a near-clone of `.btn-accent`. Compare them property by property. The key difference is `.role-card-cta` changes on PARENT hover (`.role-card:hover .role-card-cta`) rather than self-hover.

Refactor `.role-card-cta` to only contain its unique properties — the self properties should come from the shared button selector in Step 4. Keep the class name, just slim it down.

### Step 6: Add utility classes

Add a `/* === UTILITIES === */` section with these classes:

```css
/* Spacing utilities — only for cases where a component needs a one-off spacing tweak */
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }

/* Responsive alignment — for containers that need different alignment on mobile */
@media screen and (max-width: 640px) {
  .mobile-center { justify-content: center; }
  .mobile-text-center { text-align: center; }
}
```

Move the existing `.mobile-center` from its current random location into this section.

Note: These utility classes will be used by components in Pass 2. For now, just add them to the CSS.

### Step 7: Consolidate responsive media queries

Currently there are `@media (max-width: 640px)` blocks at:
- Line 127 (`.mobile-center`)
- Lines 476-509 (mobile nav)
- Lines 619-629 (hero compact)
- Lines 877-885 (carousel buttons)
- Lines 1206-1250 (general responsive)
- Plus the utility `.mobile-center` we're adding

Move ALL mobile-specific styles into a single `/* === RESPONSIVE === */` section at the bottom of the file. Group by component within that section for readability:

```css
/* === RESPONSIVE === */
@media screen and (max-width: 640px) {
  /* Utilities */
  .mobile-center { ... }
  .mobile-text-center { ... }

  /* Header & Nav */
  .nav-row { ... }
  .nav-row-mobile { ... }
  ...

  /* Hero */
  .hero { ... }
  .hero--compact { ... }
  ...

  /* Role Grid */
  .role-grid { ... }
  ...

  /* Testimonials */
  .carousel-btn--prev { ... }
  ...

  /* Footer */
  .footer-content { ... }

  /* Theme Picker */
  .theme-picker-grid { ... }
  ...
}
```

### Step 8: Clean up

1. **Remove** the `background-color: #c0ffee` on `.carousel-btn:before` (line ~857) — this is a debug artifact
2. **Remove** commented-out CSS (lines 1207-1212 — old header responsive rules)
3. **Remove** any truly orphaned classes (verify against all component files first — grep the components directory)
4. **Verify** no `!important` declarations exist outside the `prefers-reduced-motion` block (the mobile nav has one — try to remove it)

### Step 9: Verify

After all changes, do a final check:
1. Every class referenced in any `.tsx` file still exists in the CSS
2. No properties were accidentally removed during deduplication
3. The shared button selector doesn't change the visual appearance of any button state
4. The responsive section contains all the rules that were previously scattered

## Output

Make all changes in a single pass to `app/globals.css`. Do not create any other files. Do not modify any other files.

After making changes, provide a summary of:
- Classes added (new)
- Classes modified (deduplicated)
- Classes removed (orphaned)
- Code removed (debug artifacts, comments)
- Any concerns or things to double-check visually

## Verification checklist for Dan

After this pass, check every page on localhost:

- [ ] Home page: hero layout, role cards, testimonials carousel, contact section
- [ ] Frontend Developer: tagline hero, header, download button, experience, skills, content section, testimonials, contact CTA, cross-nav
- [ ] Digital Marketing: same checks
- [ ] UX Engineer: same checks
- [ ] Chief Vibes Officer: same checks, PLUS dashed border on card
- [ ] The Full Picture: no tagline, all experiences, skills, "Also" section, cross-nav
- [ ] Contact page: with and without ?from= param
- [ ] Mobile: hamburger menu, hero stacking, role grid single column, cross-nav single column
- [ ] Theme switching: pick 2-3 themes in both light and dark
- [ ] Hover states: buttons, cards, cross-nav cards, carousel arrows, timeline dots
- [ ] All download buttons still work
