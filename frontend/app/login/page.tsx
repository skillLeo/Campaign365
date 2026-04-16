'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { tenantThemes } from '@/lib/tenantTheme';
import { Loader2 } from 'lucide-react';

const TENANTS = [
  {
    label: 'SKNLP', fullName: 'St. Kitts & Nevis Labour Party', color: '#DC143C',
    roles: [
      { label: 'General Secretary', email: 'admin@sknlp.campaign365.app',     role: 'general_secretary', name: 'Marcus Liburd',    redirect: '/dashboard' },
      { label: 'Campaign Manager',  email: 'manager@sknlp.campaign365.app',   role: 'campaign_manager',  name: 'Campaign Manager', redirect: '/campaigns' },
      { label: 'Canvasser',         email: 'canvasser@sknlp.campaign365.app', role: 'canvasser',         name: 'Field Canvasser',  redirect: '/canvassing' },
    ],
  },
];

const SUPER_ADMIN = { email: 'admin@campaign365.app', role: 'super_admin', name: 'Super Admin', redirect: '/super/dashboard' };

function setBrandingForTenant(tenantKey: string, setBranding: (b: any) => void) {
  const theme = tenantThemes[tenantKey] || tenantThemes.default;
  setBranding({ name: theme.name, party_name: theme.fullName, logo_url: null, primary_color: theme.primary, secondary_color: theme.sidebar, font: 'Inter', subdomain: tenantKey });
}

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showDev, setShowDev]   = useState(false);
  const router = useRouter();
  const { setAuth, setBranding } = useAuthStore();

  const handleDevLogin = (role: any, tenantKey: string) => {
    const token = 'mock-token-' + role.role + '-' + Date.now();
    const user = { id: 1, name: role.name, email: role.email, tenant: tenantKey };
    localStorage.setItem('c365_token', token);
    localStorage.setItem('c365_role', role.role);
    localStorage.setItem('c365_user', JSON.stringify(user));
    localStorage.setItem('c365_tenant', tenantKey);
    setBrandingForTenant(tenantKey, setBranding);
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
      const user = { id: 1, name: 'Marcus Liburd', email };
      const tenantKey = 'sknlp';
      localStorage.setItem('c365_token', token);
      localStorage.setItem('c365_role', 'campaign_manager');
      localStorage.setItem('c365_user', JSON.stringify(user));
      localStorage.setItem('c365_tenant', tenantKey);
      setBrandingForTenant(tenantKey, setBranding);
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
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* ── BACKGROUND LAYER 1: Base dark ── */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0A0D14' }} />

      {/* ── BACKGROUND LAYER 2: St. Kitts flag diagonal overlay ── */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35 }}
      >
        {/* Green triangle – bottom left */}
        <polygon points="0,900 0,0 600,900" fill="#1a5c2c" />
        {/* Red triangle – top right */}
        <polygon points="1440,0 1440,900 840,0" fill="#8B0000" />
        {/* Black diagonal band */}
        <polygon points="420,0 720,0 1020,900 720,900" fill="#000000" />
        {/* Gold/yellow border stripes of the black band */}
        <polygon points="420,0 490,0 790,900 720,900" fill="#B8860B" fillOpacity="0.9" />
        <polygon points="650,0 720,0 1020,900 950,900" fill="#B8860B" fillOpacity="0.9" />
      </svg>

      {/* ── BACKGROUND LAYER 3: Dark overlay to deepen it ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(5,6,12,0.65) 0%, rgba(5,6,12,0.45) 45%, rgba(5,6,12,0.75) 100%)',
      }} />

      {/* ── BACKGROUND LAYER 4: Rally crowd silhouette at bottom ── */}
      <svg
        viewBox="0 0 1440 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ position: 'absolute', bottom: 0, width: '100%', height: '38%' }}
      >
        {/* Red energy glow from crowd */}
        <defs>
          <radialGradient id="crowdGlow" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#DC143C" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#8B0000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#DC143C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="1440" height="280" fill="url(#crowdGlow)" />

        {/* Crowd ground fill */}
        <path d="M0,280 L0,200 Q60,170 120,190 Q160,155 210,175 Q255,135 305,158 Q345,118 395,142 Q440,105 490,128 Q535,92 585,115 Q630,78 680,102 Q725,65 775,88 Q820,52 870,75 Q915,40 965,62 Q1010,28 1060,50 Q1105,18 1155,40 Q1200,10 1250,32 Q1295,5 1345,25 Q1390,8 1440,20 L1440,280 Z"
          fill="rgba(0,0,0,0.92)"
        />

        {/* Individual person silhouettes with raised arms */}
        {[60,140,220,300,380,460,540,620,700,780,860,940,1020,1100,1180,1260,1340].map((x, i) => {
          const h = 45 + (i % 4) * 12;
          const armAngle = i % 2 === 0 ? -18 : 18;
          const baseY = 195 + (i % 3) * 8;
          return (
            <g key={i}>
              {/* Body */}
              <rect x={x - 5} y={baseY} width={10} height={h} rx={5} fill="rgba(0,0,0,0.95)" />
              {/* Head */}
              <circle cx={x} cy={baseY - 8} r={9} fill="rgba(0,0,0,0.95)" />
              {/* Raised arm */}
              <rect
                x={x - 3} y={baseY - 5} width={6} height={30}
                rx={3} fill="rgba(0,0,0,0.9)"
                transform={`rotate(${armAngle}, ${x}, ${baseY + 20})`}
              />
              {/* Fist/hand at top of arm */}
              <circle
                cx={x + Math.sin(armAngle * Math.PI / 180) * 28}
                cy={baseY - 5 - Math.cos(armAngle * Math.PI / 180) * 28}
                r={5}
                fill="rgba(0,0,0,0.9)"
              />
            </g>
          );
        })}
      </svg>

      {/* ── BACKGROUND LAYER 5: Red flame/energy effects ── */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '15%',
        width: 200, height: 200,
        background: 'radial-gradient(ellipse, rgba(220,20,60,0.35) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '8%', right: '18%',
        width: 240, height: 180,
        background: 'radial-gradient(ellipse, rgba(180,10,40,0.3) 0%, transparent 70%)',
        filter: 'blur(25px)',
      }} />

      {/* ── CONTENT ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: '100%', padding: '40px 20px 80px',
      }}>

        {/* Party name — TOP CENTER, above card */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 56px)', color: '#FFFFFF',
            margin: 0, lineHeight: 1,
            letterSpacing: '0.04em',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}>
            SKNLP
          </p>
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontWeight: 400,
            fontSize: 'clamp(16px, 2.5vw, 22px)', color: '#FFFFFF',
            margin: '4px 0 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
          }}>
            St. Kitts Nevis
          </p>
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontWeight: 900,
            fontSize: 'clamp(20px, 3.5vw, 32px)', color: '#FFFFFF',
            margin: '2px 0 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
          }}>
            Labour Party
          </p>
          <p style={{
            fontFamily: "'Barlow', sans-serif", fontWeight: 700,
            fontSize: 'clamp(16px, 2.5vw, 22px)', color: '#FFD700',
            margin: '6px 0 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
          }}>
            Campaign 365
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: '32px 36px 28px',
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
          {/* Card heading */}
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <h2 style={{
              fontSize: 22, fontWeight: 800, color: '#111',
              margin: '0 0 6px', lineHeight: 1.2,
            }}>
              Welcome to{' '}
              <span style={{ color: '#DC143C' }}>Campaign 365</span>
            </h2>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
              Log in to manage your SKNLP campaign
            </p>
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
              <p style={{ color: '#DC2626', fontSize: 13, margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="campaign@sknlp.org"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: '1.5px solid #E5E7EB', borderRadius: 8,
                  padding: '11px 14px', fontSize: 14, color: '#111',
                  outline: 'none', fontFamily: 'inherit',
                  backgroundColor: '#F8F9FB',
                }}
                onFocus={e => { e.target.style.borderColor = '#DC143C'; e.target.style.backgroundColor = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.backgroundColor = '#F8F9FB'; }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: '1.5px solid #E5E7EB', borderRadius: 8,
                  padding: '11px 14px', fontSize: 14, color: '#111',
                  outline: 'none', fontFamily: 'inherit',
                  backgroundColor: '#F8F9FB',
                }}
                onFocus={e => { e.target.style.borderColor = '#DC143C'; e.target.style.backgroundColor = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.backgroundColor = '#F8F9FB'; }}
              />
            </div>

            {/* Remember me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox" id="remember" checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ width: 15, height: 15, accentColor: '#DC143C', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize: 13, color: '#6B7280', cursor: 'pointer' }}>
                Remember me
              </label>
            </div>

            {/* Sign In button */}
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '13px',
                borderRadius: 8, border: 'none',
                backgroundColor: '#DC143C', color: 'white',
                fontFamily: 'inherit', fontWeight: 700, fontSize: 16,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.8 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginTop: 2,
              }}
            >
              {loading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              Sign In
            </button>

            {/* Forgot password */}
            <div style={{ textAlign: 'center' }}>
              <a href="/forgot-password" style={{ fontSize: 14, color: '#DC143C', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </a>
            </div>
          </form>

          {/* Divider + Dev Quick Login */}
          <div style={{ marginTop: 20, borderTop: '1px solid #F3F4F6', paddingTop: 14 }}>
            <button
              onClick={() => setShowDev(p => !p)}
              style={{
                width: '100%', padding: '8px 12px',
                background: '#F9FAFB', border: '1px solid #E5E7EB',
                borderRadius: 8, cursor: 'pointer',
                fontSize: 11, fontWeight: 700, color: '#92400E',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
              Dev Quick Login
            </button>

            {showDev && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {/* Super Admin */}
                <button
                  onClick={() => { localStorage.removeItem('c365_tenant'); handleDevLogin(SUPER_ADMIN, 'super'); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: '#EFF6FF', border: '1.5px solid #BFDBFE',
                    borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontFamily: 'inherit', width: '100%',
                  }}
                >
                  <div style={{ width: 28, height: 28, background: '#2563EB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'white', fontSize: 10, fontWeight: 900 }}>SA</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF', margin: 0 }}>Super Admin</p>
                    <p style={{ fontSize: 10, color: '#60A5FA', margin: 0 }}>admin@campaign365.app</p>
                  </div>
                </button>

                {/* Tenant roles */}
                {TENANTS.map(t => (
                  <div key={t.label}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: t.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5, paddingLeft: 2 }}>
                      {t.label}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                      {t.roles.map(r => (
                        <button
                          key={r.role}
                          onClick={() => handleDevLogin(r, t.label.toLowerCase())}
                          style={{
                            background: t.color + '12', border: `1px solid ${t.color}30`,
                            borderRadius: 8, padding: '6px 8px',
                            fontSize: 11, fontWeight: 600, color: '#374151',
                            cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                          }}
                        >
                          {r.label}
                          <span style={{ display: 'block', fontSize: 9, color: '#9CA3AF', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {r.email}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          Powered by Campaign 365 • Secure • Offline Ready
        </p>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 12, fontWeight: 900, color: 'rgba(255,255,255,0.7)', margin: 0, fontFamily: "'Barlow', sans-serif", letterSpacing: '0.05em' }}>SKNLP</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: 0 }}>Red Wave 2026</p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
