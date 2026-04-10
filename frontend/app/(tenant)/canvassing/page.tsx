'use client';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { MapPin, Plus, Users, CheckCircle, Clock, Smartphone, Download, Search, Eye, Edit2, Trash2 } from 'lucide-react';

const WALK_LISTS = [
  { id: 1, name: 'Kingston Central — Zone A', constituency: 'Kingston Central', team: 'Team Alpha', total: 320, knocked: 280, status: 'active' },
  { id: 2, name: 'Kingston Central — Zone B', constituency: 'Kingston Central', team: 'Team Beta', total: 290, knocked: 290, status: 'completed' },
  { id: 3, name: 'Kingston East Walk', constituency: 'Kingston East', team: 'Team Gamma', total: 410, knocked: 180, status: 'active' },
  { id: 4, name: 'Spanish Town District', constituency: 'St. Catherine North', team: 'Team Delta', total: 220, knocked: 0, status: 'pending' },
  { id: 5, name: 'Portmore Zone Coverage', constituency: 'St. Catherine North', team: 'Team Echo', total: 175, knocked: 120, status: 'active' },
];

const statusStyle = (s: string) => {
  if (s === 'active') return { backgroundColor: '#E30613', color: 'white' };
  if (s === 'completed') return { backgroundColor: '#FEE2E2', color: '#E30613' };
  return { backgroundColor: '#FEF3C7', color: '#92400E' };
};

const ZONES = [
  { label: 'Kingston Central', pct: 87 },
  { label: 'Kingston East', pct: 44 },
  { label: 'St. Catherine North', pct: 55 },
  { label: 'Clarendon Central', pct: 0 },
];

export default function CanvassingPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

  const totalDoors = WALK_LISTS.reduce((s, w) => s + w.total, 0);
  const totalKnocked = WALK_LISTS.reduce((s, w) => s + w.knocked, 0);

  const filtered = WALK_LISTS.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.constituency.toLowerCase().includes(search.toLowerCase()) ||
    w.team.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Field Canvassing Operations</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage walk lists, turf assignments, and field teams</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={14} />
            Export Lists
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus size={14} />
            New Walk List
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Doors', value: totalDoors.toLocaleString(), icon: MapPin, color: '#E30613', bg: '#FEE2E2' },
          { label: 'Doors Knocked', value: totalKnocked.toLocaleString(), icon: CheckCircle, color: '#E30613', bg: '#FEE2E2' },
          { label: 'Active Teams', value: WALK_LISTS.filter(w => w.status === 'active').length, icon: Users, color: '#E30613', bg: '#FEE2E2' },
          { label: 'Completion Rate', value: `${Math.round((totalKnocked / totalDoors) * 100)}%`, icon: Clock, color: '#E30613', bg: '#FEE2E2' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Map + Walk Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Turf map */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-sm">Turf Map Coverage</h3>
          </div>
          <div className="relative h-56 flex items-center justify-center" style={{ backgroundColor: '#E8F0F8' }}>
            <div className="text-center text-slate-400 pointer-events-none">
              <MapPin size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs font-medium">Mapbox Turf Map</p>
              <p className="text-xs opacity-70">Configure NEXT_PUBLIC_MAPBOX_TOKEN</p>
            </div>
            {ZONES.map((z, i) => (
              <div
                key={z.label}
                className="absolute bg-white rounded-lg shadow-sm px-2.5 py-1.5 text-xs font-medium border border-slate-100"
                style={{
                  top: `${15 + i * 20}%`,
                  left: `${10 + (i % 2) * 45}%`,
                  color: z.pct >= 80 ? '#E30613' : z.pct >= 50 ? primaryColor : z.pct === 0 ? '#94A3B8' : '#F59E0B',
                }}
              >
                {z.label} — {z.pct}%
              </div>
            ))}
          </div>
          <div className="px-5 py-4 space-y-2">
            {ZONES.map(z => (
              <div key={z.label} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{z.label}</span>
                    <span className="font-semibold" style={{ color: z.pct >= 80 ? '#E30613' : z.pct >= 50 ? primaryColor : z.pct === 0 ? '#94A3B8' : '#F59E0B' }}>
                      {z.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${z.pct}%`,
                        backgroundColor: '#E30613',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Walk lists */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-700 text-sm">Walk Lists</h3>
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-slate-100 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-600 focus:outline-none w-44"
              />
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[480px] overflow-y-auto">
            {filtered.map(list => {
              const pct = list.total > 0 ? Math.round((list.knocked / list.total) * 100) : 0;
              return (
                <div key={list.id} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{list.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{list.constituency} · {list.team}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={statusStyle(list.status)}>
                      {list.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: '#E30613' }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 shrink-0">{list.knocked}/{list.total}</span>
                    <span className="text-xs font-bold w-8 text-right shrink-0" style={{ color: primaryColor }}>{pct}%</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all">
                      <Smartphone size={11} /> Send to App
                    </button>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all">
                      <Download size={11} /> Export
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="View" style={{ color: primaryColor }}>
                      <Eye size={13} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500" title="Edit">
                      <Edit2 size={13} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete" style={{ color: '#EF4444' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Walk List Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-4">Create New Walk List</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Walk List Name</label>
                <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none" placeholder="e.g. Kingston Central Zone C" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Constituency</label>
                  <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none">
                    <option>Kingston Central</option>
                    <option>Kingston East</option>
                    <option>St. Catherine North</option>
                    <option>Clarendon Central</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Assign Team</label>
                  <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none">
                    <option>Team Alpha</option>
                    <option>Team Beta</option>
                    <option>Team Gamma</option>
                    <option>Unassigned</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Create Walk List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
