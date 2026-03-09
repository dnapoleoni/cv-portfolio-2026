# Dan Napoleoni — Portfolio & CV

> A developer who thinks like a designer and communicates like a human.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** with proper component architecture
- **TypeScript** throughout
- **Modern CSS** (custom properties, fluid typography, CSS Grid equal-height cards)
- **Google Fonts**: Outfit, JetBrains Mono, Cormorant Garamond, Caveat
- **6 color themes** with light/dark modes, all AAA-accessible
- **No external CSS frameworks** — pure modern CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
app/
  layout.tsx              — Root layout, fonts, ThemeProvider wrapper
  page.tsx                — Home: Hero + RoleGrid + Testimonials + Contact
  globals.css             — Full CSS design system
  not-found.tsx           — Custom 404
  cv/page.tsx             — Full CV with timeline
  role/[slug]/page.tsx    — Dynamic role detail pages

components/
  ThemeProvider.tsx        — Client: theme + mode context, localStorage
  Header.tsx              — Client: route-aware, theme controls, PDF download
  Footer.tsx              — Server: minimal footer links
  Hero.tsx                — Server: landing page hero with 3-font tagline
  RoleCard.tsx            — Server: individual role card with tech icons
  RoleGrid.tsx            — Server: "Which Dan?" grid layout
  SkillTags.tsx           — Server: skill tag list
  Timeline.tsx            — Server: experience timeline with role types
  TestimonialCarousel.tsx — Client: auto-rotating testimonial carousel
  RoleCrossNav.tsx        — Server: links to other roles from detail pages
  ContactSection.tsx      — Server: reusable CTA block
  TechIcons.tsx           — Server: inline SVG tech icons

data/
  roles.ts                — Role definitions, skills, timelines, case studies
  testimonials.ts         — Placeholder testimonials (replace with real ones)
  themes.ts               — 6 AAA-compliant color themes

types/
  css.d.ts                — CSS module type declarations
```

## Client vs Server Strategy

Most components are server-rendered. Only these need client-side JS:
- **ThemeProvider** — manages theme/mode state, localStorage, system preference
- **Header** — needs `usePathname()` for active state, theme controls
- **TestimonialCarousel** — interactive carousel with auto-rotation

## Themes

All themes are WCAG AAA compliant (7:1 normal text, 4.5:1 large text):
- **Warm** — Terracotta & warm neutrals
- **Ink** — Pure monochrome (Vercel/Notion-inspired)
- **Midnight** — Deep blue-gray (GitHub-inspired)
- **Forest** — Earthy greens
- **Ocean** — Calm blues (Linear-inspired)
- **Sunset** — Warm oranges

## Deployment

Deploy to Vercel:
```bash
npx vercel
```

## Next Steps

- [ ] Replace placeholder testimonials with real references (get consent!)
- [ ] Add actual email address
- [ ] Add CV PDF to `/public/Dan-Napoleoni-CV.pdf`
- [ ] Flesh out CVO case studies with real examples/photos
- [ ] Add "How this site was built" page
- [ ] Add AI chat widget (future feature)
- [ ] Add framework-switching on role pages (future)
- [ ] References page with contact functionality
- [ ] OG image
- [ ] Lighthouse audit
