'use client';
import { useState, useEffect } from 'react';

const LIVE_RESULTS = [
  { name: '1. St. Kitts Nevis Labour Party', party: 'SKNLP', resp: '459%', resp2: '16,08%', voter: '22155', cuane: '400' },
  { name: '2. St. Kitts Nevis Labour Party', party: 'SKNLP', resp: '605%', resp2: '14,09%', voter: '22105', cuane: '500' },
  { name: '3. St. Kitts Nevis Labour Party', party: 'SKNLP', resp: '500%', resp2: '14,19%', voter: '22102', cuane: '400' },
  { name: '4. St. Kitts Nevis Labour Party', party: 'SKNLP', resp: '500%', resp2: '16,19%', voter: '24:09',  cuane: '303' },
];

function DonutPoll({ pct, label, sub }: { pct: number; label: string; sub?: string }) {
  const r = 42, cx = 54, cy = 54;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width="108" height="108" viewBox="0 0 108 108">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#DC143C" strokeWidth="11"
          strokeDasharray={`${filled} ${circ}`} strokeDashoffset={circ * 0.25} strokeLinecap="round" />
        <text x={cx} y={cx - 4} textAnchor="middle" fill="white" fontSize="18" fontWeight="900">{pct}%</text>
      </svg>
      <p style={{ color: 'white', fontSize: 14, fontWeight: 900, margin: 0 }}>{label}</p>
      {sub && <p style={{ color: '#64748B', fontSize: 10, margin: 0, textAlign: 'center' }}>{sub}</p>}
    </div>
  );
}

