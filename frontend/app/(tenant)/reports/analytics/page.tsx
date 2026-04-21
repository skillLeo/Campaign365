'use client';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from 'recharts';

const DAILY_CONTACTS = [
  { day: 'Apr 1',  contacts: 820,  goal: 1000 },
  { day: 'Apr 3',  contacts: 1240, goal: 1000 },
  { day: 'Apr 5',  contacts: 980,  goal: 1000 },
  { day: 'Apr 7',  contacts: 1420, goal: 1000 },
  { day: 'Apr 9',  contacts: 1100, goal: 1000 },
  { day: 'Apr 11', contacts: 1680, goal: 1000 },
  { day: 'Apr 13', contacts: 1320, goal: 1000 },
  { day: 'Apr 15', contacts: 1850, goal: 1000 },
  { day: 'Apr 17', contacts: 1540, goal: 1000 },
  { day: 'Apr 19', contacts: 2100, goal: 1000 },
  { day: 'Apr 21', contacts: 1780, goal: 1000 },
];

const ISSUE_PRIORITIES = [
  { name: 'Healthcare',    value: 38, color: '#DC143C' },
  { name: 'Education',     value: 28, color: '#D4A017' },
  { name: 'Economy',       value: 22, color: '#60A5FA' },
  { name: 'Infrastructure',value: 12, color: '#4ADE80' },
];

const CANVASSING_BY_CLUSTER = [
  { cluster: 'Basseterre C.',  efficiency: 88, doors: 1240 },
  { cluster: 'Sandy Point',    efficiency: 72, doors: 890 },
  { cluster: 'Cayon',          efficiency: 91, doors: 720 },
  { cluster: 'Nevis — N.',     efficiency: 65, doors: 540 },
  { cluster: 'Charlestown',    efficiency: 78, doors: 480 },
  { cluster: 'Trinity Pal.',   efficiency: 83, doors: 620 },
];

const TREND_A = [
  { m: 'Jan', v: 42 }, { m: 'Feb', v: 58 }, { m: 'Mar', v: 51 },
  { m: 'Apr', v: 74 }, { m: 'May', v: 68 }, { m: 'Jun', v: 85 },
];
const TREND_B = [
  { m: 'Jan', v: 28 }, { m: 'Feb', v: 35 }, { m: 'Mar', v: 44 },
  { m: 'Apr', v: 56 }, { m: 'May', v: 61 }, { m: 'Jun', v: 72 },
];

const AI_RECOMMENDATIONS = [
  { icon: '🎯', title: 'Focus on Constituency 3', detail: 'Only 54% of target voters contacted. Increase canvassing by 30%.' },
  { icon: '🚪', title: 'Increase Door-to-Door Efforts', detail: 'Conversion rate 3× higher than phone bank in swing areas.' },
  { icon: '👥', title: 'Target Youth Voters (18–34)', detail: 'Sentiment analysis shows +18% persuasion rate in this segment.' },
  { icon: '📱', title: 'Leverage Social Media', detail: 'Facebook engagement up 42% — boost messaging in Sandy Point.' },
];

const KPIS = [
  { label: 'Voter Contact Rate', value: '75%', change: '+8%',  color: '#DC143C' },
  { label: 'Doors Knocked',      value: '4,872', change: '+12%', color: '#D4A017' },
  { label: 'Avg Response Time',  value: '2.4s',  change: '-18%', color: '#4ADE80' },
  { label: 'Sentiment Score',    value: '8.2/10', change: '+0.4', color: '#60A5FA' },
];

