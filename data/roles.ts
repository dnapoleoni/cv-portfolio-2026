export type TechIconId =
  | 'react'
  | 'typescript'
  | 'vue'
  | 'javascript'
  | 'html'
  | 'css'
  | 'nextjs'
  | 'salesforce'
  | 'figma'
  | 'git'
  | 'sparkles'
  | 'puzzle'
  | 'users'
  | 'accessibility';

/** A field that's either universal (string) or has role-specific variants */
type RoleVariant = string | { id: string; value: string }[];

/**
 * Resolve a RoleVariant field for a given role.
 * - If string, return it directly.
 * - If array, try: exact role match → 'default' → first entry.
 */
export function resolveVariant(field: RoleVariant, roleId: string): string {
  if (typeof field === 'string') return field;
  const match = field.find((v) => v.id === roleId);
  if (match) return match.value;
  const defaultMatch = field.find((v) => v.id === 'default');
  if (defaultMatch) return defaultMatch.value;
  return field[0].value;
}

interface Experience {
  id: string;
  date: RoleVariant;
  role: RoleVariant;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent';
  description: RoleVariant;
}

export interface ResolvedTimelineEntry {
  date: string;
  role: string;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent';
  description: string;
}

export interface ContentSection {
  heading: string;
  items: { title?: string; description: string }[];
}

export interface Tagline {
  mono: string; // displayed in JetBrains Mono
  serif: string; // displayed in Cormorant Garamond italic
  hand: string; // displayed in Caveat, accent colour
}

export interface RoleData {
  slug: string;
  title: string;
  shortDesc: string;
  subtitle: string;
  tagline?: Tagline; // OPTIONAL — CV has no tagline
  intro: string[];
  variant?: 'vibes';
  contactHeading?: string;
  icons?: TechIconId[]; // OPTIONAL — CV has no icons
  skills: string[];
  experienceIds: string[]; // REPLACES timeline: TimelineEntry[]
  contentSection?: ContentSection; // REPLACES caseStudies: CaseStudy[]
}

/** Role slugs that appear in the home page grid and cross-nav */
export const navRoleSlugs = [
  'frontend-developer',
  'digital-marketing',
  'ux-engineer',
  'chief-vibes-officer',
];

