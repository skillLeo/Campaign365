'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, CheckCircle, Search, Download } from 'lucide-react';

const CHECKLISTS = [
  { label: 'GDPR', desc: 'All voter data processed with full consent logging and right-to-erasure support.' },
  { label: 'Checklist', desc: 'Platform checklist items reviewed and validated for this period.' },
  { label: 'Electoral Commission UK', desc: 'Compliant with UK Electoral Commission data handling standards.' },
  { label: 'Electoral Commission Jamaica', desc: 'Meets Electoral Office of Jamaica requirements.' },
  { label: 'Canada Elections Act', desc: 'Aligned with Elections Canada data protection guidelines.' },
];

const DATA_EXPORTS = [
  { id: 'EX-001', client: 'Jamaica Labour Party', date: '2025-10-05', status: 'Completed' },
  { id: 'EX-002', client: 'SKNLP', date: '2025-10-04', status: 'Completed' },
  { id: 'EX-003', client: 'PNP', date: '2025-10-06', status: 'Hornd' },
  { id: 'EX-004', client: 'UK Labour', date: '2025-10-03', status: 'Completed' },
  { id: 'EX-005', client: 'DLP Barbados', date: '2025-09-28', status: 'Hornd' },
  { id: 'EX-006', client: 'Canvass Demo', date: '2025-09-25', status: 'Completed' },
];

const AUDIT_TRAIL = [
  { label: 'Data export initiated', time: '10:32 AM', date: 'Oct 6' },
  { label: 'Data export initiated', time: '09:15 AM', date: 'Oct 6' },
  { label: 'Export completed', time: '08:44 AM', date: 'Oct 6' },
  { label: 'Export completed', time: '07:30 PM', date: 'Oct 5' },
  { label: 'Export completed', time: '06:12 PM', date: 'Oct 5' },
  { label: 'Export completed', time: '04:58 PM', date: 'Oct 5' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function CompliancePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'global' | 'client'>('global');
  const [exportSearch, setExportSearch] = useState('');
  const [auditOpen, setAuditOpen] = useState(true);
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const blanks = Array.from({ length: firstDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const filtered = DATA_EXPORTS.filter(e =>
    e.client.toLowerCase().includes(exportSearch.toLowerCase()) ||
    e.id.toLowerCase().includes(exportSearch.toLowerCase())
  );

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <button onClick={() => router.push('/super/dashboard')} className="hover:text-slate-600 transition-colors">
            Dashboard
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">Compliance</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { key: 'global' as const, label: 'Global Compliance' },
            { key: 'client' as const, label: 'Per-Client' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={
                activeTab === tab.key
                  ? { backgroundColor: '#2563EB', color: 'white' }
                  : { color: '#64748B' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* LEFT: Compliance Checklists */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-700 text-sm mb-4">Compliance Checklists</h3>
            <div className="space-y-4">
              {CHECKLISTS.map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: '#2563EB' }} />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE: Data Exports */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-semibold text-slate-700 text-sm mb-3">Data Exports</h3>
              <button
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 mb-3"
                style={{ backgroundColor: '#2563EB' }}
              >
                Request Full Data Export
              </button>
              <div className="flex items-center gap-2 mb-2">
                <div className="relative flex-1">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={exportSearch}
                    onChange={e => setExportSearch(e.target.value)}
                    className="w-full bg-slate-100 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-600 focus:outline-none"
                    placeholder="Search..."
                  />
                </div>
                <button
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  Search
                </button>
              </div>
              <button
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{ borderColor: '#2563EB', color: '#2563EB' }}
              >
                Temall Requests
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead style={{ backgroundColor: '#F8FAFC' }}>
                  <tr>
                    {['ID', 'Client', 'Date', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left py-2.5 px-4 font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(row => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-slate-500">{row.id}</td>
                      <td className="py-2.5 px-4 font-medium text-slate-700">{row.client}</td>
                      <td className="py-2.5 px-4 text-slate-400">{row.date}</td>
                      <td className="py-2.5 px-4">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={
                            row.status === 'Completed'
                              ? { backgroundColor: '#D1FAE5', color: '#065F46' }
                              : { backgroundColor: '#CCFBF1', color: '#0F766E' }
                          }
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <button className="hover:opacity-70 transition-opacity" style={{ color: '#2563EB' }}>
                          <Download size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>

          {/* RIGHT: Calendar + Audit Trail */}
          <div className="space-y-4">
            {/* Calendar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-700 text-sm">Scheduled Month</h3>
                <div className="flex items-center gap-1">
                  <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                    <ChevronLeft size={14} className="text-slate-500" />
                  </button>
                  <span className="text-xs font-medium text-slate-600 w-20 text-center">
                    {MONTHS[calMonth]} {calYear}
                  </span>
                  <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                    <ChevronRight size={14} className="text-slate-500" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 mb-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                  <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {blanks.map((_, i) => <div key={`b${i}`} />)}
                {days.map(d => (
                  <button
                    key={d}
                    className="aspect-square flex items-center justify-center text-xs rounded-lg transition-all hover:bg-slate-100"
                    style={
                      d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear()
                        ? { backgroundColor: '#2563EB', color: 'white', fontWeight: 700 }
                        : { color: '#475569' }
                    }
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setAuditOpen(!auditOpen)}
              >
                <span>Audit Trail</span>
                <ChevronRight size={14} className={`text-slate-400 transition-transform ${auditOpen ? 'rotate-90' : ''}`} />
              </button>
              {auditOpen && (
                <div className="px-5 pb-4 space-y-2.5 border-t border-slate-100 pt-3">
                  {AUDIT_TRAIL.map((ev, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#2563EB' }} />
                        <span className="text-slate-600">{ev.label}</span>
                      </div>
                      <span className="text-slate-400 shrink-0">{ev.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export all voter data */}
            <button
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#2563EB' }}
            >
              Export All Voter Data (Anonymized)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
