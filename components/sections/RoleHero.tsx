import type { Tagline } from '@/types';

interface RoleHeroProps {
  tagline: Tagline;
}

export function RoleHero({ tagline }: RoleHeroProps) {
  return (
    <section className="hero hero--tagline" aria-labelledby="role-hero-heading">
      <h1 id="role-hero-heading" className="hero-tagline">
        <span className="tagline-developer">{tagline.mono}</span>{' '}
        <span className="tagline-designer">{tagline.serif}</span>{' '}
        <span className="tagline-human">{tagline.hand}</span>
      </h1>
    </section>
  );
}
