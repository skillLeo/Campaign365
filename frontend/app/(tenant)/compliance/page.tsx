'use client';
import { useState } from 'react';
import { Shield, Download, AlertCircle, CheckCircle, Clock, FileText, Plus, Search, ChevronDown, Eye, Edit2, Trash2 } from 'lucide-react';

const DATA_REQUESTS = [
  { id: 'DR-001', request: 'Voter data export', status: 'Done', date: '2023-11-04', assignedTo: 'John Doe', type: 'Export' },
  { id: 'DR-002', request: 'Data import request', status: 'Pending', date: '2023-11-07', assignedTo: 'John Doe', type: 'Import' },
  { id: 'DR-003', request: 'Data import request', status: 'Pending', date: '2023-11-07', assignedTo: 'John Doe', type: 'Import' },
  { id: 'DR-004', request: 'Data import request', status: 'Done', date: '2023-11-07', assignedTo: 'John Doe', type: 'Import' },
  { id: 'DA-001', request: 'Data access request', status: 'Done', date: '2023-11-07', assignedTo: 'John Doe', type: 'Access' },
  { id: 'DA-002', request: 'Data access request', status: 'Pending', date: '2023-11-14', assignedTo: 'John Doe', type: 'Access' },
  { id: 'DA-003', request: 'Data access request', status: 'Non-Compliant', date: '2023-11-14', assignedTo: 'John Doe', type: 'Access' },
];

const COMPLIANCE_CHECKS = [
  { label: 'Voter data encrypted at rest', status: 'pass' },
  { label: 'Data minimization policy active', status: 'pass' },
  { label: 'Consent records maintained', status: 'pass' },
  { label: 'Right to erasure process defined', status: 'warning' },
  { label: 'Data breach notification plan', status: 'pass' },
  { label: 'Third-party data sharing agreements', status: 'fail' },
  { label: 'Offline data handling policy', status: 'pass' },
];

const ELECTION_LAW_CHECKS = [
  { label: 'St. Kitts and Nevis Election Advertising Act — compliant', status: 'pass' },
  { label: 'Voter registration data usage — restricted to election purposes', status: 'pass' },
  { label: 'Canvassing records retained for 12 months', status: 'pass' },
  { label: 'Financial disclosure filed with Electoral Commission', status: 'warning' },
  { label: 'Foreign funding restrictions observed', status: 'pass' },
];

type Tab = 'history' | 'election' | 'exports';

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    Done: { bg: '#F0FDF4', color: '#15803D' },
    Pending: { bg: '#FFFBEB', color: '#B45309' },
    'Non-Compliant': { bg: '#FEF2F2', color: '#B91C1C' },
    pass: { bg: '#F0FDF4', color: '#15803D' },
    warning: { bg: '#FFFBEB', color: '#B45309' },
    fail: { bg: '#FEF2F2', color: '#B91C1C' },
  };
  const c = config[status] || { bg: '#F8FAFC', color: '#64748B' };
  const label = status === 'pass' ? '✓ Compliant' : status === 'warning' ? '⚠ Review' : status === 'fail' ? '✗ Non-Compliant' : status;
  return (
    <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: c.bg, color: c.color }}>
      {label}
    </span>
  );
}

