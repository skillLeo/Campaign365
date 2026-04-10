'use client';
import { useState } from 'react';
import { Shield, Download, CheckCircle2, AlertTriangle, Clock, FileText, Upload, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const PRIMARY = '#E30613';

const REQUIREMENTS = [
  { id: 1, name: 'Financial Disclosure Statement', due: '2025-12-01', status: 'complete', jurisdiction: 'St. Kitts Electoral Commission', notes: 'All donations over $1,000 reported' },
  { id: 2, name: 'Voter Data Privacy Compliance', due: '2025-11-30', status: 'complete', jurisdiction: 'Data Protection Act 2018', notes: 'Privacy notices published, opt-outs processed' },
  { id: 3, name: 'Campaign Spending Report', due: '2025-12-15', status: 'pending', jurisdiction: 'St. Kitts Electoral Commission', notes: 'Pending final tallies' },
  { id: 4, name: 'Foreign Donation Declaration', due: '2025-12-01', status: 'complete', jurisdiction: 'Electoral Act §42', notes: 'No foreign donations received' },
  { id: 5, name: 'Election Day Activity Report', due: '2025-11-21', status: 'pending', jurisdiction: 'St. Kitts Electoral Commission', notes: 'Awaiting outdoor agent final reports' },
  { id: 6, name: 'SMS Marketing Opt-In Records', due: '2025-12-31', status: 'complete', jurisdiction: 'Telecommunications Act', notes: '12,840 opt-ins on file' },
];

const AUDIT_TRAIL = [
  { date: '2025-11-14', action: 'Voter data exported', user: 'General Secretary', detail: '14,872 records · encrypted ZIP', risk: 'low' },
  { date: '2025-11-14', action: 'Bulk SMS sent', user: 'Campaign Manager', detail: '9,200 recipients · GOTV message', risk: 'low' },
  { date: '2025-11-10', action: 'Donor list accessed', user: 'Data Manager', detail: '890 records viewed', risk: 'medium' },
  { date: '2025-10-28', action: 'Voter import', user: 'Data Manager', detail: '2,400 records imported from CSV', risk: 'low' },
  { date: '2025-10-15', action: 'Campaign report generated', user: 'General Secretary', detail: 'Q3 financial disclosure', risk: 'low' },
];

const REPORTS = [
  { name: 'Financial Disclosure — Q3 2025', generated: '2025-10-15', status: 'submitted', size: '2.4 MB' },
  { name: 'Voter Data Audit Report', generated: '2025-11-01', status: 'generated', size: '1.1 MB' },
  { name: 'Campaign Activity Summary', generated: '2025-11-10', status: 'draft', size: '3.8 MB' },
];

export default function ComplianceReportPage() {
  const [tab, setTab] = useState<'checklist' | 'audit' | 'reports'>('checklist');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const complete = REQUIREMENTS.filter(r => r.status === 'complete').length;
  const score = Math.round((complete / REQUIREMENTS.length) * 100);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
    setTimeout(() => setGenerated(false), 4000);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>Compliance Reports</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Reports › Compliance</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all whitespace-nowrap">
            <Download size={13} className="sm:w-[14px] sm:h-[14px]" /> Export All
          </button>
          <button onClick={handleGenerate}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: generated ? '#16A34A' : PRIMARY }}>
            {generating ? <><Clock size={13} className="animate-spin" /> Generating...</> : generated ? <><CheckCircle2 size={13} /> Report Ready</> : <><FileText size={13} /> Generate Full Report</>}
          </button>
        </div>
      </div>

      {/* Score card - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <svg viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="40" cy="40" r="32" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke={score >= 80 ? '#16A34A' : score >= 60 ? '#F59E0B' : PRIMARY} strokeWidth="8"
                strokeDasharray={`${(score / 100) * 201} 201`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base sm:text-lg font-bold text-slate-800">{score}%</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800 mt-2">Compliance Score</p>
          <p className="text-[10px] sm:text-xs text-slate-400">{complete} of {REQUIREMENTS.length} complete</p>
        </div>
        {[
          { label: 'Completed', value: complete, color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Pending', value: REQUIREMENTS.filter(r => r.status === 'pending').length, color: '#F59E0B', bg: '#FFFBEB' },
          { label: 'Overdue', value: 0, color: '#94A3B8', bg: '#F8FAFC' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit max-w-full">
        {[['checklist', 'Requirements Checklist'], ['audit', 'Audit Trail'], ['reports', 'Filed Reports']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold transition-all whitespace-nowrap"
            style={{ backgroundColor: tab === key ? PRIMARY : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'checklist' && (
        <div className="space-y-3">
          {REQUIREMENTS.map(req => (
            <div key={req.id} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <button onClick={() => setExpanded(expanded === req.id ? null : req.id)}
                className="w-full flex flex-col sm:flex-row sm:items-center gap-3 p-4 sm:p-5" style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: req.status === 'complete' ? '#F0FDF4' : '#FFFBEB' }}>
                    {req.status === 'complete'
                      ? <CheckCircle2 size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: '#16A34A' }} />
                      : <Clock size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: '#D97706' }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{req.name}</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">{req.jurisdiction} · Due: {req.due}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="text-[10px] sm:text-xs font-semibold px-2 py-1 rounded whitespace-nowrap" style={{ color: req.status === 'complete' ? '#16A34A' : '#D97706', backgroundColor: req.status === 'complete' ? '#F0FDF4' : '#FFFBEB' }}>
                    {req.status === 'complete' ? 'Complete' : 'Pending'}
                  </span>
                  {expanded === req.id ? <ChevronUp size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: '#94A3B8' }} /> : <ChevronDown size={14} className="sm:w-[16px] sm:h-[16px]" style={{ color: '#94A3B8' }} />}
                </div>
              </button>
              {expanded === req.id && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t border-slate-100">
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-3 leading-relaxed">{req.notes}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                      <Eye size={11} className="sm:w-[12px] sm:h-[12px]" /> View Documents
                    </button>
                    <button className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                      <Upload size={11} className="sm:w-[12px] sm:h-[12px]" /> Upload Evidence
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'audit' && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '800px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Date', 'Action', 'User', 'Details', 'Risk Level'].map(h => (
                    <th key={h} className="py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-slate-400 text-left uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AUDIT_TRAIL.map((row, i) => (
                  <tr key={i} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-400 whitespace-nowrap">{row.date}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold text-slate-800 whitespace-nowrap">{row.action}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-500 whitespace-nowrap">{row.user}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs text-slate-500 max-w-[200px] truncate">{row.detail}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span className={`text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded ${
                        row.risk === 'low' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {row.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'reports' && (
        <div className="space-y-3">
          {REPORTS.map(r => (
            <div key={r.name} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F1F5F9' }}>
                <FileText size={18} className="sm:w-[20px] sm:h-[20px]" style={{ color: '#64748B' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{r.name}</p>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Generated: {r.generated} · {r.size}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2">
                <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${
                  r.status === 'submitted' ? 'bg-green-50 text-green-700' :
                  r.status === 'generated' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {r.status}
                </span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                    <Eye size={11} className="sm:w-[12px] sm:h-[12px]" /> View
                  </button>
                  <button className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                    <Download size={11} className="sm:w-[12px] sm:h-[12px]" /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}