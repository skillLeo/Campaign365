'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, DollarSign, Users, TrendingUp, Send, Download, Eye, Edit2, Trash2, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const lineData = [
  { month: 'May', amount: 18000 },
  { month: 'Jun', amount: 24000 },
  { month: 'Jul', amount: 21000 },
  { month: 'Aug', amount: 32000 },
  { month: 'Sep', amount: 28000 },
  { month: 'Oct', amount: 38000 },
];

const DONORS = [
  { id: 1, name: 'Richard Morris', amount: 8500, date: 'Oct 5', method: 'Stripe', status: 'Paid' },
  { id: 2, name: 'Sandra Clarke', amount: 5000, date: 'Oct 4', method: 'Cheque', status: 'Paid' },
  { id: 3, name: 'James Brown', amount: 3200, date: 'Oct 3', method: 'Cash', status: 'Paid' },
  { id: 4, name: 'Michelle Thompson', amount: 2800, date: 'Oct 2', method: 'Stripe', status: 'Overdue' },
  { id: 5, name: 'Devon Williams', amount: 1500, date: 'Oct 1', method: 'Powertranz', status: 'Paid' },
  { id: 6, name: 'Patricia Davis', amount: 1200, date: 'Sep 30', method: 'Cash', status: 'Paid' },
];

export default function FundraisingPage() {
  const [showAddDonor, setShowAddDonor] = useState(false);
  const primaryColor = 'var(--tenant-primary)';

  const totalRaised = DONORS.filter(d => d.status === 'Paid').reduce((a, d) => a + d.amount, 0);
  const goal = 365000;
  const pct = Math.round((totalRaised / goal) * 100);

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Gradient Hero Banner - Responsive */}
      <div style={{ background: 'linear-gradient(135deg, var(--tenant-primary) 0%, var(--tenant-primary-dark) 50%, #1A1A1A 100%)', borderRadius: 'clamp(12px, 3vw, 16px)', padding: 'clamp(16px, 4vw, 20px) clamp(16px, 4vw, 24px)' }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 6px' }}>SKNLP Campaign Finance</p>
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(20px, 5vw, 26px)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Fundraising Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(11px, 2.5vw, 13px)', margin: 0 }}>{DONORS.length} donors this cycle · Goal: $365,000</p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <Download size={12} className="sm:w-[14px] sm:h-[14px]" />
            Export Donors
          </button>
          <button
            onClick={() => setShowAddDonor(true)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 700, background: 'white', color: 'var(--tenant-primary)', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <Plus size={12} className="sm:w-[14px] sm:h-[14px]" />
            Launch New Campaign
          </button>
        </div>
      </div>

      {/* KPI cards - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Total raised with progress */}
        <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow" style={{ backgroundColor: '#0F172A' }}>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1E293B' }}>
              <DollarSign size={13} className="sm:w-[15px] sm:h-[15px]" style={{ color: 'var(--tenant-primary)' }} />
            </div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>Total Raised</p>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white">{formatCurrency(totalRaised)}</p>
          <div className="mt-2 sm:mt-3 rounded-full h-1.5 sm:h-2" style={{ backgroundColor: '#1E293B' }}>
            <div className="h-1.5 sm:h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: 'var(--tenant-primary)' }} />
          </div>
          <div className="flex justify-between text-[10px] sm:text-xs mt-1.5">
            <span style={{ color: 'var(--tenant-primary)' }}>{pct}% of goal</span>
            <span style={{ color: '#64748B' }}>Goal: {formatCurrency(goal)}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ECFDF5' }}>
              <TrendingUp size={13} className="sm:w-[15px] sm:h-[15px]" style={{ color: 'var(--tenant-primary)' }} />
            </div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-slate-400">This Month</p>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-800">{formatCurrency(38000)}</p>
          <p className="text-[10px] sm:text-xs mt-1" style={{ color: 'var(--tenant-primary)' }}>↑ 12% ahead of schedule</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
              <Users size={13} className="sm:w-[15px] sm:h-[15px]" style={{ color: '#3B82F6' }} />
            </div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-slate-400">Total Donors</p>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-800">{DONORS.length}</p>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Avg. {formatCurrency(totalRaised / DONORS.length)} per donor</p>
        </div>
      </div>

      {/* Chart + Donors - Responsive */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Chart */}
        <div className="lg:w-2/5 bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5">
          <h3 className="font-semibold text-slate-700 text-xs sm:text-sm mb-3 sm:mb-4">Fundraising Trend</h3>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }}
                formatter={(v: any) => [formatCurrency(v), 'Raised']}
              />
              <Area type="monotone" dataKey="amount" stroke={primaryColor} strokeWidth={2.5} fill="url(#fg)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donors table */}
        <div className="lg:flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm">Top Donors</h3>
            <button className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-medium hover:opacity-70 transition-opacity whitespace-nowrap" style={{ color: primaryColor }}>
              <Send size={10} className="sm:w-[11px] sm:h-[11px]" /> Send Thank-You Emails
            </button>
          </div>
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '600px' }}>
              <thead style={{ backgroundColor: '#F8FAFC' }}>
                <tr>
                  {['Donor', 'Amount', 'Date', 'Method', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-2 sm:py-2.5 px-3 sm:px-4 font-semibold text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DONORS.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold text-slate-700 text-[11px] sm:text-xs whitespace-nowrap">{d.name}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-bold text-slate-800 text-[11px] sm:text-xs whitespace-nowrap">{formatCurrency(d.amount)}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-slate-400 text-[11px] sm:text-xs whitespace-nowrap">{d.date}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-slate-500 text-[11px] sm:text-xs whitespace-nowrap">{d.method}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span
                        className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold"
                        style={d.status === 'Paid'
                          ? { backgroundColor: '#D1FAE5', color: '#065F46' }
                          : { backgroundColor: '#FEE2E2', color: '#991B1B' }}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button className="p-1 sm:p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="View Donor" style={{ color: 'var(--tenant-primary)' }}>
                          <Eye size={11} className="sm:w-[13px] sm:h-[13px]" />
                        </button>
                        <button className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500" title="Edit Donor">
                          <Edit2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                        </button>
                        <button className="p-1 sm:p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete Donor" style={{ color: '#EF4444' }}>
                          <Trash2 size={11} className="sm:w-[13px] sm:h-[13px]" />
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

      {/* Add Donor Modal - Responsive */}
      {showAddDonor && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowAddDonor(false)} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Add New Donor</h3>
              <button onClick={() => setShowAddDonor(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Full Name</label>
                <input className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" placeholder="Donor's full name" />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Amount (USD)</label>
                  <input type="number" className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Payment Method</label>
                  <select className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none">
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Stripe</option>
                    <option>Powertranz</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAddDonor(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddDonor(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add Donor
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}