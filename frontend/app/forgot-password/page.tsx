'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, CheckCircle2, Loader2 } from 'lucide-react';

const PRIMARY = '#DC2626';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: PRIMARY, padding: '24px 32px 20px', textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 14, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={24} color="white" />
            </div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 18, margin: 0 }}>Reset Password</p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 4, marginBottom: 0 }}>Campaign 365 · SKNLP</p>
          </div>

          <div style={{ padding: '28px 32px 24px' }}>
            {!sent ? (
              <>
                <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20, lineHeight: 1.6, marginTop: 0 }}>
                  Enter your account email and we'll send you a password reset link.
                </p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                      placeholder="your@email.com"
                      style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => (e.target.style.borderColor = PRIMARY)}
                      onBlur={e => (e.target.style.borderColor = '#E2E8F0')} />
                  </div>
                  <button type="submit" disabled={loading}
                    style={{ width: '100%', backgroundColor: PRIMARY, color: 'white', border: 'none', borderRadius: 9, padding: '12px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {loading && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <div style={{ width: 60, height: 60, backgroundColor: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={30} style={{ color: '#16A34A' }} />
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Check your inbox</p>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, marginBottom: 0 }}>
                  We sent a reset link to <strong>{email}</strong>.<br />Follow the link in the email to set a new password.
                </p>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid #F1F5F9', padding: '14px 32px', textAlign: 'center', backgroundColor: '#FAFAFA' }}>
            <button onClick={() => router.push('/login')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              <ArrowLeft size={14} /> Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
