'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const defaultTransform = (pathname: string): string | null => {
  const clean = pathname.replace(/^\//, '');
  return clean || null;
};

export function ContextLink({
  href,
  param = 'from',
  transform = defaultTransform,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  param?: string;
  transform?: (pathname: string) => string | null;
}) {
  const pathname = usePathname();
  const value = transform(pathname);
  const separator = String(href).includes('?') ? '&' : '?';
  const contextHref = value ? `${href}${separator}${param}=${value}` : String(href);

  return (
    <Link href={contextHref} className={className} {...props}>
      {children}
    </Link>
  );
}
