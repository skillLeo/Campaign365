'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Eye, EyeOff, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

const PRIMARY = '#DC2626';

// ── Dev quick-login accounts — match database seeders exactly ──
const TENANTS = [
  {
    label: 'SKNLP',
    fullName: 'St. Kitts & Nevis Labour Party',
    color: '#DC2626',
    roles: [
      { label: 'General Secretary', email: 'admin@sknlp.campaign365.app',    role: 'general_secretary', name: 'General Secretary SKNLP', redirect: '/dashboard' },
      { label: 'Campaign Manager',  email: 'manager@sknlp.campaign365.app',  role: 'campaign_manager',  name: 'Campaign Manager',       redirect: '/campaigns' },
      { label: 'Data Manager',      email: 'data@sknlp.campaign365.app',     role: 'data_manager',      name: 'Data Manager',           redirect: '/voters' },
      { label: 'Region Manager',    email: 'region@sknlp.campaign365.app',   role: 'region_manager',    name: 'Region Manager',         redirect: '/canvassing' },
      { label: 'Branch Manager',    email: 'branch@sknlp.campaign365.app',   role: 'branch_manager',    name: 'Branch Manager',         redirect: '/canvassing' },
      { label: 'Canvasser',         email: 'canvasser@sknlp.campaign365.app',role: 'canvasser',          name: 'Field Canvasser',        redirect: '/canvassing' },
      { label: 'Phone Bank',        email: 'phonebank@sknlp.campaign365.app',role: 'phone_bank',         name: 'Phone Bank Agent',       redirect: '/phone-bank' },
      { label: 'Runner',            email: 'runner@sknlp.campaign365.app',   role: 'runner',             name: 'Runner Agent',           redirect: '/runners' },
      { label: 'Outdoor Agent',     email: 'outdoor@sknlp.campaign365.app',  role: 'outdoor_agent',      name: 'Outdoor Agent',          redirect: '/outdoor-agent' },
      { label: 'Candidate',         email: 'candidate@sknlp.campaign365.app',role: 'candidate',          name: 'Political Candidate',    redirect: '/dashboard' },
    ],
  },
  {
    label: 'JLP',
    fullName: 'Jamaica Labour Party',
    color: '#16A34A',
    roles: [
      { label: 'General Secretary', email: 'admin@jlp.campaign365.app',    role: 'general_secretary', name: 'Campaign Manager JLP', redirect: '/dashboard' },
      { label: 'Campaign Manager',  email: 'manager@jlp.campaign365.app',  role: 'campaign_manager',  name: 'Campaign Manager JLP', redirect: '/campaigns' },
      { label: 'Canvasser',         email: 'canvasser@jlp.campaign365.app',role: 'canvasser',          name: 'JLP Canvasser',        redirect: '/canvassing' },
    ],
  },
  {
    label: 'Jane Doe',
    fullName: 'Jane Doe — Independent Candidate',
    color: '#2563EB',
    roles: [
      { label: 'Campaign Admin', email: 'admin@janedoe.campaign365.app', role: 'general_secretary', name: 'Jane Doe', redirect: '/dashboard' },
    ],
  },
];

