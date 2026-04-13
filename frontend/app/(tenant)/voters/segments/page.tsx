'use client';
import { useState } from 'react';
import { Filter, Sparkles, Users, MapPinned, BadgePercent, Plus, ChevronRight, CheckCircle2 } from 'lucide-react';

const SEGMENTS = [
  { name: 'Persuadable Women 30-45', size: 1284, region: 'Central Belt', freshness: 'Updated 2h ago', status: 'live' },
  { name: 'Dormant Supporters', size: 862, region: 'Coastal Seats', freshness: 'Updated yesterday', status: 'watch' },
  { name: 'First-Time Voters', size: 604, region: 'University Zone', freshness: 'Updated 30m ago', status: 'live' },
];

const RULE_GROUPS = [
  { label: 'Support score', value: 'Leaning support to undecided' },
  { label: 'Turnout history', value: '0-1 of last 3 elections' },
  { label: 'Age range', value: '25-45 years' },
  { label: 'Geography', value: 'Kingston Central + East' },
];

const PREVIEW = [
  { group: 'Women 30-45', voters: 712, rate: 72 },
  { group: 'Low-turnout men', voters: 331, rate: 54 },
  { group: 'Young undecided voters', voters: 241, rate: 68 },
];

export default function VoterSegmentsPage() {
  const [activeSegment, setActiveSegment] = useState('Persuadable Women 30-45');

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Voter Segmentation</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Build reusable voter audiences for canvassing, GOTV, and digital outreach.</p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: 'var(--tenant-primary)' }}
        >
          <Plus size={15} />
          New Segment
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Saved Segments', value: '24', icon: Filter, tone: '#EEF2FF', color: '#4F46E5' },
          { label: 'Reachable Voters', value: '18,420', icon: Users, tone: '#FEF2F2', color: 'var(--tenant-primary)' },
          { label: 'Priority Zones', value: '11', icon: MapPinned, tone: '#ECFDF5', color: '#16A34A' },
          { label: 'Avg Match Rate', value: '64%', icon: BadgePercent, tone: '#FFF7ED', color: '#EA580C' },
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

      <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Saved Audiences</h2>
            <span className="text-xs text-slate-400">3 featured</span>
          </div>
          <div className="divide-y divide-slate-100">
            {SEGMENTS.map(segment => {
              const active = segment.name === activeSegment;
              return (
                <button
                  key={segment.name}
                  onClick={() => setActiveSegment(segment.name)}
                  className="w-full text-left px-4 py-4 transition-colors hover:bg-slate-50"
                  style={active ? { backgroundColor: 'color-mix(in srgb, var(--tenant-primary) 7%, white)' } : undefined}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{segment.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{segment.region}</p>
                    </div>
                    <span
                      className="px-2 py-1 rounded-full text-[10px] font-bold uppercase"
                      style={segment.status === 'live'
                        ? { backgroundColor: '#DCFCE7', color: '#15803D' }
                        : { backgroundColor: '#FFF7ED', color: '#C2410C' }}
                    >
                      {segment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs">
                    <span className="text-slate-600">{segment.size.toLocaleString()} voters</span>
                    <span className="text-slate-400">{segment.freshness}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">{activeSegment}</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Segment logic and projected audience breakdown.</p>
              </div>
              <button className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--tenant-primary)' }}>
                Push to targeting map
                <ChevronRight size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} style={{ color: 'var(--tenant-primary)' }} />
                  <p className="text-sm font-semibold text-slate-800">Builder Rules</p>
                </div>
                <div className="space-y-3">
                  {RULE_GROUPS.map(rule => (
                    <div key={rule.label} className="rounded-xl bg-white border border-slate-100 px-3 py-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{rule.label}</p>
                      <p className="text-sm text-slate-700 mt-1">{rule.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-800 mb-3">Audience Preview</p>
                <div className="space-y-4">
                  {PREVIEW.map(row => (
                    <div key={row.group}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-600">{row.group}</span>
                        <span className="font-semibold text-slate-800">{row.voters} voters</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${row.rate}%`, backgroundColor: 'var(--tenant-primary)' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: 'color-mix(in srgb, var(--tenant-primary) 8%, white)' }}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} style={{ color: 'var(--tenant-primary)' }} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Recommended activation</p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">Use this segment for persuasion canvassing, then sync it to SMS and phone bank follow-up.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-800">Activation Channels</h2>
              <span className="text-xs text-slate-400">Ready to launch</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                ['Canvassing', 'Assign 420 doors to field teams'],
                ['SMS Follow-Up', 'Draft reminder for 1,284 contacts'],
                ['Digital Ads', 'Sync anonymous audience export'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500 mt-2">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
