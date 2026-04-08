'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Download, Eye, Search, Shield, AlertTriangle, FileText, LogIn } from 'lucide-react';

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

  const filtered = MOCK_LOGS.filter(log =>
    (log.user.toLowerCase().includes(search.toLowerCase()) ||
     log.action.toLowerCase().includes(search.toLowerCase()) ||
     log.client.toLowerCase().includes(search.toLowerCase())) &&
    (actionFilter === 'All Actions' || log.action.toLowerCase().includes(actionFilter.toLowerCase().replace('s', '')))
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Audit Logs</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Super Admin Audit Logs</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#2563EB' }}
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Entries', value: '14,291', icon: FileText, color: '#2563EB', bg: '#F0FDFA' },
            { label: 'Today', value: '47', icon: LogIn, color: '#3B82F6', bg: '#EFF6FF' },
            { label: 'Failed Actions', value: '3', icon: AlertTriangle, color: '#EF4444', bg: '#FEF2F2' },
            { label: 'Data Exports', value: '12', icon: Shield, color: '#F59E0B', bg: '#FFFBEB' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* Filters */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search user, action, client..."
                className="w-full bg-slate-100 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-600 focus:outline-none"
              />
            </div>
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 text-slate-600 bg-white focus:outline-none cursor-pointer"
            >
              {ACTION_FILTERS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  {['ID', 'User', 'Client', 'Action', 'IP Address', 'Status', 'Time', 'View'].map(h => (
                    <th key={h} className="text-left py-3 px-4 font-semibold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">#{String(row.id).padStart(5, '0')}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-[160px] truncate">{row.user}</td>
                    <td className="py-3 px-4">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={row.client === 'Platform'
                          ? { backgroundColor: '#EFF6FF', color: '#1D4ED8' }
                          : { backgroundColor: '#F0FDFA', color: '#0F766E' }}
                      >
                        {row.client}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{row.action}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{row.ip}</td>
                    <td className="py-3 px-4">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={row.status === 'Success'
                          ? { backgroundColor: '#D1FAE5', color: '#065F46' }
                          : { backgroundColor: '#FEE2E2', color: '#991B1B' }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{row.time} · {row.date}</td>
                    <td className="py-3 px-4">
                      <button className="flex items-center gap-1 font-medium hover:opacity-70 transition-opacity" style={{ color: '#2563EB' }}>
                        <Eye size={12} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination stub */}
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Showing {filtered.length} of 14,291 entries</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 298].map((p, i) => (
                <button
                  key={i}
                  className="w-7 h-7 rounded-lg text-xs font-medium transition-all"
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
