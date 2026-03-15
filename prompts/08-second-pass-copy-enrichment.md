# Second Pass Copy Enrichment — Polished Version

## Context

All experience descriptions and content sections in `data/roles.ts` need updating. Current descriptions are thin summaries and all content sections are placeholders. This prompt replaces them with polished, first-person copy based on real stories.

**Voice**: warm, confident, self-aware, occasionally cheeky. Dan talking to a hiring manager — not a third party summarising his career. Never defensive about short stints (the type labels handle that). Never negative about former employers unless it's clearly self-deprecating humour.

Work on a single branch: `claude/second-pass-copy-enrichment`, which is already created and we are currently checked into right now. Do not create a new branch because this one already exists. Perform the changes directly on the current branch.

## Changes Required

All changes are in `data/roles.ts`. No other files change.

---

### 1. Experience: `everest`

**Replace** the current `description` string with a RoleVariant array:

```typescript
description: [
  {
    id: 'default',
    value:
      'React & TypeScript feature development for Splose, a healthcare practice management platform. Built a new reporting dashboard under a tight product launch deadline, and designed a reusable FlowModal engine that turned repetitive modal implementations into a modular, documented system for future developers to build on.',
  },
  {
    id: 'ux-engineer',
    value:
      'Built a reporting dashboard from a vibe-coded prototype and static designs that had significant UX gaps. Made gap-spotting part of the daily routine — flagging missing states, working through edge cases with designers, and fleshing out what the spec didn\'t cover.',
  },
],
```

---

### 2. Experience: `mira`

**Replace** the current `description` string with:

```typescript
description:
  'Frontend development for a SaaS app built in Quasar, Vue JS and Laravel. Small, self-directed dev team that owned the full product lifecycle from user feedback through to shipping. Upskilled in Laravel and Figma on the job to contribute beyond the frontend.',
```

---

### 3. Experience: `world-vision`

**Replace** the current `description` string with:

```typescript
description:
  'Short contract covering BAU eDM development — translating designs into HTML emails for the Child Sponsorship program, plus branded templates for the team\'s internal SharePoint site.',
```

---

### 4. Experience: `adtorque`

**Replace** the current `description` string with:

```typescript
description:
  'Sole developer on a ground-up SPA build in VueJS, TypeScript & Tailwind — a management tool for car-dealership franchise owners. Evaluated and replaced the original component library, set up the project architecture, and advocated for proper scoping and backend support throughout.',
```

---

### 5. Experience: `honest-fox`

**Replace** the two items in the `description` array with:

```typescript
description: [
  {
    id: 'default',
    value:
      'Solo-built a near-complete rebuild of the agency website in Vue, Nuxt, Tailwind & Storyblok — then went beyond the brief to make the entire site CMS-editable with a full page-builder system. Followed by general agency work across Vue, React, vanilla JS, and CMS platforms including Hubspot, Strapi, Contentful and CraftCMS.',
  },
  {
    id: 'chief-vibes-officer',
    value:
      'Showed up on day one with whisky, Codenames and cookies. Started a monthly whisky collection, brought in an arcade machine (still there), joined the diversity committee, invited an ADHD consultant to present to the team, and ran a weekly themed music club with crowd-sourced Spotify playlists every Friday afternoon.',
  },
],
```

---

### 6. Experience: `bower-house`

**Two changes:**

1. **Remove** the `type: 'contract',` line entirely (Dan left voluntarily for Honest Fox)
2. **Replace** the `description` string with:

```typescript
description:
  'Poached from Clemenger after impressing the CEO with my Salesforce work. Modernised the team\'s entire eDM development pipeline — new tooling, streamlined asset workflows, and a complete overhaul of their Salesforce Marketing Cloud system with reusable templates, code snippets and helper functions.',
```

---

### 7. Experience: `clemenger`

**Replace** the three items in the `description` array with:

