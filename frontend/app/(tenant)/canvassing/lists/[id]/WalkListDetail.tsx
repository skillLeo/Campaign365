'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Download, MapPin, CheckCircle2, XCircle, Clock,
  Phone, MessageSquare, Home, ChevronDown, ChevronUp, Search,
  FileText, User, Mic, AlertCircle
} from 'lucide-react';

const PRIMARY = 'var(--tenant-primary)';

const MOCK_LISTS: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Central Basseterre Walk List',
    campaign: '2025 General Election Campaign',
    canvasser: 'James Morrison',
    constituency: 'Central Basseterre',
    assigned: '2025-06-10',
    total: 48,
    knocked: 36,
    completed: 28,
    voters: [
      { id: 1, address: '14 Cayon Street', name: 'Patricia Williams', age: 52, status: 'support', contact: 'answered', notes: 'Strong supporter, will volunteer.', voiceNote: true },
      { id: 2, address: '14 Cayon Street', name: 'Derek Williams', age: 54, status: 'support', contact: 'answered', notes: '', voiceNote: false },
      { id: 3, address: '22 Church Street', name: 'Sandra Clarke', age: 38, status: 'undecided', contact: 'answered', notes: 'Concerned about healthcare.', voiceNote: true },
      { id: 4, address: '22 Church Street', name: 'Michael Clarke', age: 41, status: 'not_home', contact: 'not_home', notes: '', voiceNote: false },
      { id: 5, address: '33 Fort Street', name: 'Donna Henry', age: 67, status: 'oppose', contact: 'answered', notes: 'Long-time opposition voter.', voiceNote: false },
      { id: 6, address: '45 Bay Road', name: 'Leon Thomas', age: 29, status: 'support', contact: 'answered', notes: 'First time voter, excited.', voiceNote: false },
      { id: 7, address: '45 Bay Road', name: 'Keisha Thomas', age: 27, status: 'undecided', contact: 'answered', notes: 'Wants to see party platform.', voiceNote: true },
      { id: 8, address: '58 Victoria Road', name: 'Carlton Browne', age: 45, status: 'not_home', contact: 'not_home', notes: '', voiceNote: false },
      { id: 9, address: '58 Victoria Road', name: 'Yvonne Browne', age: 43, status: 'not_home', contact: 'not_home', notes: '', voiceNote: false },
      { id: 10, address: '71 Pond Road', name: 'Arthur Francis', age: 71, status: 'support', contact: 'answered', notes: 'Voted SKNLP for 30 years.', voiceNote: false },
      { id: 11, address: '71 Pond Road', name: 'Mable Francis', age: 68, status: 'support', contact: 'answered', notes: '', voiceNote: false },
      { id: 12, address: '88 Wellington Road', name: 'Stacy Roberts', age: 33, status: 'undecided', contact: 'answered', notes: 'Interested in youth employment policy.', voiceNote: true },
    ],
  },
  '2': {
    id: 2,
    name: 'Tabernacle North Walk List',
    campaign: '2025 General Election Campaign',
    canvasser: 'Alicia Green',
    constituency: "St. Paul's Capisterre",
    assigned: '2025-06-12',
    total: 32,
    knocked: 20,
    completed: 18,
    voters: [
      { id: 1, address: '5 Tabernacle Main Road', name: 'John Joseph', age: 44, status: 'support', contact: 'answered', notes: '', voiceNote: false },
      { id: 2, address: '5 Tabernacle Main Road', name: 'Helen Joseph', age: 41, status: 'undecided', contact: 'answered', notes: 'Needs follow-up.', voiceNote: false },
      { id: 3, address: '12 Hanley Road', name: 'Frederick Samuel', age: 58, status: 'not_home', contact: 'not_home', notes: '', voiceNote: false },
    ],
  },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  support: { label: 'Supporter', color: '#16A34A', bg: '#F0FDF4', icon: CheckCircle2 },
  undecided: { label: 'Undecided', color: '#D97706', bg: '#FFFBEB', icon: Clock },
  oppose: { label: 'Opposition', color: '#DC2626', bg: '#FEF2F2', icon: XCircle },
  not_home: { label: 'Not Home', color: '#64748B', bg: '#F8FAFC', icon: Home },
};

function groupByAddress(voters: any[]) {
  const groups: Record<string, any[]> = {};
  voters.forEach(v => {
    if (!groups[v.address]) groups[v.address] = [];
    groups[v.address].push(v);
  });
  return Object.entries(groups);
}

