'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Check, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function PickupComplete() {
  const router = useRouter();
  const [people, setPeople] = useState(1);
  const [idVerified, setIdVerified] = useState(false);
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = () => { setDone(true); setTimeout(() => router.push('/mobile/runner/assignments'), 1500); };

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.push('/mobile/runner/assignments')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Mark Pickup Complete</h2>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {/* Voter */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px', marginBottom: 14, border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#1E40AF', flexShrink: 0 }}>MJ</div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: 0 }}>Mary Johnson</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={11} color="#94A3B8" />
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>24 Central Street, Basseterre</p>
              </div>
            </div>
          </div>

          {/* People counter */}
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '14px', marginBottom: 12, border: '1px solid #F1F5F9' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', margin: '0 0 12px' }}>Number of people picked up</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
              <button onClick={() => setPeople(p => Math.max(1, p - 1))} style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#F1F5F9', border: 'none', cursor: 'pointer', fontSize: 20, fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', minWidth: 40, textAlign: 'center' }}>{people}</span>
              <button onClick={() => setPeople(p => Math.min(6, p + 1))} style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#1E40AF', border: 'none', cursor: 'pointer', fontSize: 20, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>

          {/* ID Verified */}
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '14px', marginBottom: 12, border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>Voter ID verified</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '2px 0 0' }}>Confirm you checked voter registration</p>
            </div>
            <button onClick={() => setIdVerified(v => !v)} style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: idVerified ? '#16A34A' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 3, left: idVerified ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </button>
          </div>

          {/* Destination */}
          <div style={{ backgroundColor: '#DBEAFE', borderRadius: 12, padding: '12px', marginBottom: 12, border: '1px solid #BFDBFE' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#1E40AF', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confirm Destination</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1E3A8A', margin: 0 }}>🏛️ Central Polling Station, Basseterre</p>
            <p style={{ fontSize: 11, color: '#3B82F6', margin: '2px 0 0' }}>Independence Square · Station Code: B-001</p>
          </div>

          {/* Timestamp */}
          <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '10px 12px', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: '#64748B' }}>Timestamp (auto)</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>1:58 PM · Apr 8, 2026</span>
          </div>

          {/* Photo proof */}
          <button style={{ width: '100%', padding: '12px', borderRadius: 12, border: '2px dashed #E2E8F0', backgroundColor: 'transparent', color: '#64748B', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
            <Camera size={16} /> Add Photo Proof (optional)
          </button>

          {/* Note */}
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Optional note..."
            style={{ width: '100%', borderRadius: 10, border: '1px solid #E2E8F0', padding: '10px 12px', fontSize: 12, color: '#374151', resize: 'none', outline: 'none', boxSizing: 'border-box', height: 60, backgroundColor: '#fff', marginBottom: 4 }} />
        </div>

        {/* Submit */}
        <div style={{ padding: '12px 16px', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          <button onClick={handleSubmit}
            style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer', backgroundColor: done ? '#16A34A' : '#1E40AF', color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'background 0.2s' }}>
            {done ? <><Check size={16} /> Marked as Delivered!</> : 'Mark as Delivered →'}
          </button>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