export default function CompliancePage() {
  const [tab, setTab] = useState<Tab>('history');
  const [search, setSearch] = useState('');

  const filtered = DATA_REQUESTS.filter(r =>
    search === '' || r.id.toLowerCase().includes(search.toLowerCase()) || r.request.toLowerCase().includes(search.toLowerCase())
  );

  const passCount = COMPLIANCE_CHECKS.filter(c => c.status === 'pass').length;
  const warnCount = COMPLIANCE_CHECKS.filter(c => c.status === 'warning').length;
  const failCount = COMPLIANCE_CHECKS.filter(c => c.status === 'fail').length;
  const score = Math.round((passCount / COMPLIANCE_CHECKS.length) * 100);

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>Compliance &amp; Data Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Dashboard › Compliance</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: '#E30613' }}>
            <FileText size={13} className="sm:w-[14px] sm:h-[14px]" /> Generate Compliance Report
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all whitespace-nowrap">
            <Download size={13} className="sm:w-[14px] sm:h-[14px]" /> Export All Data
          </button>
        </div>
      </div>

      {/* Compliance Score - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <svg viewBox="0 0 36 36" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E30613" strokeWidth="3.5"
                strokeDasharray={`${score} ${100 - score}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm sm:text-base font-bold text-slate-800">{score}%</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-slate-800 text-center mt-2">Compliance Score</p>
          <p className="text-[10px] sm:text-xs text-slate-400 text-center">SK&N Election Law</p>
        </div>
        {[
          { label: 'Compliant Checks', value: passCount, color: '#15803D', bg: '#F0FDF4', icon: CheckCircle },
          { label: 'Needs Review', value: warnCount, color: '#B45309', bg: '#FFFBEB', icon: AlertCircle },
          { label: 'Non-Compliant', value: failCount, color: '#B91C1C', bg: '#FEF2F2', icon: Shield },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg }}>
              <s.icon size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium mb-0.5">{s.label}</p>
              <p className="text-lg sm:text-2xl font-bold text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit max-w-full">
        {([
          { id: 'history', label: 'Data History' },
          { id: 'election', label: 'Election Compliance' },
          { id: 'exports', label: 'Export Requests' },
        ] as { id: Tab; label: string }[]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold transition-all whitespace-nowrap"
            style={{
              backgroundColor: tab === t.id ? '#E30613' : 'transparent',
              color: tab === t.id ? 'white' : '#64748B',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {(tab === 'history' || tab === 'exports') && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <div className="relative w-full sm:w-56">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs sm:text-sm text-slate-700 focus:outline-none"
                placeholder="Search requests..."
              />
            </div>
            <button className="flex items-center justify-center gap-1.5 rounded-lg text-white transition-all hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: '#E30613', border: 'none', padding: '6px 12px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
              <Plus size={11} className="sm:w-[12px] sm:h-[12px]" /> New Request
            </button>
          </div>
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '700px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th className="hidden sm:table-cell text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">ID</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Request</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Status</th>
                  <th className="hidden md:table-cell text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Date</th>
                  <th className="hidden lg:table-cell text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Assigned To</th>
                  <th className="text-left py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td className="hidden sm:table-cell py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-mono font-semibold whitespace-nowrap" style={{ color: '#2563EB' }}>{r.id}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-800 max-w-[140px] truncate">{r.request}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap"><StatusBadge status={r.status} /></td>
                    <td className="hidden md:table-cell py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-500 whitespace-nowrap">{r.date}</td>
                    <td className="hidden lg:table-cell py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-500 whitespace-nowrap">{r.assignedTo}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button className="p-1 sm:p-1.5 rounded-md hover:bg-slate-100 transition-colors" title="View" style={{ color: '#2563EB' }}>
                          <Eye size={11} className="sm:w-[13px] sm:h-[13px]" />
                        </button>
                        <button className="p-1 sm:p-1.5 rounded-md hover:bg-slate-100 transition-colors" title="Edit" style={{ color: '#475569' }}>
                          <Edit2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                        </button>
                        <button className="p-1 sm:p-1.5 rounded-md hover:bg-slate-100 transition-colors" title="Download" style={{ color: '#475569' }}>
                          <Download size={11} className="sm:w-[13px] sm:h-[13px]" />
                        </button>
                        <button className="p-1 sm:p-1.5 rounded-md hover:bg-red-50 transition-colors" title="Delete" style={{ color: '#EF4444' }}>
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
      )}

      {tab === 'election' && (
        <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
          {/* Data Policy */}
          <div className="flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-50 flex items-center justify-center">
                <Shield size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: '#E30613' }} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">Data Privacy Policy</h3>
            </div>
            <div className="space-y-2.5">
              {COMPLIANCE_CHECKS.map((c, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2 min-w-0">
                    {c.status === 'pass' ? <CheckCircle size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0" style={{ color: '#16A34A' }} /> :
                      c.status === 'warning' ? <AlertCircle size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0" style={{ color: '#F59E0B' }} /> :
                        <AlertCircle size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0" style={{ color: '#E30613' }} />}
                    <span className="text-[11px] sm:text-xs text-slate-600 break-words">{c.label}</span>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Election Law */}
          <div className="flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileText size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: '#1D4ED8' }} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">St. Kitts and Nevis Election Law</h3>
            </div>
            <div className="space-y-2.5">
              {ELECTION_LAW_CHECKS.map((c, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-start gap-2 min-w-0">
                    {c.status === 'pass' ? <CheckCircle size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }} /> :
                      <AlertCircle size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />}
                    <span className="text-[11px] sm:text-xs text-slate-600 break-words">{c.label}</span>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#E30613', border: 'none', cursor: 'pointer' }}>
              Generate Compliance Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}