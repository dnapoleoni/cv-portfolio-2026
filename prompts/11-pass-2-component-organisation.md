# Pass 2 — Component Organisation & DRY-up

> Part 2 of 4 in the codebase refactor. See `prompts/09-codebase-refactor-plan.md` for the full plan.
>
> **Branch:** `claude/refactor-components` (from `claude/refactor` parent branch)
> **Risk:** MEDIUM — file moves and import path changes, but no logic changes
> **Scope:** Component files, hooks, barrel exports, and minimal CSS tweaks to support component changes. No data files, no page route files beyond import path updates.

## Git Setup

Before making any code changes:
1. Confirm you are on the `claude/refactor` branch
2. Create a sub-branch: `git checkout -b claude/refactor-components`
3. Make all changes on this branch
4. **Do not commit.** Dan will review on localhost, then commit and merge into `claude/refactor` manually.

## Context

After Pass 1 (CSS foundation), the stylesheet is clean and well-organised. But the components are all in a flat directory, there are inline SVGs duplicated across multiple files, there are hooks waiting to be extracted from components, and there are inline styles that should use the utility classes added in Pass 1.

**The cardinal rule remains: nothing should look or behave differently after this pass.** We are reorganising, extracting, and deduplicating — not adding features or changing behaviour.

## Instructions

### Step 1: Read everything first

Before making any changes:
1. Read `CLAUDE.md` in full — follow all rules, particularly around CSS naming, server components by default, and no inline styles
2. Read `prompts/09-codebase-refactor-plan.md` — specifically the Pass 2 section
3. Read every file in `components/`, `hooks/`, and `app/` to understand current state
4. Read `app/globals.css` to understand what utility classes are available from Pass 1

### Step 2: Create directory structure

Create the following directories inside `components/`:

```
components/
  layout/
  ui/
  sections/
  theme/
```

### Step 3: Extract Icon component

Create `components/ui/Icon.tsx` — a lookup-based SVG icon component.

Currently these inline SVGs exist across the codebase:

| Icon | Used in | SVG shape |
|------|---------|-----------|
| menu (hamburger) | Header.tsx | Three horizontal lines: `M4 6h16M4 12h16M4 18h16` |
| close (X) | Header.tsx | Cross: `M18 6L6 18M6 6l12 12` |
| download | DownloadButton.tsx | Down arrow with line: `M8 2v8m0 0l-3-3m3 3l3-3M3 12h10` (16x16 viewBox) |
| sun | DarkModeToggle.tsx | Sun with rays (complex path, fill-based, 24x24) |
| moon | DarkModeToggle.tsx | Crescent moon (complex path, fill-based, 24x24) |
| chevron-left | TestimonialCarousel.tsx | `M15 18l-6-6 6-6` |
| chevron-right | TestimonialCarousel.tsx | `M9 18l6-6-6-6` |

Build the component like this:

```tsx
interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

type IconName = 'menu' | 'close' | 'download' | 'sun' | 'moon' | 'chevron-left' | 'chevron-right';
```

Each icon entry needs: `path`, `viewBox` (default `"0 0 24 24"`), and `fill` type (`"currentColor"` for filled icons like sun/moon, `"none"` for stroke-based icons).

**Key details to preserve:**
- The download icon uses a `16 16` viewBox, not `24 24`. Its strokes use `strokeWidth="1.5"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- Sun and moon icons use `fill="currentColor"` with no stroke.
- Menu, close, chevron-left, chevron-right use `stroke="currentColor"` with `strokeWidth="2"` and `strokeLinecap="round"`.
- All icons have `aria-hidden="true"`.

Export both the `Icon` component and the `IconName` type.

This is a server component — no `'use client'` needed. It renders pure SVG markup.

**Do NOT touch TechIcons.tsx** — that's a separate system using brand icons from `simple-icons`.

### Step 4: Extract reusable hooks

**A. `hooks/useClickOutside.ts`**

Extract from ThemePicker.tsx (lines with `handleClick` and `mousedown` listener):

```tsx
'use client';

