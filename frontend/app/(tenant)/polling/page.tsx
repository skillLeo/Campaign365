'use client';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const PIE_DATA = [
  { name: 'SKNLP',      value: 62, color: '#E05252' },
  { name: 'Opposition', value: 28, color: '#C8A84B' },
  { name: '10%',        value: 8,  color: '#A0896A' },
  { name: 'Undecided',  value: 2,  color: '#D4D8E0' },
];

const SUPPORT_TREND = [
  { day: 'Aun', val: 16000 },
  { day: '2ub', val: 20    },
  { day: 'Aud', val: 8000  },
  { day: 'Ted', val: 10000 },
];

const LIVE_RESULTS = [
  { q: 'Preferred Party?', answer: 'St. Kitts Nevis Labour Party', response: 'Other', bars: [{ color: '#C8A84B', width: '68%' }] },
  { q: 'Preferred Party?', answer: 'St. Kitts Nevis Labour Party', response: 'Other', bars: [{ color: '#C8A84B', width: '52%' }] },
  { q: 'Preferred Party?', answer: 'St. Kitts Nevis Labour Party', response: 'Other', bars: [{ color: '#C8A84B', width: '52%' }] },
  { q: 'Preferred Party?', answer: 'Other',                        response: '',      bars: [{ color: '#E05252', width: '32%' }, { color: '#C8A84B', width: '22%' }] },
];

/* Glowing dot for line chart */
function GlowDot(props: any) {
  const { cx, cy } = props;
  if (!cx || !cy) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} fill="#DC143C" fillOpacity={0.15} />
      <circle cx={cx} cy={cy} r={7}  fill="#DC143C" fillOpacity={0.30} />
      <circle cx={cx} cy={cy} r={4}  fill="white" />
    </g>
  );
}

/* Crowd rally illustration */
function CrowdImage() {
  const personColors  = ['#E67E22','#3498DB','#E74C3C','#27AE60','#9B59B6','#F1C40F','#1ABC9C','#E91E63','#00BCD4','#FF5722','#8BC34A','#FF9800'];
  const skinTones     = ['#F5CBA7','#FDEBD0','#D4AC0D','#F1948A','#85C1E9','#A9DFBF','#F8C471','#BB8FCE','#76D7C4','#F0B27A','#AED6F1','#FAD7A0'];
  return (
    <svg viewBox="0 0 400 180" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A5276" />
          <stop offset="100%" stopColor="#2471A3" />
        </linearGradient>
        <linearGradient id="cFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1A1E2D" stopOpacity={1} />
          <stop offset="35%"  stopColor="#1A1E2D" stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#cSky)" />
      {/* Far row – small silhouettes */}
      {Array.from({ length: 22 }, (_, i) => (
        <g key={`f${i}`}>
          <circle cx={i * 19 + 10} cy={128} r={7}  fill={personColors[i % 12]} />
          <rect   x={i * 19 + 3}   y={134}  width={13} height={16} rx={3} fill={personColors[(i + 5) % 12]} />
        </g>
      ))}
      {/* Mid row */}
      {Array.from({ length: 17 }, (_, i) => (
        <g key={`m${i}`}>
          <circle cx={i * 24 + 12} cy={148} r={9}  fill={skinTones[i % 12]} />
          <rect   x={i * 24 + 3}   y={156}  width={17} height={22} rx={3} fill={personColors[(i + 3) % 12]} />
        </g>
      ))}
      {/* Front row – large */}
      {Array.from({ length: 13 }, (_, i) => (
        <g key={`fr${i}`}>
          <circle cx={i * 32 + 16} cy={163} r={12} fill={skinTones[(i + 4) % 12]} />
          <rect   x={i * 32 + 4}   y={174}  width={22} height={6}  rx={2} fill={personColors[(i + 7) % 12]} />
        </g>
      ))}
      {/* Palm trees */}
      <rect x={350} y={55} width={7} height={80} fill="#5D4037" rx={2} />
      <ellipse cx={350} cy={52} rx={26} ry={16} fill="#229954" />
      <ellipse cx={363} cy={46} rx={18} ry={12} fill="#2ECC71" />
      <ellipse cx={337} cy={46} rx={18} ry={12} fill="#2ECC71" />
      {/* Rally sign */}
      <rect x={155} y={88} width={52} height={30} rx={4} fill="#DC143C" />
      <text x={181} y={108} textAnchor="middle" fill="white" fontSize={9} fontWeight={800}>SKNLP</text>
      {/* Left overlay fade */}
      <rect width="400" height="180" fill="url(#cFade)" />
    </svg>
  );
}

