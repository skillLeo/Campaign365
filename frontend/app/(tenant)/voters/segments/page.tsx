'use client';
import { useState } from 'react';

// ── Large glowing radar pin ────────────────────────────────────────────────────
function RadarPin({ x, y, size = 36 }: { x: number; y: number; size?: number }) {
  return (
    <g>
      {/* Wide outer ambient glow */}
      <circle cx={x} cy={y} r={size * 1.6} fill="rgba(180,0,20,0.06)" />
      <circle cx={x} cy={y} r={size * 1.25} fill="rgba(200,10,30,0.10)" />
      {/* Outer ring */}
      <circle cx={x} cy={y} r={size} fill="rgba(210,10,30,0.12)"
        stroke="#BB0018" strokeWidth="1.5" opacity="0.7" />
      {/* Mid ring */}
      <circle cx={x} cy={y} r={size * 0.66} fill="rgba(225,20,40,0.20)"
        stroke="#DD1030" strokeWidth="2" opacity="0.85" />
      {/* Inner bright ring */}
      <circle cx={x} cy={y} r={size * 0.38} fill="rgba(245,40,60,0.45)"
        stroke="#FF2244" strokeWidth="2.5" opacity="1" />
      {/* Core hot glow */}
      <circle cx={x} cy={y} r={size * 0.18} fill="rgba(255,100,110,0.9)" filter="url(#coreblur)" />
      {/* Center pinpoint */}
      <circle cx={x} cy={y} r={size * 0.07} fill="#FFD0D5" />
    </g>
  );
}

