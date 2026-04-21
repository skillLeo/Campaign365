'use client';
import { useState, useEffect } from 'react';

// ── Person Face Avatar — photo-realistic SVG faces ────────────────────────────
function PersonAvatar({ n, sz = 46 }: { n: number; sz?: number }) {
  // Each config: photo-realistic skin gradient, natural hair, shirt collar
  const configs = [
    // 0: Middle-aged man, light skin, silver-grey hair (Canvasser)
    { skinL: '#D4A882', skinD: '#B8845A', hairTop: '#8A8A8A', hairSide: '#707070',
      bg: '#1A2840', shirt: '#2E4A7A', beard: false, glasses: false, female: false },
    // 1: Black man, dark skin, short natural hair (Runner)
    { skinL: '#6B4030', skinD: '#4A2818', hairTop: '#0A0808', hairSide: '#080606',
      bg: '#0E1E10', shirt: '#1A4A28', beard: false, glasses: false, female: false },
    // 2: Older man, brown skin, grey-brown hair (St. Kitts Nevis)
    { skinL: '#8B6040', skinD: '#6A4428', hairTop: '#4A3828', hairSide: '#3A2A1A',
      bg: '#1A1420', shirt: '#3A1A4A', beard: true, glasses: false, female: false },
    // 3: Bald man, medium-dark skin (Cluster Manager)
    { skinL: '#9A7050', skinD: '#785438', hairTop: '#1A1210', hairSide: '#1A1210',
      bg: '#101830', shirt: '#1E3A6A', beard: false, glasses: false, female: false },
    // 4: Young man, medium brown skin, dark hair (Runner row3)
    { skinL: '#C07840', skinD: '#9A5828', hairTop: '#180E08', hairSide: '#140C06',
      bg: '#220C18', shirt: '#8B1818', beard: false, glasses: false, female: false },
    // 5: Man, lighter medium skin, brown hair (Cluster Manager row3)
    { skinL: '#D4A068', skinD: '#B07840', hairTop: '#3A2010', hairSide: '#2E180A',
      bg: '#102030', shirt: '#1A3A5A', beard: false, glasses: false, female: false },
    // 6: Woman, dark warm skin, natural hair (Splh Party)
    { skinL: '#7A5038', skinD: '#5A3420', hairTop: '#0E0A08', hairSide: '#0A0806',
      bg: '#18102A', shirt: '#4A1A7A', beard: false, glasses: false, female: true },
    // 7: Person, light-medium skin, light hair (Vaicen)
    { skinL: '#DEB878', skinD: '#C09050', hairTop: '#8A6030', hairSide: '#705022',
      bg: '#0C2218', shirt: '#1A5030', beard: false, glasses: false, female: false },
    // 8: Man, olive skin, dark hair (PotriY SKNLP)
    { skinL: '#C09060', skinD: '#9A6838', hairTop: '#1E1208', hairSide: '#180E06',
      bg: '#200808', shirt: '#7A1818', beard: true, glasses: false, female: false },
    // 9: Man, dark brown skin, black hair (Colten)
    { skinL: '#6A4228', skinD: '#4A2A18', hairTop: '#0C0A08', hairSide: '#080806',
      bg: '#101428', shirt: '#1A1A5A', beard: false, glasses: true, female: false },
  ];
  const c = configs[n % configs.length];
  const uid = `av_${n}`;

  return (
    <svg viewBox="0 0 100 100" width={sz} height={sz}
      style={{ display: 'block', borderRadius: '50%', flexShrink: 0 }}>
      <defs>
        <radialGradient id={`${uid}_skin`} cx="45%" cy="40%" r="60%">
          <stop offset="0%"   stopColor={c.skinL} />
          <stop offset="100%" stopColor={c.skinD} />
        </radialGradient>
        <radialGradient id={`${uid}_bg`} cx="50%" cy="30%" r="70%">
          <stop offset="0%"   stopColor={c.bg} stopOpacity="0.7" />
          <stop offset="100%" stopColor={c.bg} />
        </radialGradient>
        <clipPath id={`${uid}_clip`}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      {/* Background */}
      <circle cx="50" cy="50" r="50" fill={c.bg} />

      <g clipPath={`url(#${uid}_clip)`}>
        {/* Shirt / shoulders */}
        <ellipse cx="50" cy="108" rx="50" ry="36" fill={c.shirt} />
        {/* Collar */}
        {!c.female && (
          <>
            <rect x="44" y="82" width="5" height="18" fill="white" opacity="0.85" />
            <rect x="51" y="82" width="5" height="18" fill="white" opacity="0.85" />
          </>
        )}

        {/* Neck */}
        <rect x="42" y="74" width="16" height="16" fill={`url(#${uid}_skin)`} />

        {/* Head */}
        <ellipse cx="50" cy="54" rx="26" ry="28" fill={`url(#${uid}_skin)`} />

        {/* Hair top */}
        <ellipse cx="50" cy="30" rx={c.female ? 28 : 26} ry={c.female ? 16 : 11}
          fill={c.hairTop} />
        {/* Hair sides */}
        <ellipse cx="25" cy="48" rx="5" ry={c.female ? 18 : 14} fill={c.hairSide} />
        <ellipse cx="75" cy="48" rx="5" ry={c.female ? 18 : 14} fill={c.hairSide} />
        {/* Female longer hair */}
        {c.female && (
          <>
            <ellipse cx="22" cy="65" rx="7" ry="18" fill={c.hairSide} />
            <ellipse cx="78" cy="65" rx="7" ry="18" fill={c.hairSide} />
          </>
        )}

        {/* Ear shadow */}
        <ellipse cx="24" cy="55" rx="4" ry="5" fill={c.skinD} />
        <ellipse cx="76" cy="55" rx="4" ry="5" fill={c.skinD} />

        {/* Eyebrows */}
        <path d="M33,46 Q39,43 45,46" stroke={c.hairTop} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M55,46 Q61,43 67,46" stroke={c.hairTop} strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Eyes — whites */}
        <ellipse cx="38" cy="52" rx="6" ry="5.5" fill="white" />
        <ellipse cx="62" cy="52" rx="6" ry="5.5" fill="white" />
        {/* Iris */}
        <circle cx="39" cy="53" r="3.8" fill={c.hairTop} />
        <circle cx="63" cy="53" r="3.8" fill={c.hairTop} />
        {/* Pupil */}
        <circle cx="39.5" cy="53" r="2" fill="#0A0808" />
        <circle cx="63.5" cy="53" r="2" fill="#0A0808" />
        {/* Eye shine */}
        <circle cx="41" cy="51.5" r="1.2" fill="white" opacity="0.85" />
        <circle cx="65" cy="51.5" r="1.2" fill="white" opacity="0.85" />
        {/* Eyelids top */}
        <path d="M32,49 Q38,46 44,49" stroke={c.skinD} strokeWidth="1" fill="none" />
        <path d="M56,49 Q62,46 68,49" stroke={c.skinD} strokeWidth="1" fill="none" />

        {/* Glasses */}
        {c.glasses && (
          <>
            <rect x="30" y="47.5" width="16" height="11" rx="4" fill="none"
              stroke="#555" strokeWidth="1.8" />
            <rect x="54" y="47.5" width="16" height="11" rx="4" fill="none"
              stroke="#555" strokeWidth="1.8" />
            <line x1="46" y1="52.5" x2="54" y2="52.5" stroke="#555" strokeWidth="1.5" />
            <line x1="20" y1="51" x2="30" y2="52" stroke="#555" strokeWidth="1.5" />
            <line x1="70" y1="52" x2="80" y2="51" stroke="#555" strokeWidth="1.5" />
          </>
        )}

        {/* Nose */}
        <path d="M46,62 Q48,68 50,68 Q52,68 54,62" stroke={c.skinD} strokeWidth="1.2"
          fill="none" strokeLinecap="round" />
        <ellipse cx="46" cy="66" rx="3" ry="2" fill={c.skinD} opacity="0.4" />
        <ellipse cx="54" cy="66" rx="3" ry="2" fill={c.skinD} opacity="0.4" />

        {/* Mouth */}
        <path d="M40,73 Q50,79 60,73" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8"
          fill="none" strokeLinecap="round" />
        {/* Lip line */}
        <path d="M42,73 Q50,70 58,73" stroke="rgba(0,0,0,0.15)" strokeWidth="1"
          fill="none" />

        {/* Beard */}
        {c.beard && (
          <ellipse cx="50" cy="76" rx="20" ry="8" fill={c.hairTop} opacity="0.6" />
        )}

        {/* Subtle face shading */}
        <ellipse cx="34" cy="62" rx="6" ry="8" fill={c.skinD} opacity="0.15" />
        <ellipse cx="66" cy="62" rx="6" ry="8" fill={c.skinD} opacity="0.15" />
      </g>
    </svg>
  );
}

