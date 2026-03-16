import type { ContentItem } from '@/types';
import { contentItems } from '@/data/content-items';

/** Resolve content items from a list of IDs */
export function getContentItems(itemIds: string[]): ContentItem[] {
  return itemIds
    .map((id) => contentItems.find((item) => item.id === id))
    .filter((item): item is ContentItem => item !== undefined);
}

/** Get all titled content items — used by the future portfolio/work page. */
export function getAllCaseStudies(): ContentItem[] {
  return contentItems.filter((item) => item.title !== undefined);
}