export const experiences: Experience[] = [
  {
    id: 'everest',
    date: '2025 - 2026',
    role: 'Software Engineer',
    company: 'Everest Engineering',
    type: 'contract',
    description: [
      {
        id: 'default',
        value:
          'React & TypeScript feature development for Splose, a healthcare practice management platform. Built a new reporting dashboard under a tight product launch deadline, and designed a reusable "FlowModal" engine that turned repetitive modal implementations into a modular, documented system for future developers to build on.',
      },
      {
        id: 'ux-engineer',
        value:
          "Built a reporting dashboard from a vibe-coded prototype and static designs that had significant UX gaps. Made gap-spotting part of the daily routine — flagging missing states, working through edge cases with designers, and fleshing out what the spec didn't cover.",
      },
    ],
  },
  {
    id: 'mira',
    date: '2024 - 2025',
    role: 'Frontend Developer',
    company: 'Mira | Business Software',
    type: 'redundancy',
    description:
      'Frontend development for a SaaS app built in Quasar, Vue JS and Laravel. Small, self-directed dev team that owned the full product lifecycle from user feedback through to shipping. Upskilled in Laravel and Figma on the job to contribute beyond the frontend. Created and developed a new feature from interpreting user feedback, creating wireframes, mocking up designs with component ui, developing and testing.',
  },
  {
    id: 'world-vision',
    date: '2023',
    role: 'eDM Developer',
    company: 'World Vision Australia',
    type: 'contract',
    description:
      "Short contract covering BAU eDM development — translating designs into HTML emails for the Child Sponsorship program, plus branded templates for the team's internal SharePoint site.",
  },
  {
    id: 'adtorque',
    date: '2023',
    role: 'VueJS Developer',
    company: 'AdTorque Edge',
    type: 'redundancy',
    description:
      'Sole developer on a ground-up SPA build in VueJS, TypeScript & Tailwind — a management tool for car-dealership franchise owners. Evaluated and replaced the original component library, set up the project architecture, and advocated for proper scoping and backend support throughout.',
  },
  {
    id: 'honest-fox',
    date: '2022',
    role: [
      { id: 'default', value: 'Frontend Developer' },
      { id: 'chief-vibes-officer', value: 'Frontend Developer & Culture Contributor' },
    ],
    company: 'Honest Fox',
    type: 'redundancy',
    description: [
      {
        id: 'default',
        value:
          'Developed a ground-up rebuild of the agency website in Vue, Nuxt, Tailwind & Storyblok — then went beyond the brief to make the entire site CMS-editable with a full page-builder system. Followed by general agency work across Vue, React, vanilla JS, and CMS platforms including Hubspot, Strapi, Contentful and CraftCMS.',
      },
      {
        id: 'chief-vibes-officer',
        value:
          'Showed up on day one with whisky, Codenames and a plate of home-made cookies. Started a monthly whisky collection, brought in an arcade machine (still there), joined the diversity committee, invited an ADHD consultant to present to the team, and ran a weekly themed music club with crowd-sourced themed Spotify playlists every Friday afternoon.',
      },
    ],
  },
  {
    id: 'bower-house',
    date: '2021 - 2022',
    role: 'Technical Producer',
    company: 'Bower House Digital',
    description:
      "Poached from Clemenger after impressing the CEO with my Salesforce work. Modernised the team's entire eDM development pipeline — new tooling, streamlined asset workflows, and a complete overhaul of their Salesforce Marketing Cloud system with reusable templates, code snippets and helper functions.",
  },
  {
    id: 'clemenger',
    date: '2019 - 2021',
    role: [
      { id: 'default', value: 'Frontend Developer' },
      { id: 'digital-marketing', value: 'eDM & Banner Developer' },
      { id: 'chief-vibes-officer', value: 'Frontend Developer & Culture Contributor' },
    ],
    company: 'Clemenger BBDO',
    type: 'permanent',
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
  },
  {
    id: 'freelance-contract',
    date: '2018 - 2019',
    role: [
      { id: 'default', value: 'Frontend Developer' },
      { id: 'digital-marketing', value: 'eDM & Banner Developer' },
    ],
    company: 'Freelance & Contract (The Royals, Trout, Cummins & Partners)',
    type: 'contract',
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
  },
  {
    id: 'isobar',
    date: '2009 - 2017',
    role: [
      { id: 'default', value: 'Developer' },
      { id: 'digital-marketing', value: 'eDM & Banner Developer' },
      { id: 'chief-vibes-officer', value: 'Developer & Culture Contributor' },
    ],
    company: 'Isobar Australia',
    type: 'permanent',
    description: [
      {
        id: 'default',
        value:
          "Eight years spanning the full evolution of web development — from Flash and ActionScript through to HTML5 banners, eDMs, and frontend JavaScript. Built interactive mobile games for Smiggle, redeveloped The Smith Family's donation portal with a custom state-machine, and managed the Porter Davis website solo for over a year. Became DoubleClick Studio HTML5 certified.",
      },
      {
        id: 'digital-marketing',
        value:
          'Sole developer on the Australia Post Salesforce Marketing Cloud program for 2+ years. Designed and implemented a complete process overhaul — modular code templates, structured brief documents and tiered pricing — that fixed client friction and dramatically sped up delivery. Also built a standardised dynamic banner template used across numerous campaigns for clients including Holden, Jetstar, Seek, Save The Children and many more.',
      },
      {
        id: 'chief-vibes-officer',
        value:
          'Eight years of grassroots culture building. Founded the Whisky Club, Burger Club (complete with Tumblr review blog), Board Games Club, and Film Club —including a guess-the-film cryptic challenge, personal film introduction speeches and themed home-made food. Eventually the social clubs were adopted by the CEO to include fully designed club logos, incorporated into official onboarding docs and used for industry culture awards. Also designed multi-channel ARG experiences for office events, and help guide the annual Art Exhibition to raise more money than ever before, for charity.',
      },
    ],
  },
  {
    id: 'cre8ive',
    date: '2007 - 2008',
    role: 'Developer',
    company: 'Cre8ive',
    type: 'permanent',
    description:
      'Early-career Flash development in Canberra — ActionScript, interactive websites and microsites, including award-winning work for the Royal Australian Mint.',
  },
  {
    id: 'cvo-off-the-clock',
    date: 'Jul 1984 - Present',
    role: 'Chief Vibes Officer (Self-Appointed)',
    company: 'Off the clock',
    description:
      "Lifelong game design enthusiast with a trail of prototypes — from custom HeroQuest campaigns to mobile game experiments with AI-assisted development. Puzzle and ARG designer who once built a city-spanning birthday treasure hunt involving a locked briefcase, black-light ink, a spy bag-swap, mysterious packages hidden in local businesses and a casino mission. Creative writer and member of an underground writing collective called Unsolicited Musings. Recently designed a variable-difficulty cryptic crossword system for a friend's D&D campaign. This isn't a side hustle — it's who I am.",
  },
];