// ── Mini Dark Street Map with Red Route ──────────────────────────────────────
function MiniMap({ seed = 0 }: { seed?: number }) {
  // Different route paths per row seed
  const routes = [
    { d: 'M6,72 C14,64 22,58 32,50 C42,42 54,34 66,26 C74,20 80,16 86,12', ex: 86, ey: 12 },
    { d: 'M6,68 C18,60 30,54 42,46 C52,38 62,30 72,22 C78,18 84,14 88,10', ex: 88, ey: 10 },
    { d: 'M6,74 C16,66 26,60 38,52 C50,44 60,36 70,28 C78,22 84,16 88,12', ex: 88, ey: 12 },
    { d: 'M6,70 C18,62 28,56 40,48 C52,40 62,32 72,24 C80,18 86,14 88,11', ex: 88, ey: 11 },
    { d: 'M6,66 C16,58 28,52 40,44 C52,36 62,28 72,22 C80,16 86,12 88,8',  ex: 88, ey: 8  },
  ];
  const { d, ex, ey } = routes[seed % routes.length];

  return (
    <div style={{ flex: '0 0 92px', borderRadius: '0 7px 7px 0', overflow: 'hidden' }}>
      <svg viewBox="0 0 94 78" width="94" height="100%" preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}>
        {/* Dark base — like dark map tiles */}
        <rect width="94" height="78" fill="#0D1525" />

        {/* City blocks — slightly lighter rectangles */}
        <rect x="0"  y="0"  width="18" height="14" fill="#111E30" />
        <rect x="20" y="0"  width="22" height="14" fill="#0F1C2C" />
        <rect x="44" y="0"  width="18" height="14" fill="#111E30" />
        <rect x="64" y="0"  width="16" height="14" fill="#0F1C2C" />
        <rect x="0"  y="16" width="18" height="16" fill="#0F1C2C" />
        <rect x="20" y="16" width="22" height="16" fill="#111E30" />
        <rect x="44" y="16" width="18" height="16" fill="#111E30" />
        <rect x="64" y="16" width="16" height="16" fill="#0F1C2C" />
        <rect x="82" y="0"  width="12" height="30" fill="#111E30" />
        <rect x="0"  y="34" width="18" height="16" fill="#111E30" />
        <rect x="20" y="34" width="22" height="16" fill="#0F1C2C" />
        <rect x="44" y="34" width="18" height="16" fill="#0F1C2C" />
        <rect x="64" y="34" width="16" height="16" fill="#111E30" />
        <rect x="82" y="32" width="12" height="18" fill="#0F1C2C" />
        <rect x="0"  y="52" width="18" height="26" fill="#0F1C2C" />
        <rect x="20" y="52" width="22" height="26" fill="#111E30" />
        <rect x="44" y="52" width="18" height="26" fill="#0F1C2C" />
        <rect x="64" y="52" width="16" height="26" fill="#111E30" />
        <rect x="82" y="52" width="12" height="26" fill="#0F1C2C" />

        {/* Major roads — horizontal (slightly lighter grey) */}
        <rect x="0" y="14" width="94" height="2" fill="#1A2C44" />
        <rect x="0" y="32" width="94" height="2.5" fill="#1E3250" />
        <rect x="0" y="50" width="94" height="2" fill="#1A2C44" />

        {/* Major roads — vertical */}
        <rect x="18" y="0" width="2"   height="78" fill="#1A2C44" />
        <rect x="42" y="0" width="2.5" height="78" fill="#1E3250" />
        <rect x="62" y="0" width="2"   height="78" fill="#1A2C44" />
        <rect x="80" y="0" width="2"   height="78" fill="#1A2C44" />

        {/* Minor roads — thinner */}
        <rect x="0" y="23" width="94" height="1" fill="#162238" />
        <rect x="0" y="42" width="94" height="1" fill="#162238" />
        <rect x="0" y="62" width="94" height="1" fill="#162238" />
        <rect x="30" y="0" width="1" height="78" fill="#162238" />
        <rect x="52" y="0" width="1" height="78" fill="#162238" />
        <rect x="72" y="0" width="1" height="78" fill="#162238" />

        {/* Diagonal avenue */}
        <line x1="0" y1="40" x2="50" y2="0"   stroke="#162238" strokeWidth="1.5" />
        <line x1="44" y1="78" x2="94" y2="38"  stroke="#162238" strokeWidth="1.5" />

        {/* Red route — outer glow */}
        <path d={d} stroke="#AA0000" strokeWidth="6" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
        {/* Red route — mid glow */}
        <path d={d} stroke="#DD1111" strokeWidth="3.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        {/* Red route — crisp line */}
        <path d={d} stroke="#FF3333" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round" />

        {/* End marker — glow halo */}
        <circle cx={ex} cy={ey} r={8}  fill="#FF0000" opacity="0.25" />
        <circle cx={ex} cy={ey} r={5}  fill="#FF2222" opacity="0.6" />
        <circle cx={ex} cy={ey} r={3.5} fill="#FF4444" />
        <circle cx={ex} cy={ey} r={1.8} fill="white" />
      </svg>
    </div>
  );
}