```typescript
description: [
  {
    id: 'default',
    value:
      'Learned Vue on the job and shipped it to production. Built Vue.js applications for BMW and Myer, including a complete overhaul of the Fashions on the Field web app under a tight Melbourne Cup deadline. Dynamic HTML banner campaigns for BMW, NAB, TAC and Belong. Later became the sole Myer eDM developer, running the full pipeline from design to Salesforce deployment.',
  },
  {
    id: 'digital-marketing',
    value:
      'Sole developer on the Myer eDM program — end-to-end ownership from design through Salesforce Marketing Cloud deployment, subscriber lists, scheduling, dispatch and reporting. Created a modular template system for NAB emails. Dynamic HTML banner campaigns for BMW, NAB, TAC and Belong across DoubleClick and Sizmek.',
  },
  {
    id: 'chief-vibes-officer',
    value:
      'Started an unofficial board games club with Friday sessions and a carefully hidden whisky collection behind some hollowed-out folders in a cupboard. Sometimes the best culture work happens in the margins.',
  },
],
```

---

### 8. Experience: `freelance-contract`

**Replace** the two items in the `description` array with:

```typescript
description: [
  {
    id: 'default',
    value:
      'Contracts across three agencies. At The Royals: dynamic HTML banner suites for AustralianSuper (adopted by Google as a DV360 showcase), Athena Home Loans, Deakin University, Intel and REA Group, plus eDMs for Spotify and Mercedes-Benz. At Trout: product page builds for Reece Group. At Cummins & Partners: dynamic banners for SpecSavers.',
  },
  {
    id: 'digital-marketing',
    value:
      'Built a content-agnostic master banner template for AustralianSuper — dynamic frame count, timing, content, images and transitions, all configurable without dev involvement. Google adopted the campaign as a showcase for their new DV360 platform and partnered with the agency. A year later, the client was still using it for every campaign. Also: dynamic banners for Athena Home Loans, eDMs for Spotify Australia and Mercedes-Benz.',
  },
],
```

---

### 9. Experience: `isobar`

**Replace** the three items in the `description` array with:

```typescript
description: [
  {
    id: 'default',
    value:
      'Eight years spanning the full evolution of web development — from Flash and ActionScript through to HTML5 banners, eDMs, and frontend JavaScript. Built interactive mobile games for Smiggle, redeveloped The Smith Family\'s donation portal with a custom state-machine, and managed the Porter Davis website solo for over a year. Became DoubleClick Studio HTML5 certified.',
  },
  {
    id: 'digital-marketing',
    value:
      'Sole developer on the Australia Post Salesforce Marketing Cloud program for 2+ years. Designed and implemented a complete process overhaul — modular code templates, structured brief documents and tiered pricing — that fixed client friction and dramatically sped up delivery. Also built a standardised dynamic banner template used across dozens of campaigns for clients including Holden, Jetstar, Seek, Save The Children and many more.',
  },
  {
    id: 'chief-vibes-officer',
    value:
      'Eight years of grassroots culture building. Founded the Whisky Club, Burger Club (complete with Tumblr review blog), Board Games Club, and Film Club — where the movie was kept secret, cryptic clues were sent in the lead-up, and I\'d write a personal introduction and bring themed food. Designed multi-channel ARG experiences for office events. Overhauled the annual charity art auction into a live event that raised thousands more. Eventually adopted by the CEO into official onboarding and used for industry culture awards.',
  },
],
```

---

### 10. Experience: `cre8ive`

**Replace** the `description` string with:

```typescript
description: 'Early-career Flash development in Canberra — ActionScript, interactive websites and microsites, including award-winning work for the Royal Australian Mint.',
```

---

### 11. Experience: `cvo-off-the-clock`

**Replace** the `description` string with:

```typescript
description:
  "Lifelong game design enthusiast with a trail of prototypes — from custom HeroQuest campaigns to mobile game experiments with AI-assisted development. Puzzle and ARG designer who once built a city-spanning birthday treasure hunt involving a locked briefcase, black-light ink, a spy bag-swap, and a pet shop. Creative writer and member of Unsolicited Musings. Recently designed a four-difficulty cryptic crossword system for a friend's D&D campaign. This isn't a side hustle — it's who I am.",
```

---

### 12. Content Section: Frontend Developer role

**Replace** the entire `contentSection` object for the `frontend-developer` role with:

