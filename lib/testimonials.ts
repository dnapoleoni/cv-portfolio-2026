import type { ResolvedTestimonial } from '@/types';
import { testimonials } from '@/data/testimonials';

// Role pages — only quotes tagged for that specific role
export function getTestimonialsForRole(slug: string): ResolvedTestimonial[] {
  return testimonials.flatMap((t) =>
    t.quotes
      .filter((q) => q.relevantRoles.includes(slug))
      .map((q) => ({
        quote: q.text,
        name: t.name,
        role: t.role,
        company: t.company,
        contactable: t.contactable,
      }))
  );
}

// Homepage + full CV — all quotes from everyone
export function getFeaturedTestimonials(limit: number): ResolvedTestimonial[] {
  const featured = testimonials.map((t) => {
    const general = t.quotes.find((q) => q.relevantRoles.length === 0);
    const randomIndex = Math.floor(Math.random() * t.quotes.length);
    const quote = general ?? t.quotes[randomIndex];
    return {
      quote: quote.text,
      name: t.name,
      role: t.role,
      company: t.company,
      contactable: t.contactable,
    };
  });
  return featured.slice(0, limit);
}

// Contact page — one quote per contactable person who has a quote for the from-route
export function getContactTestimonials(slug?: string): ResolvedTestimonial[] {
  return testimonials
    .filter((t) => t.contactable)
    .filter((t) => (slug ? t.quotes.some((q) => q.relevantRoles.includes(slug)) : true))
    .map((t) => {
      const matchingQuote = slug
        ? t.quotes.find((q) => q.relevantRoles.includes(slug))
        : t.quotes[0];
      return {
        quote: matchingQuote?.text ?? t.quotes[0].text,
        name: t.name,
        role: t.role,
        company: t.company,
        contactable: t.contactable,
      };
    });
}
