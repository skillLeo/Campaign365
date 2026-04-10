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
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [voterForm, setVoterForm] = useState(EMPTY_VOTER);
  const router = useRouter();
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

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
    return matchesSearch && matchesSentiment;
  });

  const displayVoters = voters.length > MOCK_VOTERS.length ? voters : filtered;

  return (
    <div className="space-y-5">
      {/* Add Voter Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800 text-lg">Add Voter</h3>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">First Name *</label>
                  <input
                    value={voterForm.first_name}
                    onChange={e => setVoterForm(f => ({ ...f, first_name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400"
                    placeholder="Marcus"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Last Name *</label>
                  <input
                    value={voterForm.last_name}
                    onChange={e => setVoterForm(f => ({ ...f, last_name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400"
                    placeholder="Brown"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Address</label>
                <input
                  value={voterForm.address}
                  onChange={e => setVoterForm(f => ({ ...f, address: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400"
                  placeholder="12 King Street, Kingston"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Constituency</label>
                  <select
                    value={voterForm.constituency}
                    onChange={e => setVoterForm(f => ({ ...f, constituency: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none"
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
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Polling Division</label>
                  <input
                    value={voterForm.polling_division}
                    onChange={e => setVoterForm(f => ({ ...f, polling_division: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none font-mono"
                    placeholder="KN-04"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Sentiment</label>
                <select
                  value={voterForm.sentiment}
                  onChange={e => setVoterForm(f => ({ ...f, sentiment: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none"
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
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddVoter}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add Voter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Voter Management</h1>
          <p className="text-sm text-slate-400 mt-0.5">{formatNumber(45000)} total voters registered</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => router.push('/voters/import')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Upload size={14} />
            <span className="hidden sm:inline">Import CSV</span>
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus size={14} />
            Add Voter
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Voters', value: '45,000', color: '#E30613', bg: '#FEE2E2' },
          { label: 'Supporters', value: '12,400', color: '#E30613', bg: '#FEE2E2' },
          { label: 'Undecided', value: '3,800', color: '#E30613', bg: '#FEE2E2' },
          { label: 'Opposition', value: '1,900', color: '#EF4444', bg: '#FEF2F2' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: color }} />
            <p className="text-xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Filters */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:flex-1 sm:max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search voters..."
              className="w-full bg-slate-100 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-600 focus:outline-none"
            />
          </div>
          <select
            value={sentiment}
            onChange={e => setSentiment(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 text-slate-600 bg-white focus:outline-none cursor-pointer"
          >
            <option value="">All Sentiments</option>
            <option value="supporter">Supporter</option>
            <option value="undecided">Undecided</option>
            <option value="opposition">Opposition</option>
            <option value="unknown">Unknown</option>
          </select>
          <select className="text-xs border border-slate-200 rounded-xl px-3 py-2 text-slate-600 bg-white focus:outline-none cursor-pointer">
            <option value="">All Constituencies</option>
            <option>Kingston Central</option>
            <option>Kingston East</option>
            <option>St. Catherine North</option>
            <option>St. James Central</option>
          </select>
          <button className="ml-auto text-xs font-medium hover:opacity-70" style={{ color: primaryColor }}>
            Export List
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ minWidth: 640 }}>
            <thead style={{ backgroundColor: '#F8FAFC' }}>
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-slate-500">Voter</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-500 hidden sm:table-cell">Constituency</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-500 hidden md:table-cell">Polling Div.</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-500">Sentiment</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-500 hidden lg:table-cell">Tags</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayVoters.map((v: any) => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => router.push(`/voters/${v.id}`)}>
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-semibold text-slate-700">{v.first_name} {v.last_name}</p>
                      <p className="text-slate-400 mt-0.5 truncate max-w-[160px]">{v.address}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 hidden sm:table-cell">{v.constituency || '—'}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 hidden md:table-cell">{v.polling_division || '—'}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={sentimentStyle(v.sentiment)}>
                      {v.sentiment || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(v.custom_tags || []).map((tag: string) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/voters/${v.id}`)}
                        className="flex items-center gap-1 font-medium hover:opacity-70 transition-opacity"
                        style={{ color: primaryColor }}
                      >
                        <Eye size={11} /> View
                      </button>
                      <button className="flex items-center gap-1 font-medium hover:opacity-70 transition-opacity text-blue-600 hidden sm:flex">
                        <UserCheck size={11} /> Assign
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-400">Showing {displayVoters.length} of 45,000 voters</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all">
              <ChevronLeft size={12} className="text-slate-400" />
            </button>
            {[1, 2, 3, '…', 180].map((p, i) => (
              <button
                key={i}
                className="w-7 h-7 rounded-lg text-xs font-medium transition-all"
                style={p === 1 ? { backgroundColor: primaryColor, color: 'white' } : { color: '#64748B' }}
              >
                {p}
              </button>
            ))}
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all">
              <ChevronRight size={12} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
