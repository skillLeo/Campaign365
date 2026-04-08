'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TenantSidebar } from '@/components/layout/TenantSidebar';
import { AppShell } from '@/components/layout/AppShell';
import { PanicAlertModal } from '@/components/PanicAlertModal';
import { useSidebar } from '@/hooks/useSidebar';
import { getCurrentTenantTheme, applyTenantTheme, tenantThemes, TenantTheme } from '@/lib/tenantTheme';

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState<TenantTheme>(tenantThemes.default);
  const { isOpen, toggle, close } = useSidebar();

  useEffect(() => {
    const token = localStorage.getItem('c365_token');
    const role  = localStorage.getItem('c365_role');
    if (!token || !role || role === 'super_admin') {
      router.replace('/login');
    } else {
      const t = getCurrentTenantTheme();
      applyTenantTheme(t);
      setTheme(t);
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;

  const logoContent = (
    <>
      <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: 'white', fontSize: 8, fontWeight: 900 }}>
          {theme.logoText?.slice(0, 2) || theme.name.slice(0, 2)}
        </span>
      </div>
      <span style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>{theme.name}</span>
    </>
  );

  return (
    <>
      <AppShell
        sidebarContent={<TenantSidebar theme={theme} onClose={close} />}
        isOpen={isOpen}
        onToggle={toggle}
        onClose={close}
        logoContent={logoContent}
        primaryColor={theme.primary}
        showBottomNav={true}
      >
        {children}
      </AppShell>
      <PanicAlertModal />
    </>
  );
}
