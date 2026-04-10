'use client';
import { useState } from 'react';
import { Download, TrendingUp, Users, Target, Map, BarChart3, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

const PRIMARY = '#E30613';

const CONTACT_TREND = [
  { week: 'Sep W1', contacts: 1820, doors: 940, sms: 3200 },
  { week: 'Sep W2', contacts: 3400, doors: 1820, sms: 4100 },
  { week: 'Sep W3', contacts: 5600, doors: 2900, sms: 5800 },
  { week: 'Sep W4', contacts: 7200, doors: 3800, sms: 6400 },
  { week: 'Oct W1', contacts: 9100, doors: 4900, sms: 7200 },
  { week: 'Oct W2', contacts: 11400, doors: 5800, sms: 8400 },
  { week: 'Oct W3', contacts: 13200, doors: 6700, sms: 9100 },
  { week: 'Oct W4', contacts: 14872, doors: 7400, sms: 9800 },
];

const CONSTITUENCY_DATA = [
  { name: 'Central Basseterre', supporters: 1840, undecided: 620, opposition: 340, rate: 72 },
  { name: 'East Basseterre', supporters: 1420, undecided: 740, opposition: 480, rate: 64 },
  { name: 'St. Paul\'s', supporters: 980, undecided: 820, opposition: 540, rate: 58 },
  { name: 'Trinity Palmetto', supporters: 860, undecided: 680, opposition: 580, rate: 55 },
  { name: 'West Basseterre', supporters: 1620, undecided: 480, opposition: 320, rate: 69 },
  { name: 'Sandy Point', supporters: 720, undecided: 340, opposition: 240, rate: 66 },
];

const CANVASSER_PERF = [
  { name: 'James Morrison', doors: 420, support: 68, rate: 87 },
  { name: 'Alicia Green', doors: 390, support: 71, rate: 82 },
  { name: 'Devon Clarke', doors: 350, support: 65, rate: 75 },
  { name: 'Sandra Williams', doors: 310, support: 59, rate: 68 },
  { name: 'Carlton Browne', doors: 280, support: 54, rate: 62 },
];

const DAILY_DOORS = [
  { day: 'Mon', doors: 142 }, { day: 'Tue', doors: 198 }, { day: 'Wed', doors: 167 },
  { day: 'Thu', doors: 221 }, { day: 'Fri', doors: 189 }, { day: 'Sat', doors: 312 }, { day: 'Sun', doors: 84 },
];

export default function PerformanceReportPage() {
  const [period, setPeriod] = useState('campaign');
  const [tab, setTab] = useState<'overview' | 'constituency' | 'canvassers'>('overview');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Performance Report</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Reports › Performance</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
            {[['7d', '7 Days'], ['30d', '30 Days'], ['campaign', 'Campaign']].map(([key, label]) => (
              <button key={key} onClick={() => setPeriod(key)}
                style={{ padding: '6px 14px', borderRadius: 7, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', backgroundColor: period === key ? '#0F172A' : 'transparent', color: period === key ? 'white' : '#64748B' }}>
                {label}
              </button>
            ))}
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F1F5F9', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        {[
          { label: 'Voters Contacted', value: '14,872', change: '+12%', icon: Users, color: PRIMARY },
          { label: 'Doors Knocked', value: '8,721', change: '+8%', icon: Map, color: '#2563EB' },
          { label: 'Support Rate', value: '63%', change: '+3pt', icon: TrendingUp, color: '#16A34A' },
          { label: 'Canvassers Active', value: '34', change: '+5', icon: Target, color: '#7C3AED' },
          { label: 'SMS Sent', value: '9,800', change: '+14%', icon: BarChart3, color: '#D97706' },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-4">
              <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: card.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={15} style={{ color: card.color }} />
              </div>
              <p style={{ fontSize: 20, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#0F172A' }}>{card.value}</p>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{card.label}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#16A34A', marginTop: 2 }}>{card.change} vs last period</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit max-w-full">
        {[['overview', 'Overview'], ['constituency', 'By Constituency'], ['canvassers', 'Canvasser Stats']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            style={{ padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', backgroundColor: tab === key ? PRIMARY : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-5">
          {/* Voter contact trend */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>Voter Outreach Trend</h3>
            <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>Weekly cumulative contacts, doors knocked, and SMS sent</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={CONTACT_TREND} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="contacts" stroke={PRIMARY} strokeWidth={2} fill="url(#cGrad)" name="Contacts" dot={false} />
                <Area type="monotone" dataKey="doors" stroke="#2563EB" strokeWidth={2} fill="none" name="Doors" dot={false} />
                <Area type="monotone" dataKey="sms" stroke="#16A34A" strokeWidth={2} fill="none" name="SMS" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-5 mt-3">
              {[['Contacts', PRIMARY], ['Doors', '#2563EB'], ['SMS', '#16A34A']].map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <div style={{ width: 10, height: 3, borderRadius: 2, backgroundColor: color }} />
                  <span style={{ fontSize: 12, color: '#64748B' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Daily doors */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Doors Knocked — This Week</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={DAILY_DOORS} barSize={24}>
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="doors" radius={[5, 5, 0, 0]}>
                    {DAILY_DOORS.map((_, i) => <Cell key={i} fill={i === 5 ? PRIMARY : '#E2E8F0'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sentiment breakdown */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 14 }}>Voter Sentiment Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Supporters', value: 9400, total: 14872, color: '#16A34A' },
                  { label: 'Undecided', value: 3800, total: 14872, color: '#F59E0B' },
                  { label: 'Opposition', value: 1672, total: 14872, color: PRIMARY },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{s.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value.toLocaleString()} ({Math.round((s.value / s.total) * 100)}%)</span>
                    </div>
                    <div style={{ height: 8, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(s.value / s.total) * 100}%`, backgroundColor: s.color, borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'constituency' && (
        <div className="space-y-3">
          {CONSTITUENCY_DATA.map(c => (
            <div key={c.name} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div style={{ minWidth: 140 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{c.name}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{(c.supporters + c.undecided + c.opposition).toLocaleString()} contacted</p>
                </div>
                <div className="flex-1">
                  <div style={{ height: 12, borderRadius: 99, overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${(c.supporters / (c.supporters + c.undecided + c.opposition)) * 100}%`, backgroundColor: '#16A34A' }} />
                    <div style={{ width: `${(c.undecided / (c.supporters + c.undecided + c.opposition)) * 100}%`, backgroundColor: '#F59E0B' }} />
                    <div style={{ width: `${(c.opposition / (c.supporters + c.undecided + c.opposition)) * 100}%`, backgroundColor: PRIMARY }} />
                  </div>
                  <div className="flex gap-4 mt-1.5">
                    {[['Sup', c.supporters, '#16A34A'], ['Und', c.undecided, '#F59E0B'], ['Opp', c.opposition, PRIMARY]].map(([k, v, col]) => (
                      <span key={String(k)} style={{ fontSize: 11, color: '#64748B' }}><span style={{ color: String(col), fontWeight: 600 }}>{String(k)}</span> {Number(v).toLocaleString()}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: 60 }}>
                  <p style={{ fontSize: 18, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: c.rate >= 65 ? '#16A34A' : c.rate >= 55 ? '#F59E0B' : PRIMARY }}>{c.rate}%</p>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>support</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'canvassers' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Canvasser', 'Doors Knocked', 'Support Rate', 'Efficiency', 'Trend'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#94A3B8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CANVASSER_PERF.map((c, i) => (
                <tr key={c.name} style={{ borderTop: '1px solid #F8FAFC' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <td style={{ padding: '14px 16px' }}>
                    <div className="flex items-center gap-3">
                      <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: PRIMARY + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: PRIMARY }}>
                        {c.name.charAt(0)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{c.doors}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 60, height: 6, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${c.support}%`, backgroundColor: '#16A34A', borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{c.support}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 60, height: 6, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${c.rate}%`, backgroundColor: i < 2 ? '#16A34A' : i < 4 ? '#F59E0B' : PRIMARY, borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{c.rate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: i < 2 ? '#16A34A' : '#F59E0B', backgroundColor: i < 2 ? '#F0FDF4' : '#FFFBEB', padding: '3px 9px', borderRadius: 6 }}>
                      {i < 2 ? '↑ Excellent' : i < 4 ? '→ Good' : '↓ Needs Help'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
