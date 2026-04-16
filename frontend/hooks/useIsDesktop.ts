'use client';
import { useState, useEffect } from 'react';

/**
 * Returns true when window width >= breakpoint (default 1024px).
 * Starts false (mobile-first) and updates after mount.
 * Use this instead of Tailwind lg: responsive classes for critical layout logic.
 */
export function useIsDesktop(breakpoint = 1024): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : false
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= breakpoint);
    check(); // Run immediately on mount
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isDesktop;
}
