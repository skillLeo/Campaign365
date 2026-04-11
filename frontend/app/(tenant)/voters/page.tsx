'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Upload, Eye, UserCheck, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';

const MOCK_VOTERS = [
  { id: 1, first_name: 'Marcus', last_name: 'Brown', address: '12 King Street, Kingston', constituency: 'Kingston Central', polling_division: 'KN-04', sentiment: 'supporter', custom_tags: ['GOTV', 'Volunteer'] },
  { id: 2, first_name: 'Sheila', last_name: 'Thompson', address: '45 Hope Road, Kingston', constituency: 'Kingston East', polling_division: 'KE-01', sentiment: 'undecided', custom_tags: ['Follow Up'] },
  { id: 3, first_name: 'Devon', last_name: 'Campbell', address: '8 Duke Street, Spanish Town', constituency: 'St. Catherine North', polling_division: 'SC-12', sentiment: 'supporter', custom_tags: [] },
  { id: 4, first_name: 'Alicia', last_name: 'Morrison', address: '3 Orange Street, Montego Bay', constituency: 'St. James Central', polling_division: 'SJ-03', sentiment: 'opposition', custom_tags: [] },
  { id: 5, first_name: 'Lloyd', last_name: 'Williams', address: '22 Main Street, May Pen', constituency: 'Clarendon Central', polling_division: 'CL-07', sentiment: 'undecided', custom_tags: ['Absentee'] },
  { id: 6, first_name: 'Patricia', last_name: 'Davis', address: '67 Constant Spring Rd', constituency: 'Kingston North', polling_division: 'KN-02', sentiment: 'supporter', custom_tags: ['GOTV'] },
];

const sentimentStyle = (s: string) => {
  if (s === 'supporter') return { backgroundColor: '#D1FAE5', color: '#065F46' };
  if (s === 'opposition') return { backgroundColor: '#FEE2E2', color: '#991B1B' };
  if (s === 'undecided') return { backgroundColor: '#FEF3C7', color: '#92400E' };
  return { backgroundColor: '#F1F5F9', color: '#475569' };
};

const EMPTY_VOTER = { first_name: '', last_name: '', address: '', constituency: 'Kingston Central', polling_division: '', sentiment: 'supporter' };

