import type { Theme } from '@/types';
import { themes } from '@/data/themes';

/** Return a theme by ID, falling back to the first theme if not found. */
export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
