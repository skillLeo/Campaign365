'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mic, MapPin, ChevronRight, ChevronLeft, Users } from 'lucide-react';
import { useState } from 'react';

const RESULTS = [
  { key: 'supporter', emoji: '✅', label: 'Supporter', color: '#16A34A', bg: '#DCFCE7' },
  { key: 'undecided', emoji: '🤔', label: 'Undecided', color: '#D97706', bg: '#FEF3C7' },
  { key: 'opposition', emoji: '❌', label: 'Opposition', color: '#DC2626', bg: '#FEE2E2' },
  { key: 'not-home', emoji: '🚪', label: 'Not Home', color: '#64748B', bg: '#F1F5F9' },
  { key: 'refused', emoji: '🚫', label: 'Refused', color: '#475569', bg: '#E2E8F0' },
  { key: 'deceased', emoji: '✝️', label: 'Deceased', color: '#1E293B', bg: '#CBD5E1' },
  { key: 'moved', emoji: '📦', label: 'Moved', color: '#2563EB', bg: '#DBEAFE' },
];

export default function DoorKnock() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [recording, setRecording] = useState(false);
  const [household, setHousehold] = useState(1);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (selected) { setSaved(true); setTimeout(() => { setSaved(false); router.push('/mobile/canvasser/my-list'); }, 1200); }
  };

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <button onClick={() => router.push('/mobile/canvasser/my-list')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Door Knock Recording</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <MapPin size={11} color="#94A3B8" />
                <span style={{ fontSize: 11, color: '#94A3B8' }}>14 Church Street, Basseterre</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                <ChevronLeft size={18} />
              </button>
              <span style={{ fontSize: 11, color: '#94A3B8', lineHeight: '18px' }}>8/127</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E30613' }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '8px 12px' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>Patricia Henry</p>
            <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0' }}>Previous: Not Visited · Registered 2018</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 0' }}>
          {/* Result Buttons */}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Select Result</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {RESULTS.map(r => (
              <button key={r.key} onClick={() => setSelected(r.key)}
                style={{ padding: '12px', borderRadius: 12, border: `2px solid ${selected === r.key ? r.color : 'transparent'}`, backgroundColor: selected === r.key ? r.bg : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.15s' }}>
                <span style={{ fontSize: 18 }}>{r.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: selected === r.key ? r.color : '#374151' }}>{r.label}</span>
              </button>
            ))}
          </div>

          {/* Household size */}
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '12px', marginBottom: 12, border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={15} color="#64748B" />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>People in household</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setHousehold(h => Math.max(1, h - 1))} style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#F1F5F9', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', minWidth: 16, textAlign: 'center' }}>{household}</span>
                <button onClick={() => setHousehold(h => Math.min(8, h + 1))} style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E30613', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Notes</p>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add notes about this visit..."
              style={{ width: '100%', borderRadius: 10, border: '1px solid #E2E8F0', padding: '10px 12px', fontSize: 12, color: '#374151', resize: 'none', outline: 'none', boxSizing: 'border-box', height: 70, backgroundColor: '#fff' }} />
          </div>

          {/* Voice Note */}
          <button onClick={() => setRecording(r => !r)}
            style={{ width: '100%', padding: '12px', borderRadius: 12, border: `2px solid ${recording ? '#E30613' : '#E2E8F0'}`, backgroundColor: recording ? '#FEF2F2' : '#fff', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: recording ? '#E30613' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mic size={16} color={recording ? '#fff' : '#64748B'} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: recording ? '#E30613' : '#374151', margin: 0 }}>{recording ? '● Recording... 00:08' : 'Record Voice Note'}</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '1px 0 0' }}>{recording ? 'Tap to stop' : 'AI transcription enabled'}</p>
            </div>
          </button>

          {/* GPS */}
          <p style={{ fontSize: 10, color: '#94A3B8', textAlign: 'center', marginBottom: 14 }}>
            📍 GPS: 17.2948° N, 62.7261° W · Auto-captured
          </p>
        </div>

        {/* Save button */}
        <div style={{ padding: '12px 14px', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          <button onClick={handleSave} disabled={!selected}
            style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: selected ? 'pointer' : 'not-allowed', backgroundColor: saved ? '#16A34A' : (selected ? '#E30613' : '#CBD5E1'), color: '#fff', fontSize: 14, fontWeight: 800, transition: 'all 0.2s' }}>
            {saved ? '✅ Saved!' : 'Save & Next →'}
          </button>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
