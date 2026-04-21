'use client';
import { useState } from 'react';

const TABS = ['Canvassers', 'Runners', 'Phone Bank', 'Volunteers'];

const LEADERBOARD_DATA: Record<string, Array<{ rank: number; name: string; score: number; unit: string; constituency: string; change: string }>> = {
  Canvassers: [
    { rank: 1, name: 'Marcus Williams',   score: 1240, unit: 'doors',  constituency: 'Basseterre Central',   change: '+12' },
    { rank: 2, name: 'Sheena Francis',    score: 1085, unit: 'doors',  constituency: 'St. Christopher 1',    change: '+8'  },
    { rank: 3, name: 'Anthony Browne',    score: 960,  unit: 'doors',  constituency: 'Sandy Point',          change: '+5'  },
    { rank: 4, name: 'Claudette Morris',  score: 892,  unit: 'doors',  constituency: 'Cayon',                change: '+3'  },
    { rank: 5, name: 'Joel Richardson',   score: 834,  unit: 'doors',  constituency: 'Nevis — Gingerland',   change: '+7'  },
    { rank: 6, name: 'Patrice Liburd',    score: 756,  unit: 'doors',  constituency: 'Charlestown',          change: '+2'  },
    { rank: 7, name: 'Devon Augustus',    score: 701,  unit: 'doors',  constituency: 'St. Christopher 2',    change: '+4'  },
    { rank: 8, name: 'Nalini Persad',     score: 648,  unit: 'doors',  constituency: 'Trinity Palmetto',     change: '+1'  },
  ],
  Runners: [
    { rank: 1, name: 'Omar Phillip',      score: 88,   unit: 'trips',  constituency: 'Basseterre',           change: '+6'  },
    { rank: 2, name: 'Kevin Fraser',      score: 72,   unit: 'trips',  constituency: 'Sandy Point',          change: '+4'  },
    { rank: 3, name: 'Tamara Kelly',      score: 65,   unit: 'trips',  constituency: 'Nevis',                change: '+3'  },
    { rank: 4, name: 'Brian Warner',      score: 58,   unit: 'trips',  constituency: 'Cayon',                change: '+2'  },
    { rank: 5, name: 'Sandra Nisbett',    score: 51,   unit: 'trips',  constituency: 'Charlestown',          change: '+1'  },
  ],
  'Phone Bank': [
    { rank: 1, name: 'Jasmine Clarke',    score: 520,  unit: 'calls',  constituency: 'St. Christopher 1',   change: '+22' },
    { rank: 2, name: 'Robert Hughes',     score: 448,  unit: 'calls',  constituency: 'Basseterre',           change: '+15' },
    { rank: 3, name: 'Amelia Pemberton',  score: 391,  unit: 'calls',  constituency: 'Sandy Point',          change: '+9'  },
    { rank: 4, name: 'Calvin Thomas',     score: 344,  unit: 'calls',  constituency: 'Nevis',                change: '+6'  },
    { rank: 5, name: 'Denise Carty',      score: 302,  unit: 'calls',  constituency: 'Cayon',                change: '+4'  },
    { rank: 6, name: 'Leonard Isaac',     score: 278,  unit: 'calls',  constituency: 'Charlestown',          change: '+3'  },
  ],
  Volunteers: [
    { rank: 1, name: 'Patricia James',    score: 48,   unit: 'hours',  constituency: 'Basseterre',           change: '+4'  },
    { rank: 2, name: 'Clarence Williams', score: 41,   unit: 'hours',  constituency: 'Sandy Point',          change: '+3'  },
    { rank: 3, name: 'Veronica Spencer',  score: 38,   unit: 'hours',  constituency: 'Nevis',                change: '+2'  },
    { rank: 4, name: 'Raymond Ottley',    score: 34,   unit: 'hours',  constituency: 'Cayon',                change: '+1'  },
  ],
};

const AVATAR_COLORS = ['#DC143C', '#D4A017', '#4ADE80', '#60A5FA', '#A78BFA', '#F97316', '#EC4899', '#14B8A6'];

