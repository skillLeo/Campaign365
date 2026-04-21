'use client';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis,
  ResponsiveContainer, Tooltip, CartesianGrid,
} from 'recharts';

const TREND_DATA = [
  { month: 'Jan', raised: 45000 },
  { month: 'Feb', raised: 72000 },
  { month: 'Mar', raised: 58000 },
  { month: 'Apr', raised: 110000 },
  { month: 'May', raised: 95000 },
  { month: 'Jun', raised: 140000 },
  { month: 'Jul', raised: 125000 },
  { month: 'Aug', raised: 180000 },
  { month: 'Sep', raised: 165000 },
  { month: 'Oct', raised: 210000 },
  { month: 'Nov', raised: 195000 },
  { month: 'Dec', raised: 248750 },
];

const TOP_DONORS = [
  { rank: 1, name: 'Mrs. Patricia Liburd',   amount: '$4,820',  type: 'One-Time',  constituency: 'Basseterre' },
  { rank: 2, name: 'Mr. James Clarke',       amount: '$3,200',  type: 'Recurring', constituency: 'Nevis' },
  { rank: 3, name: 'Dr. Sylvia Warner',      amount: '$2,750',  type: 'One-Time',  constituency: 'Sandy Point' },
  { rank: 4, name: 'Hon. George Pemberton',  amount: '$2,100',  type: 'Recurring', constituency: 'Cayon' },
  { rank: 5, name: 'Ms. Angela Thomas',      amount: '$1,950',  type: 'One-Time',  constituency: 'Charlestown' },
];

const MONTHLY_BREAKDOWN = [
  { category: 'Individual Donations',  amount: '$748,220', pct: 58, color: '#DC143C' },
  { category: 'Corporate Sponsorships',amount: '$321,000', pct: 25, color: '#D4A017' },
  { category: 'Fundraising Events',    amount: '$128,500', pct: 10, color: '#4ADE80' },
  { category: 'Online Donations',      amount: '$87,000',  pct: 7,  color: '#60A5FA' },
];

function DollarSign() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="rgba(220,20,60,0.15)" />
      <text x="16" y="21" textAnchor="middle" fill="#DC143C" fontSize="16" fontWeight="900">$</text>
    </svg>
  );
}

function RankMedal({ rank }: { rank: number }) {
  const colors: Record<number, string> = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };
  const color = colors[rank] || '#475569';
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: rank <= 3 ? '#0F172A' : 'white', fontSize: 12, fontWeight: 900, flexShrink: 0,
    }}>{rank}</div>
  );
}

