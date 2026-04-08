'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';
import { AppShell } from '@/components/layout/AppShell';
import { useSidebar } from '@/hooks/useSidebar';
import { useAuthStore } from '@/lib/store';

const PUBLIC_PATHS = ['/super/login', '/super/forgot-password', '/super/login-success'];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token } = useAuthStore();
  const [checked, setChecked] = useState(false);
  const { isOpen, toggle, close } = useSidebar();

  const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p));

  useEffect(() => {
    if (isPublic) { setChecked(true); return; }
    const token = localStorage.getItem('c365_token');
    const role  = localStorage.getItem('c365_role');
    if (!token || role !== 'super_admin') {
      router.replace('/super/login');
    } else {
      setChecked(true);
    }
  }, [pathname, isPublic, router]);

  if (isPublic) return <>{children}</>;
  if (!checked) return null;

  const logoContent = (
    <span style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>
      Campaign <span style={{ color: '#2563EB' }}>365</span>
    </span>
  );

  return (
    <AppShell
      sidebarContent={<SuperAdminSidebar onClose={close} />}
      isOpen={isOpen}
      onToggle={toggle}
      onClose={close}
      logoContent={logoContent}
      primaryColor="#2563EB"
      showBottomNav={false}
    >
      {children}
    </AppShell>
  );
}
