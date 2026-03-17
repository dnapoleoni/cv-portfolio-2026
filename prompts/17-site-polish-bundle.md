# Site Polish — Navigation, Case Studies Page, Contact Rework, iOS Fix

> Bundle of small-to-medium changes. Create a single branch from main.
>
> **Branch:** `claude/site-polish-bundle`
> **Scope:** Header mobile nav, new /work page, contact page layout, iOS safe area fix, link placement cleanup.

## Git Setup

1. Ensure you are on `main` (pull latest first)
2. Create branch: `git checkout -b claude/site-polish-bundle`
3. Make all changes on this branch
4. **Do not commit.**

## Instructions

### Step 1: Read first

1. Read `CLAUDE.md` in full — follow all rules
2. Read `components/layout/Header.tsx` — current mobile nav
3. Read `components/ContactPageContent.tsx` — current contact page
4. Read `components/sections/ContactSection.tsx` — contact CTA on role/home pages
5. Read `lib/content.ts` — `getAllCaseStudies()` function
6. Read `data/content-items.ts` — content items with IDs
7. Read `data/roles.ts` — `navRoleSlugs` and role definitions
8. Read `data/testimonials.ts` — current placeholder testimonials
9. Read `app/globals.css` — current styles
10. Read `app/layout.tsx` — current root layout

### Step 2: Mobile nav — replace exit links with role page links

**File:** `components/layout/Header.tsx`

Currently the mobile menu contains:

- Download CV (nav-link)
- View LinkedIn Profile ↗ (nav-mobile-only)
- View Github Repo ↗ (nav-mobile-only)
- Contact Dan (btn-solid-accent)

Replace the LinkedIn and GitHub links with role page navigation links. Import `getDisplayRoles` from `@/lib/roles` and render a link for each role.

The mobile menu should now contain:

- Download CV (keep as-is)
- Frontend Developer → /frontend-developer (nav-mobile-only)
- Digital Marketer → /digital-marketing (nav-mobile-only)
- UX Engineer → /ux-engineer (nav-mobile-only)
- Chief Vibes Officer → /chief-vibes-officer (nav-mobile-only)
- Contact Dan (keep as-is)

Use `Link` from next/link for internal navigation. Apply `nav-link nav-mobile-only` classes. The current page's role link (if on a role page) should get the `nav-link--active` modifier — but note there's no existing CSS for `nav-link--active`. If it doesn't exist in `globals.css`, add it:

```css
.nav-link--active {
  color: var(--color-text);
  font-weight: 500;
}
```

Check if it exists first before adding.

Highlight the active role link by comparing `pathname` to each role's slug:

```tsx
className={`nav-link nav-mobile-only${pathname === `/${role.slug}` ? ' nav-link--active' : ''}`}
```

### Step 3: Create /work page (case studies)

Create a new route at `app/work/page.tsx`.

**Metadata:**

```tsx
export const metadata = {
  title: 'Work & Case Studies — Dan Napoleoni',
  description:
    'Selected projects and case studies from 15+ years of frontend development, digital marketing, and UX engineering.',
};
```

**Page structure:**

- Back link to home (same pattern as other pages: `← Back`)
- Page heading: "Work"
- Brief intro paragraph explaining why there aren't visual portfolio pieces, then positioning the case studies positively. Something like:

  "Fifteen years of agency and enterprise work means most of what I've built lives behind client logins, NDAs, or has since been redesigned. Rather than fake portfolio pieces, here's what I can share — the problems I solved, the systems I built, and the decisions I made."

- Then render all case studies from `getAllCaseStudies()` (this returns only titled content items — 10 items total, excludes the untitled "Also" paragraph).

- Each case study should render with its title as an h3 and description as a paragraph, using the existing `.case-study` CSS class.

- Group them by origin role with a subtle label. To do this, we need to know which role each case study belongs to. The simplest approach: create a mapping in the page file:

