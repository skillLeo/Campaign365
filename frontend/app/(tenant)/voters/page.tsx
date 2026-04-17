'use client';
import { useState, useEffect } from 'react';

// ── Colors ───────────────────────────────────────────────────────────────────
const C = {
  pageBg:      '#0D1117',
  topBarBg:    '#0D1117',
  borderSub:   'rgba(255,255,255,0.07)',
  tblHeader:   '#161B22',
  tblRow:      '#0D1117',
  tblRowAlt:   '#0F1318',
  tblSelected: '#7F1D1D',
  tblBorder:   'rgba(255,255,255,0.06)',
  red:         '#DC143C',
  textWhite:   '#E6EDF3',
  textGray:    '#8B949E',
  textMuted:   '#6E7681',
  btnDark:     '#21262D',
  btnBorder:   '#30363D',
  filterBg:    '#161B22',
  filterBorder:'#30363D',
};

// ── Responsive hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w };
}

// ── SKNLP Flag ────────────────────────────────────────────────────────────────
function SKNFlag({ w = 26, h = 18 }: { w?: number; h?: number }) {
  return (
    <svg viewBox="0 0 30 20" width={w} height={h} style={{ borderRadius: 2, display: 'block', flexShrink: 0 }}>
      <rect width="30" height="20" fill="#009E60" />
      <polygon points="0,0 30,0 30,7 0,7" fill="#CE1126" />
      <polygon points="0,13 30,13 30,20 0,20" fill="#CE1126" />
      <polygon points="0,0 18,10 0,20" fill="#000000" />
      <polygon points="0,0 16,10 0,20" fill="#FCD116" />
    </svg>
  );
}

// ── Country flags ─────────────────────────────────────────────────────────────
const FlagSKN = () => (
  <svg viewBox="0 0 20 14" width="18" height="13" style={{ borderRadius: 2, display: 'block' }}>
    <rect width="20" height="14" fill="#009E60" />
    <polygon points="0,0 20,0 20,5 0,5" fill="#CE1126" />
    <polygon points="0,9 20,9 20,14 0,14" fill="#CE1126" />
    <polygon points="0,0 13,7 0,14" fill="#000000" />
    <polygon points="0,0 11,7 0,14" fill="#FCD116" />
  </svg>
);
const FlagScot = () => (
  <svg viewBox="0 0 20 14" width="18" height="13" style={{ borderRadius: 2, display: 'block' }}>
    <rect width="20" height="14" fill="#003078" />
    <line x1="0" y1="0" x2="20" y2="14" stroke="white" strokeWidth="3" />
    <line x1="20" y1="0" x2="0" y2="14" stroke="white" strokeWidth="3" />
  </svg>
);
const FlagRO = () => (
  <svg viewBox="0 0 20 14" width="18" height="13" style={{ borderRadius: 2, display: 'block' }}>
    <rect width="7" height="14" fill="#002B7F" />
    <rect x="7" width="6" height="14" fill="#FCD116" />
    <rect x="13" width="7" height="14" fill="#CE1126" />
  </svg>
);
const FlagGY = () => (
  <svg viewBox="0 0 20 14" width="18" height="13" style={{ borderRadius: 2, display: 'block' }}>
    <rect width="20" height="14" fill="#009E60" />
    <polygon points="0,0 14,7 0,14" fill="white" />
    <polygon points="0,0 11,7 0,14" fill="#FCD116" />
    <polygon points="0,0 7,7 0,14" fill="black" />
    <polygon points="0,1 6,7 0,13" fill="#CE1126" />
  </svg>
);
const FlagBB = () => (
  <svg viewBox="0 0 20 14" width="18" height="13" style={{ borderRadius: 2, display: 'block' }}>
    <rect width="7" height="14" fill="#00267F" />
    <rect x="7" width="6" height="14" fill="#FFD100" />
    <rect x="13" width="7" height="14" fill="#00267F" />
  </svg>
);
const FLAGS = [FlagSKN, FlagScot, FlagRO, FlagGY, FlagBB];