```typescript
contentSection: {
  heading: 'How I work',
  items: [
    {
      title: 'I see repetitive patterns and build systems instead.',
      description:
        'At Splose, I was tasked with implementing new 2FA modal flows. The designs had dozens of variations with repetitive elements and inconsistencies between them — building each one individually would have meant messy, redundant code and a maintenance headache for whoever came next. So instead of just building what was in front of me, I designed a FlowModal engine that separated the data layer from the modal management from the individual steps. Future devs can now create new flows, edit existing ones, and run A/B tests without touching the underlying architecture. I wrote full documentation so the system would outlive my contract. It\'s a pattern I keep coming back to — I\'d rather spend a bit more time building something properly than contribute to technical debt.',
    },
    {
      title: 'I tend to go beyond the brief when it makes sense.',
      description:
        'At Honest Fox, I was rebuilding the agency website in Vue, Nuxt and Storyblok. The original plan was to hard-code most pages and only make the blog CMS-editable. But once I started mapping the design components to Storyblok\'s content model, I realised the extra effort to make everything editable was relatively small — and since the designs were already built on reusable components, it made sense to go the whole way. I built a full page-builder system: the team could create entirely new landing pages, rearrange layouts, experiment with CTA placement — not just edit blog posts. The project ran slightly over, but the future time and cost savings more than justified it.',
    },
  ],
},
```

---

### 13. Content Section: Digital Marketing role

**Replace** the entire `contentSection` object for the `digital-marketing` role with:

```typescript
contentSection: {
  heading: 'How I work',
  items: [
    {
      title: 'Redesigning how Australia Post briefed and built emails.',
      description:
        'I was the sole developer on the Australia Post email program at Isobar for over two years — marketing, transactional, the lot. The process was painful: incomplete briefs from multiple client teams, small tweaks treated the same as full custom builds, and no shared language for what we were actually making. So I proposed a complete overhaul. I built modular email templates mapped to the most common layouts, each with unique IDs and documented content fields. Then I created brief documents that forced the client to fill in only the fields that matched those templates — no ambiguity. Finally, I set up tiered pricing so simple template work was quick and cheap, complex work was scoped properly, and anything outside the system was quoted as custom. It transformed the relationship. Briefs came in clean, turnaround dropped, and I could actually focus on building rather than deciphering what was being asked of me.',
    },
    {
      title: 'Building banners so flexible that Google made them a case study.',
      description:
        'At The Royals, I built a master banner template for AustralianSuper that was genuinely content-agnostic — dynamic frame count, timing, images, transitions, automatic font resizing, all controlled through a data feed. The client could roll out completely new campaigns without any developer involvement. It happened to coincide with Google launching their DV360 platform, and my implementation became their showcase for what the system could do. They came to the office, formed a partnership, and a year later reached out to say the client was still running every campaign through my template.',
    },
    {
      title: 'Running the Myer email machine solo.',
      description:
        'At Clemenger, I was the sole developer on a relentless stream of Myer eDMs — full end-to-end ownership from receiving designs through to Salesforce deployment, testing, subscriber lists, scheduling and reporting. The client sent incomplete briefs, changed direction constantly, and had different teams sending conflicting instructions. I became the last quality check in the chain, catching issues and pushing back up the line before writing a single line of code. It wasn\'t glamorous work, but it taught me that half of production at scale is process discipline, not technical skill.',
    },
  ],
},
```

---

### 14. Content Section: UX Engineer role

**Replace** the entire `contentSection` object for the `ux-engineer` role with:

```typescript
contentSection: {
  heading: 'How I work',
  items: [
    {
      title: 'I fill in what the spec leaves out.',
      description:
        'At Splose, I was building a reporting dashboard — revenue, cancellations, practitioner utilisation — under a tight launch deadline. The starting point was a vibe-coded prototype and some static designs, neither of which had been thoroughly thought through from a UX perspective. What happens when there\'s no data yet? What does the loading state look like? What if a date range returns nothing? None of it was specced. Rather than building exactly what was in front of me and shipping gaps, I made it part of my daily routine to spot what was missing, sketch out solutions, run them past the designers, and build them in. It\'s slower in the short term. It\'s dramatically faster than fixing it after launch.',
    },
    {
      title: 'I build logic when the designs don\'t have any.',
      description:
        'At Isobar, I was given a set of "interactive" designs for The Smith Family\'s donation portal — screens showing different states of a form, but with no clear logic connecting them. Actions led to dead ends, transitions were ambiguous, and the journey as a whole didn\'t hold together. Rather than sending it back for another round of revisions, I built a recursive state-machine under the hood: each user action triggered a lookup that could call functions, set states, activate other elements in sequence, and trigger sub-flows. It let me make the whole thing work as a coherent experience without needing the designs to tell me how. On the surface? Just a donation form. Underneath? Something I\'m still proud of.',
    },
  ],
},
```

