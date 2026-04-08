export type UserRole = 'super_admin' | 'tenant';

const KEYS = {
  token: 'c365_token',
  role: 'c365_role',
  user: 'c365_user',
};

export const auth = {
  setSession: (token: string, role: UserRole, user: object) => {
    localStorage.setItem(KEYS.token, token);
    localStorage.setItem(KEYS.role, role);
    localStorage.setItem(KEYS.user, JSON.stringify(user));
  },
  getToken: (): string | null =>
    typeof window !== 'undefined' ? localStorage.getItem(KEYS.token) : null,
  getRole: (): UserRole | null =>
    typeof window !== 'undefined' ? (localStorage.getItem(KEYS.role) as UserRole) : null,
  getUser: () => {
    if (typeof window === 'undefined') return null;
    const u = localStorage.getItem(KEYS.user);
    return u ? JSON.parse(u) : null;
  },
  isLoggedIn: (): boolean =>
    typeof window !== 'undefined' && !!localStorage.getItem(KEYS.token),
  isSuperAdmin: (): boolean =>
    typeof window !== 'undefined' && localStorage.getItem(KEYS.role) === 'super_admin',
  isTenant: (): boolean =>
    typeof window !== 'undefined' && localStorage.getItem(KEYS.role) === 'tenant',
  logout: () => Object.values(KEYS).forEach(k => localStorage.removeItem(k)),

  // Legacy helpers used throughout codebase
  setToken: (token: string) => localStorage.setItem(KEYS.token, token),
  setRole: (role: UserRole) => localStorage.setItem(KEYS.role, role),
  setUser: (user: object) => localStorage.setItem(KEYS.user, JSON.stringify(user)),
};

export const mockLogin = (
  email: string,
  password: string
): { success: boolean; role?: UserRole } => {
  if (email === 'admin@campaign365.app' && password === 'password') {
    auth.setSession('super-admin-mock-token', 'super_admin', {
      name: 'Malissa',
      email,
      role: 'super_admin',
    });
    return { success: true, role: 'super_admin' };
  }
  if (password === 'password') {
    auth.setSession('tenant-mock-token', 'tenant', {
      name: 'General Secretary SKNLP',
      email,
      party: 'SKNLP',
      role: 'general_secretary',
    });
    return { success: true, role: 'tenant' };
  }
  return { success: false };
};
