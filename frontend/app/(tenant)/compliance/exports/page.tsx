'use client';
import { useState } from 'react';

const EXPORT_REQUESTS = [
  { id: 'REQ-2026-041', requestedBy: 'Marcus Liburd',    dataType: 'Voter Contact Data',  status: 'Approved', date: 'Apr 22, 2026', approvedBy: 'HQ Admin', approveColor: '#22C55E' },
  { id: 'REQ-2026-040', requestedBy: 'Sarah Williams',   dataType: 'Finance Records',      status: 'Approved', date: 'Apr 19, 2026', approvedBy: 'HQ Admin', approveColor: '#22C55E' },
  { id: 'REQ-2026-039', requestedBy: 'James Clarke',     dataType: 'Donor List',           status: 'Pending',  date: 'Apr 18, 2026', approvedBy: '—',       approveColor: '#F59E0B' },
  { id: 'REQ-2026-038', requestedBy: 'SKNLP HQ Admin',   dataType: 'Electoral Roll Data',  status: 'Approved', date: 'Apr 15, 2026', approvedBy: 'Compliance', approveColor: '#22C55E' },
  { id: 'REQ-2026-037', requestedBy: 'Data Officer',     dataType: 'Canvassing Reports',   status: 'Declined', date: 'Apr 12, 2026', approvedBy: 'HQ Admin', approveColor: '#DC143C' },
];

const AUDIT_LOG = [
  { action: 'Export Approved: Voter Data', party: 'St. Kitts Nevis Labour Party', time: '2h ago' },
  { action: 'Export Completed: Finance Records', party: 'Export Keeper Path', time: '5h ago' },
  { action: 'Export Requested: Donor List', party: 'Export Keeper Path', time: '8h ago' },
  { action: 'Export Archived: Campaign Data', party: 'Export Keeper Path', time: '1d ago' },
];

const EXPORT_HISTORY_CARDS = [
  { label: 'Compliance Export History', size: '25 MB', date: 'Apr 22' },
  { label: 'Compliance Export History', size: '45 MB', date: 'Apr 15' },
];

const PENDING_APPROVALS = [
  { label: 'Donor List Export', flag: '🇰🇳' },
  { label: 'Canvassing Export History', flag: '🇰🇳' },
  { label: 'Voter Data Export Request', flag: '🇰🇳' },
];