```tsx
const caseStudyGroups = [
  {
    label: 'Frontend Development',
    ids: ['fe-flow-modal', 'fe-honest-fox-cms'],
  },
  {
    label: 'Digital Marketing',
    ids: ['dm-auspost-overhaul', 'dm-aussuper-banners', 'dm-myer-edm'],
  },
  {
    label: 'UX Engineering',
    ids: ['ux-splose-dashboard', 'ux-smith-family'],
  },
  {
    label: 'Culture & Vibes',
    ids: ['cvo-easter-bunny', 'cvo-panem-travel', 'cvo-five-clubs'],
  },
];
```

Use `getContentItems()` from `@/lib/content` to resolve each group's IDs. Render the group label as an h2 using `section-heading` class (same style as other section headings — JetBrains Mono, secondary colour).

End the page with a `ContactSection` (same as other pages use).

**Do NOT add /work to the main nav or navRoleSlugs.** It should be reachable via direct link only for now. We may add it to navigation later.

### Step 4: Contact page — add testimonials section and links

**File:** `components/ContactPageContent.tsx`

Rework the contact page layout to include a testimonials/references section alongside the form. On desktop, use a two-column layout. On mobile, stack vertically (form first, then testimonials).

**Layout structure:**

```
┌──────────────────────────────────────────────────────┐
│ ← Back                                                │
│                                                        │
│ Looking for a Frontend Developer?                      │
│ Or just keen for a chat? ...                           │
│                                                        │
│ ┌─────────────────────┐  ┌──────────────────────────┐ │
│ │ Contact Form        │  │ What people say           │ │
│ │                     │  │                            │ │
│ │ Name                │  │ "Quote..."                 │ │
│ │ Email               │  │ — Name, Role, Company      │ │
│ │ Message             │  │                            │ │
│ │                     │  │ "Quote..."                 │ │
│ │ [Send message →]    │  │ — Name, Role, Company      │ │
│ │                     │  │                            │ │
│ └─────────────────────┘  │ Also find me on:           │ │
│                          │ Email · LinkedIn · GitHub   │ │
│                          └──────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

**Implementation:**

Import testimonials: `import { getFeaturedTestimonials } from '@/lib/testimonials';`

Note: `ContactPageContent` is a client component (`'use client'`). The testimonials getter is a simple function that reads from a static array — it works fine in client components. But if there are issues, the testimonials can be passed as props from the page file instead.

Actually — to keep things clean, pass testimonials from the page file:

**File: `app/contact/page.tsx`** — update to pass testimonials:

```tsx
import { getFeaturedTestimonials } from '@/lib/testimonials';

// In the component:
const testimonials = getFeaturedTestimonials(5);
// Pass to ContactPageContent via props
```

Wait — `ContactPageContent` is inside a `Suspense` boundary because it uses `useSearchParams`. We can't easily pass server-fetched data through Suspense. Instead, just call `getFeaturedTestimonials` directly inside `ContactPageContent` — it's a pure function reading from a static array, no async involved.

**Conditional rendering:** Only show the testimonials section if there are testimonials with real names (not "Placeholder Name"). Add a check:

```tsx
const allTestimonials = getFeaturedTestimonials(5);
const realTestimonials = allTestimonials.filter((t) => t.name !== 'Placeholder Name');
const showTestimonials = realTestimonials.length > 0;
```

If `showTestimonials` is false, render the page as single-column (current layout) with the aside links below the form as it is now.

If `showTestimonials` is true, render the two-column layout with testimonials on the right.

**CSS for two-column contact layout** — add to globals.css:

```css
.contact-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}
```

Add to the responsive section (OUTSIDE the max-width: 640px block — this is a min-width query):

```css
@media screen and (min-width: 768px) {
  .contact-layout {
    grid-template-columns: 1fr 1fr;
  }
}
```

The testimonials column styling:

```css
.contact-testimonials {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.contact-testimonial-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--space-sm);
}

