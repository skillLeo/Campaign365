'use client';
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const DONOR_CRM = [
  { name: 'Appor/10agn', amount: '$509pm', date: '00pm', constituency: 'Constifivity' },
  { name: 'Appor/11agn', amount: '$40ppm',  date: '00pm', constituency: 'Constifivity' },
  { name: 'Appor/11agn', amount: '$56ppm',  date: '00pm', constituency: 'Constifivity' },
  { name: 'Appor/11agn', amount: '$20ppm',  date: '00pm', constituency: 'Constifivity' },
];

const BAR_DATA = [
  { x: 1,  v: 18,  trend: 22  },
  { x: 2,  v: 38,  trend: 33  },
  { x: 3,  v: 52,  trend: 43  },
  { x: 4,  v: 33,  trend: 53  },
  { x: 5,  v: 68,  trend: 62  },
  { x: 8,  v: 78,  trend: 76  },
  { x: 9,  v: 108, trend: 100 },
  { x: 10, v: 148, trend: 108 },
];

/* Gold glowing dot for the trend line — highlight at x=9 */
function TrendDot(props: any) {
  const { cx, cy, index } = props;
  if (!cx || !cy) return null;
  if (index === 6) { // x=9
    return (
      <g>
        <circle cx={cx} cy={cy} r={14} fill="#FFD700" fillOpacity={0.18} />
        <circle cx={cx} cy={cy} r={9}  fill="#FFD700" fillOpacity={0.35} />
        <circle cx={cx} cy={cy} r={6}  fill="#FFD700" />
        <circle cx={cx} cy={cy} r={3}  fill="white" />
      </g>
    );
  }
  return null;
}

/* Flying dollar bills SVG illustration */
function FlyingMoney() {
  return (
    <svg viewBox="0 0 220 160" width="220" height="160" style={{ display: 'block' }}>
      {/* Bill 1 — center, slight tilt */}
      <g transform="rotate(-15, 110, 80)">
        <rect x="60" y="55" width="80" height="40" rx="4" fill="#1A7A2E" stroke="#2E9E42" strokeWidth="1"/>
        <rect x="65" y="60" width="70" height="30" rx="2" fill="none" stroke="#2E9E42" strokeWidth="0.5" opacity="0.5"/>
        <text x="100" y="79" textAnchor="middle" fill="#98F5A0" fontSize="11" fontWeight="bold">$100</text>
        <circle cx="76" cy="75" r="6" fill="none" stroke="#2E9E42" strokeWidth="0.8"/>
        <circle cx="124" cy="75" r="6" fill="none" stroke="#2E9E42" strokeWidth="0.8"/>
      </g>
      {/* Bill 2 — top right, more tilt */}
      <g transform="rotate(12, 155, 45)">
        <rect x="115" y="20" width="72" height="36" rx="3" fill="#1A7A2E" stroke="#2E9E42" strokeWidth="1"/>
        <rect x="119" y="24" width="64" height="28" rx="2" fill="none" stroke="#2E9E42" strokeWidth="0.5" opacity="0.5"/>
        <text x="151" y="41" textAnchor="middle" fill="#98F5A0" fontSize="10" fontWeight="bold">$100</text>
      </g>
      {/* Bill 3 — left, falling */}
      <g transform="rotate(-25, 70, 60)">
        <rect x="30" y="30" width="68" height="34" rx="3" fill="#1A7A2E" stroke="#2E9E42" strokeWidth="1"/>
        <rect x="34" y="34" width="60" height="26" rx="2" fill="none" stroke="#2E9E42" strokeWidth="0.5" opacity="0.5"/>
        <text x="64" y="50" textAnchor="middle" fill="#98F5A0" fontSize="9" fontWeight="bold">$100</text>
      </g>
      {/* Bill 4 — bottom right */}
      <g transform="rotate(20, 160, 110)">
        <rect x="130" y="90" width="65" height="32" rx="3" fill="#1A7A2E" stroke="#2E9E42" strokeWidth="1"/>
        <rect x="134" y="94" width="57" height="24" rx="2" fill="none" stroke="#2E9E42" strokeWidth="0.5" opacity="0.5"/>
        <text x="162" y="109" textAnchor="middle" fill="#98F5A0" fontSize="9" fontWeight="bold">$100</text>
      </g>
      {/* Coin 1 */}
      <circle cx="50" cy="100" r="12" fill="#FFD700" stroke="#FFA000" strokeWidth="1.5"/>
      <text x="50" y="105" textAnchor="middle" fill="#7A5000" fontSize="10" fontWeight="bold">$</text>
      {/* Coin 2 */}
      <circle cx="185" cy="65" r="9" fill="#FFD700" stroke="#FFA000" strokeWidth="1"/>
      <text x="185" y="69" textAnchor="middle" fill="#7A5000" fontSize="8" fontWeight="bold">$</text>
      {/* Coin 3 */}
      <circle cx="95" cy="130" r="8" fill="#FFD700" stroke="#FFA000" strokeWidth="1"/>
      <text x="95" y="134" textAnchor="middle" fill="#7A5000" fontSize="7" fontWeight="bold">$</text>
    </svg>
  );
}