// ── Slider row ────────────────────────────────────────────────────────────────
function SliderRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#CBD5E0', margin: '0 0 8px' }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, position: 'relative', height: 6 }}>
          {/* Track */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0,
            height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.1)',
          }} />
          {/* Fill */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            height: 6, borderRadius: 3,
            width: `${value}%`,
            background: 'linear-gradient(90deg, #1A3A7A, #2B5CE6)',
          }} />
          <input
            type="range" min={0} max={100} value={value}
            onChange={e => onChange(Number(e.target.value))}
            style={{
              position: 'absolute', left: 0, top: -5, width: '100%',
              opacity: 0, cursor: 'pointer', height: 16,
            }}
          />
          {/* Gold thumb */}
          <div style={{
            position: 'absolute', top: '50%',
            left: `calc(${value}% - 9px)`,
            transform: 'translateY(-50%)',
            width: 18, height: 18, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #F0D060, #C9A227)',
            boxShadow: '0 0 10px rgba(201,162,39,0.7), 0 2px 6px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }} />
        </div>
        {/* Dropdown button */}
        <button style={{
          width: 32, height: 32, borderRadius: 7,
          backgroundColor: '#1C2535', border: '1px solid rgba(255,255,255,0.12)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function SegmentsPage() {
  const [sliders, setSliders] = useState({
    constituency: 45,
    support: 62,
    age: 38,
    lastContacted: 55,
    voteContacted: 30,
    voteHistory: 48,
  });

  const set = (key: keyof typeof sliders) => (v: number) =>
    setSliders(s => ({ ...s, [key]: v }));

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#080E1C',
      fontFamily: "'Inter','Segoe UI',sans-serif",
      color: '#E6EDF3',
      padding: '20px 20px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Full-width top red glow — covers entire top band including heading ── */}
      <div style={{
        position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
        width: '140%', height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 60% 30%, rgba(200,8,28,0.55) 0%, rgba(150,5,18,0.30) 35%, rgba(90,0,12,0.12) 62%, transparent 80%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Left-side glow — behind heading */}
      <div style={{
        position: 'absolute', top: -80, left: -100, width: 480, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle at center, rgba(180,5,25,0.35) 0%, rgba(120,0,15,0.15) 50%, transparent 72%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Right accent glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 380, height: 380,
        borderRadius: '50%',
        background: 'radial-gradient(circle at center, rgba(220,10,30,0.30) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Title row ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <h1 style={{
            fontSize: 30, fontWeight: 900,
            color: '#E8192C',
            margin: 0, letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(220,20,40,0.4)',
          }}>
            Voter Segmentation
          </h1>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 18px', borderRadius: 10,
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 13, fontWeight: 600, color: '#A0AEC0',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Constraint
          </button>
        </div>

        {/* ── Three-column grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '272px 1fr 272px',
          gap: 14,
          alignItems: 'start',
        }}>

          {/* ── LEFT: Segmentation Builder ── */}
          <div style={{
            background: 'linear-gradient(165deg, #111828 0%, #0C1320 100%)',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '18px 18px 14px',
            boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
          }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#E2E8F0', margin: '0 0 18px', letterSpacing: '-0.01em' }}>
              Segmentation Builder
            </p>

            <SliderRow label="Constituency"   value={sliders.constituency}   onChange={set('constituency')} />
            <SliderRow label="Support Level"  value={sliders.support}        onChange={set('support')} />
            <SliderRow label="Age Group"      value={sliders.age}            onChange={set('age')} />
            <SliderRow label="Last Contacted" value={sliders.lastContacted}  onChange={set('lastContacted')} />
            <SliderRow label="Vote Contacted" value={sliders.voteContacted}  onChange={set('voteContacted')} />
            <SliderRow label="Vote History"   value={sliders.voteHistory}    onChange={set('voteHistory')} />

            {/* Apply filters button */}
            <button style={{
              width: '100%', padding: '10px',
              marginTop: 4,
              background: 'linear-gradient(135deg, #1A3A8A, #2563EB)',
              border: 'none', borderRadius: 9,
              fontSize: 13, fontWeight: 700, color: '#FFFFFF',
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 2px 12px rgba(37,99,235,0.35)',
            }}>
              Apply Filters
            </button>
          </div>

          {/* ── CENTER: Live Preview Map ── */}
          <div style={{
            background: 'linear-gradient(160deg, #0E1828 0%, #090F1C 100%)',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
          }}>
            {/* Map header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                backgroundColor: '#22C55E',
                boxShadow: '0 0 6px #22C55E',
              }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>Live Preview</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <div style={{ flex: 1 }} />
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 7,
                backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
                fontSize: 12, fontWeight: 600, color: '#A0AEC0',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filter
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <button style={{
                width: 30, height: 30, borderRadius: 7,
                backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>

            {/* Map SVG */}
            <div style={{ position: 'relative', backgroundColor: '#070C18' }}>
              <svg viewBox="0 0 580 310" style={{ width: '100%', height: 'auto', display: 'block' }}>
                <defs>
                  <radialGradient id="seabg" cx="45%" cy="50%" r="75%">
                    <stop offset="0%" stopColor="#091628" />
                    <stop offset="100%" stopColor="#040A14" />
                  </radialGradient>
                  {/* Core blur for hot center */}
                  <filter id="coreblur" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="4" />
                  </filter>
                  {/* Outer soft glow for connection lines */}
                  <filter id="lineglow" x="-20%" y="-60%" width="140%" height="220%">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* Ocean */}
                <rect width="580" height="310" fill="url(#seabg)" />

                {/* Very subtle grid lines */}
                {[60,120,180,240,300,360,420,480,540].map(gx => (
                  <line key={gx} x1={gx} y1="0" x2={gx} y2="310"
                    stroke="rgba(60,100,160,0.06)" strokeWidth="1" />
                ))}
                {[50,100,150,200,250,300].map(gy => (
                  <line key={gy} x1="0" y1={gy} x2="580" y2={gy}
                    stroke="rgba(60,100,160,0.06)" strokeWidth="1" />
                ))}

                {/* ── St. Kitts — dark island silhouette ── */}
                <path d="
                  M 25,170 L 48,148 L 75,130 L 108,116 L 146,108 L 186,104
                  L 228,106 L 268,112 L 306,122 L 342,136 L 374,150
                  L 400,166 L 418,182 L 428,198 L 424,214 L 412,224
                  L 396,228 L 380,224 L 368,212 L 358,200 L 344,194
                  L 328,194 L 312,198 L 296,208 L 278,218 L 258,224
                  L 236,226 L 212,222 L 188,214 L 164,210 L 140,214
                  L 116,220 L 92,218 L 70,210 L 48,198 L 28,182 Z
                " fill="#0F2018" stroke="#1A3825" strokeWidth="1.2" />
                {/* Island interior ridge */}
                <path d="
                  M 80,136 L 120,122 L 165,114 L 210,110 L 255,112
                  L 295,118 L 330,130 L 362,144 L 388,160 L 408,178
                  L 420,196 L 416,210 L 404,220 L 388,224
                  L 372,218 L 360,204 L 348,196
                " fill="none" stroke="#1E3C28" strokeWidth="2" opacity="0.5" />

                {/* ── Nevis — dark island ── */}
                <ellipse cx="488" cy="256" rx="52" ry="44" fill="#0F2018" stroke="#1A3825" strokeWidth="1.2" />

                {/* Island labels */}
                <text x="235" y="168" fill="rgba(120,180,100,0.28)" fontSize="11"
                  fontFamily="Georgia,serif" textAnchor="middle" fontStyle="italic">St. Kitts</text>
                <text x="488" y="260" fill="rgba(120,180,100,0.28)" fontSize="10"
                  fontFamily="Georgia,serif" textAnchor="middle" fontStyle="italic">Nevis</text>

                {/* ── Connection arcs — thick glowing lines ── */}
                {/* Yellow arc: left coast → Nevis */}
                <path d="M 80,162 C 200,90 340,100 488,250"
                  fill="none" stroke="#F59E0B" strokeWidth="2.5" opacity="0.75"
                  strokeDasharray="none" filter="url(#lineglow)" />
                {/* Red arc: center → Nevis bottom */}
                <path d="M 200,120 C 300,80 380,160 488,258"
                  fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.65" filter="url(#lineglow)" />
                {/* Green arc: mid island → outer */}
                <path d="M 340,136 C 380,100 440,160 490,248"
                  fill="none" stroke="#22C55E" strokeWidth="1.8" opacity="0.55" filter="url(#lineglow)" />

                {/* ── RADAR PINS — few, LARGE, dominant ── */}

                {/* Pin 1 — left side of St. Kitts (medium) */}
                <RadarPin x={90}  y={158} size={26} />

                {/* Pin 2 — center-right of St. Kitts (LARGEST — main focus) */}
                <RadarPin x={348} y={148} size={54} />

                {/* Pin 3 — small accent top-center */}
                <RadarPin x={210} y={118} size={17} />

                {/* Pin 4 — Nevis (large) */}
                <RadarPin x={486} y={253} size={44} />

              </svg>
            </div>

            {/* Stats strip */}
            <div className="rg-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ padding: '14px 18px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: 11, color: '#6B7280', margin: '0 0 3px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Persuadable</p>
                <p style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>4,872</p>
              </div>
              <div style={{ padding: '14px 18px' }}>
                <p style={{ fontSize: 11, color: '#6B7280', margin: '0 0 3px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Strong SKNLP</p>
                <p style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>8,214</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Segment Insights ── */}
          <div style={{
            background: 'linear-gradient(165deg, #111828 0%, #0C1320 100%)',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '18px 18px 16px',
            boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: '#E2E8F0', margin: 0, letterSpacing: '-0.01em' }}>
              Segment Insights
            </p>

            {/* AI Summary box */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '14px 14px',
            }}>
              <p style={{ fontSize: 12, color: '#718096', margin: 0, lineHeight: 1.75 }}>
                AI-generated summary of the voters and segment targeting the currently selected
                constituents based on historical data and behavioral patterns.
              </p>
            </div>

            {/* Grok badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>Grok</span>
              <div style={{
                marginLeft: 'auto', padding: '2px 8px', borderRadius: 12,
                backgroundColor: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)',
                fontSize: 10, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.04em',
              }}>AI</div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.07)' }} />

            {/* Segment stats */}
            {[
              { label: 'Total in Segment', value: '13,086', accent: false },
              { label: 'Contacted',         value: '4,218',  accent: false },
              { label: 'Avg. Age',          value: '38.4',   accent: false },
              { label: 'Constituencies',    value: '5',      accent: false },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '2px 0',
              }}>
                <span style={{ fontSize: 12, color: '#718096', fontWeight: 500 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#CBD5E0' }}>{row.value}</span>
              </div>
            ))}

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Save Segment button — gold */}
            <button style={{
              width: '100%', padding: '12px',
              background: 'linear-gradient(135deg, #D4A017, #C9A227)',
              border: 'none', borderRadius: 10,
              fontSize: 14, fontWeight: 700, color: '#0D1117',
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 2px 14px rgba(201,162,39,0.40)',
              letterSpacing: '0.01em',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #E8C84A, #D4A827)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #D4A017, #C9A227)'; }}
            >
              Save Segment
            </button>
          </div>

        </div>{/* /three-col grid */}
      </div>
    </div>
  );
}
