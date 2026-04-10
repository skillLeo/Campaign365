'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Eye, EyeOff, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

const PRIMARY = '#DC2626';

const TENANTS = [
  {
    label: 'SKNLP',
    fullName: 'St. Kitts & Nevis Labour Party',
    color: '#DC2626',
    textColor: '#991B1B',
    roles: [
      { label: 'General Secretary', email: 'admin@sknlp.campaign365.app',     role: 'general_secretary', name: 'General Secretary SKNLP', redirect: '/dashboard' },
      { label: 'Campaign Manager',  email: 'manager@sknlp.campaign365.app',   role: 'campaign_manager',  name: 'Campaign Manager',        redirect: '/campaigns' },
      { label: 'Data Manager',      email: 'data@sknlp.campaign365.app',      role: 'data_manager',      name: 'Data Manager',            redirect: '/voters' },
      { label: 'Region Manager',    email: 'region@sknlp.campaign365.app',    role: 'region_manager',    name: 'Region Manager',          redirect: '/canvassing' },
      { label: 'Branch Manager',    email: 'branch@sknlp.campaign365.app',    role: 'branch_manager',    name: 'Branch Manager',          redirect: '/canvassing' },
      { label: 'Canvasser',         email: 'canvasser@sknlp.campaign365.app', role: 'canvasser',          name: 'Field Canvasser',         redirect: '/canvassing' },
      { label: 'Phone Bank',        email: 'phonebank@sknlp.campaign365.app', role: 'phone_bank',         name: 'Phone Bank Agent',        redirect: '/phone-bank' },
      { label: 'Runner',            email: 'runner@sknlp.campaign365.app',    role: 'runner',             name: 'Runner Agent',            redirect: '/runners' },
      { label: 'Outdoor Agent',     email: 'outdoor@sknlp.campaign365.app',   role: 'outdoor_agent',      name: 'Outdoor Agent',           redirect: '/outdoor-agent' },
      { label: 'Candidate',         email: 'candidate@sknlp.campaign365.app', role: 'candidate',          name: 'Political Candidate',     redirect: '/dashboard' },
    ],
  },
  {
    label: 'JLP',
    fullName: 'Jamaica Labour Party',
    color: '#16A34A',
    textColor: '#14532D',
    roles: [
      { label: 'General Secretary', email: 'admin@jlp.campaign365.app',     role: 'general_secretary', name: 'Campaign Manager JLP', redirect: '/dashboard' },
      { label: 'Campaign Manager',  email: 'manager@jlp.campaign365.app',   role: 'campaign_manager',  name: 'Campaign Manager JLP', redirect: '/campaigns' },
      { label: 'Canvasser',         email: 'canvasser@jlp.campaign365.app', role: 'canvasser',          name: 'JLP Canvasser',        redirect: '/canvassing' },
    ],
  },
  {
    label: 'Jane Doe',
    fullName: 'Jane Doe — Independent Candidate',
    color: '#2563EB',
    textColor: '#1E3A8A',
    roles: [
      { label: 'Campaign Admin', email: 'admin@janedoe.campaign365.app', role: 'general_secretary', name: 'Jane Doe', redirect: '/dashboard' },
    ],
  },
];

