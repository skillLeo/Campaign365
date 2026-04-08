'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Zap, Clock, Route } from 'lucide-react';
import { useState } from 'react';

export default function GpsTracking() {
  const router = useRouter();
  const [tracking, setTracking] = useState(true);
  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.push('/mobile/runner/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>GPS Tracking</h2>
          </div>
        </div>

        {/* Map */}
        <div style={{ backgroundColor: '#1E293B', height: 220, position: 'relative', flexShrink: 0 }}>
          <svg viewBox="0 0 390 220" style={{ width: '100%', height: 220 }}>
            <rect width="390" height="220" fill="#1E293B" />
            {[50,110,170].map(y => <line key={y} x1="20" y1={y} x2="370" y2={y} stroke="#334155" strokeWidth="8" strokeLinecap="round" />)}
            {[80,160,240,320].map(x => <line key={x} x1={x} y1="20" x2={x} y2="200" stroke="#334155" strokeWidth="8" strokeLinecap="round" />)}
            <text x="30" y="45" fill="#475569" fontSize="8">Church St</text>
            <text x="30" y="105" fill="#475569" fontSize="8">Bay Road</text>
            <text x="30" y="165" fill="#475569" fontSize="8">Fort Street</text>
            {/* Route trail */}
            <polyline points="80,170 80,110 160,110 160,50 240,50" stroke="#3B82F6" strokeWidth="3" fill="none" strokeOpacity="0.6" strokeDasharray="6,3" />
            {/* Current position */}
            <circle cx="240" cy="50" r="12" fill="#3B82F6" stroke="#fff" strokeWidth="2.5" />
            <circle cx="240" cy="50" r="22" fill="rgba(59,130,246,0.15)" />
            <line x1="240" y1="50" x2="260" y2="35" stroke="#3B82F6" strokeWidth="2" />
            <circle cx="260" cy="35" r="4" fill="#1E40AF" />
          </svg>
          {/* Overlay stats */}
          <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, display: 'flex', gap: 6 }}>
            {[['18 km/h', 'Speed'], ['12.4 km', 'Today'], ['3h 12m', 'Active']].map(([v, l]) => (
              <div key={l} style={{ flex: 1, backgroundColor: 'rgba(15,23,42,0.85)', borderRadius: 8, padding: '6px 8px', textAlign: 'center' }}>
                <p style={{ color: '#fff', fontSize: 12, fontWeight: 800, margin: 0 }}>{v}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9, margin: '1px 0 0' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
          {/* Tracking toggle */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px', marginBottom: 12, border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: tracking ? '#16A34A' : '#CBD5E1' }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>Live GPS Tracking</p>
                  <p style={{ fontSize: 11, color: tracking ? '#16A34A' : '#94A3B8', margin: '1px 0 0' }}>{tracking ? 'Active · HQ can see your location' : 'Tracking paused'}</p>
                </div>
              </div>
              <button onClick={() => setTracking(t => !t)} style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: tracking ? '#16A34A' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 3, left: tracking ? 23 : 3, transition: 'left 0.2s' }} />
              </button>
            </div>
          </div>

          {/* HQ View */}
          <div style={{ backgroundColor: '#EFF6FF', borderRadius: 14, padding: '14px', marginBottom: 12, border: '1px solid #DBEAFE' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 10px' }}>HQ Live View</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <MapPin size={13} color="#2563EB" />
              <span style={{ fontSize: 12, color: '#1E3A8A' }}>Currently: Bay Road → Fort Street intersection</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: '#1E40AF', margin: 0 }}>Stop 8</p>
                <p style={{ fontSize: 10, color: '#64748B', margin: '1px 0 0' }}>Current pickup</p>
              </div>
              <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: '#1E40AF', margin: 0 }}>1:52 PM</p>
                <p style={{ fontSize: 10, color: '#64748B', margin: '1px 0 0' }}>Next ETA</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            {[
              [<Zap key="z" size={15} color="#F59E0B" />, 'Battery', '73%', '#FEF3C7'],
              [<Route key="r" size={15} color="#8B5CF6" />, 'Signal', 'Strong', '#EDE9FE'],
              [<Clock key="c" size={15} color="#16A34A" />, 'Online since', '7:30 AM', '#DCFCE7'],
              [<MapPin key="m" size={15} color="#E30613" />, 'Location', 'Basseterre', '#FEE2E2'],
            ].map(([icon, label, value, bg]) => (
              <div key={label as string} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '12px', border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: bg as string, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
                </div>
                <p style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: 0 }}>{value as string}</p>
                <p style={{ fontSize: 10, color: '#94A3B8', margin: '1px 0 0' }}>{label as string}</p>
              </div>
            ))}
          </div>

          {!tracking && (
            <div style={{ backgroundColor: '#FEF9C3', borderRadius: 10, padding: '10px 12px', border: '1px solid #FDE68A' }}>
              <p style={{ fontSize: 12, color: '#92400E', margin: 0, fontWeight: 600 }}>⚠ Battery optimization may be limiting GPS accuracy. Turn off power saver for best results.</p>
            </div>
          )}
        </div>
      </div>
    </MobilePageWrapper>
  );
}
