import type { Testimonial } from '@/types';

/**
 * PLACEHOLDER TESTIMONIALS
 * Replace these with real quotes once you've gotten consent from your references.
 * The structure supports both the homepage carousel and role-specific filtering.
 */
export const testimonials: Testimonial[] = [
  {
    name: 'Nick Zuccarelli',
    role: 'Fullstack Software Engineer',
    company: 'Mira',
    contactable: true,
    quotes: [
      {
        text: 'Dan is great, has a go-get-em attitude to all his work and great to collaborate with. Highly recommend.',
        relevantRoles: [],
      },
      {
        text: 'Great VueJS skills 👍',
        relevantRoles: ['frontend-developer'],
      },
      {
        text: 'Great UX skills. Did a great deep dive of the Mira application and help assisted with usability issues.',
        relevantRoles: ['ux-engineer'],
      },
      {
        text: 'Awesome culture fit and a really positive attitude.',
        relevantRoles: ['chief-vibes-officer'],
      },
    ],
  },
  {
    name: 'Juan Ojeda',
    role: 'Consultant',
    company: 'Everest Engineering',
    contactable: false,
    quotes: [
      {
        text: "Dan brings an energy to a team that is hard to quantify, but very easy to love. He's a systems thinker, and has a deep conviction for great user experience backed by a strong attention to detail. He also has a strong sense of culture building, and knows how to bring the vibes.",
        relevantRoles: ['ux-engineer', 'chief-vibes-officer'],
      },
    ],
  },
  {
    name: 'Clint McIntyre',
    role: 'CEO and Co-Founder',
    company: 'Honest Fox',
    contactable: false,
    quotes: [
      {
        text: 'Dan is a joy to work with, great guy, works well with others.',
        relevantRoles: [],
      },
      {
        text: 'Solid front end developer, who excels when placed in orginsatiosn that have strong processses to get the best out of him.',
        relevantRoles: ['frontend-developer'],
      },
      {
        text: "Dan is always bringing the good vibes, he is a people person and always contributes to the vibe of the office. It's his superpower.",
        relevantRoles: ['chief-vibes-officer'],
      },
    ],
  },
  {
    name: 'Jim Yencken',
    role: 'Head of Product Design',
    company: 'Splose',
    contactable: false,
    quotes: [
      {
        text: 'Dan was a pleasure to work with. He brought openness and care to every interaction, communicated clearly and made the people around him feel like they were in safe hands.',
        relevantRoles: [],
      },
      {
        text: "One of the best frontend engineers I've had the privilege of working with.",
        relevantRoles: ['frontend-developer'],
      },
      {
        text: "Dan wasn't just executing tickets - he was thinking carefully about the visual output and sweating the details in a way that designers genuinely appreciate.",
        relevantRoles: ['ux-engineer'],
      },
    ],
  },
];
