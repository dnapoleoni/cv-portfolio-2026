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
    .map((t) => {
      // Try role-specific quote first
      const roleQuote = slug ? t.quotes.find((q) => q.relevantRoles.includes(slug)) : null;
      // Fall back to general quote
      const generalQuote = t.quotes.find((q) => q.relevantRoles.length === 0);
      // Fall back to any quote
      const randomIndex = Math.floor(Math.random() * t.quotes.length);
      const anyQuote = t.quotes[randomIndex];
      // Might have no quotes at all
      const quote = roleQuote ?? generalQuote ?? anyQuote;

      return {
        quote: quote?.text ?? '',
        name: t.name,
        role: t.role,
        company: t.company,
        contactable: t.contactable,
      };
    });
}
