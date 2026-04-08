'use client';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { MapPin, Radio, AlertTriangle, Users, Activity, Clock } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  role: string;
  constituency: string;
  lat: number;
  lng: number;
  last_seen: string;
  status: 'active' | 'idle' | 'offline';
  battery: number;
}

const AGENTS: Agent[] = [
  { id: 1, name: 'Marcus James', role: 'Canvasser', constituency: 'Kingston Central', lat: 17.997, lng: -76.793, last_seen: '2 min ago', status: 'active', battery: 84 },
  { id: 2, name: 'Leila Morris', role: 'Field Organizer', constituency: 'Kingston East', lat: 18.002, lng: -76.782, last_seen: '5 min ago', status: 'active', battery: 62 },
  { id: 3, name: 'Devon Clarke', role: 'Runner', constituency: 'Kingston Central', lat: 17.993, lng: -76.799, last_seen: '1 min ago', status: 'active', battery: 91 },
  { id: 4, name: 'Nadia Brown', role: 'Canvasser', constituency: 'St. Catherine North', lat: 18.010, lng: -76.812, last_seen: '12 min ago', status: 'idle', battery: 47 },
  { id: 5, name: 'Patrick Grant', role: 'Branch Manager', constituency: 'Clarendon Central', lat: 17.988, lng: -76.776, last_seen: '45 min ago', status: 'offline', battery: 18 },
];

const batteryColor = (b: number) => b > 50 ? '#E30613' : b > 20 ? '#F59E0B' : '#EF4444';
const statusColors = { active: '#E30613', idle: '#F59E0B', offline: '#94A3B8' };

export default function TrackingPage() {
  const [agents] = useState<Agent[]>(AGENTS);
  const [selected, setSelected] = useState<Agent | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'idle' | 'offline'>('all');
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const filtered = filter === 'all' ? agents : agents.filter(a => a.status === filter);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Live GPS Tracking</h1>
          <p className="text-sm text-slate-400 mt-0.5">Real-time field agent locations — updates every 30 seconds</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#ECFDF5', color: '#065F46' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
            <AlertTriangle size={13} />
            Simulate Panic
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Agents', value: agents.filter(a => a.status === 'active').length, color: '#E30613', bg: '#ECFDF5', icon: Activity },
          { label: 'Idle', value: agents.filter(a => a.status === 'idle').length, color: '#F59E0B', bg: '#FFFBEB', icon: Clock },
          { label: 'Offline', value: agents.filter(a => a.status === 'offline').length, color: '#94A3B8', bg: '#F1F5F9', icon: Radio },
          { label: 'Total Tracked', value: agents.length, color: primaryColor, bg: '#F0FDFA', icon: Users },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Map + Agent List */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Map */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-700 text-sm">Live Agent Map</h3>
            <span className="text-xs text-slate-400">Jamaica · All Constituencies</span>
          </div>
          <div className="relative h-[420px] flex items-center justify-center" style={{ backgroundColor: '#E8EEF5' }}>
            <div className="text-center text-slate-400 pointer-events-none">
              <MapPin size={32} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm font-medium text-slate-500">Mapbox Live Map</p>
              <p className="text-xs text-slate-400">Configure NEXT_PUBLIC_MAPBOX_TOKEN</p>
            </div>
            {agents.map((agent, i) => (
              <button
                key={agent.id}
                onClick={() => setSelected(agent)}
                className="absolute z-10 transition-all hover:scale-110"
                style={{ top: `${18 + i * 14}%`, left: `${12 + i * 16}%` }}
                title={agent.name}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    backgroundColor: statusColors[agent.status],
                    animation: agent.status === 'active' ? 'pulse 2s infinite' : undefined,
                  }}
                >
                  {agent.name[0]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Agent list */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col">
          <div className="px-4 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-sm mb-3">Field Agents</h3>
            <div className="flex gap-1">
              {(['all', 'active', 'idle', 'offline'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium capitalize transition-all"
                  style={filter === f
                    ? { backgroundColor: primaryColor, color: 'white' }
                    : { backgroundColor: '#F1F5F9', color: '#64748B' }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {filtered.map(agent => (
              <button
                key={agent.id}
                onClick={() => setSelected(selected?.id === agent.id ? null : agent)}
                className="w-full text-left px-4 py-3.5 hover:bg-slate-50 transition-colors"
                style={selected?.id === agent.id ? { backgroundColor: '#F8FAFC', borderLeft: `3px solid ${primaryColor}` } : {}}
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {agent.name[0]}
                    </div>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: statusColors[agent.status] }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{agent.name}</p>
                    <p className="text-xs text-slate-400">{agent.role} · {agent.constituency}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-400">{agent.last_seen}</p>
                    <div className="flex items-center gap-1 mt-0.5 justify-end">
                      <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${agent.battery}%`, backgroundColor: batteryColor(agent.battery) }} />
                      </div>
                      <span className="text-xs" style={{ color: batteryColor(agent.battery) }}>{agent.battery}%</span>
                    </div>
                  </div>
                </div>
                {selected?.id === agent.id && (
                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-600">GPS Coordinates</p>
                      <p className="text-xs text-slate-400 mt-0.5">{agent.lat.toFixed(4)}, {agent.lng.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600">Status</p>
                      <p className="text-xs capitalize mt-0.5" style={{ color: statusColors[agent.status] }}>{agent.status}</p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
