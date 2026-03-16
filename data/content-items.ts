import type { ContentItem } from '@/types';

export const contentItems: ContentItem[] = [
  // Frontend Developer — "How I work"
  {
    id: 'fe-flow-modal',
    title: 'I see repetitive patterns and build systems instead.',
    description:
      'At Splose, I was tasked with implementing new 2FA modal flows. The designs had multiple variations with repetitive elements and inconsistencies between them — building each one individually would have meant messy, redundant code and a maintenance headache for whoever came next. So instead of just building what was in front of me, I designed a reusable "FlowModal" engine that separated the data layer from the modal management from the individual steps. Future devs can now create new flows, edit existing ones, and run A/B tests without touching the underlying architecture. I wrote full documentation so the system would outlive my contract. It\'s a pattern I keep coming back to — I\'d rather spend a bit more time building something properly than contribute to technical debt.',
  },
  {
    id: 'fe-honest-fox-cms',
    title: 'I tend to go beyond the brief when it makes sense.',
    description:
      "At Honest Fox, I was rebuilding the agency website in Vue, Nuxt and Storyblok. The original plan was to hard-code most pages and only make the blog CMS-editable. But once I started mapping the design components to Storyblok's content model, I realised the extra effort to make everything editable was relatively small — and since the designs were already built on reusable components, it made sense to go the whole way. I built a full page-builder system: the team could create entirely new landing pages, rearrange layouts, experiment with CTA placement — not just edit blog posts. The scope grew organically as the team saw what was possible, and the end result was a site they could manage and evolve entirely on their own.",
  },

  // Digital Marketing — "Achievements"
  {
    id: 'dm-auspost-overhaul',
    title: 'Redesigning how Australia Post briefed and built emails.',
    description:
      'I was the sole developer on the Australia Post email program at Isobar for over two years — marketing, transactional, the lot. The process was painful: incomplete briefs from multiple client teams, small tweaks treated the same as full custom builds, and no shared language for what we were actually making. So I proposed a complete overhaul. I built modular email templates mapped to the most common layouts, each with unique IDs and documented content fields. Then I created brief documents that forced the client to fill in only the fields that matched those templates — no ambiguity. Finally, I set up tiered pricing so simple template work was quick and cheap, complex work was scoped properly, and anything outside the system was quoted as custom. It transformed the relationship. Briefs came in clean, turnaround dropped, and I could actually focus on building rather than deciphering what was being asked of me.',
  },
  {
    id: 'dm-aussuper-banners',
    title: 'Building banners so flexible that Google made them a case study.',
    description:
      'At The Royals, I built a master banner template for AustralianSuper that was genuinely content-agnostic — dynamic frame count, timing, images, transitions, fonts, urls — all controlled through a data feed. The client could roll out completely new campaigns without any developer involvement. It happened to coincide with Google launching their DV360 platform, and my implementation was included in their showcase for what the new system could do. A year later The Royals reached out to say the client was still running every campaign through my template, and was looking for minor branding updates to continue use of the template system.',
  },
  {
    id: 'dm-myer-edm',
    title: 'Running the Myer email machine solo.',
    description:
      "At Clemenger, I was the sole developer on a relentless stream of Myer eDMs — full end-to-end ownership from receiving designs through to Salesforce deployment, testing, subscriber lists, scheduling and reporting. The client sent incomplete briefs, changed direction constantly, and had different teams sending conflicting instructions. I became the last quality check in the chain, catching issues and pushing back up the line before writing a single line of code. It wasn't glamorous work, but it taught me that half of production at scale is process discipline, not technical skill.",
  },

  // UX Engineer — "How I work"
  {
    id: 'ux-splose-dashboard',
    title: 'I fill in what the spec leaves out.',
    description:
      "At Splose, I was building a reporting dashboard — revenue, cancellations, practitioner utilisation — under a tight launch deadline. The starting point was a vibe-coded prototype and some static designs, neither of which had been thoroughly thought through from a UX perspective. What happens when there's no data yet? What does the loading state look like? What if a date range returns nothing? None of it was specced. Rather than building exactly what was in front of me and shipping gaps, I made it part of my daily routine to spot what was missing, sketch out solutions, run them past the designers, and build them in. It's slower in the short term. It's dramatically faster than fixing it after launch.",
  },
  {
    id: 'ux-smith-family',
    title: "I build logic when the designs don't have any.",
    description:
      "At Isobar, I was given a set of \"interactive\" designs for The Smith Family's donation portal — screens showing different states of a form, but with no clear logic connecting them. Actions led to dead ends, transitions were ambiguous, and the journey as a whole didn't hold together. Rather than sending it back for another round of revisions, I built a recursive state-machine under the hood: each user action triggered a lookup that could call functions, set states, activate other elements in sequence, and trigger sub-flows. It let me make the whole thing work as a coherent experience without needing the designs to tell me how. On the surface? Just a donation form. Underneath? Something I'm still proud of.",
  },

  // Chief Vibes Officer — "The vibes archive"
  {
    id: 'cvo-easter-bunny',
    title: 'The Easter Bunny who leaked company secrets.',
    description:
      'I was asked to organise an Easter egg hunt at Isobar. Naturally, I overengineered it. I used my eDM skills to build a fake internal email — proper HTML template, spoofed sender address, indistinguishable from the real thing — from "Easter J. Bunny," a recently fired employee who still had access to the email system. Throughout the day he sent emails that were actually clues to hidden egg locations. Management was slowly replacing the office plants with fake ones? Eggs buried in the planter soil. They didn\'t actually read the suggestion box? Chocolates stashed inside it. By the end of the day, the character had a change of heart and asked for his job back.',
  },
  {
    id: 'cvo-panem-travel',
    title: 'A fake travel agency, hidden codes, and office-wide assassination.',
    description:
      'The office ran a Hunger Games elimination game — secret targets, innocuous weapons, stealth kills. I was knocked out on a technicality and given the job of distributing immunity idols however I saw fit. In two days I built "Panem Travel" — a fake travel agency with a real website and email account, filled with Hunger Games imagery and copy. Immunity clues were hidden in bolded letters spelling secret messages, images with steganographic data (and a decoder link buried in the copy), and auto-response emails triggered by the website\'s contact form. Multi-channel, fully interactive, built over a weekend.',
  },
  {
    id: 'cvo-five-clubs',
    title: 'Five clubs, a live auction, and eventually, the onboarding deck.',
    description:
      "Over eight years at Isobar I started the Whisky Club (shared cabinet, membership fees, Friday tastings), Burger Club (group orders, a Tumblr review blog, a custom McDonald's menu-hack outing before \"Create Your Taste\" was a thing), Board Games Club (Friday meetups, a donated office game library), and Film Club — where the title was kept secret, I'd send cryptic clues in the lead-up, the first correct guess won a Blu-ray, and I'd write a personal introduction and bring themed food I'd made at home. All out of my own pocket. I also overhauled the annual charity art auction — replaced a broken online bidding system with a live auction that raised thousands more for charity. Eventually the CEO had official logos designed for each club, added them to the onboarding documentation, and used them to win industry culture awards. It all started with one person and a bottle of whisky.",
  },

  // The Full Picture — "Also" (no title — prose paragraph)
  {
    id: 'full-picture-also',
    description:
      "Beyond the day job: lifelong game design enthusiast with a trail of prototypes — from custom HeroQuest campaigns to mobile experiments with AI-assisted development. Puzzle and ARG designer who once built a city-spanning birthday treasure hunt involving a locked briefcase, a spy bag-swap on a park bench, black-light ink, mysterious packages hidden in local businesses and a casino mission. Creative writer — completed an AFTRS screenplay course, currently a member of Unsolicited Musings writing collective. Recently designed a variable-difficulty cryptic crossword system for a friend's D&D campaign. Self-appointed Chief Vibes Officer at every workplace I've been part of. I believe culture isn't a perk — it's infrastructure.",
  },
];
