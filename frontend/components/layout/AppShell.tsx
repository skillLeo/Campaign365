'use client';
import { ReactNode } from 'react';
import { Bell } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { useIsDesktop } from '@/hooks/useIsDesktop';

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
  primaryColor = '#E30613',
  showBottomNav = false,
}: AppShellProps) {
  const isDesktop = useIsDesktop();

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
            <button
              aria-label="Notifications"
              style={{
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                borderRadius: 8,
                position: 'relative',
              }}
            >
              <Bell size={16} color="#64748B" />
              <span style={{
                position: 'absolute', top: 7, right: 7,
                width: 7, height: 7, borderRadius: '50%',
                backgroundColor: primaryColor, border: '2px solid white',
              }} />
            </button>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              backgroundColor: primaryColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', flexShrink: 0,
            }}>
              U
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
