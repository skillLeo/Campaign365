'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Download, Send, DollarSign, AlertTriangle, RefreshCw, TrendingUp, Eye, Edit2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BILLING_DATA = [
  { id: 'INV-001', client: 'Jamaica Labour Party', flag: '🇯🇲', plan: 'Enterprise', amount: 1800, due: '2025-10-15', status: 'Paid' },
  { id: 'INV-002', client: 'SKNLP', flag: '🇰🇳', plan: 'Sovereign', amount: 3200, due: '2025-10-12', status: 'Paid' },
  { id: 'INV-003', client: 'PNP', flag: '🇯🇲', plan: 'Enterprise', amount: 1800, due: '2025-10-10', status: 'Overdue' },
  { id: 'INV-004', client: 'UK Labour', flag: '🇬🇧', plan: 'Enterprise+', amount: 4500, due: '2025-10-08', status: 'Overdue' },
  { id: 'INV-005', client: 'DLP Barbados', flag: '🇧🇧', plan: 'Essentials', amount: 499, due: '2025-10-20', status: 'Pending' },
  { id: 'INV-006', client: 'Canvass Demo', flag: '🌐', plan: 'Professional', amount: 999, due: '2025-10-18', status: 'Paid' },
];

const revenueData = [
  { month: 'May', v: 8200 },
  { month: 'Jun', v: 9400 },
  { month: 'Jul', v: 10800 },
  { month: 'Aug', v: 11200 },
  { month: 'Sep', v: 12100 },
  { month: 'Oct', v: 12799 },
];

const planColors: Record<string, string> = {
  Essentials: '#94A3B8',
  Professional: '#3B82F6',
  Enterprise: '#2563EB',
  'Enterprise+': '#8B5CF6',
  Sovereign: '#F59E0B',
};

export default function BillingPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = BILLING_DATA.filter(r => statusFilter === 'All' || r.status === statusFilter);
  const totalMRR = BILLING_DATA.filter(r => r.status === 'Paid').reduce((a, r) => a + r.amount, 0);
  const overdue = BILLING_DATA.filter(r => r.status === 'Overdue');

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-4 md:px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Billing</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-slate-800">Billing & Invoicing Overview</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
            style={{ backgroundColor: '#2563EB' }}
          >
            <Download size={14} />
            <span className="hidden sm:inline">Generate All Invoices</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#0F172A' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1E293B' }}>
                <DollarSign size={16} style={{ color: '#2563EB' }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">${totalMRR.toLocaleString()}</p>
            <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Revenue This Month</p>
            <p className="text-xs mt-1" style={{ color: '#2563EB' }}>↑ 12% from last month</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
                <AlertTriangle size={16} style={{ color: '#EF4444' }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>{overdue.length} Overdue</p>
            <p className="text-xs mt-0.5 text-slate-400">Invoices past due</p>
            <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
              ${overdue.reduce((a, r) => a + r.amount, 0).toLocaleString()} outstanding
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F0FDFA' }}>
                <RefreshCw size={16} style={{ color: '#2563EB' }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{BILLING_DATA.length}</p>
            <p className="text-xs mt-0.5 text-slate-400">Active Subscriptions</p>
            <p className="text-xs mt-1" style={{ color: '#2563EB' }}>Auto-renewing</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                <TrendingUp size={16} style={{ color: '#3B82F6' }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">$12.8K</p>
            <p className="text-xs mt-0.5 text-slate-400">Annual Run Rate</p>
            <p className="text-xs mt-1" style={{ color: '#3B82F6' }}>$153.6K ARR</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue chart */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-700 text-sm mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={revenueData} barSize={18}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }}
                  formatter={(v: any) => [`$${v.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="v" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Billing table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-700 text-sm flex-1 min-w-[80px]">Invoices</h3>
              {['All', 'Paid', 'Overdue', 'Pending'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                  style={statusFilter === s
                    ? { backgroundColor: '#2563EB', color: 'white' }
                    : { color: '#64748B' }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  {['Invoice', 'Client', 'Plan', 'Amount', 'Due Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-2.5 px-4 font-semibold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">{row.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{row.flag}</span>
                        <span className="font-medium text-slate-700">{row.client}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-xs" style={{ color: planColors[row.plan] || '#94A3B8' }}>
                        {row.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">${row.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-400">{row.due}</td>
                    <td className="py-3 px-4">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={
                          row.status === 'Paid'
                            ? { backgroundColor: '#D1FAE5', color: '#065F46' }
                            : row.status === 'Overdue'
                            ? { backgroundColor: '#FEE2E2', color: '#991B1B' }
                            : { backgroundColor: '#FEF3C7', color: '#92400E' }
                        }
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors" title="View Invoice" style={{ color: '#2563EB' }}>
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500" title="Send Invoice">
                          <Send size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500" title="Download PDF">
                          <Download size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
