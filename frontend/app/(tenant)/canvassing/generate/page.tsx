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
      <div style={{ padding: '0 0 24px' }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F172A' }}>Walk List Generated!</h1>
        <p className="text-sm mb-6" style={{ color: '#64748B' }}>Your walk list is ready and has been assigned.</p>
        <div className="bg-white rounded-xl border p-6 mb-4 text-center" style={{ borderColor: '#E2E8F0' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#DCFCE7' }}>
            <Check size={28} color="#16A34A" />
          </div>
          <h2 className="text-lg font-bold mb-1" style={{ color: '#0F172A' }}>{ZONES.find(z => z.id === zone)?.name}</h2>
          <p className="text-sm mb-4" style={{ color: '#64748B' }}>Assigned to <strong>{selectedCanvasser?.name}</strong></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[['100', 'Stops'], ['4.2 km', 'Distance'], ['2h 15m', 'Est. Time']].map(([v, l]) => (
              <div key={l} className="rounded-lg p-3" style={{ backgroundColor: '#F8FAFC' }}>
                <p className="text-lg font-bold" style={{ color: '#0F172A' }}>{v}</p>
                <p className="text-xs" style={{ color: '#64748B' }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: 'var(--tenant-primary)' }}>
              <Download size={14} /> Download PDF
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: '#F1F5F9', color: '#0F172A' }}>
              <Smartphone size={14} /> Assign to Mobile App
            </button>
          </div>
        </div>
        <button onClick={() => { setGenerated(false); setStep(0); setCampaign(null); setZone(null); setCanvasser(null); }}
          className="text-sm font-medium" style={{ color: 'var(--tenant-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Generate Another List
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 0 24px' }}>
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F172A' }}>Walk List Generator</h1>
      <p className="text-sm mb-6" style={{ color: '#64748B' }}>Create and assign optimized canvassing walk lists</p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => i < step && setStep(i)}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                backgroundColor: i < step ? '#DCFCE7' : i === step ? 'var(--tenant-primary)' : '#F1F5F9',
                color: i < step ? '#16A34A' : i === step ? '#fff' : '#94A3B8',
              }}>
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span style={{ fontSize: 12, fontWeight: i === step ? 700 : 500, color: i === step ? '#0F172A' : '#94A3B8', whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <ChevronRight size={14} style={{ color: '#E2E8F0', flexShrink: 0 }} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border p-6" style={{ borderColor: '#E2E8F0', minHeight: 340 }}>
        {/* Step 0 */}
        {step === 0 && (
          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#0F172A' }}>Select Campaign</h3>
            <div className="space-y-3">
              {CAMPAIGNS.map(c => (
                <label key={c.id} className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer" style={{ borderColor: campaign === c.id ? 'var(--tenant-primary)' : '#E2E8F0', backgroundColor: campaign === c.id ? 'color-mix(in srgb, var(--tenant-primary) 8%, transparent)' : '#fff' }}>
                  <input type="radio" checked={campaign === c.id} onChange={() => setCampaign(c.id)} style={{ accentColor: 'var(--tenant-primary)' }} />
                  <span className="font-medium text-sm" style={{ color: '#0F172A' }}>{c.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#0F172A' }}>Select Zone / Turf</h3>
            <div style={{ backgroundColor: '#EFF6FF', borderRadius: 12, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, position: 'relative' }}>
              <svg viewBox="0 0 400 160" style={{ width: '100%', height: 160 }}>
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
                <label key={z.id} className="flex items-center justify-between p-3 rounded-lg border cursor-pointer" style={{ borderColor: zone === z.id ? 'var(--tenant-primary)' : '#E2E8F0', backgroundColor: zone === z.id ? 'color-mix(in srgb, var(--tenant-primary) 8%, transparent)' : '#fff' }}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={zone === z.id} onChange={() => setZone(z.id)} style={{ accentColor: 'var(--tenant-primary)' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#0F172A' }}>{z.name}</p>
                      <p className="text-xs" style={{ color: '#64748B' }}>{z.voters} voters · {z.coverage} previously covered</p>
                    </div>
                  </div>
                  <MapPin size={14} style={{ color: zone === z.id ? 'var(--tenant-primary)' : '#94A3B8' }} />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#0F172A' }}>Configure Walk List</h3>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: '#374151' }}>Sort Method</label>
                <div className="flex gap-2">
                  {[['street', 'By Street'], ['priority', 'By Priority'], ['proximity', 'By Proximity']].map(([v, l]) => (
                    <button key={v} onClick={() => setSortBy(v)}
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: sortBy === v ? 'var(--tenant-primary)' : '#F1F5F9', color: sortBy === v ? '#fff' : '#374151', border: 'none', cursor: 'pointer' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: '#374151' }}>Max Stops Per List: <strong>{maxStops}</strong></label>
                <div className="flex gap-2">
                  {[50, 100, 150, 200].map(n => (
                    <button key={n} onClick={() => setMaxStops(n)}
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: maxStops === n ? 'var(--tenant-primary)' : '#F1F5F9', color: maxStops === n ? '#fff' : '#374151', border: 'none', cursor: 'pointer' }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ['Include "Not Home" from previous visits', includeNotHome, setIncludeNotHome],
                  ['Include "Refused" doors', includeRefused, setIncludeRefused],
                ].map(([label, val, setter]) => (
                  <label key={label as string} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#F8FAFC' }}>
                    <span className="text-sm" style={{ color: '#374151' }}>{label as string}</span>
                    <button onClick={() => (setter as (v: boolean) => void)(!(val as boolean))}
                      style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: val ? 'var(--tenant-primary)' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 3, left: val ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h3 className="font-semibold mb-4" style={{ color: '#0F172A' }}>Assign to Canvasser</h3>
            <div className="grid grid-cols-2 gap-2">
              {CANVASSERS.map(c => (
                <label key={c.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer" style={{ borderColor: canvasser === c.id ? 'var(--tenant-primary)' : '#E2E8F0', backgroundColor: canvasser === c.id ? 'color-mix(in srgb, var(--tenant-primary) 8%, transparent)' : '#fff' }}>
                  <input type="radio" checked={canvasser === c.id} onChange={() => setCanvasser(c.id)} style={{ accentColor: 'var(--tenant-primary)' }} />
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: canvasser === c.id ? 'var(--tenant-primary)' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: canvasser === c.id ? '#fff' : '#64748B', flexShrink: 0 }}>
                    {c.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#0F172A' }}>{c.name}</p>
                    <p className="text-xs" style={{ color: '#64748B' }}>{c.role}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div>
            <h3 className="font-semibold mb-1" style={{ color: '#0F172A' }}>Preview & Generate</h3>
            <div className="flex gap-4 mb-4">
              {[
                [<Route size={13} key="r" />, '4.2 km', 'Total Distance'],
                [<Clock size={13} key="c" />, '2h 15m', 'Est. Time'],
                [<Users size={13} key="u" />, '100', 'Total Stops'],
              ].map(([icon, val, lbl]) => (
                <div key={lbl as string} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: 'color-mix(in srgb, var(--tenant-primary) 10%, transparent)' }}>
                  <span style={{ color: 'var(--tenant-primary)' }}>{icon}</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--tenant-primary)' }}>{val as string}</p>
                    <p style={{ fontSize: 10, color: '#64748B' }}>{lbl as string}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ overflowX: 'auto' }} className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC' }}>
                    {['#', 'Address', 'Voter(s)', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748B' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PREVIEW_ADDRESSES.map((a, i) => (
                    <tr key={a.stop} style={{ borderTop: '1px solid #F1F5F9', backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                      <td style={{ padding: '7px 12px', fontWeight: 700, color: 'var(--tenant-primary)' }}>{a.stop}</td>
                      <td style={{ padding: '7px 12px', color: '#0F172A' }}>{a.address}</td>
                      <td style={{ padding: '7px 12px', color: '#374151' }}>{a.voter}</td>
                      <td style={{ padding: '7px 12px', color: '#94A3B8' }}>{a.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-between mt-4">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: step === 0 ? '#F1F5F9' : '#E2E8F0', color: step === 0 ? '#CBD5E1' : '#374151', border: 'none', cursor: step === 0 ? 'not-allowed' : 'pointer' }}>
          ← Back
        </button>
        {step < STEPS.length - 1
          ? <button onClick={() => canNext && setStep(s => s + 1)} disabled={!canNext}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: canNext ? 'var(--tenant-primary)' : '#CBD5E1', border: 'none', cursor: canNext ? 'pointer' : 'not-allowed' }}>
              Next →
            </button>
          : <button onClick={handleGenerate}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--tenant-primary)', border: 'none', cursor: 'pointer' }}>
              <Check size={14} /> Generate Walk List
            </button>
        }
      </div>
    </div>
  );
}
