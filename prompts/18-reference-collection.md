# Reference & Testimonial Collection Page

> Code-protected page for collecting references and testimonials from Dan's former colleagues.
> Uses Netlify Blobs for data storage and Netlify Forms for submission.
>
> **Branch:** `claude/reference-collection`

## Context

Dan needs to collect testimonials and reference permissions from former colleagues. Rather than sending emails and hoping for responses, this builds a personalised, pre-filled form on the site. Each person gets a unique code that loads their pre-filled details. They review, optionally write testimonials, and submit. Dan gets the response via Netlify Forms.

The page is NOT linked from anywhere on the site. Dan shares the URL directly with each person: `danielnapoleoni.dev/reference?code=jane123`

## Dependencies

Install `@netlify/blobs`:
```bash
npm install @netlify/blobs
```

## Instructions

### Step 1: Read first

1. Read `CLAUDE.md` in full
2. Read `components/ContactForm.tsx` — existing form pattern to follow
3. Read `app/contact/ContactPageContent.tsx` — existing client page pattern
4. Read `app/contact/success/page.tsx` — existing success page pattern
5. Read `public/__forms.html` — Netlify Forms detection
6. Read `app/globals.css` — existing form and checkbox styles

### Step 2: Create the API route

**File:** `app/api/reference/route.ts`

This API route looks up a reference code in Netlify Blobs and returns the person's data.

```typescript
import { getStore } from '@netlify/blobs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code')?.trim().toLowerCase();

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const store = getStore('references');
    const data = await store.get(code, { type: 'json' });

    if (!data) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
```

### Step 3: Create the reference page

**File:** `app/reference/page.tsx`

A client component (`'use client'`) with two screens:

**Screen 1 — Code entry:**
- Page heading: "Reference Request"
- Subheading: "Enter the code from the link I sent you."
- Single text input for the code
- On submit, calls `/api/reference?code=<value>`
- If the URL has a `?code=` param, auto-populate the input AND auto-submit (so the person just clicks the link and lands on the pre-filled form)
- If code is invalid, show inline error with `role="alert"`
- Uses existing `.contact-form` class for form styling
- Uses `.role-page` wrapper, `.page-header`, `.page-heading`, `.page-subheading` for layout

**Screen 2 — Pre-filled form (shown after valid code):**
- Heading: "Hi {firstName}!" using first word of their name
- Subheading: The personalised message from the blob data
- Form name: "reference" (for Netlify Forms)
- Hidden fields: `form-name`, `code`, honeypot `bot-field`

Form sections with `.section-heading` labels and `.divider-subtle` separators:

**"Your details" section:**
- Name (text, required, pre-filled)
- Role title (text, required, pre-filled)
- Company — label: "Company (at the time we worked together)" (text, required, pre-filled)
- Email (email, required, pre-filled)
- Phone — label: "Phone (optional — only used if a hiring manager wants to verify)" (tel, optional, pre-filled)

**"Reference" section:**
- Single checkbox: "I'm happy to be listed as a reference and contacted by potential employers"
- Field name: `is-reference`, value: `yes`
- Use a `.reference-checkbox` class for horizontal layout (label + checkbox side by side)

**"Testimonials" section:**
- Intro text: "A sentence or two is perfect. Write in whatever voice feels natural — these will appear as quotes on my site. Leave any blank if you'd prefer not to."
- General quote textarea — label: "General quote (used on the home page and full CV)", name: `quote-general`
- Frontend Development textarea — label: "Frontend Development (optional)", name: `quote-frontend-developer`
- Digital Marketing textarea — label: "Digital Marketing (optional)", name: `quote-digital-marketing`
- UX Engineering textarea — label: "UX Engineering (optional)", name: `quote-ux-engineer`
- Culture & Vibes textarea — label: "Culture & Vibes (optional)", name: `quote-chief-vibes-officer`
- All textareas: rows={3}, optional (no `required`)

**Submit:**
- Button text: "Submit reference" / "Sending..." when submitting
- Uses `fieldset disabled={submitting}` pattern
- Error handling with inline `role="alert"` message
- On success, redirect to `/reference/success`

### Step 4: Create the success page

**File:** `app/reference/success/page.tsx`

Server component using the `hero--centered` pattern (same as contact success):

```typescript
export const metadata = {
  title: 'Thanks! — Dan Napoleoni',
  description: 'Reference submitted successfully.',
};
```