export default function PollingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B1320',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── 1. Header bar: dark crimson ── */}
      <div style={{
        background: 'linear-gradient(90deg, #7C0A1A 0%, #8B1919 100%)',
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <h1 style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 800,
          fontSize: 34,
          color: '#FFFFFF',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          Polling &amp; Surveys
        </h1>
        <button style={{
          padding: '10px 22px',
          borderRadius: 8,
          border: 'none',
          background: 'linear-gradient(90deg, #DC143C 0%, #C01230 100%)',
          color: 'white',
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: '0 2px 12px rgba(220,20,60,0.5)',
        }}>
          Create New Poll
        </button>
      </div>

      {/* ── 2. Body: dark navy #111827 ── */}
      <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Dashboard header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: '#FFFFFF',
            margin: 0,
          }}>
            Dashboard
          </h2>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>Active Polls: 4</span>
        </div>

        {/* ── 3. Voter Intention Poll Card ── */}
        <div style={{
          backgroundColor: '#1A1E2D',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>

          {/* Title row with crowd image on the right */}
          <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
            {/* Crowd image fills the right half */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <CrowdImage />
            </div>
            {/* Title text on dark overlay (left side) */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, bottom: 0,
              width: '55%',
              background: 'linear-gradient(90deg, #1A1E2D 75%, transparent)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              zIndex: 2,
            }}>
              <h3 style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1.3,
              }}>
                Voter Intention Poll – Constituency 5
              </h3>
            </div>
          </div>

          {/* Donut + Legend + Live Results */}
          <div style={{
            display: 'flex',
            padding: '20px 24px 24px',
            gap: 20,
            alignItems: 'flex-start',
          }}>

            {/* Donut chart */}
            <div style={{ position: 'relative', width: 170, height: 170, flexShrink: 0 }}>
              <PieChart width={170} height={170}>
                <Pie
                  data={PIE_DATA}
                  cx={80} cy={80}
                  innerRadius={48} outerRadius={78}
                  dataKey="value"
                  startAngle={90} endAngle={-270}
                  strokeWidth={0}
                >
                  {PIE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              {/* Center label */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '47%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 900,
                  fontSize: 30,
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1,
                }}>62%</p>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#CBD5E1', margin: '2px 0 0' }}>SKNLP</p>
              </div>
              {/* 28% floating label near gold segment */}
              <div style={{
                position: 'absolute',
                top: '30%',
                right: '-2px',
                fontSize: 13,
                fontWeight: 700,
                color: '#E2E8F0',
              }}>28%</div>
            </div>

            {/* Legend */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              justifyContent: 'center',
              minWidth: 110,
              flexShrink: 0,
              paddingTop: 16,
            }}>
              {[
                { label: 'SKNLP',      color: '#E05252' },
                { label: 'Opposition', color: '#C8A84B' },
                { label: '10%',        color: '#A0896A' },
                { label: 'Undecided',  color: '#D4D8E0' },
              ].map(d => (
                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 11, height: 11, borderRadius: 2, backgroundColor: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#94A3B8' }}>{d.label}</span>
                </div>
              ))}
            </div>

            {/* 4. Live Results table: 3 columns */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Column headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '0.8fr 1.4fr 1fr',
                gap: '0 12px',
                marginBottom: 10,
              }}>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Live Results</span>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Sample Question</span>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Responses</span>
              </div>
              {/* Data rows */}
              {LIVE_RESULTS.map((row, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '0.8fr 1.4fr 1fr',
                  gap: '0 12px',
                  padding: '9px 0',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: 13, color: '#CBD5E1' }}>{row.q}</span>
                  <span style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{row.answer}</span>
                  {/* Responses column: label + bars */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {row.response && (
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>{row.response}</span>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {row.bars.map((bar, j) => (
                        <div key={j} style={{
                          width: bar.width,
                          height: 5,
                          backgroundColor: bar.color,
                          borderRadius: 3,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom row: Analytics+Turnout card | Speech-to-Text card ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16 }}>

          {/* Left card: Analytics chart + Predictive Turnout */}
          <div style={{
            backgroundColor: '#1A1E2D',
            borderRadius: 12,
            padding: '20px 24px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 20,
            alignItems: 'center',
          }}>
            {/* 6. Analytics line chart */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#64748B', margin: '0 0 5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Analytics
              </p>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px' }}>
                Support Over Last 7 Days
              </p>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={SUPPORT_TREND} margin={{ top: 12, right: 8, bottom: 0, left: -8 }}>
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 16000]}
                    ticks={[0, 20, 8000, 16000]}
                    tickFormatter={v => v >= 1000 ? `${v / 1000}k` : `${v}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="val"
                    stroke="#DC143C"
                    strokeWidth={2.5}
                    dot={<GlowDot />}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 7. Predictive Turnout arc gauge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', margin: '0 0 14px', textAlign: 'center', lineHeight: 1.3 }}>
                Predictive<br/>Turnout
              </p>
              <div style={{ position: 'relative' }}>
                <svg viewBox="0 0 120 72" width="170" height="102">
                  {/* Grey track: full semi-circle */}
                  <path
                    d="M 10 65 A 50 50 0 0 1 110 65"
                    fill="none" stroke="#2D3748" strokeWidth="11" strokeLinecap="round"
                  />
                  {/* Red arc: 10% of semi-circle
                      10% of 180° = 18°
                      End point at 162° from center (60,65) r=50:
                      x = 60 + 50*cos(162°) ≈ 12.45
                      y = 65 - 50*sin(162°) ≈ 49.55 */}
                  <path
                    d="M 10 65 A 50 50 0 0 1 12.45 49.55"
                    fill="none" stroke="#DC143C" strokeWidth="11" strokeLinecap="round"
                  />
                  {/* Light grey: remainder of arc */}
                  <path
                    d="M 12.45 49.55 A 50 50 0 0 1 110 65"
                    fill="none" stroke="#94A3B8" strokeWidth="11" strokeLinecap="round"
                  />
                </svg>
                {/* Center text */}
                <div style={{
                  position: 'absolute',
                  bottom: 6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 900,
                    fontSize: 30,
                    color: '#FFFFFF',
                    margin: 0,
                    lineHeight: 1,
                  }}>10%</p>
                  <p style={{ fontSize: 12, color: '#64748B', margin: '3px 0 0' }}>Turnout</p>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Speech-to-Text card */}
          <div style={{
            backgroundColor: '#1A1E2D',
            borderRadius: 12,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#0F172A',
              borderRadius: 8,
              padding: '7px 14px',
              marginBottom: 16,
            }}>
              <span style={{ fontSize: 14 }}>🎤</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>Speech-to-Text Ready</span>
            </div>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, margin: 0 }}>
              Sample transcribed note: canvass next canvass note. Venelicht an Stadtle the
              pocktubelat commenturlitve hat poumtes ileat comitive tisfumef say the vonwast
              itind aorest apountit of give vaulting thenaptle calive oft thin politics raincoals.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