export const roles: RoleData[] = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    shortDesc:
      'React, TypeScript, Vue.js — 15+ years building for the web, from Flash to frameworks.',
    subtitle: 'Modern frontend engineering with a UX-first mindset',
    tagline: {
      mono: 'A developer',
      serif: 'who thinks like a designer',
      hand: 'and communicates like a human.',
    },
    icons: ['react', 'typescript', 'vue', 'nextjs'],
    intro: [
      "I've been building for the web since Flash was king. That journey — through ActionScript, JavaScript, Vue, and now React and TypeScript — means I don't just know frameworks, I understand the web platform itself. I write semantic HTML, modern CSS, and accessible interfaces because I've seen enough trends come and go to know what actually matters: does it work, is it fast, can everyone use it?",
      "My most recent work was React and TypeScript at Everest Engineering, building features for Splose — a healthcare management platform. Before that I spent years deep in Vue.js across multiple agencies and product teams. I'm framework-flexible because my fundamentals are strong.",
      "What makes me different from other frontend developers is that I don't just implement designs — I interrogate them. I'll flag accessibility issues, question interaction patterns that don't serve users, and fill in the gaps the brief left out. I've been told this is both my greatest strength and occasionally annoying. I'm fine with that.",
    ],
    skills: [
      'React',
      'TypeScript',
      'Vue.js',
      'JavaScript (ES6+)',
      'HTML5 / Semantic HTML',
      'CSS3 / SCSS / Tailwind',
      'Next.js',
      'Nuxt',
      'REST APIs',
      'GraphQL',
      'Git',
      'Agile / Scrum',
      'Figma → Code',
      'Responsive Design',
      'WCAG Accessibility',
      'Quasar',
      'Laravel',
      'GSAP',
      'Headless CMS (Storyblok, DatoCMS, Craft CMS)',
      'AI-Assisted Development (Claude, Copilot, Cursor)',
    ],
    experienceIds: [
      'everest',
      'mira',
      'adtorque',
      'honest-fox',
      'clemenger',
      'freelance-contract',
      'isobar',
      'cre8ive',
    ],
    contentSection: {
      heading: 'How I work',
      items: [
        {
          title: 'I see repetitive patterns and build systems instead.',
          description:
            'At Splose, I was tasked with implementing new 2FA modal flows. The designs had multiple variations with repetitive elements and inconsistencies between them — building each one individually would have meant messy, redundant code and a maintenance headache for whoever came next. So instead of just building what was in front of me, I designed a reusable "FlowModal" engine that separated the data layer from the modal management from the individual steps. Future devs can now create new flows, edit existing ones, and run A/B tests without touching the underlying architecture. I wrote full documentation so the system would outlive my contract. It\'s a pattern I keep coming back to — I\'d rather spend a bit more time building something properly than contribute to technical debt.',
        },
        {
          title: 'I tend to go beyond the brief when it makes sense.',
          description:
            "At Honest Fox, I was rebuilding the agency website in Vue, Nuxt and Storyblok. The original plan was to hard-code most pages and only make the blog CMS-editable. But once I started mapping the design components to Storyblok's content model, I realised the extra effort to make everything editable was relatively small — and since the designs were already built on reusable components, it made sense to go the whole way. I built a full page-builder system: the team could create entirely new landing pages, rearrange layouts, experiment with CTA placement — not just edit blog posts. The scope grew organically as the team saw what was possible, and the end result was a site they could manage and evolve entirely on their own.",
        },
      ],
    },
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketer',
    shortDesc:
      'eDMs, HTML banners, Salesforce Marketing Cloud — the full digital campaign toolkit.',
    subtitle: 'Email campaigns, dynamic banners, and marketing production at scale',
    tagline: {
      mono: 'A developer',
      serif: 'who speaks marketing',
      hand: 'and builds campaigns that actually work.',
    },
    icons: ['salesforce', 'html', 'css', 'javascript'],
    intro: [
      'Before I became a "frontend developer" I spent years deep in the trenches of digital marketing production — building eDM templates and campaigns in Salesforce Marketing Cloud (ExactTarget), creating dynamic HTML banners for Google DV360 and DoubleClick, and managing campaign deployments for some of Australia\'s biggest brands.',
      "I ran the Myer eDM account at Clemenger and the Australia Post Salesforce offering at Isobar — including a full modular template overhaul. That means I know the pain of Outlook rendering (120 DPI scaling, anyone?), the art of responsive email design, and the operational reality of deploying to millions of inboxes. I've built template systems and debugged more rendering issues across more email clients than I'd like to admit.",
      "This background gives me something most frontend developers don't have: a deep understanding of how marketing teams work, what they need from technology, and how to bridge the gap between creative intent and technical delivery.",
    ],
    skills: [
      'Salesforce Marketing Cloud / ExactTarget',
      'eDM Design & Development',
      'HTML Email (Responsive, Cross-client)',
      'Google DV360 / DoubleClick Studio',
      'Dynamic HTML Banners (DCO)',
      'Campaign Deployment & QA',
      'A/B Testing',
      'Google Web Designer',
      'Litmus',
      'Browserstack',
      'Campaign Monitor',
      'Mailchimp',
      'HTML / CSS / JavaScript',
      'Photoshop / Sketch / Figma',
    ],
    experienceIds: ['world-vision', 'bower-house', 'clemenger', 'freelance-contract', 'isobar'],
    contentSection: {
      heading: 'Achievements',
      items: [
        {
          title: 'Redesigning how Australia Post briefed and built emails.',
          description:
            'I was the sole developer on the Australia Post email program at Isobar for over two years — marketing, transactional, the lot. The process was painful: incomplete briefs from multiple client teams, small tweaks treated the same as full custom builds, and no shared language for what we were actually making. So I proposed a complete overhaul. I built modular email templates mapped to the most common layouts, each with unique IDs and documented content fields. Then I created brief documents that forced the client to fill in only the fields that matched those templates — no ambiguity. Finally, I set up tiered pricing so simple template work was quick and cheap, complex work was scoped properly, and anything outside the system was quoted as custom. It transformed the relationship. Briefs came in clean, turnaround dropped, and I could actually focus on building rather than deciphering what was being asked of me.',
        },
        {
          title: 'Building banners so flexible that Google made them a case study.',
          description:
            'At The Royals, I built a master banner template for AustralianSuper that was genuinely content-agnostic — dynamic frame count, timing, images, transitions, fonts, urls — all controlled through a data feed. The client could roll out completely new campaigns without any developer involvement. It happened to coincide with Google launching their DV360 platform, and my implementation was included in their showcase for what the new system could do. A year later The Royals reached out to say the client was still running every campaign through my template, and was looking for minor branding updates to continue use of the template system.',
        },
        {
          title: 'Running the Myer email machine solo.',
          description:
            "At Clemenger, I was the sole developer on a relentless stream of Myer eDMs — full end-to-end ownership from receiving designs through to Salesforce deployment, testing, subscriber lists, scheduling and reporting. The client sent incomplete briefs, changed direction constantly, and had different teams sending conflicting instructions. I became the last quality check in the chain, catching issues and pushing back up the line before writing a single line of code. It wasn't glamorous work, but it taught me that half of production at scale is process discipline, not technical skill.",
        },
      ],
    },
  },
  {
    slug: 'ux-engineer',
    title: 'UX Engineer',
    shortDesc:
      "I don't just build what's in the brief — I question it, improve it, and fill in the gaps.",
    subtitle: 'Frontend development with deep user experience advocacy',
    tagline: {
      mono: 'A developer',
      serif: 'who asks why before asking how',
      hand: 'and fights for the user.',
    },
    icons: ['accessibility', 'figma', 'react', 'css'],
    intro: [
      "I'm not a UX designer by title, but I think like one. Every ticket I pick up, I'm asking: who's using this? What are they trying to do? What happens when it goes wrong? What did we forget?",
      "This isn't theoretical — it comes from 15+ years of building things that real people use, watching what breaks, and learning that the spec is never the whole story. I've worked in agencies where speed matters and in product teams where getting the details right matters. Both taught me that the developer is often the last line of defence before something reaches the user, and I take that seriously.",
      'I bring a perspective that sits between design and engineering. I can read a Figma file and implement it faithfully, but I\'ll also flag when a hover state is missing, when a loading state hasn\'t been considered, when the empty state is blank, or when the error message says "An error occurred" instead of something actually helpful.',
      'Some people find this annoying. Most come to appreciate it.',
    ],
    skills: [
      'UX Advocacy & Review',
      'Interaction Design Implementation',
      'Accessibility (WCAG AA/AAA)',
      'Edge Case Identification',
      'Responsive & Adaptive Design',
      'Design System Contribution',
      'Error State & Empty State Design',
      'User Flow Analysis',
      'Cross-browser / Cross-device QA',
      'Figma Collaboration',
    ],
    experienceIds: ['everest', 'mira', 'clemenger', 'isobar'],
    contentSection: {
      heading: 'How I work',
      items: [
        {
          title: 'I fill in what the spec leaves out.',
          description:
            "At Splose, I was building a reporting dashboard — revenue, cancellations, practitioner utilisation — under a tight launch deadline. The starting point was a vibe-coded prototype and some static designs, neither of which had been thoroughly thought through from a UX perspective. What happens when there's no data yet? What does the loading state look like? What if a date range returns nothing? None of it was specced. Rather than building exactly what was in front of me and shipping gaps, I made it part of my daily routine to spot what was missing, sketch out solutions, run them past the designers, and build them in. It's slower in the short term. It's dramatically faster than fixing it after launch.",
        },
        {
          title: "I build logic when the designs don't have any.",
          description:
            "At Isobar, I was given a set of \"interactive\" designs for The Smith Family's donation portal — screens showing different states of a form, but with no clear logic connecting them. Actions led to dead ends, transitions were ambiguous, and the journey as a whole didn't hold together. Rather than sending it back for another round of revisions, I built a recursive state-machine under the hood: each user action triggered a lookup that could call functions, set states, activate other elements in sequence, and trigger sub-flows. It let me make the whole thing work as a coherent experience without needing the designs to tell me how. On the surface? Just a donation form. Underneath? Something I'm still proud of.",
        },
      ],
    },
  },
  {
    slug: 'chief-vibes-officer',
    title: 'Chief Vibes Officer',
    shortDesc:
      'Social clubs, events, culture — I turn workmates into friends and teams into communities.',
    subtitle: 'Culture engineering, social programming, and workplace joy',
    tagline: {
      mono: 'A developer',
      serif: 'who builds culture',
      hand: 'as carefully as code.',
    },
    variant: 'vibes',
    icons: ['sparkles', 'puzzle', 'users'],
    intro: [
      "This is the part of my CV that doesn't fit on a normal CV, but it's honestly some of the work I'm most proud of.",
      'At every workplace I\'ve been part of, I\'ve ended up being the person who makes it fun to be there. Not in a "mandatory fun" corporate way — in a genuine, grassroots, "people actually look forward to this" way. I\'ve run social clubs, created alternate reality games for the office, designed and hosted events, built Slack bots for fun, organised creative challenges, and generally been the person who turns a group of colleagues into an actual community.',
      "I take this seriously because I've seen what it does. Teams that enjoy being together do better work. People who feel connected to their workplace stay longer. Culture isn't a ping pong table — it's the feeling that someone gives a damn about making this place good.",
      "If your company has an Employee Experience, Culture, Internal Comms, or Engagement role — or if you're an agency that knows the value of good vibes — I'm your guy.",
    ],
    skills: [
      'Social Club Design & Management',
      'Event Planning & Hosting',
      'ARG (Alternate Reality Game) Design',
      'Interactive Experience Creation',
      'Trivia & Game Design',
      'Creative Challenge Curation',
      'Internal Communications',
      'Community Building',
      'Puzzle Design',
      'Creative Writing',
    ],
    experienceIds: ['isobar', 'clemenger', 'honest-fox', 'cvo-off-the-clock'],
    contentSection: {
      heading: 'The vibes archive',
      items: [
        {
          title: 'The Easter Bunny who leaked company secrets.',
          description:
            'I was asked to organise an Easter egg hunt at Isobar. Naturally, I overengineered it. I used my eDM skills to build a fake internal email — proper HTML template, spoofed sender address, indistinguishable from the real thing — from "Easter J. Bunny," a recently fired employee who still had access to the email system. Throughout the day he sent emails that were actually clues to hidden egg locations. Management was slowly replacing the office plants with fake ones? Eggs buried in the planter soil. They didn\'t actually read the suggestion box? Chocolates stashed inside it. By the end of the day, the character had a change of heart and asked for his job back.',
        },
        {
          title: 'A fake travel agency, hidden codes, and office-wide assassination.',
          description:
            'The office ran a Hunger Games elimination game — secret targets, innocuous weapons, stealth kills. I was knocked out on a technicality and given the job of distributing immunity idols however I saw fit. In two days I built "Panem Travel" — a fake travel agency with a real website and email account, filled with Hunger Games imagery and copy. Immunity clues were hidden in bolded letters spelling secret messages, images with steganographic data (and a decoder link buried in the copy), and auto-response emails triggered by the website\'s contact form. Multi-channel, fully interactive, built over a weekend.',
        },
        {
          title: 'Five clubs, a live auction, and eventually, the onboarding deck.',
          description:
            "Over eight years at Isobar I started the Whisky Club (shared cabinet, membership fees, Friday tastings), Burger Club (group orders, a Tumblr review blog, a custom McDonald's menu-hack outing before \"Create Your Taste\" was a thing), Board Games Club (Friday meetups, a donated office game library), and Film Club — where the title was kept secret, I'd send cryptic clues in the lead-up, the first correct guess won a Blu-ray, and I'd write a personal introduction and bring themed food I'd made at home. All out of my own pocket. I also overhauled the annual charity art auction — replaced a broken online bidding system with a live auction that raised thousands more for charity. Eventually the CEO had official logos designed for each club, added them to the onboarding documentation, and used them to win industry culture awards. It all started with one person and a bottle of whisky.",
        },
      ],
    },
  },
  {
    slug: 'the-full-picture',
    title: 'The Full Picture',
    shortDesc: '',
    subtitle: 'Dan Napoleoni · Frontend Developer · Melbourne, Australia',
    contactHeading: 'Read enough?',
    intro: [
      'Frontend developer with 15+ years of experience across the full evolution of web development — from Flash and interactive media through to modern React, TypeScript, and Vue.js applications. Strong UX instincts, clear communicator, and genuine collaborator. Experienced across agency and product environments with deep expertise in digital marketing production alongside modern frontend engineering.',
      'A developer who thinks like a designer and communicates like a human.',
    ],
    skills: [
      'React',
      'TypeScript',
      'Vue.js',
      'JavaScript (ES6+)',
      'HTML5 / Semantic HTML',
      'CSS3 / SCSS / Tailwind',
      'Next.js',
      'Nuxt',
      'Quasar',
      'Laravel',
      'GSAP',
      'REST APIs',
      'GraphQL',
      'Git',
      'Agile / Scrum',
      'Figma → Code',
      'Responsive Design',
      'WCAG Accessibility',
      'Headless CMS (Storyblok, DatoCMS, Craft CMS)',
      'AI-Assisted Development (Claude, Copilot, Cursor)',
      'Salesforce Marketing Cloud',
      'eDM Design & Development',
      'HTML Email (Responsive, Cross-client)',
      'Google DV360 / DoubleClick Studio',
      'Dynamic HTML Banners (DCO)',
      'Photoshop / Sketch / Figma',
    ],
    experienceIds: [
      'everest',
      'mira',
      'world-vision',
      'adtorque',
      'honest-fox',
      'bower-house',
      'clemenger',
      'freelance-contract',
      'isobar',
      'cre8ive',
    ],
    contentSection: {
      heading: 'Also',
      items: [
        {
          description:
            "Beyond the day job: lifelong game design enthusiast with a trail of prototypes — from custom HeroQuest campaigns to mobile experiments with AI-assisted development. Puzzle and ARG designer who once built a city-spanning birthday treasure hunt involving a locked briefcase, a spy bag-swap on a park bench, black-light ink, mysterious packages hidden in local businesses and a casino mission. Creative writer — completed an AFTRS screenplay course, currently a member of Unsolicited Musings writing collective. Recently designed a variable-difficulty cryptic crossword system for a friend's D&D campaign. Self-appointed Chief Vibes Officer at every workplace I've been part of. I believe culture isn't a perk — it's infrastructure.",
        },
      ],
    },
  },
];