- Greeting: "Sent!"
- Heading: "Thanks so much."
- Subheading: "I really appreciate you taking the time. I'll be in touch if anything needs clarifying."
- Button: "View the site" linking to `/`

### Step 5: Add CSS for the reference checkbox

**File:** `app/globals.css`

Add after the `.form-error` rule:

```css
.reference-checkbox {
  flex-direction: row !important;
  align-items: flex-start;
  gap: var(--space-sm) !important;
  cursor: pointer;
}

.reference-checkbox input[type='checkbox'] {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.reference-checkbox span {
  font-size: var(--text-base);
  color: var(--color-text);
}
```

The `!important` overrides are needed because `.contact-form label` sets `flex-direction: column` and `gap` which need to be overridden for the horizontal checkbox layout.

### Step 6: Register the form with Netlify

**File:** `public/__forms.html`

Add a second form after the existing contact form:

```html
<form name="reference" data-netlify="true" netlify-honeypot="bot-field">
  <input name="bot-field" />
  <input name="form-name" />
  <input name="code" />
  <input name="name" />
  <input name="role" />
  <input name="company" />
  <input name="email" />
  <input name="phone" />
  <input name="is-reference" />
  <textarea name="quote-general"></textarea>
  <textarea name="quote-frontend-developer"></textarea>
  <textarea name="quote-digital-marketing"></textarea>
  <textarea name="quote-ux-engineer"></textarea>
  <textarea name="quote-chief-vibes-officer"></textarea>
</form>
```

This lets Netlify detect the form fields at build time even though the form is client-rendered.

### Step 7: Auto-read code from URL

The page should check for `?code=` in the URL on mount. If present, auto-populate the code input and immediately call the API to load the person's data. This way the person just clicks the link and goes straight to the pre-filled form without manually entering a code.

Use `useSearchParams()` from `next/navigation`. Since this requires Suspense, wrap the page content in a Suspense boundary — either in the page file or inline.

```typescript
const searchParams = useSearchParams();

useEffect(() => {
  const urlCode = searchParams.get('code');
  if (urlCode) {
    setCode(urlCode);
    // Auto-submit
    handleCodeLookup(urlCode);
  }
}, [searchParams]);
```

Extract the API call logic into a separate function (`handleCodeLookup`) so it can be called from both the form submit handler and the auto-read effect.

### Step 8: Verify

1. Run `npm install @netlify/blobs` if not already installed
2. Seed a test reference via Netlify CLI:
   ```bash
   netlify blobs:set references testcode '{"name":"Test Person","role":"Developer","company":"Test Co","email":"test@test.com","phone":"","message":"Hey! This is a test reference request."}'
   ```
3. Test with `netlify dev` (NOT `npm run dev` — Netlify Blobs needs the Netlify runtime)
4. Visit `/reference` — should show code entry form
5. Enter `testcode` — should load pre-filled form
6. Visit `/reference?code=testcode` — should auto-load pre-filled form (skip code entry)
7. Submit the form — should redirect to `/reference/success`
8. Check Netlify Forms dashboard for the submission

## Blob Data Structure

Each reference is stored as a JSON object keyed by the person's unique code:

```json
{
  "name": "Jane Smith",
  "role": "Product Manager",
  "company": "Mira",
  "email": "jane@example.com",
  "phone": "0412345678",
  "message": "Hey Jane! Would love a short quote about working together at Mira — especially around the product work and how we collaborated as a small team."
}
```

Stored via: `netlify blobs:set references jane123 '<json>'`

The code should be short, memorable, and unique per person. Examples: `jane-mira`, `bob-clem`, `sarah-hf`.

## What NOT to do

- Do not link the reference page from anywhere on the site
- Do not add `/reference` to navigation or navRoleSlugs
- Do not store reference data in the git repo
- Do not commit personal contact details
- Do not add metadata/OG tags to the reference page (it shouldn't be indexed)
- Do not add it to sitemap.ts or robots.ts

## Files created/modified

| File | Action |
|------|--------|
| `app/api/reference/route.ts` | Create — API route for blob lookup |
| `app/reference/page.tsx` | Create — Code entry + pre-filled form |
| `app/reference/success/page.tsx` | Create — Thank you page |
| `app/globals.css` | Modify — Add `.reference-checkbox` styles |
| `public/__forms.html` | Modify — Add reference form detection |
| `package.json` | Modify — Add `@netlify/blobs` dependency |
