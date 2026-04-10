'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import {
  LayoutDashboard, Users, Megaphone, Map, Navigation, Car,
  Target, Mail, DollarSign, CalendarDays, ClipboardList,
  BarChart3, Settings, LogOut, BellRing, ShieldCheck, Brain,
  UserCog, Smartphone, HelpCircle, Palette, Phone, Signpost,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { TenantTheme } from '@/lib/tenantTheme';

const navItems = [
  { href: '/dashboard',     label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/campaigns',     label: 'Campaigns',       icon: Megaphone },
  { href: '/voters',        label: 'Voters',          icon: Users },
  { href: '/canvassing',    label: 'Canvassing',      icon: Map },
  { href: '/tracking',      label: 'Live Tracking',   icon: Navigation },
  { href: '/runners',       label: 'Runners',         icon: Car },
  { href: '/gotv',          label: 'GOTV Command',    icon: Target },
  { href: '/phone-bank',    label: 'Phone Bank',      icon: Phone },
  { href: '/outdoor-agent', label: 'Outdoor Agent',   icon: Signpost },
  { href: '/team',          label: 'Team',            icon: UserCog },
  {
    href: '/communications', label: 'Communications', icon: Mail,
    children: [
      { href: '/communications/email',    label: 'Email' },
      { href: '/communications/sms',      label: 'SMS' },
      { href: '/communications/whatsapp', label: 'WhatsApp' },
    ],
  },
  { href: '/fundraising',   label: 'Fundraising',     icon: DollarSign },
  { href: '/events',        label: 'Events',          icon: CalendarDays },
  { href: '/polling',       label: 'Polling',         icon: ClipboardList },
  { href: '/ai',            label: 'AI Insights',     icon: Brain },
  {
    href: '/reports', label: 'Reports', icon: BarChart3,
    children: [
      { href: '/reports/performance', label: 'Performance' },
      { href: '/reports/compliance',  label: 'Compliance' },
    ],
  },
  { href: '/compliance',    label: 'Data Compliance', icon: ShieldCheck },
  { href: '/mobile-apps',   label: 'Mobile Apps',     icon: Smartphone },
  { href: '/notifications', label: 'Notifications',   icon: BellRing },
  { href: '/branding',      label: 'Party Profile',   icon: Palette },
  { href: '/help',          label: 'Help & Support',  icon: HelpCircle },
  { href: '/settings',      label: 'Settings',        icon: Settings },
];

interface TenantSidebarProps {
  theme: TenantTheme;
  /** Called when a nav link is clicked (closes sidebar on mobile) */
  onClose: () => void;
}

/**
 * Renders sidebar CONTENT only.
 * Positioning (fixed, slide animation) is handled entirely by AppShell.
 */
export function TenantSidebar({ theme, onClose }: TenantSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, branding } = useAuthStore();
  const isDesktop = useIsDesktop();

  // Dynamic branding: prefer values from store (set by BrandingProvider / admin)
  const logoUrl = branding?.logo_url;
  const partyName = branding?.name || theme.name;
  const [expanded, setExpanded] = useState<string[]>(['/communications', '/reports']);

  const storedUser = typeof window !== 'undefined'
    ? (() => { try { return JSON.parse(localStorage.getItem('c365_user') || '{}'); } catch { return {}; } })()
    : {};
  const storedRole = typeof window !== 'undefined'
    ? (localStorage.getItem('c365_role') || 'general_secretary')
    : 'general_secretary';
  const displayName = storedUser?.name || user?.name || 'General Secretary';

  const P = theme.primary;   // primary color shorthand
  const BG = theme.sidebar;  // sidebar background

  const roleLabel: Record<string, string> = {
    general_secretary: 'General Secretary',
    campaign_manager:  'Campaign Manager',
    campaign_director: 'Campaign Director',
    region_manager:    'Region Manager',
    branch_manager:    'Branch Manager',
    data_manager:      'Data Manager',
    phone_bank:        'Phone Bank Agent',
    runner:            'Runner',
    canvasser:         'Canvasser',
    candidate:         'Political Candidate',
    outdoor_agent:     'Outdoor Agent',
    field_organizer:   'Field Organizer',
    super_admin:       'Super Admin',
  };

  const handleLogout = () => { logout(); router.push('/login'); };
  const handleNavClick = () => { if (!isDesktop) onClose(); };
  const toggleExpand = (h: string) =>
    setExpanded(p => p.includes(h) ? p.filter(x => x !== h) : [...p, h]);

  return (
    <div style={{ height: '100%', backgroundColor: BG, display: 'flex', flexDirection: 'column' }}>
      {/* Branding */}
      <div style={{ padding: '16px 14px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: P, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
            {logoUrl
              ? <img src={logoUrl} alt={partyName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ color: 'white', fontSize: 10, fontWeight: 900 }}>
                  {theme.logoText?.slice(0, 2) || theme.name.slice(0, 2)}
                </span>}
          </div>
          <div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 13, margin: 0, whiteSpace: 'nowrap' }}>{partyName}</p>
            <p style={{ color: '#64748B', fontSize: 9, margin: '2px 0 0' }}>Campaign 365</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: P, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0 }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'white', fontSize: 12, fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</p>
            <p style={{ color: '#64748B', fontSize: 10, margin: '2px 0 0' }}>{roleLabel[storedRole] || storedRole}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin' }}>
        {navItems.map(({ href, label, icon: Icon, children }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          const isExpanded = expanded.includes(href);
          const hasChildren = !!(children?.length);

          return (
            <div key={href}>
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(href)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', backgroundColor: active ? P + '25' : 'transparent', color: active ? P : '#94A3B8', textAlign: 'left', marginBottom: 2 }}
                >
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{label}</span>
                  <ChevronRight size={12} style={{ flexShrink: 0, transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'none' }} />
                </button>
              ) : (
                <Link
                  href={href}
                  onClick={handleNavClick}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, textDecoration: 'none', marginBottom: 2, fontSize: 13, fontWeight: 500, ...(active ? { backgroundColor: P, color: 'white' } : { color: '#94A3B8' }) }}
                  onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2A2A2A'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; } }}
                  onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8'; } }}
                >
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  <span>{label}</span>
                </Link>
              )}

              {hasChildren && isExpanded && (
                <div style={{ paddingLeft: 26, marginBottom: 4 }}>
                  {children!.map(child => {
                    const ca = pathname === child.href || pathname.startsWith(child.href);
                    return (
                      <Link key={child.href} href={child.href} onClick={handleNavClick}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8, textDecoration: 'none', marginBottom: 2, fontSize: 12, ...(ca ? { backgroundColor: P, color: 'white' } : { color: '#64748B' }) }}
                      >
                        <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6, flexShrink: 0 }} />
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '10px 8px', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', width: '100%', borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: 13, fontWeight: 500 }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2A2A2A'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8'; }}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
