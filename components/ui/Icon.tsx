export type IconName =
  | 'menu'
  | 'close'
  | 'download'
  | 'sun'
  | 'moon'
  | 'chevron-left'
  | 'chevron-right';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

type IconDef =
  | { fill: 'none'; path: string; viewBox?: string; strokeWidth?: string }
  | { fill: 'currentColor'; path: string; viewBox?: string };

const icons: Record<IconName, IconDef> = {
  menu: {
    fill: 'none',
    path: 'M4 6h16M4 12h16M4 18h16',
    strokeWidth: '2',
  },
  close: {
    fill: 'none',
    path: 'M18 6L6 18M6 6l12 12',
    strokeWidth: '2',
  },
  download: {
    fill: 'none',
    path: 'M8 2v8m0 0l-3-3m3 3l3-3M3 12h10',
    viewBox: '0 0 16 16',
    strokeWidth: '1.5',
  },
  sun: {
    fill: 'currentColor',
    path: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z',
  },
  moon: {
    fill: 'currentColor',
    path: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z',
  },
  'chevron-left': {
    fill: 'none',
    path: 'M15 18l-6-6 6-6',
    strokeWidth: '2',
  },
  'chevron-right': {
    fill: 'none',
    path: 'M9 18l6-6-6-6',
    strokeWidth: '2',
  },
};

export function Icon({ name, size = 24, className }: IconProps) {
  const icon = icons[name];
  const viewBox = icon.viewBox ?? '0 0 24 24';

  if (icon.fill === 'currentColor') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={icon.strokeWidth ?? '2'}
      aria-hidden="true"
      className={className}
    >
      <path d={icon.path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
