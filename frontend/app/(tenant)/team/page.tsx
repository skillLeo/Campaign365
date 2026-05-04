'use client';
import Link from 'next/link';

const STATS = [
  { icon: '🚴', label: 'Total Team Members', value: '1,847' },
  { icon: '🚴', label: 'Canvassers Online',   value: '312' },
  { icon: '🚴', label: 'Runners Active',       value: '47' },
  { icon: '🔆', label: 'Panic Button Incidents Today', value: '0' },
];

const FEED = [
  { initials: 'SB', name: 'Samuel Brown',   action: 'Recent Team Check-in', detail: '42 doors knocked · Basseterre Central', time: '2m ago', skin: '#7B4F2E' },
  { initials: 'MJ', name: 'Marcus James',   action: 'Recent Team Check-in', detail: '25 voters contacted · Sandy Point',      time: '5m ago', skin: '#5C3317' },
  { initials: 'GC', name: 'Gentily Clarke', action: 'Recent Team Check-in', detail: '25 calls completed · Nevis North',       time: '9m ago', skin: '#8B5E3C' },
  { initials: 'PN', name: 'Planbro Nevis',  action: 'Runner Check-in',       detail: '10% route completed · Basseterre',      time: '12m ago', skin: '#4A2C17' },
];

function LiveMap() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 340 220" preserveAspectRatio="xMidYMid meet">
      {/* Dark ocean bg */}
      <rect width="340" height="220" fill="#0d2540" />
      {/* Grid */}
      {[50,100,150,200,250,300].map(x => <line key={x} x1={x} y1={0} x2={x} y2={220} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />)}
      {[40,80,120,160,200].map(y => <line key={y} x1={0} y1={y} x2={340} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />)}

      {/* St Kitts main island */}
      <path d="M42,72 L62,58 L88,48 L112,42 L136,44 L158,52 L174,64 L180,80 L176,96 L168,108 L156,116 L162,130 L168,144 L162,155 L150,158 L140,150 L132,140 L118,132 L102,128 L88,120 L76,108 L64,94 Z"
        fill="#1E3A1E" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Basseterre area highlight */}
      <ellipse cx="125" cy="95" rx="20" ry="14" fill="rgba(220,20,60,0.3)" />

      {/* Nevis island */}
      <ellipse cx="220" cy="165" rx="32" ry="28" fill="#1E3A1E" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <ellipse cx="220" cy="165" rx="14" ry="12" fill="rgba(220,20,60,0.2)" />

      {/* Location pins - active runners/canvassers */}
      {[
        { cx: 110, cy: 80, large: true },
        { cx: 135, cy: 100, large: false },
        { cx: 148, cy: 112, large: false },
        { cx: 88, cy: 68, large: false },
        { cx: 160, cy: 95, large: false },
        { cx: 220, cy: 158, large: false },
        { cx: 210, cy: 172, large: false },
      ].map((pin, i) => (
        <g key={i}>
          {pin.large && <circle cx={pin.cx} cy={pin.cy} r="14" fill="rgba(220,20,60,0.25)" />}
          <circle cx={pin.cx} cy={pin.cy} r={pin.large ? 7 : 5} fill="#DC143C" opacity="0.9" />
          <circle cx={pin.cx} cy={pin.cy} r={pin.large ? 3 : 2} fill="white" />
          {pin.large && <path d={`M${pin.cx},${pin.cy + 7} L${pin.cx},${pin.cy + 14}`} stroke="#DC143C" strokeWidth="2" strokeLinecap="round" />}
        </g>
      ))}

      {/* St Kitts & Nevis label */}
      <text x="200" y="50" fontSize="10" fontWeight="700" fill="white" opacity="0.8">St. Kitts &amp; Nevis</text>

      {/* Live badge */}
      <rect x="8" y="8" width="48" height="18" rx="4" fill="rgba(220,20,60,0.8)" />
      <text x="32" y="21" textAnchor="middle" fontSize="9" fontWeight="800" fill="white">● LIVE</text>
    </svg>
  );
}

