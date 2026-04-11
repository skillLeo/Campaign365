'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TenantSidebar } from '@/components/layout/TenantSidebar';
import { AppShell } from '@/components/layout/AppShell';
import { PanicAlertModal } from '@/components/PanicAlertModal';
import { useSidebar } from '@/hooks/useSidebar';
import { getCurrentTenantTheme, applyTenantTheme, TenantTheme, tenantThemes } from '@/lib/tenantTheme';
import { useAuthStore } from '@/lib/store';

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState<TenantTheme>(tenantThemes.default);
  const { isOpen, toggle, close } = useSidebar();
  const { branding, setBranding } = useAuthStore();

  // Auth check — runs once on mount
  useEffect(() => {
    const token = localStorage.getItem('c365_token');
    const role  = localStorage.getItem('c365_role');
    if (!token || !role || role === 'super_admin') {
      router.replace('/login');
    } else {
      const tenantKey = localStorage.getItem('c365_tenant') || 'sknlp';
      let t = getCurrentTenantTheme(); // reads c365_tenant from localStorage
      const b = useAuthStore.getState().branding;

      if (b?.primary_color && b?.subdomain === tenantKey) {
        // Branding belongs to this tenant — use user's saved customisation
        t = {
          ...t,
          primary:     b.primary_color,
          primaryDark: b.primary_color,
          sidebar:     b.secondary_color || t.sidebar,
          name:        b.name || t.name,
        };
      } else {
        // Stale / missing branding — reset Zustand to correct tenant defaults
        // so every page reading branding?.primary_color gets the right color
        setBranding({
          name:            t.name,
          party_name:      t.fullName,
          logo_url:        b?.logo_url || null,
          primary_color:   t.primary,
          secondary_color: t.sidebar,
          font:            'Inter',
          subdomain:       tenantKey,
        });
      }

      applyTenantTheme(t);
      setTheme(t);
      setChecked(true);
    }
  }, [router, setBranding]);

  // Reactively update theme + CSS variables whenever branding changes
  useEffect(() => {
    if (!branding?.primary_color) return;
    setTheme(prev => {
      const next = {
        ...prev,
        primary:     branding.primary_color,
        sidebar:     branding.secondary_color || prev.sidebar,
        name:        branding.name || prev.name,
      };
      applyTenantTheme(next);
      return next;
    });
  }, [branding?.primary_color, branding?.secondary_color, branding?.name]);

  // Listen to branding-updated event (dispatched by super admin branding page)
  useEffect(() => {
    const handler = () => {
      const b = useAuthStore.getState().branding;
      if (!b?.primary_color) return;
      setTheme(prev => {
        const next = {
          ...prev,
          primary: b.primary_color,
          sidebar: b.secondary_color || prev.sidebar,
          name:    b.name || prev.name,
        };
        applyTenantTheme(next);
        return next;
      });
    };
    window.addEventListener('branding-updated', handler);
    return () => window.removeEventListener('branding-updated', handler);
  }, []);

  if (!checked) return null;

  const logoUrl = branding?.logo_url;
  const partyName = branding?.name || theme.name;

  const logoContent = (
    <>
      <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
        {logoUrl
          ? <img src={logoUrl} alt={partyName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ color: 'white', fontSize: 8, fontWeight: 900 }}>
              {theme.logoText?.slice(0, 2) || theme.name.slice(0, 2)}
            </span>}
      </div>
      <span style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>{partyName}</span>
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
