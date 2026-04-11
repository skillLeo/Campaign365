'use client';
import { useState } from 'react';
import { Download, TrendingUp, Users, Target, Map, BarChart3, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

const PRIMARY = 'var(--tenant-primary)';

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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>Performance Report</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Reports › Performance</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1">
            {[['7d', '7 Days'], ['30d', '30 Days'], ['campaign', 'Campaign']].map(([key, label]) => (
              <button key={key} onClick={() => setPeriod(key)}
                className="px-2 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap"
                style={{ backgroundColor: period === key ? '#0F172A' : 'transparent', color: period === key ? 'white' : '#64748B' }}>
                {label}
              </button>
            ))}
          </div>
          <button className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all whitespace-nowrap">
            <Download size={13} className="sm:w-[14px] sm:h-[14px]" /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Voters Contacted', value: '14,872', change: '+12%', icon: Users, color: PRIMARY },
          { label: 'Doors Knocked', value: '8,721', change: '+8%', icon: Map, color: '#2563EB' },
          { label: 'Support Rate', value: '63%', change: '+3pt', icon: TrendingUp, color: '#16A34A' },
          { label: 'Canvassers Active', value: '34', change: '+5', icon: Target, color: '#7C3AED' },
          { label: 'SMS Sent', value: '9,800', change: '+14%', icon: BarChart3, color: '#D97706' },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: card.color + '15' }}>
                <Icon size={13} className="sm:w-[15px] sm:h-[15px]" style={{ color: card.color }} />
              </div>
              <p className="text-lg sm:text-xl font-bold text-slate-800">{card.value}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">{card.label}</p>
              <p className="text-[10px] sm:text-xs font-semibold text-green-600 mt-1">{card.change} vs last period</p>
            </div>
          );
        })}
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit max-w-full">
        {[['overview', 'Overview'], ['constituency', 'By Constituency'], ['canvassers', 'Canvasser Stats']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold transition-all whitespace-nowrap"
            style={{ backgroundColor: tab === key ? PRIMARY : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4 sm:space-y-5">
          {/* Voter contact trend */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">Voter Outreach Trend</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mb-4">Weekly cumulative contacts, doors knocked, and SMS sent</p>
            <div className="w-full h-[200px] sm:h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CONTACT_TREND} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="contacts" stroke={PRIMARY} strokeWidth={2} fill="url(#cGrad)" name="Contacts" dot={false} />
                  <Area type="monotone" dataKey="doors" stroke="#2563EB" strokeWidth={2} fill="none" name="Doors" dot={false} />
                  <Area type="monotone" dataKey="sms" stroke="#16A34A" strokeWidth={2} fill="none" name="SMS" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-5 mt-3">
              {[['Contacts', PRIMARY], ['Doors', '#2563EB'], ['SMS', '#16A34A']].map(([label, color]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-0.5 rounded-sm" style={{ backgroundColor: color }} />
                  <span className="text-[11px] sm:text-xs text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
            {/* Daily doors */}
            <div className="flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-3">Doors Knocked — This Week</h3>
              <div className="w-full h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DAILY_DOORS} barSize={clamp(20, 24, 28)}>
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                    <Bar dataKey="doors" radius={[5, 5, 0, 0]}>
                      {DAILY_DOORS.map((_, i) => <Cell key={i} fill={i === 5 ? PRIMARY : '#E2E8F0'} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sentiment breakdown */}
            <div className="flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-3">Voter Sentiment Breakdown</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Supporters', value: 9400, total: 14872, color: '#16A34A' },
                  { label: 'Undecided', value: 3800, total: 14872, color: '#F59E0B' },
                  { label: 'Opposition', value: 1672, total: 14872, color: PRIMARY },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{s.label}</span>
                      <span className="text-xs sm:text-sm font-bold" style={{ color: s.color }}>{s.value.toLocaleString()} ({Math.round((s.value / s.total) * 100)}%)</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(s.value / s.total) * 100}%`, backgroundColor: s.color }} />
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
            <div key={c.name} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="sm:w-36 lg:w-44">
                  <p className="text-xs sm:text-sm font-bold text-slate-800">{c.name}</p>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{(c.supporters + c.undecided + c.opposition).toLocaleString()} contacted</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 sm:h-2.5 rounded-full overflow-hidden flex">
                    <div style={{ width: `${(c.supporters / (c.supporters + c.undecided + c.opposition)) * 100}%`, backgroundColor: '#16A34A' }} />
                    <div style={{ width: `${(c.undecided / (c.supporters + c.undecided + c.opposition)) * 100}%`, backgroundColor: '#F59E0B' }} />
                    <div style={{ width: `${(c.opposition / (c.supporters + c.undecided + c.opposition)) * 100}%`, backgroundColor: PRIMARY }} />
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    {[['Sup', c.supporters, '#16A34A'], ['Und', c.undecided, '#F59E0B'], ['Opp', c.opposition, PRIMARY]].map(([k, v, col]) => (
                      <span key={String(k)} className="text-[10px] sm:text-xs text-slate-500">
                        <span style={{ color: String(col), fontWeight: 600 }}>{String(k)}</span> {Number(v).toLocaleString()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right sm:w-16">
                  <p className="text-lg sm:text-xl font-bold" style={{ color: c.rate >= 65 ? '#16A34A' : c.rate >= 55 ? '#F59E0B' : PRIMARY }}>{c.rate}%</p>
                  <p className="text-[10px] sm:text-xs text-slate-400">support</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'canvassers' && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '700px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Canvasser', 'Doors Knocked', 'Support Rate', 'Efficiency', 'Trend'].map(h => (
                    <th key={h} className="py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-400 text-left uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CANVASSER_PERF.map((c, i) => (
                  <tr key={c.name} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0" style={{ backgroundColor: PRIMARY + '15', color: PRIMARY }}>
                          {c.name.charAt(0)}
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800 truncate max-w-[100px] sm:max-w-none">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold text-slate-800 whitespace-nowrap">{c.doors}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-12 sm:w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${c.support}%`, backgroundColor: '#16A34A' }} />
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800">{c.support}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-12 sm:w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${c.rate}%`, backgroundColor: i < 2 ? '#16A34A' : i < 4 ? '#F59E0B' : PRIMARY }} />
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-800">{c.rate}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded" style={{ backgroundColor: i < 2 ? '#F0FDF4' : '#FFFBEB', color: i < 2 ? '#16A34A' : '#F59E0B' }}>
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

// Helper function for responsive bar size
function clamp(min: number, preferred: number, max: number): number {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 640) return min;
    if (width > 1024) return max;
    return min + (max - min) * ((width - 640) / (1024 - 640));
  }
  return preferred;
} 