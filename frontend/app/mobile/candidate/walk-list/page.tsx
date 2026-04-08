'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, ChevronDown, Check, Share2 } from 'lucide-react';
import { useState } from 'react';

const STOPS = [
  { id: 1, address: '14 Church Street', household: 'Marcus & Jennifer James', people: 2, done: true, points: ['Strong SKNLP supporters', 'Mention healthcare expansion', 'Ask about family turnout'] },
  { id: 2, address: '18 Church Street', household: 'Sylvia Brown', people: 1, done: true, points: ['First-time voter', 'Emphasize youth programs', 'Offer transport to polling station'] },
  { id: 3, address: '22 Church Street', household: 'Desmond Clarke', people: 1, done: false, points: ['Undecided voter', 'Key concern: jobs', 'Discuss economic plan'] },
  { id: 4, address: '27 Bay Road', household: 'Josephine & Carl Williams', people: 3, done: false, points: ['SKNLP family', 'Children eligible for vote', 'Senior citizen — offer assistance'] },
  { id: 5, address: '31 Bay Road', household: 'Ronald Baptiste', people: 1, done: false, points: ['Union member', 'Discuss labour rights bill', 'Strong supporter'] },
  { id: 6, address: '35 Bay Road', household: 'Sandra Morton', people: 1, done: false, points: ['Healthcare worker', 'Discuss nurses pay increase', 'Potential volunteer'] },
];

export default function CandidateWalkList() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(3);
  const [shareLocation, setShareLocation] = useState(true);
  const [marked, setMarked] = useState<number[]>([1, 2]);

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <button onClick={() => router.push('/mobile/candidate/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Walk List</h2>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Church Street Community · 6 stops</p>
            </div>
          </div>
          {/* Map preview */}
          <div style={{ backgroundColor: '#EFF6FF', borderRadius: 10, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
            <svg viewBox="0 0 320 70" style={{ width: '100%', height: 70 }}>
              <rect width="320" height="70" fill="#BFDBFE" />
              <line x1="20" y1="35" x2="300" y2="35" stroke="#93C5FD" strokeWidth="8" strokeLinecap="round" />
              <polyline points="40,35 80,35 120,35 160,35 200,35 240,35 280,35" stroke="#E30613" strokeWidth="2" fill="none" strokeDasharray="6,3" />
              {[40,80,120,160,200,240].map((x, i) => (
                <circle key={i} cx={x} cy={35} r="7" fill={marked.includes(i + 1) ? '#16A34A' : (i === 2 ? '#E30613' : '#94A3B8')} stroke="#fff" strokeWidth="1.5" />
              ))}
            </svg>
          </div>
          {/* Location toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Share2 size={12} color={shareLocation ? '#16A34A' : '#94A3B8'} />
              <span style={{ fontSize: 11, color: shareLocation ? '#16A34A' : '#94A3B8', fontWeight: 600 }}>Share location with team</span>
            </div>
            <button onClick={() => setShareLocation(v => !v)} style={{ width: 36, height: 20, borderRadius: 10, backgroundColor: shareLocation ? '#16A34A' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative' }}>
              <div style={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: 2.5, left: shareLocation ? 19 : 2, transition: 'left 0.2s' }} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
          {STOPS.map((stop, i) => {
            const isDone = marked.includes(stop.id);
            return (
              <div key={stop.id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '12px', marginBottom: 8, border: isDone ? '1px solid #BBF7D0' : (expanded === stop.id ? '2px solid #E30613' : '1px solid #F1F5F9'), opacity: isDone ? 0.75 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: isDone ? '#DCFCE7' : (expanded === stop.id ? '#FEE2E2' : '#F1F5F9'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {isDone ? <Check size={13} color="#16A34A" /> : <span style={{ fontSize: 11, fontWeight: 800, color: expanded === stop.id ? '#E30613' : '#64748B' }}>{i + 1}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0 }}>{stop.household}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={10} color="#94A3B8" />
                      <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{stop.address} · {stop.people} voter{stop.people > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <button onClick={() => setExpanded(expanded === stop.id ? null : stop.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                    <ChevronDown size={14} color="#94A3B8" style={{ transform: expanded === stop.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </button>
                </div>
                {expanded === stop.id && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#E30613', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>AI Talking Points</p>
                    {stop.points.map((pt, pi) => (
                      <div key={pi} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: '#E30613', flexShrink: 0, marginTop: 1 }}>•</span>
                        <p style={{ fontSize: 12, color: '#374151', margin: 0 }}>{pt}</p>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <button onClick={() => setMarked(m => [...m, stop.id])} disabled={isDone}
                        style={{ flex: 1, padding: '9px', borderRadius: 9, border: 'none', backgroundColor: isDone ? '#DCFCE7' : '#16A34A', color: isDone ? '#16A34A' : '#fff', fontSize: 11, fontWeight: 700, cursor: isDone ? 'default' : 'pointer' }}>
                        {isDone ? '✓ Visited' : 'Mark Visited'}
                      </button>
                      <button style={{ flex: 1, padding: '9px', borderRadius: 9, border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#374151', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                        Add Note
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div style={{ padding: '10px 12px', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: '#64748B' }}>{marked.length} of {STOPS.length} stops visited</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#E30613' }}>{Math.round((marked.length / STOPS.length) * 100)}%</span>
          </div>
          <div style={{ height: 5, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(marked.length / STOPS.length) * 100}%`, backgroundColor: '#E30613', borderRadius: 3, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>
    </MobilePageWrapper>
  );
}
