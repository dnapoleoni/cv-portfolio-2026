import type { RoleVariant, ResolvedTimelineEntry } from '@/types';
import { experiences } from '@/data/experiences';

/**
 * Resolve a RoleVariant field for a given role.
 * A RoleVariant is either a plain string (universal) or an array of
 * { id, value } pairs for role-specific copy. Resolution order:
 * exact role match → 'default' entry → first entry.
 */
export function resolveVariant(field: RoleVariant, roleId: string): string {
  if (typeof field === 'string') return field;
  const match = field.find((v) => v.id === roleId);
  if (match) return match.value;
  const defaultMatch = field.find((v) => v.id === 'default');
  if (defaultMatch) return defaultMatch.value;
  return field[0].value;
}

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

/** Get resolved timeline entries for a role */
export function getTimelineForRole(
  experienceIds: string[],
  roleSlug: string
): ResolvedTimelineEntry[] {
  return experienceIds
    .map((id) => resolveExperience(id, roleSlug))
    .filter((e): e is ResolvedTimelineEntry => e !== null);
}

/** Get formatted role type label */
export function getTypeLabel(type?: string) {
  switch (type) {
    case 'freelance':
      return 'Freelance';
    case 'contract':
      return 'Contract';
    case 'redundancy':
      return 'Role made redundant';
    default:
      return null;
  }
}
