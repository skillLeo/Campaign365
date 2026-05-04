'use client';

const CHECKLIST_LEFT = [
  { label: 'Election Expenses Return Filed', done: true },
  { label: 'Donor Disclosure Complete', done: true },
  { label: 'Campaign Material Approved', done: true },
  { label: 'Candidate Nomination Filed', done: true },
  { label: 'Financial Agent Registered', done: true },
];

const CHECKLIST_RIGHT = [
  { label: 'Electoral Roll Submission', done: true },
  { label: 'Polling Station Declaration', done: true },
  { label: 'Campaign Material SKNLP', done: true },
  { label: 'Public Funding Report', done: true },
  { label: 'Anti-Corruption Declaration', done: true },
];

function GoldMedal() {
  return (
    <svg width="90" height="100" viewBox="0 0 90 100" fill="none">
      <defs>
        <radialGradient id="medal1" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFE566" />
          <stop offset="60%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#8B6000" />
        </radialGradient>
      </defs>
      {/* Ribbon */}
      <path d="M30,10 L45,28 L60,10 L60,0 L30,0 Z" fill="#DC143C" />
      <line x1="45" y1="0" x2="45" y2="28" stroke="#8B0000" strokeWidth="1" />
      {/* Circle */}
      <circle cx="45" cy="62" r="32" fill="url(#medal1)" />
      <circle cx="45" cy="62" r="26" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      {/* Stars */}
      <text x="45" y="55" textAnchor="middle" fontSize="11" fill="#8B6000">★ ★ ★</text>
      {/* Text */}
      <text x="45" y="69" textAnchor="middle" fontSize="7" fontWeight="800" fill="#5A3200" fontFamily="Arial">SKNLP</text>
      <text x="45" y="78" textAnchor="middle" fontSize="6" fill="#7A4800" fontFamily="Arial">COMPLIANT</text>
    </svg>
  );
}

