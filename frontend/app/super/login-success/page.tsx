'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PJS = "'Plus Jakarta Sans', sans-serif";
const INT = "'Inter', sans-serif";

export default function LoginSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push('/super/dashboard'), 3000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Top-right badge */}
      <div style={{ position: 'absolute', top: 24, right: 24 }}>
        <span style={{
          fontFamily: INT,
          fontWeight: 500,
          fontSize: 13,
          color: '#64748B',
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: '4px 12px',
          backgroundColor: 'white',
        }}>
          #0F172A
        </span>
      </div>

      {/* Green checkmark circle */}
      <div style={{
        width: 88,
        height: 88,
        borderRadius: '50%',
        backgroundColor: '#059669',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        boxShadow: '0 8px 32px rgba(5, 150, 105, 0.25)',
      }}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path d="M9 23L17.5 31.5L35 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1 style={{
        fontFamily: PJS,
        fontWeight: 800,
        fontSize: 34,
        color: '#0F172A',
        letterSpacing: '-0.03em',
        textAlign: 'center',
        maxWidth: 480,
        lineHeight: 1.2,
        marginBottom: 14,
      }}>
        Welcome back to Campaign 365 Super Admin Portal
      </h1>

      <p style={{
        fontFamily: INT,
        fontWeight: 400,
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        maxWidth: 400,
        lineHeight: 1.6,
        marginBottom: 28,
      }}>
        You have full white-label control over all tenants, subscriptions, and feature flags.
      </p>

      <button
        onClick={() => router.push('/super/dashboard')}
        style={{
          padding: '13px 40px',
          borderRadius: 10,
          border: 'none',
          backgroundColor: '#059669',
          color: 'white',
          fontFamily: INT,
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
          letterSpacing: '0.01em',
          marginBottom: 20,
          boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#047857')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#059669')}
      >
        Continue to Dashboard
      </button>

      {/* Dot indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: i === 0 ? 10 : 8,
            height: i === 0 ? 10 : 8,
            borderRadius: '50%',
            backgroundColor: i === 0 ? '#2563EB' : '#E2E8F0',
            display: 'block',
          }} />
        ))}
      </div>

      <p style={{
        fontFamily: INT,
        fontWeight: 400,
        fontSize: 13,
        color: '#94A3B8',
      }}>
        Loading global metrics...
      </p>
    </div>
  );
}
