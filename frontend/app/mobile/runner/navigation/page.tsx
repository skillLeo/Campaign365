'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { Phone, AlertCircle, CheckCircle, ArrowLeft, ChevronRight } from 'lucide-react';

export default function RunnerNavigation() {
  const router = useRouter();
  return (
    <MobilePageWrapper bg="#1E293B">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Turn-by-turn */}
        <div style={{ backgroundColor: '#1E40AF', padding: '14px 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.push('/mobile/runner/assignments')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, padding: 6, cursor: 'pointer' }}>
              <ArrowLeft size={16} color="#fff" />
            </button>
            <div style={{ flex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, margin: 0 }}>Next turn in 200m</p>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 800, margin: '1px 0 0' }}>
                <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Turn right onto Bay Road
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#fff', fontSize: 18, fontWeight: 900, margin: 0 }}>8 min</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, margin: 0 }}>ETA 1:52 PM</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <svg viewBox="0 0 390 340" style={{ width: '100%', height: '100%' }}>
            <rect width="390" height="340" fill="#1E293B" />
            {/* Streets grid */}
            {[60,130,200,270].map(y => <line key={y} x1="20" y1={y} x2="370" y2={y} stroke="#334155" strokeWidth="10" strokeLinecap="round" />)}
            {[80,160,240,320].map(x => <line key={x} x1={x} y1="20" x2={x} y2="320" stroke="#334155" strokeWidth="10" strokeLinecap="round" />)}
            {/* Street labels */}
            <text x="30" y="55" fill="#475569" fontSize="8">Church St</text>
            <text x="30" y="125" fill="#475569" fontSize="8">Bay Road</text>
            <text x="30" y="195" fill="#475569" fontSize="8">Fort Street</text>
            <text x="30" y="265" fill="#475569" fontSize="8">Central St</text>
            {/* Route */}
            <polyline points="80,200 80,130 240,130 240,265" stroke="#3B82F6" strokeWidth="4" fill="none" />
            {/* Destination */}
            <circle cx="240" cy="265" r="14" fill="#1E40AF" />
            <circle cx="240" cy="265" r="20" fill="rgba(30,64,175,0.25)" />
            <text x="240" y="269" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">D</text>
            {/* Current */}
            <circle cx="80" cy="200" r="10" fill="#3B82F6" stroke="#fff" strokeWidth="2" />
            <circle cx="80" cy="200" r="18" fill="rgba(59,130,246,0.2)" />
            <line x1="80" y1="200" x2="80" y2="130" stroke="rgba(59,130,246,0.4)" strokeWidth="2" strokeDasharray="6,4" />
          </svg>
          {/* ETA badge */}
          <div style={{ position: 'absolute', top: 12, right: 12, backgroundColor: '#1E40AF', borderRadius: 10, padding: '6px 10px' }}>
            <p style={{ color: '#fff', fontSize: 12, fontWeight: 800, margin: 0 }}>1.2 km</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, margin: 0 }}>to destination</p>
          </div>
        </div>

        {/* Bottom card */}
        <div style={{ backgroundColor: '#0F172A', padding: '14px 16px', flexShrink: 0, borderRadius: '18px 18px 0 0' }}>
          <div style={{ width: 36, height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, margin: '0 auto 12px' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, margin: 0 }}>Pickup Assignment</p>
              <p style={{ color: '#fff', fontSize: 15, fontWeight: 800, margin: '2px 0' }}>Mary Johnson</p>
              <p style={{ color: '#94A3B8', fontSize: 11, margin: 0 }}>24 Central Street, Basseterre</p>
            </div>
            <span style={{ backgroundColor: 'rgba(227,6,19,0.2)', color: '#E30613', fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 20, flexShrink: 0 }}>2:00 PM</span>
          </div>
          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button style={{ flex: 1, padding: '11px', borderRadius: 10, border: 'none', backgroundColor: '#3B82F6', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Phone size={13} /> Call Voter
            </button>
            <button onClick={() => router.push('/mobile/runner/pickup-complete')} style={{ flex: 1, padding: '11px', borderRadius: 10, border: 'none', backgroundColor: '#16A34A', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <CheckCircle size={13} /> Arrived
            </button>
          </div>
          <button style={{ width: '100%', padding: '10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <AlertCircle size={12} /> Report Issue
          </button>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
