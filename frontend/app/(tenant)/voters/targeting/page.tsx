'use client';
import { useState } from 'react';

// ── Glowing target pin ────────────────────────────────────────────────────────
function TargetPin({ x, y, size = 28 }: { x: number; y: number; size?: number }) {
  const r1 = size * 0.5;
  const r2 = size * 0.32;
  const r3 = size * 0.14;
  return (
    <g>
      {/* Outer glow */}
      <circle cx={x} cy={y} r={r1 + 6} fill="rgba(201,162,39,0.12)" />
      {/* Outer ring */}
      <circle cx={x} cy={y} r={r1} fill="none" stroke="#C9A227" strokeWidth="1.8" opacity="0.85" />
      {/* Mid ring */}
      <circle cx={x} cy={y} r={r2} fill="none" stroke="#E8C84A" strokeWidth="1.4" opacity="0.9" />
      {/* Center dot */}
      <circle cx={x} cy={y} r={r3} fill="#E8C84A" opacity="0.95" />
      {/* Cross-hairs */}
      <line x1={x - r1 - 3} y1={y} x2={x - r2 - 2} y2={y} stroke="#C9A227" strokeWidth="1.2" opacity="0.7" />
      <line x1={x + r2 + 2} y1={y} x2={x + r1 + 3} y2={y} stroke="#C9A227" strokeWidth="1.2" opacity="0.7" />
      <line x1={x} y1={y - r1 - 3} x2={x} y2={y - r2 - 2} stroke="#C9A227" strokeWidth="1.2" opacity="0.7" />
      <line x1={x} y1={y + r2 + 2} x2={x} y2={y + r1 + 3} stroke="#C9A227" strokeWidth="1.2" opacity="0.7" />
    </g>
  );
}

