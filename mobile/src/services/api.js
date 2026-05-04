import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this to your machine's LAN IP so the phone/simulator can reach it
// For iOS Simulator: localhost works
// For Android Emulator: 10.0.2.2
// For physical device: your computer's LAN IP e.g. 192.168.1.x
export const BASE_URL = 'http://localhost:8080/api/v1';

const getHeaders = async () => {
  const token     = await AsyncStorage.getItem('c365_token');
  const subdomain = await AsyncStorage.getItem('c365_subdomain') || 'sknlp';
  return {
    'Content-Type':      'application/json',
    'Accept':            'application/json',
    'X-Tenant-Subdomain': subdomain,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const request = async (method, endpoint, body = null) => {
  const headers = await getHeaders();
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    const res  = await fetch(`${BASE_URL}${endpoint}`, options);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || 'Request failed');
    return json;
  } catch (err) {
    throw err;
  }
};

export const api = {
  get:    (endpoint)        => request('GET',    endpoint),
  post:   (endpoint, body)  => request('POST',   endpoint, body),
  put:    (endpoint, body)  => request('PUT',    endpoint, body),
  delete: (endpoint)        => request('DELETE', endpoint),
};

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  login:   (email, password) => api.post('/auth/login', { email, password }),
  logout:  ()                => api.post('/auth/logout'),
  me:      ()                => api.get('/auth/me'),
};

// ── Dashboard ─────────────────────────────────────────────────
export const dashboardAPI = {
  stats:   () => api.get('/dashboard/stats'),
  liveMap: () => api.get('/dashboard/live-map'),
};

// ── Voters ────────────────────────────────────────────────────
export const votersAPI = {
  list:       (params = '') => api.get(`/voters${params}`),
  show:       (id)          => api.get(`/voters/${id}`),
  create:     (data)        => api.post('/voters', data),
  update:     (id, data)    => api.put(`/voters/${id}`, data),
  stats:      ()            => api.get('/voters/stats'),
};

// ── Canvassing ────────────────────────────────────────────────
export const canvassingAPI = {
  lists:       ()          => api.get('/canvassing/lists'),
  showList:    (id)        => api.get(`/canvassing/lists/${id}`),
  doorKnock:   (data)      => api.post('/canvassing/doorknock', data),
  sync:        (records)   => api.post('/canvassing/sync', { records }),
  offline:     (id)        => api.get(`/canvassing/lists/${id}/download-offline`),
};

// ── GPS Tracking ──────────────────────────────────────────────
export const trackingAPI = {
  updateGPS: (lat, lng, accuracy) => api.post('/tracking/gps', { latitude: lat, longitude: lng, accuracy }),
  live:      ()                   => api.get('/tracking/live'),
  panic:     (lat, lng)           => api.post('/tracking/panic', { latitude: lat, longitude: lng }),
};

// ── Runners ───────────────────────────────────────────────────
export const runnersAPI = {
  list:   ()      => api.get('/runners'),
  assign: (data)  => api.post('/runners/assign', data),
};

// ── GOTV ──────────────────────────────────────────────────────
export const gotvAPI = {
  turnout:         () => api.get('/gotv/turnout'),
  pollingStations: () => api.get('/gotv/polling-stations'),
};

// ── Fundraising ───────────────────────────────────────────────
export const fundraisingAPI = {
  stats:     () => api.get('/fundraising/stats'),
  donations: () => api.get('/fundraising/donations'),
  donors:    () => api.get('/fundraising/donors'),
  add:       (data) => api.post('/fundraising/donations', data),
};

// ── Notifications ─────────────────────────────────────────────
export const notificationsAPI = {
  list:       ()   => api.get('/notifications'),
  unreadCount: ()  => api.get('/notifications/unread-count'),
  markRead:   (id) => api.put(`/notifications/${id}/read`),
  markAllRead: ()  => api.post('/notifications/mark-all-read'),
};

// ── Team ──────────────────────────────────────────────────────
export const teamAPI = {
  list:   () => api.get('/team'),
  roles:  () => api.get('/team/roles'),
  create: (data) => api.post('/team', data),
};

// ── Reports ───────────────────────────────────────────────────
export const reportsAPI = {
  performance: () => api.get('/reports/performance'),
  canvassing:  () => api.get('/reports/canvassing'),
};
