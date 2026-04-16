'use client';
import { useRouter } from 'next/navigation';

// ── SKNLP Flag Badge (red/black square) ──
function FlagIcon({ w = 36, h = 26 }: { w?: number; h?: number }) {
  return (
    <svg viewBox="0 0 36 26" width={w} height={h} style={{ borderRadius: 4, flexShrink: 0, display: 'block' }}>
      <rect width="36" height="26" fill="#DC143C" rx="3" />
      <polygon points="0,0 20,0 0,26" fill="#0F172A" />
      <text x="22" y="17" fill="white" fontSize="8" fontFamily="Arial,sans-serif" fontWeight="900" textAnchor="middle">NLP</text>
      <text x="7" y="11" fill="white" fontSize="7" fontFamily="Arial,sans-serif" fontWeight="900" textAnchor="middle">SK</text>
    </svg>
  );
}
 
// ── Hero banner ──
function HeroBanner({ name }: { name: string }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: 14,
      overflow: 'hidden',
      height: 190,
      background: '#080C14',
      display: 'flex',
    }}>
      {/* ── Left: dramatic rally scene ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Base dark gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0a0005 0%, #1a0208 40%, #2a0510 70%, #0a0010 100%)',
        }} />
        {/* Central fire glow */}
        <div style={{
          position: 'absolute', bottom: '10%', left: '35%',
          width: 180, height: 180,
          background: 'radial-gradient(ellipse, rgba(255,120,10,0.85) 0%, rgba(220,20,40,0.6) 30%, rgba(180,10,20,0.3) 55%, transparent 75%)',
          borderRadius: '50%',
          filter: 'blur(4px)',
          transform: 'translateX(-50%)',
        }} />
        {/* Upper atmosphere red haze */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '55%',
          background: 'linear-gradient(180deg, rgba(80,5,15,0.7) 0%, transparent 100%)',
        }} />
        {/* Smoke/haze streaks */}
        <svg viewBox="0 0 600 190" preserveAspectRatio="xMidYMid slice" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
        }}>
          <defs>
            <radialGradient id="fireCore" cx="38%" cy="75%" r="30%">
              <stop offset="0%" stopColor="#FFA040" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#FF3010" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#CC0020" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#CC0020" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fireCore2" cx="55%" cy="80%" r="18%">
              <stop offset="0%" stopColor="#FFD060" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF6020" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF6020" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Atmospheric smoke/cloud wisps */}
          <path d="M0,60 Q80,30 160,50 Q240,20 320,40 Q400,15 480,35 Q540,20 600,30 L600,0 L0,0 Z"
            fill="rgba(100,5,20,0.4)" />
          <path d="M50,80 Q130,55 200,70 Q280,45 360,65 Q440,40 520,60 L600,50 L600,0 L50,0 Z"
            fill="rgba(60,3,12,0.3)" />
          {/* Fire bloom */}
          <ellipse cx="225" cy="145" rx="110" ry="85" fill="url(#fireCore)" />
          <ellipse cx="310" cy="152" rx="65" ry="55" fill="url(#fireCore2)" />
          {/* Crowd silhouettes */}
          <path d="M0,190 L0,148 Q18,130 38,142 Q55,118 78,132 Q98,108 122,124 Q140,98 165,115 Q185,90 210,108 Q232,78 258,98 Q278,72 305,90 Q328,68 355,86 Q378,60 404,80 Q428,55 455,74 Q478,52 505,68 Q528,48 555,64 Q575,46 600,58 L600,190 Z"
            fill="rgba(5,2,8,0.96)" />
          {/* People heads/arms raised */}
          {[28,65,102,142,178,215,252,290,330,368,405,445,482,520,558].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${130 + (i % 4) * 5})`}>
              <circle cy={-18} r={6} fill="rgba(3,1,6,0.97)" />
              <rect y={-12} x={-3} width={6} height={22} rx={3} fill="rgba(3,1,6,0.97)" />
              {/* Raised arm */}
              <line x1={0} y1={-6} x2={i%2===0 ? -14 : 14} y2={-22}
                stroke="rgba(3,1,6,0.97)" strokeWidth={4} strokeLinecap="round" />
            </g>
          ))}
          {/* Floating embers */}
          {[{x:120,y:40,r:3},{x:195,y:25,r:2},{x:260,y:50,r:2.5},{x:310,y:18,r:2},
            {x:155,y:60,r:1.5},{x:235,y:35,r:2},{x:280,y:55,r:1.5},{x:340,y:30,r:3},
            {x:95,y:30,r:2},{x:375,y:45,r:2},{x:420,y:25,r:1.5}].map((e,i) => (
            <circle key={i} cx={e.x} cy={e.y} r={e.r} fill="#FFA040" fillOpacity={0.7 + (i%3)*0.1} />
          ))}
          {/* Flags being waved */}
          {[85,175,268,358,448].map((x,i) => (
            <g key={i}>
              <line x1={x} y1={130+(i%3)*4} x2={x} y2={100+(i%3)*4}
                stroke="rgba(180,180,180,0.6)" strokeWidth={1.5} />
              <rect x={x+1} y={100+(i%3)*4} width={14} height={9} rx={1}
                fill={i%2===0 ? '#DC143C' : '#FFFFFF'} fillOpacity={0.8} />
            </g>
          ))}
        </svg>
        {/* Left text overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, display: 'flex', alignItems: 'center', padding: '0 28px', zIndex: 5 }}>
          <div>
            <h1 style={{
              fontFamily: "'Barlow', 'Impact', sans-serif",
              fontWeight: 900,
              fontSize: 27,
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.18,
              textShadow: '0 1px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6)',
              letterSpacing: '0.01em',
            }}>
              Good morning, {name}!<br />
              <span style={{ color: '#FF8080' }}>Red Wave Rising in</span><br />
              St. Kitts &amp; Nevis
            </h1>
          </div>
        </div>
      </div>

      {/* ── Right: aerial island view ── */}
      <div style={{ width: 280, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 280 190" preserveAspectRatio="xMidYMid slice" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
        }}>
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1828" />
              <stop offset="40%" stopColor="#1a3a5a" />
              <stop offset="80%" stopColor="#2a6a8a" />
              <stop offset="100%" stopColor="#1a5070" />
            </linearGradient>
            <radialGradient id="redAtmo" cx="30%" cy="20%" r="55%">
              <stop offset="0%" stopColor="#CC1020" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#CC1020" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="oceanGlow" cx="50%" cy="85%" r="60%">
              <stop offset="0%" stopColor="#3080B0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#104060" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          {/* Sky */}
          <rect width="280" height="190" fill="url(#skyGrad)" />
          {/* Red atmospheric glow top-left */}
          <rect width="280" height="190" fill="url(#redAtmo)" />
          {/* Ocean */}
          <rect y="110" width="280" height="80" fill="#1a5a80" fillOpacity="0.7" />
          <rect width="280" height="190" fill="url(#oceanGlow)" fillOpacity="0.4" />
          {/* Ocean shimmer lines */}
          {[118,128,138,148,158,168].map(y => (
            <line key={y} x1="0" y1={y} x2="280" y2={y+2}
              stroke="rgba(120,200,255,0.12)" strokeWidth="1.5" />
          ))}
          {/* St. Kitts island — realistic elongated NW-SE shape */}
          <path d="M18,108 Q30,88 50,78 Q68,65 92,58 Q118,50 148,52 Q175,52 198,60 Q218,68 230,82 Q238,94 234,108 Q228,122 214,132 Q196,142 172,148 Q148,154 122,152 Q96,152 72,144 Q48,135 32,122 Q16,114 18,108 Z"
            fill="#2d5a1a" fillOpacity="0.92" />
          {/* Island mid-tone */}
          <path d="M38,106 Q52,88 76,78 Q100,67 130,64 Q158,61 180,70 Q200,78 210,92 Q215,104 208,116 Q198,128 178,136 Q154,144 126,142 Q98,142 76,132 Q55,122 44,112 Z"
            fill="#3a7022" fillOpacity="0.75" />
          {/* Mountain spine (central ridge) */}
          <path d="M70,90 Q95,72 125,68 Q155,63 182,76 Q196,84 196,96 Q192,106 178,114 Q155,122 128,120 Q100,118 82,106 Z"
            fill="#1e3e10" fillOpacity="0.8" />
          {/* Mountain peaks */}
          <path d="M105,88 L120,60 L135,88 Z" fill="#162e0c" fillOpacity="0.7" />
          <path d="M140,82 L155,58 L170,82 Z" fill="#162e0c" fillOpacity="0.6" />
          {/* Coastal highlights */}
          <path d="M18,108 Q30,88 50,78 Q68,65 92,58" stroke="rgba(120,200,120,0.3)" strokeWidth="1.5" fill="none" />
          {/* Town/city glow (Basseterre) */}
          <circle cx="80" cy="128" r="8" fill="#FFD060" fillOpacity="0.35" />
          <circle cx="80" cy="128" r="4" fill="#FFA020" fillOpacity="0.5" />
          {/* Nevis island (smaller, south-east) */}
          <ellipse cx="240" cy="155" rx="30" ry="20" fill="#2d5a1a" fillOpacity="0.88" />
          <ellipse cx="240" cy="153" rx="18" ry="13" fill="#1e3e10" fillOpacity="0.7" />
          {/* Channel water between islands */}
          <path d="M185,145 Q210,138 225,142" stroke="rgba(100,180,220,0.4)" strokeWidth="2" fill="none" />
          {/* Stars */}
          {[{x:30,y:15},{x:80,y:8},{x:145,y:5},{x:200,y:12},{x:250,y:7},{x:270,y:22},
            {x:10,y:35},{x:60,y:30},{x:165,y:20},{x:230,y:28}].map((s,i) => (
            <circle key={i} cx={s.x} cy={s.y} r={0.8+i%2*0.5} fill="white" fillOpacity={0.6+i%3*0.15} />
          ))}
        </svg>
      </div>

      {/* Divider glow between left and right */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: 'calc(100% - 280px)', width: 40,
        background: 'linear-gradient(90deg, transparent, rgba(200,30,30,0.25), transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

// ── Stat Cards (DARK) ──
const CARD_CONFIGS = [
  { label: 'Voters Contacted',    value: '12,458', delta: '+14%',         deltaColor: '#4ADE80', valueBig: true,  bg: '#1E2D3E' },
  { label: 'Constituencies\nActive', value: '11/11', delta: '11/11',       deltaColor: '#FFD700', valueBig: true,  bg: '#1A2C3A', valueColor: '#FFD700' },
  { label: 'Fundraising\nRaised', value: '$184,720', delta: '+$12k this week', deltaColor: '#4ADE80', valueBig: true, bg: '#261810', valueColor: '#FFD700' },
  { label: 'Canvassers\nOnline',  value: '47',      delta: '3 offline',   deltaColor: '#DC143C', valueBig: true,  bg: '#1B2434' },
];

function StatCard({ label, value, delta, deltaColor, bg, valueColor }: {
  label: string; value: string; delta: string; deltaColor: string;
  bg: string; valueColor?: string;
}) {
  return (
    <div style={{
      backgroundColor: bg,
      borderRadius: 10,
      padding: '18px 20px 16px',
      flex: 1,
      minWidth: 0,
    }}>
      <p style={{
        fontSize: 13,
        color: 'rgba(255,255,255,0.65)',
        margin: '0 0 10px',
        fontWeight: 500,
        whiteSpace: 'pre-line',
        lineHeight: 1.3,
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 8px' }}>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 900,
          fontSize: label.includes('\n') ? 30 : 36,
          color: valueColor || '#FFFFFF',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>
          {value}
        </p>
        {label === 'Voters Contacted' && (
          <svg width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <polygon points="12,3 22,21 2,21" fill="#4ADE80" />
          </svg>
        )}
      </div>
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        color: deltaColor,
      }}>
        {delta}
      </span>
    </div>
  );
}

// ── Activity Feed items ──
const FEED_ITEMS = [
  { icon: 'M', iconBg: '#16A34A',  text: 'Recent Canvasser Check-in - Toggle Button',  sub: '2 min ago', bg: '#C8B89A', borderColor: '#B8A484', textColor: '#1A1008', highlight: false },
  { icon: '!', iconBg: '#DC143C',  text: 'Recent Canvasser Check-in: Panic Button',    sub: '5 min ago', bg: '#5C1A1A', borderColor: '#7A2020', textColor: '#FFFFFF',  highlight: true  },
];

// ── Map: St Kitts & Nevis proper heatmap ──
function HeatmapMap() {
  return (
    <div style={{
      width: '100%', height: 210,
      borderRadius: 10, overflow: 'hidden', position: 'relative',
      backgroundColor: '#6aaccc',
    }}>
      <svg viewBox="0 0 560 210" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          {/* Ocean gradient */}
          <linearGradient id="oceanBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a9cbd" />
            <stop offset="100%" stopColor="#3a7a9a" />
          </linearGradient>
          {/* Radial heat gradients per constituency */}
          <radialGradient id="heat1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF2010" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FF5020" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#FF8040" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFAA60" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="heat2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF3818" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF6030" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#FF9050" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFBB70" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="heat3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4020" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#FF7040" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#FFA060" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFC880" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="heatOrange" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6000" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF8820" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#FFAA40" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFD060" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="heatYellow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB800" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#FFD020" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#FFE860" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFF0A0" stopOpacity="0.05" />
          </radialGradient>
          <clipPath id="stkittsClip">
            <path d="M62,95 Q80,68 108,56 Q138,42 174,38 Q212,32 250,40 Q285,46 318,60 Q345,72 360,90 Q372,108 365,128 Q354,150 330,162 Q302,175 268,178 Q232,182 196,176 Q158,172 124,158 Q90,144 72,124 Q56,106 62,95 Z" />
          </clipPath>
          <clipPath id="nevisClip">
            <ellipse cx="460" cy="145" rx="58" ry="40" />
          </clipPath>
        </defs>

        {/* Ocean background */}
        <rect width="560" height="210" fill="url(#oceanBg)" />
        {/* Ocean texture */}
        {[25,45,65,85,105,125,145,165,185].map(y => (
          <line key={y} x1="0" y1={y} x2="560" y2={y+3}
            stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" />
        ))}

        {/* ── ST. KITTS ISLAND ── */}
        {/* Base island fill */}
        <path d="M62,95 Q80,68 108,56 Q138,42 174,38 Q212,32 250,40 Q285,46 318,60 Q345,72 360,90 Q372,108 365,128 Q354,150 330,162 Q302,175 268,178 Q232,182 196,176 Q158,172 124,158 Q90,144 72,124 Q56,106 62,95 Z"
          fill="#2a5018" />

        {/* Heat zones — layered radial gradients clipped to island */}
        {/* Zone 1: NW Basseterre area — deep red */}
        <ellipse cx="148" cy="125" rx="72" ry="60" fill="url(#heat1)" clipPath="url(#stkittsClip)" />
        {/* Zone 2: Central NW — red-orange */}
        <ellipse cx="200" cy="100" rx="65" ry="52" fill="url(#heat2)" clipPath="url(#stkittsClip)" />
        {/* Zone 3: N Sandy Point — red */}
        <ellipse cx="115" cy="72" rx="55" ry="42" fill="url(#heat1)" clipPath="url(#stkittsClip)" />
        {/* Zone 4: Central — orange */}
        <ellipse cx="255" cy="108" rx="68" ry="50" fill="url(#heatOrange)" clipPath="url(#stkittsClip)" />
        {/* Zone 5: SE peninsula — orange-yellow */}
        <ellipse cx="320" cy="132" rx="55" ry="42" fill="url(#heatOrange)" clipPath="url(#stkittsClip)" />
        {/* Zone 6: NE corner — yellow */}
        <ellipse cx="295" cy="72" rx="52" ry="38" fill="url(#heatYellow)" clipPath="url(#stkittsClip)" />

        {/* Island outline */}
        <path d="M62,95 Q80,68 108,56 Q138,42 174,38 Q212,32 250,40 Q285,46 318,60 Q345,72 360,90 Q372,108 365,128 Q354,150 330,162 Q302,175 268,178 Q232,182 196,176 Q158,172 124,158 Q90,144 72,124 Q56,106 62,95 Z"
          fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />

        {/* Constituency boundary lines */}
        <line x1="155" y1="42" x2="148" y2="172" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="5,4" />
        <line x1="218" y1="35" x2="210" y2="178" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="5,4" />
        <line x1="278" y1="42" x2="270" y2="178" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="5,4" />
        <line x1="330" y1="62" x2="330" y2="162" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="5,4" />

        {/* Map pins */}
        {/* Basseterre (capital) */}
        <circle cx="142" cy="130" r="9" fill="#FFFFFF" stroke="#DC143C" strokeWidth="2.5" />
        <circle cx="142" cy="130" r="4" fill="#DC143C" />
        {/* Middle zone */}
        <circle cx="215" cy="105" r="7" fill="#FFFFFF" stroke="#DC143C" strokeWidth="2" />
        <circle cx="215" cy="105" r="3" fill="#DC143C" />
        {/* Sandy Point */}
        <circle cx="108" cy="70" r="7" fill="#FFFFFF" stroke="#FF6020" strokeWidth="2" />
        <circle cx="108" cy="70" r="3" fill="#FF6020" />

        {/* Labels */}
        <text x="142" y="116" fill="#FFFFFF" fontSize="8.5" fontFamily="Inter,sans-serif" textAnchor="middle" fontWeight="800"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Basseterre</text>
        <text x="108" y="57" fill="#FFFFFF" fontSize="7.5" fontFamily="Inter,sans-serif" textAnchor="middle" fontWeight="700">Sandy Pt</text>

        {/* ── NEVIS ISLAND ── */}
        {/* Base */}
        <ellipse cx="460" cy="145" rx="58" ry="40" fill="#2a5018" />
        {/* Heat zone on Nevis */}
        <ellipse cx="455" cy="145" rx="50" ry="35" fill="url(#heatOrange)" clipPath="url(#nevisClip)" />
        <ellipse cx="460" cy="145" rx="58" ry="40" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        {/* Charlestown pin */}
        <circle cx="448" cy="152" r="7" fill="#FFFFFF" stroke="#DC143C" strokeWidth="2" />
        <circle cx="448" cy="152" r="3" fill="#DC143C" />
        <text x="475" y="132" fill="#FFFFFF" fontSize="7.5" fontFamily="Inter,sans-serif" textAnchor="middle" fontWeight="700">Nevis</text>

        {/* Narrows channel */}
        <path d="M368,152 Q400,140 415,142" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />

        {/* Legend box */}
        <rect x="8" y="6" width="96" height="66" rx="5" fill="rgba(255,255,255,0.9)" />
        <rect x="16" y="16" width="10" height="10" rx="2" fill="#FF2010" />
        <text x="30" y="25" fill="#222" fontSize="7.5" fontFamily="Inter,sans-serif" fontWeight="600">High SKNLP</text>
        <rect x="16" y="31" width="10" height="10" rx="2" fill="#FF7020" />
        <text x="30" y="40" fill="#222" fontSize="7.5" fontFamily="Inter,sans-serif" fontWeight="600">Moderate</text>
        <rect x="16" y="46" width="10" height="10" rx="2" fill="#FFB800" />
        <text x="30" y="55" fill="#222" fontSize="7.5" fontFamily="Inter,sans-serif" fontWeight="600">Lower</text>
        <text x="8" y="66" fill="#666" fontSize="6.5" fontFamily="Inter,sans-serif">Voter Support Index</text>
      </svg>

      {/* LIVE badge */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: '#DC143C', color: 'white',
        borderRadius: 5, padding: '3px 10px', fontSize: 11, fontWeight: 700,
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
        LIVE
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const firstName = 'Marcus';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Top Bar ── */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 20px',
        height: 58,
        display: 'flex', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50,
        gap: 16,
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <FlagIcon w={28} h={19} />
          <span style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>SKNLP Campaign 365</span>
        </div>

        {/* Search — centered */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 9,
            background: '#F1F5F9', borderRadius: 8,
            padding: '8px 14px', width: '100%', maxWidth: 360,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span style={{ fontSize: 14, color: '#94A3B8' }}>Search voters or reports...</span>
          </div>
        </div>

        {/* Bell + User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div style={{
              position: 'absolute', top: -5, right: -5,
              width: 18, height: 18, borderRadius: '50%',
              backgroundColor: '#DC143C', color: 'white',
              fontSize: 10, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>3</div>
          </div>
          {/* User avatar + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              backgroundColor: '#CBD5E1', overflow: 'hidden',
              flexShrink: 0, border: '2px solid #E2E8F0',
            }}>
              <img
                src="https://i.pravatar.cc/72?img=52"
                alt="Marcus Liburd"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  t.style.display = 'none';
                  if (t.parentElement) {
                    t.parentElement.style.backgroundColor = '#DC143C';
                    t.parentElement.style.display = 'flex';
                    t.parentElement.style.alignItems = 'center';
                    t.parentElement.style.justifyContent = 'center';
                    t.parentElement.innerHTML = '<span style="color:white;font-size:14px;font-weight:800">M</span>';
                  }
                }}
              />
            </div>
            <div style={{ lineHeight: 1.25 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>Marcus Liburd –</p>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Campaign Manager</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Hero */}
        <HeroBanner name={firstName} />

        {/* Stat Cards — DARK */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {CARD_CONFIGS.map(c => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>

        {/* Activity Feed + Map */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

          {/* Activity Feed — white card matching client design */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: '16px 18px',
            border: '1px solid #E8ECF0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Real-time Activity Feed
              </h3>
              <span style={{ fontSize: 11, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 6 }}>
                #FFFFFF
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16A34A', display: 'inline-block', boxShadow: '0 0 0 2px rgba(22,163,74,0.2)' }} />
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FEED_ITEMS.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px', borderRadius: 10,
                  backgroundColor: item.bg,
                  border: `1px solid ${item.borderColor}`,
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    backgroundColor: item.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white', fontSize: item.icon.length > 1 ? 18 : 15, fontWeight: 800,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: item.textColor, margin: 0, lineHeight: 1.4 }}>{item.text}</p>
                    <p style={{ fontSize: 12, color: item.highlight ? 'rgba(255,255,255,0.6)' : '#94A3B8', margin: '4px 0 0' }}>{item.sub}</p>
                  </div>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    backgroundColor: item.highlight ? 'rgba(255,255,255,0.15)' : '#F1F5F9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, cursor: 'pointer',
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={item.highlight ? '#FFFFFF' : '#64748B'} strokeWidth="2">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Map — light card matching client design */}
          <div style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 10,
            padding: '16px 18px',
            border: '1px solid #E8ECF0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FlagIcon w={22} h={15} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Live Map of St. Kitts &amp; Nevis
                </h3>
              </div>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>#F8FAFC</span>
            </div>
            <HeatmapMap />
          </div>
        </div>

        {/* Action buttons — all three RED */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <button
            onClick={() => router.push('/canvassing')}
            style={{
              padding: '15px', borderRadius: 8, border: 'none',
              backgroundColor: '#DC143C', color: 'white',
              fontFamily: 'inherit', fontWeight: 700, fontSize: 15,
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Launch Canvass
          </button>
          <button
            onClick={() => router.push('/polling')}
            style={{
              padding: '15px', borderRadius: 8, border: 'none',
              backgroundColor: '#DC143C', color: 'white',
              fontFamily: 'inherit', fontWeight: 700, fontSize: 15,
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Create Poll
          </button>
          <button
            onClick={() => router.push('/communications')}
            style={{
              padding: '15px', borderRadius: 8, border: 'none',
              backgroundColor: '#DC143C', color: 'white',
              fontFamily: 'inherit', fontWeight: 700, fontSize: 15,
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Send SMS Blast
          </button>
        </div>
      </div>
    </div>
  );
}
