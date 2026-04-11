'use client';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, Filter, Search, ChevronDown } from 'lucide-react';

const RED = 'var(--tenant-primary)';

const pollData = [
  { name: 'Age 18-24', value: 62, color: RED },
  { name: 'Age 25-34', value: 78, color: RED },
  { name: 'Male', value: 55, color: '#F87171' },
  { name: 'Female', value: 70, color: RED },
  { name: 'St. Chris 1', value: 85, color: RED },
  { name: 'Nevis', value: 48, color: '#F87171' },
];

const constituencies = [
  'St. Christopher 1 — Basseterre East',
  'St. Christopher 2 — Basseterre West',
  'St. Christopher 3 — Trinity',
  'St. Christopher 4 — Cayon',
  'St. Christopher 5 — Newtown',
  'St. Christopher 6 — Saddlers',
  'St. Christopher 7 — Sandy Point',
  'St. Christopher 8 — St. Paul\'s',
  'Nevis 1 — St. John',
  'Nevis 2 — St. James',
  'Nevis 3 — St. Thomas',
];

const livePolls = [
  { id: 'LP-001', question: 'Voter preference for 2026 General Election', responses: 1248, status: 'active', updated: 'Just now' },
  { id: 'LP-002', question: 'Top policy priority: Healthcare vs Education', responses: 892, status: 'active', updated: '5 min ago' },
  { id: 'LP-003', question: 'Satisfaction with current government', responses: 2041, status: 'active', updated: '12 min ago' },
  { id: 'LP-004', question: 'Candidate name recognition — Nevis', responses: 456, status: 'paused', updated: '1 hr ago' },
];

const TABS = ['Live Polls', 'Historical Data', 'Micro-Segmentation'];

export default function PollingPage() {
  const [activeTab, setActiveTab] = useState('Live Polls');
  const [search, setSearch] = useState('');

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs sm:text-sm text-slate-500 mb-1">Dashboard &gt; Polling &amp; Research</p>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
            Advanced Polling &amp; Research
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative w-full sm:w-auto">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search polls..."
              className="w-full sm:w-48 pl-8 pr-2.5 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-red-400"
            />
          </div>
          <button className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
            <Filter size={13} /> Filter <ChevronDown size={11} />
          </button>
        </div>
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap border-b border-slate-200 gap-0">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap"
            style={{
              color: activeTab === tab ? RED : '#64748B',
              borderBottom: activeTab === tab ? `2px solid ${RED}` : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-5">
          {/* Bar chart */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-slate-800">Voter Sentiment by Segment</h2>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Support rate (%) across demographics &amp; constituencies</p>
              </div>
              <div className="hidden sm:flex gap-2 text-[11px] text-slate-500">
                <span>Age</span>
                <span>|</span>
                <span>Gender</span>
                <span>|</span>
                <span>Constituency</span>
              </div>
            </div>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pollData} barSize={clamp(28, 32, 36)}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 11 }}
                    formatter={(v: unknown) => [`${v}%`, 'Support Rate']}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {pollData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Poll Results table */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-slate-800">Live Poll Results</h2>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                  Real Time Polling &nbsp;·&nbsp;
                  <span className="text-red-500">Last updated: Just now</span>
                </p>
              </div>
              <button className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-semibold text-xs sm:text-sm transition-all hover:opacity-90 whitespace-nowrap" style={{ background: RED, border: 'none', cursor: 'pointer' }}>
                <Download size={13} /> Export Research Report
              </button>
            </div>
            <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full text-xs" style={{ minWidth: '600px' }}>
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="hidden sm:table-cell text-left py-2 px-3 text-[11px] font-semibold text-slate-500 whitespace-nowrap">Poll ID</th>
                    <th className="text-left py-2 px-3 text-[11px] font-semibold text-slate-500 whitespace-nowrap">Question</th>
                    <th className="text-left py-2 px-3 text-[11px] font-semibold text-slate-500 whitespace-nowrap">Responses</th>
                    <th className="text-left py-2 px-3 text-[11px] font-semibold text-slate-500 whitespace-nowrap">Status</th>
                    <th className="hidden md:table-cell text-left py-2 px-3 text-[11px] font-semibold text-slate-500 whitespace-nowrap">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {livePolls.map(poll => (
                    <tr key={poll.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="hidden sm:table-cell py-2.5 px-3 text-xs font-semibold whitespace-nowrap" style={{ color: RED }}>{poll.id}</td>
                      <td className="py-2.5 px-3 text-[11px] sm:text-xs text-slate-800 max-w-[180px] sm:max-w-[250px] truncate">{poll.question}</td>
                      <td className="py-2.5 px-3 text-xs font-semibold text-slate-800 whitespace-nowrap">{poll.responses.toLocaleString()}</td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                          poll.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {poll.status === 'active' ? 'Live' : 'Paused'}
                        </span>
                      </td>
                      <td className="hidden md:table-cell py-2.5 px-3 text-[11px] text-slate-500 whitespace-nowrap">{poll.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right sidebar - Responsive */}
        <div className="lg:w-72 xl:w-80 space-y-3 sm:space-y-4">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-800 mb-3">Constituencies</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {constituencies.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: RED }} />
                  <span className="text-[11px] sm:text-xs text-slate-600 line-clamp-2">{c}</span>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:bg-red-50" style={{ border: `1px solid ${RED}`, color: RED, background: 'white', cursor: 'pointer' }}>
              View All Constituencies
            </button>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-800 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              {[
                { label: 'Total Respondents', value: '4,637' },
                { label: 'Avg Support Rate', value: '66%' },
                { label: 'Active Polls', value: '3' },
                { label: 'Constituencies Covered', value: '11/11' },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span className="text-[11px] sm:text-xs text-slate-500">{stat.label}</span>
                  <span className="text-xs sm:text-sm font-semibold" style={{ color: RED }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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