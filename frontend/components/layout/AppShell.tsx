'use client';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { Bell, LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

const SIDEBAR_WIDTH = 260;

interface AppShellProps {
  /**
   * The rendered sidebar content (TenantSidebar or SuperAdminSidebar).
   * AppShell wraps it in a FIXED-position container — sidebar never
   * participates in the flex/block flow, so content is never squeezed.
   */
  sidebarContent: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  logoContent: ReactNode;
  primaryColor?: string;
  showBottomNav?: boolean;
  /** Hide the top bar on desktop — use when pages supply their own top bar */
  hideDesktopTopBar?: boolean;
  /** Remove padding from main content area — use when pages handle their own spacing */
  noPadding?: boolean;
  /** Override the overall shell background color */
  shellBg?: string;
}

export function AppShell({
  sidebarContent,
  children,
  isOpen,
  onToggle,
  onClose,
  logoContent,
  primaryColor = 'var(--tenant-primary)',
  showBottomNav = false,
  hideDesktopTopBar = false,
  noPadding = false,
  shellBg = '#F8FAFC',
}: AppShellProps) {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Hydration-safe: read localStorage only after mount (client-side only)
  const [displayName, setDisplayName] = useState('User');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('c365_user') || '{}');
      const name = user?.name || storedUser?.name || 'User';
      setDisplayName(name);
      setIsSuperAdmin(localStorage.getItem('c365_role') === 'super_admin');
    } catch {
      // ignore
    }
  }, [user]);

  const userInitial = displayName.charAt(0).toUpperCase();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifPanel(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    router.push(isSuperAdmin ? '/super/login' : '/login');
  };

  // On desktop with sidebar open, shift content right via marginLeft.
  // Sidebar is ALWAYS position:fixed — it NEVER takes up layout space.
  const contentMargin = isDesktop && isOpen ? SIDEBAR_WIDTH : 0;

  const showTopBar = !(hideDesktopTopBar && isDesktop);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: shellBg }}>

      {/* ── SIDEBAR — always fixed, slides in/out ─────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: SIDEBAR_WIDTH,
          zIndex: 50,
          transform: isOpen ? 'translateX(0)' : `translateX(-${SIDEBAR_WIDTH}px)`,
          transition: 'transform 280ms ease',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {sidebarContent}
      </div>

      {/* ── BACKDROP — mobile only, tap to close ──────────────── */}
      {isOpen && !isDesktop && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            backgroundColor: 'rgba(0,0,0,0.55)',
            cursor: 'pointer',
          }}
        />
      )}

      {/* ── CONTENT COLUMN ────────────────────────────────────── */}
      <div
        style={{
          marginLeft: contentMargin,
          transition: 'margin-left 280ms ease',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Topbar — hidden on desktop when hideDesktopTopBar is set */}
        {showTopBar && <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            height: 56,
            backgroundColor: '#0B1120',
            borderBottom: '1px solid #1E2D45',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            flexShrink: 0,
            boxShadow: '0 1px 6px rgba(0,0,0,0.3)',
          }}
        >
          {/* Hamburger */}
          <button
            onClick={onToggle}
            aria-label="Toggle sidebar"
            style={{
              width: 36, height: 36,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 5, background: 'none',
              border: '1px solid #1E2D45',
              cursor: 'pointer', borderRadius: 8, flexShrink: 0,
            }}
          >
            <span style={{ display: 'block', width: 16, height: 2, background: '#94A3B8', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 16, height: 2, background: '#94A3B8', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 16, height: 2, background: '#94A3B8', borderRadius: 2 }} />
          </button>

          {/* Party name dropdown — center */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#1A2744', border: '1px solid #1E2D45',
            borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
            marginLeft: 16,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0', whiteSpace: 'nowrap' }}>
              St. Kitts Nevis Labour Party
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Search bar */}
          <div style={{
            flex: 1, maxWidth: 280, margin: '0 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#1A2744', border: '1px solid #1E2D45',
            borderRadius: 8, padding: '7px 12px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A5D80" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span style={{ fontSize: 13, color: '#4A5D80' }}>Search...</span>
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>

            {/* Notification bell */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                aria-label="Notifications"
                onClick={() => { setShowNotifPanel(p => !p); setShowProfileMenu(false); }}
                style={{
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#1A2744',
                  border: '1px solid #1E2D45',
                  cursor: 'pointer', borderRadius: 8, position: 'relative',
                }}
              >
                <Bell size={16} color="#94A3B8" />
                <span style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 8, height: 8, borderRadius: '50%',
                  backgroundColor: '#E8C84A', border: '2px solid rgba(0,0,0,0.3)',
                  fontSize: 8, fontWeight: 800, color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>1</span>
              </button>

              {showNotifPanel && (
                <div style={{
                  position: 'absolute', top: 44, right: 0, width: 300,
                  backgroundColor: 'white', borderRadius: 12,
                  border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  zIndex: 200, overflow: 'hidden',
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>Notifications</span>
                    <span style={{ fontSize: 11, color: primaryColor, fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
                  </div>
                  {[
                    { title: 'Panic Alert Triggered', msg: 'Devon Clarke triggered a panic alert.', time: '2 min ago', unread: true },
                    { title: 'Voter Import Complete', msg: '4,821 voters imported successfully.', time: '15 min ago', unread: true },
                    { title: 'Canvassing Target Reached', msg: 'Team Alpha completed Zone B.', time: '1h ago', unread: false },
                  ].map((n, i) => (
                    <div key={i} style={{
                      padding: '12px 16px', borderBottom: '1px solid #F8FAFC', cursor: 'pointer',
                      backgroundColor: n.unread ? '#FAFAFA' : 'white',
                      borderLeft: n.unread ? `3px solid ${primaryColor}` : '3px solid transparent',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = '#F8FAFC'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = n.unread ? '#FAFAFA' : 'white'; }}
                    >
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', margin: 0 }}>{n.title}</p>
                      <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0' }}>{n.msg}</p>
                      <p style={{ fontSize: 10, color: '#94A3B8', margin: '4px 0 0' }}>{n.time}</p>
                    </div>
                  ))}
                  <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: 12, color: primaryColor, fontWeight: 600, cursor: 'pointer' }}
                      onClick={() => { setShowNotifPanel(false); router.push('/notifications'); }}
                    >View all notifications →</span>
                  </div>
                </div>
              )}
            </div>

            {/* User profile */}
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowProfileMenu(p => !p); setShowNotifPanel(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#1A2744',
                  border: '1px solid #1E2D45', borderRadius: 8,
                  padding: '4px 10px 4px 4px', cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  backgroundColor: '#CC1525',
                  border: '2px solid #E2E8F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>
                  {userInitial}
                </div>
                {isDesktop && (
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {displayName.split(' ')[0].slice(0,2).toUpperCase()}
                  </span>
                )}
                <ChevronDown size={12} color="#94A3B8" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {showProfileMenu && (
                <div style={{
                  position: 'absolute', top: 44, right: 0, width: 200,
                  backgroundColor: 'white', borderRadius: 12,
                  border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  zIndex: 200, overflow: 'hidden',
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>{displayName}</p>
                    <p style={{ fontSize: 11, color: '#94A3B8', margin: '2px 0 0' }}>{isSuperAdmin ? 'Super Admin' : 'Campaign Manager'}</p>
                  </div>
                  {[
                    { label: 'Profile Settings', icon: User, action: () => { setShowProfileMenu(false); router.push(isSuperAdmin ? '/super/settings' : '/settings'); } },
                    { label: 'Preferences', icon: Settings, action: () => { setShowProfileMenu(false); router.push(isSuperAdmin ? '/super/settings' : '/settings'); } },
                  ].map(({ label, icon: Icon, action }) => (
                    <button key={label} onClick={action}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, color: '#374151', textAlign: 'left' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F8FAFC'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
                    >
                      <Icon size={14} color="#64748B" />
                      {label}
                    </button>
                  ))}
                  <div style={{ borderTop: '1px solid #F1F5F9' }}>
                    <button onClick={handleLogout}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, color: '#EF4444', textAlign: 'left' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FEF2F2'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
                    >
                      <LogOut size={14} color="#EF4444" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>}

        {/* Page content */}
        <main
          style={{
            flex: 1,
            padding: noPadding ? 0 : '16px',
            paddingBottom: !noPadding && showBottomNav && !isDesktop ? 76 : 0,
            overflowX: 'hidden',
          }}
        >
          {children}
        </main>

        {/* Bottom nav — mobile only */}
        {showBottomNav && !isDesktop && <BottomNav primaryColor={primaryColor} />}
      </div>
    </div>
  );
}
