'use client';
import { useState } from 'react';

const TABS = ['Live Field Teams', 'Assigned Turfs', 'Route Optimizer'] as const;

const ACTIVE_RUNS = [
  { runner: 'John Doe',    turf: 'St. Kitts & Nevis',   visited: 148, offline: 'Synced',  eta: '2 min' },
  { runner: 'Jane Smith',  turf: 'Basseterre Central',   visited: 92,  offline: 'Pending', eta: '8 min' },
  { runner: 'Mike Brown',  turf: 'St. Anne Sandy Point', visited: 67,  offline: 'Synced',  eta: '5 min' },
  { runner: 'Sarah Jones', turf: 'Nevis West',           visited: 54,  offline: 'Synced',  eta: '12 min'},
];

// ── Pulsing red map pin ─────────────────────────────────────────────────────
function MapPin({ x, y, size = 8, delay = 0 }: { x:number; y:number; size?:number; delay?:number }) {
  const r = size;
  const pin = `M ${x},${y + r*2.1} C ${x-r*.55},${y+r*1.35} ${x-r},${y+r*.5} ${x-r},${y} A ${r},${r} 0 1 1 ${x+r},${y} C ${x+r},${y+r*.5} ${x+r*.55},${y+r*1.35} ${x},${y+r*2.1} Z`;
  return (
    <g>
      <circle cx={x} cy={y} r={r*2.8}
        fill="rgba(220,20,60,0)" stroke="#DC143C" strokeWidth="0.8" opacity="0.4"
        style={{ transformOrigin:`${x}px ${y}px`, animation:`pinPulse ${1.8 + delay*0.3}s ease-out infinite`, animationDelay:`${delay*0.15}s` }}
      />
      <path d={pin} fill="#DC143C" filter="url(#ps)" />
      <circle cx={x} cy={y} r={r*0.36} fill="white" opacity="0.92" />
    </g>
  );
}

// ── Blue info pin ───────────────────────────────────────────────────────────
function InfoPin({ x, y, label }: { x:number; y:number; label:string }) {
  const lw = label.length * 6.5 + 16;
  return (
    <g>
      <path d={`M ${x},${y+16} C ${x-5},${y+10} ${x-7},${y+3} ${x-7},${y} A 7,7 0 1 1 ${x+7},${y} C ${x+7},${y+3} ${x+5},${y+10} ${x},${y+16} Z`}
        fill="#2563EB" opacity="0.95" filter="url(#ps)" />
      <circle cx={x} cy={y} r="2.5" fill="white" opacity="0.9" />
      <rect x={x+9} y={y-9} width={lw} height={16} rx={4}
        fill="rgba(8,15,35,0.88)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
      <text x={x+17} y={y+3.5} fill="white" fontSize="8.5" fontFamily="'DM Sans',sans-serif" fontWeight="600">{label}</text>
    </g>
  );
}