---

### 15. Content Section: Chief Vibes Officer role

**Replace** the entire `contentSection` object for the `chief-vibes-officer` role with:

```typescript
contentSection: {
  heading: 'The vibes archive',
  items: [
    {
      title: 'The Easter Bunny who leaked company secrets.',
      description:
        'I was asked to organise an Easter egg hunt at Isobar. Naturally, I overengineered it. I used my eDM skills to build a fake internal email — proper HTML template, spoofed sender address, indistinguishable from the real thing — from "Easter J. Bunny," a recently fired employee who still had access to the email system. Throughout the day he "leaked" management secrets that were actually clues to hidden egg locations. Management was slowly replacing the office plants with fake ones? Eggs buried in the planter soil. They didn\'t actually read the suggestion box? Chocolates stashed inside it. By the end of the day, the character had a change of heart and asked for his job back.',
    },
    {
      title: 'A fake travel agency, hidden codes, and office-wide assassination.',
      description:
        'The office ran a Hunger Games elimination game — secret targets, innocuous weapons, stealth kills. I was knocked out on a technicality and given the job of distributing immunity idols however I saw fit. In two days I built "Panem Travel" — a fake travel agency with a real website and email account, filled with Hunger Games imagery and copy. Immunity clues were hidden in bolded letters spelling secret messages, images with steganographic data (and a decoder link buried in the copy), and auto-response emails triggered by the website\'s contact form. Multi-channel, fully interactive, built over a weekend.',
    },
    {
      title: 'Five clubs, a live auction, and eventually, the onboarding deck.',
      description:
        'Over eight years at Isobar I started the Whisky Club (shared cabinet, membership fees, Friday tastings), Burger Club (group orders, a Tumblr review blog, a custom McDonald\'s menu-hack outing before "Create Your Taste" was a thing), Board Games Club (Friday meetups, a donated office game library), and Film Club — where the title was kept secret, I\'d send cryptic clues in the lead-up, the first correct guess won a Blu-ray, and I\'d write a personal introduction and bring themed food I\'d made at home. All out of my own pocket. I also overhauled the annual charity art auction — replaced a broken online bidding system with a live auction that raised thousands more for charity. Eventually the CEO had official logos designed for each club, added them to the onboarding documentation, and used them to win industry culture awards. It all started with one person and a bottle of whisky.',
    },
  ],
},
```

---

### 16. Content Section: The Full Picture role

**Replace** the entire `contentSection` object for the `the-full-picture` role with:

```typescript
contentSection: {
  heading: 'Also',
  items: [
    {
      description:
        "Beyond the day job: lifelong game design enthusiast with a trail of prototypes — from custom HeroQuest campaigns to mobile experiments with AI-assisted development. Puzzle and ARG designer who once built a city-spanning birthday treasure hunt involving a locked briefcase, a spy bag-swap on a park bench, black-light ink, and a pet shop. Creative writer — completed a screenplay course, currently a member of Unsolicited Musings writing collective. Recently designed a four-difficulty cryptic crossword system for a friend's D&D campaign. Self-appointed Chief Vibes Officer at every workplace I've been part of. I believe culture isn't a perk — it's infrastructure.",
    },
  ],
},
```

---

## Verification

After making all changes:

1. Ensure braces and brackets are balanced in `data/roles.ts`
2. Run the dev server and check that each role page renders without errors
3. No content section should contain the words "Coming soon", "Placeholder", or "Check back soon"
4. No experience description should contain negative commentary about former employers
