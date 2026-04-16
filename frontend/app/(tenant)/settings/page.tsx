'use client';
import { useState } from 'react';

const TABS = ['My Account', 'Subscription & Features', 'Branding', 'Offline Sync', 'AI Models'] as const;
type Tab = typeof TABS[number];

/* ── Icons ── */
function IconAdvancedPolling() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Two feather/leaf wings */}
      <path d="M24 34 C18 28 8 26 8 16 C8 10 14 8 20 12 C22 13.5 23 16 24 20" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M24 34 C30 28 40 26 40 16 C40 10 34 8 28 12 C26 13.5 25 16 24 20" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M20 12 C19 18 20 26 24 34" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M28 12 C29 18 28 26 24 34" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
      {/* Left wing veins */}
      <path d="M14 17 C16 18 19 19 22 22" stroke="white" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M11 21 C14 21 18 22 21 25" stroke="white" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* Right wing veins */}
      <path d="M34 17 C32 18 29 19 26 22" stroke="white" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M37 21 C34 21 30 22 27 25" stroke="white" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* Center stem */}
      <line x1="24" y1="34" x2="24" y2="40" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function IconPanicButton1() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circular clock with refresh arrow */}
      <circle cx="24" cy="24" r="14" stroke="white" strokeWidth="2" fill="none"/>
      {/* Clock hands */}
      <line x1="24" y1="24" x2="24" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="24" x2="31" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      {/* Refresh arrow on top-right */}
      <path d="M35 13 C37 15 38 18 38 21" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <polygon points="33,10 37,14 38,9" fill="white"/>
    </svg>
  );
}

function IconSpeechToText() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="24" cy="24" r="15" stroke="white" strokeWidth="2" fill="none"/>
      {/* Lightning bolt inside */}
      <path d="M27 12 L20 24 L25 24 L21 36 L30 22 L25 22 Z" fill="white" stroke="none"/>
    </svg>
  );
}

function IconFundraisingPro1() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Scissors/crossed tools with arrow */}
      {/* Scissors left blade */}
      <path d="M14 14 L28 28" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="2" fill="none"/>
      {/* Scissors right blade */}
      <path d="M34 14 L22 26" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="36" cy="12" r="3.5" stroke="white" strokeWidth="2" fill="none"/>
      {/* Arrow pointing up-right */}
      <path d="M22 30 L34 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 18 L34 18 L34 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Small circle decoration */}
      <circle cx="18" cy="36" r="3" stroke="white" strokeWidth="1.8" fill="none"/>
    </svg>
  );
}

function IconPanicButton2() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person silhouette */}
      <circle cx="21" cy="16" r="5" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M12 36 C12 28 30 28 30 36" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Signal/wifi waves on right */}
      <path d="M32 20 C35 17 35 13 32 10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M35 23 C40 18 40 10 35 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      {/* Small dots near person */}
      <circle cx="30" cy="22" r="1.5" fill="white"/>
    </svg>
  );
}

function IconFundraisingPro2() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Photo/camera frame */}
      <rect x="10" y="12" width="28" height="26" rx="3" stroke="white" strokeWidth="2" fill="none"/>
      {/* Person inside frame */}
      <circle cx="24" cy="21" r="4" stroke="white" strokeWidth="1.8" fill="none"/>
      <path d="M16 34 C16 28 32 28 32 34" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Frame brackets on sides */}
      <path d="M6 18 L6 12 L10 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 30 L6 36 L10 36" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M42 18 L42 12 L38 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M42 30 L42 36 L38 36" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Profile Avatar (dark-skin male, navy ring) ── */
