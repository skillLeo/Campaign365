'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MOCK_CAMPAIGNS = [
  {
    id: 1,
    name: '2026 General Election — National',
    status: 'active',
    votersTargeted: 15432,
    responses: 8721,
    constituency: 'National',
    start_date: '2026-01-01',
    end_date: '2026-11-05',
    progress: 57,
  },
  {
    id: 2,
    name: '2025 Constituency Campaign — St. Christopher 1',
    status: 'upcoming',
    votersTargeted: 8722,
    responses: 8721,
    constituency: 'St. Christopher North',
    start_date: '2025-06-01',
    end_date: '2025-11-05',
    progress: 35,
  },
  {
    id: 3,
    name: 'GOTV Final Push — Basseterre',
    status: 'active',
    votersTargeted: 12000,
    responses: 9240,
    constituency: 'Basseterre Central',
    start_date: '2026-02-01',
    end_date: '2026-10-01',
    progress: 77,
  },
  {
    id: 4,
    name: 'Rural Outreach — Nevis Division',
    status: 'completed',
    votersTargeted: 5200,
    responses: 5200,
    constituency: 'Nevis',
    start_date: '2025-01-01',
    end_date: '2025-08-30',
    progress: 100,
  },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  active:    { bg: '#DCFCE7', color: '#16A34A', label: 'Active' },
  upcoming:  { bg: '#FEF3C7', color: '#D97706', label: 'Upcoming' },
  completed: { bg: '#DBEAFE', color: '#2563EB', label: 'Completed' },
  draft:     { bg: '#F3F4F6', color: '#6B7280', label: 'Draft' },
};

