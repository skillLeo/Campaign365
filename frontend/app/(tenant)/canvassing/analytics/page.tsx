'use client';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

/* ─── Chart data ────────────────────────────────────────────────── */
const lineData = [
  { month: 'Pan', clusters: 18000, analysis: 8000,  acpt: 5000  },
  { month: 'Mep', clusters: 22000, analysis: 10000, acpt: 7000  },
  { month: 'Abd', clusters: 16000, analysis: 14000, acpt: 8000  },
  { month: 'Jul', clusters: 28000, analysis: 20000, acpt: 9000  },
  { month: 'Aud', clusters: 24000, analysis: 52000, acpt: 10000 },
  { month: 'Jul', clusters: 32000, analysis: 88000, acpt: 11000 },
  { month: 'Mev', clusters: 26000, analysis: 72000, acpt: 9500  },
  { month: 'New', clusters: 20000, analysis: 44000, acpt: 8000  },
  { month: 'Sep', clusters: 18000, analysis: 30000, acpt: 7000  },
];

const donutData = [
  { name: 'Primary',   value: 52, color: '#E8192C' },
  { name: 'Secondary', value: 22, color: '#7C3AED' },
  { name: 'Tertiary',  value: 18, color: '#3B82F6' },
  { name: 'Other',     value: 8,  color: '#F59E0B'  },
];

const tableRows = [
  { id: 1, nome: '#0F172A', votor: '#0F1744', munpas: '4.2506', unitus: '10,150', salut: '454.4', hote: '1,545', padus: '3,774', todus: '4,303', viert: '5,10.5' },
  { id: 2, nome: 'SKNLP',   votor: '#0F1745', munpas: '3.3514', unitus: '10,145', salut: '454.4', hote: '2,129', padus: '2,129', todus: '4,211', viert: '0,90.8' },
];

