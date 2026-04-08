'use client';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ResponsiveModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Max width on desktop, default 600px */
  maxWidth?: number;
}

export function ResponsiveModal({
  open,
  onClose,
  title,
  children,
  maxWidth = 600,
}: ResponsiveModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* ─── Backdrop ───────────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 200,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* ─── Desktop: centered modal ─────────────────────────────── */}
      <div
        className="hidden sm:flex"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 201,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: 16,
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'auto',
            animation: 'fade-in 0.2s ease',
          }}
        >
          {/* Header */}
          {title && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px 16px',
                borderBottom: '1px solid #E2E8F0',
                flexShrink: 0,
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', margin: 0 }}>{title}</h3>
              <button
                onClick={onClose}
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 6,
                  color: '#64748B',
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {children}
          </div>
        </div>
      </div>

      {/* ─── Mobile: bottom sheet ────────────────────────────────── */}
      <div
        className="sm:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 201,
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={sheetRef}
          style={{
            backgroundColor: 'white',
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.2)',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'auto',
            animation: 'slide-up 0.25s ease',
          }}
        >
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: 36, height: 4, backgroundColor: '#CBD5E1', borderRadius: 4 }} />
          </div>

          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 20px 14px',
              borderBottom: title ? '1px solid #E2E8F0' : undefined,
              flexShrink: 0,
            }}
          >
            <h3 style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', margin: 0 }}>{title ?? ''}</h3>
            <button
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 8,
                color: '#64748B',
              }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 32px' }}>
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
