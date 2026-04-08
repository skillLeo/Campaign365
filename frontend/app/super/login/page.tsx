'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

export default function SuperAdminLoginPage() {
  const [email, setEmail] = useState('admin@campaign365.app');
  const [password, setPassword] = useState('password');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setAuth, setIsSuperAdmin } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (email && password) {
      const token = 'mock-super-admin-token-' + Date.now();
      const user = { id: 1, name: 'Super Admin', email };
      localStorage.setItem('c365_token', token);
      localStorage.setItem('c365_role', 'super_admin');
      localStorage.setItem('c365_user', JSON.stringify(user));
      setAuth(token, user);
      setIsSuperAdmin(true);
      router.push('/super/login-success');
    } else {
      setError('Please enter your email and password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center" style={{ backgroundColor: '#F0F2F5' }}>
      {/* Top dark panel */}
      <div className="absolute inset-x-0 top-0 h-1/2" style={{ backgroundColor: '#0F172A' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: '#F0F2F5' }} />

      {/* Top-left brand */}
      <div className="absolute top-6 left-8 z-10">
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 18,
          color: 'white',
          letterSpacing: '-0.025em',
        }}>
          Campaign <span style={{ color: '#2563EB' }}>365</span>
        </span>
      </div>

      {/* Top-right color tag */}
      <div className="absolute top-6 right-8 z-10 flex items-center gap-2">
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: '#2563EB' }}>
          #2563EB
        </span>
        <span style={{ color: '#64748B', fontSize: 18 }}>⋮</span>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full mx-4" style={{ maxWidth: 440 }}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div style={{ padding: '40px 40px 32px' }}>

            {/* Logo in card */}
            <div className="text-center" style={{ marginBottom: 32 }}>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: '-0.03em',
                color: '#0F172A',
                marginBottom: 6,
              }}>
                Campaign <span style={{ color: '#2563EB' }}>365</span>
              </h1>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                color: '#64748B',
                margin: 0,
              }}>
                Super Admin Portal
              </p>
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
                <p style={{ color: '#DC2626', fontSize: 13, margin: 0 }}>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Email */}
              <div>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#374151', marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1px solid #E2E8F0',
                    borderRadius: 8,
                    padding: '10px 14px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: '#0F172A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  placeholder="admin@example.com"
                  required
                  onFocus={e => (e.target.style.borderColor = '#2563EB')}
                  onBlur={e => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#374151', marginBottom: 6 }}>
                  Password
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      padding: '10px 14px',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: '#0F172A',
                      outline: 'none',
                    }}
                    placeholder="••••••••"
                    required
                  />
                  {/* iOS toggle */}
                  <div style={{ paddingRight: 12 }}>
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{
                        position: 'relative',
                        width: 40,
                        height: 22,
                        borderRadius: 11,
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: showPass ? '#2563EB' : '#CBD5E1',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        top: 3,
                        left: showPass ? 21 : 3,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        transition: 'left 0.2s',
                        display: 'block',
                      }} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember me */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: `2px solid ${remember ? '#2563EB' : '#CBD5E1'}`,
                    backgroundColor: remember ? '#2563EB' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    padding: 0,
                  }}
                >
                  {remember && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <span
                  onClick={() => setRemember(!remember)}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: '#64748B', cursor: 'pointer', userSelect: 'none' }}
                >
                  Remember me
                </span>
              </div>

              {/* Sign In button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  letterSpacing: '0.01em',
                }}
              >
                {loading && <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />}
                Sign In
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <a
                href="/super/forgot-password"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: '#2563EB',
                  textDecoration: 'none',
                }}
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '12px 40px', borderTop: '1px solid #F1F5F9', backgroundColor: '#F8FAFC', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: '#94A3B8', margin: 0 }}>
              Powered by Campaign 365 · Secure Access Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
