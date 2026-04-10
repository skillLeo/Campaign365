'use client';
import { useState } from 'react';
import { Filter, Download, Map, Users, ChevronDown, Search } from 'lucide-react';

const CONSTITUENCIES = [
  { id: 'all', name: 'All Constituencies' },
  { id: 'sk1', name: 'St. Christopher 1' },
  { id: 'sk2', name: 'St. Christopher 2' },
  { id: 'sk3', name: 'St. Christopher 3' },
  { id: 'sk4', name: 'St. Christopher 4' },
  { id: 'sk5', name: 'St. Christopher 5' },
  { id: 'nevis1', name: 'Nevis 1' },
  { id: 'nevis2', name: 'Nevis 2' },
];

const MOCK_VOTERS = [
  { id: 1, name: 'Marcus James', constituency: 'St. Christopher 1', age: 34, history: 'Voted 3/3', sentiment: 'Supporter', gender: 'Male' },
  { id: 2, name: 'Josephine Williams', constituency: 'St. Christopher 2', age: 52, history: 'Voted 2/3', sentiment: 'Undecided', gender: 'Female' },
  { id: 3, name: 'Desmond Clarke', constituency: 'St. Christopher 3', age: 28, history: 'Voted 1/3', sentiment: 'Opposition', gender: 'Male' },
  { id: 4, name: 'Patricia Henry', constituency: 'Nevis 1', age: 45, history: 'Voted 3/3', sentiment: 'Supporter', gender: 'Female' },
  { id: 5, name: 'Ronald Baptiste', constituency: 'St. Christopher 4', age: 61, history: 'Voted 3/3', sentiment: 'Supporter', gender: 'Male' },
  { id: 6, name: 'Sandra Morton', constituency: 'Nevis 2', age: 39, history: 'Voted 0/3', sentiment: 'Undecided', gender: 'Female' },
  { id: 7, name: 'Calvin Thomas', constituency: 'St. Christopher 5', age: 22, history: 'First voter', sentiment: 'Undecided', gender: 'Male' },
  { id: 8, name: 'Yvonne Francis', constituency: 'St. Christopher 1', age: 48, history: 'Voted 2/3', sentiment: 'Supporter', gender: 'Female' },
  { id: 9, name: 'George Daniel', constituency: 'St. Christopher 2', age: 55, history: 'Voted 3/3', sentiment: 'Opposition', gender: 'Male' },
  { id: 10, name: 'Michelle Phipps', constituency: 'Nevis 1', age: 31, history: 'Voted 2/3', sentiment: 'Supporter', gender: 'Female' },
];

const sentimentColor: Record<string, { bg: string; text: string }> = {
  Supporter: { bg: '#DCFCE7', text: '#16A34A' },
  Undecided: { bg: '#FEF9C3', text: '#CA8A04' },
  Opposition: { bg: '#FEE2E2', text: '#DC2626' },
};

const mapZones = [
  { id: 'sk1', x: 120, y: 80, w: 90, h: 70, name: 'SK 1', color: '#16A34A', opacity: 0.7 },
  { id: 'sk2', x: 220, y: 60, w: 80, h: 80, name: 'SK 2', color: '#F59E0B', opacity: 0.6 },
  { id: 'sk3', x: 150, y: 160, w: 100, h: 65, name: 'SK 3', color: '#16A34A', opacity: 0.8 },
  { id: 'sk4', x: 260, y: 150, w: 70, h: 70, name: 'SK 4', color: '#DC2626', opacity: 0.6 },
  { id: 'sk5', x: 100, y: 230, w: 110, h: 60, name: 'SK 5', color: '#F59E0B', opacity: 0.5 },
  { id: 'nevis1', x: 280, y: 260, w: 85, h: 75, name: 'Nevis 1', color: '#16A34A', opacity: 0.65 },
  { id: 'nevis2', x: 290, y: 340, w: 80, h: 65, name: 'Nevis 2', color: '#DC2626', opacity: 0.5 },
];

