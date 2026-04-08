'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const HISTORY = [
  { time: '9:00 AM', voted: 45, queue: 12, notes: 'Steady flow' },
  { time: '10:00 AM', voted: 89, queue: 20, notes: 'Busier than expected' },
  { time: '11:00 AM', voted: 142, queue: 8, notes: 'Slowed down' },
  { time: '12:00 PM', voted: 198, queue: 15, notes: 'Lunch rush' },
  { time: '1:00 PM', voted: 267, queue: 6, notes: 'All clear' },
];

export default function TurnoutReport() {
  const router = useRouter();
  const [queue, setQueue] = useState(14);
  const [observations, setObservations] = useState('');
  const [hasIssue, setHasIssue] = useState(false);
  const [issueNote, setIssueNote] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => router.push('/mobile/outdoor-agent/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Turnout Report</h2>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Central Station · B-001</p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
          {/* Auto info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: '10px 8px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '0 0 2px' }}>Time</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', margin: 0 }}>2:00 PM</p>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: '10px 8px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '0 0 2px' }}>Voted Since</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#D97706', margin: 0 }}>+44</p>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: '10px 8px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: '0 0 2px' }}>Total Voted</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#16A34A', margin: 0 }}>312</p>
            </div>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: '14px', marginBottom: 12, border: '1px solid #F1F5F9' }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Voters currently in queue</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
                <button onClick={() => setQueue(q => Math.max(0, q - 1))} style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#F1F5F9', border: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', minWidth: 40, textAlign: 'center' }}>{queue}</span>
                <button onClick={() => setQueue(q => q + 1)} style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#D97706', border: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Observations (optional)</label>
              <textarea value={observations} onChange={e => setObservations(e.target.value)} placeholder="e.g. Queue moving well, no issues..."
                style={{ width: '100%', borderRadius: 10, border: '1px solid #E2E8F0', padding: '9px 11px', fontSize: 12, color: '#374151', resize: 'none', outline: 'none', boxSizing: 'border-box', height: 60 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Issue to report?</span>
              <button onClick={() => setHasIssue(v => !v)} style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: hasIssue ? '#D97706' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 3, left: hasIssue ? 23 : 3, transition: 'left 0.2s' }} />
              </button>
            </div>
            {hasIssue && (
              <textarea value={issueNote} onChange={e => setIssueNote(e.target.value)} placeholder="Describe the issue..."
                style={{ width: '100%', borderRadius: 10, border: '1px solid #FDE68A', padding: '9px 11px', fontSize: 12, color: '#374151', resize: 'none', outline: 'none', boxSizing: 'border-box', height: 55, marginTop: 8, backgroundColor: '#FFFBEB' }} />
            )}
          </div>

          {/* Last sent */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Clock size={12} color="#94A3B8" />
            <span style={{ fontSize: 11, color: '#94A3B8' }}>Last report sent: 14 minutes ago</span>
          </div>

          {/* History */}
          <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Report History</p>
          {HISTORY.slice().reverse().map((h, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: 10, padding: '10px 12px', marginBottom: 6, display: 'flex', justifyContent: 'space-between', border: '1px solid #F1F5F9' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', margin: 0 }}>{h.time}</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: '1px 0 0' }}>{h.notes}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#16A34A', margin: 0 }}>{h.voted} voted</p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: '1px 0 0' }}>Queue: {h.queue}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Send */}
        <div style={{ padding: '12px 14px', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          <button onClick={handleSend}
            style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer', backgroundColor: sent ? '#16A34A' : '#D97706', color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
            {sent ? <><CheckCircle size={16} /> Report Sent to HQ!</> : <><Send size={16} /> Send Report to HQ</>}
          </button>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
