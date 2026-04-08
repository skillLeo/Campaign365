'use client';
import { MobilePageWrapper } from '@/components/mobile/MobileFrame';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, QrCode, Check, Home, CheckSquare, FileText, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const VOTERS = [
  { id: 1, name: 'Marcus James', idNum: 'SKN-2847', division: 'Central A', voted: false },
  { id: 2, name: 'Josephine Williams', idNum: 'SKN-1923', division: 'Central A', voted: true },
  { id: 3, name: 'Patricia Henry', idNum: 'SKN-3341', division: 'Central B', voted: false },
  { id: 4, name: 'Ronald Baptiste', idNum: 'SKN-2219', division: 'Central A', voted: true },
  { id: 5, name: 'Sandra Morton', idNum: 'SKN-4482', division: 'Central B', voted: false },
  { id: 6, name: 'Calvin Thomas', idNum: 'SKN-5671', division: 'Central C', voted: false },
  { id: 7, name: 'Yvonne Francis', idNum: 'SKN-1187', division: 'Central A', voted: true },
  { id: 8, name: 'George Daniel', idNum: 'SKN-3829', division: 'Central B', voted: false },
  { id: 9, name: 'Michelle Phipps', idNum: 'SKN-2093', division: 'Central C', voted: true },
  { id: 10, name: 'Desmond Clarke', idNum: 'SKN-4447', division: 'Central A', voted: false },
];

export default function VoterTickOff() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [voted, setVoted] = useState<number[]>([2, 4, 7, 9]);
  const [confirming, setConfirming] = useState<number | null>(null);

  const filtered = VOTERS.filter(v => {
    const matchSearch = search === '' || v.name.toLowerCase().includes(search.toLowerCase()) || v.idNum.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'voted' && voted.includes(v.id)) || (filter === 'not-voted' && !voted.includes(v.id));
    return matchSearch && matchFilter;
  });

  const handleTickOff = (id: number) => {
    setVoted(v => [...v, id]);
    setConfirming(null);
  };

  return (
    <MobilePageWrapper bg="#F8FAFC">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#fff', padding: '12px 16px 0', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <button onClick={() => router.push('/mobile/outdoor-agent/home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="#0F172A" />
            </button>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0 }}>Voter Tick-Off</h2>
              <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Central Polling Station · B-001</p>
            </div>
            <button style={{ backgroundColor: '#FEF3C7', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <QrCode size={14} color="#D97706" />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#D97706' }}>Scan</span>
            </button>
          </div>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..."
              style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', boxSizing: 'border-box', color: '#0F172A', backgroundColor: '#F8FAFC' }} />
          </div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 6, paddingBottom: 10 }}>
            {[['all', 'All'], ['not-voted', 'Not Voted'], ['voted', 'Voted']].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', backgroundColor: filter === v ? '#1E40AF' : '#F1F5F9', color: filter === v ? '#fff' : '#64748B' }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
          {filtered.map(v => {
            const hasVoted = voted.includes(v.id);
            return (
              <div key={v.id}>
                <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '12px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${hasVoted ? '#BBF7D0' : '#F1F5F9'}`, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: hasVoted ? '#DCFCE7' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {hasVoted ? <Check size={16} color="#16A34A" /> : <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>{v.idNum.slice(-3)}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</p>
                    <p style={{ fontSize: 11, color: '#94A3B8', margin: '1px 0 0' }}>{v.idNum} · {v.division}</p>
                  </div>
                  {hasVoted
                    ? <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, backgroundColor: '#DCFCE7', color: '#16A34A', flexShrink: 0 }}>VOTED</span>
                    : <button onClick={() => setConfirming(v.id)} style={{ padding: '7px 10px', borderRadius: 8, border: 'none', backgroundColor: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
                      Tick Off
                    </button>
                  }
                </div>
                {/* Confirm modal inline */}
                {confirming === v.id && (
                  <div style={{ backgroundColor: '#EFF6FF', borderRadius: 12, padding: '12px', marginBottom: 6, border: '2px solid #1E40AF' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1E3A8A', margin: '0 0 10px', textAlign: 'center' }}>
                      Confirm <strong>{v.name}</strong> has voted?
                    </p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setConfirming(null)} style={{ flex: 1, padding: '9px', borderRadius: 9, border: '1px solid #BFDBFE', backgroundColor: '#fff', color: '#374151', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>No</button>
                      <button onClick={() => handleTickOff(v.id)} style={{ flex: 1, padding: '9px', borderRadius: 9, border: 'none', backgroundColor: '#1E40AF', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Yes, Confirm</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tally */}
        <div style={{ padding: '10px 12px', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Running tally: <strong style={{ color: '#0F172A' }}>{voted.length} voted</strong> of <strong style={{ color: '#0F172A' }}>847</strong></span>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#1E40AF' }}>{Math.round((voted.length / 847) * 100)}%</span>
          </div>
          <div style={{ height: 5, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(voted.length / 847) * 100}%`, backgroundColor: '#1E40AF', borderRadius: 3, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', borderTop: '1px solid #F1F5F9', backgroundColor: '#fff' }}>
          {[
            { icon: Home, label: 'Home', href: '/mobile/outdoor-agent/home' },
            { icon: CheckSquare, label: 'Tick-Off', active: true, href: '/mobile/outdoor-agent/voter-tickoff' },
            { icon: FileText, label: 'Report', href: '/mobile/outdoor-agent/turnout-report' },
            { icon: MessageSquare, label: 'Messages', href: '#' },
          ].map(n => (
            <button key={n.label} onClick={() => router.push(n.href)} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, border: 'none', background: 'none', cursor: 'pointer' }}>
              <n.icon size={18} color={(n as any).active ? '#1E40AF' : '#94A3B8'} />
              <span style={{ fontSize: 9, fontWeight: (n as any).active ? 700 : 500, color: (n as any).active ? '#1E40AF' : '#94A3B8' }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobilePageWrapper>
  );
}
