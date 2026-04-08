'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { Shield, Mic, MapPin, ArrowLeft, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CandidatePanic() {
  const router = useRouter();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const [audioLive, setAudioLive] = useState(true);

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
    <MobilePageWrapper bg={activated ? '#1A0000' : '#0A0014'}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#fff' }}>
        {/* Header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,0,0,0.2)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          {!activated && <button onClick={() => router.push('/mobile/candidate/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={20} color="#fff" /></button>}
          <div>
            <p style={{ fontSize: 9, fontWeight: 800, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 1px' }}>CANDIDATE SECURITY</p>
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: activated ? '#EF4444' : '#fff' }}>
              {activated ? '🚨 HIGHEST PRIORITY ALERT' : 'Emergency Panic System'}
            </h2>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          {/* Shield */}
          <div style={{ position: 'relative', marginBottom: 24 }}>
            {activated && <>
              <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: '2px solid rgba(239,68,68,0.4)', animation: 'ping 1s infinite' }} />
              <div style={{ position: 'absolute', inset: -36, borderRadius: '50%', border: '1px solid rgba(239,68,68,0.2)', animation: 'ping 1.5s infinite 0.5s' }} />
            </>}
            <div style={{ width: 110, height: 110, borderRadius: '50%', backgroundColor: activated ? '#EF4444' : 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: activated ? '0 0 50px rgba(239,68,68,0.6)' : 'none' }}>
              <Shield size={50} color={activated ? '#fff' : '#EF4444'} />
            </div>
          </div>

          {!activated ? (
            <>
              {holding && (
                <div style={{ width: 180, height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#EF4444', borderRadius: 4, transition: 'width 0.1s' }} />
                </div>
              )}
              <button
                onMouseDown={() => setHolding(true)} onMouseUp={() => setHolding(false)}
                onTouchStart={() => setHolding(true)} onTouchEnd={() => setHolding(false)}
                style={{ width: 160, height: 160, borderRadius: '50%', border: '5px solid #EF4444', cursor: 'pointer', backgroundColor: holding ? '#EF4444' : 'rgba(239,68,68,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#EF4444', boxShadow: holding ? '0 0 40px rgba(239,68,68,0.8)' : '0 0 20px rgba(239,68,68,0.2)', transition: 'all 0.2s' }}>
                <span style={{ fontSize: 36 }}>🚨</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: holding ? '#fff' : '#EF4444', marginTop: 4 }}>PANIC</span>
              </button>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 14, textAlign: 'center' }}>
                {holding ? `Activating... ${Math.round(progress)}%` : 'Press and hold for 3 seconds to activate'}
              </p>
              <div style={{ marginTop: 20, backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: 12, padding: '12px', width: '100%', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'center', margin: 0 }}>When activated, this will immediately notify:</p>
                {['Party President', 'Security Team (2 officers)', 'Campaign Manager'].map(n => (
                  <p key={n} style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '4px 0 0', textAlign: 'center' }}>• {n}</p>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <p style={{ fontSize: 24, fontWeight: 900, color: '#EF4444', margin: '0 0 8px' }}>CANDIDATE SECURITY ALERT</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 4px' }}>All security contacts notified immediately</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Live audio stream started automatically</p>
              </div>
              <div style={{ width: '100%', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: 12, padding: '12px', marginBottom: 14, border: '1px solid rgba(239,68,68,0.3)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', margin: '0 0 8px' }}>NOTIFIED — HIGHEST PRIORITY:</p>
                {[
                  ['✓', 'Hon. Dr. Timothy Harris — Party President'],
                  ['✓', 'Security Team Lead — 2 officers dispatched'],
                  ['✓', 'Campaign Manager — Immediate alert'],
                  ['✓', 'Emergency Services — 911 pre-dialed'],
                ].map(([icon, text]) => (
                  <p key={text} style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#16A34A' }}>{icon}</span> {text}
                  </p>
                ))}
              </div>
              {/* Audio stream */}
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px', marginBottom: 10, cursor: 'pointer', border: '1px solid rgba(239,68,68,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Radio size={16} color={audioLive ? '#EF4444' : '#64748B'} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', margin: 0 }}>Live Audio to Security</p>
                    <p style={{ fontSize: 10, color: audioLive ? '#EF4444' : 'rgba(255,255,255,0.4)', margin: 0 }}>{audioLive ? '● Streaming live' : 'Stopped'}</p>
                  </div>
                </div>
                <button onClick={() => setAudioLive(a => !a)} style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: audioLive ? '#EF4444' : '#475569', border: 'none', cursor: 'pointer', position: 'relative' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 3, left: audioLive ? 23 : 3, transition: 'left 0.2s' }} />
                </button>
              </label>
              <button onClick={() => setActivated(false)} style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                Cancel Alert
              </button>
            </>
          )}
        </div>

        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
            <MapPin size={12} color="#94A3B8" />
            <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>17.3026° N, 62.7177° W · Basseterre, St. Kitts</p>
          </div>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
