'use client';

const LIVE_POLLS = [
  { title: 'Voter Intention - Constituency 5', sub: 'St. Kitts Nevis Labour 2 Labour Party - #059E0B', pct: 62 },
  { title: 'Voter Intention - Constituency 5', sub: 'St. Kitts Nevis Labour 2 Labour Party - #F59E0B', pct: 62 },
  { title: 'Voter Intention - Constituency 5', sub: 'St. Kitts Nevis Labour & Labour Party - #0FT72A', pct: 62 },
];

function MiniBar({ vals }: { vals: number[] }) {
  const max = Math.max(...vals);
  return (
    <svg width="100%" height="48" viewBox="0 0 120 48" preserveAspectRatio="none">
      {vals.map((v, i) => {
        const h = (v / max) * 40;
        return <rect key={i} x={i * 14 + 2} y={48 - h} width="11" height={h} rx="2"
          fill={i === vals.length - 1 ? '#FFD700' : 'rgba(220,20,60,0.5)'} />;
      })}
    </svg>
  );
}

function DonutSmall({ pct, label }: { pct: number; label: string }) {
  const r = 26, cx = 32, cy = 32;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#DC143C" strokeWidth="8"
          strokeDasharray={`${filled} ${circ}`} strokeDashoffset={circ * 0.25}
          strokeLinecap="round" />
        <text x={cx} y={cx + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="900">{pct}%</text>
      </svg>
      <span style={{ color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: '0.05em' }}>{label}</span>
    </div>
  );
}

export default function PollingPage() {
  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Red top bar */}
      <div style={{
        background: 'linear-gradient(90deg,#B91C1C 0%,#991B1B 100%)',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* SKNLP logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 30 20" width="24" height="16">
                <polygon points="0,20 30,20 0,0" fill="#009E60" />
                <polygon points="30,0 30,20 0,0" fill="#CE1126" />
                <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
                <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
                <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
              </svg>
            </div>
            <div>
              <p style={{ color: 'white', fontSize: 13, fontWeight: 900, margin: 0 }}>SKNLP</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, margin: 0 }}>Campaign 365</p>
            </div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>SKNLP Campaign 365 Client Web Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>🔍 Search...</span>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ color: 'white', fontSize: 18 }}>🔔</span>
            <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: 9, fontWeight: 800 }}>3</div>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ color: 'white', fontSize: 18 }}>💬</span>
            <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 800 }}>3</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700 }}>M</div>
            <span style={{ color: 'white', fontSize: 12 }}>Marcus Liburd – Campaign Manager</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>▼</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ color: 'white', fontSize: 24, fontWeight: 900, margin: 0 }}>Polling &amp; Surveys</h1>
          <span style={{ color: '#475569', fontSize: 13 }}>#B91C1C</span>
        </div>

        {/* 4 stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
          {[
            { label: 'Active Polls',          value: '4',     bars: [20,45,30,55,40,38,50], color: '#FFD700' },
            { label: 'Voters Polled Today',   value: '2,847', bars: [30,50,45,65,55,70,60], color: '#DC143C' },
            { label: 'Average Response Rate', value: '87%',   bars: [55,70,60,80,75,85,82], color: '#DC143C' },
            { label: 'Predicted Turnout',     value: '76%',   bars: [40,55,50,65,60,70,72], color: '#FFD700' },
          ].map((c, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg,rgba(220,20,60,0.12) 0%,rgba(220,20,60,0.05) 100%)',
              border: '1px solid rgba(220,20,60,0.25)', borderRadius: 14,
              padding: '14px 16px', overflow: 'hidden', position: 'relative',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.5 }}>
                <MiniBar vals={c.bars} />
              </div>
              <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em', position: 'relative' }}>{c.label}</p>
              <p style={{ color: c.color, fontSize: 36, fontWeight: 900, margin: 0, lineHeight: 1, position: 'relative' }}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Bottom: Live Overview + Island image */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, marginBottom: 20 }}>

          {/* Live Polling Overview */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '18px',
          }}>
            <p style={{ color: 'white', fontSize: 16, fontWeight: 700, margin: '0 0 14px' }}>Live Polling Overview</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LIVE_POLLS.map((p, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10, padding: '12px 14px',
                }}>
                  <div>
                    <p style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700, margin: '0 0 3px' }}>{p.title}</p>
                    <p style={{ color: '#475569', fontSize: 11, margin: 0 }}>{p.sub}</p>
                  </div>
                  <DonutSmall pct={p.pct} label="SKNLP" />
                </div>
              ))}
            </div>
          </div>

          {/* Island visual */}
          <div style={{
            borderRadius: 14, overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(135deg,#0a1628 0%,#1a0a20 50%,#0d2040 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            {/* Sky gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 20%, rgba(255,180,50,0.3) 0%, transparent 55%)' }} />
            {/* SKNLP flags */}
            {[{ x: '15%', y: '20%', rot: -12 }, { x: '55%', y: '10%', rot: 8 }, { x: '80%', y: '25%', rot: -6 }].map((f, i) => (
              <div key={i} style={{ position: 'absolute', top: f.y, left: f.x, transform: `rotate(${f.rot}deg)` }}>
                <svg viewBox="0 0 30 20" width="42" height="28" style={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  <polygon points="0,20 30,20 0,0" fill="#009E60" />
                  <polygon points="30,0 30,20 0,0" fill="#CE1126" />
                  <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
                  <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
                  <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
                </svg>
              </div>
            ))}
            {/* Island silhouette */}
            <div style={{ position: 'absolute', bottom: '15%', left: '10%', right: '10%' }}>
              <div style={{
                height: 80,
                background: 'linear-gradient(135deg,#1a3a20 0%,#2d6e3e 40%,#1a3a20 100%)',
                borderRadius: '40% 60% 30% 70% / 50% 40% 60% 50%',
                boxShadow: '0 0 30px rgba(220,20,60,0.3)',
              }} />
              {/* Red glow dots = polling station indicators */}
              {[20, 40, 55, 70, 85].map((left, i) => (
                <div key={i} style={{
                  position: 'absolute', top: -8, left: `${left}%`,
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#DC143C', boxShadow: '0 0 10px #DC143C',
                }} />
              ))}
            </div>
            {/* SKNLP label */}
            <div style={{ position: 'absolute', bottom: '8%', right: '8%' }}>
              <div style={{ background: 'rgba(220,20,60,0.8)', borderRadius: 6, padding: '4px 10px' }}>
                <p style={{ color: 'white', fontSize: 16, fontWeight: 900, margin: 0 }}>SKNLP</p>
              </div>
            </div>
            {/* Crowd silhouette bottom */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,
              background: 'linear-gradient(0deg,rgba(0,0,0,0.7) 0%,transparent 100%)',
            }} />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: '0 0 10px' }}>Quick Actions</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {['Create New Survey', 'View Live Results', 'Export Data'].map((btn, i) => (
              <button key={i} style={{
                background: '#DC143C', color: 'white', border: 'none', borderRadius: 10,
                padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(220,20,60,0.4)',
              }}>{btn}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
