'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Download, Eye, Search, Shield, AlertTriangle, FileText, LogIn, Trash2, Menu, X } from 'lucide-react';

const MOCK_LOGS = [
  { id: 72941, user: 'superadmin@c365.com', client: 'Platform', action: 'Tenant created', ip: '192.168.1.10', status: 'Success', time: '10:32 AM', date: 'Oct 6' },
  { id: 72940, user: 'admin@jlp.org', client: 'JLP', action: 'Voter data exported', ip: '198.51.100.4', status: 'Success', time: '09:15 AM', date: 'Oct 6' },
  { id: 72939, user: 'superadmin@c365.com', client: 'Platform', action: 'Feature flag toggled', ip: '192.168.1.10', status: 'Success', time: '08:44 AM', date: 'Oct 6' },
  { id: 72938, user: 'unknown', client: 'Platform', action: 'Login failed', ip: '203.0.113.99', status: 'Failed', time: '07:30 PM', date: 'Oct 5' },
  { id: 72937, user: 'admin@sknlp.org', client: 'SKNLP', action: 'Branding updated', ip: '198.51.100.7', status: 'Success', time: '06:12 PM', date: 'Oct 5' },
  { id: 72936, user: 'superadmin@c365.com', client: 'Platform', action: 'API key rotated', ip: '192.168.1.10', status: 'Success', time: '04:58 PM', date: 'Oct 5' },
  { id: 72935, user: 'admin@pnp.org', client: 'PNP', action: 'User account created', ip: '198.51.100.2', status: 'Success', time: '03:20 PM', date: 'Oct 5' },
  { id: 72934, user: 'unknown', client: 'Platform', action: 'Login failed', ip: '203.0.113.55', status: 'Failed', time: '02:10 PM', date: 'Oct 5' },
];

const ACTION_FILTERS = ['All Actions', 'Logins', 'Data Exports', 'Tenant Changes', 'Security Events'];

export default function AuditLogsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = MOCK_LOGS.filter(log =>
    (log.user.toLowerCase().includes(search.toLowerCase()) ||
     log.action.toLowerCase().includes(search.toLowerCase()) ||
     log.client.toLowerCase().includes(search.toLowerCase())) &&
    (actionFilter === 'All Actions' || log.action.toLowerCase().includes(actionFilter.toLowerCase().replace('s', '')))
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar - Responsive */}
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-white border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-1 text-[11px] sm:text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors whitespace-nowrap">
            Dashboard
          </button>
          <ChevronRight size={10} className="sm:w-3 sm:h-3 flex-shrink-0" />
          <span className="text-slate-600 font-medium whitespace-nowrap">Audit Logs</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-800">Super Admin Audit Logs</h1>
          <button
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
            style={{ backgroundColor: '#2563EB' }}
          >
            <Download size={13} className="sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Export CSV</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
        {/* KPI cards - Responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Total Entries', value: '14,291', icon: FileText, color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Today', value: '47', icon: LogIn, color: '#3B82F6', bg: '#EFF6FF' },
            { label: 'Failed Actions', value: '3', icon: AlertTriangle, color: '#EF4444', bg: '#FEF2F2' },
            { label: 'Data Exports', value: '12', icon: Shield, color: '#F59E0B', bg: '#FFFBEB' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                  <Icon size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color }} />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-800">{value}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 whitespace-nowrap">{label}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          {/* Filters - Responsive */}
          <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-b border-slate-100">
            {/* Desktop Filters */}
            <div className="hidden sm:flex flex-wrap items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search user, action, client..."
                  className="w-full bg-slate-100 rounded-lg sm:rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <select
                value={actionFilter}
                onChange={e => setActionFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-slate-600 bg-white focus:outline-none cursor-pointer"
              >
                {ACTION_FILTERS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>

            {/* Mobile Filters - Toggle */}
            <div className="sm:hidden flex flex-col gap-2">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center justify-between w-full px-3 py-2 bg-slate-50 rounded-lg text-slate-600 text-sm"
              >
                <span>Filters</span>
                {mobileFiltersOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
              {mobileFiltersOpen && (
                <div className="flex flex-col gap-2 pt-2">
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="w-full bg-slate-100 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-600 focus:outline-none"
                    />
                  </div>
                  <select
                    value={actionFilter}
                    onChange={e => setActionFilter(e.target.value)}
                    className="text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-600 bg-white focus:outline-none cursor-pointer w-full"
                  >
                    {ACTION_FILTERS.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Table - Responsive with horizontal scroll */}
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '800px' }}>
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden sm:table-cell">ID</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">User</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden md:table-cell">Client</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Action</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden lg:table-cell">IP Address</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Status</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap hidden md:table-cell">Time</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 sm:py-3 px-3 sm:px-4 font-mono text-slate-400 text-[11px] sm:text-xs hidden sm:table-cell whitespace-nowrap">
                      #{String(row.id).padStart(5, '0')}
                    </td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-slate-600 text-[11px] sm:text-xs max-w-[120px] sm:max-w-[150px] truncate">
                      {row.user}
                    </td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 hidden md:table-cell whitespace-nowrap">
                      <span
                        className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap"
                        style={row.client === 'Platform'
                          ? { backgroundColor: '#EFF6FF', color: '#1D4ED8' }
                          : { backgroundColor: '#F0FDFA', color: '#0F766E' }}
                      >
                        {row.client}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 font-medium text-slate-700 text-[11px] sm:text-xs max-w-[120px] sm:max-w-[160px] truncate">
                      {row.action}
                    </td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 font-mono text-slate-400 text-[11px] sm:text-xs hidden lg:table-cell whitespace-nowrap">
                      {row.ip}
                    </td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span
                        className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap"
                        style={row.status === 'Success'
                          ? { backgroundColor: '#D1FAE5', color: '#065F46' }
                          : { backgroundColor: '#FEE2E2', color: '#991B1B' }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-slate-400 text-[11px] sm:text-xs hidden md:table-cell whitespace-nowrap">
                      {row.time} · {row.date}
                    </td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button className="p-1 sm:p-1.5 rounded-lg hover:bg-blue-50 transition-colors" title="View Log" style={{ color: '#2563EB' }}>
                          <Eye size={11} className="sm:w-[13px] sm:h-[13px]" />
                        </button>
                        <button className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hidden sm:inline-flex" title="Export Entry">
                          <Download size={11} className="sm:w-[13px] sm:h-[13px]" />
                        </button>
                        <button className="p-1 sm:p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete Entry" style={{ color: '#EF4444' }}>
                          <Trash2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination - Responsive */}
          <div className="px-3 sm:px-4 md:px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
              Showing {filtered.length} of 14,291 entries
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {[1, 2, 3, '...', 298].map((p, i) => (
                <button
                  key={i}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[11px] sm:text-xs font-medium transition-all hover:bg-slate-100"
                  style={p === 1 ? { backgroundColor: '#2563EB', color: 'white' } : { color: '#64748B' }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}