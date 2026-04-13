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
  {
    href: '/voters',        label: 'Voters',          icon: Users,
    children: [
      { href: '/voters/targeting', label: 'Targeting Map' },
      { href: '/voters/segments',  label: 'Segment Builder' },
    ],
  },
  {
    href: '/canvassing',    label: 'Canvassing',      icon: Map,
    children: [
      { href: '/canvassing/generate',     label: 'Walk List Generator' },
      { href: '/canvassing/analytics',    label: 'Analytics' },
      { href: '/canvassing/turf-cutter',  label: 'Turf Cutter' },
      { href: '/canvassing/leaderboard',  label: 'Leaderboard' },
    ],
  },
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
      { href: '/communications/social-scheduler', label: 'Social Scheduler' },
    ],
  },
  { href: '/fundraising',   label: 'Fundraising',     icon: DollarSign },
  { href: '/events',        label: 'Events',          icon: CalendarDays },
  { href: '/polling',       label: 'Polling',         icon: ClipboardList },
  {
    href: '/ai',            label: 'AI Insights',     icon: Brain,
    children: [
      { href: '/ai/chatbot', label: 'AI Chatbot' },
    ],
  },
  {
    href: '/surveys',       label: 'Surveys',         icon: BarChart3,
    children: [
      { href: '/surveys/builder', label: 'Survey Builder' },
    ],
  },
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
  onClose: () => void;
}

export function TenantSidebar({ theme, onClose }: TenantSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, branding } = useAuthStore();
  const isDesktop = useIsDesktop();

  const logoUrl = branding?.logo_url;
  const partyName = branding?.name || theme.name;
  const [expanded, setExpanded] = useState<string[]>(['/voters', '/canvassing', '/communications', '/surveys', '/reports']);

  const storedUser = typeof window !== 'undefined'
    ? (() => { try { return JSON.parse(localStorage.getItem('c365_user') || '{}'); } catch { return {}; } })()
    : {};
  const storedRole = typeof window !== 'undefined'
    ? (localStorage.getItem('c365_role') || 'general_secretary')
    : 'general_secretary';
  const displayName = storedUser?.name || user?.name || 'General Secretary';

  const primaryColor = theme.primary || '#2563EB';
  const sidebarBg = '#0F172A';

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
    <div style={{ height: '100%', backgroundColor: sidebarBg, display: 'flex', flexDirection: 'column', color: '#E2E8F0' }}>
      {/* Simple Branding - Just Canvass */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid #1E293B', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ 
            width: 36, 
            height: 36, 
            borderRadius: 10, 
            backgroundColor: primaryColor, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexShrink: 0, 
            overflow: 'hidden' 
          }}>
            {logoUrl
              ? <img src={logoUrl} alt={partyName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ color: 'white', fontSize: 14, fontWeight: 900 }}>
                  {partyName.slice(0, 2).toUpperCase()}
                </span>}
          </div>
          <p style={{ color: 'white', fontWeight: 700, fontSize: 16, margin: 0 }}>{partyName}</p>
        </div>
      </div>

      {/* User Profile - Just General Secretary SKNLP with role */}
      <div style={{ padding: '16px 16px 20px', borderBottom: '1px solid #1E293B', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            backgroundColor: primaryColor, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: 15, 
            fontWeight: 700, 
            color: 'white', 
            flexShrink: 0 
          }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </p>
            <p style={{ color: '#64748B', fontSize: 11, margin: '2px 0 0' }}>
              {roleLabel[storedRole] || storedRole}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin' }}>
        {navItems.map(({ href, label, icon: Icon, children }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          const isExpanded = expanded.includes(href);
          const hasChildren = !!(children?.length);

          return (
            <div key={href} style={{ marginBottom: 2 }}>
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(href)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 12, 
                    padding: '10px 12px', 
                    borderRadius: 10, 
                    border: 'none', 
                    cursor: 'pointer', 
                    backgroundColor: active ? `${primaryColor}20` : 'transparent', 
                    color: active ? primaryColor : '#94A3B8', 
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => { 
                    if (!active) { 
                      e.currentTarget.style.backgroundColor = '#1E293B'; 
                      e.currentTarget.style.color = '#F1F5F9'; 
                    } 
                  }}
                  onMouseLeave={e => { 
                    if (!active) { 
                      e.currentTarget.style.backgroundColor = 'transparent'; 
                      e.currentTarget.style.color = '#94A3B8'; 
                    } 
                  }}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{label}</span>
                  <ChevronRight size={14} style={{ flexShrink: 0, transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'none' }} />
                </button>
              ) : (
                <Link
                  href={href}
                  onClick={handleNavClick}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 12, 
                    padding: '10px 12px', 
                    borderRadius: 10, 
                    textDecoration: 'none', 
                    fontSize: 13, 
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    ...(active 
                      ? { backgroundColor: primaryColor, color: 'white' } 
                      : { color: '#94A3B8' })
                  }}
                  onMouseEnter={e => { 
                    if (!active) { 
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1E293B'; 
                      (e.currentTarget as HTMLAnchorElement).style.color = '#F1F5F9'; 
                    } 
                  }}
                  onMouseLeave={e => { 
                    if (!active) { 
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; 
                      (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8'; 
                    } 
                  }}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  <span>{label}</span>
                </Link>
              )}

              {hasChildren && isExpanded && (
                <div style={{ paddingLeft: 38, marginTop: 4, marginBottom: 4 }}>
                  {children!.map(child => {
                    const ca = pathname === child.href || pathname.startsWith(child.href);
                    return (
                      <Link 
                        key={child.href} 
                        href={child.href} 
                        onClick={handleNavClick}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 10, 
                          padding: '8px 12px', 
                          borderRadius: 8, 
                          textDecoration: 'none', 
                          fontSize: 12,
                          transition: 'all 0.2s ease',
                          ...(ca 
                            ? { backgroundColor: primaryColor, color: 'white' } 
                            : { color: '#64748B' })
                        }}
                        onMouseEnter={e => { 
                          if (!ca) { 
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1E293B'; 
                            (e.currentTarget as HTMLAnchorElement).style.color = '#F1F5F9'; 
                          } 
                        }}
                        onMouseLeave={e => { 
                          if (!ca) { 
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; 
                            (e.currentTarget as HTMLAnchorElement).style.color = '#64748B'; 
                          } 
                        }}
                      >
                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6, flexShrink: 0 }} />
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
      <div style={{ padding: '12px 8px', borderTop: '1px solid #1E293B', flexShrink: 0 }}>
        <button 
          onClick={handleLogout}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            padding: '10px 12px', 
            width: '100%', 
            borderRadius: 10, 
            border: 'none', 
            background: 'none', 
            cursor: 'pointer', 
            color: '#94A3B8', 
            fontSize: 13, 
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => { 
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1E293B'; 
            (e.currentTarget as HTMLButtonElement).style.color = '#F1F5F9'; 
          }}
          onMouseLeave={e => { 
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; 
            (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8'; 
          }}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
