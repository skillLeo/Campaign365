import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TenantBranding {
  name: string;
  party_name?: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  font: string;
  subdomain: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  tenant_id?: number;
  roles?: Array<{ name: string }>;
  avatar_url?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  branding: TenantBranding | null;
  isSuperAdmin: boolean;
  setAuth: (token: string, user: User) => void;
  setBranding: (branding: TenantBranding) => void;
  setIsSuperAdmin: (val: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      branding: null,
      isSuperAdmin: false,
      setAuth: (token, user) => set({ token, user }),
      setBranding: (branding) => set({ branding }),
      setIsSuperAdmin: (val) => set({ isSuperAdmin: val }),
      logout: () => {
        // Clear all auth keys
        if (typeof window !== 'undefined') {
          localStorage.removeItem('c365_token');
          localStorage.removeItem('c365_role');
          localStorage.removeItem('c365_user');
          localStorage.removeItem('c365_tenant');
        }
        set({ token: null, user: null, isSuperAdmin: false });
      },
    }),
    { name: 'campaign365-auth' }
  )
);

interface PanicState {
  activeAlerts: any[];
  addAlert: (alert: any) => void;
  resolveAlert: (id: number) => void;
}

export const usePanicStore = create<PanicState>((set) => ({
  activeAlerts: [],
  addAlert: (alert) => set((s) => ({ activeAlerts: [...s.activeAlerts, alert] })),
  resolveAlert: (id) => set((s) => ({ activeAlerts: s.activeAlerts.filter((a) => a.id !== id) })),
}));