// ── Caribbean Flag Circles ────────────────────────────────────────────────────
type FlagType = 'skn' | 'ag' | 'jm' | 'tt' | 'bb';

function FlagCircle({ type }: { type: FlagType }) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #0F172A' }}>
      <svg viewBox="0 0 30 30" width="28" height="28">
        {type === 'skn' && (
          <>
            <polygon points="0,30 30,30 0,0"    fill="#009E60" />
            <polygon points="30,0 30,30 0,0"    fill="#CC1126" />
            <polygon points="0,0 24,30 30,30 6,0"  fill="#000000" />
            <polygon points="0,0 3,0 27,30 24,30" fill="#FCD116" />
            <polygon points="6,0 9,0 30,27 30,30 27,30" fill="#FCD116" />
            <polygon points="10,6 11.5,10.5 16,10.5 12.5,13 14,17.5 10,15 6,17.5 7.5,13 4,10.5 8.5,10.5"
              fill="white" transform="translate(1,4) scale(0.55)" />
            <polygon points="10,6 11.5,10.5 16,10.5 12.5,13 14,17.5 10,15 6,17.5 7.5,13 4,10.5 8.5,10.5"
              fill="white" transform="translate(12,14) scale(0.55)" />
          </>
        )}
        {type === 'ag' && (
          <>
            <rect width="30" height="30" fill="#CE1126" />
            <polygon points="15,2 30,28 0,28" fill="#000000" />
            <polygon points="15,5 28,27 2,27"  fill="#0073CF" />
            <polygon points="15,10 24,27 6,27"  fill="#FFFFFF" />
            <polygon points="15,13 22,27 8,27"  fill="#CE1126" />
            <polygon points="15,10 16.5,15 21,15 17.5,17.5 19,22 15,19.5 11,22 12.5,17.5 9,15 13.5,15"
              fill="#FCD116" />
          </>
        )}
        {type === 'jm' && (
          <>
            <polygon points="0,0 30,0 15,15"    fill="#009B3A" />
            <polygon points="0,30 30,30 15,15"  fill="#009B3A" />
            <polygon points="0,0 15,15 0,30"    fill="#000000" />
            <polygon points="30,0 15,15 30,30"  fill="#000000" />
            <line x1="0" y1="0" x2="30" y2="30" stroke="#FED100" strokeWidth="5" />
            <line x1="30" y1="0" x2="0" y2="30" stroke="#FED100" strokeWidth="5" />
            <polygon points="0,0 30,0 15,12"    fill="#009B3A" />
            <polygon points="0,30 30,30 15,18"  fill="#009B3A" />
            <polygon points="0,0 12,15 0,30"    fill="#000000" />
            <polygon points="30,0 18,15 30,30"  fill="#000000" />
          </>
        )}
        {type === 'tt' && (
          <>
            <rect width="30" height="30" fill="#CE1126" />
            <polygon points="4,0 16,0 26,30 14,30" fill="#000000" />
            <polygon points="4,0 7,0 17,30 14,30" fill="#FFFFFF" />
            <polygon points="13,0 16,0 26,30 23,30" fill="#FFFFFF" />
          </>
        )}
        {type === 'bb' && (
          <>
            <rect x="0"  y="0" width="10" height="30" fill="#00267F" />
            <rect x="10" y="0" width="10" height="30" fill="#FFC726" />
            <rect x="20" y="0" width="10" height="30" fill="#00267F" />
            {/* Trident */}
            <line x1="15" y1="8"  x2="15" y2="22" stroke="#00267F" strokeWidth="1.5" />
            <line x1="12" y1="8"  x2="12" y2="16" stroke="#00267F" strokeWidth="1.5" />
            <line x1="18" y1="8"  x2="18" y2="16" stroke="#00267F" strokeWidth="1.5" />
            <line x1="12" y1="8"  x2="15" y2="12" stroke="#00267F" strokeWidth="1.5" />
            <line x1="18" y1="8"  x2="15" y2="12" stroke="#00267F" strokeWidth="1.5" />
          </>
        )}
      </svg>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TEAM_ROWS = [
  {
    p1: { n: 0, name: 'Canvasser',       sub: 'Iucter',                   showStatus: false },
    p2: { n: 1, name: 'Runner',          sub: 'Ivacre',                   showStatus: false },
    col3: { title: 'Honin Manager',      subtitle: 'Constituencies' },
  },
  {
    p1: { n: 2, name: 'St. Kitts Nevis', sub: 'Online • Last Sync 3m ago', showStatus: true },
    p2: { n: 3, name: 'Cluster Manager', sub: 'Online • Last Sync 3m ago', showStatus: true },
    col3: { title: 'Flin Rerarh',        subtitle: 'Rolus' },
  },
  {
    p1: { n: 4, name: 'Runner',          sub: 'Online • Last Sync 3m ago', showStatus: true },
    p2: { n: 5, name: 'Cluster Manager', sub: 'Online • Last Sync 3m ago', showStatus: true },
    col3: { title: 'Hopin Manager',      subtitle: 'Oolus' },
  },
  {
    p1: { n: 6, name: 'Splh Party',      sub: 'Online • Last Sync 3m ago', showStatus: true },
    p2: { n: 7, name: 'Vaicen',          sub: 'Online • Last Sync 3m ago', showStatus: true },
    col3: { title: 'Hopin Buakger',      subtitle: 'Relus' },
  },
  {
    p1: { n: 8, name: 'PotriY SKNLP',   sub: 'Online • Last Sync 3m ago', showStatus: true },
    p2: { n: 9, name: 'Colten',          sub: 'Online • Last Sync 3m ago', showStatus: true },
    col3: { title: 'Png Chiup',          subtitle: 'Condory' },
  },
];