export default function ExportRequestsPage() {
  const [filterType, setFilterType] = useState('All Requests');
  const [filterStatus, setFilterStatus] = useState('Status');

  const statusColor = (s: string) => {
    if (s === 'Approved') return { bg: 'rgba(34,197,94,0.15)', color: '#22C55E' };
    if (s === 'Pending')  return { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' };
    return                       { bg: 'rgba(220,20,60,0.15)',  color: '#DC143C' };
  };

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Red heading banner */}
      <div style={{
        background: 'linear-gradient(90deg, #DC143C 0%, #8B000A 100%)',
        padding: '22px 28px',
        marginBottom: 24,
      }}>
        <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: '0 0 4px' }}>Export Requests &amp; Audit Trail</h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: 0 }}>
          Manage data export approvals and review the full audit history.
        </p>
      </div>

      <div style={{ padding: '0 24px 28px' }}>

        {/* Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {/* Dropdowns */}
          {[
            { label: filterType, options: ['All Requests', 'Voter Data', 'Finance Records', 'Donor List'] },
            { label: filterStatus, options: ['Status', 'Approved', 'Pending', 'Declined'] },
            { label: 'Date Range', options: ['Date Range', 'Last 7 Days', 'Last 30 Days', 'All Time'] },
          ].map((dd, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <select
                value={dd.label}
                onChange={() => {}}
                style={{
                  background: '#1E293B', border: '1px solid rgba(255,255,255,0.12)',
                  color: '#CBD5E1', borderRadius: 8, padding: '9px 32px 9px 14px',
                  fontSize: 13, cursor: 'pointer', appearance: 'none', outline: 'none',
                  fontFamily: 'inherit',
                }}
              >
                {dd.options.map(o => <option key={o}>{o}</option>)}
              </select>
              <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontSize: 11, pointerEvents: 'none' }}>▼</span>
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <button style={{
            background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
            padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(220,20,60,0.35)',
          }}>New Export Request</button>
        </div>

        {/* Requests table */}
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '150px 1fr 1fr 100px 130px 120px',
            padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            color: '#475569', fontSize: 12, fontWeight: 700, gap: 12,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Request ID <span style={{ fontSize: 10 }}>↑</span></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Requested By <span style={{ fontSize: 10 }}>↑</span></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Data Type <span style={{ fontSize: 10 }}>↑</span></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Status <span style={{ fontSize: 10 }}>↑</span></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Date <span style={{ fontSize: 10 }}>↑</span></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Approved By <span style={{ fontSize: 10 }}>↑</span></span>
          </div>
          {/* Rows */}
          {EXPORT_REQUESTS.map((r, i) => {
            const sc = statusColor(r.status);
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '150px 1fr 1fr 100px 130px 120px',
                padding: '13px 20px', alignItems: 'center', gap: 12,
                borderBottom: i < EXPORT_REQUESTS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
              >
                <span style={{ color: '#DC143C', fontSize: 12, fontWeight: 600 }}>{r.id}</span>
                <span style={{ color: '#CBD5E1', fontSize: 13 }}>{r.requestedBy}</span>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>{r.dataType}</span>
                <span>
                  <span style={{
                    background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 700,
                    borderRadius: 6, padding: '4px 10px',
                  }}>{r.status}</span>
                </span>
                <span style={{ color: '#64748B', fontSize: 12 }}>{r.date}</span>
                <span>
                  {r.approvedBy === '—' ? (
                    <span style={{ color: '#475569', fontSize: 12 }}>—</span>
                  ) : (
                    <span style={{
                      background: `${r.approveColor}22`, color: r.approveColor,
                      fontSize: 11, fontWeight: 700, borderRadius: 6, padding: '3px 10px',
                    }}>{r.approvedBy}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom 2-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

          {/* Audit Log */}
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <p style={{ color: '#E2E8F0', fontSize: 15, fontWeight: 700, margin: 0 }}>Audit Log</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {['👤', '🏠'].map((icon, i) => (
                  <button key={i} style={{
                    width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)', fontSize: 14, cursor: 'pointer',
                  }}>{icon}</button>
                ))}
              </div>
            </div>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {['Filtus', 'Export History'].map((t, i) => (
                <button key={i} style={{
                  padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  background: i === 0 ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)', color: i === 0 ? '#E2E8F0' : '#64748B',
                }}>{t}</button>
              ))}
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: 20 }}>
              <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: 'rgba(212,160,23,0.3)' }} />
              {AUDIT_LOG.map((entry, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 14 }}>
                  <div style={{
                    position: 'absolute', left: -20, top: 4,
                    width: 16, height: 16, borderRadius: 3,
                    background: '#1E293B', border: '1px solid rgba(212,160,23,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
                  }}>📄</div>
                  <p style={{ color: '#CBD5E1', fontSize: 12, fontWeight: 600, margin: '0 0 2px' }}>{entry.action}</p>
                  <p style={{ color: '#475569', fontSize: 11, margin: 0 }}>{entry.party}</p>
                </div>
              ))}
            </div>

            {/* Export cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
              {EXPORT_HISTORY_CARDS.map((card, i) => (
                <div key={i} style={{
                  background: '#1E293B', borderRadius: 10, padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'linear-gradient(135deg, #E8C84A, #C9A227)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontWeight: 900, fontSize: 11, color: '#5A3200',
                  }}>SKNLP</div>
                  <div>
                    <p style={{ color: '#CBD5E1', fontSize: 12, fontWeight: 600, margin: '0 0 2px' }}>{card.label}</p>
                    <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>{card.size} · {card.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Approval Workflow */}
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px' }}>
            <p style={{ color: '#E2E8F0', fontSize: 15, fontWeight: 700, margin: '0 0 6px' }}>Export Approval Workflow</p>
            <p style={{ color: '#64748B', fontSize: 12, margin: '0 0 16px' }}>Pending Export Requests</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {PENDING_APPROVALS.map((a, i) => (
                <div key={i} style={{
                  background: '#1E293B', borderRadius: 10, padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{a.flag}</span>
                  <span style={{ color: '#CBD5E1', fontSize: 12, fontWeight: 500, flex: 1 }}>{a.label}</span>
                  <button style={{
                    background: 'rgba(34,197,94,0.15)', color: '#22C55E',
                    border: '1px solid rgba(34,197,94,0.3)', borderRadius: 6,
                    padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  }}>Approve</button>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { label: 'Approved', value: '38', color: '#22C55E' },
                { label: 'Pending',  value: '3',  color: '#F59E0B' },
                { label: 'Declined', value: '2',  color: '#DC143C' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#1E293B', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                  <p style={{ color: s.color, fontSize: 22, fontWeight: 900, margin: '0 0 3px', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: '#64748B', fontSize: 10, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <button style={{
                width: '100%', background: '#DC143C', color: 'white', border: 'none',
                borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220,20,60,0.35)',
              }}>Export Full Audit Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
