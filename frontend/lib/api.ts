import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_API_URL;
  const hostname = window.location.hostname;
  if (hostname === 'admin.campaign365.app' || hostname === 'localhost') {
    return process.env.NEXT_PUBLIC_SUPER_ADMIN_URL || process.env.NEXT_PUBLIC_API_URL;
  }
  return process.env.NEXT_PUBLIC_API_URL;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

export const superAdminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUPER_ADMIN_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '/v1/super'),
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

// Request interceptor to attach token
[api, superAdminApi].forEach((instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(err);
    }
  );
});

export default api;
