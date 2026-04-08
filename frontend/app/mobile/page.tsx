'use client';
import { useRouter } from 'next/navigation';
import { Smartphone, Shield, Map, Zap } from 'lucide-react';

const APPS = [
  {
    id: 'canvasser',
    name: 'Canvasser App',
    description: 'Door-to-door canvassing, voter recording, voice notes & route mapping',
    color: '#16A34A',
    bg: '#DCFCE7',
    icon: Map,
    screens: 7,
    href: '/mobile/canvasser/home',
    features: ['Door Knock Recording', 'Voice Notes + AI Transcription', 'Walking Route Map', 'Offline Mode', 'Panic Button'],
  },
  {
    id: 'runner',
    name: 'Runner App',
    description: 'Election day voter transport coordination with live GPS tracking',
    color: '#1E40AF',
    bg: '#DBEAFE',
    icon: Zap,
    screens: 5,
    href: '/mobile/runner/home',
    features: ['Live GPS Tracking', 'Pickup Assignments', 'Turn-by-Turn Navigation', 'Mark Deliveries Complete', 'HQ Live View'],
  },
  {
    id: 'candidate',
    name: 'Candidate App',
    description: 'Personal campaign management for the candidate with security features',
    color: '#7C3AED',
    bg: '#EDE9FE',
    icon: Shield,
    screens: 4,
    href: '/mobile/candidate/home',
    features: ['Daily Schedule', 'Community Walk Lists', 'AI Talking Points', 'Location Sharing', 'Highest Priority Panic'],
  },
  {
    id: 'outdoor',
    name: 'Outdoor Agent App',
    description: 'Election day polling station monitoring and turnout reporting',
    color: '#D97706',
    bg: '#FEF3C7',
    icon: Smartphone,
    screens: 4,
    href: '/mobile/outdoor-agent/home',
    features: ['Voter Tick-Off', 'Turnout Reporting', 'Runner Requests', 'Live Station Stats', 'HQ Connection'],
  },
];

export default function MobileAppsIndex() {
  const router = useRouter();
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F172A', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: '0 auto', marginBottom: 40, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: '6px 16px', marginBottom: 16 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#E30613' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Campaign 365</span>
        </div>
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Mobile App Preview</h1>
        <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>Development preview of all 4 Campaign 365 mobile apps · 20 screens total</p>
      </div>

      {/* App cards */}
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 20 }}>
        {APPS.map(app => (
          <div key={app.id} style={{ backgroundColor: '#1E293B', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Card header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <app.icon size={24} color={app.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 800, margin: 0 }}>{app.name}</h3>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, backgroundColor: app.color + '20', color: app.color }}>{app.screens} screens</span>
                  </div>
                  <p style={{ color: '#64748B', fontSize: 12, margin: '4px 0 0', lineHeight: 1.4 }}>{app.description}</p>
                </div>
              </div>
            </div>
            {/* Features */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Key Features</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {app.features.map(f => (
                  <span key={f} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}>{f}</span>
                ))}
              </div>
            </div>
            {/* Launch */}
            <div style={{ padding: '14px 24px' }}>
              <button onClick={() => router.push(app.href)}
                style={{ width: '100%', padding: '11px', borderRadius: 12, border: 'none', cursor: 'pointer', backgroundColor: app.color, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Smartphone size={14} /> Preview {app.name} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats footer */}
      <div style={{ maxWidth: 900, margin: '32px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[['4', 'Mobile Apps'], ['20', 'Screens'], ['100%', 'Coverage'], ['Flutter', 'Target Platform']].map(([v, l]) => (
          <div key={l} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: '0 0 2px' }}>{v}</p>
            <p style={{ color: '#475569', fontSize: 11, margin: 0 }}>{l}</p>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#334155', fontSize: 12, marginTop: 24 }}>
        Campaign 365 v1.0 · Mobile Preview · These screens represent the Flutter app UI specifications
      </p>
    </div>
  );
}
