'use client';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, ComposedChart, Area, Line } from 'recharts';

const TREND_DATA = [
  { month: 'Gelg', raised: 45000,  bar: 30000 },
  { month: 'Aobl', raised: 72000,  bar: 55000 },
  { month: 'Dolr', raised: 110000, bar: 85000 },
  { month: 'Acu',  raised: 155000, bar: 120000},
  { month: 'Palm', raised: 210000, bar: 170000},
];

const TOP_DONORS = [
  { rank: '1.', name: 'Mr. Patricia Liburd', amount: '$4,820', date: '2023-10-15' },
  { rank: '2.', name: 'Mr. James Hodge',     amount: '$3,150', date: '2023-09-22' },
  { rank: '3.', name: 'Mr. Pames Vodge',     amount: '$3,200', date: '2023-09-22' },
];

function PalmLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg viewBox="0 0 60 70" width="50" height="58">
        <path d="M30,70 Q29,52 31,36 Q32,26 33,18" stroke="#228b22" strokeWidth="4" fill="none" />
        <path d="M33,18 Q20,8 6,6 Q20,16 22,26" fill="#2ea82e" />
        <path d="M33,18 Q26,4 20,0 Q34,10 34,22" fill="#228b22" />
        <path d="M33,18 Q46,6 56,2 Q42,14 38,24" fill="#2ea82e" />
        <rect x="18" y="38" width="24" height="16" rx="2" fill="#DC143C" />
        <text x="30" y="50" textAnchor="middle" fill="white" fontSize="7" fontWeight="900">SKNLP</text>
      </svg>
      <div>
        <p style={{ color: 'white', fontSize: 12, fontWeight: 900, margin: 0, lineHeight: 1 }}>ST. KITTS NEVIS</p>
        <p style={{ color: '#DC143C', fontSize: 12, fontWeight: 900, margin: '2px 0 0', lineHeight: 1 }}>LABOUR PARTY</p>
        <p style={{ color: '#475569', fontSize: 9, margin: '3px 0 0' }}>© 2023 Campaign 365</p>
      </div>
    </div>
  );
}

export default function FundraisingReportsPage() {
  return (
    <div style={{
      minHeight: '100vh', fontFamily: "'Inter',sans-serif",
      background: `
        radial-gradient(ellipse at 30% 20%, rgba(0,80,20,0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 60%, rgba(20,60,10,0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 90%, rgba(0,40,10,0.3) 0%, transparent 40%),
        #080d08
      `,
    }}>
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: 0 }}>
              Fundraising <span style={{ color: '#DC143C' }}>Reports</span>
            </h1>
            <button style={{ background: '#DC143C', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(220,20,60,0.4)' }}>Reports</button>
          </div>

          {/* 3 KPI cards */}
          <div className="rg-3" style={{ gap: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#94A3B8', fontSize: 11, margin: '0 0 6px', textTransform: 'uppercase', fontWeight: 600 }}>Total Raised</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'white', fontSize: 20, fontWeight: 900 }}>$1,284,720</span>
                  <span style={{ color: '#DC143C', fontSize: 14, fontWeight: 900 }}>• 92%</span>
                </div>
              </div>
              <span style={{ fontSize: 26 }}>🪙</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#94A3B8', fontSize: 11, margin: '0 0 6px', textTransform: 'uppercase', fontWeight: 600 }}>Recurring Donors</p>
                <span style={{ color: 'white', fontSize: 26, fontWeight: 900 }}>412</span>
              </div>
              <span style={{ fontSize: 26 }}>❤️</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#94A3B8', fontSize: 11, margin: '0 0 4px', textTransform: 'uppercase', fontWeight: 600 }}>Top Donor:</p>
                <p style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, margin: '0 0 4px' }}>Mrs. Patricia Liburd</p>
                <span style={{ color: 'white', fontSize: 20, fontWeight: 900 }}>$4,820</span>
              </div>
              <span style={{ fontSize: 26 }}>🏆</span>
            </div>
          </div>

          {/* Trend chart */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: 0 }}>Fundraising Trend Over Time</p>
              <span style={{ color: '#DC143C', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>View All</span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 80%, rgba(212,160,23,0.15) 0%, transparent 60%)' }} />
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={TREND_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                  <defs>
                    <linearGradient id="frBarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#DC143C" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#8B0000" stopOpacity={0.3} />
                    </linearGradient>
                    <linearGradient id="frLineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4A017" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#D4A017" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} formatter={(v) => [`$${Number(v).toLocaleString()}`, '']} />
                  <Bar dataKey="bar" fill="url(#frBarGrad)" radius={[4,4,0,0]} />
                  <Area type="monotone" dataKey="raised" stroke="#D4A017" strokeWidth={3} fill="url(#frLineGrad)" dot={{ fill: '#D4A017', r: 5, strokeWidth: 0 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donors table */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 130px 60px', minWidth: 'max-content', padding: '8px 20px', color: '#475569', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['Rank','Name','Amount','Date','View All'].map(h => <span key={h}>{h}</span>)}
            </div>
            {TOP_DONORS.map((d, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 130px 60px', minWidth: 'max-content', padding: '10px 20px', alignItems: 'center', borderBottom: i < TOP_DONORS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <span style={{ color: '#64748B', fontSize: 13 }}>{d.rank}</span>
                <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>{d.name}</span>
                <span style={{ color: '#4ADE80', fontSize: 13, fontWeight: 700 }}>{d.amount}</span>
                <span style={{ color: '#64748B', fontSize: 12 }}>{d.date}</span>
                <span />
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <PalmLogo />
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#E2E8F0', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Export CSV</button>
              <button style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#E2E8F0', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Compliance Report</button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['📸','👍','▶️','⚙️'].map((icon, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13 }}>{icon}</div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}