function ProfileAvatar({ size = 38 }: { size?: number }) {
  const uid = 'nav_prof';
  return (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`${uid}_skin`} cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#7B4F2E"/>
          <stop offset="60%" stopColor="#5C3317"/>
          <stop offset="100%" stopColor="#3D1F0A"/>
        </radialGradient>
        <clipPath id={`${uid}_clip`}>
          <circle cx="19" cy="19" r="18"/>
        </clipPath>
      </defs>
      <circle cx="19" cy="19" r="18" fill="#1E293B" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
      <g clipPath={`url(#${uid}_clip)`}>
        {/* Shirt/shoulders */}
        <ellipse cx="19" cy="40" rx="13" ry="8" fill="#1E3A5F"/>
        {/* Neck */}
        <rect x="15.5" y="24" width="7" height="10" fill={`url(#${uid}_skin)`}/>
        {/* Face */}
        <ellipse cx="19" cy="20" rx="8" ry="9" fill={`url(#${uid}_skin)`}/>
        {/* Hair */}
        <ellipse cx="19" cy="11" rx="8.5" ry="5" fill="#1A0900"/>
        <ellipse cx="19" cy="10.5" rx="6" ry="3.5" fill="#240D00"/>
        {/* Ears */}
        <ellipse cx="11" cy="20" rx="2" ry="2.5" fill={`url(#${uid}_skin)`}/>
        <ellipse cx="27" cy="20" rx="2" ry="2.5" fill={`url(#${uid}_skin)`}/>
        {/* Eyes */}
        <ellipse cx="15.5" cy="19" rx="2" ry="1.5" fill="white"/>
        <ellipse cx="22.5" cy="19" rx="2" ry="1.5" fill="white"/>
        <circle cx="15.5" cy="19" r="1.1" fill="#2D1600"/>
        <circle cx="22.5" cy="19" r="1.1" fill="#2D1600"/>
        {/* Eyebrows */}
        <path d="M13 17 Q15.5 15.5 18 17" stroke="#1A0900" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M21 17 Q23.5 15.5 26 17" stroke="#1A0900" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* Mouth */}
        <path d="M16.5 24 Q19 26 21.5 24" stroke="#3D1F0A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

/* ── Feature Card ── */
type FeatureCardProps = {
  icon: React.ReactNode;
  label: string;
  panicStyle?: boolean;
};
function FeatureCard({ icon, label, panicStyle = false }: FeatureCardProps) {
  return (
    <div style={{
      backgroundColor: '#131C2E',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 14,
      padding: '28px 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      minHeight: 170,
    }}>
      {icon}
      <p style={{
        fontSize: 15,
        fontWeight: 600,
        color: '#FFFFFF',
        margin: 0,
        textAlign: 'center',
        lineHeight: 1.3,
      }}>{label}</p>
      <div style={{
        backgroundColor: panicStyle ? '#DC2626' : '#C9A84C',
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 700,
        padding: '6px 28px',
        borderRadius: 999,
        letterSpacing: '0.04em',
        boxShadow: panicStyle
          ? '0 0 12px rgba(220,38,38,0.5)'
          : '0 0 8px rgba(201,168,76,0.35)',
      }}>
        ON
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Subscription & Features');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#EBEBEB',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── Top Navigation Bar ── */}
      <div style={{
        backgroundColor: '#0F172A',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: 20,
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '-0.3px',
        }}>Campaign 365</span>

        <ProfileAvatar size={40} />
      </div>

      {/* ── Page Content ── */}
      <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Title row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <h1 style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 900,
            fontSize: 32,
            color: '#CC1F1F',
            margin: 0,
            letterSpacing: '-0.5px',
          }}>Settings &amp; White-Label Controls</h1>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#4A5568',
            marginTop: 8,
            fontFamily: 'monospace',
          }}>#0F172A</span>
        </div>

        {/* ── Tab Bar ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          marginBottom: 24,
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          paddingBottom: 0,
        }}>
          {TABS.map((tab, i) => {
            const active = activeTab === tab;
            return (
              <div key={tab} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Bullet separator */}
                <span style={{
                  color: '#6B7280',
                  fontSize: 14,
                  margin: i === 0 ? '0 8px 0 0' : '0 8px',
                  lineHeight: 1,
                }}>•</span>
                <button
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '10px 4px',
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                    color: active ? '#1A1A1A' : '#6B7280',
                    borderBottom: active ? '2.5px solid #CC1F1F' : '2.5px solid transparent',
                    marginBottom: -1,
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab}
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Main Content Card ── */}
        <div style={{
          backgroundColor: '#1a2035',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}>
          {/* Card header */}
          <div style={{
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <span style={{
              fontSize: 17,
              fontWeight: 700,
              color: '#FFFFFF',
            }}>Subscription &amp; Features</span>
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#C9A84C',
            }}>Pro Plan - SKNLP</span>
          </div>

          {/* Feature grid */}
          <div style={{ padding: '24px 28px 28px' }}>

            {/* Row 1 — 4 cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
              marginBottom: 16,
            }}>
              <FeatureCard
                icon={<IconAdvancedPolling />}
                label="Advanced Polling"
                panicStyle={false}
              />
              <FeatureCard
                icon={<IconPanicButton1 />}
                label="Panic Button"
                panicStyle={true}
              />
              <FeatureCard
                icon={<IconSpeechToText />}
                label="Speech-to-Text"
                panicStyle={false}
              />
              <FeatureCard
                icon={<IconFundraisingPro1 />}
                label="Fundraising Pro"
                panicStyle={false}
              />
            </div>

            {/* Row 2 — 2 cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
            }}>
              <FeatureCard
                icon={<IconPanicButton2 />}
                label="Panic Button"
                panicStyle={true}
              />
              <FeatureCard
                icon={<IconFundraisingPro2 />}
                label="Fundraising Pro"
                panicStyle={false}
              />
              {/* Empty cells to keep 4-col grid */}
              <div />
              <div />
            </div>
          </div>
        </div>

        {/* ── Bottom Action Buttons ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 24,
        }}>
          <button style={{
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 700,
            padding: '12px 28px',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            boxShadow: '0 4px 14px rgba(220,38,38,0.4)',
            fontFamily: 'inherit',
          }}>
            Export All Data
          </button>
          <button style={{
            backgroundColor: 'transparent',
            color: '#1A1A1A',
            fontSize: 14,
            fontWeight: 700,
            padding: '11px 28px',
            borderRadius: 999,
            border: '2px solid #1A1A1A',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            fontFamily: 'inherit',
          }}>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
