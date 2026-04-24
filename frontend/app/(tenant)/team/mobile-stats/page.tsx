'use client';

const TOP_USERS = [
  { rank: 1, name: 'John Doe',    activity: '342 actions - 2m ago', sync: '2m ago' },
  { rank: 2, name: 'Jane Smith',  activity: '289 actions - 5m ago', sync: '2m ago' },
  { rank: 3, name: 'Johy Fmith', activity: '242 actions - 2m ago', sync: '5m ago' },
  { rank: 4, name: 'Jugy Tees',  activity: '259 actions - 5m ago', sync: '5m ago' },
];

function HeatmapCard() {
  return (
    <div style={{
      background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14, padding: '16px 20px', flex: 1,
    }}>
      <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mobile User Activity</p>
      <p style={{ color: '#64748B', fontSize: 10, margin: '0 0 10px' }}>Last 24h</p>
      {/* Heatmap simulation */}
      <div style={{ position: 'relative', width: '100%', height: 80, borderRadius: 8, overflow: 'hidden', background: '#0F172A' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(220,20,60,0.9) 0%, rgba(255,120,0,0.6) 25%, rgba(255,200,0,0.4) 45%, rgba(0,100,255,0.3) 65%, transparent 80%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, rgba(0,150,255,0.6) 0%, rgba(0,80,200,0.3) 30%, transparent 60%)' }} />
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: -30, background: 'radial-gradient(ellipse, rgba(212,160,23,0.5) 0%, transparent 70%)', borderRadius: '50%' }} />
      {/* Phone body */}
      <div style={{
        position: 'relative', width: 90, height: 170, borderRadius: 18,
        background: 'linear-gradient(160deg, #E8C84A 0%, #C9A227 60%, #A8820A 100%)',
        border: '3px solid rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 20px 60px rgba(212,160,23,0.5), 0 4px 20px rgba(0,0,0,0.5)',
      }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 8, width: 40, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.3)' }} />
        {/* App icon */}
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📱</div>
        {/* Home bar */}
        <div style={{ position: 'absolute', bottom: 8, width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.3)' }} />
      </div>
    </div>
  );
}

export default function MobileStatsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080E1C', fontFamily: "'Inter',sans-serif", padding: '24px' }}>

      <h1 style={{ color: '#DC143C', fontSize: 26, fontWeight: 900, margin: '0 0 24px' }}>
        Mobile App Stats &amp; Field Performance
      </h1>

      {/* 4 KPI cards */}
      <div className="rg-4" style={{ gap: 14, marginBottom: 20 }}>

        {/* App Usage */}
        <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px' }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>📱</div>
          <p style={{ color: '#94A3B8', fontSize: 12, margin: '0 0 8px', fontWeight: 500 }}>App Usage Today</p>
          <p style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: '0 0 4px', lineHeight: 1, letterSpacing: '-0.02em' }}>1,234</p>
          <p style={{ color: '#64748B', fontSize: 12, margin: 0 }}>Users</p>
        </div>

        {/* Offline Sync */}
        <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px' }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>⭐</div>
          <p style={{ color: '#94A3B8', fontSize: 12, margin: '0 0 8px', fontWeight: 500 }}>Offline Sync<br />Success Rate</p>
          <p style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: '0 0 8px', lineHeight: 1, letterSpacing: '-0.02em' }}>98%</p>
          {/* Green progress bar */}
          <div style={{ background: '#1a2e1a', borderRadius: 4, height: 6 }}>
            <div style={{ background: '#22C55E', borderRadius: 4, height: 6, width: '98%' }} />
          </div>
        </div>

        {/* Panic Button */}
        <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '3px solid #D4A017', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 10, color: '#D4A017', fontSize: 18,
          }}>✓</div>
          <p style={{ color: '#94A3B8', fontSize: 12, margin: '0 0 8px', fontWeight: 500 }}>Panic Button Usage</p>
          <p style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: '0 0 4px', lineHeight: 1, letterSpacing: '-0.02em' }}>45</p>
          <p style={{ color: '#64748B', fontSize: 12, margin: 0 }}>Activations</p>
        </div>

        {/* Heatmap */}
        <HeatmapCard />
      </div>

      {/* Top Mobile Users */}
      <div style={{
        background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14, overflow: 'hidden', position: 'relative', minHeight: 280,
      }}>
        {/* World map background */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          <svg width="100%" height="100%" viewBox="0 0 800 300">
            {/* Simplified continent blobs */}
            <ellipse cx="150" cy="140" rx="100" ry="70" fill="white" />
            <ellipse cx="320" cy="120" rx="80" ry="90" fill="white" />
            <ellipse cx="480" cy="130" rx="110" ry="80" fill="white" />
            <ellipse cx="640" cy="150" rx="70" ry="60" fill="white" />
            <ellipse cx="720" cy="170" rx="60" ry="50" fill="white" />
            <ellipse cx="220" cy="200" rx="50" ry="35" fill="white" />
          </svg>
        </div>

        {/* Phone mockup overlay */}
        <PhoneMockup />

        {/* Table content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ padding: '20px 24px 12px' }}>
            <p style={{ color: 'white', fontSize: 16, fontWeight: 700, margin: 0 }}>Top Mobile Users</p>
          </div>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '40px 180px 1fr 1fr', padding: '8px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#475569', fontSize: 12, fontWeight: 700 }}>
            <span></span><span>User</span><span>Activity</span><span>Last Sync</span>
          </div>
          {TOP_USERS.map((u, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '40px 180px 1fr 1fr',
              padding: '12px 24px', alignItems: 'center',
              borderBottom: i < TOP_USERS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <span style={{ color: '#475569', fontSize: 13, fontWeight: 700 }}>{u.rank}</span>
              <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>{u.name}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>{u.activity}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>{u.sync}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
