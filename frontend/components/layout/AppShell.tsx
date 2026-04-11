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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>

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
        {/* Topbar — ALWAYS rendered on every screen size */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            height: 56,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            flexShrink: 0,
          }}
        >
          {/* Hamburger — always visible, always clickable */}
          <button
            onClick={onToggle}
            aria-label="Toggle sidebar"
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              background: 'none',
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
              borderRadius: 8,
              flexShrink: 0,
            }}
          >
            <span style={{ display: 'block', width: 18, height: 2, background: '#374151', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 18, height: 2, background: '#374151', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 18, height: 2, background: '#374151', borderRadius: 2 }} />
          </button>

          {/* Logo — center on mobile, hidden on desktop (sidebar shows it) */}
          {!isDesktop && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {logoContent}
            </div>
          )}

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>

            {/* Notification bell */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                aria-label="Notifications"
                onClick={() => { setShowNotifPanel(p => !p); setShowProfileMenu(false); }}
                style={{
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: showNotifPanel ? '#F1F5F9' : 'none',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer', borderRadius: 8, position: 'relative',
                }}
              >
                <Bell size={16} color="#64748B" />
                <span style={{
                  position: 'absolute', top: 7, right: 7,
                  width: 7, height: 7, borderRadius: '50%',
                  backgroundColor: primaryColor, border: '2px solid white',
                }} />
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
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: showProfileMenu ? '#F1F5F9' : 'none',
                  border: '1px solid #E2E8F0', borderRadius: 8,
                  padding: '4px 8px 4px 4px', cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  backgroundColor: primaryColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {userInitial}
                </div>
                {isDesktop && (
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#374151', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {displayName}
                  </span>
                )}
                <ChevronDown size={12} color="#9CA3AF" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
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
        </header>

        {/* Page content */}
        <main
          style={{
            flex: 1,
            padding: '16px',
            paddingBottom: showBottomNav && !isDesktop ? 76 : 16,
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