import { useEffect, type RefObject } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement | null>, callback: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback, active]);
}
```

**B. `hooks/useEscapeKey.ts`**

Extract from ThemePicker.tsx (lines with `handleKey` and `Escape`):

```tsx
'use client';

import { useEffect } from 'react';

export function useEscapeKey(callback: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') callback();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [callback, active]);
}
```

**C. `hooks/useMobileMenu.ts`**

Extract from Header.tsx — the mobile menu state, body scroll lock, and route-change cleanup:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useMobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  return {
    isOpen,
    toggle: () => setIsOpen((prev) => !prev),
    close: () => setIsOpen(false),
  };
}
```

### Step 5: Move components into directories

Move files as follows. **Do not rename any files or change any component names** — just move them.

**`components/layout/`**
- `Header.tsx` → `components/layout/Header.tsx`
- `Footer.tsx` → `components/layout/Footer.tsx`

**`components/ui/`**
- `Icon.tsx` (new, from Step 3)
- `DownloadButton.tsx` → `components/ui/DownloadButton.tsx`
- `ContextLink.tsx` → `components/ui/ContextLink.tsx`
- `EmailLink.tsx` → `components/ui/EmailLink.tsx`
- `SkillTags.tsx` → `components/ui/SkillTags.tsx`
- `Loading.tsx` → `components/ui/Loading.tsx`

**`components/sections/`**
- `Hero.tsx` → `components/sections/Hero.tsx`
- `RoleHero.tsx` → `components/sections/RoleHero.tsx`
- `Timeline.tsx` → `components/sections/Timeline.tsx`
- `TestimonialCarousel.tsx` → `components/sections/TestimonialCarousel.tsx`
- `ContactSection.tsx` → `components/sections/ContactSection.tsx`
- `RoleCrossNav.tsx` → `components/sections/RoleCrossNav.tsx`
- `RoleGrid.tsx` → `components/sections/RoleGrid.tsx`
- `RoleCard.tsx` → `components/sections/RoleCard.tsx`

**`components/theme/`**
- `ThemeProvider.tsx` → `components/theme/ThemeProvider.tsx`
- `ThemePicker.tsx` → `components/theme/ThemePicker.tsx`
- `DarkModeToggle.tsx` → `components/theme/DarkModeToggle.tsx`

