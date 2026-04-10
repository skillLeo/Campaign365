'use client';
import { useState } from 'react';
import { ChevronRight, Check, Download, Smartphone, MapPin, Users, Clock, Route } from 'lucide-react';

const CAMPAIGNS = [
  { id: 1, name: '2026 General Election — National' },
  { id: 2, name: '2025 Constituency Campaign — St. Christopher 1' },
  { id: 3, name: 'By-Election — Nevis 2' },
];

const ZONES = [
  { id: 'z1', name: 'Basseterre Urban — Zone A', voters: 320, coverage: '88%' },
  { id: 'z2', name: 'Basseterre Urban — Zone B', voters: 290, coverage: '100%' },
  { id: 'z3', name: 'Sandy Point — Zone A', voters: 185, coverage: '44%' },
];

const CANVASSERS = [
  { id: 1, name: 'Marcus James', role: 'Senior Canvasser', initials: 'MJ' },
  { id: 2, name: 'Patricia Henry', role: 'Canvasser', initials: 'PH' },
  { id: 3, name: 'Desmond Clarke', role: 'Canvasser', initials: 'DC' },
  { id: 4, name: 'Sandra Morton', role: 'Field Organizer', initials: 'SM' },
  { id: 5, name: 'Calvin Thomas', role: 'Canvasser', initials: 'CT' },
  { id: 6, name: 'Yvonne Francis', role: 'Canvasser', initials: 'YF' },
  { id: 7, name: 'Ronald Baptiste', role: 'Senior Canvasser', initials: 'RB' },
  { id: 8, name: 'Josephine Williams', role: 'Canvasser', initials: 'JW' },
];

const PREVIEW_ADDRESSES = [
  { stop: 1, address: '14 Church Street, Basseterre', voter: 'Marcus & Jennifer James', notes: '2 registered voters' },
  { stop: 2, address: '18 Church Street, Basseterre', voter: 'Sylvia Brown', notes: 'First-time voter' },
  { stop: 3, address: '22 Church Street, Basseterre', voter: 'Robert Clarke', notes: 'Not Home — prev. visit' },
  { stop: 4, address: '27 Bay Road, Basseterre', voter: 'Patricia Henry', notes: '1 registered voter' },
  { stop: 5, address: '31 Bay Road, Basseterre', voter: 'Desmond & Maria Thomas', notes: '3 registered voters' },
  { stop: 6, address: '35 Bay Road, Basseterre', voter: 'Calvin Williams', notes: '1 registered voter' },
  { stop: 7, address: '12 Fort Street, Basseterre', voter: 'Yvonne Francis', notes: 'Undecided — priority' },
  { stop: 8, address: '16 Fort Street, Basseterre', voter: 'Ronald & Sandra Baptiste', notes: '2 registered voters' },
  { stop: 9, address: '19 Fort Street, Basseterre', voter: 'George Daniel', notes: 'Supporter confirmed' },
  { stop: 10, address: '3 Independence Square, Basseterre', voter: 'Michelle Phipps', notes: '1 registered voter' },
];

const STEPS = ['Select Campaign', 'Select Zone', 'Configure', 'Assign Canvasser', 'Preview & Generate'];