function CanvassingMap() {
  const pins = [
    {x:84, y:210,d:0},{x:102,y:197,d:1},{x:118,y:188,d:2},{x:136,y:180,d:3},
    {x:154,y:173,d:4},{x:170,y:167,d:5},{x:188,y:162,d:6},{x:205,y:158,d:7},
    {x:222,y:154,d:8},{x:240,y:151,d:9},{x:258,y:149,d:0},{x:275,y:152,d:1},
    {x:292,y:158,d:2},{x:308,y:165,d:3},{x:322,y:174,d:4},
    {x:142,y:159,d:5},{x:160,y:152,d:6},{x:178,y:146,d:7},
    {x:198,y:140,d:8},{x:218,y:136,d:9},{x:238,y:132,d:0},
    {x:335,y:184,d:1},{x:350,y:194,d:2},{x:362,y:204,d:3},
    {x:371,y:214,d:4},{x:380,y:225,d:5},
  ];

  return (
    <div style={{ position:'relative', borderRadius:12, overflow:'hidden', border:'2px solid rgba(100,180,230,0.45)', boxShadow:'0 4px 30px rgba(0,0,0,0.4)' }}>
      <style>{`
        @keyframes pinPulse {
          0%   { r:20; opacity:0.5; }
          60%  { r:36; opacity:0.12; }
          100% { r:44; opacity:0; }
        }
        @keyframes routePulse {
          0%,100% { opacity:0.5; }
          50%     { opacity:1; }
        }
      `}</style>
      <svg viewBox="0 0 660 310" style={{ width:'100%', display:'block' }}>
        <defs>
          {/* BRIGHT blue sky */}
          <linearGradient id="skyZ" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3A8FCC" />
            <stop offset="50%"  stopColor="#5AAEE0" />
            <stop offset="100%" stopColor="#78C4F0" />
          </linearGradient>
          {/* Vivid turquoise ocean */}
          <linearGradient id="seaZ" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1A90D8" />
            <stop offset="45%"  stopColor="#1478BC" />
            <stop offset="100%" stopColor="#0D5A98" />
          </linearGradient>
          {/* Full background */}
          <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3A8FCC" />
            <stop offset="42%"  stopColor="#6BBCE8" />
            <stop offset="58%"  stopColor="#1A90D8" />
            <stop offset="100%" stopColor="#0D5A98" />
          </linearGradient>
          {/* Bright tropical island */}
          <linearGradient id="isl" x1="0.1" y1="0" x2="0.3" y2="1">
            <stop offset="0%"   stopColor="#3A9E40" />
            <stop offset="25%"  stopColor="#2E8A34" />
            <stop offset="60%"  stopColor="#1E6824" />
            <stop offset="100%" stopColor="#114014" />
          </linearGradient>
          <linearGradient id="islHi" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#6AC870" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3A9E40" stopOpacity="0" />
          </linearGradient>
          {/* Nevis */}
          <radialGradient id="nev" cx="45%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#3A9E40" />
            <stop offset="100%" stopColor="#0E3812" />
          </radialGradient>
          {/* Sun burst */}
          <radialGradient id="sunH" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(255,248,200,0.95)" />
            <stop offset="30%"  stopColor="rgba(255,235,140,0.55)" />
            <stop offset="65%"  stopColor="rgba(255,220,80,0.22)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Water shimmer */}
          <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="50%"  stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="ps">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.55)" />
          </filter>
          <filter id="islandGloss">
            <feGaussianBlur stdDeviation="1" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Full background */}
        <rect width="660" height="310" fill="url(#mapBg)" />

        {/* Sky zone */}
        <rect width="660" height="158" fill="url(#skyZ)" />

        {/* Ocean */}
        <rect y="225" width="660" height="85" fill="url(#seaZ)" />

        {/* Horizon shimmer */}
        <rect y="222" width="660" height="6" fill="rgba(255,255,255,0.25)" />
        <rect y="228" width="660" height="3" fill="rgba(255,255,255,0.12)" />

        {/* SUN — bright, prominent */}
        <circle cx="522" cy="55" r="90"  fill="url(#sunH)" />
        <circle cx="522" cy="55" r="30"  fill="rgba(255,248,200,0.60)" />
        <circle cx="522" cy="55" r="20"  fill="rgba(255,255,220,0.80)" />
        <circle cx="522" cy="55" r="13"  fill="rgba(255,255,240,0.95)" />
        {/* Sun rays */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>{
          const rad = deg * Math.PI / 180;
          return <line key={i}
            x1={522 + Math.cos(rad)*22} y1={55 + Math.sin(rad)*22}
            x2={522 + Math.cos(rad)*42} y2={55 + Math.sin(rad)*42}
            stroke="rgba(255,245,180,0.35)" strokeWidth="1.5" />;
        })}

        {/* Bright white clouds */}
        <ellipse cx="88"  cy="50"  rx="54" ry="18" fill="rgba(255,255,255,0.72)" />
        <ellipse cx="120" cy="40"  rx="40" ry="16" fill="rgba(255,255,255,0.78)" />
        <ellipse cx="64"  cy="44"  rx="32" ry="14" fill="rgba(255,255,255,0.65)" />
        <ellipse cx="55"  cy="52"  rx="28" ry="12" fill="rgba(255,255,255,0.55)" />
        <ellipse cx="292" cy="38"  rx="46" ry="16" fill="rgba(255,255,255,0.68)" />
        <ellipse cx="330" cy="30"  rx="36" ry="14" fill="rgba(255,255,255,0.72)" />
        <ellipse cx="448" cy="46"  rx="42" ry="15" fill="rgba(255,255,255,0.60)" />
        <ellipse cx="485" cy="38"  rx="30" ry="12" fill="rgba(255,255,255,0.65)" />

        {/* Water shimmer bands */}
        {[238,250,262,274,286,298].map((y,i)=>(
          <rect key={i} x={i*20} y={y} width={660-i*20} height={3}
            fill="url(#shimmer)" opacity="0.6" />
        ))}
        {/* Wave lines */}
        {[244,258,272,286,300].map((y,i)=>(
          <path key={i} d={`M0,${y} Q${110+i*15},${y-4} ${220+i*12},${y} Q${330+i*10},${y+4} ${440+i*12},${y} Q${550+i*8},${y-3} 660,${y}`}
            fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.2" />
        ))}

        {/* ── St. Kitts island — vivid tropical green ── */}
        <path d="
          M 55,222 C 64,202 80,188 100,178 C 122,167 146,160 170,155
          C 196,150 220,146 244,144 C 268,143 290,141 312,147
          C 334,153 354,163 372,176 C 388,188 400,202 406,216
          C 410,226 408,236 400,242 C 390,248 376,250 360,246
          C 344,242 330,233 316,228 C 302,224 290,226 276,232
          C 260,238 244,242 226,242 C 206,242 186,237 166,228
          C 146,220 126,212 108,210 C 90,208 70,212 57,220 Z
        " fill="url(#isl)" filter="url(#islandGloss)" />

        {/* Bright sunlit ridge */}
        <path d="
          M 84,186 C 108,174 136,166 163,160
          C 190,155 216,151 240,149 C 264,147 286,145 308,151
          C 326,157 344,167 360,179 C 372,190 382,203 386,216
          C 384,202 374,188 360,178 C 344,165 324,157 302,153
          C 278,149 254,147 230,150 C 204,153 180,159 156,166
          C 130,173 106,181 86,190 Z
        " fill="url(#islHi)" />

        {/* Shore surf — bright white-cyan */}
        <path d="
          M 57,220 C 66,202 82,189 102,180 C 124,169 148,162 172,157
          C 198,152 222,148 246,146 C 270,145 292,143 314,149
          C 336,155 356,165 374,178 C 390,190 402,204 408,218
        " fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />

        {/* SE peninsula hook */}
        <path d="
          M 400,218 C 410,226 422,233 436,238 C 448,242 460,244 470,240
          C 476,238 482,232 480,226 C 478,220 472,216 464,215
          C 455,214 445,216 435,220 C 424,224 412,224 404,220 Z
        " fill="url(#isl)" />
        <path d="M 400,218 C 412,228 428,236 444,240 C 458,244 472,241 478,234"
          fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />

        {/* Nevis island */}
        <ellipse cx="594" cy="278" rx="42" ry="33" fill="url(#nev)" filter="url(#islandGloss)" />
        <ellipse cx="594" cy="271" rx="26" ry="17" fill="#4AAA50" opacity="0.45" />
        <text x="594" y="284" fill="rgba(255,255,255,0.50)" fontSize="8.5"
          fontFamily="'DM Sans',sans-serif" textAnchor="middle" fontStyle="italic">Nevis</text>

        {/* Palm tree silhouettes — vivid tropical */}
        {[[92,200],[130,184],[178,170],[248,158],[328,160],[374,192]].map(([px,py],i)=>(
          <g key={i}>
            <line x1={px} y1={py+24} x2={px} y2={py-4} stroke="#1A3C10" strokeWidth="2.2" />
            <ellipse cx={px}    cy={py-8} rx="13" ry="7" fill="#2A6E2E" opacity="0.9" transform={`rotate(-18,${px},${py-8})`} />
            <ellipse cx={px-9}  cy={py-5} rx="11" ry="5" fill="#358038" opacity="0.85" transform={`rotate(-40,${px-9},${py-5})`} />
            <ellipse cx={px+9}  cy={py-5} rx="11" ry="5" fill="#358038" opacity="0.85" transform={`rotate(22,${px+9},${py-5})`} />
            {/* Coconut hints */}
            <circle cx={px-3} cy={py-1} r="2.5" fill="#8B6914" opacity="0.7" />
            <circle cx={px+3} cy={py-2} r="2"   fill="#8B6914" opacity="0.6" />
          </g>
        ))}

        {/* Route lines between zones — animated pulse */}
        <path d="M 100,202 Q 196,155 300,165 Q 382,175 448,234"
          fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" strokeDasharray="5,4"
          style={{ animation:'routePulse 2.4s ease-in-out infinite' }} />
        <path d="M 152,170 Q 240,148 336,168"
          fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" strokeDasharray="4,5" />

        {/* ── Red pins — with pulsing rings ── */}
        <g filter="url(#ps)">
          {pins.map((p,i)=>( <MapPin key={i} x={p.x} y={p.y} size={7} delay={p.d} /> ))}
        </g>

        {/* ── Blue info pins ── */}
        <InfoPin x={200} y={130} label="Canvassed" />
        <InfoPin x={450} y={210} label="St. Kitts & Nevis" />
        <InfoPin x={268} y={170} label="GPS" />

        {/* Coordinate labels */}
        <text x="8"  y="305" fill="rgba(255,255,255,0.28)" fontSize="8.5" fontFamily="'DM Mono',monospace">#0F172A</text>
        <text x="76" y="305" fill="rgba(255,255,255,0.18)" fontSize="8.5" fontFamily="'DM Mono',monospace"># 5/F173-47</text>
      </svg>

      {/* Live badge */}
      <div style={{
        position:'absolute', top:12, left:12,
        backgroundColor:'rgba(10,20,50,0.78)',
        border:'1px solid rgba(255,255,255,0.30)',
        borderRadius:8, padding:'6px 14px',
        fontSize:12, fontWeight:700, color:'#FFFFFF',
        display:'flex', alignItems:'center', gap:7,
        backdropFilter:'blur(8px)',
      }}>
        <span style={{ width:7, height:7, borderRadius:'50%', backgroundColor:'#22C55E', boxShadow:'0 0 6px #22C55E', flexShrink:0 }} />
        Live Field Teams
      </div>

      {/* Zoom controls */}
      <div style={{ position:'absolute', right:12, top:'28%', display:'flex', flexDirection:'column', gap:3 }}>
        {['+','+','−'].map((s,i)=>(
          <button key={i} style={{
            width:28, height:28, borderRadius:5,
            backgroundColor:'rgba(8,16,38,0.82)',
            border:'1px solid rgba(255,255,255,0.18)',
            color:'white', fontSize:17, fontWeight:700,
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', lineHeight:1,
          }}>{s}</button>
        ))}
      </div>
    </div>
  );
}

export default function CanvassingPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Live Field Teams');

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#FFFFFF', fontFamily:"'Inter','Segoe UI',sans-serif" }}>

      {/* ── Red title banner ── */}
      <div style={{ backgroundColor:'#CC1525', padding:'18px 24px' }}>
        <h1 style={{ fontSize:32, fontWeight:800, color:'#FFFFFF', margin:0, letterSpacing:'-0.02em' }}>
          Canvassing Operations
        </h1>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display:'flex', alignItems:'center', padding:'0 24px', backgroundColor:'#FFFFFF', borderBottom:'1px solid #E2E8F0' }}>
        {TABS.map((tab,idx)=>(
          <div key={tab} style={{ display:'flex', alignItems:'center' }}>
            {idx > 0 && <span style={{ color:'#CBD5E0', fontSize:13, margin:'0 8px' }}>•</span>}
            <button onClick={()=>setActiveTab(tab)} style={{
              padding:'13px 8px', border:'none', background:'none', cursor:'pointer',
              fontFamily:'inherit', fontSize:13, fontWeight:600,
              color: activeTab===tab ? '#1A202C' : '#94A3B8',
              borderBottom: activeTab===tab ? '2px solid #CC1525' : '2px solid transparent',
              transition:'all 0.15s', marginBottom:-1,
            }}>{tab}</button>
          </div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div style={{ padding:'16px 24px', display:'grid', gridTemplateColumns:'1fr 280px', gap:16, backgroundColor:'#FFFFFF' }}>

        {/* Map */}
        <CanvassingMap />

        {/* Stat cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

          {/* Canvassers Online — dark green */}
          <div style={{ borderRadius:10, padding:'18px 20px', flex:1, backgroundColor:'#155E2A', boxShadow:'0 2px 12px rgba(0,0,0,0.15)' }}>
            <p style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.75)', margin:'0 0 4px' }}>Canvassers Online</p>
            <p style={{ fontSize:56, fontWeight:900, color:'#FFFFFF', margin:0, lineHeight:1, letterSpacing:'-0.04em' }}>47</p>
          </div>

          {/* Voters Contacted Today — dark navy */}
          <div style={{ borderRadius:10, padding:'18px 20px', flex:1, backgroundColor:'#0F2A4A', boxShadow:'0 2px 12px rgba(0,0,0,0.15)' }}>
            <p style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.75)', margin:'0 0 4px' }}>Voters Contacted Today</p>
            <p style={{ fontSize:48, fontWeight:900, color:'#FFFFFF', margin:0, lineHeight:1, letterSpacing:'-0.04em' }}>1,248</p>
          </div>

          {/* Panic Alerts — red */}
          <div style={{ borderRadius:10, padding:'18px 20px', flex:1, backgroundColor:'#CC1525', boxShadow:'0 2px 12px rgba(0,0,0,0.15)' }}>
            <p style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.75)', margin:'0 0 4px' }}>Panic Alerts</p>
            <p style={{ fontSize:56, fontWeight:900, color:'#FFFFFF', margin:0, lineHeight:1, letterSpacing:'-0.04em' }}>0</p>
          </div>
        </div>
      </div>

      {/* ── Active Canvassing Run ── */}
      <div style={{ padding:'4px 24px 32px', backgroundColor:'#FFFFFF' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:'#1A202C', margin:0 }}>Active Canvassing Run</h3>
          <button style={{ padding:'8px 18px', borderRadius:8, backgroundColor:'#CC1525', border:'none', color:'#FFFFFF', fontSize:13, fontWeight:700, cursor:'pointer' }}>
            + New Run
          </button>
        </div>
        <div style={{ borderRadius:10, overflow:'hidden', border:'1px solid #E2E8F0' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ backgroundColor:'#F8FAFC' }}>
                {['Runner Name','Turf','Voters Visited','Offline Sync Status','Actions'].map(h=>(
                  <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #E2E8F0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVE_RUNS.map((r,i)=>(
                <tr key={i} style={{ borderBottom:'1px solid #F1F5F9', backgroundColor:'#FFFFFF' }}>
                  <td style={{ padding:'13px 16px', fontSize:13, color:'#1A202C', fontWeight:600 }}>{r.runner}</td>
                  <td style={{ padding:'13px 16px', fontSize:13, color:'#64748B' }}>{r.turf}</td>
                  <td style={{ padding:'13px 16px', fontSize:13, color:'#475569' }}>{r.visited}</td>
                  <td style={{ padding:'13px 16px' }}>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:600, borderRadius:20, padding:'3px 10px',
                      color: r.offline==='Synced'?'#16A34A':'#D97706',
                      backgroundColor: r.offline==='Synced'?'#DCFCE7':'#FEF3C7',
                    }}>
                      <span style={{ width:5, height:5, borderRadius:'50%', backgroundColor: r.offline==='Synced'?'#16A34A':'#D97706' }} />
                      {r.offline}
                    </span>
                  </td>
                  <td style={{ padding:'13px 16px' }}>
                    <button style={{ padding:'5px 14px', borderRadius:6, backgroundColor:'transparent', border:'1px solid #E2E8F0', color:'#475569', fontSize:12, fontWeight:600, cursor:'pointer' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