export default function VoterTargetingPage() {
  const [constituency, setConstituency] = useState('all');
  const [sentiment, setSentiment] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_VOTERS.filter(v =>
    (constituency === 'all' || v.constituency.toLowerCase().includes(constituency.replace('sk', 'st. christopher ').replace('nevis', 'nevis'))) &&
    (sentiment === 'all' || v.sentiment === sentiment) &&
    (search === '' || v.name.toLowerCase().includes(search.toLowerCase()))
  );

  const supporters = MOCK_VOTERS.filter(v => v.sentiment === 'Supporter').length;
  const undecided = MOCK_VOTERS.filter(v => v.sentiment === 'Undecided').length;
  const opposition = MOCK_VOTERS.filter(v => v.sentiment === 'Opposition').length;

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Voter Targeting Map</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Visualize and segment voters by constituency</p>
        </div>
        <button className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: 'var(--tenant-primary)' }}>
          <Download size={13} className="sm:w-[14px] sm:h-[14px]" /> Export List
        </button>
      </div>

      {/* Filter bar - Responsive */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative w-full sm:w-auto">
          <select 
            value={constituency} 
            onChange={e => setConstituency(e.target.value)}
            className="appearance-none w-full pl-3 pr-8 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium bg-white"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
          >
            {CONSTITUENCIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
        </div>
        <div className="relative w-full sm:w-auto">
          <select 
            value={sentiment} 
            onChange={e => setSentiment(e.target.value)}
            className="appearance-none w-full pl-3 pr-8 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium bg-white"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
          >
            <option value="all">All Sentiment</option>
            <option value="Supporter">Supporters</option>
            <option value="Undecided">Undecided</option>
            <option value="Opposition">Opposition</option>
          </select>
          <ChevronDown size={13} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
        </div>
        <div className="relative flex-1 sm:flex-none">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search voter..."
            className="w-full pl-8 pr-3 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Map - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 flex-1 min-w-0" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-2 mb-3">
            <Map size={14} className="sm:w-[15px] sm:h-[15px]" style={{ color: 'var(--tenant-primary)' }} />
            <span className="font-semibold text-xs sm:text-sm text-slate-800">St. Kitts & Nevis — Constituency Map</span>
          </div>
          {/* SVG Map - Responsive */}
          <div className="relative bg-blue-50 rounded-xl overflow-hidden">
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 480 420" style={{ width: '100%', height: 'auto', minHeight: 'clamp(250px, 50vw, 340px)' }}>
                <rect width="480" height="420" fill="#BFDBFE" />
                <text x="30" y="200" fill="#93C5FD" fontSize="11" fontStyle="italic">Caribbean Sea</text>
                <ellipse cx="200" cy="200" rx="130" ry="75" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="1.5" />
                <ellipse cx="330" cy="310" rx="70" ry="55" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="1.5" />
                {mapZones.map(z => (
                  <g key={z.id}>
                    <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="8" fill={z.color} fillOpacity={z.opacity} stroke={z.color} strokeWidth="1.5" strokeOpacity="0.8" style={{ cursor: 'pointer' }} />
                    <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="700">{z.name}</text>
                  </g>
                ))}
              </svg>
            </div>
            {/* Legend - Responsive */}
            <div className="flex flex-wrap gap-3 sm:gap-4 p-2 sm:p-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              {[
                ['#16A34A', 'Supporter'],
                ['#F59E0B', 'Undecided'],
                ['#DC2626', 'Opposition']
              ].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: c as string }} />
                  <span className="text-[10px] sm:text-xs text-slate-500">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Panel - Responsive */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-80">
          <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="sm:w-[15px] sm:h-[15px]" style={{ color: 'var(--tenant-primary)' }} />
              <span className="font-semibold text-xs sm:text-sm text-slate-800">Segmentation</span>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              <div>
                <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                  <span className="text-slate-500">Total Voters</span>
                  <span className="font-bold text-slate-800">{MOCK_VOTERS.length.toLocaleString()}</span>
                </div>
              </div>
              {[
                { label: 'Supporters', count: supporters, color: '#16A34A', bg: '#DCFCE7' },
                { label: 'Undecided', count: undecided, color: '#CA8A04', bg: '#FEF9C3' },
                { label: 'Opposition', count: opposition, color: '#DC2626', bg: '#FEE2E2' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                    <span className="text-slate-500">{s.label}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${(s.count / MOCK_VOTERS.length) * 100}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4" style={{ borderColor: '#E2E8F0' }}>
            <p className="text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3 text-slate-500 uppercase tracking-wide">Gender Breakdown</p>
            {[
              ['Male', 6, '#3B82F6'], 
              ['Female', 4, 'var(--tenant-primary)']
            ].map(([g, n, c]) => (
              <div key={g as string} className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm text-slate-700">{g}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 sm:w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${((n as number) / 10) * 100}%`, backgroundColor: c as string }} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800">{n}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4" style={{ borderColor: '#E2E8F0' }}>
            <p className="text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3 text-slate-500 uppercase tracking-wide">Age Range</p>
            {[
              ['18–30', 2], 
              ['31–45', 4], 
              ['46–60', 3], 
              ['61+', 1]
            ].map(([r, n]) => (
              <div key={r as string} className="flex justify-between items-center mb-2">
                <span className="text-[11px] sm:text-xs text-slate-600">{r}</span>
                <div className="flex items-center gap-2">
                  <div className="w-14 sm:w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${((n as number) / 10) * 100}%`, backgroundColor: 'var(--tenant-primary)' }} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800">{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voter Table - Responsive */}
      <div className="bg-white rounded-xl sm:rounded-2xl border mt-4 sm:mt-5" style={{ borderColor: '#E2E8F0' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 sm:p-4 border-b" style={{ borderColor: '#F1F5F9' }}>
          <span className="font-semibold text-xs sm:text-sm text-slate-800">Filtered Voters ({filtered.length})</span>
          <div className="flex items-center gap-2">
            <Filter size={12} className="sm:w-[13px] sm:h-[13px] text-slate-400" />
            <span className="text-[11px] sm:text-xs text-slate-400">Showing {filtered.length} results</span>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-xs" style={{ minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Name', 'Constituency', 'Age', 'Voting History', 'Sentiment', 'Actions'].map(h => (
                  <th key={h} className="py-2 sm:py-2.5 px-3 sm:px-4 text-left text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-sm font-semibold text-slate-800 whitespace-nowrap">{v.name}</td>
                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-sm text-slate-500 whitespace-nowrap">{v.constituency}</td>
                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-sm text-slate-500 whitespace-nowrap">{v.age}</td>
                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-sm text-slate-500 whitespace-nowrap">{v.history}</td>
                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                    <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full" style={{ backgroundColor: sentimentColor[v.sentiment].bg, color: sentimentColor[v.sentiment].text }}>
                      {v.sentiment}
                    </span>
                  </td>
                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                    <button className="text-[10px] sm:text-xs font-semibold hover:opacity-70 transition-opacity" style={{ color: 'var(--tenant-primary)' }}>
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}