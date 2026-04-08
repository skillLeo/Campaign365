'use client';
import { Battery, Signal, Wifi } from 'lucide-react';

export function MobileFrame({ children, bgColor = '#FFFFFF' }: { children: React.ReactNode; bgColor?: string }) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div style={{
      width: 390, minHeight: 844, borderRadius: 44, overflow: 'hidden', position: 'relative',
      boxShadow: '0 0 0 10px #1a1a1a, 0 0 0 12px #333, 0 40px 80px rgba(0,0,0,0.6)',
      backgroundColor: bgColor, display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Status Bar */}
      <div style={{ height: 44, backgroundColor: bgColor === '#FFFFFF' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: bgColor === '#FFFFFF' ? '#0F172A' : '#fff' }}>{time}</span>
        <div style={{ width: 120, height: 28, backgroundColor: bgColor === '#FFFFFF' ? '#0F172A' : '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Signal size={12} color={bgColor === '#FFFFFF' ? '#0F172A' : '#fff'} />
          <Wifi size={12} color={bgColor === '#FFFFFF' ? '#0F172A' : '#fff'} />
          <Battery size={14} color={bgColor === '#FFFFFF' ? '#0F172A' : '#fff'} />
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', scrollbarWidth: 'none' }}>
        {children}
      </div>
      {/* Home indicator */}
      <div style={{ height: 34, backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: 130, height: 5, backgroundColor: bgColor === '#FFFFFF' ? '#0F172A' : '#fff', borderRadius: 3, opacity: 0.3 }} />
      </div>
    </div>
  );
}

export function MobilePageWrapper({ children, bg = '#f8fafc' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', padding: '40px 20px' }}>
      <MobileFrame bgColor={bg}>{children}</MobileFrame>
    </div>
  );
}