/* Gold stacked dollar icon for stat cards */
function GoldDollarStack({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      {/* Stack of bills */}
      <rect x="4" y="22" width="32" height="14" rx="3" fill="#B8860B" />
      <rect x="4" y="18" width="32" height="14" rx="3" fill="#DAA520" />
      <rect x="4" y="14" width="32" height="14" rx="3" fill="#FFD700" stroke="#DAA520" strokeWidth="0.5"/>
      <text x="20" y="25" textAnchor="middle" fill="#7A5000" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}

export default function FundraisingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B1320',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── Internal top bar ── */}
      <div style={{
        backgroundColor: '#0F172A',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        padding: '0 22px',
        flexShrink: 0,
      }}>
        {/* Left: search + breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span style={{ fontSize: 13, color: '#CBD5E1', fontWeight: 600 }}>Client</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          <span style={{ color: '#475569', fontSize: 12, margin: '0 4px' }}>|</span>
          <span style={{ fontSize: 13, color: '#CBD5E1', fontWeight: 600 }}>Web Dashboard</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div style={{ flex: 1 }} />
        {/* Right: bell + user */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div style={{
              position: 'absolute', top: -5, right: -5,
              width: 14, height: 14, borderRadius: '50%',
              backgroundColor: '#DC143C', color: 'white',
              fontSize: 8, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>1</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 13, color: '#CBD5E1', fontWeight: 600 }}>Apilis</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            backgroundColor: '#DC143C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: 'white',
            border: '2px solid rgba(255,255,255,0.2)',
          }}>A</div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Title row: red title left + flying money right */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <h1 style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 900,
            fontSize: 36,
            color: '#E53E3E',
            margin: 0,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}>
            Fundraising Dashboard
          </h1>
          <div style={{ flexShrink: 0, marginTop: -10 }}>
            <FlyingMoney />
          </div>
        </div>

        {/* ── 3 Stat Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 14 }}>

          {/* Total Raised */}
          <div style={{
            backgroundColor: '#141D2E',
            borderRadius: 12,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ fontSize: 14, color: '#94A3B8', margin: 0, fontWeight: 600 }}>Total Raised</p>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 12px', borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#1E293B',
                color: '#CBD5E1', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                $ <span style={{ fontSize: 9 }}>▾</span>
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 900, fontSize: 32,
                color: '#FFFFFF', margin: 0, lineHeight: 1,
              }}>$184,720</p>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
                • Goal $250,000 (74%)
              </p>
            </div>
            {/* Gold-to-red gradient progress bar */}
            <div style={{ height: 8, backgroundColor: '#1E293B', borderRadius: 4, overflow: 'hidden', marginTop: 14 }}>
              <div style={{
                width: '74%', height: '100%', borderRadius: 4,
                background: 'linear-gradient(90deg, #FFD700 0%, #FF8C00 45%, #DC143C 100%)',
              }} />
            </div>
          </div>

          {/* Recurring Donors */}
          <div style={{
            backgroundColor: '#141D2E',
            borderRadius: 12,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <p style={{ fontSize: 14, color: '#94A3B8', margin: '0 0 16px', fontWeight: 600 }}>
              Recurring Donors
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <GoldDollarStack size={44} />
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 900, fontSize: 42,
                color: '#FFFFFF', margin: 0, lineHeight: 1,
              }}>312</p>
            </div>
          </div>

          {/* Events Upcoming */}
          <div style={{
            backgroundColor: '#141D2E',
            borderRadius: 12,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <p style={{ fontSize: 14, color: '#94A3B8', margin: '0 0 16px', fontWeight: 600 }}>
              Events Upcoming
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <GoldDollarStack size={40} />
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 900, fontSize: 42,
                color: '#FFFFFF', margin: 0, lineHeight: 1,
              }}>3</p>
            </div>
          </div>
        </div>

        {/* ── Donor CRM + Chart (one card) ── */}
        <div style={{
          backgroundColor: '#141D2E',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          {/* Card header */}
          <div style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Donor CRM</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Sencch search pill */}
              <button style={{
                padding: '6px 16px', borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#1E293B',
                color: '#CBD5E1', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>Sencch</button>
              {/* Cursor icon */}
              <button style={{
                width: 34, height: 34, borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#2D3A50',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#CBD5E1', fontSize: 14,
              }}>↖</button>
              {/* Clock icon */}
              <button style={{
                width: 34, height: 34, borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#1E293B',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748B', fontSize: 14,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </button>
              {/* Hamburger */}
              <button style={{
                width: 34, height: 34, borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#1E293B',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748B', fontSize: 14,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Table + Chart side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px' }}>

            {/* Table */}
            <div style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Donor Name', 'Amount', 'Date', 'Constituency'].map(h => (
                      <th key={h} style={{
                        padding: '12px 18px',
                        textAlign: 'left',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#94A3B8',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DONOR_CRM.map((d, i) => (
                    <tr key={i} style={{
                      backgroundColor: i % 2 === 1 ? 'rgba(255,255,255,0.04)' : 'transparent',
                    }}>
                      <td style={{ padding: '13px 18px', fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{d.name}</td>
                      <td style={{ padding: '13px 18px', fontSize: 13, color: '#FFFFFF', fontWeight: 600 }}>{d.amount}</td>
                      <td style={{ padding: '13px 18px', fontSize: 13, color: '#64748B' }}>{d.date}</td>
                      <td style={{ padding: '13px 18px', fontSize: 13, color: '#94A3B8' }}>{d.constituency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bar + Gold line chart */}
            <div style={{
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 16px 12px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={BAR_DATA} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#FF4444" stopOpacity={1} />
                      <stop offset="100%" stopColor="#8B0000" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="x"
                    tick={{ fill: '#475569', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    ticks={[0, 25, 40, 60, 100, 150]}
                    tick={{ fill: '#475569', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 160]}
                  />
                  <Bar dataKey="v" radius={[3, 3, 0, 0]} barSize={22}>
                    {BAR_DATA.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i === BAR_DATA.length - 1 ? '#FFD700' : 'url(#barGrad)'}
                      />
                    ))}
                  </Bar>
                  <Line
                    type="monotone"
                    dataKey="trend"
                    stroke="#FFD700"
                    strokeWidth={3}
                    dot={<TrendDot />}
                    activeDot={false}
                    strokeOpacity={0.9}
                    filter="drop-shadow(0 0 6px #FFD700)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: 'flex', gap: 24, paddingBottom: 8 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'none', border: 'none',
            cursor: 'pointer', fontFamily: 'inherit',
            padding: '4px 0',
          }}>
            <GoldDollarStack size={32} />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0' }}>Launch Donation Drive</span>
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'none', border: 'none',
            cursor: 'pointer', fontFamily: 'inherit',
            padding: '4px 0',
          }}>
            <GoldDollarStack size={32} />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0' }}>Send Pledge Reminder</span>
          </button>
        </div>

      </div>
    </div>
  );
}