const TABLE_ROWS: {
  flag: FlagType; avatarIds: number[];
  role: string; turf: string; today: string; status: string;
}[] = [
  { flag: 'skn', avatarIds: [0,1,2,3,4], role: 'SKNLP', turf: 'St. Kitts Nevis Labour',       today: '#065.201', status: '2 Mian' },
  { flag: 'ag',  avatarIds: [5,6,7,8,0], role: 'SKNLP', turf: 'St. Kitts Nevis Labour Party',  today: '#465 202', status: '3 Mian' },
  { flag: 'jm',  avatarIds: [2,3,4,5,6], role: 'SKNLP', turf: 'St. Kitts Nevis LParty',        today: '#025.203', status: '4 Mian' },
  { flag: 'tt',  avatarIds: [7,8,9,0,1], role: 'SKNLP', turf: 'Jt. Kitts Nevis Labour Party',  today: '#495 206', status: '2 Mian' },
  { flag: 'bb',  avatarIds: [3,4,5,6,7], role: 'SKNLP', turf: 'Kitts Nevis Labour Party',      today: '#199.209', status: '2 Mian' },
];

const TABS = ['All Members', 'Online Now', 'By Role'] as const;

const CARD: React.CSSProperties = {
  backgroundColor: '#161D2E',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.06)',
};

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  roles: Array<{ name: string }>;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('All Members');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('c365_token');
    if (!token) return;
    const tenantKey = localStorage.getItem('c365_tenant') || 'sknlp';
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/team?per_page=50`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'X-Tenant-Subdomain': tenantKey,
      },
    })
      .then(r => r.json())
      .then(data => { if (data.success) setMembers(data.data ?? []); })
      .catch(() => {})
      .finally(() => setLoadingMembers(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'rgb(11, 19, 32)', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Crimson red header bar ── */}
      <div style={{
        background: '#7C1A1A',
        padding: '15px 24px',
        display: 'flex', alignItems: 'center',
      }}>
        <h1 style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 800, fontSize: 22,
          color: '#FFFFFF', margin: 0,
          letterSpacing: '0.005em',
        }}>
          Team Management &amp; Roles
        </h1>
      </div>

      {/* ── Tab bar ── */}
      <div style={{
        backgroundColor: '#111827',
        padding: '0 24px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '12px 20px 13px',
              border: 'none', background: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              color: activeTab === tab ? '#FFFFFF' : '#6B7280',
              borderBottom: activeTab === tab
                ? '2.5px solid #DC2626' : '2.5px solid transparent',
              transition: 'color 0.15s',
            }}>
              {tab}
            </button>
          ))}
        </div>
        {/* Hire button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 6,
            backgroundColor: '#1E2A3E',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <button style={{
            padding: '7px 18px', borderRadius: 7,
            border: '1px solid rgba(255,255,255,0.14)',
            backgroundColor: '#1E2A3E', color: '#E2E8F0',
            fontSize: 12, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Hire Tash
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ padding: '14px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* ── Team member grid — 5 rows × 4 cols ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {TEAM_ROWS.map((row, ri) => (
            <div key={ri} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: 4,
              minHeight: 65,
              maxHeight: 65,
            }}>
              {/* ── Person card 1 ── */}
              <div style={{ ...CARD, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 9, overflow: 'hidden' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <PersonAvatar n={row.p1.n} sz={42} />
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: '50%',
                    backgroundColor: '#22C55E',
                    border: '2px solid #161D2E',
                  }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: 14, fontWeight: 700, color: '#FFFFFF',
                    margin: 0, lineHeight: 1.3,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{row.p1.name}</p>
                  <p style={{
                    fontSize: 11,
                    color: row.p1.showStatus ? '#FFFFFF' : '#8892A4',
                    margin: 0, lineHeight: 1.3,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    {row.p1.showStatus && (
                      <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0 }} />
                    )}
                    {row.p1.sub}
                  </p>
                </div>
              </div>

              {/* ── Person card 2 ── */}
              <div style={{ ...CARD, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 9, overflow: 'hidden' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <PersonAvatar n={row.p2.n} sz={42} />
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: '50%',
                    backgroundColor: '#22C55E',
                    border: '2px solid #161D2E',
                  }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: 14, fontWeight: 700, color: '#FFFFFF',
                    margin: 0, lineHeight: 1.3,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{row.p2.name}</p>
                  <p style={{
                    fontSize: 11,
                    color: row.p2.showStatus ? '#FFFFFF' : '#8892A4',
                    margin: 0, lineHeight: 1.3,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    {row.p2.showStatus && (
                      <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0 }} />
                    )}
                    {row.p2.sub}
                  </p>
                </div>
              </div>

              {/* ── Title / role card (no avatar) ── */}
              <div style={{
                ...CARD, padding: '10px 14px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.3 }}>
                  {row.col3.title}
                </p>
                <p style={{ fontSize: 12, color: '#8892A4', margin: 0, lineHeight: 1.3 }}>
                  {row.col3.subtitle}
                </p>
              </div>

              {/* ── Status + Mini Map card ── */}
              <div style={{
                ...CARD, padding: 0,
                display: 'flex', alignItems: 'stretch', overflow: 'hidden',
                height: 65,
              }}>
                <div style={{
                  flex: 1, padding: '10px 12px',
                  display: 'flex', alignItems: 'center',
                }}>
                  <p style={{
                    fontSize: 11, color: '#FFFFFF',
                    margin: 0, fontWeight: 400, lineHeight: 1.3,
                  }}>
                    Online • Last Sync 3m ago
                  </p>
                </div>
                <MiniMap seed={ri} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Panic Button Alert ── */}
        <div style={{
          backgroundColor: '#F97316',
          borderRadius: 8, padding: '13px 20px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%',
            backgroundColor: '#CC2200', flexShrink: 0,
          }} />
          <p style={{ fontSize: 14, fontWeight: 700, color: 'white', margin: 0 }}>
            Panic Button Alerts:&nbsp;&nbsp;1 Active
          </p>
        </div>

        {/* ── Data Table ── */}
        <div style={{
          backgroundColor: '#161D2E',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#0F172A' }}>
                {['Name', 'Role', 'Assigned Turf', 'Voters Contacted Today', 'Tracking Status'].map(h => (
                  <th key={h} style={{
                    padding: '11px 16px', textAlign: 'left',
                    fontSize: 11, fontWeight: 700, color: '#64748B',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loadingMembers && (
                <tr>
                  <td colSpan={5} style={{ padding: '28px', textAlign: 'center', color: '#64748B', fontSize: 14 }}>
                    Loading team…
                  </td>
                </tr>
              )}
              {!loadingMembers && members.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '28px', textAlign: 'center', color: '#64748B', fontSize: 14 }}>
                    No team members yet
                  </td>
                </tr>
              )}
              {!loadingMembers && members.map((m, i) => {
                const flags: FlagType[] = ['skn', 'ag', 'jm', 'tt', 'bb'];
                const flag = flags[i % flags.length];
                const roleLabel = m.roles?.[0]?.name?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Member';
                const isActive = m.status === 'active';
                return (
                  <tr key={m.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FlagCircle type={flag} />
                        <div style={{ position: 'relative' }}>
                          <PersonAvatar n={i} sz={32} />
                          <div style={{
                            position: 'absolute', bottom: 0, right: 0,
                            width: 8, height: 8, borderRadius: '50%',
                            backgroundColor: isActive ? '#22C55E' : '#6B7280',
                            border: '2px solid #161D2E',
                          }} />
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>{m.name}</p>
                          <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: '#FFFFFF', fontWeight: 600 }}>
                      {roleLabel}
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: '#9CA3AF' }}>
                      {m.phone || '—'}
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: '#9CA3AF' }}>
                      —
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                        backgroundColor: isActive ? 'rgba(34,197,94,0.15)' : 'rgba(107,114,128,0.2)',
                        color: isActive ? '#22C55E' : '#9CA3AF',
                      }}>
                        {isActive ? 'Active' : m.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
