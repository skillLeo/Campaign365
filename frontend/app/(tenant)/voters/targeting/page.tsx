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
    <div style={{ padding: '0 0 24px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Voter Targeting Map</h1>
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>Visualize and segment voters by constituency</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
          <Download size={14} /> Export List
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative">
          <select value={constituency} onChange={e => setConstituency(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border text-sm font-medium bg-white"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }}>
            {CONSTITUENCIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ChevronDown size={13} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B' }} />
        </div>
        <div className="relative">
          <select value={sentiment} onChange={e => setSentiment(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border text-sm font-medium bg-white"
            style={{ borderColor: '#E2E8F0', color: '#0F172A' }}>
            <option value="all">All Sentiment</option>
            <option value="Supporter">Supporters</option>
            <option value="Undecided">Undecided</option>
            <option value="Opposition">Opposition</option>
          </select>
          <ChevronDown size={13} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B' }} />
        </div>
        <div className="relative flex items-center">
          <Search size={14} style={{ position: 'absolute', left: 10, color: '#94A3B8' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search voter..."
            className="pl-8 pr-3 py-2 rounded-lg border text-sm bg-white"
            style={{ borderColor: '#E2E8F0', color: '#0F172A', outline: 'none', width: 200 }} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Map */}
        <div className="bg-white rounded-xl border p-4" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-2 mb-3">
            <Map size={15} style={{ color: 'var(--tenant-primary)' }} />
            <span className="font-semibold text-sm" style={{ color: '#0F172A' }}>St. Kitts & Nevis — Constituency Map</span>
          </div>
          {/* SVG Map */}
          <div style={{ position: 'relative', backgroundColor: '#EFF6FF', borderRadius: 12, overflow: 'hidden' }}>
            <svg viewBox="0 0 480 420" style={{ width: '100%', height: 340 }}>
              <rect width="480" height="420" fill="#BFDBFE" />
              {/* Ocean label */}
              <text x="30" y="200" fill="#93C5FD" fontSize="11" fontStyle="italic">Caribbean Sea</text>
              {/* Island shapes */}
              <ellipse cx="200" cy="200" rx="130" ry="75" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="1.5" />
              <ellipse cx="330" cy="310" rx="70" ry="55" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="1.5" />
              {/* Constituency zones */}
              {mapZones.map(z => (
                <g key={z.id}>
                  <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="8" fill={z.color} fillOpacity={z.opacity} stroke={z.color} strokeWidth="1.5" strokeOpacity="0.8" style={{ cursor: 'pointer' }} />
                  <text x={z.x + z.w / 2} y={z.y + z.h / 2 + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="700">{z.name}</text>
                </g>
              ))}
            </svg>
            {/* Legend */}
            <div className="flex gap-4 p-3" style={{ borderTop: '1px solid #E2E8F0' }}>
              {[['#16A34A', 'Supporter'], ['#F59E0B', 'Undecided'], ['#DC2626', 'Opposition']].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: c as string }} />
                  <span className="text-xs" style={{ color: '#64748B' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border p-4" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={15} style={{ color: 'var(--tenant-primary)' }} />
              <span className="font-semibold text-sm" style={{ color: '#0F172A' }}>Segmentation</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#64748B' }}>Total Voters</span>
                  <span className="font-bold" style={{ color: '#0F172A' }}>{MOCK_VOTERS.length.toLocaleString()}</span>
                </div>
              </div>
              {[
                { label: 'Supporters', count: supporters, color: '#16A34A', bg: '#DCFCE7' },
                { label: 'Undecided', count: undecided, color: '#CA8A04', bg: '#FEF9C3' },
                { label: 'Opposition', count: opposition, color: '#DC2626', bg: '#FEE2E2' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: '#64748B' }}>{s.label}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.count}</span>
                  </div>
                  <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(s.count / MOCK_VOTERS.length) * 100}%`, backgroundColor: s.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4" style={{ borderColor: '#E2E8F0' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gender Breakdown</p>
            {[['Male', 6, '#3B82F6'], ['Female', 4, 'var(--tenant-primary)']].map(([g, n, c]) => (
              <div key={g as string} className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: '#374151' }}>{g}</span>
                <div className="flex items-center gap-2">
                  <div style={{ width: 80, height: 6, backgroundColor: '#F1F5F9', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${((n as number) / 10) * 100}%`, backgroundColor: c as string, borderRadius: 3 }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: '#0F172A' }}>{n}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border p-4" style={{ borderColor: '#E2E8F0' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Age Range</p>
            {[['18–30', 2], ['31–45', 4], ['46–60', 3], ['61+', 1]].map(([r, n]) => (
              <div key={r as string} className="flex justify-between items-center mb-2">
                <span className="text-xs" style={{ color: '#374151' }}>{r}</span>
                <div className="flex items-center gap-2">
                  <div style={{ width: 70, height: 5, backgroundColor: '#F1F5F9', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${((n as number) / 10) * 100}%`, backgroundColor: 'var(--tenant-primary)', borderRadius: 3 }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: '#0F172A' }}>{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voter Table */}
      <div className="bg-white rounded-xl border mt-5" style={{ borderColor: '#E2E8F0' }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#F1F5F9' }}>
          <span className="font-semibold text-sm" style={{ color: '#0F172A' }}>Filtered Voters ({filtered.length})</span>
          <div className="flex items-center gap-2">
            <Filter size={13} style={{ color: '#94A3B8' }} />
            <span className="text-xs" style={{ color: '#94A3B8' }}>Showing {filtered.length} results</span>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }} className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Name', 'Constituency', 'Age', 'Voting History', 'Sentiment', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.id} style={{ borderTop: '1px solid #F1F5F9', backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{v.name}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13, color: '#64748B' }}>{v.constituency}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13, color: '#64748B' }}>{v.age}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13, color: '#64748B' }}>{v.history}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20, backgroundColor: sentimentColor[v.sentiment].bg, color: sentimentColor[v.sentiment].text }}>{v.sentiment}</span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <button style={{ fontSize: 11, fontWeight: 600, color: 'var(--tenant-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>View Profile</button>
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
