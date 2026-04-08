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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Compliance Reports</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Reports › Compliance</p>
        </div>
        <div className="flex gap-2">
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F1F5F9', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
            <Download size={14} /> Export All
          </button>
          <button onClick={handleGenerate}
            style={{ display: 'flex', alignItems: 'center', gap: 7, backgroundColor: generated ? '#16A34A' : PRIMARY, color: 'white', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            {generating ? <><Clock size={14} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : generated ? <><CheckCircle2 size={14} /> Report Ready</> : <><FileText size={14} /> Generate Full Report</>}
          </button>
        </div>
      </div>

      {/* Score card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="col-span-1 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col items-center justify-center">
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            <svg viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="40" cy="40" r="32" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke={score >= 80 ? '#16A34A' : score >= 60 ? '#F59E0B' : PRIMARY} strokeWidth="8"
                strokeDasharray={`${(score / 100) * 201} 201`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{score}%</span>
            </div>
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginTop: 10 }}>Compliance Score</p>
          <p style={{ fontSize: 11, color: '#94A3B8' }}>{complete} of {REQUIREMENTS.length} complete</p>
        </div>
        {[
          { label: 'Completed', value: complete, color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Pending', value: REQUIREMENTS.filter(r => r.status === 'pending').length, color: '#F59E0B', bg: '#FFFBEB' },
          { label: 'Overdue', value: 0, color: '#94A3B8', bg: '#F8FAFC' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col items-center justify-center">
            <p style={{ fontSize: 36, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {[['checklist', 'Requirements Checklist'], ['audit', 'Audit Trail'], ['reports', 'Filed Reports']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            style={{ padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', backgroundColor: tab === key ? PRIMARY : 'transparent', color: tab === key ? 'white' : '#64748B' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'checklist' && (
        <div className="space-y-3">
          {REQUIREMENTS.map(req => (
            <div key={req.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <button onClick={() => setExpanded(expanded === req.id ? null : req.id)}
                className="w-full flex items-center gap-4 p-5" style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: req.status === 'complete' ? '#F0FDF4' : '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {req.status === 'complete'
                    ? <CheckCircle2 size={18} style={{ color: '#16A34A' }} />
                    : <Clock size={18} style={{ color: '#D97706' }} />}
                </div>
                <div className="flex-1 text-left">
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{req.name}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>{req.jurisdiction} · Due: {req.due}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: req.status === 'complete' ? '#16A34A' : '#D97706', backgroundColor: req.status === 'complete' ? '#F0FDF4' : '#FFFBEB', padding: '4px 10px', borderRadius: 6, marginRight: 8 }}>
                  {req.status === 'complete' ? 'Complete' : 'Pending'}
                </span>
                {expanded === req.id ? <ChevronUp size={16} style={{ color: '#94A3B8' }} /> : <ChevronDown size={16} style={{ color: '#94A3B8' }} />}
              </button>
              {expanded === req.id && (
                <div style={{ padding: '0 20px 16px 20px', paddingLeft: 73, borderTop: '1px solid #F8FAFC' }}>
                  <p style={{ fontSize: 13, color: '#475569', marginTop: 12, lineHeight: 1.6 }}>{req.notes}</p>
                  <div className="flex gap-3 mt-3">
                    <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                      <Eye size={12} /> View Documents
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                      <Upload size={12} /> Upload Evidence
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Date', 'Action', 'User', 'Details', 'Risk Level'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#94A3B8', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AUDIT_TRAIL.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid #F8FAFC' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#94A3B8' }}>{row.date}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{row.action}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#475569' }}>{row.user}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748B' }}>{row.detail}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: row.risk === 'low' ? '#16A34A' : '#D97706', backgroundColor: row.risk === 'low' ? '#F0FDF4' : '#FFFBEB', padding: '3px 9px', borderRadius: 6, textTransform: 'capitalize' }}>
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'reports' && (
        <div className="space-y-3">
          {REPORTS.map(r => (
            <div key={r.name} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-5">
              <div style={{ width: 44, height: 44, backgroundColor: '#F1F5F9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={20} style={{ color: '#64748B' }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{r.name}</p>
                <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Generated: {r.generated} · {r.size}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: r.status === 'submitted' ? '#16A34A' : r.status === 'generated' ? '#2563EB' : '#94A3B8', backgroundColor: r.status === 'submitted' ? '#F0FDF4' : r.status === 'generated' ? '#EFF6FF' : '#F8FAFC', padding: '4px 10px', borderRadius: 6, textTransform: 'capitalize' }}>
                {r.status}
              </span>
              <div className="flex gap-2">
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  <Eye size={12} /> View
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 8, border: '1px solid #E2E8F0', background: 'white', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  <Download size={12} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
