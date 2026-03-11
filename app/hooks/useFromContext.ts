'use client';

import { useSearchParams } from 'next/navigation';

export function useFromContext(param = 'from') {
  const searchParams = useSearchParams();
  const value = searchParams.get(param) || '';

  return {
    value,
    backHref: value ? `/${value}` : '/',
  };
}
