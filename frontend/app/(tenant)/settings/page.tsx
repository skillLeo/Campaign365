'use client';
import { useRouter } from 'next/navigation';

const SETTING_CARDS = [
  {
    title: 'Party Profile',
    desc: 'Party Profile, Branding & Campaign Account Accuracy.',
    icon: '🏛️',
    href: '/settings/party-profile',
    gradient: 'linear-gradient(135deg, rgba(220,20,60,0.8) 0%, rgba(0,40,0,0.85) 100%)',
    accentColor: '#DC143C',
  },
  {
    title: 'Branding & Visuals',
    desc: 'Branding Visuals & Visual Security addptions.',
    icon: '🎨',
    href: '/settings/branding',
    gradient: 'linear-gradient(135deg, rgba(30,30,60,0.9) 0%, rgba(80,20,80,0.85) 100%)',
    accentColor: '#8B5CF6',
  },
  {
    title: 'Feature Flags & Subscriptions',
    desc: 'Feature flags & Subscription modules.',
    icon: '🚩',
    href: '/settings/features',
    gradient: 'linear-gradient(135deg, rgba(20,20,60,0.9) 0%, rgba(10,20,100,0.85) 100%)',
    accentColor: '#3B82F6',
  },
  {
    title: 'Team & Roles',
    desc: 'Staff & Profile Visgs & Campaign analyst additions.',
    icon: '👥',
    href: '/settings/team-roles',
    gradient: 'linear-gradient(135deg, rgba(140,0,15,0.85) 0%, rgba(30,10,10,0.9) 100%)',
    accentColor: '#DC143C',
  },
  {
    title: 'API & Integrations',
    desc: 'Partying Settings dostoot intergriptions.',
    icon: '</>',
    href: '/settings/api',
    gradient: 'linear-gradient(135deg, rgba(15,40,70,0.9) 0%, rgba(5,20,50,0.9) 100%)',
    accentColor: '#06B6D4',
  },
  {
    title: 'Offline & Security',
    desc: 'Offline Secupscuus & siond pret lo spelles.',
    icon: '🛡️',
    href: '/settings/security',
    gradient: 'linear-gradient(135deg, rgba(30,60,30,0.9) 0%, rgba(10,30,10,0.9) 100%)',
    accentColor: '#22C55E',
  },
];

function CardIcon({ icon }: { icon: string }) {
  if (icon === '</>') {
    return (
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: 'rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'rgba(220,160,40,0.9)', fontSize: 13, fontWeight: 900, letterSpacing: '-1px',
        fontFamily: 'monospace',
      }}>&lt;/&gt;</div>
    );
  }
  return (
    <div style={{
      width: 56, height: 56, borderRadius: 14,
      background: 'rgba(255,255,255,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 28,
      border: '1px solid rgba(255,255,255,0.2)',
    }}>{icon}</div>
  );
}

export default function SettingsHubPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh', fontFamily: "'Inter',sans-serif",
      background: '#0D1117',
    }}>
      {/* Red Settings banner */}
      <div style={{
        background: '#DC143C', padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ color: 'white', fontSize: 18, fontWeight: 900, letterSpacing: '0.01em' }}>Settings</span>
      </div>

      <div style={{ padding: '20px 24px' }}>
        {/* Hero banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1a2035 0%, #16213e 100%)',
          borderRadius: 16, padding: '28px 32px', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden', position: 'relative', minHeight: 120,
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, margin: '0 0 8px', lineHeight: 1.2 }}>
              Manage Your SKNLP<br />Campaign 365 Account
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, margin: 0 }}>
              Configure party settings, branding, team access and integrations
            </p>
          </div>
          {/* SKNLP flag illustration */}
          <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <svg viewBox="0 0 160 100" width="180" height="110" style={{ opacity: 0.85 }}>
              {/* Flag body */}
              <rect x="10" y="10" width="130" height="80" rx="4" fill="#009E60" />
              <polygon points="10,10 10,90 80,50" fill="#CE1126" />
              <polygon points="10,10 80,50 10,90 20,90 90,50 20,10" fill="#000000" />
              <polygon points="20,10 90,50 20,90 28,90 96,50 28,10" fill="#FCD116" />
              {/* Flagpole */}
              <rect x="6" y="6" width="5" height="92" rx="2" fill="#8B4513" />
              {/* Stars on flag */}
              {[[60,30],[85,45],[60,60]].map(([x,y], i) => (
                <text key={i} x={x} y={y} fontSize="12" fill="white" textAnchor="middle" fontWeight="900">★</text>
              ))}
              {/* "SKNLP" text overlay */}
              <rect x="95" y="35" width="40" height="20" rx="3" fill="rgba(0,0,0,0.5)" />
              <text x="115" y="50" fontSize="10" fill="white" textAnchor="middle" fontWeight="900">SKNLP</text>
            </svg>
          </div>
          {/* Glow */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%',
            background: 'radial-gradient(ellipse at 80% 50%, rgba(220,20,60,0.2) 0%, transparent 70%)',
          }} />
        </div>

        {/* 6 setting cards */}
        <div className="rg-3" style={{ gap: 16 }}>
          {SETTING_CARDS.map((card, i) => (
            <div key={i} onClick={() => router.push(card.href)} style={{
              background: card.gradient,
              border: `1px solid ${card.accentColor}33`,
              borderRadius: 16, padding: '0', overflow: 'hidden', cursor: 'pointer',
              position: 'relative', minHeight: 160,
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px ${card.accentColor}55`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
            }}
            >
              {/* Decorative background shapes */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 80% 20%, ${card.accentColor}22 0%, transparent 60%)`,
              }} />
              {/* Palm/tropical silhouette */}
              <svg style={{ position: 'absolute', right: -10, bottom: -5, opacity: 0.15 }} width="100" height="100" viewBox="0 0 100 100">
                <path d="M50,100 Q48,70 52,50 Q54,38 56,28" stroke="white" strokeWidth="4" fill="none" />
                <path d="M56,28 Q38,18 20,16 Q38,26 42,40" fill="white" />
                <path d="M56,28 Q48,10 40,2 Q58,14 58,30" fill="white" />
                <path d="M56,28 Q72,12 82,8 Q66,22 60,34" fill="white" />
              </svg>

              <div style={{ position: 'relative', zIndex: 1, padding: '24px 20px 20px' }}>
                <CardIcon icon={card.icon} />
                <h3 style={{ color: 'white', fontSize: 16, fontWeight: 800, margin: '14px 0 6px', lineHeight: 1.25 }}>{card.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
                {/* Arrow indicator */}
                <div style={{
                  position: 'absolute', bottom: 16, right: 16,
                  width: 28, height: 28, borderRadius: '50%',
                  background: `${card.accentColor}33`, border: `1px solid ${card.accentColor}66`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: card.accentColor, fontSize: 12, fontWeight: 700,
                }}>›</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