export default function WalkListDetail() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);
  const list = MOCK_LISTS[id] || MOCK_LISTS['1'];

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedAddresses, setExpandedAddresses] = useState<Set<string>>(new Set(['14 Cayon Street', '22 Church Street']));

  const toggleAddress = (addr: string) => {
    setExpandedAddresses(prev => {
      const next = new Set(prev);
      if (next.has(addr)) next.delete(addr);
      else next.add(addr);
      return next;
    });
  };

  const filtered = list.voters.filter((v: any) => {
    const matchSearch = search === '' || v.name.toLowerCase().includes(search.toLowerCase()) || v.address.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const grouped = groupByAddress(filtered);
  const supportCount = list.voters.filter((v: any) => v.status === 'support').length;
  const undecidedCount = list.voters.filter((v: any) => v.status === 'undecided').length;
  const opposeCount = list.voters.filter((v: any) => v.status === 'oppose').length;
  const notHomeCount = list.voters.filter((v: any) => v.status === 'not_home').length;
  const progress = Math.round((list.knocked / list.total) * 100);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#475569' }}
        >
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex-1">
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>{list.name}</h1>
          <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Canvassing › Walk Lists › {list.name}</p>
        </div>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: 7, backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 9, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          <Download size={14} /> Download PDF Walk List
        </button>
      </div>

      {/* Info bar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-5 flex flex-wrap gap-6">
        <div>
          <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>CANVASSER</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginTop: 2 }}>{list.canvasser}</p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>CONSTITUENCY</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginTop: 2 }}>{list.constituency}</p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>CAMPAIGN</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginTop: 2 }}>{list.campaign}</p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>ASSIGNED</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginTop: 2 }}>{list.assigned}</p>
        </div>
        <div className="flex-1 min-w-48">
          <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 6 }}>PROGRESS — {list.knocked}/{list.total} doors knocked ({progress}%)</p>
          <div style={{ height: 8, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, backgroundColor: PRIMARY, borderRadius: 99 }} />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Supporters', count: supportCount, color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Undecided', count: undecidedCount, color: '#D97706', bg: '#FFFBEB' },
          { label: 'Opposition', count: opposeCount, color: '#DC2626', bg: '#FEF2F2' },
          { label: 'Not Home', count: notHomeCount, color: '#64748B', bg: '#F8FAFC' },
        ].map(s => (
          <button
            key={s.label}
            onClick={() => setFilterStatus(filterStatus === s.label.toLowerCase().replace(' ', '_') ? 'all' : (s.label === 'Not Home' ? 'not_home' : s.label === 'Undecided' ? 'undecided' : s.label === 'Opposition' ? 'oppose' : 'support'))}
            style={{ background: filterStatus !== 'all' && filterStatus === (s.label === 'Not Home' ? 'not_home' : s.label === 'Undecided' ? 'undecided' : s.label === 'Opposition' ? 'oppose' : 'support') ? s.bg : 'white', border: `1px solid ${filterStatus !== 'all' && filterStatus === (s.label === 'Not Home' ? 'not_home' : s.label === 'Undecided' ? 'undecided' : s.label === 'Opposition' ? 'oppose' : 'support') ? s.color : '#E2E8F0'}`, borderRadius: 12, padding: '12px 16px', cursor: 'pointer', textAlign: 'left' }}
          >
            <p style={{ fontSize: 22, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: s.color }}>{s.count}</p>
            <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{s.label}</p>
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-4">
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search voter name or address..."
            style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 9, padding: '9px 12px 9px 34px', fontSize: 13, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{ border: '1px solid #E2E8F0', borderRadius: 9, padding: '9px 12px', fontSize: 13, color: '#475569', outline: 'none', backgroundColor: 'white' }}
        >
          <option value="all">All Statuses</option>
          <option value="support">Supporters</option>
          <option value="undecided">Undecided</option>
          <option value="oppose">Opposition</option>
          <option value="not_home">Not Home</option>
        </select>
      </div>

      {/* Voter List grouped by address */}
      <div className="space-y-3">
        {grouped.map(([address, voters]) => {
          const isExpanded = expandedAddresses.has(address);
          const hasVoiceNote = voters.some((v: any) => v.voiceNote);
          return (
            <div key={address} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {/* Address header */}
              <button
                onClick={() => toggleAddress(address)}
                className="w-full flex items-center gap-3 px-5 py-3.5"
                style={{ border: 'none', background: 'none', cursor: 'pointer', borderBottom: isExpanded ? '1px solid #F1F5F9' : 'none' }}
              >
                <div style={{ width: 32, height: 32, backgroundColor: '#F1F5F9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={14} style={{ color: '#64748B' }} />
                </div>
                <div className="flex-1 text-left">
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{address}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8' }}>{voters.length} voter{voters.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex items-center gap-2">
                  {hasVoiceNote && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#EFF6FF', borderRadius: 6, padding: '3px 8px' }}>
                      <Mic size={11} style={{ color: '#2563EB' }} />
                      <span style={{ fontSize: 11, color: '#2563EB', fontWeight: 500 }}>Voice note</span>
                    </div>
                  )}
                  <div className="flex gap-1">
                    {voters.map((v: any) => {
                      const cfg = STATUS_CONFIG[v.status];
                      return <div key={v.id} style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: cfg.color }} />;
                    })}
                  </div>
                  {isExpanded ? <ChevronUp size={16} style={{ color: '#94A3B8' }} /> : <ChevronDown size={16} style={{ color: '#94A3B8' }} />}
                </div>
              </button>

              {/* Voter rows */}
              {isExpanded && (
                <div className="divide-y divide-slate-50">
                  {voters.map((voter: any) => {
                    const cfg = STATUS_CONFIG[voter.status];
                    const StatusIcon = cfg.icon;
                    return (
                      <div key={voter.id} className="px-5 py-3.5 flex items-center gap-4">
                        <div style={{ width: 36, height: 36, backgroundColor: '#F8FAFC', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #E2E8F0' }}>
                          <User size={15} style={{ color: '#94A3B8' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{voter.name}</p>
                            <span style={{ fontSize: 11, color: '#94A3B8' }}>Age {voter.age}</span>
                            {voter.voiceNote && <Mic size={11} style={{ color: '#2563EB' }} />}
                          </div>
                          {voter.notes && <p style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}>{voter.notes}</p>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: cfg.bg, borderRadius: 7, padding: '4px 10px' }}>
                          <StatusIcon size={12} style={{ color: cfg.color }} />
                          <span style={{ fontSize: 12, fontWeight: 600, color: cfg.color }}>{cfg.label}</span>
                        </div>
                        <div className="flex gap-2">
                          <button style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Phone size={13} style={{ color: '#475569' }} />
                          </button>
                          <button style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MessageSquare size={13} style={{ color: '#475569' }} />
                          </button>
                          <button style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={13} style={{ color: '#475569' }} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {grouped.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <AlertCircle size={32} style={{ color: '#CBD5E1', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 14, color: '#94A3B8' }}>No voters match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
