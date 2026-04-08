'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Truck, MessageSquare, Navigation } from 'lucide-react';

const RUNNERS = [
  { id: 1, name: 'Anthony Brown', status: 'En Route', eta: '8 min', color: '#16A34A' },
  { id: 2, name: 'Kevin Williams', status: 'Available', eta: '12 min', color: '#2563EB' },
  { id: 3, name: 'Denise Clarke', status: 'On Assignment', eta: '25 min', color: '#F59E0B' },
];

export default function OutdoorAgentLocation() {
  const router = useRouter();
  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.push('/mobile/outdoor-agent/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Live Location</h2>
          </div>
        </div>

        {/* Map */}
        <div style={{ height: 220, backgroundColor: '#1E293B', position: 'relative', flexShrink: 0 }}>
          <svg viewBox="0 0 390 220" style={{ width: '100%', height: 220 }}>
            <rect width="390" height="220" fill="#1E293B" />
            {[50,110,170].map(y => <line key={y} x1="20" y1={y} x2="370" y2={y} stroke="#334155" strokeWidth="8" strokeLinecap="round" />)}
            {[80,160,240,320].map(x => <line key={x} x1={x} y1="20" x2={x} y2="200" stroke="#334155" strokeWidth="8" strokeLinecap="round" />)}
            <text x="30" y="45" fill="#475569" fontSize="8">Church St</text>
            <text x="30" y="105" fill="#475569" fontSize="8">Bay Road</text>
            <text x="30" y="165" fill="#475569" fontSize="8">Fort Street</text>
            {/* Station pin */}
            <circle cx="200" cy="110" r="16" fill="#D97706" />
            <circle cx="200" cy="110" r="24" fill="rgba(217,119,6,0.2)" />
            <text x="200" y="114" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">ST</text>
            {/* Runners */}
            <circle cx="120" cy="60" r="9" fill="#16A34A" stroke="#fff" strokeWidth="1.5" />
            <text x="120" y="63" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">R1</text>
            <circle cx="280" cy="150" r="9" fill="#2563EB" stroke="#fff" strokeWidth="1.5" />
            <text x="280" y="153" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">R2</text>
            <circle cx="160" cy="170" r="9" fill="#F59E0B" stroke="#fff" strokeWidth="1.5" />
            <text x="160" y="173" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">R3</text>
          </svg>
          {/* Station badge */}
          <div style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(15,23,42,0.85)', borderRadius: 8, padding: '6px 10px' }}>
            <p style={{ color: '#fff', fontSize: 11, fontWeight: 800, margin: 0 }}>Central Polling Station</p>
            <p style={{ color: '#D97706', fontSize: 10, margin: 0 }}>Station Code: B-001</p>
          </div>
          {/* HQ indicator */}
          <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(22,163,74,0.9)', borderRadius: 8, padding: '5px 9px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ADE80' }} />
            <p style={{ color: '#fff', fontSize: 10, fontWeight: 700, margin: 0 }}>Sharing with HQ</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
          {/* My location */}
          <div style={{ backgroundColor: '#FEF3C7', borderRadius: 12, padding: '12px', marginBottom: 12, border: '1px solid #FDE68A' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={16} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#92400E', margin: 0 }}>Your Location</p>
                <p style={{ fontSize: 11, color: '#D97706', margin: '1px 0 0' }}>Independence Square, Central Polling Station</p>
                <p style={{ fontSize: 10, color: '#92400E', margin: '1px 0 0' }}>17.2948° N, 62.7261° W</p>
              </div>
            </div>
          </div>

          {/* Runners nearby */}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Runners in Area ({RUNNERS.length})</p>
          {RUNNERS.map(r => (
            <div key={r.id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '12px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #F1F5F9' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: r.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: r.color, flexShrink: 0 }}>
                {r.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>{r.name}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: '1px 0 0' }}>ETA: {r.eta}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, backgroundColor: r.color + '18', color: r.color }}>{r.status}</span>
            </div>
          ))}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', backgroundColor: '#D97706', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Truck size={14} /> Request Runner
            </button>
            <button style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#374151', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <MessageSquare size={14} /> Message HQ
            </button>
          </div>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
