'use client';
import { useEffect, useCallback } from 'react';
import { useAuthStore } from '@/lib/store';
import { tenantThemes } from '@/lib/tenantTheme';

/**
 * BrandingProvider
 *
 * Fetches platform/tenant branding from the Laravel backend on every mount and
 * whenever the 'branding-updated' custom event is dispatched (e.g. after the
 * Super Admin saves new branding settings).  Falls back gracefully to the local
 * tenant-theme defaults when the API is unavailable (local dev, offline, etc.).
 *
 * Stored in the Zustand auth store so every component in the tree can access it
 * via: const { branding } = useAuthStore();
 */
export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const setBranding = useAuthStore((s) => s.setBranding);

  /**
   * skipFallback = true  → called by 'branding-updated' event (Super Admin publish)
   *                         If the API is down, do nothing — don't overwrite a color
   *                         the user just saved locally.
   * skipFallback = false → initial load; apply static tenant-theme defaults only when
   *                         the Zustand persist store is completely empty (first ever visit).
   */
  const loadBranding = useCallback(async (skipFallback = false) => {
    const tenant =
      typeof window !== 'undefined'
        ? localStorage.getItem('c365_tenant')
        : null;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // ── Try backend API ────────────────────────────────────────────────────
    if (apiUrl) {
      try {
        const url =
          tenant && tenant !== 'super'
            ? `${apiUrl}/branding?tenant=${encodeURIComponent(tenant)}`
            : `${apiUrl}/branding`;

        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          const data = await res.json();
          setBranding({
            name: data.name || 'Campaign 365',
            party_name: data.party_name ?? undefined,
            logo_url: data.logo_url || null,
            primary_color: data.primary_color || '#2563EB',
            secondary_color: data.secondary_color || '#0F172A',
            font: data.font || 'Inter',
            subdomain: data.subdomain || 'default',
          });
          return; // API responded — skip fallback
        }
      } catch {
        // API unreachable — fall through
      }
    }

    // ── API failed or not configured ────────────────────────────────────
    // When triggered by event (Super Admin publish): API is source of truth.
    // Don't fall back to statics — that would overwrite any locally-saved color.
    if (skipFallback) return;

    // On initial load: only seed defaults when the store has never been populated
    // (Zustand persist will have rehydrated the store if the user visited before).
    const existing = useAuthStore.getState().branding;
    if (existing) return;

    // Truly first visit — seed from static tenant-theme config
    const key = tenant && tenant !== 'super' ? tenant : 'default';
    const theme = tenantThemes[key] ?? tenantThemes.default;
    setBranding({
      name: theme.name,
      logo_url: null,
      primary_color: theme.primary,
      secondary_color: theme.sidebar,
      font: 'Inter',
      subdomain: key,
    });
  }, [setBranding]);

  useEffect(() => {
    loadBranding(false);

    // Re-fetch from API whenever the Super Admin publishes new branding.
    // Pass skipFallback=true so a failed API call never overwrites local changes.
    const handler = () => loadBranding(true);
    window.addEventListener('branding-updated', handler);
    return () => window.removeEventListener('branding-updated', handler);
  }, [loadBranding]);

  return <>{children}</>;
}
