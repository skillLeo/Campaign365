'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { Plus, DollarSign, Users, TrendingUp, Send, Download } from 'lucide-react';
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
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const totalRaised = DONORS.filter(d => d.status === 'Paid').reduce((a, d) => a + d.amount, 0);
  const goal = 365000;
  const pct = Math.round((totalRaised / goal) * 100);

  return (
    <div className="space-y-5">
      {/* Gradient Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #E30613 0%, #8B0000 50%, #1A1A1A 100%)', borderRadius: 16, padding: '32px 32px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 6px' }}>SKNLP Campaign Finance</p>
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: 26, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Fundraising Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: 0 }}>{DONORS.length} donors this cycle · Goal: $365,000</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer' }}>
            <Download size={14} />
            Export Donors
          </button>
          <button
            onClick={() => setShowAddDonor(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: 'white', color: '#E30613', border: 'none', cursor: 'pointer' }}
          >
            <Plus size={14} />
            Launch New Campaign
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total raised with progress */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: '#0F172A' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1E293B' }}>
              <DollarSign size={15} style={{ color: '#E30613' }} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>Total Raised</p>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalRaised)}</p>
          <div className="mt-3 rounded-full h-2" style={{ backgroundColor: '#1E293B' }}>
            <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: '#E30613' }} />
          </div>
          <div className="flex justify-between text-xs mt-1.5">
            <span style={{ color: '#E30613' }}>{pct}% of goal</span>
            <span style={{ color: '#64748B' }}>Goal: {formatCurrency(goal)}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ECFDF5' }}>
              <TrendingUp size={15} style={{ color: '#E30613' }} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">This Month</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">{formatCurrency(38000)}</p>
          <p className="text-xs mt-1" style={{ color: '#E30613' }}>↑ 12% ahead of schedule</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
              <Users size={15} style={{ color: '#3B82F6' }} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Donors</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">{DONORS.length}</p>
          <p className="text-xs text-slate-400 mt-1">Avg. {formatCurrency(totalRaised / DONORS.length)} per donor</p>
        </div>
      </div>

      {/* Chart + Donors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-700 text-sm mb-4">Fundraising Trend</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
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
        <div className="col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-700 text-sm">Top Donors</h3>
            <button className="flex items-center gap-1.5 text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: primaryColor }}>
              <Send size={11} /> Send Thank-You Emails
            </button>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead style={{ backgroundColor: '#F8FAFC' }}>
              <tr>
                {['Donor', 'Amount', 'Date', 'Method', 'Status'].map(h => (
                  <th key={h} className="text-left py-2.5 px-4 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DONORS.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-700">{d.name}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{formatCurrency(d.amount)}</td>
                  <td className="py-3 px-4 text-slate-400">{d.date}</td>
                  <td className="py-3 px-4 text-slate-500">{d.method}</td>
                  <td className="py-3 px-4">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={d.status === 'Paid'
                        ? { backgroundColor: '#D1FAE5', color: '#065F46' }
                        : { backgroundColor: '#FEE2E2', color: '#991B1B' }}
                    >
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Add Donor Modal */}
      {showAddDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Add New Donor</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Full Name</label>
                <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="Donor's full name" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Amount (USD)</label>
                  <input type="number" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Payment Method</label>
                  <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none">
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Stripe</option>
                    <option>Powertranz</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowAddDonor(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Cancel</button>
                <button
                  onClick={() => setShowAddDonor(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add Donor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
