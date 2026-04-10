 'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [remember, setRemember]     = useState(true);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
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
    <div
      className="min-h-screen relative flex flex-col items-center justify-center"
      style={{ backgroundColor: '#F0F2F5', fontFamily: "'Inter', sans-serif", padding: '32px 16px' }}
    >
      {/* Split background — same as super admin */}
      <div className="absolute inset-x-0 top-0 h-1/2" style={{ backgroundColor: '#0F172A' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: '#F0F2F5' }} />

      {/* Top-left brand */}
      <div className="absolute top-6 left-8 z-10">
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, color: 'white', letterSpacing: '-0.025em' }}>
          Campaign <span style={{ color: '#2563EB' }}>365</span>
        </span>
      </div>

      {/* Top-right status */}
      <div className="absolute top-6 right-8 z-10 flex items-center gap-2">
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
        <span style={{ fontWeight: 500, fontSize: 13, color: '#94A3B8' }}>All systems operational</span>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full" style={{ maxWidth: 440 }}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* ── Header ── */}
          <div style={{ padding: '40px 40px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em', color: '#0F172A', marginBottom: 6 }}>
                Campaign <span style={{ color: '#2563EB' }}>365</span>
              </h1>
              <p style={{ fontWeight: 400, fontSize: 15, color: '#64748B', margin: 0 }}>
                Sign in to your account
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
                <p style={{ color: '#DC2626', fontSize: 13, margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontWeight: 500, fontSize: 14, color: '#374151', marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={e => (e.target.style.borderColor = '#2563EB')}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontWeight: 500, fontSize: 14, color: '#374151', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
                  <input
                    type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                    style={{ flex: 1, border: 'none', padding: '10px 14px', fontSize: 14, color: '#0F172A', outline: 'none', fontFamily: 'inherit' }}
                  />
                  {/* iOS-style toggle — same as super admin */}
                  <div style={{ paddingRight: 12 }}>
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{ position: 'relative', width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', backgroundColor: showPass ? '#2563EB' : '#CBD5E1', transition: 'background-color 0.2s' }}
                    >
                      <span style={{ position: 'absolute', top: 3, left: showPass ? 21 : 3, width: 16, height: 16, borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s', display: 'block' }} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setRemember(!remember)}
                    style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${remember ? '#2563EB' : '#CBD5E1'}`, backgroundColor: remember ? '#2563EB' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, padding: 0 }}
                  >
                    {remember && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                  <span onClick={() => setRemember(!remember)} style={{ fontSize: 14, color: '#64748B', cursor: 'pointer', userSelect: 'none' }}>
                    Remember me
                  </span>
                </div>
                <a href="/forgot-password" style={{ fontSize: 14, fontWeight: 500, color: '#2563EB', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                style={{ width: '100%', padding: '12px', borderRadius: 8, border: 'none', backgroundColor: '#2563EB', color: 'white', fontWeight: 600, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit', letterSpacing: '0.01em' }}
              >
                {loading && <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />}
                Sign In to Campaign 365
              </button>
            </form>
          </div>

          {/* ── Dev Quick Login ── */}
          <div style={{ background: '#F8FAFC', borderTop: '1px solid #F1F5F9', padding: '16px 40px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F59E0B' }} />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#92400E', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Dev Quick Login</span>
            </div>

            {/* Super Admin */}
            <button
              onClick={() => { localStorage.removeItem('c365_tenant'); handleDevLogin(SUPER_ADMIN, 'super'); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: 10, padding: '9px 13px', cursor: 'pointer', marginBottom: 10, fontFamily: 'inherit', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#DBEAFE')}
              onMouseLeave={e => (e.currentTarget.style.background = '#EFF6FF')}
            >
              <div style={{ width: 30, height: 30, background: '#2563EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
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
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', background: t.color + '0f', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
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
                        <button
                          key={r.role}
                          onClick={() => handleDevLogin(r, t.label.toLowerCase().replace(/\s+/g, ''))}
                          style={{ background: t.color + '12', border: `1px solid ${t.color}20`, borderRadius: 8, padding: '7px 9px', fontSize: 11, fontWeight: 600, color: t.textColor, cursor: 'pointer', textAlign: 'left', lineHeight: 1.35, fontFamily: 'inherit', transition: 'opacity 0.12s' }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '0.72')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                        >
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

          {/* Footer — same as super admin */}
          <div style={{ padding: '12px 40px', borderTop: '1px solid #F1F5F9', backgroundColor: '#F8FAFC', textAlign: 'center' }}>
            <p style={{ fontWeight: 400, fontSize: 12, color: '#94A3B8', margin: 0 }}>
              Powered by Campaign 365 · All passwords:{' '}
              <code style={{ color: '#64748B', background: '#E2E8F0', padding: '1px 6px', borderRadius: 4, fontSize: 10 }}>password</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}