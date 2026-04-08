'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PJS = "'Plus Jakarta Sans', sans-serif";
const INT = "'Inter', sans-serif";

export default function SuperForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F1F5F9', display: 'flex' }}>
      {/* Left sidebar */}
      <div style={{ width: 280, backgroundColor: 'white', borderRight: '1px solid #E2E8F0', padding: '32px 20px', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{
            width: 36, height: 36,
            backgroundColor: '#0F172A',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: PJS, fontWeight: 800, fontSize: 13, color: '#2563EB' }}>365</span>
          </div>
          <span style={{ fontFamily: PJS, fontWeight: 800, fontSize: 15, color: '#0F172A', letterSpacing: '-0.02em' }}>
            CAMPAIGN <span style={{
              backgroundColor: '#0F172A', color: 'white',
              borderRadius: 6, padding: '1px 6px', fontSize: 13,
            }}>365</span>
          </span>
        </div>

        {/* Reset Access menu item */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px',
          borderRadius: 8,
          backgroundColor: '#F1F5F9',
        }}>
          <span style={{ fontSize: 18 }}>🧑‍💼🔒</span>
          <span style={{ fontFamily: INT, fontWeight: 500, fontSize: 14, color: '#0F172A' }}>Reset Access</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '40px 48px' }}>
        <h1 style={{ fontFamily: PJS, fontWeight: 800, fontSize: 32, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: 24 }}>
          Forgot Password
        </h1>

        {/* Dark card */}
        <div style={{
          backgroundColor: '#0F172A',
          borderRadius: 16,
          padding: 36,
          maxWidth: 600,
        }}>
          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h2 style={{ fontFamily: PJS, fontWeight: 800, fontSize: 22, color: 'white', marginBottom: 8 }}>Reset Link Sent!</h2>
              <p style={{ fontFamily: INT, fontWeight: 400, fontSize: 14, color: '#94A3B8', marginBottom: 24 }}>
                Check your email for instructions to reset your password.
              </p>
              <button
                onClick={() => router.push('/super/login')}
                style={{
                  fontFamily: INT, fontWeight: 600, fontSize: 14,
                  color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                → Back to Login
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: PJS, fontWeight: 800, fontSize: 26, color: 'white', letterSpacing: '-0.02em', marginBottom: 10 }}>
                Forgot Your Super Admin Password?
              </h2>
              <p style={{ fontFamily: INT, fontWeight: 400, fontSize: 14, color: '#94A3B8', marginBottom: 6 }}>
                Enter your registered email or phone to receive a secure reset link
              </p>
              <p style={{ fontFamily: INT, fontWeight: 600, fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                #0F172A
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email or Phone"
                  required
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: '1px solid #334155',
                    borderRadius: 8,
                    padding: '14px 16px',
                    fontFamily: INT,
                    fontWeight: 400,
                    fontSize: 15,
                    color: 'white',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#2563EB')}
                  onBlur={e => (e.target.style.borderColor = '#334155')}
                />

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#059669',
                    color: 'white',
                    fontFamily: INT,
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#047857')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#059669')}
                >
                  Send Reset Link
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/super/login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: INT,
                    fontWeight: 500,
                    fontSize: 14,
                    color: '#2563EB',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  → Back to Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