export default function FundraisingReportsPage() {
  const totalRaised = 1284720;
  const goal = 1400000;
  const pct = Math.round((totalRaised / goal) * 100);

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Hero header */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg,#1a0005 0%,#3d0010 40%,#1a0005 100%)',
        borderBottom: '1px solid rgba(220,20,60,0.2)',
      }}>
        {/* Decorative dollar wave */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.06 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', color: '#DC143C', fontSize: 48, fontWeight: 900,
              top: `${(i % 3) * 30}%`, left: `${i * 13}%`, transform: `rotate(${i * 15}deg)`,
            }}>$</div>
          ))}
        </div>
        <div style={{ position: 'relative', padding: '24px 24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#DC143C', fontSize: 11, fontWeight: 700, margin: '0 0 6px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Fundraising</p>
              <h1 style={{ color: 'white', fontSize: 28, fontWeight: 900, margin: '0 0 4px' }}>Fundraising Reports</h1>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>Campaign Finance Overview — April 2026</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#E2E8F0', borderRadius: 8, padding: '9px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>Export CSV</button>
              <button style={{
                background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
                padding: '9px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220,20,60,0.4)',
              }}>Compliance Report</button>
            </div>
          </div>

          {/* Big number */}
          <div style={{ marginTop: 20, marginBottom: 8 }}>
            <p style={{ color: '#64748B', fontSize: 12, margin: '0 0 4px' }}>TOTAL RAISED THIS CYCLE</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ color: '#DC143C', fontSize: 42, fontWeight: 900, lineHeight: 1 }}>$1,284,720</span>
              <span style={{ color: '#4ADE80', fontSize: 14, fontWeight: 700 }}>↑ {pct}% of goal</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 4 }}>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden', width: '100%', maxWidth: 600 }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#DC143C,#FF4444)', borderRadius: 4 }} />
            </div>
            <p style={{ color: '#475569', fontSize: 11, margin: '4px 0 0' }}>Goal: $1,400,000 · Remaining: $115,280</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
          {[
            { label: 'Total Raised', value: '$1,284,720', sub: '92% of goal', color: '#D4A017', icon: '$' },
            { label: 'Recurring Donors', value: '412', sub: '+28 this month', color: '#DC143C', icon: '♻' },
            { label: 'Top Donor', value: 'Mrs. Patricia Liburd', sub: '$4,820 donated', color: '#4ADE80', icon: '★' },
            { label: 'Avg. Donation', value: '$185', sub: '+12% vs last cycle', color: '#60A5FA', icon: '≈' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#64748B', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{card.label}</span>
                <span style={{ color: card.color, fontSize: 18, fontWeight: 900 }}>{card.icon}</span>
              </div>
              <p style={{ color: 'white', fontSize: 18, fontWeight: 900, margin: '0 0 4px' }}>{card.value}</p>
              <p style={{ color: '#4ADE80', fontSize: 11, margin: 0 }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Main grid: chart + breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, marginBottom: 20 }}>

          {/* Trend chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: '0 0 2px' }}>Fundraising Trend Over Time</p>
                <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>Monthly donations — 2026 Campaign Cycle</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 3, background: '#DC143C', borderRadius: 2 }} />
                <span style={{ color: '#94A3B8', fontSize: 11 }}>Total Raised</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="fundGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC143C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#DC143C" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, 'Raised']}
                />
                <Area type="monotone" dataKey="raised" stroke="#DC143C" strokeWidth={2.5} fill="url(#fundGrad)" dot={{ fill: '#DC143C', r: 4, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '20px',
          }}>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 16px' }}>Revenue Breakdown</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MONTHLY_BREAKDOWN.map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: '#C9D1DA', fontSize: 12 }}>{item.category}</span>
                    <span style={{ color: item.color, fontSize: 12, fontWeight: 700 }}>{item.amount}</span>
                  </div>
                  <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 3 }} />
                  </div>
                  <p style={{ color: '#475569', fontSize: 10, margin: '2px 0 0', textAlign: 'right' }}>{item.pct}%</p>
                </div>
              ))}
            </div>

            {/* SKNLP logo bottom */}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#DC143C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 20 14" width="20" height="14">
                  <polygon points="0,14 20,14 0,0" fill="#009E60" />
                  <polygon points="20,0 20,14 0,0" fill="#CE1126" />
                  <polygon points="0,0 2,0 20,12 18,14 0,14" fill="#000" />
                  <polygon points="2,0 4,0 20,9 20,12" fill="#FCD116" />
                  <polygon points="0,11 0,14 2,14 18,2 16,0" fill="#FCD116" />
                </svg>
              </div>
              <div>
                <p style={{ color: 'white', fontSize: 12, fontWeight: 800, margin: 0 }}>SKNLP</p>
                <p style={{ color: '#475569', fontSize: 10, margin: 0 }}>Campaign Finance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Donors Table */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>Top Donors</p>
            <button style={{ background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.3)', color: '#DC143C', borderRadius: 6, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>View All</button>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '50px 1fr 100px 100px 120px',
            padding: '8px 20px', color: '#475569', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            {['Rank', 'Donor Name', 'Amount', 'Type', 'Constituency'].map(h => <span key={h}>{h}</span>)}
          </div>
          {TOP_DONORS.map((d, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '50px 1fr 100px 100px 120px',
              padding: '12px 20px', alignItems: 'center',
              borderBottom: i < TOP_DONORS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              background: i === 0 ? 'rgba(212,160,23,0.05)' : 'transparent',
            }}>
              <RankMedal rank={d.rank} />
              <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>{d.name}</span>
              <span style={{ color: '#4ADE80', fontSize: 13, fontWeight: 700 }}>{d.amount}</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                background: d.type === 'Recurring' ? 'rgba(220,20,60,0.12)' : 'rgba(100,116,139,0.15)',
                color: d.type === 'Recurring' ? '#DC143C' : '#94A3B8',
                borderRadius: 5, padding: '2px 8px', fontSize: 11, fontWeight: 600, width: 'fit-content',
              }}>{d.type}</span>
              <span style={{ color: '#64748B', fontSize: 12 }}>{d.constituency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
