'use client';
import { useState } from 'react';

const CANVASSERS = [
  { name: 'Anila Ruri',      statusLabel: 'Assigned Turf',           detail: '036:19', tag: 'live',    skin: '#7B4F2E' },
  { name: 'Aimbhan',         statusLabel: 'Voters Contacted Today',   detail: '034:77', tag: 'live',    skin: '#5C3317' },
  { name: 'Canred Nere',     statusLabel: 'Voters Contacted Today',   detail: '024:17', tag: 'offline', skin: '#4A2C17' },
  { name: 'Vreh',            statusLabel: 'Assigned Turf',           detail: '039:79', tag: 'live',    skin: '#8B5E3C' },
  { name: 'Raovadbes',       statusLabel: 'Voters Contacted',        detail: '223:79', tag: 'speech',  skin: '#6B4226' },
  { name: 'AKNLP',           statusLabel: 'Assigned Turf',           detail: '036:17', tag: 'offline', skin: '#5C4033' },
  { name: 'Boouna Ben',      statusLabel: 'Voters Contacted Today',   detail: '038:19', tag: 'live',    skin: '#3D2B1F' },
  { name: 'Pisk',            statusLabel: 'Offline Sync',            detail: '034:19', tag: 'live',    skin: '#7C5234' },
  { name: 'Locr',            statusLabel: 'Offline Sync',            detail: '034:19', tag: 'live',    skin: '#6D4C41' },
  { name: 'AKNLP #2',       statusLabel: 'Offline Sync',            detail: '024:19', tag: 'speech',  skin: '#4E342E' },
  { name: 'Dooure Shord',    statusLabel: 'Assigned Turf',           detail: '024:17', tag: 'live',    skin: '#9A7050' },
  { name: 'SKNLP Agent',     statusLabel: 'Offline Sync',            detail: '039:19', tag: 'live',    skin: '#5C3317' },
  { name: 'Cyclet Cut',      statusLabel: 'Assigned Turf',           detail: '034:12', tag: 'speech',  skin: '#7B4F2E' },
  { name: 'SKNLP Beta',      statusLabel: 'Assigned Turf',           detail: '023:19', tag: 'speech',  skin: '#4A2C17' },
  { name: 'Jutv Men',        statusLabel: 'Assigned Today',          detail: '034:17', tag: 'speech',  skin: '#8B5E3C' },
];

function TagBadge({ tag }: { tag: string }) {
  const color = tag === 'live' ? '#22C55E' : '#DC143C';
  const label = tag === 'live' ? 'Live GPS Location' : tag === 'offline' ? 'Offline Sync' : 'Speech-to-Text';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ color, fontSize: 10, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function AvatarCircle({ name, skin }: { name: string; skin: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: `radial-gradient(circle at 40% 35%, ${skin}dd, ${skin}66)`,
      border: '2px solid rgba(255,255,255,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.95)', fontSize: 14, fontWeight: 800, flexShrink: 0,
    }}>{initials}</div>
  );
}

