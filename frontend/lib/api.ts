import axios from 'axios';


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
    const token = localStorage.getItem('c365_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        const role = localStorage.getItem('c365_role');
        localStorage.removeItem('c365_token');
        localStorage.removeItem('c365_role');
        localStorage.removeItem('c365_user');
        window.location.href = role === 'super_admin' ? '/super/login' : '/login';
      }
      return Promise.reject(err);
    }
  );
});

export default api;