export default function GenerateWalkListPage() {
  const [step, setStep] = useState(0);
  const [campaign, setCampaign] = useState<number | null>(null);
  const [zone, setZone] = useState<string | null>(null);
  const [maxStops, setMaxStops] = useState(100);
  const [sortBy, setSortBy] = useState('street');
  const [includeNotHome, setIncludeNotHome] = useState(true);
  const [includeRefused, setIncludeRefused] = useState(false);
  const [canvasser, setCanvasser] = useState<number | null>(null);
  const [generated, setGenerated] = useState(false);

  const canNext = [
    campaign !== null,
    zone !== null,
    true,
    canvasser !== null,
    true,
  ][step];

  const handleGenerate = () => setGenerated(true);

  if (generated) {
    const selectedCanvasser = CANVASSERS.find(c => c.id === canvasser);
    return (
      <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-1 text-slate-800">Walk List Generated!</h1>
        <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-slate-500">Your walk list is ready and has been assigned.</p>
        <div className="bg-white rounded-xl sm:rounded-2xl border p-4 sm:p-6 mb-4 text-center" style={{ borderColor: '#E2E8F0' }}>
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#DCFCE7' }}>
            <Check size={22} className="sm:w-7 sm:h-7" color="#16A34A" />
          </div>
          <h2 className="text-base sm:text-lg font-bold mb-1 text-slate-800">{ZONES.find(z => z.id === zone)?.name}</h2>
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-slate-500">Assigned to <strong>{selectedCanvasser?.name}</strong></p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {[['100', 'Stops'], ['4.2 km', 'Distance'], ['2h 15m', 'Est. Time']].map(([v, l]) => (
              <div key={l} className="rounded-lg p-2 sm:p-3" style={{ backgroundColor: '#F8FAFC' }}>
                <p className="text-base sm:text-lg font-bold text-slate-800">{v}</p>
                <p className="text-[10px] sm:text-xs text-slate-500">{l}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
              <Download size={13} className="sm:w-[14px] sm:h-[14px]" /> Download PDF
            </button>
            <button className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold" style={{ backgroundColor: '#F1F5F9', color: '#0F172A' }}>
              <Smartphone size={13} className="sm:w-[14px] sm:h-[14px]" /> Assign to Mobile App
            </button>
          </div>
        </div>
        <button onClick={() => { setGenerated(false); setStep(0); setCampaign(null); setZone(null); setCanvasser(null); }}
          className="text-xs sm:text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--tenant-primary)' }}>
          ← Generate Another List
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-1 text-slate-800">Walk List Generator</h1>
      <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-slate-500">Create and assign optimized canvassing walk lists</p>

      {/* Step indicator - Responsive */}
      <div className="flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2 cursor-pointer" onClick={() => i < step && setStep(i)}>
              <div style={{
                width: 'clamp(24px, 6vw, 28px)', height: 'clamp(24px, 6vw, 28px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 700,
                backgroundColor: i < step ? '#DCFCE7' : i === step ? 'var(--tenant-primary)' : '#F1F5F9',
                color: i < step ? '#16A34A' : i === step ? '#fff' : '#94A3B8',
              }}>
                {i < step ? <Check size={11} className="sm:w-[13px] sm:h-[13px]" /> : i + 1}
              </div>
              <span style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: i === step ? 700 : 500, color: i === step ? '#0F172A' : '#94A3B8', whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <ChevronRight size={12} className="text-slate-200 flex-shrink-0 sm:w-[14px] sm:h-[14px]" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl border p-4 sm:p-6" style={{ borderColor: '#E2E8F0', minHeight: 340 }}>
        {/* Step 0 - Select Campaign */}
        {step === 0 && (
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-slate-800">Select Campaign</h3>
            <div className="space-y-2 sm:space-y-3">
              {CAMPAIGNS.map(c => (
                <label key={c.id} className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border cursor-pointer transition-all" style={{ borderColor: campaign === c.id ? 'var(--tenant-primary)' : '#E2E8F0', backgroundColor: campaign === c.id ? 'color-mix(in srgb, var(--tenant-primary) 8%, transparent)' : '#fff' }}>
                  <input type="radio" checked={campaign === c.id} onChange={() => setCampaign(c.id)} style={{ accentColor: 'var(--tenant-primary)' }} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-medium text-xs sm:text-sm text-slate-800">{c.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 - Select Zone */}
        {step === 1 && (
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-slate-800">Select Zone / Turf</h3>
            <div className="bg-blue-50 rounded-xl sm:rounded-2xl h-40 sm:h-48 flex items-center justify-center mb-3 sm:mb-4 relative overflow-hidden">
              <svg viewBox="0 0 400 160" className="w-full h-auto max-h-40 sm:max-h-48">
                <rect width="400" height="160" fill="#BFDBFE" />
                {ZONES.map((z, i) => (
                  <g key={z.id} style={{ cursor: 'pointer' }} onClick={() => setZone(z.id)}>
                    <rect x={20 + i * 130} y={30} width={110} height={100} rx="8"
                      fill={zone === z.id ? 'var(--tenant-primary)' : '#DBEAFE'} stroke={zone === z.id ? 'var(--tenant-primary)' : '#93C5FD'} strokeWidth="2" fillOpacity={zone === z.id ? 0.9 : 0.7} />
                    <text x={75 + i * 130} y={85} textAnchor="middle" fill={zone === z.id ? '#fff' : '#1E40AF'} fontSize="9" fontWeight="700">{z.name.split('—')[0]}</text>
                    <text x={75 + i * 130} y={98} textAnchor="middle" fill={zone === z.id ? 'rgba(255,255,255,0.8)' : '#3B82F6'} fontSize="8">{z.voters} voters</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="space-y-2">
              {ZONES.map(z => (
                <label key={z.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg border cursor-pointer transition-all" style={{ borderColor: zone === z.id ? 'var(--tenant-primary)' : '#E2E8F0', backgroundColor: zone === z.id ? 'color-mix(in srgb, var(--tenant-primary) 8%, transparent)' : '#fff' }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <input type="radio" checked={zone === z.id} onChange={() => setZone(z.id)} style={{ accentColor: 'var(--tenant-primary)' }} className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">{z.name}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">{z.voters} voters · {z.coverage} previously covered</p>
                    </div>
                  </div>
                  <MapPin size={12} className="sm:w-[14px] sm:h-[14px] ml-7 sm:ml-0" style={{ color: zone === z.id ? 'var(--tenant-primary)' : '#94A3B8' }} />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 - Configure */}
        {step === 2 && (
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-slate-800">Configure Walk List</h3>
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="text-xs sm:text-sm font-medium mb-2 block text-slate-700">Sort Method</label>
                <div className="flex flex-wrap gap-2">
                  {[['street', 'By Street'], ['priority', 'By Priority'], ['proximity', 'By Proximity']].map(([v, l]) => (
                    <button key={v} onClick={() => setSortBy(v)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-medium transition-all"
                      style={{ backgroundColor: sortBy === v ? 'var(--tenant-primary)' : '#F1F5F9', color: sortBy === v ? '#fff' : '#374151', border: 'none', cursor: 'pointer' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium mb-2 block text-slate-700">Max Stops Per List: <strong>{maxStops}</strong></label>
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 150, 200].map(n => (
                    <button key={n} onClick={() => setMaxStops(n)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-medium transition-all"
                      style={{ backgroundColor: maxStops === n ? 'var(--tenant-primary)' : '#F1F5F9', color: maxStops === n ? '#fff' : '#374151', border: 'none', cursor: 'pointer' }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  ['Include "Not Home" from previous visits', includeNotHome, setIncludeNotHome],
                  ['Include "Refused" doors', includeRefused, setIncludeRefused],
                ].map(([label, val, setter]) => (
                  <label key={label as string} className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg" style={{ backgroundColor: '#F8FAFC' }}>
                    <span className="text-[11px] sm:text-sm text-slate-700">{label as string}</span>
                    <button onClick={() => (setter as (v: boolean) => void)(!(val as boolean))}
                      style={{ width: 40, height: 22, borderRadius: 11, backgroundColor: val ? 'var(--tenant-primary)' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 3, left: val ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 - Assign Canvasser */}
        {step === 3 && (
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-slate-800">Assign to Canvasser</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CANVASSERS.map(c => (
                <label key={c.id} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-all" style={{ borderColor: canvasser === c.id ? 'var(--tenant-primary)' : '#E2E8F0', backgroundColor: canvasser === c.id ? 'color-mix(in srgb, var(--tenant-primary) 8%, transparent)' : '#fff' }}>
                  <input type="radio" checked={canvasser === c.id} onChange={() => setCanvasser(c.id)} style={{ accentColor: 'var(--tenant-primary)' }} className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: canvasser === c.id ? 'var(--tenant-primary)' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: canvasser === c.id ? '#fff' : '#64748B', flexShrink: 0 }}>
                    {c.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-sm font-medium text-slate-800 truncate">{c.name}</p>
                    <p className="text-[9px] sm:text-xs text-slate-500 truncate">{c.role}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 - Preview */}
        {step === 4 && (
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base text-slate-800">Preview & Generate</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
              {[
                [<Route size={12} className="sm:w-[13px] sm:h-[13px]" key="r" />, '4.2 km', 'Total Distance'],
                [<Clock size={12} className="sm:w-[13px] sm:h-[13px]" key="c" />, '2h 15m', 'Est. Time'],
                [<Users size={12} className="sm:w-[13px] sm:h-[13px]" key="u" />, '100', 'Total Stops'],
              ].map(([icon, val, lbl]) => (
                <div key={lbl as string} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg" style={{ backgroundColor: 'color-mix(in srgb, var(--tenant-primary) 10%, transparent)' }}>
                  <span style={{ color: 'var(--tenant-primary)' }}>{icon}</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold" style={{ color: 'var(--tenant-primary)' }}>{val as string}</p>
                    <p className="text-[9px] sm:text-[10px] text-slate-500">{lbl as string}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full text-xs" style={{ minWidth: '500px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC' }}>
                    {['#', 'Address', 'Voter(s)', 'Notes'].map(h => (
                      <th key={h} className="py-1.5 sm:py-2 px-2 sm:px-3 text-left text-[10px] sm:text-xs font-bold text-slate-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PREVIEW_ADDRESSES.map((a, i) => (
                    <tr key={a.stop} style={{ borderTop: '1px solid #F1F5F9', backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 font-bold whitespace-nowrap" style={{ color: 'var(--tenant-primary)' }}>{a.stop}</td>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-slate-800 text-[10px] sm:text-xs whitespace-nowrap">{a.address}</td>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-slate-700 text-[10px] sm:text-xs whitespace-nowrap">{a.voter}</td>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-slate-400 text-[10px] sm:text-xs whitespace-nowrap">{a.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons - Responsive */}
      <div className="flex justify-between gap-3 mt-4 sm:mt-5">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all"
          style={{ backgroundColor: step === 0 ? '#F1F5F9' : '#E2E8F0', color: step === 0 ? '#CBD5E1' : '#374151', border: 'none', cursor: step === 0 ? 'not-allowed' : 'pointer' }}>
          ← Back
        </button>
        {step < STEPS.length - 1
          ? <button onClick={() => canNext && setStep(s => s + 1)} disabled={!canNext}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: canNext ? 'var(--tenant-primary)' : '#CBD5E1', border: 'none', cursor: canNext ? 'pointer' : 'not-allowed' }}>
              Next →
            </button>
          : <button onClick={handleGenerate}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--tenant-primary)', border: 'none', cursor: 'pointer' }}>
              <Check size={12} className="sm:w-[14px] sm:h-[14px]" /> Generate Walk List
            </button>
        }
      </div>
    </div>
  );
}