function Avatar({ name, rank }: { name: string; rank: number }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const color = AVATAR_COLORS[rank % AVATAR_COLORS.length];
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: 14, fontWeight: 800, flexShrink: 0,
    }}>{initials}</div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#FFD700,#B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🥇</div>
  );
  if (rank === 2) return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#C0C0C0,#808080)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🥈</div>
  );
  if (rank === 3) return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#CD7F32,#8B4513)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🥉</div>
  );
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#64748B', fontSize: 14, fontWeight: 800,
    }}>{rank}</div>
  );
}

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState('Canvassers');
  const data = LEADERBOARD_DATA[activeTab] || [];
  const top = data[0];

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Header */}
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#DC143C', fontSize: 11, fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Campaign 365</p>
            <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: '0 0 4px' }}>Leaderboards</h1>
            <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>Top performing team members — April 2026</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#94A3B8', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>This Week</button>
            <button style={{
              background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
              padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(220,20,60,0.35)',
            }}>Export Report</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: activeTab === tab ? '#DC143C' : 'rgba(255,255,255,0.05)',
              border: '1px solid ' + (activeTab === tab ? '#DC143C' : 'rgba(255,255,255,0.1)'),
              color: 'white', borderRadius: 20, padding: '7px 18px',
              fontSize: 12, fontWeight: activeTab === tab ? 700 : 500, cursor: 'pointer',
            }}>{tab}</button>
          ))}
        </div>

        {/* Main grid: list + spotlight */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, alignItems: 'start' }}>

          {/* Leaderboard list */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>{activeTab} Rankings</p>
            </div>

            {data.map((person, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
                borderBottom: i < data.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: i === 0 ? 'rgba(212,160,23,0.06)' : i === 1 ? 'rgba(255,255,255,0.02)' : 'transparent',
                transition: 'background 0.2s',
              }}>
                <RankBadge rank={person.rank} />
                <Avatar name={person.name} rank={i} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 700 }}>{person.name}</span>
                    {i === 0 && <span style={{ background: '#D4A017', color: '#0F172A', borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 800 }}>TOP PERFORMER</span>}
                  </div>
                  <span style={{ color: '#475569', fontSize: 11 }}>{person.constituency}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#DC143C', fontSize: 16, fontWeight: 900, margin: '0 0 2px' }}>{person.score.toLocaleString()}</p>
                  <p style={{ color: '#475569', fontSize: 10, margin: 0 }}>{person.unit}</p>
                </div>
                <div style={{
                  background: 'rgba(74,222,128,0.12)', color: '#4ADE80',
                  borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 700, minWidth: 36, textAlign: 'center',
                }}>{person.change}</div>
              </div>
            ))}
          </div>

          {/* Spotlight panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Top Performer Spotlight */}
            {top && (
              <div style={{
                background: 'linear-gradient(135deg,rgba(212,160,23,0.12) 0%,rgba(212,160,23,0.04) 100%)',
                border: '1px solid rgba(212,160,23,0.25)', borderRadius: 14, padding: '20px', textAlign: 'center',
              }}>
                <p style={{ color: '#D4A017', fontSize: 11, fontWeight: 700, margin: '0 0 12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Top Performer Spotlight</p>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🥇</div>
                <Avatar name={top.name} rank={0} />
                <p style={{ color: 'white', fontSize: 16, fontWeight: 900, margin: '10px 0 2px' }}>{top.name}</p>
                <p style={{ color: '#94A3B8', fontSize: 11, margin: '0 0 14px' }}>{top.constituency}</p>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '10px 0' }}>
                  <p style={{ color: '#D4A017', fontSize: 28, fontWeight: 900, margin: '0 0 2px' }}>{top.score.toLocaleString()}</p>
                  <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>{top.unit} this cycle</p>
                </div>
              </div>
            )}

            {/* Stats summary */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '16px',
            }}>
              <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 12px' }}>Category Summary</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Total Participants', value: `${data.length}` },
                  { label: 'Total ' + (data[0]?.unit || 'activity'), value: data.reduce((a, b) => a + b.score, 0).toLocaleString() },
                  { label: 'Avg Score', value: data.length ? Math.round(data.reduce((a, b) => a + b.score, 0) / data.length).toLocaleString() : '0' },
                  { label: 'Constituencies Covered', value: new Set(data.map(d => d.constituency)).size.toString() },
                ].map((stat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontSize: 12 }}>{stat.label}</span>
                    <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700 }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SKNLP branding */}
            <div style={{
              background: 'rgba(220,20,60,0.06)', border: '1px solid rgba(220,20,60,0.15)',
              borderRadius: 14, padding: '14px', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 20 14" width="22" height="15">
                  <polygon points="0,14 20,14 0,0" fill="#009E60" />
                  <polygon points="20,0 20,14 0,0" fill="#CE1126" />
                  <polygon points="0,0 2,0 20,12 18,14 0,14" fill="#000" />
                  <polygon points="2,0 4,0 20,9 20,12" fill="#FCD116" />
                  <polygon points="0,11 0,14 2,14 18,2 16,0" fill="#FCD116" />
                </svg>
              </div>
              <div>
                <p style={{ color: 'white', fontSize: 13, fontWeight: 800, margin: 0 }}>SKNLP</p>
                <p style={{ color: '#64748B', fontSize: 10, margin: 0 }}>St. Kitts Nevis Labour Party</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
