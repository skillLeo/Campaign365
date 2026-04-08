'use client';
import { useState } from 'react';
import { Wifi, WifiOff, Globe, RefreshCw, AlertTriangle, CheckCircle, Clock, Server, Bell, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

const REGIONS = [
  { id: 'na', name: 'North America', lat: 54, lng: -100, status: 'online', devices: 142, syncRate: 98.2 },
  { id: 'eu', name: 'Europe', lat: 54, lng: 15, status: 'online', devices: 89, syncRate: 99.1 },
  { id: 'carib', name: 'Caribbean', lat: 18, lng: -66, status: 'online', devices: 234, syncRate: 96.5 },
  { id: 'uk', name: 'United Kingdom', lat: 53, lng: -2, status: 'online', devices: 67, syncRate: 97.8 },
  { id: 'af', name: 'Africa', lat: 5, lng: 25, status: 'offline', devices: 3, syncRate: 0 },
  { id: 'asia', name: 'Asia Pacific', lat: 25, lng: 115, status: 'online', devices: 12, syncRate: 94.3 },
  { id: 'sa', name: 'South America', lat: -15, lng: -55, status: 'online', devices: 8, syncRate: 91.7 },
];

const CLIENTS_OFFLINE = [
  { name: 'SKNLP Mobile', region: 'Caribbean', devices: 4, lastSync: '2 min ago' },
  { name: 'JLP Runners App', region: 'Caribbean', devices: 5, lastSync: '8 min ago' },
  { name: 'BLP Field App', region: 'Caribbean', devices: 3, lastSync: '14 min ago' },
];

const SYNC_POLICIES = [
  { id: 'wifi_only', label: 'Sync on WiFi only', desc: 'Save mobile data for field workers' },
  { id: 'background', label: 'Background auto-sync', desc: 'Sync silently when connection restored' },
  { id: 'conflict_latest', label: 'Conflict resolution: Latest wins', desc: 'Newer timestamp overwrites older' },
  { id: 'queue_250', label: 'Offline queue max 250 records', desc: 'Alert user when queue is full' },
];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', backgroundColor: on ? '#2563EB' : '#CBD5E1', transition: 'background-color 0.2s', flexShrink: 0 }}
    >
      <span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s', display: 'block' }} />
    </button>
  );
}

// Simple SVG world map dots
const MAP_DOTS = [
  { x: 22, y: 30, region: 'na' },
  { x: 50, y: 22, region: 'eu' },
  { x: 33, y: 45, region: 'carib' },
  { x: 48, y: 20, region: 'uk' },
  { x: 55, y: 55, region: 'af' },
  { x: 78, y: 35, region: 'asia' },
  { x: 28, y: 60, region: 'sa' },
];

