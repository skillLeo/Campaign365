'use client';
import { useState } from 'react';

const QUESTIONS = [
  { id: 1, text: 'What is your preferred political party?', type: 'dropdown', options: [] },
  { id: 2, text: 'What is your preferred political party?', type: 'checkbox', options: ['Mulple', 'Chice', 'Ndlce'] },
  { id: 3, text: 'What is your preferred political party?', type: 'radio',    options: ['Mulx Choice', 'Sian Choice'] },
];

const TEMPLATE_TABS = ['Basic Poll', 'Political Survey', 'Constituency Feedback'];

export default function SurveyBuilderPage() {
  const [activeTemplate, setActiveTemplate] = useState('Basic Poll');
  const [questions, setQuestions]           = useState(QUESTIONS);
  const [published, setPublished]           = useState(false);

  return (
    <div style={{ backgroundColor: '#0D0F1E', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'white', fontSize: 16, fontWeight: 900 }}>SKNLP</span>
            <span style={{ color: '#64748B', fontSize: 12 }}>▼</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Heogh ▾</button>
            <button style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Tells</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#64748B', fontSize: 16, position: 'relative' }}>
            🔔
            <span style={{ position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderRadius: '50%', background: '#DC143C', color: 'white', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
          </span>
          <span style={{ color: '#64748B', fontSize: 16 }}>🔔</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#c4a35a,#8b6914)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>A</div>
        </div>
      </div>

      {/* Page title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 12px' }}>
        <h1 style={{ color: '#DC143C', fontSize: 22, fontWeight: 900, margin: 0 }}>Survey Builder</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#94A3B8', borderRadius: 8, padding: '8px 14px', fontSize: 18, cursor: 'pointer' }}>↗</button>
          <button style={{
            background: '#DC143C', color: 'white', border: 'none', borderRadius: 8,
            padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(220,20,60,0.4)',
          }}>New Survey</button>
        </div>
      </div>

      {/* Main 2-col */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, padding: '0 20px 20px' }}>

        {/* Left — Builder */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px',
        }}>
          {/* Template Gallery */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <p style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: 0 }}>Template Gallory</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {['🎤', '👤', '⋮'].map((icon, i) => (
                <button key={i} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', cursor: 'pointer', fontSize: 14 }}>{icon}</button>
              ))}
            </div>
          </div>

          {/* Template tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {TEMPLATE_TABS.map(t => (
              <button key={t} onClick={() => setActiveTemplate(t)} style={{
                flex: 1, border: '2px solid ' + (activeTemplate === t ? '#D4A017' : 'rgba(255,255,255,0.1)'),
                background: activeTemplate === t ? 'rgba(212,160,23,0.08)' : 'rgba(255,255,255,0.04)',
                color: activeTemplate === t ? '#D4A017' : '#94A3B8',
                borderRadius: 8, padding: '9px 8px',
                fontSize: 12, fontWeight: activeTemplate === t ? 700 : 500, cursor: 'pointer',
              }}>{t}</button>
            ))}
          </div>

          {/* Collapse indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <span style={{ color: '#475569', fontSize: 16, cursor: 'pointer' }}>^</span>
          </div>

          {/* Question cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {questions.map((q, qi) => (
              <div key={q.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                {/* Tropical icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: qi === 0
                    ? 'linear-gradient(135deg,#7c3aed,#4c1d95)'
                    : 'linear-gradient(135deg,#DC143C,#7C1010)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{qi === 0 ? '🌴' : '⚡'}</div>

                {/* Question box */}
                <div style={{
                  flex: 1, background: 'rgba(220,20,60,0.08)', border: '2px solid rgba(220,20,60,0.3)',
                  borderRadius: 10, padding: '10px 12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: q.options.length ? 8 : 0 }}>
                    <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>{q.text}</span>
                    <span style={{ color: '#64748B', fontSize: 16, cursor: 'pointer' }}>▼</span>
                  </div>
                  {q.options.length > 0 && (
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {q.options.map((opt, oi) => (
                        <label key={oi} style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94A3B8', fontSize: 12, cursor: 'pointer' }}>
                          <input type={q.type === 'checkbox' ? 'checkbox' : 'radio'} defaultChecked={oi === 2} style={{ accentColor: '#DC143C' }} />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Drag handle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
            <span style={{ color: '#475569', fontSize: 12 }}>0‹</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: '#DC143C',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'grab',
              boxShadow: '0 4px 16px rgba(220,20,60,0.5)',
            }}>💬</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Add Speech-to-Text */}
          <button style={{
            width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
            color: '#E2E8F0', borderRadius: 8, padding: '12px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Add Speech-to-Text Question</button>
        </div>

        {/* Right — Live Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0, textAlign: 'center' }}>Live Preview</p>

          {/* Phone mockup */}
          <div style={{
            background: '#111', borderRadius: 28, border: '2.5px solid #2a2a2a', overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          }}>
            {/* Phone camera notch */}
            <div style={{ background: '#000', height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 70, height: 14, borderRadius: 10, background: '#111' }} />
            </div>
            {/* Screen content */}
            <div style={{ background: '#1a0a0a', padding: '10px 8px', minHeight: 280 }}>
              {/* Rally image in preview */}
              <div style={{
                height: 100, borderRadius: 8, marginBottom: 8, overflow: 'hidden',
                background: 'linear-gradient(135deg,#1a3a10 0%,#2d5020 50%,#1a2a10 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,180,50,0.3) 0%, transparent 60%)' }} />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8, position: 'relative' }}>Rally Photo</p>
              </div>
              {/* Survey questions mini */}
              {['What is your policy political party?', 'What is your inning political party?', 'What is your political party?'].map((q, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.06)', borderRadius: 5, padding: '5px 8px', marginBottom: 5,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 7.5 }}>{q}</span>
                  <span style={{ color: '#475569', fontSize: 9 }}>▼</span>
                </div>
              ))}
              {/* SKNLP logo */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
                <div style={{ background: '#DC143C', borderRadius: 4, padding: '2px 8px' }}>
                  <span style={{ color: 'white', fontSize: 9, fontWeight: 800 }}>SKNLP</span>
                </div>
              </div>
              {/* Checkboxes */}
              {['Mulple Choice', 'Insiline Iri-Merce', 'Someyopu for Typralfication', 'Downsifle- Test fare commercial', 'Sapsole-In-Sher', 'Direct'].map((opt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 2, background: i < 2 ? '#DC143C' : 'rgba(255,255,255,0.1)', border: i < 2 ? 'none' : '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 7 }}>{opt}</span>
                </div>
              ))}
            </div>
            {/* Controls */}
            <div style={{ background: '#111', padding: '8px 10px', display: 'flex', gap: 8, justifyContent: 'center' }}>
              {['−', '⏸', '↗'].map((btn, i) => (
                <button key={i} style={{ width: 32, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: 13, cursor: 'pointer' }}>{btn}</button>
              ))}
            </div>
          </div>

          {/* Save & Publish */}
          <button
            onClick={() => setPublished(p => !p)}
            style={{
              width: '100%', background: published ? '#166534' : 'linear-gradient(90deg,#C4A000,#D4B000)',
              color: published ? 'white' : '#1a1000', border: 'none', borderRadius: 10,
              padding: '14px', fontSize: 14, fontWeight: 800, cursor: 'pointer',
              boxShadow: published ? '0 4px 14px rgba(34,197,94,0.4)' : '0 4px 14px rgba(196,160,0,0.4)',
              transition: 'all 0.3s',
            }}
          >{published ? '✓ Published!' : 'Save & Publish'}</button>
        </div>
      </div>
    </div>
  );
}