export default function CampaignAnalyticsPage() {
  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Header */}
      <div style={{
        position: 'relative', padding: '22px 24px 18px', overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        {/* St Kitts island silhouette top-right */}
        <div style={{ position: 'absolute', right: 24, top: 0, opacity: 0.08 }}>
          <svg viewBox="0 0 200 140" width="200" height="140">
            <path d="M10,100 Q30,80 60,70 Q90,60 120,55 Q150,50 170,45 Q190,40 195,35 L195,120 L10,120 Z" fill="white" />
            <path d="M60,70 Q80,50 100,40 Q120,30 140,35 Q160,40 180,30 L180,50 Q160,55 140,50 Q120,45 100,55 Q80,65 60,75 Z" fill="white" opacity="0.5" />
          </svg>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#DC143C', fontSize: 11, fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Intelligence</p>
              <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: '0 0 4px' }}>Campaign Analytics</h1>
              <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>AI-Powered Insights · Powered by Grok</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#94A3B8', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>Last 30 Days ▾</button>
              <button style={{
                background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
                padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220,20,60,0.35)',
              }}>Export Report</button>
            </div>
          </div>

          {/* KPI strip */}
          <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
            {KPIS.map((kpi, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 3, height: 28, background: kpi.color, borderRadius: 2 }} />
                <div>
                  <p style={{ color: 'white', fontSize: 16, fontWeight: 900, margin: 0, lineHeight: 1 }}>{kpi.value}</p>
                  <p style={{ color: '#64748B', fontSize: 10, margin: '2px 0 0' }}>{kpi.label}</p>
                </div>
                <span style={{ color: kpi.change.startsWith('+') ? '#4ADE80' : '#DC143C', fontSize: 11, fontWeight: 700 }}>{kpi.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>

        {/* Row 1: Daily contacts + Issue priorities */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, marginBottom: 16 }}>

          {/* Daily Voter Contacts */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 2px' }}>Daily Voter Contacts</p>
                <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>Contacts vs. daily goal — April 2026</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 3, background: '#DC143C', borderRadius: 2 }} />
                  <span style={{ color: '#94A3B8', fontSize: 11 }}>Contacts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, borderTop: '1px dashed rgba(255,255,255,0.3)' }} />
                  <span style={{ color: '#94A3B8', fontSize: 11 }}>Goal</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={DAILY_CONTACTS} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="contactGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC143C" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#DC143C" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="goal" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth={1.5} fill="none" />
                <Area type="monotone" dataKey="contacts" stroke="#DC143C" strokeWidth={2.5} fill="url(#contactGrad)" dot={false} activeDot={{ r: 5, fill: '#DC143C' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Issue Priorities Donut */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '20px',
          }}>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Issue Priorities</p>
            <p style={{ color: '#64748B', fontSize: 11, margin: '0 0 12px' }}>What voters care about most</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart width={160} height={160}>
                <Pie data={ISSUE_PRIORITIES} cx={75} cy={75} innerRadius={45} outerRadius={72} dataKey="value" startAngle={90} endAngle={-270}>
                  {ISSUE_PRIORITIES.map((e, i) => <Cell key={i} fill={e.color} stroke="rgba(0,0,0,0.3)" strokeWidth={1} />)}
                </Pie>
              </PieChart>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
              {ISSUE_PRIORITIES.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color, flexShrink: 0 }} />
                    <span style={{ color: '#94A3B8', fontSize: 11 }}>{item.name}</span>
                  </div>
                  <span style={{ color: item.color, fontSize: 12, fontWeight: 700 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Canvassing efficiency bar + 2 trend lines */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Canvassing Efficiency by Cluster */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, padding: '20px',
          }}>
            <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 14px' }}>Canvassing Efficiency by Cluster</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={CANVASSING_BY_CLUSTER} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 60 }}>
                <XAxis type="number" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="cluster" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} width={58} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }}
                  formatter={(v) => [`${v}%`, 'Efficiency']}
                />
                <Bar dataKey="efficiency" radius={[0, 4, 4, 0]}>
                  {CANVASSING_BY_CLUSTER.map((entry, i) => (
                    <Cell key={i} fill={entry.efficiency >= 80 ? '#DC143C' : entry.efficiency >= 70 ? '#D4A017' : '#475569'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 2 Trend Analysis charts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Voter Enthusiasm Trend', data: TREND_A, color: '#DC143C' },
              { label: 'Digital Engagement Trend', data: TREND_B, color: '#D4A017' },
            ].map((chart, ci) => (
              <div key={ci} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, padding: '14px',
              }}>
                <p style={{ color: 'white', fontSize: 12, fontWeight: 700, margin: '0 0 8px' }}>{chart.label}</p>
                <ResponsiveContainer width="100%" height={72}>
                  <LineChart data={chart.data} margin={{ top: 2, right: 4, bottom: 0, left: -20 }}>
                    <XAxis dataKey="m" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 6, fontSize: 10 }} />
                    <Line type="monotone" dataKey="v" stroke={chart.color} strokeWidth={2} dot={{ fill: chart.color, r: 3, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 20 }}>🤖</div>
            <div>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>AI-Powered Recommendations</p>
              <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>Generated by Grok · Updated 2 hours ago</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {AI_RECOMMENDATIONS.map((rec, i) => (
              <div key={i} style={{
                background: 'rgba(220,20,60,0.05)', border: '1px solid rgba(220,20,60,0.15)',
                borderRadius: 10, padding: '14px',
              }}>
                <span style={{ fontSize: 22 }}>{rec.icon}</span>
                <p style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, margin: '8px 0 6px', lineHeight: 1.3 }}>{rec.title}</p>
                <p style={{ color: '#64748B', fontSize: 11, margin: 0, lineHeight: 1.4 }}>{rec.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