export default function TeamManagementPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080E1C', fontFamily: "'Inter',sans-serif" }}>

      {/* Red banner header */}
      <div style={{
        background: '#DC143C',
        padding: '18px 28px',
        marginBottom: 0,
      }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>Team Management</h1>
      </div>

      {/* Hero image card */}
      <div style={{
        position: 'relative', overflow: 'hidden', height: 200,
        background: 'linear-gradient(135deg, #1a0505 0%, #3d0a0a 30%, #0a1a0a 60%, #0a0a2a 100%)',
        marginBottom: 24,
      }}>
        {/* Crowd silhouette simulation */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Simulated crowd of people silhouettes */}
          <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="20%" r="50%">
                <stop offset="0%" stopColor="rgba(255,200,100,0.6)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="skyGrad" cx="50%" cy="0%" r="80%">
                <stop offset="0%" stopColor="#1a4a6a" />
                <stop offset="100%" stopColor="#0a1628" />
              </radialGradient>
            </defs>
            <rect width="800" height="200" fill="url(#skyGrad)" />
            <ellipse cx="400" cy="-20" rx="200" ry="120" fill="url(#sunGlow)" />

            {/* Red flags */}
            {[80,160,240,320,400,480,560,640,720].map((x, i) => (
              <g key={i}>
                <line x1={x} y1={60} x2={x} y2={150} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                <path d={`M${x},60 Q${x + 30},70 ${x},80`} fill="#DC143C" opacity="0.9" />
              </g>
            ))}

            {/* Crowd (simplified silhouettes) */}
            {Array.from({ length: 40 }).map((_, i) => {
              const x = 15 + (i % 20) * 40 + (Math.floor(i / 20)) * 20;
              const y = 110 + (i % 3) * 15;
              const h = 55 + (i % 4) * 8;
              return (
                <g key={i}>
                  {/* Body */}
                  <rect x={x - 8} y={y} width={16} height={h} rx="4"
                    fill={`rgba(${[180,120,80][i % 3]},${[80,50,40][i % 3]},${[40,30,20][i % 3]},0.8)`} />
                  {/* Head */}
                  <circle cx={x} cy={y - 10} r="10"
                    fill={`rgba(${[150,100,60][i % 3]},${[70,40,30][i % 3]},${[30,20,10][i % 3]},0.9)`} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Text overlay */}
        <div style={{ position: 'absolute', bottom: 24, left: 28, zIndex: 2 }}>
          <p style={{ color: 'white', fontSize: 28, fontWeight: 900, margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.8)', lineHeight: 1.2 }}>
            SKNLP Team —<br />Red Wave Rising
          </p>
        </div>

        {/* Teal overlay at right */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(0,80,80,0.4))' }} />
      </div>

      <div style={{ padding: '0 24px 24px' }}>

        {/* 4 KPI cards */}
        <div className="rg-4" style={{ gap: 14, marginBottom: 24 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '20px',
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
              <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 500, margin: '0 0 8px' }}>{s.label}</p>
              <p style={{ color: 'white', fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* 2-col: Activity Feed + Live Map */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>

          {/* Real-Time Activity Feed */}
          <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700, margin: 0 }}>Real-Time Activity Feed</p>
              <div style={{ position: 'relative' }}>
                <select style={{
                  background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94A3B8', borderRadius: 6, padding: '5px 24px 5px 10px',
                  fontSize: 11, cursor: 'pointer', appearance: 'none', outline: 'none', fontFamily: 'inherit',
                }}>
                  <option>People Feed</option>
                  <option>All Activity</option>
                </select>
                <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontSize: 9, pointerEvents: 'none' }}>▼</span>
              </div>
            </div>
            {FEED.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
                borderBottom: i < FEED.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: `radial-gradient(circle at 40% 35%, ${item.skin}ee, ${item.skin}66)`,
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 11, fontWeight: 800,
                }}>{item.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#CBD5E1', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{item.action}</p>
                  <p style={{ color: '#64748B', fontSize: 11, margin: '0 0 6px' }}>{item.detail}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ background: '#DC143C', color: 'white', border: 'none', borderRadius: 5, padding: '4px 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>Badge</button>
                    <button style={{ background: 'rgba(255,255,255,0.08)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5, padding: '4px 12px', fontSize: 10, cursor: 'pointer' }}>Tipt</button>
                  </div>
                </div>
                <span style={{ color: '#475569', fontSize: 10, flexShrink: 0 }}>{item.time}</span>
              </div>
            ))}
          </div>

          {/* Live Map */}
          <div style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700, margin: 0 }}>Live Field Map</p>
              <div style={{ position: 'relative' }}>
                <select style={{
                  background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94A3B8', borderRadius: 6, padding: '5px 24px 5px 10px',
                  fontSize: 11, cursor: 'pointer', appearance: 'none', outline: 'none', fontFamily: 'inherit',
                }}>
                  <option>St. Kitts &amp; Nevis</option>
                  <option>Basseterre</option>
                </select>
                <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontSize: 9, pointerEvents: 'none' }}>▼</span>
              </div>
            </div>
            <div style={{ height: 280 }}>
              <LiveMap />
            </div>
            {/* Pin legend */}
            <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 16 }}>
              {[['#DC143C', '7 Active Pins'], ['#D4A017', '3 Zones']].map(([c, l], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                  <span style={{ color: '#64748B', fontSize: 11 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom action bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <button style={{
            background: '#1E293B', color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '14px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>+ Add New Member</button>
          <Link href="/team/members" style={{
            background: '#1E293B', color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '14px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>View All Members</Link>
          <button style={{
            background: '#DC143C', color: 'white', border: 'none',
            borderRadius: 10, padding: '14px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(220,20,60,0.35)',
          }}>Export Team Report</button>
        </div>
      </div>
    </div>
  );
}
