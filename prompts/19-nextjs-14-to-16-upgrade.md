# Next.js 14 → 16 Upgrade

> Upgrade the project from Next.js 14 (React 18) to Next.js 16 (React 19).
>
> **Branch:** `claude/nextjs-16-upgrade`
> **Scope:** Package upgrades, config migration, breaking change fixes, build verification.

## Git Setup

1. Ensure you are on `main` (pull latest first)
2. Create branch: `git checkout -b claude/nextjs-16-upgrade`
3. Make all changes on this branch
4. **Do not commit.**

## Context

This is a portfolio site with a simple architecture: static pages, server components by default, a handful of client components, one server action, Netlify Forms, and a standalone PDF generation script. There are no dynamic routes, no middleware, no custom webpack config, no ISR, no `revalidateTag`, no `cookies()`/`headers()` in server components. This makes the upgrade low-risk.

The latest stable Next.js is **16.2.1**. Netlify fully supports Next.js 16 with zero config changes. `@react-pdf/renderer` v4.3.2 supports React 19 (since v4.1.0).

## Instructions

### Step 1: Read first

1. Read `CLAUDE.md` in full — follow all rules
2. Read `package.json` — current dependency versions
3. Read `next.config.js` — current config (it's empty)
4. Read `tsconfig.json` — current TypeScript config
5. Read `netlify.toml` — build command and publish directory
6. Read `app/layout.tsx` — root layout with viewport export and Google Fonts

### Step 2: Run the upgrade

Use the official Next.js codemod to handle the version bump and automated migrations:

```bash
npx @next/codemod@canary upgrade latest
```

This will:
- Update `next`, `react`, `react-dom` to latest versions
- Run codemods for any breaking API changes it detects
- May prompt for confirmation — accept the defaults

If the codemod has issues or prompts interactively in a way that blocks, fall back to manual upgrade:

```bash
npm install next@latest react@latest react-dom@latest
```

Also update the React types:

```bash
npm install --save-dev @types/react@latest @types/react-dom@latest
```

### Step 3: Convert next.config.js to next.config.ts

Replace `next.config.js` with `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

Delete the old `next.config.js` file.

### Step 4: Check for codemod changes

The codemod may have modified files. Review what changed. In this project, the main things it might touch:

- **Async params/searchParams in page files** — This project has NO dynamic `[slug]` routes and NO server-side `searchParams` usage, so there should be nothing to change. All `useSearchParams` usage is client-side (via `'use client'` components) which is unaffected.
- **`next/image` changes** — Next.js 16 changes some default image props. Check if any `<Image>` components were modified. This project uses a single profile image.
- **`middleware.ts` → `proxy.ts`** — This project has no middleware, so nothing to do.

If the codemod left any `@next-codemod-error` comments, fix them manually.

### Step 5: Update tsconfig.json if needed

Next.js 16 works with the current tsconfig. No changes should be needed, but verify the build doesn't complain about TypeScript config.

### Step 6: Verify the build

Run:

```bash
npm run build
```

This now uses Turbopack by default (no `--turbopack` flag needed). Fix any build errors.

Common things to watch for:
- React 19 removed some deprecated APIs. If any client components use deprecated React APIs, they'll error.
- `@react-pdf/renderer` is NOT used during the Next.js build — it runs via the separate `tsx scripts/generate-pdfs.tsx` script. So PDF generation won't block the build.

### Step 7: Test PDF generation

Run:

```bash
npm run generate-pdfs
```

This runs outside Next.js using `tsx` directly. It should work because `@react-pdf/renderer` v4.3.2 supports React 19. If there are peer dependency warnings during install, they can likely be ignored as long as generation succeeds.

Verify the output files exist in `public/pdfs/`.

### Step 8: Test dev server

Run:

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- Home page loads
- All 5 role pages load: `/frontend-developer`, `/digital-marketer`, `/ux-engineer`, `/chief-vibes-officer`, `/the-full-picture`
- `/contact` page loads and form renders
- `/reference` page loads (code entry form)
- Theme switching works (footer controls)
- Light/dark mode toggle works
- Mobile menu opens/closes
- PDF download links work (header + hero)
- Console greeting appears in browser devtools

### Step 9: Update README.md

In `README.md`:

1. **Remove the Next.js Version Notice block** — the entire `> **⚠️ Next.js Version Notice**` blockquote section.

2. **Update tech stack references** — change "Next.js 14" to "Next.js 16" and "React 18" to "React 19" wherever they appear in the README.

3. **Update the Prerequisites section** — change "Node.js 18+" to "Node.js 20.9+" (Next.js 16 minimum requirement).

### Step 10: Update CLAUDE.md

In `CLAUDE.md`, update the tech stack line near the top. Change:

```
Next.js 14 App Router, React 18, TypeScript.
```

to:

```
Next.js 16 App Router, React 19, TypeScript.
```

## What NOT to do

- Do NOT enable the React Compiler (`reactCompiler: true`) — it's optional and adds build time. Not needed for this project.
- Do NOT enable `cacheComponents` — not needed for a static portfolio site.
- Do NOT rename anything to `proxy.ts` — there is no middleware.
- Do NOT add Turbopack flags to package.json scripts — Turbopack is the default in Next.js 16, no flags needed.
- Do NOT change the Google Fonts loading approach (link tags in `<head>`) — this is a deliberate choice documented in CLAUDE.md. `next/font` may work in Next.js 16 but the current approach is intentional.
- Do NOT add any new dependencies.
- Do NOT modify the `netlify.toml` — Netlify handles Next.js 16 automatically.

## Success criteria

- `npm run build` completes without errors
- `npm run generate-pdfs` produces 5 PDFs in `public/pdfs/`
- `npm run dev` serves the site correctly
- All pages render without console errors
- Theme switching and mobile menu work
- README and CLAUDE.md reflect the new versions
- `package.json` shows `next@^16.x.x`, `react@^19.x.x`, `react-dom@^19.x.x`
