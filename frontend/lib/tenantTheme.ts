export interface TenantTheme {
  primary: string;
  primaryDark: string;
  sidebar: string;
  name: string;
  fullName: string;
  logoText: string;
}

export const tenantThemes: Record<string, TenantTheme> = {
  sknlp: {
    primary: '#E30613',
    primaryDark: '#B30000',
    sidebar: '#1A1A1A',
    name: 'SKNLP',
    fullName: 'St. Kitts and Nevis Labour Party',
    logoText: 'SKNLP',
  },
  jlp: {
    primary: '#00A651',
    primaryDark: '#007A3D',
    sidebar: '#0A1628',
    name: 'JLP',
    fullName: 'Jamaica Labour Party',
    logoText: 'JLP',
  },
  blp: {
    primary: '#FFD700',
    primaryDark: '#B8960C',
    sidebar: '#1A1A2E',
    name: 'BLP',
    fullName: 'Barbados Labour Party',
    logoText: 'BLP',
  },
  janedoe: {
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    sidebar: '#0F172A',
    name: 'Jane Doe',
    fullName: 'Jane Doe — Independent Candidate',
    logoText: 'JD',
  },
  default: {
    primary: '#E30613',
    primaryDark: '#B30000',
    sidebar: '#1A1A1A',
    name: 'Campaign Party',
    fullName: 'Campaign Party',
    logoText: 'CP',
  },
};

export const TENANT_STORAGE_KEY = 'c365_tenant';

export const getCurrentTenantTheme = (): TenantTheme => {
  if (typeof window === 'undefined') return tenantThemes.sknlp;
  const stored = localStorage.getItem(TENANT_STORAGE_KEY);
  if (stored && tenantThemes[stored]) return tenantThemes[stored];
  return tenantThemes.sknlp;
};

export const applyTenantTheme = (theme: TenantTheme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--tenant-primary', theme.primary);
  root.style.setProperty('--tenant-primary-dark', theme.primaryDark);
  root.style.setProperty('--tenant-sidebar', theme.sidebar);
};
