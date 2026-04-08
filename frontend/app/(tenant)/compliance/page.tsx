'use client';
import { useState } from 'react';
import { Shield, Download, AlertCircle, CheckCircle, Clock, FileText, Plus, Search, ChevronDown } from 'lucide-react';

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
    <span style={{ background: c.bg, color: c.color, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#0F172A', letterSpacing: '-0.02em' }}>Compliance &amp; Data Management</h1>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>Dashboard › Compliance</p>
        </div>
        <div className="flex items-center gap-3">
          <button style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={14} /> Generate Compliance Report
          </button>
          <button style={{ backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={14} /> Export All Data
          </button>
        </div>
      </div>

      {/* Compliance Score */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 col-span-1 flex flex-col items-center justify-center">
          <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 10 }}>
            <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E30613" strokeWidth="3.5"
                strokeDasharray={`${score} ${100 - score}`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{score}%</span>
            </div>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', textAlign: 'center' }}>Compliance Score</p>
          <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 2 }}>SK&N Election Law</p>
        </div>
        {[
          { label: 'Compliant Checks', value: passCount, color: '#15803D', bg: '#F0FDF4', icon: CheckCircle },
          { label: 'Needs Review', value: warnCount, color: '#B45309', bg: '#FFFBEB', icon: AlertCircle },
          { label: 'Non-Compliant', value: failCount, color: '#B91C1C', bg: '#FEF2F2', icon: Shield },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 2 }}>{s.label}</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#0F172A' }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {([
          { id: 'history', label: 'Data History' },
          { id: 'election', label: 'Election Compliance' },
          { id: 'exports', label: 'Export Requests' },
        ] as { id: Tab; label: string }[]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '7px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              backgroundColor: tab === t.id ? '#E30613' : 'transparent',
              color: tab === t.id ? 'white' : '#64748B',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {(tab === 'history' || tab === 'exports') && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-sm text-slate-700 focus:outline-none"
                  placeholder="Search requests..."
                  style={{ width: 200 }}
                />
              </div>
            </div>
            <button style={{ backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Plus size={12} /> New Request
            </button>
          </div>
          <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['ID', 'Request', 'Status', 'Date', 'Assigned To', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#475569' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td style={{ padding: '12px 20px', fontSize: 12, fontFamily: 'monospace', color: '#2563EB', fontWeight: 600 }}>{r.id}</td>
                  <td style={{ padding: '12px 20px', fontSize: 13, color: '#0F172A' }}>{r.request}</td>
                  <td style={{ padding: '12px 20px' }}><StatusBadge status={r.status} /></td>
                  <td style={{ padding: '12px 20px', fontSize: 12, color: '#64748B' }}>{r.date}</td>
                  <td style={{ padding: '12px 20px', fontSize: 12, color: '#64748B' }}>{r.assignedTo}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <div className="flex items-center gap-2">
                      <button style={{ background: '#EFF6FF', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: '#2563EB', fontSize: 11, fontWeight: 600 }}>View</button>
                      <button style={{ background: '#F1F5F9', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: '#475569', fontSize: 11, fontWeight: 600 }}>
                        <Download size={11} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Data Policy */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                <Shield size={16} style={{ color: '#E30613' }} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Data Privacy Policy</h3>
            </div>
            <div className="space-y-3">
              {COMPLIANCE_CHECKS.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-3">
                    {c.status === 'pass' ? <CheckCircle size={14} style={{ color: '#16A34A', flexShrink: 0 }} /> :
                      c.status === 'warning' ? <AlertCircle size={14} style={{ color: '#F59E0B', flexShrink: 0 }} /> :
                        <AlertCircle size={14} style={{ color: '#E30613', flexShrink: 0 }} />}
                    <span style={{ fontSize: 12, color: '#475569' }}>{c.label}</span>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Election Law */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileText size={16} style={{ color: '#1D4ED8' }} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>St. Kitts and Nevis Election Law</h3>
            </div>
            <div className="space-y-3">
              {ELECTION_LAW_CHECKS.map((c, i) => (
                <div key={i} className="flex items-start justify-between py-2 border-b border-slate-50 last:border-0 gap-4">
                  <div className="flex items-start gap-3">
                    {c.status === 'pass' ? <CheckCircle size={14} style={{ color: '#16A34A', flexShrink: 0, marginTop: 1 }} /> :
                      <AlertCircle size={14} style={{ color: '#F59E0B', flexShrink: 0, marginTop: 1 }} />}
                    <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{c.label}</span>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
            <button style={{ marginTop: 16, width: '100%', backgroundColor: '#E30613', color: 'white', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Generate Compliance Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
