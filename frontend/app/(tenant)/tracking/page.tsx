'use client';
import { useState } from 'react';
import { MapPin, Radio, Users, Activity, Clock, Navigation } from 'lucide-react';

const AGENTS = [
  { id: 1, name: 'Marcus Brown',  role: 'Canvasser',    constituency: 'Kingston Central',   status: 'Active',   lastSeen: '2 min ago',  color: '#4ADE80' },
  { id: 2, name: 'Sarah James',   role: 'Runner',       constituency: 'Basseterre Central', status: 'Active',   lastSeen: '5 min ago',  color: '#4ADE80' },
  { id: 3, name: 'Devon Clarke',  role: 'Outdoor Agent',constituency: 'Nevis',              status: 'En Route', lastSeen: '9 min ago',  color: '#60A5FA' },
  { id: 4, name: 'Trevor Hall',   role: 'Canvasser',    constituency: 'St. Christopher N',  status: 'Active',   lastSeen: '12 min ago', color: '#4ADE80' },
  { id: 5, name: 'Patricia W.',   role: 'Runner',       constituency: 'Portland East',      status: 'Offline',  lastSeen: '1 hr ago',   color: '#94A3B8' },
];

const LIVE_STATS = [
  { label: 'Active Agents', value: '18', color: '#4ADE80', icon: Users },
  { label: 'Constituencies', value: '8', color: '#60A5FA', icon: MapPin },
  { label: 'GPS Active',     value: '15', color: 'var(--tenant-primary)', icon: Radio },
  { label: 'Last Update',    value: '30s', color: '#F59E0B', icon: Clock },
];

export default function TrackingPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: 'var(--tenant-sidebar)' }}>

      {/* ── Header ── */}
      <div style={{ padding: '22px 24px 18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4ADE80', boxShadow: '0 0 0 3px rgba(74,222,128,0.3)', animation: 'trackpulse 2s infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4ADE80' }}>Live Tracking</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,30px)', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
            Field Agent Tracker
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: '5px 0 0' }}>Real-time GPS monitoring for all field teams</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '9px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Radio size={13} /> Full Screen Map
          </button>
        </div>
      </div>

      {/* ── Live stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, padding: '0 24px 18px' }}>
        {LIVE_STATS.map(({ label, value, color, icon: Icon }) => (
          <div key={label} style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#fff', margin: 0, lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', margin: '3px 0 0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Map + agent list ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.8fr) minmax(260px,1fr)', gap: 14, padding: '0 24px 24px' }}>

        {/* Map */}
        <div style={{ borderRadius: 18, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', height: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative' }}>
          <MapPin size={42} style={{ color: 'rgba(255,255,255,0.12)' }} />
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, margin: 0, fontWeight: 600 }}>Live GPS Map</p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, margin: 0 }}>Configure NEXT_PUBLIC_MAPBOX_TOKEN</p>

          {/* Agent pins */}
          {[
            { top: '25%', left: '30%', color: '#4ADE80' },
            { top: '45%', left: '55%', color: '#4ADE80' },
            { top: '35%', left: '68%', color: '#60A5FA' },
            { top: '62%', left: '42%', color: '#4ADE80' },
            { top: '55%', left: '22%', color: '#94A3B8' },
          ].map((pin, i) => (
            <div key={i} onClick={() => setSelected(i + 1)}
              style={{ position: 'absolute', top: pin.top, left: pin.left, width: 18, height: 18, borderRadius: '50%', backgroundColor: pin.color, boxShadow: `0 0 0 5px ${pin.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform .15s', transform: selected === i + 1 ? 'scale(1.3)' : 'scale(1)' }}>
              <Navigation size={9} style={{ color: '#fff' }} />
            </div>
          ))}
        </div>

        {/* Agent list */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 18, border: '1px solid rgba(255,255,255,0.09)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Field Agents</p>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {AGENTS.map((a, i) => (
              <div key={a.id}
                onClick={() => setSelected(a.id)}
                style={{ padding: '12px 18px', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'background-color .15s', backgroundColor: selected === a.id ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12, color: '#000' }}>
                  {a.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.role} · {a.constituency}</p>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: a.color }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: a.color }}>{a.status}</span>
                  </div>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', margin: '2px 0 0', whiteSpace: 'nowrap' }}>{a.lastSeen}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trackpulse { 0%,100%{box-shadow:0 0 0 3px rgba(74,222,128,0.3)} 50%{box-shadow:0 0 0 8px rgba(74,222,128,0.1)} }
        @media(max-width:768px){
          div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}
          div[style*="minmax(0,1.8fr)"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}