/* ─── Custom tooltip ────────────────────────────────────────────── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(20,24,40,0.95)',
      border: '1px solid #2A2E45',
      borderRadius: 8, padding: '8px 12px',
      fontSize: 12, color: '#E2E8F0',
    }}>
      <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#F59E0B' }}>
        Analygs {Math.round((payload[1]?.value || 0) / 1000 * 3.7)}%
      </p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ margin: '2px 0', color: p.color }}>
          {p.name}: {(p.value / 1000).toFixed(0)}k
        </p>
      ))}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function CanvassingAnalyticsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0E1018',
      padding: '22px 24px 32px',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>

      {/* ── Page header ─────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h1 style={{
          fontSize: 26, fontWeight: 800, margin: 0,
          color: '#E8192C', letterSpacing: '-0.02em',
        }}>
          Canvassing Analytics
        </h1>

        {/* Filter pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          backgroundColor: '#1A1D2E', border: '1px solid #2A2E45',
          borderRadius: 8, overflow: 'hidden',
        }}>
          <span style={{ padding: '7px 14px', fontSize: 12, fontWeight: 600, color: '#E2E8F0', borderRight: '1px solid #2A2E45' }}>
            Last 30 Days
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', cursor: 'pointer' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>All Clusters</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────── */}
      <div className="rg-3" style={{ gap: 14, marginBottom: 16 }}>

        {/* Card 1 — Total Voters Contacted */}
        <div style={{
          backgroundColor: '#141620', borderRadius: 12,
          border: '1.5px solid #E8192C',
          padding: '18px 20px', position: 'relative', overflow: 'hidden',
        }}>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 10px', fontWeight: 500 }}>Total Voters Contacted</p>
          <p style={{ fontSize: 34, fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.03em' }}>
            12,458
          </p>
          {/* KPI watermark */}
          <span style={{
            position: 'absolute', right: 16, bottom: 10,
            fontSize: 42, fontWeight: 900, color: 'rgba(232,25,44,0.08)',
            letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none',
          }}>KPI</span>
        </div>

        {/* Card 2 — Avg Contacts */}
        <div style={{
          backgroundColor: '#141620', borderRadius: 12,
          border: '1px solid #2A2E45',
          padding: '18px 20px', position: 'relative', overflow: 'hidden',
        }}>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 10px', fontWeight: 500 }}>Average Contacts per Canvasser</p>
          <p style={{ fontSize: 34, fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.03em' }}>87</p>
          <span style={{
            position: 'absolute', right: 16, bottom: 10,
            fontSize: 42, fontWeight: 900, color: 'rgba(255,255,255,0.04)',
            letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none',
          }}>KPI</span>
        </div>

        {/* Card 3 — Conversion Rate */}
        <div style={{
          backgroundColor: '#141620', borderRadius: 12,
          border: '1px solid #2A2E45',
          padding: '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 10px', fontWeight: 500 }}>Conversion Rate</p>
            <p style={{ fontSize: 34, fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.03em' }}>34%</p>
          </div>
          {/* KPI dial */}
          <div style={{ position: 'relative', width: 64, height: 64 }}>
            <svg viewBox="0 0 64 64" width="64" height="64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#2A2E45" strokeWidth="7" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="#94A3B8" strokeWidth="7"
                strokeDasharray={`${2 * Math.PI * 26 * 0.34} ${2 * Math.PI * 26}`}
                strokeLinecap="round"
                transform="rotate(-90 32 32)" />
            </svg>
            <span style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 800, color: '#94A3B8',
            }}>KPI</span>
          </div>
        </div>
      </div>

      {/* ── Charts row ──────────────────────────────── */}
      <div className="rg-sidebar-r-300" style={{ gap: 14, marginBottom: 16 }}>

        {/* Line chart card */}
        <div style={{
          backgroundColor: '#141620', borderRadius: 12,
          border: '1px solid #2A2E45', padding: '18px 20px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* World map watermark */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cellipse cx='200' cy='200' rx='140' ry='120' fill='none' stroke='%23ffffff08' stroke-width='1'/%3E%3Cellipse cx='500' cy='180' rx='180' ry='130' fill='none' stroke='%23ffffff06' stroke-width='1'/%3E%3Cellipse cx='680' cy='220' rx='100' ry='90' fill='none' stroke='%23ffffff05' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            opacity: 0.6,
            pointerEvents: 'none',
          }} />

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, position: 'relative' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>Treelysty</span>
            {[
              { color: '#E8192C', label: 'Clusters' },
              { color: '#F59E0B', label: 'Analyis'  },
              { color: '#64748B', label: 'Acpt'     },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 220, position: 'relative' }}>
            {/* Glow filter via SVG defs injected in chart */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <filter id="redGlow">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="goldGlow">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
            </svg>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="clusterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#E8192C" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#E8192C" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="analysisGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => v >= 1000 ? `${v/1000}k` : v}
                  tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="clusters" name="Clusters"
                  stroke="#E8192C" strokeWidth={3} fill="url(#clusterGrad)"
                  dot={false} style={{ filter: 'drop-shadow(0 0 6px #E8192C)' }} />
                <Area type="monotone" dataKey="analysis" name="Analysis"
                  stroke="#F59E0B" strokeWidth={3} fill="url(#analysisGrad)"
                  dot={false} style={{ filter: 'drop-shadow(0 0 8px #F59E0B)' }} />
                <Area type="monotone" dataKey="acpt" name="Acpt"
                  stroke="#475569" strokeWidth={1.5} fill="none"
                  dot={false} strokeDasharray="4 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut chart card */}
        <div style={{
          backgroundColor: '#141620', borderRadius: 12,
          border: '1px solid #2A2E45', padding: '18px 20px',
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', margin: '0 0 16px' }}>
            Speech-to-text sentiment
          </p>

          <div style={{ height: 200, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%" cy="50%"
                  innerRadius={58} outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90} endAngle={-270}
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color}
                      style={{ filter: `drop-shadow(0 0 6px ${entry.color})` }} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Labels */}
            <div style={{
              position: 'absolute', top: 14, left: 8,
              fontSize: 11, fontWeight: 700, color: '#94A3B8',
            }}>400%</div>
            <div style={{
              position: 'absolute', bottom: 22, left: 4,
              fontSize: 11, fontWeight: 700, color: '#94A3B8',
            }}>50%</div>
            <div style={{
              position: 'absolute', bottom: 10, right: 4,
              fontSize: 11, fontWeight: 700, color: '#94A3B8',
            }}>5, 8.5%</div>
          </div>
        </div>
      </div>

      {/* ── Performance Table ────────────────────────── */}
      <div style={{
        backgroundColor: '#141620', borderRadius: 12,
        border: '1px solid #2A2E45', overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', borderBottom: '1px solid #2A2E45',
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>Performance fon</span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            backgroundColor: '#1E2235', border: '1px solid #2A2E45',
            borderRadius: 6, padding: '5px 12px', cursor: 'pointer',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>Deco III</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '36px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', minWidth: 'max-content',
          padding: '10px 20px',
          borderBottom: '1px solid #1E2235',
          backgroundColor: '#0E1018',
        }}>
          {['', 'Nome', 'Votor', 'Munpa/s', 'Unitus', 'Salut', 'Hote', 'Padus', 'Todus', 'Viert'].map((h, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700, color: '#475569',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              textAlign: i === 0 ? 'center' : 'left',
            }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {tableRows.map((row, i) => (
          <div key={row.id} style={{
            display: 'grid',
            gridTemplateColumns: '36px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', minWidth: 'max-content',
            padding: '11px 20px',
            borderBottom: i < tableRows.length - 1 ? '1px solid #1A1D2E' : 'none',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, color: '#475569', textAlign: 'center', fontWeight: 600 }}>{row.id}</span>
            <span style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 600, fontFamily: 'monospace' }}>{row.nome}</span>
            <span style={{ fontSize: 12, color: '#94A3B8', fontFamily: 'monospace' }}>{row.votor}</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{row.munpas}</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{row.unitus}</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{row.salut}</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{row.hote}</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{row.padus}</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{row.todus}</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{row.viert}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
