'use client';

import { useEffect } from 'react';

export function useEscapeKey(callback: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') callback();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [callback, active]);
}