export default function OfflineControlsPage() {
  const { user } = useAuthStore();
  const [forceOffline, setForceOffline] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [dataResidency, setDataResidency] = useState(false);
  const [policies, setPolicies] = useState<Record<string, boolean>>({
    wifi_only: true, background: true, conflict_latest: true, queue_250: false,
  });
  const [saved, setSaved] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const totalOffline = 12;
  const syncSuccess = 96.5;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 bg-white border-b border-slate-100">
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Dashboard › Global Controls</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>Global Offline &amp; Multi-Region Controls</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            style={{ backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: 10, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            {saved ? '✓ Saved' : 'Apply Visitor Offline Policy'}
          </button>
          <Bell size={18} style={{ color: '#94A3B8', cursor: 'pointer' }} />
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#2563EB' }}>
            {user?.name?.charAt(0) || 'S'}
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Regions Online', value: `${REGIONS.filter(r => r.status === 'online').length}/${REGIONS.length}`, icon: Globe, color: '#2563EB', bg: '#EFF6FF' },
            { label: 'Devices Currently Offline', value: totalOffline, icon: WifiOff, color: '#DC2626', bg: '#FEF2F2' },
            { label: 'Sync Success Rate', value: `${syncSuccess}%`, icon: RefreshCw, color: '#16A34A', bg: '#F0FDF4' },
            { label: 'Auto-Sync Active', value: autoSync ? 'Enabled' : 'Disabled', icon: Wifi, color: autoSync ? '#16A34A' : '#94A3B8', bg: autoSync ? '#F0FDF4' : '#F8FAFC' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <div>
                <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* World Map */}
          <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Regional Status Map</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5"><div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16A34A' }} /><span style={{ fontSize: 12, color: '#64748B' }}>Online</span></div>
                <div className="flex items-center gap-1.5"><div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#DC2626' }} /><span style={{ fontSize: 12, color: '#64748B' }}>Offline</span></div>
              </div>
            </div>
            {/* SVG Map */}
            <div style={{ backgroundColor: '#1E293B', borderRadius: 12, padding: '20px 24px', position: 'relative', minHeight: 200 }}>
              <svg viewBox="0 0 100 70" style={{ width: '100%', height: 'auto' }}>
                {/* Simple continent outlines */}
                <path d="M5 20 Q15 15 25 18 Q28 22 26 30 Q20 35 15 32 Q8 28 5 20Z" fill="#334155" />
                <path d="M35 15 Q45 12 55 14 Q60 18 58 24 Q52 28 46 26 Q38 22 35 15Z" fill="#334155" />
                <path d="M28 38 Q38 36 42 42 Q40 52 35 56 Q28 58 24 52 Q22 44 28 38Z" fill="#334155" />
                <path d="M47 48 Q57 45 64 50 Q65 60 60 64 Q52 66 48 60 Q45 55 47 48Z" fill="#334155" />
                <path d="M68 20 Q80 16 88 20 Q92 28 86 35 Q78 38 72 34 Q66 28 68 20Z" fill="#334155" />
                <path d="M46 18 Q49 15 53 17 Q54 22 51 24 Q47 23 46 18Z" fill="#334155" />
                {/* Region dots */}
                {MAP_DOTS.map(dot => {
                  const reg = REGIONS.find(r => r.id === dot.region);
                  const isOnline = reg?.status === 'online';
                  return (
                    <g key={dot.region}>
                      <circle
                        cx={dot.x}
                        cy={dot.y}
                        r={hoveredRegion === dot.region ? 3.5 : 2.5}
                        fill={isOnline ? '#22C55E' : '#EF4444'}
                        style={{ cursor: 'pointer', transition: 'r 0.15s' }}
                        onMouseEnter={() => setHoveredRegion(dot.region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      />
                      {isOnline && (
                        <circle cx={dot.x} cy={dot.y} r={4} fill="none" stroke="#22C55E" strokeWidth="0.5" opacity="0.4" />
                      )}
                    </g>
                  );
                })}
              </svg>
              {hoveredRegion && (() => {
                const reg = REGIONS.find(r => r.id === hoveredRegion);
                if (!reg) return null;
                return (
                  <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(15,23,42,0.95)', color: 'white', borderRadius: 8, padding: '8px 12px', fontSize: 12, pointerEvents: 'none' }}>
                    <p style={{ fontWeight: 700 }}>{reg.name}</p>
                    <p style={{ color: '#94A3B8', marginTop: 2 }}>{reg.devices} devices · {reg.syncRate}% sync</p>
                  </div>
                );
              })()}
            </div>
            {/* Region list */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {REGIONS.map(r => (
                <div key={r.id} className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                  <div className="flex items-center gap-2">
                    <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: r.status === 'online' ? '#16A34A' : '#DC2626' }} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#0F172A' }}>{r.name}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{r.devices} devices</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-col gap-4">
            {/* Master Toggles */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 16 }}>Global Controls</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Force Offline Mode</p>
                    <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Block all sync across all clients</p>
                  </div>
                  <Toggle on={forceOffline} onChange={setForceOffline} />
                </div>
                {forceOffline && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertTriangle size={14} style={{ color: '#DC2626', flexShrink: 0 }} />
                    <p style={{ fontSize: 11, color: '#B91C1C' }}>All client syncing is paused. Field workers are in offline mode.</p>
                  </div>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Auto-Sync Policies</p>
                    <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Automatic background sync</p>
                  </div>
                  <Toggle on={autoSync} onChange={setAutoSync} />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Data Residency Rules</p>
                    <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Enforce regional data storage</p>
                  </div>
                  <Toggle on={dataResidency} onChange={setDataResidency} />
                </div>
              </div>
            </div>

            {/* Sync Policies */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 14 }}>Sync Policies</h3>
              <div className="space-y-3">
                {SYNC_POLICIES.map(p => (
                  <div key={p.id} className="flex items-start gap-3">
                    <Toggle on={policies[p.id]} onChange={v => setPolicies(pr => ({ ...pr, [p.id]: v }))} />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{p.label}</p>
                      <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sync Rate */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 14 }}>Sync Success Rate</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
                {[88, 92, 95, 91, 97, 94, 96].map((v, i) => (
                  <div key={i} style={{ flex: 1, backgroundColor: '#2563EB', opacity: 0.6 + i * 0.06, borderRadius: '3px 3px 0 0', height: `${v}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span style={{ fontSize: 11, color: '#94A3B8' }}>7 days ago</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Today</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle size={14} style={{ color: '#16A34A' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#16A34A' }}>96.5% average this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Currently Offline Clients */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>Currently Offline — {totalOffline} Devices</h3>
            <button style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
              View All Devices
            </button>
          </div>
          <div className="space-y-3">
            {CLIENTS_OFFLINE.map((c, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                <div className="flex items-center gap-3">
                  <WifiOff size={14} style={{ color: '#DC2626' }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{c.name}</p>
                    <p style={{ fontSize: 11, color: '#94A3B8' }}>{c.region} · Last sync: {c.lastSync}</p>
                  </div>
                </div>
                <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                  {c.devices} offline
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
