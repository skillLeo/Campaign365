'use client';
import { useState } from 'react';

const TABS = ['Canvassers', 'Runners', 'Phone Bank', 'Volunteers'];

const DATA: Record<string, Array<{ name: string; score: number; unit: string }>> = {
  Canvassers: [
    { name: 'Sarah James',       score: 1287, unit: 'Voters Contacted' },
    { name: 'Michael Thompson',  score: 1156, unit: 'Voters Contacted' },
    { name: 'Rarvel Kiogmon',    score: 1156, unit: 'Voters Contacted' },
    { name: 'Ruch Freeh',        score: 1239, unit: 'Voters Contacted' },
    { name: 'Cooh Rapes',        score: 1207, unit: 'Voters Contacted' },
    { name: 'Keaun Sppp',        score: 1756, unit: 'Voters Contacted' },
    { name: 'Jooh Hopin',        score: 1277, unit: 'Voters Contacted' },
    { name: 'Jurvy Duran',       score: 1276, unit: 'Voters Contacted' },
  ],
  Runners: [
    { name: 'Omar Phillip',      score: 88,  unit: 'Trips Completed'  },
    { name: 'Kevin Fraser',      score: 72,  unit: 'Trips Completed'  },
    { name: 'Tamara Kelly',      score: 65,  unit: 'Trips Completed'  },
    { name: 'Brian Warner',      score: 58,  unit: 'Trips Completed'  },
  ],
  'Phone Bank': [
    { name: 'Jasmine Clarke',    score: 520, unit: 'Calls Made'       },
    { name: 'Robert Hughes',     score: 448, unit: 'Calls Made'       },
    { name: 'Amelia Pemberton',  score: 391, unit: 'Calls Made'       },
    { name: 'Calvin Thomas',     score: 344, unit: 'Calls Made'       },
  ],
  Volunteers: [
    { name: 'Patricia James',    score: 48,  unit: 'Hours Volunteered' },
    { name: 'Clarence Williams', score: 41,  unit: 'Hours Volunteered' },
    { name: 'Veronica Spencer',  score: 38,  unit: 'Hours Volunteered' },
    { name: 'Raymond Ottley',    score: 34,  unit: 'Hours Volunteered' },
  ],
};

const AVATAR_COLORS = [
  '#6B4226','#4A3728','#7C5234','#5C4033',
  '#3D2B1F','#8B5E3C','#4E342E','#6D4C41',
];

function PersonCard({ name, score, unit, avatarColor }: { name: string; score: number; unit: string; avatarColor: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <div style={{
      background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12, padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 12, flex: 1,
    }}>
      {/* Avatar */}
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: `radial-gradient(circle at 40% 35%, ${avatarColor}dd, ${avatarColor}88)`,
        border: '2px solid rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.9)', fontSize: 15, fontWeight: 800, flexShrink: 0,
      }}>{initials}</div>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name} — {score.toLocaleString()}
        </p>
        <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>{unit}</p>
      </div>
      {/* Trophy */}
      <span style={{ fontSize: 20, flexShrink: 0 }}>🏆</span>
    </div>
  );
}

// Illustrated volunteer artwork (SVG)
function VolunteerArtLeft() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" opacity="0.85">
      {/* Background red flag */}
      <rect x="60" y="10" width="50" height="35" rx="2" fill="#DC143C" />
      <line x1="60" y1="10" x2="60" y2="80" stroke="#8B4513" strokeWidth="3" />
      {/* Person 1 */}
      <circle cx="40" cy="65" r="14" fill="#5C3317" />
      <rect x="26" y="78" width="28" height="40" rx="4" fill="#DC143C" />
      <text x="40" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">SK</text>
      {/* Person 2 */}
      <circle cx="80" cy="60" r="14" fill="#7B4F2E" />
      <rect x="66" y="73" width="28" height="45" rx="4" fill="#DC143C" />
      <text x="80" y="65" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">NL</text>
      {/* Person 3 */}
      <circle cx="120" cy="68" r="12" fill="#4A2C17" />
      <rect x="108" y="79" width="24" height="40" rx="4" fill="#DC143C" />
      <text x="120" y="73" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">P</text>
    </svg>
  );
}

