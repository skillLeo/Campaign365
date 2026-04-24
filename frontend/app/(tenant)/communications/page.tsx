'use client';
import { useState } from 'react';

const TABS = ['SMS Campaigns', 'Email Blasts', 'Voice Calls', 'P2P Texting', 'Social Posts'] as const;
type Tab = typeof TABS[number];

const RECENT_ACTIVITY = [
  { text: 'SMS Blast to SKNLP Supporters sent to 4,972 contacts', sub: '– Open Rate: 78%' },
  { text: 'SMS Blast to SKNLP Supporters sent to 4,972 contacts', sub: '– Open Rate: 78%' },
  { text: 'SMS Blast to SKNLP Supporters sent to 4,972 contacts', sub: '– Open Rate: 78%' },
  { text: 'SMS Blast to SKNLP Supporters sent to 4,972 contacts', sub: '– Open Rate: 78%' },
];

function FlagIcon() {
  return (
    <svg viewBox="0 0 30 20" width={40} height={27} style={{ borderRadius: 3, display: 'block', flexShrink: 0 }}>
      <polygon points="0,0 30,20 0,20" fill="#009E60" />
      <polygon points="0,0 30,0 30,20" fill="#CE1126" />
      <polygon points="0,0 30,20 27,20 3,0" fill="#000000" />
      <polygon points="0,0 3,0 30,20 27,20" fill="#FCD116" />
      <polygon points="0,2 2,0 30,18 28,20 0,20 0,18" fill="#FCD116" />
    </svg>
  );
}

