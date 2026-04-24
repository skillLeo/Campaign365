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

// ── Voter type ────────────────────────────────────────────────────────────────
interface ApiVoter {
  id: number;
  first_name: string;
  last_name: string;
  constituency: string | null;
  phone: string | null;
  email: string | null;
  sentiment: string | null;
  voting_history: string[] | null;
  last_contacted_at: string | null;
  do_not_contact: boolean;
}

const SENTIMENT_LABEL: Record<string, string> = {
  supporter: 'Supporter',
  undecided: 'Undecided',
  opposition: 'Opposition',
  unknown: 'Unknown',
};

// ── Shared btn style ──────────────────────────────────────────────────────────
const iconBtn: React.CSSProperties = {
  width: 30, height: 30, borderRadius: 6,
  backgroundColor: C.btnDark, border: `1px solid ${C.btnBorder}`,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};

const EMPTY_FORM = {
  first_name: '', last_name: '', address: '',
  constituency: '', phone: '', email: '',
  age: '', gender: '', sentiment: 'unknown',
};

export default function VotersPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voters, setVoters] = useState<ApiVoter[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  useEffect(() => {
    const token = localStorage.getItem('c365_token');
    if (!token) return;
    const tenantKey = localStorage.getItem('c365_tenant') || 'sknlp';
    const params = new URLSearchParams({ page: String(page), per_page: '15' });
    if (search) params.set('search', search);

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/voters?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'X-Tenant-Subdomain': tenantKey,
      },
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setVoters(data.data ?? []);
          setTotal(data.meta?.total ?? data.data?.length ?? 0);
        }
      })
      .catch(() => { /* keep empty */ })
      .finally(() => setLoading(false));
  }, [page, search, refreshKey]);

  const handleAddVoter = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      const token = localStorage.getItem('c365_token');
      const tenantKey = localStorage.getItem('c365_tenant') || 'sknlp';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/voters`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Tenant-Subdomain': tenantKey,
        },
        body: JSON.stringify({
          ...form,
          age: form.age ? parseInt(form.age) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.error || Object.values(data.errors ?? {})[0] as string || 'Failed to add voter');
        return;
      }
      // Success — close modal, refresh list
      setShowAddModal(false);
      setForm({ ...EMPTY_FORM });
      setPage(1);
      setRefreshKey(k => k + 1);
    } catch {
      setFormError('Connection error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggle = (id: number) =>
    setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const allSel = voters.length > 0 && voters.every(v => selected.includes(v.id));
  const toggleAll = () => setSelected(allSel ? [] : voters.map(v => v.id));

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
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search voters…"
              style={{
                background: 'none', border: 'none', outline: 'none',
                fontSize: 13, color: C.textWhite,
                fontFamily: 'inherit', flex: 1, minWidth: 0,
              }}
            />
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
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
            {/* Add Voter button */}
            <button
              onClick={() => { setShowAddModal(true); setFormError(''); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: isMobile ? '8px 14px' : '9px 18px',
                backgroundColor: C.red, border: 'none',
                borderRadius: 7,
                fontSize: 13, fontWeight: 700, color: '#FFF',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              {isMobile ? 'Add' : 'Add Voter'}
            </button>
            {/* Export button */}
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
              Export
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
                {loading && (
                  <tr>
                    <td colSpan={10} style={{ padding: '32px', textAlign: 'center', color: C.textMuted, fontSize: 14 }}>
                      Loading voters…
                    </td>
                  </tr>
                )}
                {!loading && voters.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ padding: '32px', textAlign: 'center', color: C.textMuted, fontSize: 14 }}>
                      No voters found
                    </td>
                  </tr>
                )}
                {!loading && voters.map((v, idx) => {
                  const isSel = selected.includes(v.id);
                  const Flag  = FLAGS[idx % FLAGS.length];
                  const rowBg  = isSel ? C.tblSelected : (idx % 2 === 0 ? C.tblRow : C.tblRowAlt);
                  const txt    = isSel ? '#FFF' : C.textWhite;
                  const subTxt = isSel ? 'rgba(255,255,255,0.72)' : C.textGray;
                  const cellPad = isMobile ? '9px 11px' : '11px 12px';
                  const fullName = `${v.first_name} ${v.last_name}`;
                  const sentimentLabel = SENTIMENT_LABEL[v.sentiment || 'unknown'] || 'Unknown';
                  const historyLabel = Array.isArray(v.voting_history) && v.voting_history.length
                    ? v.voting_history.slice(-1)[0] : '—';
                  const lastContacted = v.last_contacted_at
                    ? new Date(v.last_contacted_at).toLocaleDateString()
                    : 'Never';
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
                      <td style={{ padding: cellPad, color: subTxt, fontSize: 13 }}>{(page - 1) * 15 + idx + 1}</td>
                      <td style={{ padding: cellPad, color: txt, fontFamily: 'monospace', fontSize: 13, whiteSpace: 'nowrap' }}>#{v.id}</td>
                      <td style={{ padding: cellPad, color: txt, fontWeight: 600, whiteSpace: 'nowrap', fontSize: 14 }}>{fullName}</td>
                      {showConstituency && <td style={{ padding: cellPad, color: subTxt, fontSize: 13 }}>{v.constituency || '—'}</td>}
                      {showPhone        && <td style={{ padding: cellPad, color: subTxt, fontFamily: 'monospace', fontSize: 13 }}>{v.phone || '—'}</td>}
                      {showEmail        && <td style={{ padding: cellPad, color: subTxt, fontFamily: 'monospace', fontSize: 13 }}>{v.email || '—'}</td>}
                      {showSupport      && (
                        <td style={{ padding: cellPad }}>
                          <span style={{
                            padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                            backgroundColor: v.sentiment === 'supporter' ? 'rgba(74,222,128,0.15)'
                              : v.sentiment === 'opposition' ? 'rgba(220,20,60,0.2)'
                              : v.sentiment === 'undecided' ? 'rgba(251,191,36,0.15)'
                              : 'rgba(139,148,158,0.2)',
                            color: v.sentiment === 'supporter' ? '#4ADE80'
                              : v.sentiment === 'opposition' ? '#F87171'
                              : v.sentiment === 'undecided' ? '#FCD34D'
                              : C.textGray,
                          }}>{sentimentLabel}</span>
                        </td>
                      )}
                      {showHistory      && <td style={{ padding: cellPad, color: subTxt, fontSize: 13, whiteSpace: 'nowrap' }}>{historyLabel}</td>}
                      {showLastContacted && (
                        <td style={{ padding: cellPad }}>
                          <span style={{ fontSize: 12, color: isSel ? '#FFF' : '#C9D1D9', whiteSpace: 'nowrap' }}>
                            {lastContacted}
                          </span>
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
          {(() => {
            const perPage = 15;
            const totalPages = Math.max(1, Math.ceil(total / perPage));
            const from = (page - 1) * perPage + 1;
            const to   = Math.min(page * perPage, total);
            const pageNums: (number | string)[] = [];
            if (totalPages <= 6) {
              for (let i = 1; i <= totalPages; i++) pageNums.push(i);
            } else {
              pageNums.push(1, 2);
              if (page > 4) pageNums.push('…');
              if (page > 2 && page < totalPages - 1) pageNums.push(page);
              if (page < totalPages - 2) pageNums.push('…');
              pageNums.push(totalPages - 1, totalPages);
            }
            return (
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
                  Showing <strong style={{ color: '#C9D1D9' }}>{total > 0 ? `${from}–${to}` : '0'}</strong> of{' '}
                  <strong style={{ color: '#C9D1D9' }}>{total.toLocaleString()}</strong> voters
                </span>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    style={{ width: 30, height: 30, borderRadius: 5, backgroundColor: C.btnDark, border: `1px solid ${C.btnBorder}`, fontSize: 13, color: page === 1 ? C.textMuted : '#8B949E', cursor: page === 1 ? 'default' : 'pointer' }}>
                    ‹
                  </button>
                  {pageNums.map((p, i) => (
                    <button key={i}
                      onClick={() => typeof p === 'number' && setPage(p)}
                      style={{
                        width: 30, height: 30, borderRadius: 5,
                        backgroundColor: p === page ? C.red : C.btnDark,
                        border: `1px solid ${p === page ? C.red : C.btnBorder}`,
                        fontSize: 13, fontWeight: p === page ? 700 : 400,
                        color: p === page ? '#FFF' : '#8B949E',
                        cursor: typeof p === 'number' ? 'pointer' : 'default',
                      }}>{p}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    style={{ width: 30, height: 30, borderRadius: 5, backgroundColor: C.btnDark, border: `1px solid ${C.btnBorder}`, fontSize: 13, color: page === totalPages ? C.textMuted : '#8B949E', cursor: page === totalPages ? 'default' : 'pointer' }}>
                    ›
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

      </div>

      {/* ── Add Voter Modal ─────────────────────────────────────────────────── */}
      {showAddModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
          onClick={e => { if (e.target === e.currentTarget) setShowAddModal(false); }}
        >
          <div style={{
            backgroundColor: '#161B22',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            width: '100%', maxWidth: 520,
            maxHeight: '90vh', overflowY: 'auto',
            padding: '28px 28px 24px',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#E6EDF3', margin: 0 }}>
                Add New Voter
              </h2>
              <button onClick={() => setShowAddModal(false)} style={{
                width: 32, height: 32, borderRadius: 6,
                backgroundColor: '#21262D', border: '1px solid #30363D',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {formError && (
              <div style={{ background: 'rgba(220,20,60,0.15)', border: '1px solid rgba(220,20,60,0.4)', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
                <p style={{ color: '#F87171', fontSize: 13, margin: 0 }}>{formError}</p>
              </div>
            )}

            <form onSubmit={handleAddVoter} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Row: First + Last name */}
              <div className="rg-2" style={{ gap: 12 }}>
                {[
                  { key: 'first_name', label: 'First Name', placeholder: 'John', required: true },
                  { key: 'last_name',  label: 'Last Name',  placeholder: 'Doe',  required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#8B949E', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {f.label} {f.required && <span style={{ color: C.red }}>*</span>}
                    </label>
                    <input
                      required={f.required}
                      value={(form as any)[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>

              {/* Address */}
              <div>
                <label style={labelStyle}>Address <span style={{ color: C.red }}>*</span></label>
                <input required value={form.address}
                  onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                  placeholder="123 Main Street, Basseterre"
                  style={inputStyle} />
              </div>

              {/* Row: Constituency + Phone */}
              <div className="rg-2" style={{ gap: 12 }}>
                <div>
                  <label style={labelStyle}>Constituency</label>
                  <input value={form.constituency}
                    onChange={e => setForm(p => ({ ...p, constituency: e.target.value }))}
                    placeholder="St. Christopher 1"
                    style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+1 869 555 0100"
                    style={inputStyle} />
                </div>
              </div>

              {/* Row: Email + Age */}
              <div className="rg-2" style={{ gap: 12 }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="voter@email.com"
                    style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Age</label>
                  <input type="number" min="18" max="120" value={form.age}
                    onChange={e => setForm(p => ({ ...p, age: e.target.value }))}
                    placeholder="35"
                    style={inputStyle} />
                </div>
              </div>

              {/* Row: Gender + Sentiment */}
              <div className="rg-2" style={{ gap: 12 }}>
                <div>
                  <label style={labelStyle}>Gender</label>
                  <select value={form.gender}
                    onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}
                    style={{ ...inputStyle, appearance: 'none' as any }}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Support Level</label>
                  <select value={form.sentiment}
                    onChange={e => setForm(p => ({ ...p, sentiment: e.target.value }))}
                    style={{ ...inputStyle, appearance: 'none' as any }}>
                    <option value="unknown">Unknown</option>
                    <option value="supporter">Supporter</option>
                    <option value="undecided">Undecided</option>
                    <option value="opposition">Opposition</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{
                  flex: 1, padding: '11px', borderRadius: 7,
                  backgroundColor: '#21262D', border: '1px solid #30363D',
                  fontSize: 14, fontWeight: 600, color: '#C9D1D9',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} style={{
                  flex: 2, padding: '11px', borderRadius: 7, border: 'none',
                  backgroundColor: saving ? '#8B1A1A' : C.red,
                  fontSize: 14, fontWeight: 700, color: '#FFF',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  {saving && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                      style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                  )}
                  {saving ? 'Saving…' : 'Add Voter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
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

// ── Modal form styles ─────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  backgroundColor: '#0D1117',
  border: '1px solid #30363D',
  borderRadius: 7,
  padding: '9px 12px',
  fontSize: 13, color: '#E6EDF3',
  fontFamily: "'Inter','Segoe UI',sans-serif",
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12, fontWeight: 600,
  color: '#8B949E',
  marginBottom: 5,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};
