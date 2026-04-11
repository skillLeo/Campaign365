'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Target, Users, Calendar, ChevronRight, Search, X, Eye, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  gotv: 'var(--tenant-primary)',
  canvassing: '#3B82F6',
  outreach: '#8B5CF6',
  communications: '#F59E0B',
};

const EMPTY_FORM = { name: '', type: 'gotv', constituency: 'All', start_date: '', end_date: '', turnout_goal: '' };

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS as any[]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const router = useRouter();
  const primaryColor = 'var(--tenant-primary)';

  const handleCreate = () => {
    if (!form.name.trim()) return;
    const newCampaign = {
      id: campaigns.length + 1,
      name: form.name,
      type: form.type,
      status: 'draft',
      turnout_goal: Number(form.turnout_goal) || 0,
      responses: 0,
      constituency: form.constituency,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    setForm(EMPTY_FORM);
    setShowCreate(false);
  };

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
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Campaigns</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{campaigns.length} total campaigns</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0 whitespace-nowrap"
          style={{ backgroundColor: primaryColor }}
        >
          <Plus size={13} className="sm:w-[14px] sm:h-[14px]" />
          Create Campaign
        </button>
      </div>

      {/* Summary cards - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Campaigns', value: campaigns.length, color: primaryColor },
          { label: 'Active', value: campaigns.filter(c => c.status === 'active').length, color: 'var(--tenant-primary)' },
          { label: 'Completed', value: campaigns.filter(c => c.status === 'completed').length, color: '#3B82F6' },
          { label: 'Draft', value: campaigns.filter(c => c.status === 'draft').length, color: '#94A3B8' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <p className="text-xl sm:text-2xl font-bold text-slate-800">{value}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: color }} />
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative w-full sm:w-56 md:w-64">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {['all', 'active', 'completed', 'draft'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium capitalize transition-all whitespace-nowrap"
              style={statusFilter === s
                ? { backgroundColor: primaryColor, color: 'white' }
                : { color: '#64748B' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Create Campaign Modal - Responsive */}
      {showCreate && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-black/50" 
            onClick={() => setShowCreate(false)} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Create New Campaign</h3>
              <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Campaign Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-slate-400"
                  placeholder="e.g. GOTV Final Push"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none"
                  >
                    <option value="gotv">GOTV</option>
                    <option value="canvassing">Canvassing</option>
                    <option value="outreach">Outreach</option>
                    <option value="communications">Communications</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Voter Target</label>
                  <input
                    type="number"
                    value={form.turnout_goal}
                    onChange={e => setForm(f => ({ ...f, turnout_goal: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none"
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Constituency</label>
                <select
                  value={form.constituency}
                  onChange={e => setForm(f => ({ ...f, constituency: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none"
                >
                  <option value="All">All Constituencies</option>
                  <option>Kingston Central</option>
                  <option>Kingston East</option>
                  <option>St. Catherine North</option>
                  <option>St. James Central</option>
                  <option>Clarendon Central</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => { setShowCreate(false); setForm(EMPTY_FORM); }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Campaign cards - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filtered.map(c => (
          <div
            key={c.id}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 cursor-pointer hover:shadow-md transition-all"
            onClick={() => router.push(`/campaigns/${c.id}`)}
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 sm:w-2 h-6 sm:h-8 rounded-full"
                  style={{ backgroundColor: typeColors[c.type] || primaryColor }}
                />
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-semibold capitalize whitespace-nowrap" style={statusStyle(c.status)}>
                    {c.status}
                  </span>
                  <span className="text-[9px] sm:text-xs text-slate-400 uppercase font-medium whitespace-nowrap">{c.type?.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1" onClick={e => e.stopPropagation()}>
                <button className="p-1.5 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="View" style={{ color: primaryColor }}>
                  <Eye size={11} className="sm:w-[13px] sm:h-[13px]" />
                </button>
                <button className="p-1.5 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400" title="Edit">
                  <Edit2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                </button>
                <button className="p-1.5 sm:p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete" style={{ color: '#EF4444' }}>
                  <Trash2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-2 sm:mb-3 truncate">
              #{String(c.id).padStart(5, '0')} {c.name}
            </h3>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div>
                <div className="flex items-center gap-0.5 sm:gap-1 mb-0.5">
                  <Target size={9} className="sm:w-[10px] sm:h-[10px] text-slate-400" />
                  <p className="text-[10px] sm:text-xs text-slate-400">Target</p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{formatNumber(c.turnout_goal)}</p>
              </div>
              <div>
                <div className="flex items-center gap-0.5 sm:gap-1 mb-0.5">
                  <Users size={9} className="sm:w-[10px] sm:h-[10px] text-slate-400" />
                  <p className="text-[10px] sm:text-xs text-slate-400">Responses</p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{formatNumber(c.responses)}</p>
              </div>
              <div>
                <div className="flex items-center gap-0.5 sm:gap-1 mb-0.5">
                  <Calendar size={9} className="sm:w-[10px] sm:h-[10px] text-slate-400" />
                  <p className="text-[10px] sm:text-xs text-slate-400">Area</p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{c.constituency}</p>
              </div>
            </div>

            {/* Progress bar */}
            {c.turnout_goal > 0 && (
              <div className="mt-3 sm:mt-4">
                <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{Math.min(100, Math.round((c.responses / c.turnout_goal) * 100))}%</span>
                </div>
                <div className="h-1 sm:h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
              <p className="text-[10px] sm:text-xs text-slate-400 mt-2 sm:mt-3 truncate">
                {c.start_date} — {c.end_date || 'Ongoing'}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <Target size={32} className="text-slate-300" />
          </div>
          <h3 className="text-base font-semibold text-slate-700 mb-1">No campaigns found</h3>
          <p className="text-sm text-slate-400">Try adjusting your search or create a new campaign</p>
        </div>
      )}
    </div>
  );
}