/** Resolve a single experience for a given role */
function resolveExperience(id: string, roleId: string): ResolvedTimelineEntry | null {
  const exp = experiences.find((e) => e.id === id);
  if (!exp) return null;
  return {
    date: resolveVariant(exp.date, roleId),
    role: resolveVariant(exp.role, roleId),
    company: exp.company,
    type: exp.type,
    description: resolveVariant(exp.description, roleId),
  };
}

/** Get resolved timeline entries for any role (including CV) */
export function getTimelineForRole(roleSlug: string): ResolvedTimelineEntry[] {
  const role = getRoleBySlug(roleSlug);
  if (!role) return [];
  return role.experienceIds
    .map((id) => resolveExperience(id, roleSlug))
    .filter((e): e is ResolvedTimelineEntry => e !== null);
}

export function getRoleBySlug(slug: string): RoleData | undefined {
  return roles.find((r) => r.slug === slug);
}

export function getDisplayRoles(): RoleData[] {
  return navRoleSlugs
    .map((slug) => roles.find((r) => r.slug === slug))
    .filter((r): r is RoleData => r !== undefined);
}

export function getOtherRoles(currentSlug: string): RoleData[] {
  return getDisplayRoles().filter((r) => r.slug !== currentSlug);
}

export function getPdfForSlug(slug?: string): { href: string; label: string } {
  if (!slug || slug === 'the-full-picture') {
    return { href: '/Dan-Napoleoni-CV.pdf', label: 'Download CV' };
  }
  const role = getRoleBySlug(slug);
  if (role) {
    return { href: `/Dan-Napoleoni-CV-${slug}.pdf`, label: `Download CV - ${role.title}` };
  }
  return { href: '/Dan-Napoleoni-CV.pdf', label: 'Download CV' };
}
