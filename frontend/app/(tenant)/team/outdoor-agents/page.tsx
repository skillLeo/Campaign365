'use client';

const AGENTS = [
  { name: 'John Doe',   cluster: 'Cluster 1', status: 'Materials Status',  delivered: 85, tag: 'live',    time: '1:13m - 4:10 m', activity: '' },
  { name: 'Jane Smith', cluster: 'Cluster 1', status: 'Materials Status',  delivered: 85, tag: 'gps',     time: '0:1m - 7:0 m',  activity: 'Outdoor Activity 2:4 m' },
  { name: 'John Doe',   cluster: 'Cluster 1', status: 'Materials Status',  delivered: 85, tag: 'live',    time: '1:00 m 2:70 m', activity: '' },
  { name: 'Jane Smith', cluster: 'Cluster 1', status: 'Materials Status',  delivered: 85, tag: 'live',    time: '',              activity: 'Outdoor Activity 0:3m - 4:00 m' },
  { name: 'John Doe',   cluster: 'Cluster 1', status: 'Materials Status',  delivered: 85, tag: 'live',    time: '1:3m - 2:10 m', activity: '' },
  { name: 'Jane Smith', cluster: 'Cluster 1', status: 'Materials Status',  delivered: 85, tag: 'live',    time: '',              activity: 'Outdoor Activity 0:10 GPS - 4:13 m' },
];

const PERFORMANCE = [
  { name: 'John Doe',   score: 92, skin: '#7B4F2E', bg: '#5C3317' },
  { name: 'Jane Smith', score: 98, skin: '#8B5E3C', bg: '#6B4226' },
  { name: 'Jane Smith', score: 10, skin: '#4A2C17', bg: '#3D2B1F' },
  { name: 'Jane Smith', score: 11, skin: '#6D4C41', bg: '#5C4033' },
  { name: 'Jane Smith', score: 11, skin: '#9A7050', bg: '#7B5E3C' },
  { name: 'Jane Smith', score: 10, skin: '#7C5234', bg: '#5A3A1A' },
  { name: 'John Doe',   score: 10, skin: '#7B4F2E', bg: '#5C3317' },
  { name: 'Jane Smith', score: 28, skin: '#8B5E3C', bg: '#6B4226' },
  { name: 'Jane Smith', score: 10, skin: '#4A2C17', bg: '#3D2B1F' },
];

function AgentMiniMap({ hasPin = true }: { hasPin?: boolean }) {
  return (
    <svg width="100%" height="80" viewBox="0 0 140 80" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="140" height="80" fill="#1E293B" />
      {[20,40,60,80,100,120].map(x => <line key={`v${x}`} x1={x} y1={0} x2={x} y2={80} stroke="#2D3748" strokeWidth={0.5} />)}
      {[16,32,48,64].map(y => <line key={`h${y}`} x1={0} y1={y} x2={140} y2={y} stroke="#2D3748" strokeWidth={0.5} />)}
      {/* Roads */}
      <path d="M10,50 Q50,44 90,52 Q115,56 132,48" stroke="#374151" strokeWidth="2" fill="none" />
      <path d="M60,10 Q64,40 60,72" stroke="#374151" strokeWidth="1.5" fill="none" />
      {/* Area blocks */}
      <rect x="20" y="18" width="28" height="16" rx="2" fill="#253040" stroke="#334155" strokeWidth="0.5" />
      <rect x="70" y="22" width="24" height="14" rx="2" fill="#253040" stroke="#334155" strokeWidth="0.5" />
      {/* St Kitts flag mini */}
      <rect x="110" y="8" width="22" height="14" rx="2" fill="#009E60" />
      <polygon points="110,8 122,15 110,22" fill="#CE1126" />
      <line x1="110" y1="14" x2="132" y2="14" stroke="#000" strokeWidth="1.5" />
      <line x1="110" y1="16" x2="132" y2="16" stroke="#FCD116" strokeWidth="1" />
      {hasPin && (
        <g>
          <circle cx="70" cy="42" r="7" fill="#DC143C" opacity={0.9} />
          <circle cx="70" cy="42" r="3" fill="white" />
          <path d="M70,49 L70,56" stroke="#DC143C" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

function AgentCard({ agent }: { agent: typeof AGENTS[0] }) {
  const initials = agent.name.split(' ').map(w => w[0]).join('');
  const isGPS = agent.tag === 'gps';
  return (
    <div style={{
      background: '#111827', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12, overflow: 'hidden',
    }}>
      {/* Top info */}
      <div style={{ padding: '12px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'radial-gradient(circle at 40% 35%, #7B4F2Ecc, #5C331766)',
            border: '2px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 12, fontWeight: 800,
          }}>{initials}</div>
          <div>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: 0 }}>{agent.name}</p>
            <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>{agent.cluster}</p>
          </div>
          {/* St Kitts mini flag */}
          <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
            <svg viewBox="0 0 20 14" width="20" height="14">
              <polygon points="0,14 20,14 0,0" fill="#009E60" />
              <polygon points="20,0 20,14 0,0" fill="#CE1126" />
              <line x1="0" y1="7" x2="20" y2="7" stroke="#000" strokeWidth="2" />
              <line x1="0" y1="8.5" x2="20" y2="8.5" stroke="#FCD116" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <p style={{ color: '#475569', fontSize: 11, margin: '0 0 3px', fontWeight: 600 }}>{agent.status}</p>
        <p style={{ color: '#94A3B8', fontSize: 11, margin: '0 0 5px' }}>Materials Delivered: {agent.delivered}%</p>
        {isGPS ? (
          <p style={{ color: '#22C55E', fontSize: 11, margin: 0, fontWeight: 600 }}>● Live GPS Location</p>
        ) : (
          <p style={{ color: '#64748B', fontSize: 11, margin: 0, fontWeight: 600 }}>Live GPS</p>
        )}
        {agent.time && <p style={{ color: '#475569', fontSize: 10, margin: '3px 0 0' }}>{agent.time}</p>}
        {agent.activity && <p style={{ color: '#475569', fontSize: 10, margin: '3px 0 0' }}>{agent.activity}</p>}
      </div>
      {/* Map */}
      <AgentMiniMap hasPin={isGPS || agent.tag === 'live'} />
    </div>
  );
}

export default function OutdoorAgentsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080E1C', fontFamily: "'Inter',sans-serif", padding: '24px' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ color: '#DC143C', fontSize: 28, fontWeight: 900, margin: '0 0 6px' }}>Outdoor Agents</h1>
        <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>Monitor and manage field operations in real-time.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 20, alignItems: 'start' }}>

        {/* Agent cards grid */}
        <div className="rg-2" style={{ gap: 12 }}>
          {AGENTS.map((agent, i) => <AgentCard key={i} agent={agent} />)}
        </div>

        {/* Agent Performance panel */}
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 0', overflow: 'hidden' }}>
          <p style={{ color: '#DC143C', fontSize: 14, fontWeight: 700, margin: '0 0 12px', padding: '0 16px' }}>Agent Performance</p>
          {PERFORMANCE.map((p, i) => {
            const initials = p.name.split(' ').map(w => w[0]).join('');
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px',
                borderBottom: i < PERFORMANCE.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  background: `radial-gradient(circle at 40% 35%, ${p.skin}cc, ${p.bg}88)`,
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 10, fontWeight: 800,
                }}>{initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#E2E8F0', fontSize: 11, fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name} - {p.score}
                  </p>
                </div>
                <div style={{
                  width: 30, height: 20, borderRadius: 4,
                  background: '#DC143C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 11, fontWeight: 800, flexShrink: 0,
                }}>{p.score}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
