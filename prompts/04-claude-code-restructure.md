# Restructure — Top-Level Routes, Role Taglines, Contact Page

Make a set of architectural changes to the Next.js portfolio site. Read CLAUDE.md for full context. Work through these changes one at a time, verifying the build compiles after each major step.

---

## 1. Move role pages from `/role/[slug]` to top-level routes

Delete the `app/role/` directory entirely. Create a shared component at `components/RolePageView.tsx` that contains the full role page layout (extract from the old `app/role/[slug]/page.tsx`). Then create four thin page files:

- `app/frontend-developer/page.tsx`
- `app/digital-marketing/page.tsx`
- `app/ux-engineer/page.tsx`
- `app/chief-vibes-officer/page.tsx`

Each imports RolePageView and passes a hardcoded slug:

```tsx
import { RolePageView } from '@/components/RolePageView'
export default function FrontendDeveloper() {
  return <RolePageView slug="frontend-developer" />
}
```

Also update the slug for `digital-marketing-specialist` to `digital-marketing` in `data/roles.ts` (shorter, cleaner URL).

---

## 2. Update all internal links to role pages

Search the entire codebase for `/role/` and update:
- `components/RoleCard.tsx`: `href={/role/${role.slug}}` becomes `href={/${role.slug}}`
- `components/RoleCrossNav.tsx`: same change
- Any other file referencing the old `/role/` path

---

## 3. Add tagline data to `roles.ts`

Add a `tagline` field to the `RoleData` interface:

```typescript
tagline: {
  mono: string    // displayed in JetBrains Mono
  serif: string   // displayed in Cormorant Garamond italic
  hand: string    // displayed in Caveat, accent colour
}
```

Populate for each role:
- frontend-developer: `"A developer"` / `"who thinks like a designer"` / `"and communicates like a human."`
- digital-marketing: `"A developer"` / `"who speaks marketing"` / `"and builds campaigns that actually work."`
- ux-engineer: `"A developer"` / `"who asks why before asking how"` / `"and fights for the user."`
- chief-vibes-officer: `"A developer"` / `"who builds culture"` / `"as carefully as code."`

---

## 4. Create RoleHero component

New file `components/RoleHero.tsx`. Takes a tagline prop (the three parts) and renders them using the same three-font CSS treatment as the current Hero component (`.tagline-developer`, `.tagline-designer`, `.tagline-human` classes). This replaces the plain h1/subtitle header on role pages.

Update `RolePageView` to use `RoleHero` at the top of each role page instead of the current role-page-header.

---

## 5. Rework the home page hero

Edit `components/Hero.tsx`. Replace the current frontend-specific tagline with a general-purpose version. The three-font structure stays the same but the copy should work for ANY visitor regardless of which role they're interested in. Use a placeholder like:

`"15 years of web."` / `"One person, many hats."` / `"Pick the one you need."`

(Dan will refine the copy later — just get the structure right.)

Also make the hero compact. In `globals.css`, add a modifier:

```css
.hero--compact {
  min-height: auto;
  padding-block: var(--space-xl) var(--space-lg);
}
```

Apply `className="hero hero--compact"` to the home page hero. The role page heroes keep the full-size treatment.

---

## 6. Make role cards more prominent on home page

In `components/RoleGrid.tsx`, change the heading from "Which Dan are you looking for?" to "Currently available for..."

In `globals.css`, make the grid 2-column on desktop for more visual weight:

```css
.role-grid--prominent {
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
}

@media (max-width: 640px) {
  .role-grid--prominent { grid-template-columns: 1fr; }
}
```

Apply this modifier class in RoleGrid.

---

## 7. Create the `/contact` page

New file `app/contact/page.tsx`. This page:
- Reads `searchParams.from` to determine context
- Shows a contextual heading (e.g., if `from=/frontend-developer`, show "Interested in me as a frontend developer?"; if `from=/` or missing, show "Let's talk")
- Contains a Netlify Form with honeypot
- Below the form: mailto link (assembled via JS, not raw in HTML) with contextual subject line, LinkedIn link
- Style using existing utility classes

---

## 8. Simplify ContactSection on role pages

Edit `components/ContactSection.tsx`. Since "Get in touch" is now in the header and there's a dedicated `/contact` page, the CTA sections on role pages should be lighter. Change to just a heading, one line of copy, and a link to `/contact` with the appropriate `?from=` param.

---

## 9. Verify and build

Run `npm run build` and fix any errors. Check that all routes resolve:
- `/` (home)
- `/frontend-developer`
- `/digital-marketing`
- `/ux-engineer`
- `/chief-vibes-officer`
- `/cv`
- `/contact`

---

## Summary of files to create/modify
- `app/frontend-developer/page.tsx` — new thin wrapper
- `app/digital-marketing/page.tsx` — new thin wrapper
- `app/ux-engineer/page.tsx` — new thin wrapper
- `app/chief-vibes-officer/page.tsx` — new thin wrapper
- `app/contact/page.tsx` — new contact page
- `components/RolePageView.tsx` — new shared layout extracted from old dynamic route
- `components/RoleHero.tsx` — new tagline component
- `components/Hero.tsx` — updated with general copy, compact modifier
- `components/RoleGrid.tsx` — updated heading, prominent grid
- `components/RoleCard.tsx` — updated link paths
- `components/RoleCrossNav.tsx` — updated link paths
- `components/ContactSection.tsx` — simplified for role pages
- `data/roles.ts` — added tagline field, shortened digital-marketing slug
- `app/globals.css` — hero compact modifier, prominent grid styles
- Delete `app/role/` directory
