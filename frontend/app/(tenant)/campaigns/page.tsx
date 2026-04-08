'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Target, Users, Calendar, ChevronRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';

const MOCK_CAMPAIGNS = [
  { id: 1, name: 'GOTV Drive 2025', type: 'gotv', status: 'active', turnout_goal: 15000, responses: 8721, constituency: 'Kingston Central', start_date: '2025-09-01', end_date: '2025-11-05' },
  { id: 2, name: 'Door-to-Door Canvassing', type: 'canvassing', status: 'active', turnout_goal: 8400, responses: 3200, constituency: 'St. Catherine North', start_date: '2025-09-15', end_date: null },
  { id: 3, name: 'Rural Outreach Program', type: 'outreach', status: 'draft', turnout_goal: 5000, responses: 0, constituency: 'Clarendon Central', start_date: '2025-10-01', end_date: '2025-11-05' },
  { id: 4, name: 'SMS Voter Reminder', type: 'communications', status: 'completed', turnout_goal: 22000, responses: 19840, constituency: 'All', start_date: '2025-08-01', end_date: '2025-09-30' },
];

const statusStyle = (s: string) => {
  if (s === 'active') return { backgroundColor: '#D1FAE5', color: '#065F46' };
  if (s === 'completed') return { backgroundColor: '#DBEAFE', color: '#1E40AF' };
  if (s === 'draft') return { backgroundColor: '#F1F5F9', color: '#475569' };
  return { backgroundColor: '#FEF3C7', color: '#92400E' };
};

const typeColors: Record<string, string> = {
  gotv: '#E30613',
  canvassing: '#3B82F6',
  outreach: '#8B5CF6',
  communications: '#F59E0B',
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS as any[]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  useEffect(() => {
    api.get('/campaigns')
      .then(r => { if (r.data.data?.length) setCampaigns(r.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = campaigns.filter(c => {
    const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Campaigns</h1>
          <p className="text-sm text-slate-400 mt-0.5">{campaigns.length} total campaigns</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          <Plus size={14} />
          Create Campaign
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Campaigns', value: campaigns.length, color: primaryColor },
          { label: 'Active', value: campaigns.filter(c => c.status === 'active').length, color: '#E30613' },
          { label: 'Completed', value: campaigns.filter(c => c.status === 'completed').length, color: '#3B82F6' },
          { label: 'Draft', value: campaigns.filter(c => c.status === 'draft').length, color: '#94A3B8' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            className="bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-600 focus:outline-none w-56"
          />
        </div>
        <div className="flex items-center gap-1">
          {['all', 'active', 'completed', 'draft'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all"
              style={statusFilter === s
                ? { backgroundColor: primaryColor, color: 'white' }
                : { color: '#64748B' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-100 p-5 cursor-pointer hover:shadow-md transition-all"
            onClick={() => router.push(`/campaigns/${c.id}`)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: typeColors[c.type] || primaryColor }}
                />
                <div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize mr-2" style={statusStyle(c.status)}>
                    {c.status}
                  </span>
                  <span className="text-xs text-slate-400 uppercase font-medium">{c.type?.replace('_', ' ')}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </div>

            <h3 className="font-semibold text-slate-800 mb-3">#{String(c.id).padStart(5, '0')} {c.name}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <Target size={10} className="text-slate-400" />
                  <p className="text-xs text-slate-400">Target</p>
                </div>
                <p className="text-sm font-semibold text-slate-700">{formatNumber(c.turnout_goal)}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <Users size={10} className="text-slate-400" />
                  <p className="text-xs text-slate-400">Responses</p>
                </div>
                <p className="text-sm font-semibold text-slate-700">{formatNumber(c.responses)}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <Calendar size={10} className="text-slate-400" />
                  <p className="text-xs text-slate-400">Area</p>
                </div>
                <p className="text-sm font-semibold text-slate-700 truncate">{c.constituency}</p>
              </div>
            </div>

            {/* Progress bar */}
            {c.turnout_goal > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{Math.min(100, Math.round((c.responses / c.turnout_goal) * 100))}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.round((c.responses / c.turnout_goal) * 100))}%`,
                      backgroundColor: typeColors[c.type] || primaryColor,
                    }}
                  />
                </div>
              </div>
            )}

            {c.start_date && (
              <p className="text-xs text-slate-400 mt-3">
                {c.start_date} — {c.end_date || 'Ongoing'}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
