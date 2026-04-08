'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { Shield, Mic, MapPin, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PanicScreen() {
  const router = useRouter();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!holding) { setProgress(0); return; }
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setActivated(true); setHolding(false); clearInterval(t); return 100; }
        return p + 5;
      });
    }, 150);
    return () => clearInterval(t);
  }, [holding]);

  return (
    <MobilePageWrapper bg={activated ? '#1A0000' : '#0F172A'}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#fff' }}>
        {/* Header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,0,0,0.2)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          {!activated && <button onClick={() => router.push('/mobile/canvasser/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={20} color="#fff" /></button>}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: activated ? '#EF4444' : '#fff' }}>
              {activated ? '🚨 ALERT ACTIVE' : 'Emergency Panic'}
            </h2>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Canvasser Safety System</p>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px' }}>
          {/* Shield icon */}
          <div style={{ position: 'relative', marginBottom: 28 }}>
            {activated && <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: '3px solid rgba(239,68,68,0.3)', animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }} />}
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              backgroundColor: activated ? '#EF4444' : 'rgba(239,68,68,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: activated ? '0 0 40px rgba(239,68,68,0.5)' : 'none',
            }}>
              <Shield size={44} color={activated ? '#fff' : '#EF4444'} />
            </div>
          </div>

          {!activated ? (
            <>
              {/* Progress ring */}
              {holding && (
                <div style={{ width: 160, height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#EF4444', borderRadius: 4, transition: 'width 0.1s' }} />
                </div>
              )}
              <button
                onMouseDown={() => setHolding(true)} onMouseUp={() => setHolding(false)}
                onTouchStart={() => setHolding(true)} onTouchEnd={() => setHolding(false)}
                style={{
                  width: 140, height: 140, borderRadius: '50%', border: '4px solid #EF4444', cursor: 'pointer',
                  backgroundColor: holding ? '#EF4444' : 'rgba(239,68,68,0.15)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 900, color: holding ? '#fff' : '#EF4444',
                  boxShadow: holding ? '0 0 30px rgba(239,68,68,0.7)' : 'none', transition: 'all 0.2s',
                }}>
                <span style={{ fontSize: 28 }}>🚨</span>
                <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>PANIC</span>
              </button>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 16, textAlign: 'center' }}>
                {holding ? `Activating... ${Math.round(progress)}%` : 'Press and hold for 3 seconds to activate'}
              </p>
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#EF4444', margin: '0 0 8px' }}>ALERT SENT ✅</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 4px' }}>Your location has been sent to all managers</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Emergency SMS sent to 3 contacts</p>
              </div>
              <div style={{ width: '100%', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: 14, padding: '14px', marginBottom: 16, border: '1px solid rgba(239,68,68,0.3)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', textTransform: 'uppercase', margin: '0 0 8px' }}>Notified:</p>
                {['Marcus — Campaign Manager', 'Sandra — Regional Coordinator', 'HQ Security Team'].map(n => (
                  <p key={n} style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#16A34A' }}>✓</span> {n}
                  </p>
                ))}
              </div>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px', marginBottom: 12, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Mic size={16} color="#EF4444" />
                  <span style={{ fontSize: 13, color: '#fff' }}>Live audio streaming</span>
                </div>
                <button onClick={() => setStreaming(s => !s)} style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: streaming ? '#EF4444' : '#475569', border: 'none', cursor: 'pointer', position: 'relative' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 3, left: streaming ? 23 : 3, transition: 'left 0.2s' }} />
                </button>
              </label>
              <button onClick={() => setActivated(false)}
                style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                Cancel Alert
              </button>
            </>
          )}
        </div>

        {/* GPS */}
        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
            <MapPin size={12} color="#94A3B8" />
            <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>Last known: 17.3026° N, 62.7177° W</p>
          </div>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
