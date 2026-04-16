'use client';
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const RUNNERS = [
  { id: 1,  name: 'John Doe',      status: 'Active',    task: 'Door-to-Door',      eta: '10 min', initials: 'JD', color: '#DC143C' },
  { id: 2,  name: 'Sarah James',   status: 'Active',    task: 'Literature Drop',   eta: '15 min', initials: 'SJ', color: '#7C3AED' },
  { id: 3,  name: 'Trevor Hall',   status: 'En Route',  task: 'Voter Transport',   eta: '8 min',  initials: 'TH', color: '#1D4ED8' },
  { id: 4,  name: 'Kevin Peters',  status: 'Active',    task: 'Sign Placement',    eta: '22 min', initials: 'KP', color: '#DC143C' },
  { id: 5,  name: 'Diana Clarke',  status: 'Idle',      task: 'Awaiting Task',     eta: '—',      initials: 'DC', color: '#475569' },
  { id: 6,  name: 'Marcus Brown',  status: 'En Route',  task: 'Pamphlet Delivery', eta: '12 min', initials: 'MB', color: '#0891B2' },
  { id: 7,  name: 'Lisa Grant',    status: 'Active',    task: 'Door-to-Door',      eta: '5 min',  initials: 'LG', color: '#DC143C' },
  { id: 8,  name: 'Andre Smith',   status: 'Active',    task: 'Canvass Support',   eta: '18 min', initials: 'AS', color: '#1D4ED8' },
];

const STATUS: Record<string, { bg: string; dot: string; label: string }> = {
  'Active':   { bg: 'rgba(34,197,94,0.12)',  dot: '#22C55E', label: 'Active' },
  'En Route': { bg: 'rgba(59,130,246,0.12)', dot: '#3B82F6', label: 'En Route' },
  'Idle':     { bg: 'rgba(148,163,184,0.1)', dot: '#64748B', label: 'Idle' },
};

function FlagIcon({ w = 28, h = 19 }: { w?: number; h?: number }) {
  return (
    <svg viewBox="0 0 30 20" width={w} height={h} style={{ borderRadius: 2, flexShrink: 0, display: 'block' }}>
      <polygon points="0,0 30,20 0,20" fill="#009E60" />
      <polygon points="0,0 30,0 30,20" fill="#CE1126" />
      <polygon points="0,0 30,20 27,20 3,0" fill="#000000" />
      <polygon points="0,0 3,0 30,20 27,20" fill="#FCD116" />
      <polygon points="0,2 2,0 30,18 28,20 0,20 0,18" fill="#FCD116" />
    </svg>
  );
}