**Stay at `components/` root (page-specific, not reusable):**
- `ContactForm.tsx`
- `ContactPageContent.tsx`
- `RolePageView.tsx`
- `TechIcons.tsx` (its own icon system, doesn't fit ui/)

### Step 6: Update components to use extracted code

**A. Replace inline SVGs with `<Icon />` in:**

- `components/layout/Header.tsx` — replace hamburger and close SVGs with `<Icon name="menu" size={24} />` and `<Icon name="close" size={24} />`
- `components/ui/DownloadButton.tsx` — replace download arrow SVG with `<Icon name="download" size={16} />`
- `components/theme/DarkModeToggle.tsx` — replace sun/moon SVGs with `<Icon name="sun" size={14} />` and `<Icon name="moon" size={14} />`
- `components/sections/TestimonialCarousel.tsx` — replace chevron SVGs with `<Icon name="chevron-left" size={24} />` and `<Icon name="chevron-right" size={24} />`

**B. Use extracted hooks in:**

- `components/theme/ThemePicker.tsx` — replace the manual click-outside and escape-key effects with `useClickOutside(pickerRef, () => setOpen(false), open)` and `useEscapeKey(() => setOpen(false), open)`. Remove the manual `useEffect` blocks they replace.
- `components/layout/Header.tsx` — replace the mobile menu state, scroll lock, and route-change effects with `const { isOpen, toggle } = useMobileMenu()`. Replace `mobileOpen` with `isOpen` and `setMobileOpen(!mobileOpen)` with `toggle()`. Remove the manual `useEffect` blocks and `useState` they replace. Header still needs `usePathname` for the isHome check and active contact button state.

**C. Replace inline styles with utility classes:**

- `components/RolePageView.tsx` line 41: `<div style={{ marginTop: 'var(--space-md)' }}>` → `<div className="mt-md">`
- `components/sections/ContactSection.tsx` line 27: `<div style={{ marginTop: 'var(--space-md)' }}>` → `<div className="mt-md">`

**Do NOT replace these inline styles (they're dynamic or serve a specific purpose):**
- ThemeProvider.tsx: `style={{ visibility: 'hidden' }}` — prevents FOUC, must stay
- ThemePicker.tsx: `style={{ backgroundColor: ... }}` — dynamic theme colours, must stay inline
- TechIcons.tsx: `style={{ flexShrink: 0 }}` — could be a utility but it's trivial, leave it

### Step 7: Apply `.card` base class

In Pass 1, a `.card` base class was added to CSS. Now update the components to use it:

**`components/sections/RoleCard.tsx`:**
Change the className from:
```tsx
className={`role-card${role.variant === 'vibes' ? ' role-card--vibes' : ''}`}
```
to:
```tsx
className={`card role-card${role.variant === 'vibes' ? ' card--vibes' : ''}`}
```

**`components/sections/RoleCrossNav.tsx`:**
Change the className from:
```tsx
className={`cross-nav-card${role.variant === 'vibes' ? ' cross-nav-card--vibes' : ''}`}
```
to:
```tsx
className={`card cross-nav-card${role.variant === 'vibes' ? ' card--vibes' : ''}`}
```

**Then update `app/globals.css`** to remove the properties from `.role-card` and `.cross-nav-card` that are now covered by `.card`:

From `.role-card`, remove: `display: flex`, `flex-direction: column`, `padding: var(--space-md)`, `border: 1px solid var(--color-border)`, `text-decoration: none`, `color: var(--color-text)`, `background: transparent`. Keep: `width: 100%`, `gap: 24px`, `border-radius: 8px` (overrides .card's 6px).

The `.role-card` transition uses `--duration-slow` which matches `.card`, so remove it too. Keep the hover rule — it also uses `--duration-slow` which matches but it redeclares transition, so remove the hover transition redeclaration. The hover colours match `.card` so the entire `.role-card:hover` block can be removed (`.card:hover` covers it). Keep `.role-card:focus-visible`.

From `.cross-nav-card`, remove: `display: flex`, `flex-direction: column`, `gap: var(--space-xs)` (matches .card), `padding: var(--space-md)`, `border: 1px solid var(--color-border)`, `border-radius: 6px` (matches .card), `text-decoration: none`, `color: var(--color-text)`. Keep: `font-size: var(--text-sm)`, `font-weight: 500`. The transition properties differ (cross-nav uses `--duration-fast` vs card's `--duration-slow`) — keep the cross-nav transition to override.

The `.cross-nav-card:hover` colours match `.card:hover` so remove that block. The transition in hover can also go.

Remove `.role-card--vibes`, `.role-card--vibes:hover`, `.cross-nav-card--vibes`, `.cross-nav-card--vibes:hover` — these are now handled by `.card--vibes`. **Exception:** `.role-card--vibes:hover` has `border-color: var(--color-accent)` which `.card--vibes:hover` doesn't. Add `border-color: var(--color-accent)` to `.card--vibes:hover` in the CSS, then remove the role-card specific one.

**Verify** the vibes hover carefully — the role-card vibes hover changes border-color to accent, while the cross-nav vibes hover just changes to solid. After adding `border-color: var(--color-accent)` to `.card--vibes:hover`, both will get accent borders on hover, which is actually more consistent. But confirm this looks right visually.

### Step 8: Update barrel exports

Replace `components/index.ts` with updated exports reflecting new paths:

```tsx
// Layout
export { Header } from './layout/Header';
export { Footer } from './layout/Footer';

// UI
export { Icon } from './ui/Icon';
export type { IconName } from './ui/Icon';
export { DownloadButton } from './ui/DownloadButton';
export { ContextLink } from './ui/ContextLink';
export { EmailLink } from './ui/EmailLink';
export { SkillTags } from './ui/SkillTags';
export { Loading } from './ui/Loading';

// Sections
export { Hero } from './sections/Hero';
export { RoleHero } from './sections/RoleHero';
export { Timeline } from './sections/Timeline';
export { TestimonialCarousel } from './sections/TestimonialCarousel';
export { ContactSection } from './sections/ContactSection';
export { RoleCrossNav } from './sections/RoleCrossNav';
export { RoleGrid } from './sections/RoleGrid';
export { RoleCard } from './sections/RoleCard';

// Theme
export { ThemeProvider, useTheme } from './theme/ThemeProvider';
export { ThemePicker } from './theme/ThemePicker';
export { DarkModeToggle } from './theme/DarkModeToggle';

// Page-specific
export { ContactForm } from './ContactForm';
export { ContactPageContent } from './ContactPageContent';
export { RolePageView } from './RolePageView';
export { TechIcon, TechIconRow } from './TechIcons';
```

### Step 9: Update all import paths

Update every file that imports from `components/` to use the correct new paths. This includes:

**Page files in `app/`:**
- `app/page.tsx`
- `app/layout.tsx`
- `app/loading.tsx`
- `app/not-found.tsx` (if it imports components)
- `app/contact/page.tsx`
- Each role page: `app/frontend-developer/page.tsx`, `app/digital-marketing/page.tsx`, `app/ux-engineer/page.tsx`, `app/chief-vibes-officer/page.tsx`, `app/the-full-picture/page.tsx`

**Component files that import other components:**
Check every component for imports like `import { X } from './X'` or `import { X } from '../X'` and update the relative paths. Alternatively, components can import from `@/components` (the barrel) or from the specific subpath like `@/components/ui/Icon`.

**Preferred approach:** Use `@/components/...` absolute imports everywhere (not relative `./` imports). This makes future moves painless. For example:
```tsx
import { Icon } from '@/components/ui/Icon';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { useClickOutside } from '@/hooks/useClickOutside';
```

But be consistent — if some components already use barrel imports via `@/components`, that's fine too. Just don't mix relative and absolute in the same file.

### Step 10: Verify

After all changes:
1. Run `npx tsc --noEmit` if possible to check for TypeScript errors
2. Verify every component file's imports resolve
3. Verify no component logic or rendered HTML has changed
4. Verify the Icon component renders identically to the inline SVGs it replaced (same size, same stroke/fill, same aria-hidden)
5. Verify the `.card` base class doesn't change the visual appearance of role cards or cross-nav cards

## Output

Provide a summary of:
- Files created (new)
- Files moved (with old → new path)
- Files modified (what changed)
- Files deleted (if any, e.g. if old locations are cleaned up)
- CSS changes (properties removed from which selectors)
- Any concerns or things to double-check visually

## Verification checklist for Dan

After this pass, check on localhost:

- [ ] Home page: hero, role cards (including vibes dashed border), testimonials, contact
- [ ] Any role page: all sections render, download button has icon, back link works
- [ ] Chief Vibes Officer: dashed border on card, solid on hover with accent colour
- [ ] Cross-nav: cards render correctly, vibes variant works
- [ ] Contact page: form works, back link works with ?from= context
- [ ] Mobile: hamburger icon appears, opens menu, close icon appears, menu closes on nav, body scroll locked when open
- [ ] Theme picker: opens on click, closes on click outside, closes on Escape, swatches work
- [ ] Dark mode toggle: sun/moon icons render and switch correctly
- [ ] Testimonial carousel: arrows render and work, auto-rotation works
- [ ] Download buttons: icon renders, downloads correct PDF
- [ ] No console errors, no TypeScript errors
- [ ] Inspect repo structure: components are in correct subdirectories
