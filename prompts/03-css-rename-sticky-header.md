# CSS Refactor — Location-Independent Class Names, Sticky Header, Link & Button Reorg

The CSS class names are coupled to their original component locations (`header-link`, `footer-links`, `header-controls`). Moving the theme controls to the footer broke styling because the classes assumed where they'd live. Audit the full CSS and refactor all location-coupled names to generic reusable primitives.

---

## Class Name Renames

Replace all location-coupled class names with generic equivalents throughout `globals.css` and all components that reference them.

| Old (location-coupled) | New (generic) | Purpose |
|---|---|---|
| `.header-nav` | `.nav-row` | Horizontal flex container for nav items |
| `.header-link` | `.nav-link` | Subtle text link for navigation |
| `.header-link--active` | `.nav-link--active` | Active state for nav links |
| `.header-download` | `.btn-accent` | Accent-coloured bordered button-style link |
| `.header-controls` | `.control-group` | Container for small icon buttons / selects |
| `.header-control-btn` | `.control-btn` | Small square icon button |
| `.header-theme-select` | `.control-select` | Small inline dropdown |
| `.footer-links` / `.footer-links a` | `.link-group` + `.link-muted` | Horizontal set of links, secondary colour |
| `.cv-download` | `.btn-outline` | Bordered button-style link |
| `.contact-links` | `.link-group` | Horizontal set of links with consistent spacing |
| `.contact-link` | `.link-mono` | Monospace-styled link |

---

## New Reusable Primitives

Ensure these generic classes exist in `globals.css` and are styled consistently regardless of where they appear:

- `.nav-row` — horizontal flex container for nav items, wraps on mobile
- `.nav-link` / `.nav-link--active` — subtle text link for navigation with active state
- `.link-muted` — secondary-coloured text link, no underline, hover reveals underline
- `.link-mono` — monospace font (JetBrains Mono) styled link
- `.link-group` — horizontal set of links with consistent gap spacing
- `.btn-outline` — bordered button-style link, transparent background, border on hover
- `.btn-accent` — accent-coloured bordered button-style link
- `.control-group` — container for small icon buttons and selects, flex row
- `.control-btn` — small square icon button for theme/mode toggles
- `.control-select` — small inline dropdown for theme picker
- `.sr-only` — screen-reader-only utility class

---

## Other Changes

### Sticky Header
- Header is `position: sticky; top: 0` with solid background (no `backdrop-filter` blur)
- Compact padding on header — the hero section's padding creates breathing room instead

### Print Media Query
- Update to reference the new generic class names instead of old location-coupled ones

### Responsive Breakpoints
- Update mobile breakpoint rules to reference `.nav-row` instead of `.header-nav`

---

## Component Updates

Apply the class name renames in these files:

### `Header.tsx`
- `.header-nav` → `.nav-row`
- `.header-link` → `.nav-link`
- `.header-link--active` → `.nav-link--active`
- `.header-download` → `.btn-accent`
- `.header-controls` → `.control-group`
- `.header-control-btn` → `.control-btn`
- `.header-theme-select` → `.control-select`

### `Footer.tsx`
- `.footer-links` → `.link-group`
- `.footer-links a` styling → `.link-muted`

### `ContactSection.tsx`
- `.contact-links` → `.link-group`
- `.contact-link` → `.link-mono`

### `app/cv/page.tsx`
- `.cv-download` → `.btn-outline`

### `app/not-found.tsx`
- `.cv-download` → `.btn-outline`

---

## Summary of files to change
- `app/globals.css` — full rename pass, new primitives, sticky header, print/responsive updates
- `components/Header.tsx` — 7 class name changes
- `components/Footer.tsx` — link class updates
- `components/ContactSection.tsx` — link class updates
- `app/cv/page.tsx` — button class update
- `app/not-found.tsx` — button class update
