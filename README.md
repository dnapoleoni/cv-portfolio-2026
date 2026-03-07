# Dan Napoleoni — Portfolio

A developer who thinks like a designer and communicates like a human.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Modern CSS** (custom properties, fluid typography, container queries-ready)
- **Google Fonts**: Outfit, JetBrains Mono, Cormorant Garamond, Caveat
- **Static export** — deployable to Vercel, Netlify, or any static host

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx        — Root layout, fonts, header/footer
  page.tsx          — Landing page with hero + role navigation
  globals.css       — Full CSS system (custom properties, fluid type, dark mode)
  not-found.tsx     — Custom 404
  cv/
    page.tsx        — Full CV/resume page
  role/
    [slug]/
      page.tsx      — Dynamic role detail pages

components/         — (Add shared components here)

data/
  roles.ts          — Role definitions, skills, timeline, case studies
```

## Pages

- `/` — Landing page with "What brings you here?" navigation
- `/role/frontend-developer` — Frontend dev focused experience
- `/role/digital-marketing-specialist` — eDM/banner/Salesforce experience
- `/role/ux-engineer` — UX advocacy & process
- `/role/chief-vibes-officer` — Culture, events, social clubs
- `/cv` — Full timeline CV with PDF download

## Design Principles

- **Typography-first**: Four fonts, each with purpose
- **Semantic HTML**: Readable without styles
- **Accessible**: Skip links, ARIA labels, focus styles, reduced motion
- **Modern CSS**: Fluid type/spacing, custom properties, dark mode
- **Minimal**: Clean, warm, editorial aesthetic

## Deployment

Static export is configured. Deploy to Vercel:

```bash
npx vercel
```

Or build and deploy the `out/` directory anywhere:

```bash
npm run build
# Deploy contents of ./out/
```

## Next Steps

- [ ] Add real email address and links
- [ ] Add CV PDF to `/public/Dan-Napoleoni-CV.pdf`
- [ ] Flesh out case studies with real examples
- [ ] Add "How this site was built" page
- [ ] Add AI chat widget (future feature)
- [ ] Add framework-switching feature (future feature)
- [ ] Lighthouse audit and optimisation