export default function LivePollsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [voters, setVoters] = useState([22155, 22105, 22102, 24]);

  useEffect(() => {
    const t = setInterval(() => {
      setVoters(prev => prev.map(v => v + Math.floor(Math.random() * 5)));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const TABS = [
    { key: 'all',     label: 'All Active' },
    { key: 'c5',      label: 'Constituency 5' },
    { key: 'rt',      label: 'Real-Time Results' },
  ];
  const RIGHT_TABS = [
    { key: 'speech',  label: 'Speech-to-Text' },
    { key: 'ready',   label: 'Ready Polls' },
  ];

  const POLL_CARDS = [
    { title: 'Who will you support\non Election Day?', pct: 64, label: 'SKNLP', type: 'donut', bg: 'linear-gradient(135deg,#1a0808 0%,#2d0a0a 100%)' },
    { title: 'Live Poll\nDer Dess!',                   pct: 0,  label: '',       type: 'image', bg: 'linear-gradient(135deg,#0a1628 0%,#1a2540 100%)' },
    { title: 'Live Polls\nReady Poll?',                pct: 64, label: 'SKNLP', type: 'donut', sub: '3. An Dpuped Pools', bg: 'linear-gradient(135deg,#0a0a1a 0%,#1a1a2d 100%)' },
    { title: 'Live-Time\nReady Poll?',                 pct: 50, label: 'SKNLP', type: 'donut', sub: '4. Ar Dpar Pop2',    bg: 'linear-gradient(135deg,#0a0a14 0%,#1a1a28 100%)' },
  ];

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📊</div>
            <span style={{ color: 'white', fontSize: 14, fontWeight: 800 }}>Polling</span>
          </div>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#64748B', fontSize: 13 }}>🔍 Campaign 365 Client</span>
          <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>Live Polls</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['👤', '🔔'].map((icon, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15 }}>{icon}</div>
          ))}
          {[{ initials: 'M', color: '#DC143C' }, { initials: 'J', color: '#1E3A5F' }, { initials: 'A', color: '#374151' }].map((u, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700, marginLeft: -8, border: '2px solid #080E1C' }}>{u.initials}</div>
          ))}
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: 11, fontWeight: 700, marginLeft: -8, border: '2px solid #080E1C' }}>Ielve</div>
        </div>
      </div>

      {/* Scenic beach background area */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 70% 30%, rgba(255,180,50,0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(0,100,180,0.3) 0%, transparent 55%),
            linear-gradient(160deg,#080E1C 0%,#0c1420 60%,#080E1C 100%)
          `,
          zIndex: 0,
        }} />
        {/* Palm tree right side decoration */}
        <div style={{ position: 'absolute', right: 0, top: 0, zIndex: 1, opacity: 0.4 }}>
          <svg width="140" height="200" viewBox="0 0 140 200">
            <path d="M90,200 Q88,150 92,110 Q95,84 98,68" stroke="#1a4a10" strokeWidth="7" fill="none" />
            <path d="M98,68 Q72,50 48,46 Q72,60 76,76" fill="#228b22" />
            <path d="M98,68 Q78,44 68,26 Q92,44 94,62" fill="#2ea82e" />
            <path d="M98,68 Q120,46 136,40 Q116,58 110,70" fill="#228b22" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 2, padding: '16px 20px' }}>
          <h1 style={{ color: '#DC143C', fontSize: 24, fontWeight: 900, margin: '0 0 14px' }}>Live Polls</h1>

          {/* Tab bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                  background: activeTab === t.key ? '#DC143C' : 'rgba(255,255,255,0.06)',
                  border: '1px solid ' + (activeTab === t.key ? '#DC143C' : 'rgba(255,255,255,0.1)'),
                  color: 'white', borderRadius: 20, padding: '7px 16px',
                  fontSize: 12, fontWeight: activeTab === t.key ? 700 : 500, cursor: 'pointer',
                }}>{t.label}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {RIGHT_TABS.map(t => (
                <button key={t.key} style={{
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#E2E8F0', borderRadius: 8, padding: '7px 14px',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}>{t.label}</button>
              ))}
            </div>
          </div>

          {/* 4 Poll cards */}
          <div className="rg-4" style={{ gap: 14, marginBottom: 20 }}>
            {POLL_CARDS.map((card, i) => (
              <div key={i} style={{
                background: card.bg, borderRadius: 14, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              }}>
                <p style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, margin: 0, textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{card.title}</p>
                {card.type === 'donut'
                  ? <DonutPoll pct={card.pct} label={card.label} sub={card.sub} />
                  : (
                    /* Flag/rally image replacement */
                    <div style={{
                      width: '100%', height: 120, borderRadius: 10, overflow: 'hidden',
                      background: 'linear-gradient(135deg,#1a2a10 0%,#2a5020 50%,#1a3010 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,200,50,0.4) 0%, transparent 60%)' }} />
                      <svg viewBox="0 0 30 20" width="55" height="37" style={{ borderRadius: 3, position: 'relative' }}>
                        <polygon points="0,20 30,20 0,0" fill="#009E60" />
                        <polygon points="30,0 30,20 0,0" fill="#CE1126" />
                        <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
                        <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
                        <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
                      </svg>
                    </div>
                  )
                }
              </div>
            ))}
          </div>

          {/* Live Results table */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>Live Results</p>
              <button style={{ background: '#DC143C', color: 'white', border: 'none', borderRadius: 6, padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Pause Poll</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 80px 90px 90px 80px', minWidth: 'max-content', padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', color: '#475569', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>Poll Hame</span><span>Response</span><span>Response</span><span>Voter</span><span>Cuane</span>
            </div>
            {LIVE_RESULTS.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2fr 80px 90px 90px 80px', minWidth: 'max-content',
                padding: '10px 16px', alignItems: 'center',
                borderBottom: i < LIVE_RESULTS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
              }}>
                <span style={{ color: '#C9D1DA', fontSize: 12, fontWeight: 600 }}>{r.name}</span>
                <span style={{ color: '#4ADE80', fontSize: 12, fontWeight: 700 }}>{r.party}</span>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>{r.resp}</span>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>{voters[i]?.toLocaleString()}</span>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>{r.cuane}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
