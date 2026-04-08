'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { Navigation, ChevronUp, Phone, MapPin } from 'lucide-react';

const STOPS = [
  { n: 1, address: '14 Church St', done: true },
  { n: 2, address: '18 Church St', done: true },
  { n: 3, address: '22 Church St', done: true },
  { n: 4, address: '27 Bay Rd', done: true },
  { n: 5, address: '31 Bay Rd', done: true },
  { n: 6, address: '35 Bay Rd', done: true },
  { n: 7, address: '12 Fort St', done: true },
  { n: 8, address: '16 Fort St', done: false, current: true },
  { n: 9, address: '19 Fort St', done: false },
  { n: 10, address: '3 Independence Sq', done: false },
];

export default function RouteMap() {
  const router = useRouter();
  return (
    <MobilePageWrapper bg="#1E293B">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Top bar */}
        <div style={{ backgroundColor: '#0F172A', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, margin: 0 }}>Current Route</p>
            <p style={{ color: '#fff', fontSize: 14, fontWeight: 800, margin: '1px 0 0' }}>Basseterre Urban — Zone A</p>
          </div>
          <button onClick={() => router.push('/mobile/canvasser/home')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: '#fff', fontSize: 11, fontWeight: 700 }}>
            <ChevronUp size={14} />
          </button>
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <svg viewBox="0 0 390 320" style={{ width: '100%', height: '100%' }}>
            <rect width="390" height="320" fill="#1E293B" />
            {/* Streets */}
            <line x1="60" y1="60" x2="330" y2="60" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <line x1="60" y1="130" x2="330" y2="130" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <line x1="60" y1="200" x2="330" y2="200" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="30" x2="100" y2="260" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1="30" x2="200" y2="260" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <line x1="300" y1="30" x2="300" y2="260" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            {/* Street labels */}
            <text x="80" y="55" fill="#475569" fontSize="8">Church St</text>
            <text x="80" y="125" fill="#475569" fontSize="8">Bay Rd</text>
            <text x="80" y="195" fill="#475569" fontSize="8">Fort St</text>
            {/* Route line */}
            <polyline points="100,60 200,60 200,130 300,130 300,200 200,200" stroke="#E30613" strokeWidth="3" fill="none" strokeDasharray="8,4" />
            {/* Done pins */}
            {[{x:100,y:60},{x:150,y:60},{x:200,y:60},{x:200,y:100},{x:200,y:130},{x:250,y:130},{x:300,y:130},{x:300,y:160}].map((p,i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="10" fill="#16A34A" />
                <text x={p.x} y={p.y+4} textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">{i+1}</text>
              </g>
            ))}
            {/* Current */}
            <circle cx="300" cy="160" r="13" fill="#E30613" />
            <circle cx="300" cy="160" r="18" fill="rgba(227,6,19,0.25)" />
            <text x="300" y="164" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="800">8</text>
            {/* Future stops */}
            {[{x:300,y:200},{x:250,y:200}].map((p,i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="10" fill="#475569" />
                <text x={p.x} y={p.y+4} textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">{i+9}</text>
              </g>
            ))}
            {/* My location */}
            <circle cx="280" cy="155" r="7" fill="#3B82F6" stroke="#fff" strokeWidth="2" />
            <circle cx="280" cy="155" r="14" fill="rgba(59,130,246,0.2)" />
          </svg>
        </div>

        {/* Bottom card */}
        <div style={{ backgroundColor: '#0F172A', borderRadius: '18px 18px 0 0', padding: '16px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, margin: '0 auto 14px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, margin: 0 }}>Next Stop · 2 min walk</p>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 800, margin: '2px 0' }}>16 Fort Street</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={11} color="#94A3B8" />
                <p style={{ color: '#94A3B8', fontSize: 11, margin: 0 }}>Ronald &amp; Sandra Baptiste · 2 voters</p>
              </div>
            </div>
            <span style={{ backgroundColor: 'rgba(227,6,19,0.2)', color: '#E30613', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>Stop 8</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '8px', textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 800, margin: 0 }}>4.2 km</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, margin: '1px 0 0' }}>Total route</p>
            </div>
            <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '8px', textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 800, margin: 0 }}>2h 15m</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, margin: '1px 0 0' }}>Remaining</p>
            </div>
            <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '8px', textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 800, margin: 0 }}>8 / 127</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, margin: '1px 0 0' }}>Progress</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', backgroundColor: '#E30613', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Navigation size={14} /> Navigate
            </button>
            <button onClick={() => router.push('/mobile/canvasser/door-knock')} style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'transparent', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Mark Visited
            </button>
          </div>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