const SUPER_ADMIN = { label: 'Super Admin', email: 'admin@campaign365.app', role: 'super_admin', name: 'Super Admin', redirect: '/super/dashboard', color: '#2563EB' };

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTenant, setActiveTenant] = useState<string | null>('SKNLP');
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleDevLogin = (role: { email: string; role: string; name: string; redirect: string }, tenantKey: string) => {
    const mockToken = 'mock-token-' + role.role + '-' + Date.now();
    const mockUser = { id: Math.floor(Math.random() * 900) + 1, name: role.name, email: role.email, tenant: tenantKey };
    localStorage.setItem('c365_token', mockToken);
    localStorage.setItem('c365_role', role.role);
    localStorage.setItem('c365_user', JSON.stringify(mockUser));
    localStorage.setItem('c365_tenant', tenantKey);
    setAuth(mockToken, mockUser);
    router.push(role.redirect);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (email && password) {
      const mockToken = 'mock-tenant-token-' + Date.now();
      const mockUser = { id: 1, name: 'General Secretary SKNLP', email };
      const tenantKey = email.includes('@jlp.') ? 'jlp' : email.includes('@janedoe.') ? 'janedoe' : 'sknlp';
      localStorage.setItem('c365_token', mockToken);
      localStorage.setItem('c365_role', 'general_secretary');
      localStorage.setItem('c365_user', JSON.stringify(mockUser));
      localStorage.setItem('c365_tenant', tenantKey);
      setAuth(mockToken, mockUser);
      router.push('/dashboard');
    } else {
      setError('Please enter your email and password');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', padding: '20px' }}>
      {/* Top-left branding */}
      <div style={{ position: 'absolute', top: 24, left: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #DC2626 50%, #15803D 50%)' }} />
          <span style={{ position: 'relative', zIndex: 1, color: 'white', fontSize: 10, fontWeight: 900 }}>SK</span>
        </div>
        <div>
          <p style={{ color: 'white', fontWeight: 800, fontSize: 14, lineHeight: 1, margin: 0 }}>SKNLP</p>
          <p style={{ color: '#64748B', fontSize: 10, margin: '2px 0 0' }}>Campaign 365</p>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 460 }}>
        {/* Login card */}
        <div style={{ backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
          {/* Red header */}
          <div style={{ backgroundColor: PRIMARY, padding: '22px 32px 18px', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 13, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 17, margin: 0, letterSpacing: '-0.01em' }}>Welcome to SKNLP</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 3, marginBottom: 0 }}>Campaign 365 Platform</p>
          </div>

          {/* Form */}
          <div style={{ padding: '22px 32px 18px' }}>
            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '9px 13px', marginBottom: 14 }}>
                <p style={{ color: '#DC2626', fontSize: 13, margin: 0 }}>{error}</p>
              </div>
            )}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com"
                  style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 13px', fontSize: 13, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = PRIMARY)} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                    style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '9px 40px 9px 13px', fontSize: 13, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = PRIMARY)} onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0, display: 'flex' }}>
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                style={{ width: '100%', backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 9, padding: '11px', fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                {loading && <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />}
                Log In
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <a href="/forgot-password" style={{ fontSize: 12, color: PRIMARY, fontWeight: 500, textDecoration: 'none' }}>Forgot Password?</a>
            </div>
          </div>

          {/* ── Dev Quick Login ── */}
          <div style={{ borderTop: '2px dashed #FEE2E2', margin: '0 20px' }} />
          <div style={{ padding: '14px 24px 20px' }}>
            {/* Super Admin button */}
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#F59E0B', display: 'inline-block' }} />
                Dev — Quick Login
              </p>
              <button onClick={() => { localStorage.removeItem('c365_tenant'); handleDevLogin(SUPER_ADMIN, 'super'); }}
                style={{ width: '100%', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: 9, padding: '9px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>🔑</span>
                <span>Super Admin</span>
                <span style={{ fontSize: 10, opacity: 0.75, marginLeft: 'auto' }}>{SUPER_ADMIN.email}</span>
              </button>
            </div>

            {/* Tenant accordion buttons */}
            <div className="space-y-2">
              {TENANTS.map(tenant => (
                <div key={tenant.label} style={{ border: `1.5px solid ${tenant.color}30`, borderRadius: 10, overflow: 'hidden' }}>
                  {/* Tenant header */}
                  <button onClick={() => setActiveTenant(activeTenant === tenant.label ? null : tenant.label)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', backgroundColor: tenant.color + '10', border: 'none', cursor: 'pointer' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: tenant.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: tenant.color, flex: 1, textAlign: 'left' }}>{tenant.label}</span>
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>{tenant.fullName}</span>
                    {activeTenant === tenant.label
                      ? <ChevronUp size={13} style={{ color: tenant.color }} />
                      : <ChevronDown size={13} style={{ color: '#94A3B8' }} />}
                  </button>
                  {/* Role buttons */}
                  {activeTenant === tenant.label && (
                    <div style={{ padding: '8px', backgroundColor: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                      {tenant.roles.map(role => (
                        <button key={role.role} onClick={() => handleDevLogin(role, tenant.label.toLowerCase().replace(/\s+/g, ''))}
                          style={{ backgroundColor: tenant.color + '10', border: `1px solid ${tenant.color}25`, borderRadius: 8, padding: '7px 10px', fontSize: 11, fontWeight: 600, color: tenant.color, cursor: 'pointer', textAlign: 'left', lineHeight: 1.3, transition: 'all 0.1s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = tenant.color + '22'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = tenant.color + '10'; }}>
                          {role.label}
                          <span style={{ display: 'block', fontSize: 9, color: '#94A3B8', fontWeight: 400, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{role.email}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 11, color: '#475569' }}>
          Powered by <span style={{ color: '#94A3B8', fontWeight: 600 }}>Campaign 365</span> · All passwords: <code style={{ color: '#94A3B8' }}>password</code>
        </p>
      </div>
    </div>
  );
}
