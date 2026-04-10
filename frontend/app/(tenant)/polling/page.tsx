'use client';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, Filter, Search, ChevronDown } from 'lucide-react';

const RED = '#E30613';

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
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <p style={{ color: '#64748B', fontSize: 13, margin: '0 0 4px' }}>Dashboard &gt; Polling &amp; Research</p>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Advanced Polling &amp; Research
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search polls..."
              style={{
                paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13,
                color: '#0F172A', outline: 'none', width: '100%', maxWidth: 220,
              }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid #E2E8F0', borderRadius: 8, background: 'white', fontSize: 13, color: '#374151', cursor: 'pointer' }}>
            <Filter size={14} />
            Filter
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap" style={{ gap: 0, borderBottom: '1px solid #E2E8F0', marginBottom: 24 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? RED : '#64748B',
              borderBottom: activeTab === tab ? `2px solid ${RED}` : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Bar chart */}
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: 0 }}>Voter Sentiment by Segment</h2>
                <p style={{ color: '#64748B', fontSize: 12, margin: '4px 0 0' }}>Support rate (%) across demographics &amp; constituencies</p>
              </div>
              <div className="hidden sm:flex" style={{ gap: 12, fontSize: 12, color: '#64748B' }}>
                <span>Age</span>
                <span>|</span>
                <span>Gender</span>
                <span>|</span>
                <span>Constituency</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pollData} barSize={32}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }}
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

          {/* Live Poll Results table */}
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24 }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: 0 }}>Live Poll Results</h2>
                <p style={{ color: '#64748B', fontSize: 12, margin: '4px 0 0' }}>
                  Real Time Polling &nbsp;·&nbsp;
                  <span style={{ color: RED }}>Last updated: Just now</span>
                </p>
              </div>
              <button
                style={{
                  padding: '9px 16px', borderRadius: 8, border: 'none',
                  background: RED, color: 'white', fontWeight: 600, fontSize: 13,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <Download size={14} />
                Export Research Report
              </button>
            </div>
            <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <th className="hidden sm:table-cell" style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#64748B' }}>Poll ID</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#64748B' }}>Question</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#64748B' }}>Responses</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#64748B' }}>Status</th>
                  <th className="hidden md:table-cell" style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#64748B' }}>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {livePolls.map(poll => (
                  <tr key={poll.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <td className="hidden sm:table-cell" style={{ padding: '12px', fontSize: 13, fontWeight: 600, color: RED }}>{poll.id}</td>
                    <td style={{ padding: '12px', fontSize: 13, color: '#0F172A', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{poll.question}</td>
                    <td style={{ padding: '12px', fontSize: 13, color: '#0F172A', fontWeight: 600 }}>{poll.responses.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                        background: poll.status === 'active' ? '#DCFCE7' : '#FEF9C3',
                        color: poll.status === 'active' ? '#16A34A' : '#92400E',
                      }}>
                        {poll.status === 'active' ? 'Live' : 'Paused'}
                      </span>
                    </td>
                    <td className="hidden md:table-cell" style={{ padding: '12px', fontSize: 12, color: '#64748B' }}>{poll.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Right: Constituencies */}
        <div className="w-full lg:w-64 lg:flex-shrink-0">
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: '0 0 16px' }}>Constituencies</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {constituencies.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: RED, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#374151', lineHeight: 1.4 }}>{c}</span>
                </div>
              ))}
            </div>
            <button style={{ marginTop: 16, width: '100%', padding: '9px', border: `1px solid ${RED}`, borderRadius: 8, color: RED, background: 'white', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              View All Constituencies
            </button>
          </div>

          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 20, marginTop: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: '0 0 12px' }}>Quick Stats</h3>
            {[
              { label: 'Total Respondents', value: '4,637' },
              { label: 'Avg Support Rate', value: '66%' },
              { label: 'Active Polls', value: '3' },
              { label: 'Constituencies Covered', value: '11/11' },
            ].map(stat => (
              <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 12, color: '#64748B' }}>{stat.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: RED }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