export default function RunnersPage() {
  const [assignModal, setAssignModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Runners');

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#0F172A', display: 'flex', flexDirection: 'column' }}>

      {/* ── Page header ── */}
      <div style={{ backgroundColor: '#0F172A', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px 14px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#64748B', margin: '0 0 4px', letterSpacing: '0.03em' }}>
          Dashboard &rsaquo; Runners
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(20px,4vw,28px)', color: '#F1F5F9', margin: 0, letterSpacing: '-0.02em' }}>
              Live Runners
            </h1>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, backgroundColor: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 20, padding: '3px 10px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 0 2px rgba(34,197,94,0.25)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#22C55E' }}>18 Online</span>
            </span>
          </div>
          <button
            onClick={() => setAssignModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 9, border: 'none', backgroundColor: '#DC143C', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <AlertCircle size={14} /> Assign Urgent Pickup
          </button>
        </div>
      </div>

      {/* ── Dark map ── */}
      <div style={{ backgroundColor: '#0A1628', position: 'relative', height: 300, flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Legend box */}
        <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.4)', margin: '0 0 7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Runner Legend</p>
          {[
            { color: '#DC143C', label: 'Voter Pickup Requests' },
            { color: '#F59E0B', label: 'Route Line' },
            { color: '#4ADE80', label: 'Runners Online' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* SVG map */}
        <svg viewBox="0 0 900 300" style={{ width: '100%', height: 300, display: 'block' }}>
          <defs>
            <radialGradient id="rnrOcean" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#1a3a5c"/>
              <stop offset="100%" stopColor="#060d1a"/>
            </radialGradient>
          </defs>
          <rect width="900" height="300" fill="url(#rnrOcean)" />
          {[0,1,2,3].map(i => (
            <line key={`h${i}`} x1="0" y1={i*75} x2="900" y2={i*75} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <line key={`v${i}`} x1={i*100} y1="0" x2={i*100} y2="300" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          {/* St Kitts island */}
          <path d="M160,70 C185,50 250,45 320,60 C390,75 430,100 450,135 C470,170 455,205 410,220 C365,235 300,228 255,200 C210,172 165,155 148,120 C132,90 135,90 160,70Z"
            fill="rgba(220,20,60,0.18)" stroke="rgba(220,20,60,0.4)" strokeWidth="1.5" />
          {/* Nevis */}
          <ellipse cx="530" cy="205" rx="52" ry="60" fill="rgba(220,20,60,0.12)" stroke="rgba(220,20,60,0.3)" strokeWidth="1.5" />
          {/* Yellow route line */}
          <polyline
            points="200,130 270,155 340,140 410,160 480,175 530,200"
            stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="6 4" fill="none" strokeLinecap="round" />
          {/* Red pins — voter pickups */}
          {[
            { cx: 210, cy: 100 }, { cx: 285, cy: 130 }, { cx: 355, cy: 110 },
            { cx: 390, cy: 155 }, { cx: 250, cy: 170 }, { cx: 320, cy: 190 },
            { cx: 430, cy: 140 }, { cx: 460, cy: 170 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.cx} cy={p.cy} r="11" fill="rgba(220,20,60,0.2)" />
              <circle cx={p.cx} cy={p.cy} r="5.5" fill="#DC143C" />
              <circle cx={p.cx} cy={p.cy} r="2.5" fill="#fff" />
            </g>
          ))}
          {/* Green runner pins */}
          {[
            { cx: 270, cy: 155 }, { cx: 340, cy: 140 },
            { cx: 480, cy: 175 }, { cx: 530, cy: 200 }, { cx: 510, cy: 220 },
          ].map((p, i) => (
            <g key={`g${i}`}>
              <circle cx={p.cx} cy={p.cy} r="9" fill="rgba(74,222,128,0.2)" />
              <circle cx={p.cx} cy={p.cy} r="5" fill="#4ADE80" />
              <circle cx={p.cx} cy={p.cy} r="2" fill="#fff" />
            </g>
          ))}
        </svg>
      </div>

      {/* ── Runners table section ── */}
      <div style={{ flex: 1, backgroundColor: '#0F172A' }}>
        {/* Tab nav */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 24px' }}>
          {['Runners', 'Assignments', 'History'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ padding: '13px 18px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, backgroundColor: 'transparent', color: activeTab === tab ? '#F1F5F9' : '#64748B', borderBottom: activeTab === tab ? '2.5px solid #DC143C' : '2.5px solid transparent', marginBottom: -1, whiteSpace: 'nowrap' }}
            >
              {tab}
              {tab === 'Runners' && (
                <span style={{ marginLeft: 6, padding: '1px 7px', borderRadius: 10, backgroundColor: activeTab === tab ? '#DC143C' : 'rgba(255,255,255,0.08)', color: activeTab === tab ? '#fff' : '#64748B', fontSize: 11, fontWeight: 700 }}>
                  {RUNNERS.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Quick stats row */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Active',   count: RUNNERS.filter(r => r.status === 'Active').length,   color: '#22C55E' },
            { label: 'En Route', count: RUNNERS.filter(r => r.status === 'En Route').length, color: '#3B82F6' },
            { label: 'Idle',     count: RUNNERS.filter(r => r.status === 'Idle').length,     color: '#64748B' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: s.color }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>{s.count} {s.label}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                {['Name', 'Status', 'Current Task', 'Actions', 'ETA'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748B', borderBottom: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RUNNERS.map((r, i) => {
                const s = STATUS[r.status] || STATUS.Idle;
                return (
                  <tr key={r.id} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none', backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'rgba(255,255,255,0.04)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.backgroundColor = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                  >
                    {/* Name */}
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: "'Barlow', sans-serif", flexShrink: 0 }}>
                          {r.initials}
                        </div>
                        <span style={{ fontWeight: 600, color: '#E2E8F0' }}>{r.name}</span>
                      </div>
                    </td>
                    {/* Status */}
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, backgroundColor: s.bg, fontSize: 11, fontWeight: 700, color: s.dot }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: s.dot }} />
                        {s.label}
                      </span>
                    </td>
                    {/* Task */}
                    <td style={{ padding: '12px 16px', color: '#94A3B8', whiteSpace: 'nowrap' }}>{r.task}</td>
                    {/* Action */}
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <button style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: '#94A3B8', lineHeight: 1 }}>
                        +
                      </button>
                    </td>
                    {/* ETA */}
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#F1F5F9', whiteSpace: 'nowrap' }}>{r.eta}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Assign urgent modal ── */}
      {assignModal && (
        <>
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 50 }} onClick={() => setAssignModal(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 51, width: 'min(440px,92vw)', backgroundColor: '#1E293B', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #DC143C 0%, #9B0D23 100%)' }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 20, color: '#fff', margin: 0 }}>Assign Urgent Pickup</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '4px 0 0' }}>Dispatch a runner immediately</p>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Pickup Location', 'Drop-off Location', 'Priority Notes'].map(label => (
                <div key={label}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                  <input type="text" placeholder={label}
                    style={{ width: '100%', boxSizing: 'border-box', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', fontSize: 14, color: '#F1F5F9', outline: 'none', fontFamily: 'inherit', backgroundColor: '#0F172A' }}
                    onFocus={e => (e.target.style.borderColor = '#DC143C')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Assign Runner</label>
                <select style={{ width: '100%', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', fontSize: 14, color: '#F1F5F9', outline: 'none', fontFamily: 'inherit', backgroundColor: '#0F172A' }}>
                  <option>Select runner...</option>
                  {RUNNERS.filter(r => r.status !== 'Idle').map(r => (
                    <option key={r.id}>{r.name} — {r.status}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => setAssignModal(false)}
                style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', backgroundColor: '#DC143C', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 4 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Dispatch Runner Now
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @media(max-width:640px){
          table th:nth-child(4), table td:nth-child(4){ display:none; }
        }
      `}</style>
    </div>
  );
}
