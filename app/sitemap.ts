import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://danielnapoleoni.dev';
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/frontend-developer`, lastModified: new Date() },
    { url: `${base}/digital-marketer`, lastModified: new Date() },
    { url: `${base}/ux-engineer`, lastModified: new Date() },
    { url: `${base}/chief-vibes-officer`, lastModified: new Date() },
    { url: `${base}/the-full-picture`, lastModified: new Date() },
    { url: `${base}/work`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
