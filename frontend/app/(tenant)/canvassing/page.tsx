'use client';
import { useState } from 'react';
import { MapPin, Plus, Users, CheckCircle, Clock, Smartphone, Download, Search, Eye, Edit2, Trash2, X } from 'lucide-react';

const WALK_LISTS = [
  { id: 1, name: 'Kingston Central — Zone A', constituency: 'Kingston Central', team: 'Team Alpha', total: 320, knocked: 280, status: 'active' },
  { id: 2, name: 'Kingston Central — Zone B', constituency: 'Kingston Central', team: 'Team Beta', total: 290, knocked: 290, status: 'completed' },
  { id: 3, name: 'Kingston East Walk', constituency: 'Kingston East', team: 'Team Gamma', total: 410, knocked: 180, status: 'active' },
  { id: 4, name: 'Spanish Town District', constituency: 'St. Catherine North', team: 'Team Delta', total: 220, knocked: 0, status: 'pending' },
  { id: 5, name: 'Portmore Zone Coverage', constituency: 'St. Catherine North', team: 'Team Echo', total: 175, knocked: 120, status: 'active' },
];

const statusStyle = (s: string) => {
  if (s === 'active') return { backgroundColor: 'var(--tenant-primary)', color: 'white' };
  if (s === 'completed') return { backgroundColor: '#FEE2E2', color: 'var(--tenant-primary)' };
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
  const [newWalkList, setNewWalkList] = useState({
    name: '',
    constituency: 'Kingston Central',
    team: 'Team Alpha'
  });
  const primaryColor = 'var(--tenant-primary)';

  const totalDoors = WALK_LISTS.reduce((s, w) => s + w.total, 0);
  const totalKnocked = WALK_LISTS.reduce((s, w) => s + w.knocked, 0);

  const filtered = WALK_LISTS.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.constituency.toLowerCase().includes(search.toLowerCase()) ||
    w.team.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateWalkList = () => {
    if (!newWalkList.name.trim()) return;
    console.log('New Walk List:', newWalkList);
    setShowModal(false);
    setNewWalkList({ name: '', constituency: 'Kingston Central', team: 'Team Alpha' });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Field Canvassing Operations</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Manage walk lists, turf assignments, and field teams</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all whitespace-nowrap">
            <Download size={13} className="sm:w-[14px] sm:h-[14px]" />
            Export Lists
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus size={13} className="sm:w-[14px] sm:h-[14px]" />
            New Walk List
          </button>
        </div>
      </div>

      {/* Stats Cards - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Doors', value: totalDoors.toLocaleString(), icon: MapPin, color: 'var(--tenant-primary)', bg: '#FEE2E2' },
          { label: 'Doors Knocked', value: totalKnocked.toLocaleString(), icon: CheckCircle, color: 'var(--tenant-primary)', bg: '#FEE2E2' },
          { label: 'Active Teams', value: WALK_LISTS.filter(w => w.status === 'active').length, icon: Users, color: 'var(--tenant-primary)', bg: '#FEE2E2' },
          { label: 'Completion Rate', value: `${Math.round((totalKnocked / totalDoors) * 100)}%`, icon: Clock, color: 'var(--tenant-primary)', bg: '#FEE2E2' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={14} className="sm:w-[18px] sm:h-[18px]" style={{ color }} />
              </div>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">{label}</p>
          </div>
        ))}
      </div>

      {/* Map + Walk Lists - Responsive */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        {/* Turf map */}
        <div className="lg:w-2/5 bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm">Turf Map Coverage</h3>
          </div>
          <div className="relative h-48 sm:h-56 flex items-center justify-center" style={{ backgroundColor: '#E8F0F8' }}>
            <div className="text-center text-slate-400 pointer-events-none">
              <MapPin size={24} className="sm:w-7 sm:h-7 mx-auto mb-2 opacity-30" />
              <p className="text-[10px] sm:text-xs font-medium">Mapbox Turf Map</p>
              <p className="text-[9px] sm:text-xs opacity-70">Configure NEXT_PUBLIC_MAPBOX_TOKEN</p>
            </div>
            {ZONES.map((z, i) => (
              <div
                key={z.label}
                className="absolute bg-white rounded-lg shadow-sm px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-[9px] sm:text-xs font-medium border border-slate-100 whitespace-nowrap"
                style={{
                  top: `${15 + i * 20}%`,
                  left: `${10 + (i % 2) * 45}%`,
                  color: z.pct >= 80 ? 'var(--tenant-primary)' : z.pct >= 50 ? primaryColor : z.pct === 0 ? '#94A3B8' : '#F59E0B',
                }}
              >
                {z.label} — {z.pct}%
              </div>
            ))}
          </div>
          <div className="px-3 sm:px-5 py-3 sm:py-4 space-y-2">
            {ZONES.map(z => (
              <div key={z.label} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                    <span className="text-slate-600 truncate">{z.label}</span>
                    <span className="font-semibold whitespace-nowrap ml-2" style={{ color: z.pct >= 80 ? 'var(--tenant-primary)' : z.pct >= 50 ? primaryColor : z.pct === 0 ? '#94A3B8' : '#F59E0B' }}>
                      {z.pct}%
                    </span>
                  </div>
                  <div className="h-1 sm:h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${z.pct}%`,
                        backgroundColor: 'var(--tenant-primary)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Walk lists */}
        <div className="lg:flex-1 bg-white rounded-xl sm:rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm">Walk Lists</h3>
            <div className="relative w-full sm:w-44">
              <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-slate-100 rounded-lg sm:rounded-xl pl-8 pr-2.5 py-1.5 text-[11px] sm:text-xs text-slate-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[480px] overflow-y-auto">
            {filtered.map(list => {
              const pct = list.total > 0 ? Math.round((list.knocked / list.total) * 100) : 0;
              return (
                <div key={list.id} className="px-3 sm:px-5 py-3 sm:py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{list.name}</p>
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{list.constituency} · {list.team}</p>
                    </div>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold capitalize whitespace-nowrap self-start" style={statusStyle(list.status)}>
                      {list.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 sm:h-2">
                      <div
                        className="h-1.5 sm:h-2 rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: 'var(--tenant-primary)' }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-600 shrink-0 whitespace-nowrap">{list.knocked}/{list.total}</span>
                    <span className="text-[10px] sm:text-xs font-bold w-8 text-right shrink-0" style={{ color: primaryColor }}>{pct}%</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    <button className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all whitespace-nowrap">
                      <Smartphone size={10} className="sm:w-[11px] sm:h-[11px]" /> Send to App
                    </button>
                    <button className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all whitespace-nowrap">
                      <Download size={10} className="sm:w-[11px] sm:h-[11px]" /> Export
                    </button>
                    <button className="p-1 sm:p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="View" style={{ color: primaryColor }}>
                      <Eye size={11} className="sm:w-[13px] sm:h-[13px]" />
                    </button>
                    <button className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500" title="Edit">
                      <Edit2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                    </button>
                    <button className="p-1 sm:p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete" style={{ color: '#EF4444' }}>
                      <Trash2 size={11} className="sm:w-[13px] sm:h-[13px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Walk List Modal - Responsive */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowModal(false)} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">Create New Walk List</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Walk List Name</label>
                <input 
                  value={newWalkList.name}
                  onChange={e => setNewWalkList({ ...newWalkList, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-red-400"
                  placeholder="e.g. Kingston Central Zone C" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Constituency</label>
                  <select 
                    value={newWalkList.constituency}
                    onChange={e => setNewWalkList({ ...newWalkList, constituency: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none"
                  >
                    <option>Kingston Central</option>
                    <option>Kingston East</option>
                    <option>St. Catherine North</option>
                    <option>Clarendon Central</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">Assign Team</label>
                  <select 
                    value={newWalkList.team}
                    onChange={e => setNewWalkList({ ...newWalkList, team: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 focus:outline-none"
                  >
                    <option>Team Alpha</option>
                    <option>Team Beta</option>
                    <option>Team Gamma</option>
                    <option>Team Delta</option>
                    <option>Unassigned</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateWalkList}
                  disabled={!newWalkList.name.trim()}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: primaryColor }}
                >
                  Create Walk List
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}