export default function VotersPage() {
  const [voters, setVoters] = useState(MOCK_VOTERS as any[]);
  const [search, setSearch] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [constituency, setConstituency] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [voterForm, setVoterForm] = useState(EMPTY_VOTER);
  const router = useRouter();
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || 'var(--tenant-primary)';

  const handleAddVoter = () => {
    if (!voterForm.first_name.trim() || !voterForm.last_name.trim()) return;
    const newVoter = {
      id: voters.length + 100,
      ...voterForm,
      custom_tags: [],
    };
    setVoters(prev => [newVoter, ...prev]);
    setVoterForm(EMPTY_VOTER);
    setShowAdd(false);
  };

  useEffect(() => {
    api.get('/voters', { params: { search, sentiment, per_page: 20 } })
      .then(r => { if (r.data.data?.length) setVoters(r.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, sentiment]);

  const filtered = MOCK_VOTERS.filter(v => {
    const q = search.toLowerCase();
    const matchesSearch = !q || `${v.first_name} ${v.last_name}`.toLowerCase().includes(q) || v.address.toLowerCase().includes(q);
    const matchesSentiment = !sentiment || v.sentiment === sentiment;
    const matchesConstituency = !constituency || v.constituency === constituency;
    return matchesSearch && matchesSentiment && matchesConstituency;
  });

  const displayVoters = voters.length > MOCK_VOTERS.length ? voters : filtered;

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Add Voter Modal - Responsive */}
      {showAdd && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowAdd(false)} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Add Voter</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">First Name *</label>
                  <input
                    value={voterForm.first_name}
                    onChange={e => setVoterForm(f => ({ ...f, first_name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                    placeholder="Marcus"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Last Name *</label>
                  <input
                    value={voterForm.last_name}
                    onChange={e => setVoterForm(f => ({ ...f, last_name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                    placeholder="Brown"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Address</label>
                <input
                  value={voterForm.address}
                  onChange={e => setVoterForm(f => ({ ...f, address: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                  placeholder="12 King Street, Kingston"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Constituency</label>
                  <select
                    value={voterForm.constituency}
                    onChange={e => setVoterForm(f => ({ ...f, constituency: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none"
                  >
                    <option>Kingston Central</option>
                    <option>Kingston East</option>
                    <option>Kingston North</option>
                    <option>St. Catherine North</option>
                    <option>St. James Central</option>
                    <option>Clarendon Central</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Polling Division</label>
                  <input
                    value={voterForm.polling_division}
                    onChange={e => setVoterForm(f => ({ ...f, polling_division: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none font-mono"
                    placeholder="KN-04"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Sentiment</label>
                <select
                  value={voterForm.sentiment}
                  onChange={e => setVoterForm(f => ({ ...f, sentiment: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none"
                >
                  <option value="supporter">Supporter</option>
                  <option value="undecided">Undecided</option>
                  <option value="opposition">Opposition</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => { setShowAdd(false); setVoterForm(EMPTY_VOTER); }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddVoter}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add Voter
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Voter Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{formatNumber(45000)} total voters registered</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => router.push('/voters/import')}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all whitespace-nowrap"
          >
            <Upload size={13} className="sm:w-[14px] sm:h-[14px]" />
            <span className="hidden sm:inline">Import CSV</span>
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus size={13} className="sm:w-[14px] sm:h-[14px]" />
            Add Voter
          </button>
        </div>
      </div>

      {/* Stats row - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Voters', value: '45,000', color: primaryColor, bg: '#FEE2E2' },
          { label: 'Supporters', value: '12,400', color: primaryColor, bg: '#FEE2E2' },
          { label: 'Undecided', value: '3,800', color: primaryColor, bg: '#FEE2E2' },
          { label: 'Opposition', value: '1,900', color: '#EF4444', bg: '#FEF2F2' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mb-2" style={{ backgroundColor: color }} />
            <p className="text-lg sm:text-xl font-bold text-slate-800">{value}</p>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">{label}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
        {/* Filters - Responsive */}
        <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search voters..."
                className="w-full bg-slate-100 rounded-lg sm:rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
            <select
              value={sentiment}
              onChange={e => setSentiment(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-slate-600 bg-white focus:outline-none cursor-pointer"
            >
              <option value="">All Sentiments</option>
              <option value="supporter">Supporter</option>
              <option value="undecided">Undecided</option>
              <option value="opposition">Opposition</option>
              <option value="unknown">Unknown</option>
            </select>
            <select
              value={constituency}
              onChange={e => setConstituency(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-slate-600 bg-white focus:outline-none cursor-pointer"
            >
              <option value="">All Constituencies</option>
              <option>Kingston Central</option>
              <option>Kingston East</option>
              <option>Kingston North</option>
              <option>St. Catherine North</option>
              <option>St. James Central</option>
              <option>Clarendon Central</option>
            </select>
            <button className="text-xs font-medium hover:opacity-70 ml-auto whitespace-nowrap" style={{ color: primaryColor }}>
              Export List
            </button>
          </div>
        </div>

        {/* Table - Responsive with horizontal scroll */}
        <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-xs" style={{ minWidth: '700px' }}>
            <thead style={{ backgroundColor: '#F8FAFC' }}>
              <tr>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Voter</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden sm:table-cell">Constituency</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden md:table-cell">Polling Div.</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Sentiment</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden lg:table-cell">Tags</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayVoters.map((v: any) => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => router.push(`/voters/${v.id}`)}>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-700 text-[11px] sm:text-xs truncate max-w-[140px]">{v.first_name} {v.last_name}</p>
                      <p className="text-slate-400 text-[10px] sm:text-[11px] mt-0.5 truncate max-w-[160px]">{v.address}</p>
                    </div>
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-slate-600 text-[11px] sm:text-xs hidden sm:table-cell whitespace-nowrap">{v.constituency || '—'}</td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-mono text-slate-400 text-[11px] sm:text-xs hidden md:table-cell whitespace-nowrap">{v.polling_division || '—'}</td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 whitespace-nowrap">
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold capitalize" style={sentimentStyle(v.sentiment)}>
                      {v.sentiment || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(v.custom_tags || []).slice(0, 2).map((tag: string) => (
                        <span key={tag} className="px-1 sm:px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-medium whitespace-nowrap" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
                          {tag}
                        </span>
                      ))}
                      {(v.custom_tags || []).length > 2 && (
                        <span className="px-1 sm:px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-medium text-slate-500">
                          +{v.custom_tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-4" onClick={e => e.stopPropagation()}>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => router.push(`/voters/${v.id}`)}
                        className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium hover:opacity-70 transition-opacity whitespace-nowrap"
                        style={{ color: primaryColor }}
                      >
                        <Eye size={10} className="sm:w-[11px] sm:h-[11px]" /> View
                      </button>
                      <button className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium hover:opacity-70 transition-opacity text-blue-600 hidden sm:flex whitespace-nowrap">
                        <UserCheck size={10} className="sm:w-[11px] sm:h-[11px]" /> Assign
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - Responsive */}
        <div className="px-3 sm:px-4 md:px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">Showing {displayVoters.length} of 45,000 voters</p>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <button className="p-1 sm:p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all">
              <ChevronLeft size={11} className="sm:w-[12px] sm:h-[12px] text-slate-400" />
            </button>
            {[1, 2, 3, '…', 180].map((p, i) => (
              <button
                key={i}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[11px] sm:text-xs font-medium transition-all"
                style={p === 1 ? { backgroundColor: primaryColor, color: 'white' } : { color: '#64748B' }}
              >
                {p}
              </button>
            ))}
            <button className="p-1 sm:p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all">
              <ChevronRight size={11} className="sm:w-[12px] sm:h-[12px] text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}