function VolunteerArtRight() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" opacity="0.85" style={{ transform: 'scaleX(-1)' }}>
      <rect x="60" y="10" width="50" height="35" rx="2" fill="#009E60" />
      <line x1="60" y1="10" x2="60" y2="80" stroke="#8B4513" strokeWidth="3" />
      <circle cx="40" cy="65" r="14" fill="#6B4226" />
      <rect x="26" y="78" width="28" height="40" rx="4" fill="#DC143C" />
      <text x="40" y="70" textAnchor="middle" fill="white" fontSize="8" fontWeight="800">SK</text>
      <circle cx="80" cy="60" r="14" fill="#8B5E3C" />
      <rect x="66" y="73" width="28" height="45" rx="4" fill="#DC143C" />
      <text x="80" y="65" textAnchor="middle" fill="white" fontSize="8" fontWeight="800">NL</text>
      <circle cx="120" cy="68" r="12" fill="#5C4033" />
      <rect x="108" y="79" width="24" height="40" rx="4" fill="#DC143C" />
      <text x="120" y="73" textAnchor="middle" fill="white" fontSize="8" fontWeight="800">P</text>
    </svg>
  );
}

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState('Canvassers');
  const list = DATA[activeTab] || [];
  const top = list[0];
  const rows = [];
  for (let i = 0; i < list.length; i += 2) {
    rows.push(list.slice(i, i + 2));
  }

  return (
    <div style={{
      minHeight: '100vh', fontFamily: "'Inter',sans-serif",
      background: 'linear-gradient(160deg,#C00010 0%,#8B000A 40%,#6B0008 70%,#4a0005 100%)',
    }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', background: 'rgba(0,0,0,0.2)',
      }}>
        {/* Left: SKNLP logo + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg viewBox="0 0 20 14" width="28" height="20">
              <polygon points="0,14 20,14 0,0" fill="#009E60" />
              <polygon points="20,0 20,14 0,0" fill="#CE1126" />
              <polygon points="0,0 2,0 20,12 18,14 0,14" fill="#000" />
              <polygon points="2,0 4,0 20,9 20,12" fill="#FCD116" />
              <polygon points="0,11 0,14 2,14 18,2 16,0" fill="#FCD116" />
            </svg>
            <span style={{ color: 'white', fontSize: 20, fontWeight: 900, letterSpacing: '0.04em' }}>SKNLP</span>
          </div>
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 18, height: 2, background: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />)}
          </div>
        </div>

        {/* Right: avatar + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
          <button style={{
            background: '#0F172A', color: 'white', border: 'none', borderRadius: 8,
            padding: '8px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>Logout</button>
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '20px 24px 0' }}>
        <h1 style={{ color: 'white', fontSize: 32, fontWeight: 900, margin: '0 0 16px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Leaderboards</h1>

        {/* Main card */}
        <div style={{
          background: '#13131f', borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>
          {/* Tab bar */}
          <div style={{
            display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '0 20px',
          }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: activeTab === tab ? 'white' : '#64748B',
                fontSize: 13, fontWeight: activeTab === tab ? 700 : 500,
                padding: '14px 20px',
                borderBottom: activeTab === tab ? '2px solid #DC143C' : '2px solid transparent',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}>{tab}</button>
            ))}
          </div>

          <div className="rg-chart-panel" style={{ }}>

            {/* Left: ranked list */}
            <div style={{ padding: '16px 20px 0' }}>
              <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {activeTab === 'Canvassers' ? 'Cescahets' : activeTab}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {rows.map((pair, ri) => (
                  <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Rank number */}
                    <div style={{
                      width: 28, flexShrink: 0,
                      color: '#94A3B8', fontSize: 16, fontWeight: 800, textAlign: 'center',
                    }}>{ri + 1}</div>
                    {/* Two cards */}
                    <div className="rg-2" style={{ gap: 10, flex: 1 }}>
                      {pair.map((person, pi) => (
                        <PersonCard
                          key={pi}
                          name={person.name}
                          score={person.score}
                          unit={person.unit}
                          avatarColor={AVATAR_COLORS[(ri * 2 + pi) % AVATAR_COLORS.length]}
                        />
                      ))}
                      {pair.length === 1 && <div />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom illustration */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
                <VolunteerArtLeft />
                <VolunteerArtRight />
              </div>
            </div>

            {/* Right: Top Performer Spotlight */}
            <div style={{
              borderLeft: '1px solid rgba(255,255,255,0.07)',
              padding: '20px 18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 20px', alignSelf: 'flex-start' }}>Top Performer Spotlight</p>

              {/* Gold medal */}
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg,#FFD700,#C9A000)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, marginBottom: 16,
                boxShadow: '0 8px 24px rgba(212,160,23,0.5)',
              }}>⭐</div>

              {top && (
                <>
                  <p style={{ color: 'white', fontSize: 18, fontWeight: 900, margin: '0 0 8px', textAlign: 'center' }}>{top.name}</p>
                  <p style={{ color: '#D4A017', fontSize: 48, fontWeight: 900, margin: '0 0 4px', lineHeight: 1 }}>{top.score.toLocaleString()}</p>
                  <p style={{ color: '#475569', fontSize: 11, margin: 0 }}>{top.unit}</p>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.2)',
          }}>
            <span style={{ color: '#475569', fontSize: 11 }}>© 2023 Campaign 365. All rights reserved.</span>
            <span style={{ color: '#475569', fontSize: 11 }}>Version 2.1.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
