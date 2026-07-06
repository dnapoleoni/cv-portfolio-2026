import type { RoleVariant } from '@/types';

interface Experience {
  id: string;
  date: RoleVariant;
  role: RoleVariant;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent' | 'freelance';
  description: RoleVariant;
}

export const experiences: Experience[] = [
  {
    id: 'sqt',
    date: '2026 - Current',
    role: 'Software Engineer',
    company: 'Saturday Quiz Time',
    type: 'freelance',
    description:
      'Frontend UI updates and analytics integration for an interactive puzzle platform — GTM tracking for social sharing and communications, Mixpanel event fixes, plus Stripe and Supabase work across the stack.',
  },
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
      { id: 'digital-marketer', value: 'eDM & Banner Developer' },
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
        id: 'digital-marketer',
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
      { id: 'default', value: 'Various Contracts' },
      { id: 'digital-marketer', value: 'eDM & Banner Developer' },
    ],
    company: 'The Royals, Trout, Cummins & Partners',
    type: 'contract',
    description: [
      {
        id: 'default',
        value:
          'Contracts across three agencies. At The Royals: dynamic HTML banner suites for AustralianSuper (adopted by Google as a DV360 showcase), Athena Home Loans, Deakin University, Intel and REA Group, plus eDMs for Spotify and Mercedes-Benz. At Trout: product page builds for Reece Group. At Cummins & Partners: dynamic banners for SpecSavers.',
      },
      {
        id: 'digital-marketer',
        value:
          'Built a content-agnostic master banner template for AustralianSuper — dynamic frame count, timing, images, transitions, fonts, urls — all controlled through a data feed. The client could roll out completely new campaigns without any developer involvement. It happened to coincide with Google launching their DV360 platform, and my implementation was included in their showcase for what the new system could do. A year later The Royals reached out to say the client was still running every campaign through my template, and was looking for minor branding updates to continue use of the template system.',
      },
    ],
  },
  {
    id: 'isobar',
    date: '2009 - 2017',
    role: [
      { id: 'default', value: 'Developer' },
      { id: 'digital-marketer', value: 'eDM & Banner Developer' },
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
        id: 'digital-marketer',
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
