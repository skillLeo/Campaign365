'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, Map, BarChart2, DollarSign,
  MessageSquare, UsersRound, ShieldCheck, Settings, Bell,
  LogOut, Megaphone, Navigation, Car, Target, Phone,
  Sparkles, FileBarChart, Calendar, ChevronDown, ChevronRight, HelpCircle,
} from 'lucide-react';
import { TenantTheme } from '@/lib/tenantTheme';

// ─── Nav structure ────────────────────────────────────────────────────────────

interface SubItem {
  href: string;
  label: string;
}

interface NavItem {
  key: string;
  href?: string;           // direct link (no dropdown)
  label: string;
  icon: React.ElementType;
  children?: SubItem[];    // dropdown items
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    key: 'campaigns',
    href: '/campaigns',
    label: 'Campaigns',
    icon: Megaphone,
  },
  {
    key: 'voters',
    label: 'Voters',
    icon: Users,
    children: [
      { href: '/voters',            label: 'Voter List' },
      { href: '/voters/import',     label: 'Import Voters' },
      { href: '/voters/targeting',  label: 'Voter Targeting' },
      { href: '/voters/segments',   label: 'Segments' },
    ],
  },
  {
    key: 'canvassing',
    label: 'Canvassing',
    icon: Map,
    children: [
      { href: '/canvassing',           label: 'Field Operations' },
      { href: '/canvassing/lists',     label: 'Walk Lists' },
      { href: '/canvassing/turf',      label: 'Turf Management' },
      { href: '/canvassing/analytics', label: 'Canvassing Analytics' },
    ],
  },
  {
    key: 'tracking',
    label: 'Live Tracking',
    icon: Navigation,
    children: [
      { href: '/tracking',       label: 'Live Map' },
      { href: '/tracking/panic', label: 'Panic Alerts' },
    ],
  },
  {
    key: 'runners',
    href: '/runners',
    label: 'Runners',
    icon: Car,
  },
  {
    key: 'gotv',
    label: 'GOTV Command',
    icon: Target,
    children: [
      { href: '/gotv',                 label: 'Election Day Live' },
      { href: '/gotv/outdoor-agents',  label: 'Outdoor Agents' },
      { href: '/gotv/turnout',         label: 'Turnout Dashboard' },
    ],
  },
  {
    key: 'phone-bank',
    href: '/phone-bank',
    label: 'Phone Bank',
    icon: Phone,
  },
  {
    key: 'communications',
    label: 'Communications',
    icon: MessageSquare,
    children: [
      { href: '/communications/email',            label: 'Email' },
      { href: '/communications/sms',              label: 'SMS' },
      { href: '/communications/whatsapp',         label: 'WhatsApp' },
      { href: '/communications/social',           label: 'Social Media' },
      { href: '/communications/push',             label: 'Push Notifications' },
      { href: '/communications/social-listening', label: 'Social Listening' },
    ],
  },
  {
    key: 'fundraising',
    label: 'Fundraising',
    icon: DollarSign,
    children: [
      { href: '/fundraising',               label: 'Dashboard' },
      { href: '/fundraising/donors',        label: 'Donors' },
      { href: '/fundraising/events',        label: 'Events' },
      { href: '/fundraising/merchandise',   label: 'Merchandise' },
      { href: '/fundraising/expenditure',   label: 'Expenditure' },
    ],
  },
  {
    key: 'polling',
    label: 'Polling',
    icon: BarChart2,
    children: [
      { href: '/polling',          label: 'Live Polls' },
      { href: '/polling/builder',  label: 'Survey Builder' },
      { href: '/polling/history',  label: 'Historical Data' },
    ],
  },
  {
    key: 'ai',
    label: 'AI Insights',
    icon: Sparkles,
    children: [
      { href: '/ai-insights',                 label: 'Campaign Insights' },
      { href: '/ai-insights/sentiment',      label: 'Sentiment Analysis' },
      { href: '/ai-insights/predictions',    label: 'Voter Predictions' },
      { href: '/ai-insights/talking-points', label: 'Talking Points' },
    ],
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: FileBarChart,
    children: [
      { href: '/reports',               label: 'Party Performance' },
      { href: '/reports/analytics',    label: 'Campaign Analytics' },
      { href: '/reports/fundraising',  label: 'Fundraising Reports' },
      { href: '/reports/leaderboards', label: 'Leaderboards' },
    ],
  },
  {
    key: 'compliance',
    label: 'Compliance',
    icon: ShieldCheck,
    children: [
      { href: '/compliance',           label: 'Data Privacy' },
      { href: '/compliance/election',  label: 'Election Compliance' },
      { href: '/compliance/exports',   label: 'Export Requests' },
    ],
  },
  {
    key: 'team',
    label: 'Team',
    icon: UsersRound,
    children: [
      { href: '/team',                  label: 'All Members' },
      { href: '/team/canvassers',       label: 'Canvassers' },
      { href: '/team/runners',          label: 'Runners' },
      { href: '/team/outdoor-agents',   label: 'Outdoor Agents' },
      { href: '/team/mobile-stats',     label: 'Mobile App Stats' },
    ],
  },
  {
    key: 'events',
    href: '/events',
    label: 'Calendar & Events',
    icon: Calendar,
  },
  {
    key: 'notifications',
    href: '/notifications',
    label: 'Notifications',
    icon: Bell,
  },
  {
    key: 'help',
    href: '/help',
    label: 'Help & Support',
    icon: HelpCircle,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      { href: '/settings',               label: 'Party Profile' },
      { href: '/settings/branding',      label: 'Branding' },
      { href: '/settings/features',      label: 'Feature Flags' },
      { href: '/settings/roles',         label: 'Team & Roles' },
      { href: '/settings/integrations',  label: 'API & Integrations' },
    ],
  },
];