const SUPER_ADMIN = {
  email: 'admin@campaign365.app',
  role: 'super_admin',
  name: 'Super Admin',
  redirect: '/super/dashboard',
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTenant, setActiveTenant] = useState<string | null>('SKNLP');
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleDevLogin = (
    role: { email: string; role: string; name: string; redirect: string },
    tenantKey: string
  ) => {
    const token = 'mock-token-' + role.role + '-' + Date.now();
    const user = { id: Math.floor(Math.random() * 900) + 1, name: role.name, email: role.email, tenant: tenantKey };
    localStorage.setItem('c365_token', token);
    localStorage.setItem('c365_role', role.role);
    localStorage.setItem('c365_user', JSON.stringify(user));
    localStorage.setItem('c365_tenant', tenantKey);
    setAuth(token, user);
    router.push(role.redirect);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (email && password) {
      const token = 'mock-tenant-token-' + Date.now();
      const user = { id: 1, name: 'General Secretary SKNLP', email };
      const tenantKey = email.includes('@jlp.') ? 'jlp' : email.includes('@janedoe.') ? 'janedoe' : 'sknlp';
      localStorage.setItem('c365_token', token);
      localStorage.setItem('c365_role', 'general_secretary');
      localStorage.setItem('c365_user', JSON.stringify(user));
      localStorage.setItem('c365_tenant', tenantKey);
      setAuth(token, user);
      router.push('/dashboard');
    } else {
      setError('Please enter your email and password');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0B1120',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #DC2626 50%, #15803D 50%)' }} />
            <span style={{ position: 'relative', zIndex: 1, color: '#fff', fontSize: 9, fontWeight: 900 }}>SK</span>
          </div>
          <div>
            <p style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 13, lineHeight: 1, margin: 0 }}>SKNLP</p>
            <p style={{ color: '#475569', fontSize: 10, margin: '1px 0 0' }}>Campaign 365</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
          All systems operational
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>

          {/* ── Red header ── */}
          <div style={{ background: PRIMARY, padding: '26px 32px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <div>
              <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Welcome to SKNLP</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: 0 }}>Campaign 365 · Sign in to continue</p>
            </div>
          </div>

          {/* ── Form ── */}
          <div style={{ padding: '26px 32px 22px' }}>
            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
                <p style={{ color: '#DC2626', fontSize: 13, margin: 0 }}>{error}</p>
              </div>
            )}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  style={{ width: '100%', border: '1.5px solid #E5E7EB', borderRadius: 9, padding: '10px 13px', fontSize: 13.5, color: '#111827', outline: 'none', fontFamily: 'inherit', background: '#F9FAFB', boxSizing: 'border-box', transition: 'all 0.15s' }}
                  onFocus={e => { e.target.style.borderColor = PRIMARY; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.08)'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; e.target.style.background = '#F9FAFB'; }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #E5E7EB', borderRadius: 9, background: '#F9FAFB', overflow: 'hidden', transition: 'all 0.15s' }}
                  onFocusCapture={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = PRIMARY; d.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.08)'; d.style.background = '#fff'; }}
                  onBlurCapture={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = '#E5E7EB'; d.style.boxShadow = 'none'; d.style.background = '#F9FAFB'; }}>
                  <input
                    type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                    style={{ flex: 1, border: 'none', padding: '10px 13px', fontSize: 13.5, color: '#111827', outline: 'none', fontFamily: 'inherit', background: 'transparent' }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    style={{ padding: '0 13px', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }} onClick={() => setRemember(!remember)}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${remember ? PRIMARY : '#D1D5DB'}`, background: remember ? PRIMARY : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {remember && <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span style={{ fontSize: 12.5, color: '#6B7280' }}>Remember me</span>
                </div>
                <a href="/forgot-password" style={{ fontSize: 12.5, color: PRIMARY, fontWeight: 600, textDecoration: 'none' }}>Forgot Password?</a>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{ width: '100%', background: PRIMARY, color: '#fff', border: 'none', borderRadius: 9, padding: '12px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit', letterSpacing: '0.01em', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#B91C1C'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = PRIMARY; }}>
                {loading && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                Sign In to Campaign 365
              </button>
            </form>
          </div>

          {/* ── Dev Quick Login ── */}
          <div style={{ background: '#F8FAFC', borderTop: '1px solid #F1F5F9', padding: '16px 32px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F59E0B' }} />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dev Quick Login</span>
            </div>

            {/* Super Admin */}
            <button
              onClick={() => { localStorage.removeItem('c365_tenant'); handleDevLogin(SUPER_ADMIN, 'super'); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: 10, padding: '9px 13px', cursor: 'pointer', marginBottom: 10, fontFamily: 'inherit', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#DBEAFE')}
              onMouseLeave={e => (e.currentTarget.style.background = '#EFF6FF')}>
              <div style={{ width: 30, height: 30, background: '#2563EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF', margin: 0 }}>Super Admin</p>
                <p style={{ fontSize: 10, color: '#60A5FA', margin: 0 }}>admin@campaign365.app</p>
              </div>
              <ChevronDown size={13} color="#93C5FD" />
            </button>

            {/* Tenants */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {TENANTS.map(t => (
                <div key={t.label} style={{ borderRadius: 10, overflow: 'hidden', border: `1.5px solid ${t.color}30` }}>
                  <button
                    onClick={() => setActiveTenant(activeTenant === t.label ? null : t.label)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', background: t.color + '0f', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: t.color, flex: 1, textAlign: 'left' }}>{t.label}</span>
                    <span style={{ fontSize: 10, color: '#9CA3AF' }}>{t.fullName}</span>
                    {activeTenant === t.label
                      ? <ChevronUp size={12} color={t.color} />
                      : <ChevronDown size={12} color="#9CA3AF" />}
                  </button>
                  {activeTenant === t.label && (
                    <div style={{ padding: 8, background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                      {t.roles.map(r => (
                        <button key={r.role}
                          onClick={() => handleDevLogin(r, t.label.toLowerCase().replace(/\s+/g, ''))}
                          style={{ background: t.color + '12', border: `1px solid ${t.color}20`, borderRadius: 8, padding: '7px 9px', fontSize: 11, fontWeight: 600, color: t.textColor, cursor: 'pointer', textAlign: 'left', lineHeight: 1.35, fontFamily: 'inherit', transition: 'opacity 0.12s' }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '0.72')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                          {r.label}
                          <span style={{ display: 'block', fontSize: 9, color: '#9CA3AF', fontWeight: 400, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {r.email}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 11, color: '#334155' }}>
          Powered by <span style={{ color: '#475569', fontWeight: 600 }}>Campaign 365</span> · All passwords:{' '}
          <code style={{ color: '#94A3B8', background: '#1E293B', padding: '1px 6px', borderRadius: 4, fontSize: 10 }}>password</code>
        </p>
      </div>
    </div>
  );
}