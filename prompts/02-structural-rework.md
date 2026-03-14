# Structural Rework — Proper Component Architecture

The initial build came out as one big Next.js file with minimal abstraction. Rebuild the entire codebase with proper React + TypeScript + Next.js component architecture. Same visual output, proper separation of concerns.

---

## Issues to Fix

1. Getting this error from the globals import: `Cannot find module or type declarations for side-effect import of './globals.css'.` — add a `types/css.d.ts` declaration file.

2. The site is one big file with no abstraction or React components. Re-architect into reusable components with separation of data and visualisation.

3. The site-wordmark should not be clickable when you're already on the home page. Make it a non-clickable `<span>` on `/`, a `<Link>` elsewhere. The wordmark text is `danielnapoleoni.dev`.

4. Consider SSR vs client rendering for the whole site. Default to server components. Only use `'use client'` where state, effects, or browser APIs are genuinely needed.

5. The theme switch doesn't detect the user's OS dark mode preference. Default to `prefers-color-scheme`, allow manual toggle, persist choice to localStorage.

6. The current colour scheme looks too much like Claude's colours. Add a theme colour switcher button next to the dark mode toggle. Research commonly-used, good-looking themes.

7. When creating themes, maintain WCAG AAA contrast: 7:1 for normal text, 4.5:1 for large text. The current smaller faded-out elements are failing AA and AAA.

8. Change "What brings you here?" to something more targeted towards the available roles.

9. Role cards are rendering at different heights. Use CSS Grid to ensure cards are always the same height as the tallest card in the row.

10. Move experience ABOVE skills on all pages.

11. Put a "Download PDF" button in the header on all pages.

12. GitHub link should point to: https://github.com/dnapoleoni/cv-portfolio-2026

13. Add small tech icons to each role card for the main technologies.

14. Add links to other roles at the bottom or side of each role-specific page (cross-navigation).

15. Add a testimonial carousel on the main page and role-specific quotes on each role page.

16. Streamline contact/email/LinkedIn links — they're currently duplicated all over the site. Decide where the user would expect each link and consolidate.

---

## Target Component Architecture

### Client Components (only these three need client-side interactivity)
- `ThemeProvider.tsx` — theme/mode context, localStorage persistence, system preference detection
- `Header.tsx` — route-aware wordmark (span on `/`, link elsewhere), nav links, theme controls
- `TestimonialCarousel.tsx` — auto-rotating testimonial display

### Server Components
- `Hero.tsx` — three-font tagline hero section
- `RoleCard.tsx` — individual card with tech icons, equal-height via grid
- `RoleGrid.tsx` — grid of role cards with heading
- `SkillTags.tsx` — skill tag list
- `Timeline.tsx` — experience timeline with contract/redundancy/permanent labels
- `RoleCrossNav.tsx` — links to other roles from role detail pages
- `ContactSection.tsx` — reusable CTA block
- `TechIcons.tsx` — inline SVG tech icons
- `Footer.tsx` — minimal copyright + links
- `index.ts` — barrel exports

### Data Files
- `data/roles.ts` — 4 roles with skills, timelines, case studies, tech icon references
- `data/testimonials.ts` — placeholder testimonials with `relevantRoles` field for filtering
- `data/themes.ts` — 6 themes x light/dark, all AAA compliant

### Pages
- `app/layout.tsx` — ThemeProvider wrapper, Google Fonts via `<link>` tags (not next/font)
- `app/page.tsx` — Hero + RoleGrid + Testimonials + Contact
- `app/cv/page.tsx` — experience above skills, PDF download
- `app/role/[slug]/page.tsx` — dynamic role pages with cross-nav
- `app/not-found.tsx` — personality-driven 404

### Type Declarations
- `types/css.d.ts` — CSS module type declarations to fix the import error

---

## Key Architecture Decisions

- Server components by default — only ThemeProvider, Header, and TestimonialCarousel need `'use client'`
- CSS class names must be location-independent (use generic names like `nav-link`, `btn-outline`, not `header-link`, `cv-download`)
- Equal-height cards via CSS Grid: grid items `display: flex`, cards stretch
- Theme persisted to localStorage, defaults to `prefers-color-scheme`
- Timeline entries include `type` field (`contract` / `redundancy` / `permanent`)
- Header: sticky, compact padding, solid background (no blur/transparency)
- Header contains: wordmark, "View CV", "Download PDF", "Get in touch"
- Footer: copyright + theme/mode controls only

---

## Files to Create/Modify

Rebuild the entire `components/` directory with the architecture above. Rebuild all page files. Rebuild all data files. The visual output should match the initial build but with proper component separation.
