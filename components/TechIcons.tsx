import type { TechIconId } from '@/data/roles';
import {
  siReact,
  siTypescript,
  siVuedotjs,
  siJavascript,
  siHtml5,
  siCss,
  siNextdotjs,
  siFigma,
  siGit,
} from 'simple-icons';

/**
 * Brand icons from simple-icons (fill-based, 24x24 viewBox).
 * Non-brand icons use standard SVG paths.
 */

interface IconData {
  path: string;
  title: string;
  viewBox?: string;
}

const brandIcons: Partial<Record<TechIconId, IconData>> = {
  react: { path: siReact.path, title: siReact.title },
  typescript: { path: siTypescript.path, title: siTypescript.title },
  vue: { path: siVuedotjs.path, title: siVuedotjs.title },
  javascript: { path: siJavascript.path, title: siJavascript.title },
  html: { path: siHtml5.path, title: siHtml5.title },
  css: { path: siCss.path, title: siCss.title },
  nextjs: { path: siNextdotjs.path, title: siNextdotjs.title },
  figma: { path: siFigma.path, title: siFigma.title },
  git: { path: siGit.path, title: siGit.title },
};

const customIcons: Partial<Record<TechIconId, IconData>> = {
  salesforce: {
    title: 'Salesforce Marketing Cloud',
    path: 'M8.39 4.8a5.1 5.1 0 0 1 3.93-1.86 5.12 5.12 0 0 1 4.51 2.72 5.7 5.7 0 0 1 2.14-.42C21.76 5.24 24 7.56 24 10.4c0 2.85-2.24 5.16-5.03 5.16-.35 0-.7-.04-1.03-.1a4.1 4.1 0 0 1-3.56 2.1c-.73 0-1.42-.18-2.02-.5a4.76 4.76 0 0 1-4.16 2.46c-2.17 0-4.02-1.47-4.6-3.5-.32.06-.65.1-.99.1C1.16 16.12-1 13.6-1 10.54c0-3.06 2.16-5.58 5.01-5.76a5.1 5.1 0 0 1 4.38-3.18Z',
    viewBox: '-1 -1 26 20',
  },
  accessibility: {
    title: 'Accessibility',
    path: 'M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z',
  },
  sparkles: {
    title: 'Vibes & Culture',
    path: 'M9.5 2l1.5 3.5L14.5 7l-3.5 1.5L9.5 12 8 8.5 4.5 7 8 5.5 9.5 2zm5.5 8l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5L11.5 13l2.5-1 1-2.5zM6 14l.75 1.75L8.5 16.5l-1.75.75L6 19l-.75-1.75L3.5 16.5l1.75-.75L6 14z',
  },
  puzzle: {
    title: 'Puzzle & Games',
    path: 'M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z',
  },
  users: {
    title: 'Community & Team',
    path: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  },
};

const allIcons: Partial<Record<TechIconId, IconData>> = {
  ...brandIcons,
  ...customIcons,
};

interface TechIconProps {
  id: TechIconId;
  size?: number;
  className?: string;
}

export function TechIcon({ id, size = 20, className }: TechIconProps) {
  const icon = allIcons[id];
  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox ?? '0 0 24 24'}
      fill="currentColor"
      role="img"
      aria-label={icon.title}
      className={className}
      style={{ flexShrink: 0 }}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

interface TechIconRowProps {
  icons: TechIconId[];
  size?: number;
}

export function TechIconRow({ icons, size = 18 }: TechIconRowProps) {
  return (
    <div className="tech-icon-row" role="list" aria-label="Technologies">
      {icons.map((id) => (
        <span key={id} role="listitem">
          <TechIcon id={id} size={size} />
        </span>
      ))}
    </div>
  );
}
