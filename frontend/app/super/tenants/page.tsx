'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, RefreshCw, UserPlus, ChevronDown, ArrowUpDown } from 'lucide-react';
import { mockTenants } from '@/lib/mockData';

// Convert mockTenants to local format
const MOCK_TENANTS = mockTenants.map(t => ({
  id: t.id,
  name: 'Organization Name',
  country: t.country,
  flag: t.flag,
  plan: t.plan,
  users_count: t.activeUsers,
  status: t.status,
  updated_at: t.lastActivity,
}));

function tierColor(plan: string) {
  const map: Record<string, string> = {
    'Enterprise+': '#8B5CF6', Enterprise: '#2563EB', Professional: '#3B82F6', Starter: '#F59E0B',
  };
  return map[plan] || '#94A3B8';
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [filterCountry, setFilterCountry] = useState('All Countries');
  const [filterTier, setFilterTier] = useState('All Tiers');
  const [filterStatus, setFilterStatus] = useState('Status');
  const router = useRouter();

  const fetchTenants = () => {
    setLoading(true);
    // Mock data — no backend required
    const filtered = search
      ? MOCK_TENANTS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.country.toLowerCase().includes(search.toLowerCase()))
      : MOCK_TENANTS;
    setTenants(filtered);
    setLoading(false);
  };

  useEffect(() => { fetchTenants(); }, [search]);

  const filtered = tenants.filter(t => {
    if (filterCountry !== 'All Countries' && t.country !== filterCountry) return false;
    if (filterTier !== 'All Tiers' && t.plan !== filterTier) return false;
    if (filterStatus !== 'Status' && t.status !== filterStatus.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 bg-white border-b border-slate-100">
        <div className="flex-shrink-0">
          <p className="text-sm text-slate-400">Welcome back,</p>
          <p className="font-bold text-slate-800">Malissa</p>
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-100 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-600 focus:outline-none placeholder-slate-400"
            placeholder="Global Search"
          />
        </div>
        <button
          onClick={() => router.push('/super/tenants/new')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
          style={{ backgroundColor: '#2563EB' }}
        >
          <UserPlus size={15} />
          Add New Client
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: '#0F172A', letterSpacing: '-0.025em' }}>All Clients / Tenant Management</h1>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all">
              Actions <ChevronDown size={14} />
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-4">
            {[
              { value: filterCountry, set: setFilterCountry, options: ['All Countries', 'Jamaica', 'UK', 'USA', 'Canada', 'St. Kitts', 'Barbados'] },
              { value: filterTier, set: setFilterTier, options: ['All Tiers', 'Starter', 'Professional', 'Enterprise', 'Enterprise+'] },
              { value: filterStatus, set: setFilterStatus, options: ['Status', 'Active', 'Inactive'] },
            ].map(({ value, set, options }) => (
              <div key={value} className="relative">
                <select
                  value={value}
                  onChange={e => set(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-sm text-slate-600 focus:outline-none cursor-pointer"
                >
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            ))}
            <button onClick={fetchTenants} className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-500">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  {['Filter', 'Country', 'Subscription Tier', 'Active Users', 'Status', 'Last Activity'].map((h, i) => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        {h}
                        {i === 0 && <ArrowUpDown size={11} className="text-slate-400" />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="py-3 px-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                )) : filtered.map(t => (
                  <tr
                    key={t.id}
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${selected?.id === t.id ? 'bg-teal-50' : ''}`}
                    onClick={() => setSelected(t)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: tierColor(t.plan) }}
                        >
                          {t.name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-700">{t.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{t.flag} {t.country || '—'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: tierColor(t.plan) }}>
                        {t.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{(t.users_count ?? 0).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      {t.status === 'active' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Active</span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">Inactive</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-xs">
                      {t.updated_at || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Right panel: Client Summary */}
        <div className="hidden lg:flex w-72 shrink-0 border-l border-slate-100 bg-white flex-col">
          <div className="px-5 py-4 text-white" style={{ backgroundColor: '#2563EB' }}>
            <h3 className="font-bold text-sm">Client Summary</h3>
            <p className="text-xs opacity-80 mt-0.5">{selected ? selected.name : 'Select a client'}</p>
          </div>
          <div className="flex-1 p-5">
            {selected ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Organization Name</label>
                  <p className="text-sm font-semibold text-slate-800">{selected.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Subscription Tier</label>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: tierColor(selected.plan) }}>
                    {selected.plan}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Active Users</label>
                  <div className="px-4 py-2 rounded-lg text-center text-sm font-semibold text-white" style={{ backgroundColor: '#2563EB' }}>
                    {(selected.users_count ?? 0).toLocaleString()}
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  {[
                    { label: 'View/ Edit/Suspend', action: () => router.push(`/super/tenants/${selected.id}`) },
                    { label: 'View/ Edit/Suspend', action: () => router.push(`/super/tenants/${selected.id}`) },
                    { label: 'View/ Edit/Suspend', action: () => {} },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      onClick={btn.action}
                      className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: '#2563EB' }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm text-center py-10">
                Click a row to view<br />client details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