function SmallFlagPin() {
  // Map pin shape: rounded square badge with pointed bottom, like emoji 📍
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55))' }}>
      <svg width="38" height="46" viewBox="0 0 38 46" style={{ display: 'block' }}>
        {/* Pin body: rounded square + teardrop pointer */}
        <path d="M4,4 Q4,0 8,0 L30,0 Q34,0 34,4 L34,26 Q34,30 30,30 L22,30 L19,46 L16,30 L8,30 Q4,30 4,26 Z"
          fill="white" />
        {/* Inner flag area */}
        <clipPath id="flagClip">
          <rect x="5.5" y="1.5" width="27" height="27" rx="3" />
        </clipPath>
        <g clipPath="url(#flagClip)">
          {/* SKN flag: green triangle bottom-left, red triangle top-right, black diagonal with yellow borders, two stars */}
          <rect x="5.5" y="1.5" width="27" height="27" fill="#009E60" />
          <polygon points="5.5,1.5 32.5,1.5 32.5,28.5" fill="#CE1126" />
          {/* Black diagonal stripe */}
          <polygon points="5.5,28.5 32.5,1.5 32.5,9 5.5,36" fill="#000000" />
          {/* Yellow border lines on black stripe */}
          <polygon points="5.5,26.3 30.3,1.5 32.5,1.5 32.5,3.7 7.7,28.5 5.5,28.5" fill="#FCD116" />
          <polygon points="5.5,30.7 5.5,28.5 32.5,3.7 32.5,5.9 7.7,30.7" fill="#FCD116" />
          {/* Two white stars on the black stripe */}
          <polygon points="12,20 13.2,16.5 10,14.8 13.4,14.8 14.5,11.3 15.6,14.8 19,14.8 16.2,16.8 17.1,20.3 14.5,18.2" fill="white" />
          <polygon points="21,12 22.2,8.5 19,6.8 22.4,6.8 23.5,3.3 24.6,6.8 28,6.8 25.2,8.8 26.1,12.3 23.5,10.2" fill="white" />
        </g>
        {/* White border around badge */}
        <path d="M4,4 Q4,0 8,0 L30,0 Q34,0 34,4 L34,26 Q34,30 30,30 L22,30 L19,46 L16,30 L8,30 Q4,30 4,26 Z"
          fill="none" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function CaribbeanMapBg() {
  const pins = [
    { left: '8%',  top: '22%' },
    { left: '32%', top: '16%' },
    { left: '54%', top: '20%' },
    { left: '66%', top: '33%' },
    { left: '77%', top: '28%' },
    { left: '44%', top: '48%' },
    { left: '88%', top: '58%' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Photorealistic satellite ocean — deep space navy with teal mid-ocean sheen */}
          <radialGradient id="satOcean" cx="38%" cy="28%" r="82%">
            <stop offset="0%" stopColor="#0e2a50" />
            <stop offset="40%" stopColor="#071934" />
            <stop offset="100%" stopColor="#020810" />
          </radialGradient>
          {/* Shallow coastal water — lighter teal-blue like Caribbean satellite imagery */}
          <radialGradient id="shallowWater" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a4a7a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0a2040" stopOpacity="0" />
          </radialGradient>
          {/* Island land texture — realistic satellite green-brown */}
          <linearGradient id="landMain" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#2d6b3e" />
            <stop offset="50%" stopColor="#1e4f2a" />
            <stop offset="100%" stopColor="#122f18" />
          </linearGradient>
          <linearGradient id="landDark" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#1a4428" />
            <stop offset="100%" stopColor="#0d2916" />
          </linearGradient>
          <linearGradient id="landMid" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#3d7a4e" />
            <stop offset="100%" stopColor="#1e4a2c" />
          </linearGradient>
          {/* City glow — warm yellow */}
          <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEE80" stopOpacity="1" />
            <stop offset="30%" stopColor="#FFB800" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#FF6600" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF3300" stopOpacity="0" />
          </radialGradient>
          {/* Dramatic red crowd glow — bottom half floods red */}
          <radialGradient id="redCrowd1" cx="20%" cy="100%" r="75%">
            <stop offset="0%" stopColor="#CC0000" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#880000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#330000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="redCrowd2" cx="45%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#FF1111" stopOpacity="0.88" />
            <stop offset="50%" stopColor="#AA0000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#550000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="redCrowd3" cx="72%" cy="100%" r="55%">
            <stop offset="0%" stopColor="#EE0000" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#990000" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#440000" stopOpacity="0" />
          </radialGradient>
          {/* Bright light source at bottom — the rally spotlight */}
          <radialGradient id="rallyLight" cx="38%" cy="98%" r="35%">
            <stop offset="0%" stopColor="#FF4444" stopOpacity="1" />
            <stop offset="40%" stopColor="#CC0000" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#660000" stopOpacity="0" />
          </radialGradient>
          {/* Deep ocean shimmer filter */}
          <filter id="oceanNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
            <feComposite in="blend" in2="SourceGraphic" operator="in"/>
          </filter>
          <filter id="islandBlur">
            <feGaussianBlur stdDeviation="0.4"/>
          </filter>
        </defs>

        {/* ── BASE OCEAN ── */}
        <rect width="960" height="540" fill="url(#satOcean)" />

        {/* Subtle ocean depth variation — mid-ocean lighter patch */}
        <ellipse cx="480" cy="220" rx="520" ry="260" fill="#0d2848" fillOpacity="0.5" />
        <ellipse cx="300" cy="180" rx="320" ry="180" fill="#0f3056" fillOpacity="0.35" />

        {/* Caribbean shallow water patches */}
        <ellipse cx="340" cy="210" rx="180" ry="80" fill="#1c4e7e" fillOpacity="0.38" />
        <ellipse cx="600" cy="200" rx="140" ry="65" fill="#194872" fillOpacity="0.3" />

        {/* ── CENTRAL AMERICA coastline (left edge) ── */}
        <path d="M0,20 Q30,10 68,18 Q104,28 122,58 Q136,90 128,128 Q116,162 88,178 Q48,190 0,196 Z"
          fill="url(#landDark)" filter="url(#islandBlur)" />
        {/* Coast highlight */}
        <path d="M0,20 Q30,10 68,18 Q104,28 122,58 Q136,90 128,128"
          stroke="rgba(80,160,100,0.22)" strokeWidth="2" fill="none" />

        {/* ── CUBA — long island shape ── */}
        <path d="M94,144 Q140,116 208,104 Q292,89 388,86 Q478,84 534,96 Q576,107 588,128 Q596,148 582,168 Q560,188 506,196 Q428,204 336,202 Q244,200 174,192 Q130,184 100,170 Q86,158 94,144 Z"
          fill="url(#landMain)" filter="url(#islandBlur)" />
        {/* Cuba coast details */}
        <path d="M94,144 Q140,116 208,104 Q292,89 388,86"
          stroke="rgba(100,200,120,0.18)" strokeWidth="1.5" fill="none" />
        <path d="M388,86 Q478,84 534,96 Q576,107 588,128"
          stroke="rgba(100,200,120,0.15)" strokeWidth="1.5" fill="none" />
        {/* Cuba terrain variation */}
        <ellipse cx="340" cy="145" rx="180" ry="28" fill="#1a4028" fillOpacity="0.4" />
        <ellipse cx="220" cy="152" rx="80" ry="18" fill="#256035" fillOpacity="0.3" />

        {/* ── JAMAICA ── */}
        <path d="M246,228 Q284,212 340,216 Q372,222 376,240 Q370,258 340,264 Q304,268 270,260 Q248,250 246,228 Z"
          fill="url(#landMain)" filter="url(#islandBlur)" />

        {/* ── HISPANIOLA (Haiti + Dominican Republic) ── */}
        <path d="M466,162 Q520,140 592,144 Q640,150 664,168 Q678,183 672,204 Q658,224 622,230 Q576,236 528,228 Q488,218 470,200 Q460,184 466,162 Z"
          fill="url(#landMain)" filter="url(#islandBlur)" />
        {/* Mountain range indicator */}
        <path d="M490,172 Q536,158 580,165 Q616,170 640,185"
          stroke="rgba(80,140,90,0.25)" strokeWidth="2" fill="none" />

        {/* ── PUERTO RICO ── */}
        <path d="M680,174 Q706,162 730,170 Q744,180 742,198 Q732,214 710,218 Q688,216 676,202 Q670,188 680,174 Z"
          fill="url(#landMid)" filter="url(#islandBlur)" />

        {/* ── LESSER ANTILLES chain ── */}
        {[
          [752,212,9,8],[762,238,7,7],[768,264,8,7],[772,292,6,6],
          [768,320,6,5],[762,348,5,4],[750,375,5,4]
        ].map(([x,y,rx,ry],i) => (
          <ellipse key={`la${i}`} cx={x} cy={y} rx={rx} ry={ry}
            fill="url(#landMid)" stroke="rgba(80,180,100,0.15)" strokeWidth="0.6" />
        ))}

        {/* ── TRINIDAD & TOBAGO ── */}
        <path d="M752,385 Q776,372 798,382 Q812,394 806,410 Q788,422 764,416 Q748,406 752,385 Z"
          fill="url(#landMain)" />
        <ellipse cx="820" cy="368" rx="8" ry="6" fill="url(#landMid)" />

        {/* ── SOUTH AMERICA / VENEZUELA coast ── */}
        <path d="M248,462 Q360,412 500,394 Q632,376 740,394 Q820,408 880,440 Q928,462 960,482 L960,540 L0,540 L0,520 Q80,506 160,496 Q210,488 248,462 Z"
          fill="url(#landDark)" />
        {/* Coast highlight SA */}
        <path d="M248,462 Q360,412 500,394 Q632,376 740,394 Q820,408 880,440"
          stroke="rgba(80,160,100,0.2)" strokeWidth="1.5" fill="none" />

        {/* ── CITY / HARBOR GLOW — Haiti/Port-au-Prince area ── */}
        <ellipse cx="530" cy="200" rx="60" ry="45" fill="url(#cityGlow)" fillOpacity="0.7" />
        <circle cx="530" cy="200" r="14" fill="#FFD840" fillOpacity="0.95" />
        <circle cx="530" cy="200" r="6" fill="white" fillOpacity="0.98" />
        {/* Secondary city lights */}
        <circle cx="350" cy="148" r="5" fill="#FFE060" fillOpacity="0.7" />
        <circle cx="280" cy="156" r="4" fill="#FFD840" fillOpacity="0.6" />
        <circle cx="720" cy="188" r="5" fill="#FFE060" fillOpacity="0.65" />

        {/* ── DRAMATIC RED CROWD GLOW — fills bottom ── */}
        <rect width="960" height="540" fill="url(#redCrowd1)" />
        <rect width="960" height="540" fill="url(#redCrowd2)" />
        <rect width="960" height="540" fill="url(#redCrowd3)" />
        <rect width="960" height="540" fill="url(#rallyLight)" />

        {/* Bottom crowd silhouettes — organic raised-arm crowd */}
        <path d="
          M0,540 L0,510
          Q18,500 30,508 Q36,498 46,505 Q54,492 66,500 Q74,486 86,495
          Q94,480 108,490 Q118,475 132,485 Q142,468 158,480
          Q166,462 182,474 Q192,456 208,470 Q218,452 236,465
          Q246,446 264,460 Q274,440 294,456 Q306,436 328,452
          Q340,432 362,448 Q374,428 398,445 Q410,424 436,442
          Q448,420 476,438 Q490,416 518,435 Q532,412 562,432
          Q578,408 610,428 Q624,404 658,425 Q672,400 708,422
          Q724,396 762,420 Q778,392 818,416 Q836,390 878,414
          Q896,386 940,412 L960,400 L960,540 Z"
          fill="rgba(8,2,4,0.88)"
        />
        {/* Raised arms / heads layer */}
        {[30,62,96,130,164,200,238,278,318,360,404,450,496,542,590,640,690,740,792,844,896,940].map((x, i) => {
          const h = 488 + (i % 3) * 8 + (i % 5) * 4;
          return (
            <g key={`cr${i}`}>
              {/* body */}
              <rect x={x-5} y={h} width={10} height={540-h} rx={4} fill="rgba(6,1,3,0.9)" />
              {/* head */}
              <circle cx={x} cy={h-7} r={7} fill="rgba(6,1,3,0.9)" />
              {/* raised arm left */}
              <line x1={x-5} y1={h+8} x2={x-16} y2={h-10}
                stroke="rgba(6,1,3,0.85)" strokeWidth="5" strokeLinecap="round" />
              {/* raised arm right (every other) */}
              {i % 2 === 0 && (
                <line x1={x+5} y1={h+8} x2={x+18} y2={h-8}
                  stroke="rgba(6,1,3,0.8)" strokeWidth="4" strokeLinecap="round" />
              )}
            </g>
          );
        })}

        {/* Atmospheric vignette */}
        <rect width="960" height="540" fill="rgba(0,4,18,0.12)" />
      </svg>

      {/* SKNLP Flag Map Pins */}
      {pins.map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: pos.left,
          top: pos.top,
          transform: 'translate(-50%, -100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}>
          <SmallFlagPin />
        </div>
      ))}
    </div>
  );
}

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('SMS Campaigns');
  const [recipient, setRecipient] = useState('St. Christopher #5');
  const [filter, setFilter] = useState('Basseterre');
  const [message, setMessage] = useState('Good morning! Join the Red Wave — vote SKNLP on election day!');

  const selectStyle = {
    width: '100%',
    background: '#FFFFFF',
    color: '#1F2937',
    border: '1px solid #D1D5DB',
    borderRadius: 7,
    padding: '9px 28px 9px 11px',
    fontSize: 13,
    fontFamily: 'inherit',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EBEBEB', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP NAV BAR — white ── */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '0 28px',
        height: 62,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #E5E7EB',
        flexShrink: 0,
      }}>
        {/* Left: SKNLP logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <FlagIcon />
          <div>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 900, fontSize: 20, color: '#0F172A',
              margin: 0, lineHeight: 1.1,
            }}>SKNLP</p>
            <p style={{ fontSize: 11, color: '#6B7280', margin: 0, fontWeight: 500 }}>Campaign 365</p>
          </div>
        </div>

        {/* Center: search */}
        <div style={{ flex: 1, maxWidth: 380, margin: '0 36px' }}>
          <div style={{
            background: '#F3F4F6',
            borderRadius: 22,
            padding: '9px 16px',
            display: 'flex', alignItems: 'center', gap: 9,
            border: '1px solid #E5E7EB',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: 13, color: '#9CA3AF' }}>Search messages or contacts...</span>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
          {/* Bell */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div style={{
              position: 'absolute', top: -5, right: -6,
              minWidth: 18, height: 18, borderRadius: 9,
              backgroundColor: '#CC1F1F', color: 'white',
              fontSize: 10, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid white',
              padding: '0 3px',
            }}>3</div>
          </div>

          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}>
            {/* Circular avatar — person silhouette */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              overflow: 'hidden', flexShrink: 0,
              border: '2px solid #E5E7EB',
            }}>
              <svg viewBox="0 0 36 36" width="36" height="36">
                <rect width="36" height="36" fill="#CBD5E1" />
                <circle cx="18" cy="14" r="7" fill="#64748B" />
                <ellipse cx="18" cy="34" rx="12" ry="9" fill="#64748B" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>
              Marcus Liburd – Campaign Manager
            </span>
            <span style={{ color: '#9CA3AF', fontSize: 11 }}>▾</span>
          </div>
        </div>
      </div>

      {/* ── PAGE TITLE ── */}
      <div style={{ padding: '22px 28px 0', backgroundColor: '#EBEBEB' }}>
        <h1 style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 800,
          fontSize: 34,
          margin: '0 0 18px',
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}>
          <span style={{ color: '#0F172A' }}>Communications </span>
          <span style={{ color: '#CC1F1F' }}>Hub</span>
        </h1>

        {/* ── TABS ── */}
        <div style={{
          display: 'flex',
          gap: 0,
          borderBottom: '2px solid #E0E0E0',
        }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '9px 22px 11px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#CC1F1F' : '#6B7280',
                borderBottom: activeTab === tab ? '2px solid #CC1F1F' : '2px solid transparent',
                marginBottom: -2,
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CARD — Caribbean map background ── */}
      <div style={{ padding: '16px 28px 28px' }}>
        <div style={{
          position: 'relative',
          borderRadius: 14,
          overflow: 'hidden',
          minHeight: 530,
        }}>
          {/* Map background */}
          <CaribbeanMapBg />

          {/* Content overlay — grid: left | right */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            minHeight: 530,
          }}>

            {/* Left column: title + button (top), form (bottom) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px 26px 24px',
            }}>
              {/* Title block */}
              <div>
                <h2 style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 900,
                  fontSize: 54,
                  color: '#FFFFFF',
                  margin: '0 0 20px',
                  lineHeight: 1.04,
                  letterSpacing: '-0.025em',
                  textShadow: '0 2px 16px rgba(0,0,0,0.45)',
                }}>
                  Send SMS Blast to<br />
                  4,872 Voters
                </h2>
                <button style={{
                  padding: '14px 32px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: '#CC1F1F',
                  color: 'white',
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: 'pointer',
                  letterSpacing: '0.005em',
                  boxShadow: '0 4px 18px rgba(204,31,31,0.45)',
                }}>
                  Compose Message
                </button>
              </div>

              {/* Frosted form panel */}
              <div style={{
                background: 'rgba(215,225,242,0.76)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderRadius: 11,
                padding: '18px 20px 16px',
                border: '1px solid rgba(255,255,255,0.52)',
                maxWidth: 540,
              }}>
                {/* Recipient + Filter File */}
                <div className="rg-2" style={{ gap: 14, marginBottom: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: '#374151', fontWeight: 600, display: 'block', marginBottom: 5 }}>
                      Recipient
                    </label>
                    <select value={recipient} onChange={e => setRecipient(e.target.value)} style={selectStyle}>
                      <option>St. Christopher #5</option>
                      <option>Basseterre Central</option>
                      <option>All Constituencies</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: '#374151', fontWeight: 600, display: 'block', marginBottom: 5 }}>
                      Filter File
                    </label>
                    <select value={filter} onChange={e => setFilter(e.target.value)} style={selectStyle}>
                      <option>Basseterre</option>
                      <option>Sandy Point</option>
                      <option>All</option>
                    </select>
                  </div>
                </div>

                {/* Phones */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, color: '#374151', fontWeight: 600, display: 'block', marginBottom: 5 }}>
                    Phones
                  </label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: '#FFFFFF',
                      color: '#1F2937',
                      border: '1px solid #D1D5DB',
                      borderRadius: 7,
                      padding: '9px 11px',
                      fontSize: 13,
                      fontFamily: 'inherit',
                      resize: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Send button — right aligned */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{
                    padding: '10px 30px',
                    borderRadius: 7,
                    border: 'none',
                    backgroundColor: '#CC1F1F',
                    color: 'white',
                    fontFamily: 'inherit',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}>
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Right column: Recent Activity — light grey frosted panel */}
            <div style={{
              padding: '22px 22px 22px 0',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                background: 'rgba(185,188,198,0.82)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                borderRadius: 12,
                padding: '20px 18px',
                border: '1px solid rgba(255,255,255,0.55)',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#111111',
                  margin: '0 0 16px',
                  letterSpacing: '-0.01em',
                }}>
                  Recent Activity
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {RECENT_ACTIVITY.map((item, i) => (
                    <div key={i} style={{
                      paddingBottom: i < RECENT_ACTIVITY.length - 1 ? 14 : 0,
                      marginBottom: i < RECENT_ACTIVITY.length - 1 ? 14 : 0,
                      borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid rgba(160,163,175,0.55)' : 'none',
                    }}>
                      <p style={{
                        fontSize: 15,
                        color: '#1a1a1a',
                        margin: '0 0 4px',
                        lineHeight: 1.45,
                        fontWeight: 600,
                      }}>
                        {item.text}
                      </p>
                      <p style={{
                        fontSize: 14,
                        color: '#444444',
                        margin: 0,
                        fontWeight: 400,
                      }}>
                        {item.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