.contact-testimonial-attribution {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
```

**Move the "Also find me on" links** into the testimonials/right column (below testimonials when they exist, or as the right column content when they don't):

- EmailLink (keep)
- LinkedIn (keep)
- GitHub repo link — add: `https://github.com/dnapoleoni/cv-portfolio-2026` with text "View the code for this site ↗". This replaces having GitHub in the main nav.

Remove the GitHub and LinkedIn links from `components/sections/ContactSection.tsx` (the home page contact section). Replace with just the "Get in touch" link. The home page doesn't need GitHub/LinkedIn — the contact page is where those live now.

### Step 5: iOS Safari safe area fix

**File:** `app/layout.tsx` — add viewport meta tag for safe areas:

In the `<head>` section, add:

```tsx
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

**File:** `app/globals.css` — add safe area padding to the header:

Update `.site-header` to include safe area insets:

```css
.site-header {
  /* ...existing styles... */
  padding-top: max(var(--space-md), env(safe-area-inset-top));
  padding-left: max(0px, env(safe-area-inset-left));
  padding-right: max(0px, env(safe-area-inset-right));
}
```

Wait — the header is inside `.page-wrapper` which handles `padding-inline`. The safe area needs to be on the outermost element or the body. Better approach:

Add to the `body` rule in globals.css:

```css
body {
  /* ...existing styles... */
  padding-top: env(safe-area-inset-top);
}
```

And ensure the sticky header accounts for it:

```css
.site-header {
  /* ...existing styles... */
  top: env(safe-area-inset-top, 0px);
}
```

This pushes the body content below the safe area and makes the sticky header stick below the notch/dynamic island, not behind it.

### Step 6: Remove GitHub and LinkedIn from places they shouldn't be

After the above changes:

**Header mobile menu** — GitHub and LinkedIn links are already removed (Step 2).

**Home page ContactSection** — Remove the GitHub and LinkedIn links (Step 4). The home page contact section should just have "Get in touch".

**Contact page** — Now has LinkedIn and GitHub repo link in the right column / aside.

**Footer** — Currently just copyright + theme controls. Leave as-is — no need to add links here.

**Summary of where links now live:**

- **LinkedIn:** Contact page aside only
- **GitHub repo:** Contact page aside only ("View the code for this site ↗")
- **Email:** Contact page aside (via EmailLink component)
- **Download CV:** Header (both desktop and mobile)
- **Role pages:** Mobile nav + home page grid
- **Contact Dan:** Header (both desktop and mobile)

### Step 7: Verify

After all changes:

1. Mobile menu shows role page links instead of GitHub/LinkedIn
2. Active role page is highlighted in mobile menu
3. /work page renders with grouped case studies and intro
4. Contact page has two-column layout on desktop (when testimonials are real)
5. Contact page falls back to single-column (current behaviour) when testimonials are placeholder
6. GitHub/LinkedIn removed from home page contact section
7. GitHub repo link + LinkedIn on contact page aside
8. iOS Safari: header doesn't overlap with notch/dynamic island
9. All existing pages still render correctly
10. No console errors

## What NOT to do

- Do not add /work to navRoleSlugs or the home page grid
- Do not modify any role page content or data files (except CSS additions)
- Do not modify the testimonial data (placeholders stay as-is)
- Do not add the work page link to the mobile menu

## Verification checklist for Dan

- [ ] Mobile: hamburger opens, shows role links, active role highlighted, Download CV and Contact Dan still work
- [ ] /work: renders with intro paragraph and all 10 grouped case studies
- [ ] Contact page: single-column (current placeholders), will switch to two-column when real testimonials added
- [ ] Contact page: has LinkedIn and GitHub repo link in aside
- [ ] Home page: contact section only has "Get in touch" (no GitHub/LinkedIn)
- [ ] iOS Safari: header clears the notch/dynamic island
- [ ] Desktop: all pages render correctly, no layout shifts
