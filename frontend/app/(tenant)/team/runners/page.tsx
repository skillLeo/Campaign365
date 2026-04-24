'use client';

const RUNNERS = [
  { name: 'John Doe', route: 'Route 1: Basseterre to Sandy Point', materials: 'Materials Delivered', signs: 150 },
  { name: 'John Doe', route: 'Route 1: Basseterre to Sandy Point', materials: 'Materials Delivered', signs: 150 },
  { name: 'John Doe', route: 'Route 1: Basseterre to Sandy Point', materials: 'Materials Delivered', signs: 150 },
  { name: 'John Doe', route: 'Route 1: Basseterre to Sandy Point', materials: 'Materials Delivered', signs: 150 },
  { name: 'John Doe', route: 'Route 1: Basseterre to Sandy Point', materials: 'Materials Delivered', signs: 150 },
  { name: 'John Doe', route: 'Route 1: Basseterre to Sandy Point', materials: 'Materials Delivered', signs: 150 },
];

const LOGISTICS = [
  { type: 'Lawn Signs', qty: 150, status: 'In Progress', delivery: 'Delivered' },
  { type: 'Banners',    qty: 75,  status: '✓',           delivery: 'Delivered' },
  { type: 'Flyers',     qty: 500, status: '✓',           delivery: 'Delivered' },
];

function RunnerMiniMap() {
  return (
    <div style={{ width: 90, height: 72, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
      <svg width="90" height="72" viewBox="0 0 90 72">
        <rect width="90" height="72" fill="#e8f0e8" />
        {/* Grid */}
        {[15,30,45,60,75].map(x => <line key={`v${x}`} x1={x} y1={0} x2={x} y2={72} stroke="#d0dcd0" strokeWidth={0.5} />)}
        {[14,28,42,56].map(y => <line key={`h${y}`} x1={0} y1={y} x2={90} y2={y} stroke="#d0dcd0" strokeWidth={0.5} />)}
        {/* Roads */}
        <path d="M5,45 Q30,40 55,46 Q72,50 85,44" stroke="#b0c0b0" strokeWidth="3" fill="none" />
        <path d="M40,8 Q43,36 40,65" stroke="#b0c0b0" strokeWidth="2" fill="none" />
        {/* Buildings */}
        <rect x="10" y="15" width="18" height="12" rx="1" fill="#c8d8c8" />
        <rect x="52" y="18" width="16" height="10" rx="1" fill="#c8d8c8" />
        {/* Label */}
        <text x="3" y="10" fontSize="6" fill="#6B7280">Basseterre</text>
        <text x="56" y="10" fontSize="5" fill="#6B7280">Sandy Point</text>
        {/* Route line */}
        <path d="M10,48 Q45,42 82,46" stroke="#DC143C" strokeWidth="2" strokeDasharray="4 2" fill="none" />
        {/* Pin */}
        <circle cx="45" cy="44" r="5" fill="#DC143C" />
        <circle cx="45" cy="44" r="2" fill="white" />
      </svg>
    </div>
  );
}

function RunnerCard({ r }: { r: typeof RUNNERS[0] }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: 12, padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    }}>
      {/* Avatar */}
      <div style={{
        width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
        background: 'radial-gradient(circle at 40% 35%, #7B4F2Ecc, #5C331766)',
        border: '2px solid rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: 14, fontWeight: 800,
      }}>JD</div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: '#111827', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{r.name}</p>
        <p style={{ color: '#6B7280', fontSize: 11, margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.route}</p>
        <p style={{ color: '#374151', fontSize: 11, margin: '0 0 2px', fontWeight: 600 }}>{r.materials}</p>
        <p style={{ color: '#374151', fontSize: 11, margin: '0 0 4px' }}>Lawn Signs: {r.signs}</p>
        <p style={{ color: '#22C55E', fontSize: 10, fontWeight: 600, margin: 0 }}>● Live Location Tracking</p>
      </div>

      {/* Map + button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
        <RunnerMiniMap />
        <button style={{
          background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
          padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 3px 10px rgba(220,20,60,0.4)', whiteSpace: 'nowrap',
        }}>Mark Delivered</button>
      </div>
    </div>
  );
}

export default function TeamRunnersPage() {
  return (
    <div style={{
      minHeight: '100vh', fontFamily: "'Inter',sans-serif",
      background: 'linear-gradient(160deg, #0a1628 0%, #0d1f3c 40%, #0a1628 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* SKNLP red accent background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(220,20,60,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
        <h1 style={{ color: 'white', fontSize: 30, fontWeight: 900, margin: '0 0 20px', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>Runners</h1>

        {/* Runner cards grid */}
        <div className="rg-2" style={{ gap: 12, marginBottom: 24 }}>
          {RUNNERS.map((r, i) => <RunnerCard key={i} r={r} />)}
        </div>

        {/* Logistics Overview */}
        <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #f3f4f6' }}>
            <h3 style={{ color: '#111827', fontSize: 16, fontWeight: 800, margin: 0 }}>Logistics Overview</h3>
          </div>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '10px 20px', borderBottom: '1px solid #f3f4f6', color: '#6B7280', fontSize: 12, fontWeight: 700 }}>
            <span>Material Type</span><span>Quantity Delivered</span><span></span><span>Status</span>
          </div>
          {LOGISTICS.map((l, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
              padding: '12px 20px', alignItems: 'center',
              borderBottom: i < LOGISTICS.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}>
              <span style={{ color: '#111827', fontSize: 13, fontWeight: 600 }}>{l.type}</span>
              <span style={{ color: '#374151', fontSize: 13 }}>{l.qty}</span>
              <span>
                {l.status === 'In Progress' ? (
                  <span style={{
                    background: '#22C55E', color: 'white', borderRadius: 6,
                    padding: '3px 12px', fontSize: 11, fontWeight: 700,
                  }}>In Progress</span>
                ) : (
                  <span style={{ color: '#374151', fontSize: 13 }}>{l.status}</span>
                )}
              </span>
              <span style={{ color: '#374151', fontSize: 13, fontWeight: 600 }}>{l.delivery}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