function MiniMapCard() {
  const pins = [
    { x: 48, y: 42 }, { x: 62, y: 55 }, { x: 74, y: 38 }, { x: 55, y: 68 },
    { x: 82, y: 58 }, { x: 40, y: 62 }, { x: 68, y: 44 }, { x: 78, y: 72 },
  ];
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12,
      overflow: 'hidden', position: 'relative', minHeight: 130,
    }}>
      {/* Label top-left */}
      <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 2, display: 'flex', gap: 6 }}>
        <span style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 4, fontSize: 10, padding: '2px 7px', fontWeight: 600, color: '#334155', border: '1px solid #e2e8f0' }}>Assigned Turf</span>
        <span style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 4, fontSize: 10, padding: '2px 7px', fontWeight: 600, color: '#334155', border: '1px solid #e2e8f0' }}>Turf</span>
      </div>
      {/* Map background */}
      <svg width="100%" height="130" viewBox="0 0 140 130" style={{ display: 'block' }}>
        {/* Light map grid */}
        {[20,40,60,80,100,120].map(x => <line key={`v${x}`} x1={x} y1={0} x2={x} y2={130} stroke="#e5e7eb" strokeWidth={0.5} />)}
        {[20,40,60,80,100,120].map(y => <line key={`h${y}`} x1={0} y1={y} x2={140} y2={y} stroke="#e5e7eb" strokeWidth={0.5} />)}
        {/* Roads */}
        <path d="M10,65 Q50,60 90,68 Q120,74 135,70" stroke="#cbd5e1" strokeWidth="2" fill="none" />
        <path d="M40,20 Q45,55 42,100" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
        <path d="M80,15 Q85,60 78,110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
        {/* Area blocks */}
        <rect x="25" y="30" width="30" height="18" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" />
        <rect x="60" y="45" width="25" height="16" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" />
        {/* Pins */}
        {pins.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={6} fill="#DC143C" opacity={0.9} />
            <circle cx={p.x} cy={p.y} r={3} fill="white" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function CanvasserCard({ c }: { c: typeof CANVASSERS[0] }) {
  return (
    <div style={{
      background: 'white', border: '1px solid #e2e8f0', borderRadius: 12,
      padding: '12px', position: 'relative', cursor: 'pointer',
      transition: 'box-shadow 0.15s',
    }}>
      {/* Drag handle */}
      <div style={{ position: 'absolute', top: 10, right: 10, color: '#94A3B8', fontSize: 11, lineHeight: 1.2, letterSpacing: '1px' }}>⋮⋮</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
        <AvatarCircle name={c.name} skin={c.skin} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ color: '#0F172A', fontSize: 13, fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 16 }}>{c.name}</p>
        </div>
      </div>
      <p style={{ color: '#475569', fontSize: 11, margin: '0 0 2px', fontWeight: 500 }}>{c.statusLabel}</p>
      <p style={{ color: '#0F172A', fontSize: 13, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>{c.detail}</p>
      <TagBadge tag={c.tag} />
    </div>
  );
}

export default function CanvassersPage() {
  const [filter, setFilter] = useState('All');

  // Insert the map at position 11 (row 3, col 2)
  const items: Array<{ type: 'card'; data: typeof CANVASSERS[0] } | { type: 'map' }> = [];
  CANVASSERS.forEach((c, i) => {
    if (i === 11) items.push({ type: 'map' });
    items.push({ type: 'card', data: c });
  });

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: "'Inter',sans-serif" }}>
      {/* Background overlay simulating rally backdrop */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `
          linear-gradient(135deg,
            rgba(15,23,42,0.92) 0%,
            rgba(140,0,15,0.75) 50%,
            rgba(15,23,42,0.88) 100%
          )
        `,
        pointerEvents: 'none',
      }} />
      {/* Decorative red light sweep */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '40%', zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(220,20,60,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '0 0 24px' }}>
        {/* Header row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 18, padding: '20px 24px 0',
        }}>
          <h1 style={{ color: 'white', fontSize: 30, fontWeight: 900, margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>Canvassers</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            {['All', 'Active', 'Offline'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? '#DC143C' : 'rgba(255,255,255,0.15)',
                border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.25)',
                color: 'white', borderRadius: 20, padding: '7px 18px',
                fontSize: 12, fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(8px)',
              }}>{f} Filter</button>
            ))}
            <button style={{
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
              color: 'white', borderRadius: 20, padding: '7px 14px',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>▾</button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 12, padding: '0 24px 16px' }}>
          {[
            { label: 'Total Canvassers', val: '15', color: '#DC143C' },
            { label: 'Active Now', val: '9', color: '#22C55E' },
            { label: 'Offline', val: '4', color: '#F59E0B' },
            { label: 'Speech-to-Text', val: '5', color: '#64748B' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 16px',
            }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: 18, fontWeight: 900, margin: 0 }}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Card grid */}
        <div style={{ padding: '0 24px' }}>
          <div className="rg-4" style={{ gap: 12 }}>
            {items.map((item, i) =>
              item.type === 'map'
                ? <MiniMapCard key={`map-${i}`} />
                : <CanvasserCard key={i} c={item.data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
