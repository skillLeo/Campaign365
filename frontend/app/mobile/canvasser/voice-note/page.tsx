'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RotateCcw, Check, Edit3, Mic } from 'lucide-react';
import { useState, useEffect } from 'react';

const MOCK_TRANSCRIPT = 'Spoke with resident Patricia Henry at 14 Church Street. She is a confirmed supporter and has voted in the last three elections. She mentioned that her neighbour at number 16 is undecided and would benefit from a follow-up visit. She expressed concern about healthcare access in the constituency.';

export default function VoiceNoteScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<'idle' | 'recording' | 'transcribing' | 'done'>('idle');
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (phase === 'recording') {
      t = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (phase === 'transcribing') {
      let i = 0;
      t = setInterval(() => {
        i += 3;
        if (i >= MOCK_TRANSCRIPT.length) { setTranscript(MOCK_TRANSCRIPT); setPhase('done'); clearInterval(t); }
        else setTranscript(MOCK_TRANSCRIPT.slice(0, i));
      }, 30);
    }
    return () => clearInterval(t);
  }, [phase]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const waveWidths = [3, 6, 10, 14, 18, 14, 22, 16, 10, 8, 4, 8, 12, 20, 16, 12, 6, 18, 22, 14, 8, 4];

  return (
    <MobilePageWrapper bg="#0F172A">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#fff' }}>
        {/* Header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.push('/mobile/canvasser/door-knock')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#fff" />
            </button>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: 0 }}>Voice Note</h2>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Patricia Henry · 14 Church St</p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px' }}>
          {/* Waveform */}
          {phase === 'recording' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 50, marginBottom: 24 }}>
              {waveWidths.map((h, i) => (
                <div key={i} style={{ width: 3, borderRadius: 2, backgroundColor: '#E30613', height: h + Math.sin(Date.now() / 200 + i) * 4, transition: 'height 0.1s' }} />
              ))}
            </div>
          )}
          {phase === 'idle' && (
            <div style={{ marginBottom: 24, textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Tap to start recording</p>
            </div>
          )}

          {/* Timer */}
          {(phase === 'recording' || phase === 'transcribing') && (
            <p style={{ fontSize: 36, fontWeight: 900, color: '#fff', margin: '0 0 8px', fontVariantNumeric: 'tabular-nums' }}>{fmt(seconds)}</p>
          )}

          {/* Record button */}
          {phase !== 'done' && phase !== 'transcribing' && (
            <>
              <button
                onClick={() => { if (phase === 'idle') { setPhase('recording'); setSeconds(0); } else { setPhase('transcribing'); } }}
                style={{
                  width: 88, height: 88, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  backgroundColor: phase === 'recording' ? '#E30613' : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: phase === 'recording' ? '0 0 0 12px rgba(227,6,19,0.2), 0 0 0 24px rgba(227,6,19,0.1)' : 'none',
                  transition: 'all 0.3s',
                }}>
                {phase === 'recording'
                  ? <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: '#fff' }} />
                  : <Mic size={32} color="#fff" />}
              </button>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 16, textAlign: 'center' }}>
                {phase === 'recording' ? 'Recording... Speak clearly' : 'Press to begin'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 4, textAlign: 'center' }}>AI transcription will begin automatically</p>
            </>
          )}

          {phase === 'transcribing' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <div style={{ width: 24, height: 24, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              </div>
              <p style={{ color: '#fff', fontWeight: 700 }}>Transcribing...</p>
            </div>
          )}

          {/* Transcript */}
          {(phase === 'transcribing' || phase === 'done') && (
            <div style={{ width: '100%', marginTop: 24, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16A34A' }} />
                  <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 700 }}>
                    {phase === 'done' ? 'Transcription complete ✅' : 'Transcribing...'}
                  </span>
                </div>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>English / Patois</span>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, margin: 0 }}>{transcript}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        {phase === 'done' && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 8, flexShrink: 0 }}>
            <button onClick={() => { setPhase('idle'); setSeconds(0); setTranscript(''); }}
              style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <RotateCcw size={14} /> Retake
            </button>
            <button onClick={() => router.push('/mobile/canvasser/door-knock')}
              style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Edit3 size={14} /> Edit & Save
            </button>
            <button onClick={() => router.push('/mobile/canvasser/door-knock')}
              style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', backgroundColor: '#E30613', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Check size={14} /> Save
            </button>
          </div>
        )}
      </div>
    </MobilePageWrapper>
  );
}
