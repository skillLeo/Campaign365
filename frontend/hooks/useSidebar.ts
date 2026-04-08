'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const DESKTOP_BREAKPOINT = 1024;

export function useSidebar() {
  // Start open on desktop, closed on mobile
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= DESKTOP_BREAKPOINT;
    }
    return false; // SSR default — mobile-first
  });

  const pathname = usePathname();

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (window.innerWidth < DESKTOP_BREAKPOINT) {
      setIsOpen(false);
    }
  }, [pathname]);

  // On resize: auto-open when crossing to desktop, auto-close when going mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
  };
}