function StKittsMap() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 420 340" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="mapShadow">
          <feDropShadow dx="3" dy="5" stdDeviation="8" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      {/* Ocean background */}
      <rect width="420" height="340" fill="#0d2540" />
      {/* Grid lines */}
      {[60,120,180,240,300,360].map(x => <line key={x} x1={x} y1={0} x2={x} y2={340} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
      {[60,120,180,240,300].map(y => <line key={y} x1={0} y1={y} x2={420} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}

      {/* ST KITTS MAIN ISLAND - simplified shape */}
      {/* Constituency 1 - Northwest (Sandy Point) - green */}
      <path d="M55,95 L80,75 L110,60 L138,52 L155,58 L145,80 L128,96 L108,105 L85,108 Z"
        fill="#22C55E" opacity="0.9" filter="url(#mapShadow)" />
      {/* Constituency 2 - North Central - amber */}
      <path d="M138,52 L168,46 L192,50 L198,68 L180,82 L160,88 L145,80 Z"
        fill="#F59E0B" opacity="0.9" />
      {/* Constituency 3 - Northeast - red */}
      <path d="M192,50 L218,55 L238,65 L245,82 L238,96 L220,100 L200,94 L186,82 L198,68 Z"
        fill="#DC143C" opacity="0.9" />
      {/* Constituency 4 - East Central - orange */}
      <path d="M200,94 L220,100 L238,96 L245,112 L240,128 L225,132 L208,120 L198,108 Z"
        fill="#F97316" opacity="0.9" />
      {/* Constituency 5 - Basseterre North - green */}
      <path d="M145,80 L160,88 L180,82 L198,68 L198,82 L186,82 L175,96 L162,106 L148,100 Z"
        fill="#22C55E" opacity="0.85" />
      {/* Constituency 6 - Basseterre Central - red */}
      <path d="M148,100 L162,106 L175,96 L186,82 L198,108 L208,120 L196,128 L180,130 L165,120 Z"
        fill="#DC143C" opacity="0.9" />
      {/* Constituency 7 - South Central - amber */}
      <path d="M108,105 L128,96 L145,80 L148,100 L165,120 L155,130 L140,132 L122,128 L108,118 Z"
        fill="#F59E0B" opacity="0.85" />
      {/* Constituency 8 - South Peninsula - green */}
      <path d="M180,130 L196,128 L208,120 L225,132 L230,148 L222,162 L208,168 L196,158 L186,146 Z"
        fill="#22C55E" opacity="0.9" />
      {/* South tip */}
      <path d="M208,168 L222,162 L230,148 L238,160 L235,178 L220,182 L210,174 Z"
        fill="#F59E0B" opacity="0.85" />

      {/* NEVIS ISLAND - separate below-right */}
      <ellipse cx="318" cy="240" rx="50" ry="44" fill="#F97316" opacity="0.85" filter="url(#mapShadow)" />
      <ellipse cx="318" cy="240" rx="30" ry="28" fill="#DC143C" opacity="0.6" />
      {/* Nevis Peak */}
      <path d="M305,220 L318,198 L331,220 Z" fill="rgba(255,255,255,0.2)" />

      {/* Island outlines */}
      <path d="M55,95 L80,75 L110,60 L138,52 L168,46 L192,50 L218,55 L238,65 L245,82 L245,112 L240,128 L225,132 L230,148 L222,162 L235,178 L220,182 L210,174 L208,168 L196,158 L186,146 L180,130 L165,120 L155,130 L140,132 L122,128 L108,118 L108,105 L85,108 L55,95 Z"
        fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <ellipse cx="318" cy="240" rx="50" ry="44" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Labels */}
      <text x="150" y="92" fontSize="9" fontWeight="700" fill="white" opacity="0.9" textAnchor="middle">Basseterre</text>
      <text x="318" y="244" fontSize="9" fontWeight="700" fill="white" opacity="0.9" textAnchor="middle">Nevis</text>
      <text x="90" y="82" fontSize="7" fill="white" opacity="0.7">Sandy Pt</text>
      <text x="230" y="75" fontSize="7" fill="white" opacity="0.7">North End</text>

      {/* St Kitts & Nevis flag mini */}
      <rect x="350" y="12" width="58" height="36" rx="3" fill="#009E60" />
      <polygon points="350,12 392,12 350,48" fill="#000" />
      <polygon points="350,48 408,12 408,48" fill="#CE1126" />
      <line x1="350" y1="25" x2="408" y2="25" stroke="#FCD116" strokeWidth="2.5" />
      <line x1="350" y1="35" x2="408" y2="35" stroke="#FCD116" strokeWidth="2.5" />
      <line x1="364" y1="12" x2="364" y2="48" stroke="#FCD116" strokeWidth="0.5" opacity="0.4" />

      {/* Legend */}
      <rect x="12" y="280" width="185" height="52" rx="6" fill="rgba(0,0,0,0.55)" />
      <text x="22" y="296" fontSize="8" fontWeight="700" fill="white">Compliance Status</text>
      {[['#22C55E','Compliant (8)'],['#F59E0B','Monitoring (4)'],['#DC143C','Action Required (3)']].map(([c, l], i) => (
        <g key={i} transform={`translate(22, ${308 + i * 8})`}>
          <rect width="8" height="6" rx="1" fill={c} />
          <text x="12" y="6" fontSize="6" fill="#CBD5E1">{l}</text>
        </g>
      ))}
    </svg>
  );
}

