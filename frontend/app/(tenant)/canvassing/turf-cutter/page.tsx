'use client';
import { PencilRuler, Map, Layers3, Route, SplitSquareVertical, Users } from 'lucide-react';

const TOOLS = [
  ['Free Draw', 'Outline turf polygons on the map'],
  ['Snap Streets', 'Auto-align zones with roads and blocks'],
  ['Balance Doors', 'Rebalance based on door count and density'],
  ['Assign Teams', 'Push completed turfs to field teams'],
];

const TURFS = [
  { name: 'Zone A - Waterfront', doors: 214, canvassers: 4, priority: 'High' },
  { name: 'Zone B - Market District', doors: 178, canvassers: 3, priority: 'Medium' },
  { name: 'Zone C - Residential North', doors: 251, canvassers: 5, priority: 'High' },
];

export default function TurfCutterPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Turf Cutting Tool</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Design field zones, balance door counts, and assign turf packages to canvassing teams.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600">Load precincts</button>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
            Publish turf plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Active Turfs', value: '12', icon: Layers3, tone: '#F5F3FF', color: '#7C3AED' },
          { label: 'Doors Balanced', value: '2,148', icon: Route, tone: '#FEF2F2', color: 'var(--tenant-primary)' },
          { label: 'Avg Doors / Turf', value: '179', icon: SplitSquareVertical, tone: '#EFF6FF', color: '#2563EB' },
          { label: 'Assigned Teams', value: '9', icon: Users, tone: '#ECFDF5', color: '#16A34A' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: card.tone }}>
              <card.icon size={18} style={{ color: card.color }} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-4 sm:gap-5">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <PencilRuler size={16} style={{ color: 'var(--tenant-primary)' }} />
              <h2 className="text-sm font-semibold text-slate-800">Cutting Tools</h2>
            </div>
            <div className="space-y-3">
              {TOOLS.map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500 mt-1">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Saved Turf Packages</h2>
            <div className="space-y-3">
              {TURFS.map(turf => (
                <div key={turf.name} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{turf.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{turf.doors} doors - {turf.canvassers} canvassers</p>
                    </div>
                    <span
                      className="px-2 py-1 rounded-full text-[10px] font-bold uppercase"
                      style={turf.priority === 'High'
                        ? { backgroundColor: '#FEF2F2', color: '#B91C1C' }
                        : { backgroundColor: '#FFF7ED', color: '#C2410C' }}
                    >
                      {turf.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 sm:px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Map size={16} style={{ color: 'var(--tenant-primary)' }} />
              <h2 className="text-sm font-semibold text-slate-800">Interactive Turf Map</h2>
            </div>
            <span className="text-xs text-slate-400">Mapbox token required for live drawing</span>
          </div>

          <div className="p-4 sm:p-5">
            <div className="relative rounded-[28px] overflow-hidden border border-slate-100 bg-slate-950 min-h-[420px]">
              <div className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(circle at top left, rgba(239,68,68,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(14,165,233,0.2), transparent 26%), linear-gradient(135deg, #0f172a 0%, #111827 100%)' }} />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px]" />

              {[
                { label: 'Zone A', top: '16%', left: '10%', width: '28%', height: '24%', color: 'rgba(239,68,68,0.55)' },
                { label: 'Zone B', top: '30%', left: '39%', width: '26%', height: '28%', color: 'rgba(59,130,246,0.45)' },
                { label: 'Zone C', top: '58%', left: '18%', width: '34%', height: '20%', color: 'rgba(34,197,94,0.45)' },
                { label: 'Zone D', top: '56%', left: '58%', width: '20%', height: '18%', color: 'rgba(250,204,21,0.42)' },
              ].map(zone => (
                <div
                  key={zone.label}
                  className="absolute rounded-[24px] border border-white/40 backdrop-blur-[2px]"
                  style={{ top: zone.top, left: zone.left, width: zone.width, height: zone.height, backgroundColor: zone.color }}
                >
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-[11px] font-bold text-white bg-black/35">
                    {zone.label}
                  </div>
                </div>
              ))}

              <div className="absolute right-4 top-4 rounded-2xl bg-black/35 backdrop-blur px-3 py-3 space-y-2 text-white max-w-[220px]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Live instructions</p>
                <p className="text-sm font-semibold">Draw shapes to define walking turf.</p>
                <p className="text-xs text-slate-300">Snap mode and density balancing will apply once your live map source is connected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