// ── Icons ─────────────────────────────────────────────────────────────────────
function ChevDown({ size = 10, color = C.textMuted }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function SortIcon() {
  return (
    <svg width="8" height="9" viewBox="0 0 8 9" style={{ marginLeft: 4, opacity: 0.4, flexShrink: 0 }}>
      <polygon points="4,1 7,4 1,4" fill="currentColor" />
      <polygon points="4,8 7,5 1,5" fill="currentColor" />
    </svg>
  );
}

// ── Voter data ────────────────────────────────────────────────────────────────
const VOTERS = [
  { id:1,  voterId:'209719',  name:'Jany Nevs',   constituency:'02295', phone:'02295', email:'569', support:'Dabaa1040fhct', history:'Now Fittall', flagIdx:0 },
  { id:2,  voterId:'207115',  name:'Jany Mery',   constituency:'02295', phone:'02295', email:'699', support:'Dabaa1106fhct', history:'Now Fittall', flagIdx:1 },
  { id:3,  voterId:'203119',  name:'Jany Here',   constituency:'02295', phone:'02295', email:'699', support:'Dabaa1100fhct', history:'Now Fittall', flagIdx:2 },
  { id:4,  voterId:'201040',  name:'Jany Marnh',  constituency:'02265', phone:'02265', email:'690', support:'Dabaa1010fhct', history:'Now Fittall', flagIdx:3 },
  { id:5,  voterId:'2114177', name:'Jany Nans',   constituency:'02295', phone:'02295', email:'550', support:'Daba42 6oln',   history:'Now Fittall', flagIdx:4 },
  { id:6,  voterId:'2011779', name:'Jany Jeve',   constituency:'02295', phone:'02295', email:'204', support:'Daba34 9oln',   history:'Now Fittall', flagIdx:0 },
  { id:7,  voterId:'201338',  name:'Jany Aunn',   constituency:'02295', phone:'02295', email:'201', support:'Daba22 0oln',   history:'Now Fittall', flagIdx:1 },
  { id:8,  voterId:'127671',  name:'Jany Memd',   constituency:'02295', phone:'02295', email:'261', support:'Daba22 0oln',   history:'Now Fittall', flagIdx:2 },
  { id:9,  voterId:'1617409', name:'Jany Mern',   constituency:'02295', phone:'02295', email:'507', support:'Daba24 0oln',   history:'Now Fittall', flagIdx:3 },
  { id:10, voterId:'2571492', name:'Jany Mern',   constituency:'02295', phone:'02295', email:'100', support:'Daba22 9oln',   history:'Now Fittall', flagIdx:4 },
  { id:11, voterId:'292364',  name:'Jany Merrf',  constituency:'02295', phone:'02295', email:'008', support:'Daba42 9oln',   history:'Now Fittall', flagIdx:0 },
  { id:12, voterId:'291151',  name:'Jany Nevs',   constituency:'02295', phone:'02295', email:'069', support:'Daba22 9oln',   history:'Now Fittall', flagIdx:1 },
  { id:13, voterId:'2117519', name:'Jany Nany',   constituency:'02295', phone:'02295', email:'060', support:'Daba22 6oln',   history:'Now Fittall', flagIdx:2 },
];

// ── Shared btn style ──────────────────────────────────────────────────────────
const iconBtn: React.CSSProperties = {
  width: 30, height: 30, borderRadius: 6,
  backgroundColor: C.btnDark, border: `1px solid ${C.btnBorder}`,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};

export default function VotersPage() {
  const [selected, setSelected] = useState<number[]>([6, 9]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const toggle = (id: number) =>
    setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const allSel = VOTERS.every(v => selected.includes(v.id));
  const toggleAll = () => setSelected(allSel ? [] : VOTERS.map(v => v.id));

  // Which columns to show per breakpoint
  const showConstituency  = !isMobile;
  const showPhone         = !isMobile;
  const showEmail         = isDesktop;
  const showSupport       = !isMobile;
  const showHistory       = isDesktop;
  const showLastContacted = !isMobile;

  const px = isMobile ? 12 : isTablet ? 16 : 24;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.pageBg, fontFamily: "'Inter','Segoe UI',sans-serif", color: C.textWhite }}>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div style={{
        height: isMobile ? 48 : 50,
        backgroundColor: C.topBarBg,
        borderBottom: `1px solid ${C.borderSub}`,
        display: 'flex', alignItems: 'center',
        padding: `0 ${px}px`, gap: 12, flexShrink: 0,
        position: 'sticky', top: 0, zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <SKNFlag w={isMobile ? 18 : 22} h={isMobile ? 13 : 15} />
          <span style={{ fontWeight: 800, fontSize: isMobile ? 14 : 16, color: '#FFF', letterSpacing: '0.04em' }}>SKNLP</span>
        </div>

        {/* Breadcrumb — hide on mobile */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#C9D1D9' }}>Campaign 365</span>
            <span style={{ color: C.textMuted, fontSize: 13 }}>|</span>
            <span style={{ fontSize: 12, color: C.textMuted }}>Client Web Dashboard</span>
            <ChevDown size={9} />
          </div>
        )}

        {/* Search */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            backgroundColor: '#161B22', border: `1px solid ${C.btnBorder}`,
            borderRadius: 7, padding: isMobile ? '5px 10px' : '6px 13px',
            width: '100%', maxWidth: isMobile ? 200 : 320,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span style={{ fontSize: 13, color: C.textMuted }}>Voters</span>
          </div>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 14, flexShrink: 0 }}>
          {/* Search icon — hide on mobile (already have search bar) */}
          {!isMobile && (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          )}
          {/* Bell */}
          <div style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div style={{
              position: 'absolute', top: -5, right: -6,
              width: 15, height: 15, borderRadius: '50%',
              backgroundColor: '#F97316', color: 'white',
              fontSize: 8, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>7</div>
          </div>
          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            {!isMobile && <span style={{ fontSize: 13, fontWeight: 700, color: '#C9D1D9' }}>SKNLP</span>}
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              backgroundColor: C.red, overflow: 'hidden',
              border: `2px solid ${C.btnBorder}`, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src="https://i.pravatar.cc/56?img=52" alt="user"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display='none'; }} />
            </div>
            {!isMobile && <ChevDown size={10} />}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: isMobile ? '14px 12px' : isTablet ? '18px 16px' : '22px 24px' }}>

        {/* ── Title row ── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 12 : 0,
          marginBottom: isMobile ? 16 : 22,
        }}>
          <h1 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: C.red, margin: 0, letterSpacing: '-0.02em' }}>
            Voters List
          </h1>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: isMobile ? '8px 14px' : '9px 16px',
              backgroundColor: C.btnDark, border: `1px solid ${C.btnBorder}`,
              borderRight: 'none', borderRadius: '7px 0 0 7px',
              fontSize: 13, fontWeight: 600, color: '#C9D1D9',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Export List
            </button>
            <button style={{
              padding: '8px 9px', backgroundColor: C.btnDark,
              border: `1px solid ${C.btnBorder}`, borderRadius: '0 7px 7px 0',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
            }}>
              <ChevDown size={11} color="#8B949E" />
            </button>
          </div>
        </div>

        {/* ── Advanced Filters ── */}
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Advanced Filter
          </p>
          <div style={{
            display: 'flex', gap: 8,
            overflowX: 'auto', paddingBottom: 4,
            scrollbarWidth: 'none',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
          }}>
            {['Support Level', 'Constituency', 'Age Range', 'Last Contacted'].map(lbl => (
              <button key={lbl} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 13px', flexShrink: 0,
                backgroundColor: C.filterBg, border: `1px solid ${C.filterBorder}`,
                borderRadius: 6, fontSize: 13, fontWeight: 500, color: '#C9D1D9',
                cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
              }}>
                {lbl}
                <ChevDown size={9} color="#6E7681" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          marginBottom: 12,
          overflowX: isMobile ? 'auto' : 'visible',
          paddingBottom: isMobile ? 4 : 0,
          scrollbarWidth: 'none',
        }}>
          {/* Sort */}
          <button style={iconBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2">
              <line x1="4" y1="6" x2="11" y2="6"/><line x1="4" y1="12" x2="11" y2="12"/>
              <line x1="4" y1="18" x2="11" y2="18"/>
              <polyline points="15 8 18 5 21 8"/><line x1="18" y1="5" x2="18" y2="19"/>
            </svg>
          </button>
          {/* 11 */}
          <button style={{ ...iconBtn, width: 'auto', padding: '0 10px', fontSize: 13, fontWeight: 600, color: '#C9D1D9', fontFamily: 'inherit' }}>
            11
          </button>
          {/* Filter lines */}
          <button style={iconBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/>
              <line x1="9" y1="18" x2="15" y2="18"/>
            </svg>
          </button>
          {/* ID active */}
          <button style={{
            height: 30, padding: '0 12px', borderRadius: 6, flexShrink: 0,
            backgroundColor: '#E6EDF3', border: '1px solid #E6EDF3',
            fontSize: 12, fontWeight: 700, color: '#0D1117',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>ID</button>
          {/* Copy */}
          <button style={iconBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
          {/* Persliocs */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
            height: 30, padding: '0 10px', borderRadius: 6,
            backgroundColor: C.btnDark, border: `1px solid ${C.btnBorder}`,
            fontSize: 13, fontWeight: 500, color: '#C9D1D9',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Persliocs <ChevDown size={9} color="#6E7681" />
          </button>

          <div style={{ flex: 1, minWidth: isMobile ? 8 : 0 }} />

          {/* Quick Filters */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
            height: 30, padding: '0 12px', borderRadius: 6,
            backgroundColor: C.btnDark, border: `1px solid ${C.btnBorder}`,
            fontSize: isMobile ? 12 : 13, fontWeight: 600, color: '#C9D1D9',
            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>
            {isMobile ? 'Filters' : 'Quick Filters & Export'}
          </button>
        </div>

        {/* ── Table ── */}
        <div style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.tblBorder}` }}>
          {/* Horizontal scroll wrapper on mobile/tablet */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: isMobile ? 480 : isTablet ? 700 : 'auto', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: C.tblHeader }}>
                  <th style={{ padding: '10px 12px', width: 40, borderBottom: `1px solid ${C.tblBorder}` }}>
                    <input type="checkbox" checked={allSel} onChange={toggleAll}
                      style={{ accentColor: C.red, width: 13, height: 13, cursor: 'pointer' }} />
                  </th>
                  {/* # */}
                  <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>#</div></th>
                  {/* Voter ID */}
                  <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>Voter ID<SortIcon /></div></th>
                  {/* Name */}
                  <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>Name<SortIcon /></div></th>
                  {/* Constituency */}
                  {showConstituency && <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>Constituency<SortIcon /></div></th>}
                  {/* Phone */}
                  {showPhone && <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>Phone<SortIcon /></div></th>}
                  {/* Email */}
                  {showEmail && <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>Email<SortIcon /></div></th>}
                  {/* Support Level */}
                  {showSupport && <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>Support Level<SortIcon /></div></th>}
                  {/* Voting History */}
                  {showHistory && <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>Voting History<SortIcon /></div></th>}
                  {/* Last Contacted */}
                  {showLastContacted && <th style={thStyle}><div style={{ display: 'flex', alignItems: 'center' }}>Last Contacted<SortIcon /></div></th>}
                  {/* Actions */}
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {VOTERS.map((v, idx) => {
                  const isSel = selected.includes(v.id);
                  const Flag  = FLAGS[v.flagIdx];
                  const rowBg  = isSel ? C.tblSelected : (idx % 2 === 0 ? C.tblRow : C.tblRowAlt);
                  const txt    = isSel ? '#FFF' : C.textWhite;
                  const subTxt = isSel ? 'rgba(255,255,255,0.72)' : C.textGray;
                  const cellPad = isMobile ? '9px 11px' : '11px 12px';
                  return (
                    <tr key={v.id} onClick={() => toggle(v.id)} style={{
                      backgroundColor: rowBg,
                      borderBottom: `1px solid ${C.tblBorder}`,
                      cursor: 'pointer',
                    }}>
                      <td style={{ padding: isMobile ? '8px 12px' : '9px 12px' }}>
                        <input type="checkbox" checked={isSel} onChange={() => toggle(v.id)}
                          onClick={e => e.stopPropagation()}
                          style={{ accentColor: C.red, width: 13, height: 13, cursor: 'pointer' }} />
                      </td>
                      <td style={{ padding: cellPad, color: subTxt, fontSize: 13 }}>{v.id}</td>
                      <td style={{ padding: cellPad, color: txt, fontFamily: 'monospace', fontSize: 13, whiteSpace: 'nowrap' }}>{v.voterId}</td>
                      <td style={{ padding: cellPad, color: txt, fontWeight: 600, whiteSpace: 'nowrap', fontSize: 14 }}>{v.name}</td>
                      {showConstituency && <td style={{ padding: cellPad, color: subTxt, fontSize: 13 }}>{v.constituency}</td>}
                      {showPhone        && <td style={{ padding: cellPad, color: subTxt, fontFamily: 'monospace', fontSize: 13 }}>{v.phone}</td>}
                      {showEmail        && <td style={{ padding: cellPad, color: subTxt, fontFamily: 'monospace', fontSize: 13 }}>{v.email}</td>}
                      {showSupport      && <td style={{ padding: cellPad, color: subTxt, fontSize: 13, whiteSpace: 'nowrap' }}>{v.support}</td>}
                      {showHistory      && <td style={{ padding: cellPad, color: subTxt, fontSize: 13, whiteSpace: 'nowrap' }}>{v.history}</td>}
                      {showLastContacted && (
                        <td style={{ padding: cellPad }}>
                          <button onClick={e => e.stopPropagation()} style={{
                            padding: '4px 9px', borderRadius: 5,
                            backgroundColor: isSel ? 'rgba(255,255,255,0.15)' : C.btnDark,
                            border: `1px solid ${isSel ? 'rgba(255,255,255,0.25)' : C.btnBorder}`,
                            fontSize: 12, fontWeight: 500,
                            color: isSel ? '#FFF' : '#C9D1D9',
                            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
                          }}>Seeemin</button>
                        </td>
                      )}
                      <td style={{ padding: cellPad }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Flag />
                          <button onClick={e => e.stopPropagation()} style={{
                            width: 24, height: 24, borderRadius: 5,
                            backgroundColor: isSel ? 'rgba(255,255,255,0.15)' : C.btnDark,
                            border: `1px solid ${isSel ? 'rgba(255,255,255,0.2)' : C.btnBorder}`,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={isSel ? '#FFF' : '#8B949E'} strokeWidth="2.5">
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? 10 : 0,
            padding: isMobile ? '10px 12px' : '11px 16px',
            borderTop: `1px solid ${C.tblBorder}`,
            backgroundColor: C.tblHeader,
          }}>
            <span style={{ fontSize: 13, color: C.textMuted }}>
              Showing <strong style={{ color: '#C9D1D9' }}>1–{VOTERS.length}</strong> of <strong style={{ color: '#C9D1D9' }}>4,218</strong> voters
            </span>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {['‹', '1', '2', '3', '...', '42', '›'].map((p, i) => (
                <button key={i} style={{
                  width: 30, height: 30, borderRadius: 5,
                  backgroundColor: p === '1' ? C.red : C.btnDark,
                  border: `1px solid ${p === '1' ? C.red : C.btnBorder}`,
                  fontSize: 13, fontWeight: p === '1' ? 700 : 400,
                  color: p === '1' ? '#FFF' : '#8B949E',
                  cursor: 'pointer',
                }}>{p}</button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Table header cell style ────────────────────────────────────────────────────
const thStyle: React.CSSProperties = {
  padding: '11px 12px',
  textAlign: 'left',
  fontSize: 13, fontWeight: 700,
  color: '#C9D1D9',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  whiteSpace: 'nowrap',
};