const EMPTY_FORM = { name: '', constituency: 'All', start_date: '', end_date: '', votersTargeted: '' };

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS as any[]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreate, setShowCreate]     = useState(false);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const router = useRouter();

  useEffect(() => {
    api.get('/campaigns')
      .then(r => { if (r.data.data?.length) setCampaigns(r.data.data); })
      .catch(() => {});
  }, []);

  const handleCreate = () => {
    if (!form.name.trim()) return;
    setCampaigns(prev => [{
      id: prev.length + 1,
      name: form.name,
      status: 'upcoming',
      votersTargeted: Number(form.votersTargeted) || 0,
      responses: 0,
      constituency: form.constituency,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      progress: 0,
    }, ...prev]);
    setForm(EMPTY_FORM);
    setShowCreate(false);
  };

  const filtered = statusFilter === 'all'
    ? campaigns
    : campaigns.filter(c => c.status === statusFilter);

  const activeCnt    = campaigns.filter(c => c.status === 'active').length;
  const upcomingCnt  = campaigns.filter(c => c.status === 'upcoming').length;
  const completedCnt = campaigns.filter(c => c.status === 'completed').length;
  const totalTargeted = campaigns.reduce((s, c) => s + (c.votersTargeted || 0), 0);
  const totalResponses = campaigns.reduce((s, c) => s + (c.responses || 0), 0);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#F5F5F5' }}>

      {/* ── Top area: breadcrumb + title + CTA ── */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '14px 24px 0' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280' }}>
            <button onClick={() => router.push('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: 13, fontFamily: 'inherit', padding: 0 }}>
              Dashboard
            </button>
            <span>›</span>
            <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Campaigns</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#C8102E', border: '2px solid white' }} />
            </button>
            <button style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
            {/* Flag icon */}
            <div style={{ width: 34, height: 34, borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #E5E7EB', flexShrink: 0 }}>
              <svg viewBox="0 0 60 40" width="34" height="34">
                <polygon points="0,0 60,40 0,40" fill="#009E60"/>
                <polygon points="0,0 60,0 60,40" fill="#CE1126"/>
                <polygon points="0,0 60,40 54,40 6,0" fill="#000000"/>
                <polygon points="0,0 6,0 60,40 54,40 58,40 10,0" fill="#FCD116"/>
                <polygon points="0,4 4,0 60,36 56,40 0,40 0,36" fill="#FCD116"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Title + CTA */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <h1
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#111111',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            All Campaigns
          </h1>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              backgroundColor: '#C8102E',
              color: 'white',
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Plus size={16} /> Create New Campaign
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 40, borderBottom: '2px solid #E5E7EB', paddingBottom: 0 }}>
          {[
            { key: 'active',    label: 'Active',          value: activeCnt,                    isActive: statusFilter === 'active' },
            { key: 'upcoming',  label: 'Upcoming',        value: upcomingCnt,                  isActive: statusFilter === 'upcoming' },
            { key: 'completed', label: 'Completed',       value: completedCnt,                 isActive: statusFilter === 'completed' },
            { key: 'all-target', label: 'Voters Targeted', value: totalTargeted.toLocaleString(), isActive: false },
            { key: 'all-resp1', label: 'Responses',       value: totalResponses.toLocaleString(), isActive: false },
            { key: 'all-resp2', label: 'Responses',       value: totalResponses.toLocaleString(), isActive: false },
          ].map(item => (
            <div
              key={item.key}
              onClick={() => { if (['active','upcoming','completed'].includes(item.key)) setStatusFilter(item.key); else setStatusFilter('all'); }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingBottom: 14,
                cursor: 'pointer',
                borderBottom: item.isActive ? '3px solid #C8102E' : '3px solid transparent',
                marginBottom: -2,
                minWidth: 80,
              }}
            >
              <span style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>{item.label}</span>
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                  color: item.isActive ? '#C8102E' : '#111111',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Campaign cards grid ── */}
      <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {filtered.map(c => {
          const ss = STATUS_STYLE[c.status] || STATUS_STYLE.draft;
          const pct = c.progress ?? (c.votersTargeted > 0 ? Math.min(100, Math.round((c.responses / c.votersTargeted) * 100)) : 0);

          return (
            <div
              key={c.id}
              onClick={() => router.push(`/campaigns/${c.id}`)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: '22px 22px 18px',
                border: '1px solid #E8E8E8',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.10)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
            >
              {/* Campaign name */}
              <h3
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  color: '#111111',
                  margin: '0 0 10px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                }}
              >
                {c.name}
              </h3>

              {/* Status + progress */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>Status</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '3px 12px',
                    borderRadius: 20,
                    backgroundColor: ss.bg,
                    color: ss.color,
                  }}
                >
                  {ss.label}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: 6, backgroundColor: '#E5E7EB', borderRadius: 4, marginBottom: 16, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', backgroundColor: '#C8102E', borderRadius: 4, transition: 'width 0.5s' }} />
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '8px 24px' }}>
                <div>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 2px' }}>Voters Targeted</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 22, color: '#111111', margin: 0, letterSpacing: '-0.02em' }}>
                    {(c.votersTargeted || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 2px' }}>Responses</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 22, color: '#111111', margin: 0, letterSpacing: '-0.02em' }}>
                    {(c.responses || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 2px' }}>Responses</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 22, color: '#111111', margin: 0, letterSpacing: '-0.02em' }}>
                    {(c.responses || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Constituency row */}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: 12, color: '#9CA3AF' }}>2025 Constituency Campaign — {c.constituency}</span>
              </div>

              {/* Bottom stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '6px 24px', marginTop: 12 }}>
                <div>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 2px' }}>Voters Targeted</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 18, color: '#111111', margin: 0 }}>
                    {(c.votersTargeted || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 2px' }}>Responses</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 18, color: '#111111', margin: 0 }}>
                    {(c.responses || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 2px' }}>Responses</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 18, color: '#111111', margin: 0 }}>
                    {(c.responses || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Create Campaign Modal ── */}
      {showCreate && (
        <>
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 50 }} onClick={() => setShowCreate(false)} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 51, width: 'min(480px, 92vw)', backgroundColor: '#fff', borderRadius: 20, boxShadow: '0 25px 60px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 800, fontSize: 20, color: '#111111', margin: 0 }}>Create New Campaign</h3>
              <button onClick={() => setShowCreate(false)} style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', display: 'flex' }}>
                <X size={16} style={{ color: '#374151' }} />
              </button>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Campaign Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. GOTV Final Push 2026"
                  style={{ width: '100%', boxSizing: 'border-box', border: '1.5px solid #E5E7EB', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: '#111111', outline: 'none', fontFamily: 'inherit' }}
                  onFocus={e => (e.target.style.borderColor = '#C8102E')}
                  onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Voter Target</label>
                  <input type="number" value={form.votersTargeted} onChange={e => setForm(p => ({ ...p, votersTargeted: e.target.value }))} placeholder="5000"
                    style={{ width: '100%', boxSizing: 'border-box', border: '1.5px solid #E5E7EB', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: '#111111', outline: 'none', fontFamily: 'inherit' }}
                    onFocus={e => (e.target.style.borderColor = '#C8102E')} onBlur={e => (e.target.style.borderColor = '#E5E7EB')} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Constituency</label>
                  <select value={form.constituency} onChange={e => setForm(p => ({ ...p, constituency: e.target.value }))}
                    style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: '#111111', outline: 'none', fontFamily: 'inherit', backgroundColor: '#fff' }}>
                    <option>All</option>
                    <option>Basseterre Central</option>
                    <option>St. Christopher North</option>
                    <option>Nevis</option>
                    <option>National</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleCreate}
                style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', backgroundColor: '#C8102E', color: '#fff', fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 17, cursor: 'pointer', letterSpacing: '0.02em', marginTop: 4 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Create Campaign
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
