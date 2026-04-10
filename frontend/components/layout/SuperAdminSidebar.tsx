'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import {
  LayoutDashboard, Building2, CreditCard, BarChart3, Shield,
  Settings, LogOut, Zap, Activity, Palette, Flag, FileText,
  Globe, Users, Wifi, Key, Mail,
} from 'lucide-react';

const NAV = [
  { href: '/super/dashboard',          label: 'Dashboard',            icon: LayoutDashboard },
  { href: '/super/tenants',            label: 'Clients & Tenants',    icon: Building2 },
  { href: '/super/subscription-tiers', label: 'Subscription Tiers',   icon: CreditCard },
  { href: '/super/feature-flags',      label: 'Feature Flags',        icon: Flag },
  { href: '/super/branding',           label: 'White-Label Branding', icon: Palette },
  { href: '/super/analytics',          label: 'Analytics',            icon: BarChart3 },
  { href: '/super/roles',              label: 'Roles & Permissions',  icon: Users },
  { href: '/super/ai-controls',        label: 'AI Controls',          icon: Activity },
  { href: '/super/compliance',         label: 'Compliance',           icon: Shield },
  { href: '/super/billing',            label: 'Billing',              icon: CreditCard },
  { href: '/super/api-management',     label: 'API Management',       icon: Key },
  { href: '/super/email-templates',    label: 'Email Templates',      icon: Mail },
  { href: '/super/audit-logs',         label: 'Audit Logs',           icon: FileText },
  { href: '/super/offline-controls',   label: 'Offline Controls',     icon: Wifi },
  { href: '/super/platform-health',    label: 'Platform Health',      icon: Globe },
  { href: '/super/settings',           label: 'Settings',             icon: Settings },
];

interface SuperAdminSidebarProps {
  onClose: () => void;
}

/**
 * Renders sidebar CONTENT only.
 * Positioning (fixed, slide) is handled by AppShell.
 */
export function SuperAdminSidebar({ onClose }: SuperAdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, branding } = useAuthStore();
  const isDesktop = useIsDesktop();

  const platformName = branding?.name || 'Campaign 365';
  const logoUrl = branding?.logo_url;

  const handleLogout = () => { logout(); router.push('/super/login'); };
  const handleNavClick = () => { if (!isDesktop) onClose(); };

  return (
    <div style={{ height: '100%', backgroundColor: '#0F172A', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div style={{ padding: '22px 16px 18px', flexShrink: 0, borderBottom: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
            {logoUrl
              ? <img src={logoUrl} alt={platformName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <Zap size={18} color="white" />}
          </div>
          <div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 14, color: 'white', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              {platformName.includes('365') ? (
                <>
                  {platformName.replace('365', '')}<span style={{ color: '#2563EB' }}>365</span>
                </>
              ) : platformName}
            </span>
            <p style={{ fontWeight: 500, fontSize: 11, color: '#2563EB', margin: '2px 0 0', whiteSpace: 'nowrap' }}>
              Super Admin
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 10px', overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} onClick={handleNavClick}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', marginBottom: 2, fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', ...(active ? { backgroundColor: '#2563EB', color: 'white' } : { color: '#94A3B8' }) }}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1E293B'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8'; } }}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid #1E293B', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', marginBottom: 6 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'white', fontSize: 12, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Super Admin'}</p>
            <p style={{ fontSize: 11, color: '#2563EB', margin: '1px 0 0' }}>Platform Owner</p>
          </div>
        </div>
        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', width: '100%', borderRadius: 10, border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: 14, fontWeight: 500 }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1E293B'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8'; }}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