export default function ElectionCompliancePage() {
  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Red hero banner */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 60%, #1a0505 100%)',
        padding: '28px 28px 24px',
        marginBottom: 24,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(255,120,60,0.3) 0%, transparent 60%)' }} />
        {/* Medals top-right */}
        <div style={{ position: 'absolute', right: 24, top: -4, display: 'flex', gap: 8 }}>
          <GoldMedal />
          <GoldMedal />
        </div>
        <div style={{ position: 'relative' }}>
          <h1 style={{ color: 'white', fontSize: 28, fontWeight: 900, margin: '0 0 8px' }}>Election Compliance</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: 0 }}>
            St Kitts-Nevis Electoral Commission · Campaign Finance Laws · Anti-Corruption Act
          </p>
        </div>
      </div>

      <div style={{ padding: '0 24px 28px' }}>

        {/* Score bar */}
        <div style={{
          background: '#111827', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, padding: '20px 24px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 20,
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>National Compliance Score</p>
            <p style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
              97% <span style={{ color: '#22C55E', fontSize: 16 }}>— All Filings On Track</span>
            </p>
            <div style={{ height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ width: '97%', height: '100%', background: 'linear-gradient(90deg, #22C55E, #4ADE80)', borderRadius: 10 }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <GoldMedal />
          </div>
        </div>

        {/* Main layout: map + right panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, marginBottom: 20 }}>

          {/* Left: map + checklists */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Map card */}
            <div style={{
              background: '#111827', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, overflow: 'hidden', height: 340,
            }}>
              <StKittsMap />
            </div>

            {/* Checklist 2-column */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[CHECKLIST_LEFT, CHECKLIST_RIGHT].map((list, col) => (
                <div key={col} style={{
                  background: '#111827', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12, padding: '14px 16px',
                }}>
                  {list.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < list.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        background: item.done ? '#22C55E' : 'rgba(100,116,139,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: 'white', fontWeight: 900,
                      }}>✓</div>
                      <span style={{ color: '#CBD5E1', fontSize: 12 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Spending row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'Spending Limit', value: '$150,000', color: '#94A3B8' },
                { label: 'Current Spend', value: '$145,000', color: '#F59E0B' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: i === 1 ? 'rgba(220,20,60,0.12)' : '#111827',
                  border: `1px solid ${i === 1 ? 'rgba(220,20,60,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 12, padding: '16px 20px',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                  <p style={{ color: '#64748B', fontSize: 12, fontWeight: 600, margin: 0 }}>{s.label}</p>
                  <p style={{ color: 'white', fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>{s.value}</p>
                  {i === 1 && (
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
                      <div style={{ width: '97%', height: '100%', background: '#F59E0B', borderRadius: 4 }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Compliance + actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* AI Election Compliance Checker */}
            <div style={{
              background: '#111827', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '20px', flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            }}>
              <p style={{ color: '#DC143C', fontSize: 14, fontWeight: 700, margin: 0, alignSelf: 'flex-start' }}>AI Election Compliance</p>
              <p style={{ color: '#64748B', fontSize: 12, margin: '-8px 0 0', alignSelf: 'flex-start' }}>Checker</p>

              {/* Gold shield */}
              <div style={{ position: 'relative', marginTop: 8 }}>
                <div style={{
                  position: 'absolute', inset: -20,
                  background: 'radial-gradient(circle, rgba(212,160,23,0.4) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <svg width="120" height="130" viewBox="0 0 120 130" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                  <defs>
                    <radialGradient id="eShield" cx="40%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFE566" />
                      <stop offset="60%" stopColor="#D4A017" />
                      <stop offset="100%" stopColor="#8B6000" />
                    </radialGradient>
                  </defs>
                  <path d="M60,6 L104,22 L104,62 C104,90 82,112 60,122 C38,112 16,90 16,62 L16,22 Z" fill="url(#eShield)" />
                  <path d="M60,14 L96,28 L96,62 C96,86 76,106 60,114 C44,106 24,86 24,62 L24,28 Z" fill="rgba(255,255,255,0.12)" />
                  {/* Checkmark */}
                  <path d="M36,65 L52,80 L84,50" stroke="#2d5a00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M36,65 L52,80 L84,50" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div style={{ width: '100%' }}>
                <p style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700, margin: '0 0 4px', textAlign: 'center' }}>AI Compliance Status</p>
                <p style={{ color: '#22C55E', fontSize: 12, margin: '0 0 12px', textAlign: 'center' }}>● All Rules Observed</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['Campaign Finance Verified', 'Donor Records Audited', 'Material Compliance OK'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'white', fontWeight: 900, flexShrink: 0 }}>✓</div>
                      <span style={{ color: '#94A3B8', fontSize: 11 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button style={{
                width: '100%', background: '#DC143C', color: 'white', border: 'none',
                borderRadius: 10, padding: '13px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(220,20,60,0.4)', marginTop: 'auto',
              }}>Submit Next Filing</button>
            </div>

            {/* Filing deadlines */}
            <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px' }}>
              <p style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700, margin: '0 0 12px' }}>Upcoming Deadlines</p>
              {[
                { label: 'Q2 Finance Report', date: 'May 14', days: 19, urgent: false },
                { label: 'Donor Disclosure', date: 'May 28', days: 33, urgent: false },
                { label: 'Electoral Audit', date: 'Jun 15', days: 51, urgent: false },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div>
                    <p style={{ color: '#CBD5E1', fontSize: 12, fontWeight: 600, margin: 0 }}>{d.label}</p>
                    <p style={{ color: '#475569', fontSize: 11, margin: '2px 0 0' }}>{d.date}</p>
                  </div>
                  <div style={{ background: d.urgent ? 'rgba(220,20,60,0.2)' : 'rgba(34,197,94,0.15)', borderRadius: 6, padding: '3px 10px' }}>
                    <span style={{ color: d.urgent ? '#DC143C' : '#4ADE80', fontSize: 11, fontWeight: 700 }}>{d.days}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
