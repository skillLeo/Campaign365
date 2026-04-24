'use client';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { useState } from 'react';

const DAILY_CONTACTS = [
  { d: 'Ah',  contacts: 2000,  goal: 4000  },
  { d: 'Ab',  contacts: 6000,  goal: 5000  },
  { d: 'Ab',  contacts: 10000, goal: 8000  },
  { d: '6b',  contacts: 20000, goal: 12000 },
  { d: '9b',  contacts: 38000, goal: 20000 },
  { d: '200', contacts: 48000, goal: 25000 },
];

const ISSUE_PRIORITIES = [
  { name: 'Healthcare', value: 42, color: '#DC143C' },
  { name: 'Economy',    value: 32, color: '#D4A017' },
  { name: 'Education',  value: 26, color: '#3B82F6' },
];

const CANVASSING_CLUSTERS = [
  { c: 'Ah',  eff: 58 },
  { c: 'Mb',  eff: 38 },
  { c: 'Ab',  eff: 52 },
  { c: '9fb', eff: 48 },
  { c: '20b', eff: 44 },
];

const TREND_A = [
  { m: 'Ah', v: 5  }, { m: 'Ab', v: 25 }, { m: 'Ab', v: 42 },
  { m: '9b', v: 58 }, { m: '20b', v: 72 },
];
const TREND_B = [
  { m: 'Ah', v: 10 }, { m: 'Ab', v: 30 }, { m: 'Ab', v: 28 },
  { m: '9b', v: 52 }, { m: '20b', v: 68 },
];

const AI_RECS = [
  'Focus on Constituency X',
  'Increase Door-to-Door Efforts',
  'Target Youth Voters',
  'Leverage Social Media',
];

function SKNSilhouette() {
  return (
    <svg width="130" height="90" viewBox="0 0 140 100" fill="none">
      <path d="M10,55 Q18,30 35,22 Q52,14 70,18 Q88,22 98,35 Q108,48 105,62 Q102,76 88,82 Q74,88 58,84 Q42,80 28,70 Q14,60 10,55 Z"
        fill="#C9A227" opacity="0.85" />
      <path d="M112,50 Q118,38 128,36 Q138,34 140,44 Q142,54 134,62 Q126,70 116,66 Q108,62 112,50 Z"
        fill="#C9A227" opacity="0.85" />
    </svg>
  );
}

export default function CampaignAnalyticsPage() {
  const [, setTrendAZoom] = useState(0);
  const [, setTrendBZoom] = useState(0);

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ padding: '20px 24px' }}>

        {/* Title row + map silhouette */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ color: '#DC143C', fontSize: 28, fontWeight: 900, margin: 0 }}>Campaign Analytics</h1>
          <div style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '10px 14px',
          }}>
            <SKNSilhouette />
          </div>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <button style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', borderRadius: 20, padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>Last 30 Days ▾</button>
          <button style={{
            background: '#DC143C', color: 'white', border: 'none',
            borderRadius: 20, padding: '7px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(220,20,60,0.4)',
          }}>All Constituencies</button>
        </div>

        {/* Top 3-col row */}
        <div className="rg-3" style={{ gap: 14, marginBottom: 14 }}>

          {/* Daily Voter Contacts */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14, padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: 0 }}>Daily Voter Contacts</p>
              <span style={{ color: '#DC143C', fontSize: 14, cursor: 'pointer' }}>›</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={DAILY_CONTACTS} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="dcGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4A017" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#D4A017" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: 8, fontSize: 10 }} />
                <Area type="monotone" dataKey="goal" stroke="#D4A017" strokeWidth={1.5} fill="url(#dcGrad)" dot={false} />
                <Line type="monotone" dataKey="contacts" stroke="#DC143C" strokeWidth={2.5} dot={{ fill: '#DC143C', r: 4, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Issue Priorities donut */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14, padding: '16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 10px', alignSelf: 'flex-start' }}>Issue Priorities</p>
            <PieChart width={170} height={170}>
              <Pie data={ISSUE_PRIORITIES} cx={80} cy={80} innerRadius={48} outerRadius={78} dataKey="value" startAngle={90} endAngle={-270}>
                {ISSUE_PRIORITIES.map((e, i) => (
                  <Cell key={i} fill={e.color} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {ISSUE_PRIORITIES.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                  <span style={{ color: '#94A3B8', fontSize: 10 }}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Canvassing Efficiency */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14, padding: '16px',
          }}>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 10px' }}>Canvassing Efficiency by Cluster</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={CANVASSING_CLUSTERS} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="c" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: 8, fontSize: 10 }} />
                <Bar dataKey="eff" radius={[4, 4, 0, 0]}>
                  {CANVASSING_CLUSTERS.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? '#DC143C' : '#D4A017'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom 3-col row */}
        <div className="rg-3" style={{ gap: 14 }}>

          {/* Trend Analysis 1 */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14, padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: 0 }}>Trend Analysis</p>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => setTrendAZoom(z => z + 1)} style={{ width: 24, height: 24, borderRadius: 4, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#4ADE80', fontSize: 14, cursor: 'pointer' }}>+</button>
                <button onClick={() => setTrendAZoom(z => z + 1)} style={{ width: 24, height: 24, borderRadius: 4, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#4ADE80', fontSize: 14, cursor: 'pointer' }}>+</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={TREND_A} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="m" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: 6, fontSize: 10 }} />
                <Line type="monotone" dataKey="v" stroke="#DC143C" strokeWidth={2.5}
                  dot={{ fill: 'none', r: 4, strokeWidth: 2, stroke: '#DC143C' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Trend Analysis 2 */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14, padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: 0 }}>Trend Analysis</p>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => setTrendBZoom(z => z + 1)} style={{ width: 24, height: 24, borderRadius: 4, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#4ADE80', fontSize: 14, cursor: 'pointer' }}>+</button>
                <button onClick={() => setTrendBZoom(z => z - 1)} style={{ width: 24, height: 24, borderRadius: 4, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#DC143C', fontSize: 14, cursor: 'pointer' }}>−</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={TREND_B} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="m" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: 6, fontSize: 10 }} />
                <Line type="monotone" dataKey="v" stroke="#DC143C" strokeWidth={2.5}
                  dot={{ fill: 'none', r: 4, strokeWidth: 2, stroke: '#DC143C' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* AI Recommendations */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14, padding: '16px',
          }}>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: '0 0 14px' }}>AI-Powered Recommendations</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {AI_RECS.map((rec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', background: '#DC143C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: 10, color: 'white', fontWeight: 900,
                  }}>✓</div>
                  <span style={{ color: '#C9D1DA', fontSize: 13 }}>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
