'use client';
import { useState, useRef, useEffect } from 'react';

function useW() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    setW(window.innerWidth);
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

// ─── SKNLP Flag + upload badge (matches reference exactly) ──────────────────
function FlagBadge() {
  return (
    <div style={{ position: 'relative', width: 180, height: 150, margin: '0 auto' }}>
      {/* Flag SVG */}
      <svg viewBox="0 0 180 130" width="180" height="130" style={{ display: 'block', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.8))' }}>
        <defs>
          <clipPath id="fc"><rect width="180" height="130" rx="10" /></clipPath>
          <linearGradient id="fshine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </linearGradient>
          <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CC0A1E" />
            <stop offset="100%" stopColor="#FF1A35" />
          </linearGradient>
        </defs>
        <g clipPath="url(#fc)">
          {/* Blue right side */}
          <rect width="180" height="130" fill="#1A4080" />
          {/* Green patches */}
          <rect x="90" width="90" height="130" fill="#006B3C" />
          {/* Red diagonal triangle left */}
          <polygon points="0,0 110,65 0,130" fill="url(#redGrad)" />
          {/* Gold thin line */}
          <polygon points="0,0 85,65 0,130" fill="#FCD116" />
          {/* Black thin line */}
          <polygon points="0,0 70,65 0,130" fill="#111111" />
          {/* Shine overlay */}
          <rect width="180" height="130" fill="url(#fshine)" />
          {/* SKNLP text */}
          <text x="120" y="52" fill="#FCD116" fontSize="20" fontWeight="900"
            fontFamily="'Barlow','Impact',Arial,sans-serif" textAnchor="middle"
            letterSpacing="2">SKNLP</text>
          {/* Stars or small detail */}
          <circle cx="120" cy="72" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="132" cy="70" r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="108" cy="70" r="2" fill="rgba(255,255,255,0.3)" />
        </g>
        {/* Gold border */}
        <rect width="180" height="130" rx="10" fill="none" stroke="rgba(201,162,39,0.6)" strokeWidth="2.5" />
      </svg>

      {/* Globe + upload icon badge — bottom center */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 58, height: 58, borderRadius: '50%',
        background: 'linear-gradient(145deg, #E8C84A 0%, #C9A227 55%, #9A7810 100%)',
        boxShadow: '0 4px 18px rgba(201,162,39,0.65), 0 0 0 4px rgba(201,162,39,0.15)',
        border: '2.5px solid rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          {/* Globe */}
          <circle cx="12" cy="13" r="8" stroke="#5A3200" strokeWidth="1.6" />
          <ellipse cx="12" cy="13" rx="3.5" ry="8" stroke="#5A3200" strokeWidth="1.2" />
          <line x1="4" y1="10" x2="20" y2="10" stroke="#5A3200" strokeWidth="1.2" />
          <line x1="4" y1="16" x2="20" y2="16" stroke="#5A3200" strokeWidth="1.2" />
          {/* Upload arrow */}
          <polyline points="9,5 12,2 15,5" stroke="#3A1800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="2" x2="12" y2="8" stroke="#3A1800" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── Mock history ────────────────────────────────────────────────────────────
const HISTORY = [
  { file: 'SKNLP_EOJ_2023-10-15.eoj', ref: '#0F172A', status: 'Completed' },
  { file: 'SKNLP_2023-09-20.csv',     ref: '#0F172A', status: 'Completed' },
  { file: 'SKNLP_2023-09-20.csv',     ref: '#0F172A', status: 'Failed'    },
  { file: 'SKNLP_2023-09-20.csv',     ref: '#0F172A', status: 'Completed' },
  { file: 'SKNLP_2023-09-20.csv',     ref: '#0F172A', status: 'Failed'    },
  { file: 'SKNLP_2023-09-20.csv',     ref: '#0F172A', status: 'Failed'    },
];

export default function ImportVotersPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging]   = useState(false);
  const [file, setFile]           = useState<File | null>(null);
  const [progress]                = useState(54);
  const [histOpen, setHistOpen]   = useState(true);
  const vw = useW();
  const isMobile = vw < 768;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0D1117',
      fontFamily: "'Inter','Segoe UI',sans-serif",
      color: '#E6EDF3',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Dramatic red hero bg ─────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Red top gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 260,
          background: 'linear-gradient(120deg, #5A0010 0%, #960018 22%, #CC0020 48%, #DC143C 65%, #8B0018 85%, #3A0008 100%)',
        }} />
        {/* Palm trees */}
        <svg viewBox="0 0 1200 260" preserveAspectRatio="xMaxYMin meet"
          style={{ position: 'absolute', top: 0, right: 0, width: '65%', height: 260, opacity: 0.5 }}>
          <path d="M860,260 Q855,215 858,170 Q834,135 810,112 Q836,128 840,156 Q826,124 818,96 Q836,116 844,142 Q843,110 840,82 Q854,104 856,134 Q864,103 866,76 Q872,104 867,135 Q876,108 888,88 Q882,114 876,142 Q889,120 906,104 Q893,128 880,154 Q885,168 882,215 Q873,240 871,260Z" fill="#051505" />
          <path d="M858,162 Q820,134 795,108 Q826,128 830,156" fill="#072010" />
          <path d="M858,162 Q850,116 862,84 Q856,120 854,158" fill="#072010" />
          <path d="M858,162 Q892,128 916,102 Q886,126 878,154" fill="#072010" />
          <path d="M858,162 Q898,140 920,122 Q887,144 879,156" fill="#072010" />
          <path d="M1020,260 Q1015,208 1018,160 Q993,124 968,100 Q995,118 999,148 Q984,116 976,88 Q994,110 1003,138 Q1001,106 997,76 Q1012,100 1014,132 Q1022,100 1024,72 Q1031,102 1025,133 Q1035,106 1047,88 Q1041,114 1034,143 Q1048,120 1064,104 Q1050,128 1038,154 Q1042,168 1040,210 Q1031,238 1029,260Z" fill="#051505" />
          <path d="M1018,152 Q978,122 952,96 Q982,118 987,148" fill="#072010" />
          <path d="M1018,152 Q1024,106 1036,76 Q1022,116 1020,150" fill="#072010" />
          <path d="M1018,152 Q1055,122 1078,100 Q1047,126 1038,152" fill="#072010" />
          {/* Flag bg shapes */}
          <rect x="1050" y="30" width="100" height="70" rx="5" fill="rgba(0,100,180,0.25)" />
          <rect x="1050" y="30" width="100" height="22" rx="3" fill="rgba(206,17,38,0.3)" />
          <rect x="1050" y="78" width="100" height="22" rx="3" fill="rgba(206,17,38,0.3)" />
          <polygon points="1050,30 1100,65 1050,100" fill="rgba(252,209,22,0.2)" />
          <text x="1085" y="62" fill="rgba(255,215,0,0.6)" fontSize="14" fontWeight="900" fontFamily="Arial" textAnchor="middle">SKNLP</text>
        </svg>
        {/* Fade bottom */}
        <div style={{
          position: 'absolute', top: 180, left: 0, right: 0, height: 110,
          background: 'linear-gradient(to bottom, transparent, #0D1117)',
        }} />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: isMobile ? '24px 14px 32px' : '30px 28px 36px',
      }}>

        {/* Title */}
        <h1 style={{
          fontSize: isMobile ? 26 : 38,
          fontWeight: 900, color: '#FFFFFF',
          margin: '0 0 24px', letterSpacing: '-0.02em',
          textShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}>
          Import Voters
        </h1>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : `1fr ${histOpen ? '420px' : '0'}`,
          gap: 16,
          alignItems: 'start',
        }}>

          {/* ── LEFT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              style={{
                background: 'linear-gradient(160deg, #1E2535 0%, #181D28 100%)',
                borderRadius: 14,
                border: `2.5px solid ${dragging ? '#E8C84A' : '#C9A227'}`,
                boxShadow: `0 0 0 1px rgba(201,162,39,0.15), 0 6px 36px rgba(0,0,0,0.6)`,
                padding: isMobile ? '36px 20px 42px' : '52px 40px 56px',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
                transform: dragging ? 'scale(1.01)' : 'scale(1)',
                transition: 'all 0.18s ease',
              }}>
              <input ref={fileRef} type="file" accept=".csv,.eoj" style={{ display: 'none' }} onChange={handleFile} />
              <FlagBadge />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: isMobile ? 26 : 38,
                  fontWeight: 900, color: '#FFFFFF',
                  margin: '0 0 8px', letterSpacing: '-0.02em',
                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                }}>
                  {file ? file.name : 'Drag & Drop'}
                </p>
                <p style={{ fontSize: 15, fontWeight: 500, color: '#8B949E', margin: 0 }}>
                  EOJ Electoral Roll or CSV File
                </p>
              </div>
            </div>

            {/* Supported + progress */}
            <div style={{
              background: '#161B22',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.07)',
              padding: isMobile ? '16px' : '18px 22px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
            }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px' }}>Supported</p>
              <p style={{ fontSize: 14, color: '#8B949E', margin: '0 0 16px', lineHeight: 1.7 }}>
                EOJ Electoral Roll (*.eoj) or<br />CSV File (*.csv)
              </p>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#E6EDF3', margin: '0 0 8px' }}>
                Importing 1 of 1000 records
              </p>
              {/* Gold progress bar */}
              <div style={{
                height: 11, borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.07)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', width: `${progress}%`,
                  background: 'linear-gradient(90deg, #A07818 0%, #C9A227 35%, #E8C84A 65%, #C9A227 100%)',
                  borderRadius: 999,
                  boxShadow: '0 0 12px rgba(201,162,39,0.7)',
                }} />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Import History (DARK panel) ── */}
          {histOpen && (
            <div style={{
              background: 'linear-gradient(160deg, #1C2230 0%, #13181F 100%)',
              borderRadius: 14,
              border: '1.5px solid rgba(201,162,39,0.4)',
              overflow: 'hidden',
              boxShadow: '0 0 0 1px rgba(201,162,39,0.12), 0 8px 48px rgba(0,0,0,0.75)',
              alignSelf: 'start',
              minWidth: 0,
            }}>
              {/* Panel header */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                padding: '18px 20px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.09)',
              }}>
                <div>
                  <p style={{
                    fontSize: 28, fontWeight: 900, color: '#FFFFFF',
                    margin: '0 0 5px', letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}>
                    Import History
                  </p>
                  <p style={{ fontSize: 14, color: '#6E7681', margin: 0, fontWeight: 400 }}>Dost Uristory</p>
                </div>
                <button onClick={() => setHistOpen(false)} style={{
                  width: 30, height: 30, borderRadius: 7,
                  backgroundColor: 'rgba(255,255,255,0.09)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Column headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.7fr 72px 110px',
                padding: '11px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.045)',
              }}>
                {['File Name','Status','Records'].map(h => (
                  <span key={h} style={{
                    fontSize: 15, fontWeight: 700, color: '#FFFFFF',
                    letterSpacing: '0.02em',
                  }}>{h}</span>
                ))}
              </div>

              {/* Data rows */}
              {HISTORY.map((row, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1.7fr 72px 110px',
                  padding: '14px 20px',
                  borderBottom: i < HISTORY.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  backgroundColor: i % 2 === 1 ? 'rgba(255,255,255,0.03)' : 'transparent',
                  alignItems: 'center',
                }}>
                  {/* File name */}
                  <span style={{
                    fontSize: 14, color: '#C9D1D9',
                    fontFamily: "'Courier New',Courier,monospace",
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', paddingRight: 10,
                    display: 'block',
                    fontWeight: 500,
                  }}>
                    {row.file}
                  </span>
                  {/* Ref / hash */}
                  <span style={{
                    fontSize: 13, color: '#8B949E',
                    fontFamily: "'Courier New',Courier,monospace",
                    whiteSpace: 'nowrap',
                    fontWeight: 500,
                  }}>
                    {row.ref}
                  </span>
                  {/* Status badge */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    padding: '7px 16px', borderRadius: 8,
                    fontSize: 14, fontWeight: 700,
                    backgroundColor: row.status === 'Completed' ? '#16A34A' : '#DC2626',
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                    boxShadow: row.status === 'Completed'
                      ? '0 2px 10px rgba(22,163,74,0.5)'
                      : '0 2px 10px rgba(220,38,38,0.5)',
                  }}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Restore button */}
        {!histOpen && (
          <button onClick={() => setHistOpen(true)} style={{
            marginTop: 14, padding: '9px 18px', borderRadius: 8,
            backgroundColor: '#21262D', border: '1px solid #30363D',
            fontSize: 13, fontWeight: 600, color: '#C9D1D9',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Show Import History
          </button>
        )}
      </div>
    </div>
  );
}
