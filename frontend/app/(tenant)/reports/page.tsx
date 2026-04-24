'use client';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell,
} from 'recharts';

const KPIS = [
  { label: 'Voter Contact Rate',    value: '75%',      pct: 75, iconPath: 'M3 17l4-4 4 4 4-6 4 3' },
  { label: 'Turnout Projection',    value: '85%',      pct: 85, iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
  { label: 'Canvassing Efficiency', value: '90%',      pct: 90, iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  { label: 'Fundraising Raised',    value: '$150,000', pct: 68, iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
];

const OUTREACH_DATA = [
  { month: 'Jan', v: 45 }, { month: 'Mar', v: 80 }, { month: 'Apr', v: 95 },
  { month: 'Apr', v: 70 }, { month: 'Ffr', v: 120 }, { month: 'An', v: 145 },
  { month: 'An', v: 130 }, { month: 'Jul', v: 175 }, { month: 'Nu', v: 160 },
  { month: 'Jr', v: 195 }, { month: 'Nop', v: 220 }, { month: 'Oc', v: 205 },
  { month: 'Dec', v: 240 },
];

const CONSTITUENCY_DATA = [
  { name: 'Jan',  v: 180 }, { name: 'Map', v: 240 }, { name: 'Mar', v: 290 },
  { name: 'Jul',  v: 510 }, { name: 'Aup', v: 390 }, { name: 'Asy', v: 280 },
  { name: 'Nee',  v: 160 },
];

const TURNOUT_DATA = [
  { m: 'Jun', v: 40 }, { m: 'Mal', v: 55 }, { m: 'Manc', v: 48 },
  { m: 'Jun', v: 60 }, { m: 'Sup', v: 52 },
];

const DONUT_DATA = [
  { name: 'Sanussy',  value: 55, color: '#C8102E' },
  { name: 'Canvascy', value: 30, color: '#E5E7EB' },
  { name: 'Efficiency', value: 15, color: '#111111' },
];

// SKNLP flag icon for chart headers
function FlagIcon() {
  return (
    <svg viewBox="0 0 30 20" width="22" height="15" style={{ borderRadius: 2 }}>
      <polygon points="0,0 30,20 0,20" fill="#009E60"/>
      <polygon points="0,0 30,0 30,20" fill="#CE1126"/>
      <polygon points="0,0 30,20 27,20 3,0" fill="#000000"/>
      <polygon points="0,0 3,0 30,20 27,20 29,20 5,0" fill="#FCD116"/>
      <polygon points="0,2 2,0 30,18 28,20 0,20 0,18" fill="#FCD116"/>
    </svg>
  );
}

export default function ReportsPage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#0F172A' }}>

      {/* ── Header ── */}
      <div style={{ backgroundColor: '#0F172A', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '18px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 4px', fontWeight: 500 }}>Dashboard &gt; Reports</p>
            <h1 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vw, 32px)', color: '#F1F5F9', margin: 0, letterSpacing: '-0.02em' }}>
              Party Performance Reports
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <select style={{ border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#CBD5E1', outline: 'none', fontFamily: 'inherit', backgroundColor: '#1E293B' }}>
                <option>Jan 1, 2023 - Dec 31, 2023</option>
                <option>Jan 1, 2024 - Dec 31, 2024</option>
              </select>
              <button style={{ padding: '8px 10px', borderRadius: 6, border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: '#1E293B', cursor: 'pointer', color: '#CBD5E1', fontWeight: 700, fontFamily: 'inherit' }}>‹</button>
              <button style={{ padding: '8px 10px', borderRadius: 6, border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: '#1E293B', cursor: 'pointer', color: '#CBD5E1', fontWeight: 700, fontFamily: 'inherit' }}>›</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Section heading + export ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 22, color: '#F1F5F9', margin: 0, letterSpacing: '-0.01em' }}>
            Campaign Performance &amp; Insights
          </h2>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 8, border: 'none', backgroundColor: '#C8102E', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer', letterSpacing: '0.02em' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Export Full Report
          </button>
        </div>

        {/* ── 4 KPI metrics ── */}
        <div className="rg-4" style={{ gap: 14 }}>
          {KPIS.map(({ label, value, pct, iconPath }) => (
            <div key={label} style={{ backgroundColor: '#1E293B', borderRadius: 14, padding: '20px 18px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', margin: '0 0 8px' }}>{label}</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 4vw, 38px)', color: '#F1F5F9', margin: 0, lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</p>
                <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2, flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={iconPath}/>
                  </svg>
                </div>
              </div>
              <div style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, backgroundColor: '#C8102E', transition: 'width 0.5s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── 4 chart panels in 2x2 grid ── */}
        <div className="rg-2" style={{ gap: 14 }}>

          {/* Voter Turnout Chart */}
          <div style={{ backgroundColor: '#1E293B', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: 0 }}>Voter Turnout Chart</h3>
              <FlagIcon />
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={TURNOUT_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false}/>
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0, 70]}/>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1E293B', color: '#F1F5F9' }}/>
                <Bar dataKey="v" fill="#C8102E" radius={[3, 3, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Canvassing Efficiency Donut */}
          <div style={{ backgroundColor: '#1E293B', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: 0 }}>Canvassing Efficiency</h3>
              <FlagIcon />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={DONUT_DATA} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                    {DONUT_DATA.map((d, i) => <Cell key={i} fill={i === 1 ? 'rgba(255,255,255,0.15)' : i === 2 ? '#0F172A' : d.color}/>)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {DONUT_DATA.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fundraising Progress */}
          <div style={{ backgroundColor: '#1E293B', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: 0 }}>Fundraising Progress</h3>
              <FlagIcon />
            </div>
            {/* Big progress bar */}
            <div style={{ height: 14, borderRadius: 8, backgroundColor: '#F3F4F6', overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ height: '100%', width: '68%', borderRadius: 8, backgroundColor: '#C8102E' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 22, color: '#F1F5F9' }}>$248,750 raised</span>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 22, color: '#DC143C' }}>68%</span>
            </div>
          </div>

          {/* Sentiment Analysis Line Chart */}
          <div style={{ backgroundColor: '#1E293B', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: 0 }}>Sentiment Analysis</h3>
              <FlagIcon />
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={[
                { m: 'Inent', v: 40 }, { m: 'Mogpt', v: 80 }, { m: 'Rent', v: 60 },
                { m: 'Dout', v: 90 }, { m: 'Egypt', v: 70 }, { m: 'Lous', v: 100 },
                { m: 'Hoist', v: 85 }, { m: 'Main', v: 110 },
              ]} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false}/>
                <XAxis dataKey="m" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1E293B', color: '#F1F5F9' }}/>
                <Line type="monotone" dataKey="v" stroke="#C8102E" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#C8102E', strokeWidth: 0 }} activeDot={{ r: 6 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Daily Voter Outreach + Constituency ── */}
        <div className="rg-2" style={{ gap: 14 }}>
          <div style={{ backgroundColor: '#1E293B', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: '0 0 14px' }}>Daily Voter Outreach</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={OUTREACH_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false}/>
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1E293B', color: '#F1F5F9' }}
                  formatter={(v: any) => [v, 'Contacts']}
                  content={({ active, payload }: any) => active && payload?.length ? (
                    <div style={{ backgroundColor: '#111', borderRadius: 8, padding: '8px 12px', fontSize: 11, color: 'white' }}>
                      <p style={{ margin: 0, fontWeight: 700 }}>Contact</p>
                      <p style={{ margin: '2px 0 0' }}>80%</p>
                      <p style={{ margin: '2px 0 0', color: '#9CA3AF' }}>Contact Rate</p>
                    </div>
                  ) : null}
                />
                <Line type="monotone" dataKey="v" stroke="#C8102E" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#C8102E', strokeWidth: 0 }} activeDot={{ r: 6 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ backgroundColor: '#1E293B', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: '0 0 14px' }}>Constituency Breakdown</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={CONSTITUENCY_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false}/>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1E293B', color: '#F1F5F9' }}/>
                <Bar dataKey="v" fill="#C8102E" radius={[3, 3, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 8, border: 'none', backgroundColor: '#C8102E', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', letterSpacing: '0.02em' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Export Full Report (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}
          div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}
