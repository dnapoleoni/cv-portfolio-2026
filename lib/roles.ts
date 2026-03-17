import type { RoleData } from '@/types';
import { roles, navRoleSlugs } from '@/data/roles';

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

/** Return the correct PDF href and download label for a role slug.
 *  Falls back to the general CV for unknown slugs or 'the-full-picture'. */
export function getPdfForSlug(slug?: string): { href: string; label: string } {
  if (!slug || slug === 'the-full-picture') {
    return { href: '/pdfs/Dan-Napoleoni-CV.pdf', label: 'Download CV' };
  }
  const role = getRoleBySlug(slug);
  if (role) {
    return { href: `/pdfs/Dan-Napoleoni-CV-${slug}.pdf`, label: `Download CV - ${role.title}` };
  }
  return { href: '/pdfs/Dan-Napoleoni-CV.pdf', label: 'Download CV' };
}