// ── Target icon for stats ─────────────────────────────────────────────────────
function TargetIcon({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="24" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.6" />
      <circle cx="26" cy="26" r="16" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.8" />
      <circle cx="26" cy="26" r="7"  fill="#C9A227" opacity="0.9" />
      <line x1="2"  y1="26" x2="10" y2="26" stroke="#C9A227" strokeWidth="2" opacity="0.7" />
      <line x1="42" y1="26" x2="50" y2="26" stroke="#C9A227" strokeWidth="2" opacity="0.7" />
      <line x1="26" y1="2"  x2="26" y2="10" stroke="#C9A227" strokeWidth="2" opacity="0.7" />
      <line x1="26" y1="42" x2="26" y2="50" stroke="#C9A227" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

// ── Device icon for stats ─────────────────────────────────────────────────────
function DeviceIcon({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" stroke="#C9A227" strokeWidth="2" strokeLinecap="round">
      <rect x="6"  y="10" width="24" height="32" rx="3" opacity="0.8" />
      <rect x="22" y="20" width="24" height="22" rx="3" opacity="0.8" />
      <line x1="14" y1="38" x2="22" y2="38" opacity="0.6" />
    </svg>
  );
}

export default function VoterTargetingPage() {
  const [activeFilter, setActiveFilter] = useState('Undecided');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D1117',
      fontFamily: "'Inter','Segoe UI',sans-serif",
      color: '#E6EDF3',
      position: 'relative',
    }}>

      {/* ── Hero banner ──────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', height: 120, overflow: 'hidden', flexShrink: 0 }}>
        {/* Background gradient — red/orange political rally feel */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1A0005 0%, #5C0010 20%, #9B0020 40%, #CC1020 55%, #E83030 68%, #B02020 80%, #4A0010 100%)',
        }} />
        {/* Crowd silhouettes SVG */}
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 120 }}
          viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,80 Q30,55 50,70 Q65,45 80,65 Q95,38 115,60 Q130,30 148,55 Q165,25 180,52 Q198,20 215,48 Q232,15 250,45 Q268,18 285,44 Q300,28 318,50 Q335,20 352,48 Q370,32 385,55 Q400,42 420,58 Q438,30 455,52 Q470,18 488,45 Q505,28 522,50 Q538,15 555,45 Q572,22 590,48 Q608,35 625,55 Q640,20 658,48 Q675,32 692,54 Q710,25 728,50 Q745,15 762,45 Q780,28 798,52 Q815,38 832,58 Q848,25 865,50 Q882,18 900,46 Q918,30 935,52 Q950,42 968,60 Q985,35 1000,55 Q1015,22 1032,48 Q1050,30 1068,52 Q1085,38 1100,58 Q1118,42 1135,62 Q1150,45 1165,65 Q1180,52 1200,68 L1200,120 L0,120Z"
            fill="rgba(0,0,0,0.55)" />
          {/* Raised fists / arms */}
          {[80,160,240,320,400,480,560,640,720,800,880,960,1040,1120].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${20 + (i % 3) * 12})`}>
              <ellipse cx="0" cy="15" rx="6" ry="22" fill="rgba(0,0,0,0.5)" />
              <ellipse cx="0" cy="0" rx="8" ry="7" fill="rgba(0,0,0,0.5)" />
            </g>
          ))}
        </svg>
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 60,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
        }} />
        {/* "Voter Targeting" title */}
        <div style={{ position: 'absolute', bottom: 16, left: 24 }}>
          <h1 style={{
            fontSize: 32, fontWeight: 900, color: '#FFFFFF',
            margin: 0, letterSpacing: '-0.02em',
            textShadow: '0 2px 20px rgba(0,0,0,0.7)',
          }}>Voter Targeting</h1>
        </div>
      </div>

      {/* ── Content area ─────────────────────────────────────────────────────── */}
      <div style={{ padding: '0 20px 16px' }}>

        {/* ── Filter bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          background: 'linear-gradient(160deg, #1C2230 0%, #161B22 100%)',
          borderRadius: '0 0 14px 14px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: 'none',
          padding: '12px 18px',
          marginBottom: 10,
          flexWrap: 'wrap', gap: 10,
        }}>
          {/* Left filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 220 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#C9D1D9' }}>Filter</span>
            <span style={{
              fontSize: 14, fontWeight: 700, color: '#E8C84A',
              borderBottom: '2px solid #E8C84A', paddingBottom: 1, marginLeft: 4,
            }}>{activeFilter}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#C9D1D9', marginLeft: 4 }}>in Basseterre</span>
          </div>

          {/* Right: last contacted */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 4,
                backgroundColor: '#16A34A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#C9D1D9' }}>Last Contacted &gt; 14 days</span>
            </div>
            {/* Dropdown arrows */}
            <button style={{
              width: 30, height: 30, borderRadius: 7,
              backgroundColor: '#21262D', border: '1px solid #30363D',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <button style={{
              width: 30, height: 30, borderRadius: 7,
              backgroundColor: '#21262D', border: '1px solid #30363D',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Map card ── */}
        <div style={{
          background: 'linear-gradient(160deg, #0D1B2E 0%, #0A1628 100%)',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: 4,
        }}>
          {/* Zoom controls — left */}
          <div style={{
            position: 'absolute', left: 14, top: 14, zIndex: 10,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {['+', '−'].map(s => (
              <button key={s} style={{
                width: 32, height: 32, borderRadius: 6,
                backgroundColor: 'rgba(15,22,36,0.85)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#E6EDF3', fontSize: 18, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1,
              }}>{s}</button>
            ))}
          </div>

          {/* Zoom controls — right */}
          <div style={{
            position: 'absolute', right: 14, top: 14, zIndex: 10,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <button style={{
              width: 32, height: 32, borderRadius: 6,
              backgroundColor: 'rgba(15,22,36,0.85)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#E6EDF3', fontSize: 12,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            </button>
            {['+', '−'].map(s => (
              <button key={s} style={{
                width: 32, height: 32, borderRadius: 6,
                backgroundColor: 'rgba(15,22,36,0.85)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#E6EDF3', fontSize: 18, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1,
              }}>{s}</button>
            ))}
          </div>

          {/* SVG Map — St. Kitts & Nevis */}
          <svg viewBox="0 0 820 360" style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 250 }}>
            <defs>
              <radialGradient id="og" cx="40%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#0E2442" />
                <stop offset="100%" stopColor="#070F1E" />
              </radialGradient>
            </defs>
            {/* Ocean */}
            <rect width="820" height="360" fill="url(#og)" />
            {/* Ocean label */}
            <text x="28" y="200" fill="rgba(80,140,210,0.25)" fontSize="16" fontStyle="italic" fontFamily="Georgia,serif">Caribbean Sea</text>

            {/* ── St. Kitts island ── */}
            {/* Main body — elongated NW→SE with peninsula hook */}
            <polygon points="
              55,195  80,165  115,140  155,122  200,110  248,105  296,108
              342,116 388,128 430,144 468,162 500,180 522,198 535,216
              532,236 520,250 504,258 486,258 470,248 458,234
              445,220 430,212 414,214 398,222 382,235 365,232
              345,222 322,216 296,218 270,224 245,234 218,242
              190,246 162,242 135,232 108,218  78,208  55,200
            " fill="#1D4A20" stroke="#2A6830" strokeWidth="1.8" />
            {/* Highlight ridge */}
            <polygon points="
              200,115 248,108 296,111 342,120 388,132 428,148 462,166
              490,184 512,202 524,220 518,232 504,244 486,252
              470,244 456,230 442,218 426,210 410,212 394,220
              378,232 360,230 340,220 318,214 292,216 266,222
              240,232 212,240 186,242 162,236 135,226 110,214
              82,204 62,196 60,193 82,164 115,140 155,123 200,115
            " fill="#245228" opacity="0.5" />
            {/* St. Kitts label */}
            <text x="270" y="182" fill="rgba(180,230,160,0.45)" fontSize="13" fontFamily="Georgia,serif" textAnchor="middle">St. Kitts</text>

            {/* ── Nevis island ── */}
            <ellipse cx="692" cy="290" rx="68" ry="76" fill="#1D4A20" stroke="#2A6830" strokeWidth="1.8" />
            <ellipse cx="692" cy="290" rx="46" ry="52" fill="#245228" opacity="0.5" />
            <text x="692" y="296" fill="rgba(180,230,160,0.45)" fontSize="12" fontFamily="Georgia,serif" textAnchor="middle">Nevis</text>

            {/* ── Target pins — St. Kitts (scattered across island) ── */}
            <TargetPin x={160} y={148} size={22} />
            <TargetPin x={210} y={130} size={24} />
            <TargetPin x={264} y={120} size={26} />
            <TargetPin x={320} y={125} size={22} />
            <TargetPin x={372} y={136} size={28} />
            <TargetPin x={420} y={152} size={24} />
            <TargetPin x={462} y={170} size={26} />
            <TargetPin x={496} y={190} size={22} />
            <TargetPin x={516} y={212} size={24} />
            <TargetPin x={478} y={228} size={20} />
            <TargetPin x={444} y={218} size={22} />
            <TargetPin x={300} y={190} size={20} />
            <TargetPin x={240} y={195} size={18} />

            {/* ── Target pins — Nevis ── */}
            <TargetPin x={664} y={262} size={22} />
            <TargetPin x={706} y={268} size={24} />
            <TargetPin x={678} y={302} size={20} />
            <TargetPin x={718} y={310} size={22} />
            <TargetPin x={692} y={336} size={18} />
          </svg>

          {/* "Summary Nevis" label */}
          <div style={{
            padding: '8px 16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#C9D1D9' }}>Summary Nevis</span>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="rg-2" style={{ gap: 1,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '0 0 14px 14px',
          overflow: 'hidden',
          marginBottom: 10,
          border: '1px solid rgba(255,255,255,0.07)',
          borderTop: 'none',
        }}>
          {/* Left stat */}
          <div style={{
            backgroundColor: '#0D1B2E',
            padding: '18px 22px',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <TargetIcon size={44} />
            <div>
              <p style={{ fontSize: 36, fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>
                1,872
              </p>
              <p style={{ fontSize: 14, color: '#8B949E', margin: '3px 0 0', fontWeight: 500 }}>
                Voters Targeted
              </p>
            </div>
          </div>

          {/* Right stat */}
          <div style={{
            backgroundColor: '#0D1B2E',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            padding: '18px 22px',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <DeviceIcon size={44} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#C9D1D9', margin: '0 0 3px', lineHeight: 1.2 }}>
                Projected Contact Rate
              </p>
              <p style={{ fontSize: 38, fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>
                78%
              </p>
            </div>
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button style={{
            flex: 1, minWidth: 140,
            padding: '12px 20px',
            backgroundColor: '#C9A227',
            border: 'none',
            borderRadius: 10,
            fontSize: 14, fontWeight: 700, color: '#0D1117',
            cursor: 'pointer', fontFamily: 'inherit',
            letterSpacing: '0.01em',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E8C84A')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9A227')}
          >
            Assign to Canvassers
          </button>
          <button style={{
            flex: 1, minWidth: 140,
            padding: '12px 20px',
            backgroundColor: 'transparent',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: 10,
            fontSize: 14, fontWeight: 700, color: '#C9D1D9',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = '#C9D1D9'; }}
          >
            Launch SMS Blast
          </button>
          <button style={{
            flex: 1, minWidth: 140,
            padding: '12px 20px',
            backgroundColor: 'transparent',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: 10,
            fontSize: 14, fontWeight: 700, color: '#C9D1D9',
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = '#C9D1D9'; }}
          >
            Add to Poll
          </button>
        </div>

      </div>
    </div>
  );
}