// ─── Helper: which dropdown key contains the current pathname ─────────────────
function getActiveDropdownKey(pathname: string): string | null {
  for (const item of NAV_ITEMS) {
    if (item.children) {
      for (const child of item.children) {
        if (pathname === child.href || pathname.startsWith(child.href + '/')) {
          return item.key;
        }
      }
    }
  }
  return null;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface TenantSidebarProps {
  theme: TenantTheme;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function TenantSidebar({ theme: _theme, onClose }: TenantSidebarProps) {
  const pathname   = usePathname();
  const router     = useRouter();
  const { user, logout } = useAuthStore();
  const isDesktop  = useIsDesktop();

  // Initialise open dropdown to whichever section the current page belongs to
  const [openKey, setOpenKey] = useState<string | null>(() => getActiveDropdownKey(pathname));

  // Keep dropdown in sync if pathname changes (e.g. browser back/forward)
  useEffect(() => {
    const active = getActiveDropdownKey(pathname);
    if (active) setOpenKey(active);
  }, [pathname]);

  const storedUser = typeof window !== 'undefined'
    ? (() => { try { return JSON.parse(localStorage.getItem('c365_user') || '{}'); } catch { return {}; } })()
    : {};
  const storedRole = typeof window !== 'undefined'
    ? (localStorage.getItem('c365_role') || 'general_secretary')
    : 'general_secretary';
  const displayName = storedUser?.name || user?.name || 'Marcus Liburd';

  const roleLabel: Record<string, string> = {
    general_secretary: 'General Secretary',
    campaign_manager:  'Campaign Manager',
    region_manager:    'Region Manager',
    branch_manager:    'Branch Manager',
    data_manager:      'Data Manager',
    phone_bank:        'Phone Bank Agent',
    runner:            'Runner',
    canvasser:         'Canvasser',
    candidate:         'Political Candidate',
    outdoor_agent:     'Outdoor Agent',
    super_admin:       'Super Admin',
  };

  const handleLogout   = () => { logout(); router.push('/login'); };
  const handleNavClick = () => { if (!isDesktop) onClose(); };

  const PRIMARY    = '#DC143C';
  const SIDEBAR_BG = '#0F172A';

  // Is a direct-link item currently active?
  const isDirectActive = (href: string) =>
    href === '/dashboard'
      ? (pathname === '/dashboard' || pathname === '/')
      : pathname === href || pathname.startsWith(href + '/');

  // Is a child route currently active?
  const isChildActive = (childHref: string) =>
    pathname === childHref || pathname.startsWith(childHref + '/');

  // Is a parent dropdown's group active (any child matches)?
  const isGroupActive = (item: NavItem) =>
    item.children?.some(c => isChildActive(c.href)) ?? false;

  const toggleDropdown = (key: string) => {
    setOpenKey(prev => (prev === key ? null : key));
  };

  return (
    <div style={{
      height: '100%',
      backgroundColor: SIDEBAR_BG,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif",
      userSelect: 'none',
    }}>

      {/* ── Logo ── */}
      <div style={{
        padding: '22px 20px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 900,
          fontSize: 34,
          color: '#FFFFFF',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '0.03em',
        }}>
          SKNLP
        </p>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: PRIMARY,
          margin: '3px 0 0',
          letterSpacing: '0.02em',
        }}>
          Campaign 365
        </p>
      </div>

      {/* ── Nav ── */}
      <nav style={{
        flex: 1,
        padding: '10px 10px',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
      }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children?.length;
          const isOpen = openKey === item.key;
          const groupActive = hasChildren && isGroupActive(item);

          // ── Direct link (no children) ─────────────────────────────────────
          if (!hasChildren && item.href) {
            const active = isDirectActive(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={handleNavClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 11,
                  padding: '9px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  marginBottom: 2,
                  transition: 'all 0.15s ease',
                  ...(active
                    ? { backgroundColor: PRIMARY, color: '#FFFFFF' }
                    : { color: '#94A3B8', backgroundColor: 'transparent' }),
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(220,20,60,0.10)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#E2E8F0';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
                  }
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{item.label}</span>
              </Link>
            );
          }

          // ── Dropdown parent + children ────────────────────────────────────
          return (
            <div key={item.key} style={{ marginBottom: 2 }}>
              {/* Parent row */}
              <button
                onClick={() => toggleDropdown(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 11,
                  padding: '9px 12px',
                  borderRadius: 8,
                  width: '100%',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: groupActive ? 600 : 400,
                  fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                  ...(groupActive
                    ? { backgroundColor: 'rgba(220,20,60,0.18)', color: '#FFFFFF' }
                    : { color: '#94A3B8', backgroundColor: 'transparent' }),
                }}
                onMouseEnter={e => {
                  if (!groupActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(220,20,60,0.10)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#E2E8F0';
                  }
                }}
                onMouseLeave={e => {
                  if (!groupActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8';
                  }
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                {isOpen
                  ? <ChevronDown size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
                  : <ChevronRight size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
                }
              </button>

              {/* Children */}
              {isOpen && (
                <div style={{
                  marginLeft: 16,
                  marginTop: 2,
                  borderLeft: '1px solid rgba(220,20,60,0.25)',
                  paddingLeft: 8,
                }}>
                  {item.children!.map(child => {
                    const childActive = isChildActive(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleNavClick}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '7px 10px',
                          borderRadius: 6,
                          textDecoration: 'none',
                          fontSize: 12,
                          fontWeight: childActive ? 600 : 400,
                          marginBottom: 1,
                          transition: 'all 0.15s ease',
                          ...(childActive
                            ? { backgroundColor: PRIMARY, color: '#FFFFFF' }
                            : { color: '#94A3B8', backgroundColor: 'transparent' }),
                        }}
                        onMouseEnter={e => {
                          if (!childActive) {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(220,20,60,0.10)';
                            (e.currentTarget as HTMLAnchorElement).style.color = '#E2E8F0';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!childActive) {
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                            (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
                          }
                        }}
                      >
                        <span style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: childActive ? '#FFFFFF' : '#475569',
                          flexShrink: 0,
                          marginRight: 8,
                        }} />
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── User ── */}
      <div style={{
        padding: '12px 10px 14px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px', marginBottom: 4 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            backgroundColor: PRIMARY,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0,
          }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </p>
            <p style={{ color: '#475569', fontSize: 10, margin: '1px 0 0' }}>
              {roleLabel[storedRole] || storedRole}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 11,
            padding: '8px 12px', width: '100%', borderRadius: 8,
            border: 'none', background: 'none', cursor: 'pointer',
            color: '#64748B', fontSize: 13, fontWeight: 500,
            fontFamily: 'inherit', transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.05)';
            (e.currentTarget as HTMLButtonElement).style.color = '#E2E8F0';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = '#64748B';
          }}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
