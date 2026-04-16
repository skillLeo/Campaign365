'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT SIDEBAR — Black brand panel ── */}
      <div
        style={{
          width: 260,
          minWidth: 260,
          backgroundColor: '#1A1A1A',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 24px',
          flexShrink: 0,
        }}
      >
        {/* SKNLP Logo with flag icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Flag icon */}
          <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2a2a2a' }}>
            <svg viewBox="0 0 60 40" width="48" height="32">
              <polygon points="0,0 60,40 0,40" fill="#009E60"/>
              <polygon points="0,0 60,0 60,40" fill="#CE1126"/>
              <polygon points="0,0 60,40 54,40 6,0" fill="#000000"/>
              <polygon points="0,0 6,0 60,40 54,40 58,40 10,0" fill="#FCD116"/>
              <polygon points="0,4 4,0 60,36 56,40 0,40 0,36" fill="#FCD116"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: 24, color: '#FFFFFF', margin: 0, lineHeight: 1 }}>
              SKNLP
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT CONTENT — Light gray background ── */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#F0F0F0',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px',
        }}
      >
        {/* Page title */}
        <h1
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: '#111111',
            margin: '0 0 32px',
            letterSpacing: '-0.02em',
          }}
        >
          Forgot Password
        </h1>

        {/* Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: '36px 40px',
            maxWidth: 560,
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          }}
        >
          {!sent ? (
            <>
              <h2
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  color: '#111111',
                  margin: '0 0 12px',
                  letterSpacing: '-0.01em',
                }}
              >
                Reset your SKNLP password
              </h2>
              <p style={{ fontSize: 15, color: '#555555', marginBottom: 28, lineHeight: 1.6 }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Email — Your password"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: 10,
                    padding: '14px 18px',
                    fontSize: 16,
                    color: '#1A1A1A',
                    outline: 'none',
                    fontFamily: 'inherit',
                    backgroundColor: '#FAFAFA',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#C8102E')}
                  onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: 10,
                    border: 'none',
                    backgroundColor: '#C8102E',
                    color: 'white',
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.8 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    letterSpacing: '0.02em',
                  }}
                >
                  {loading && <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: 72, height: 72, backgroundColor: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle2 size={36} style={{ color: '#16A34A' }} />
              </div>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 22, color: '#111111', marginBottom: 10 }}>
                Check your inbox
              </h3>
              <p style={{ fontSize: 15, color: '#555555', lineHeight: 1.7 }}>
                We sent a reset link to <strong>{email}</strong>.<br />
                Follow the link in the email to set a new password.
              </p>
            </div>
          )}
        </div>

        {/* Back to login */}
        <div style={{ marginTop: 24 }}>
          <button
            onClick={() => router.push('/login')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 15,
              color: '#333333',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 500,
              textDecoration: 'underline',
            }}
          >
            → Back to Log In
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          div[style*="width: 260px"] { width: 60px !important; min-width: 60px !important; }
          div[style*="width: 260px"] p { display: none; }
          div[style*="padding: 48px"] { padding: 24px !important; }
        }
      `}</style>
    </div>
  );
}
