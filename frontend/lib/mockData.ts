export const mockTenants = [
  { id: 1, name: 'Jamaica Labour Party', subdomain: 'jlp', country: 'UK', flag: '🇬🇧', plan: 'Enterprise', activeUsers: 402745, status: 'active', lastActivity: '2 hrs ago' },
  { id: 2, name: 'People National Party', subdomain: 'pnp', country: 'Jamaica', flag: '🇯🇲', plan: 'Professional', activeUsers: 402745, status: 'inactive', lastActivity: '3 hrs ago' },
  { id: 3, name: 'SKNLP', subdomain: 'sknlp', country: 'US', flag: '🇺🇸', plan: 'Essentials', activeUsers: 401436, status: 'active', lastActivity: '1 hr ago' },
  { id: 4, name: 'Barbados Labour Party', subdomain: 'blp', country: 'Jamaica', flag: '🇯🇲', plan: 'Professional', activeUsers: 201189, status: 'inactive', lastActivity: '5 hrs ago' },
  { id: 5, name: 'Canada First Party', subdomain: 'cfp', country: 'Canada', flag: '🇨🇦', plan: 'Enterprise', activeUsers: 2020289, status: 'inactive', lastActivity: '3 days ago' },
  { id: 6, name: 'Progressive Alliance', subdomain: 'pa', country: 'Canada', flag: '🇨🇦', plan: 'Sovereign', activeUsers: 2020246, status: 'active', lastActivity: '30 min ago' },
  { id: 7, name: 'UK Conservative Alliance', subdomain: 'uca', country: 'Jamaica', flag: '🇯🇲', plan: 'Enterprise', activeUsers: 3143646, status: 'active', lastActivity: '1 day ago' },
  { id: 8, name: 'Democracy Forward', subdomain: 'df', country: 'US', flag: '🇺🇸', plan: 'Professional', activeUsers: 3042005, status: 'inactive', lastActivity: '2 days ago' },
];

export const mockWalkLists = [
  { id: 1, name: 'St. Christopher North — Zone A', area: 'St. Chris 1', team: 'Team Alpha', status: 'active', doorsCompleted: 280, totalDoors: 320, percentage: 88 },
  { id: 2, name: 'St. Christopher North — Zone B', area: 'St. Chris 1', team: 'Team Beta', status: 'completed', doorsCompleted: 290, totalDoors: 290, percentage: 100 },
  { id: 3, name: 'Basseterre Central Walk', area: 'St. Chris 2', team: 'Team Gamma', status: 'active', doorsCompleted: 180, totalDoors: 410, percentage: 44 },
  { id: 4, name: 'Trinity Palmetto Walk', area: 'St. Chris 3', team: 'Team Delta', status: 'pending', doorsCompleted: 0, totalDoors: 215, percentage: 0 },
];

export const mockCampaigns = [
  { id: 1, name: '2026 General Election — National', status: 'active', votersTargeted: 15432, responses: 8721, startDate: '2026-01-15', endDate: '2026-06-30' },
  { id: 2, name: '2025 Constituency Campaign — St. Christopher 1', status: 'upcoming', votersTargeted: 8722, responses: 0, startDate: '2026-05-01', endDate: '2026-09-30' },
  { id: 3, name: 'Door-to-Door Canvassing Drive Q2', status: 'active', votersTargeted: 4500, responses: 2100, startDate: '2026-03-01', endDate: '2026-04-30' },
  { id: 4, name: 'Youth Voter Outreach Program', status: 'completed', votersTargeted: 3200, responses: 3190, startDate: '2025-11-01', endDate: '2025-12-31' },
];

export const mockVoters = [
  { id: 1, name: 'James Anderson', constituency: 'St. Christopher 1', division: 'Basseterre East', status: 'supporter', phone: '+1-869-555-0101', lastContact: '2026-04-01' },
  { id: 2, name: 'Maria Thompson', constituency: 'St. Christopher 2', division: 'Basseterre West', status: 'undecided', phone: '+1-869-555-0102', lastContact: '2026-03-28' },
  { id: 3, name: 'Robert Clarke', constituency: 'St. Christopher 3', division: 'Trinity', status: 'opposition', phone: '+1-869-555-0103', lastContact: '2026-03-15' },
  { id: 4, name: 'Sandra Williams', constituency: 'St. Christopher 1', division: 'Basseterre East', status: 'supporter', phone: '+1-869-555-0104', lastContact: '2026-04-03' },
  { id: 5, name: 'Michael Brown', constituency: 'Nevis 1', division: 'Charlestown', status: 'undecided', phone: '+1-869-555-0105', lastContact: '2026-04-02' },
];

export const mockRunners = [
  { id: 1, name: 'Marcus Johnson', status: 'active', gpsStatus: 'online', zone: 'Basseterre Central', assignedPickups: 3, completedPickups: 1 },
  { id: 2, name: 'Patricia Lee', status: 'active', gpsStatus: 'online', zone: 'St. Peter', assignedPickups: 2, completedPickups: 2 },
  { id: 3, name: 'David Smith', status: 'idle', gpsStatus: 'offline', zone: 'St. Thomas', assignedPickups: 1, completedPickups: 0 },
  { id: 4, name: 'Angela Davis', status: 'active', gpsStatus: 'online', zone: 'St. George', assignedPickups: 4, completedPickups: 3 },
];

export const mockEvents = [
  { id: 1, title: 'Town Hall Meeting — Basseterre', date: '2026-04-15', time: '7:00 PM', location: 'Basseterre Community Center', rsvp: 234, status: 'upcoming' },
  { id: 2, title: 'Youth Rally — St. Kitts College', date: '2026-04-20', time: '2:00 PM', location: 'St. Kitts-Nevis College', rsvp: 189, status: 'upcoming' },
  { id: 3, title: 'Canvasser Training Day', date: '2026-04-08', time: '9:00 AM', location: 'Party HQ', rsvp: 45, status: 'upcoming' },
  { id: 4, title: 'Fundraising Gala', date: '2026-03-30', time: '6:00 PM', location: 'St. Kitts Marriott', rsvp: 312, status: 'completed' },
];

export const mockSubscriptionStats = {
  activeTenants: 47,
  totalRevenue: '$184K',
  campaignsRunning: 312,
  revenueChart: [20, 35, 28, 45, 38, 52, 48, 65, 58, 72, 68, 84],
};

export const mockDonors = [
  { id: 1, name: 'Business Alliance Ltd', amount: 25000, date: '2026-04-01', type: 'corporate' },
  { id: 2, name: 'John Marshall', amount: 5000, date: '2026-04-02', type: 'individual' },
  { id: 3, name: 'Williams & Associates', amount: 12000, date: '2026-03-30', type: 'corporate' },
  { id: 4, name: 'Sarah Thompson', amount: 500, date: '2026-04-03', type: 'individual' },
  { id: 5, name: 'Nevis Development Group', amount: 8000, date: '2026-03-28', type: 'corporate' },
];

export const mockSurveys = [
  { id: 1, title: 'Pre-Election Voter Sentiment Survey', responses: 1240, status: 'active', created: '2026-03-01' },
  { id: 2, title: 'Policy Priority Questionnaire', responses: 890, status: 'active', created: '2026-02-15' },
  { id: 3, title: 'Post-Canvassing Feedback Form', responses: 456, status: 'completed', created: '2026-01-20' },
];

export const mockRecentClients = [
  { name: 'Client Party A', initial: 'A', color: '#3B82F6' },
  { name: 'Tins-Depigi Clach', initial: 'M', color: '#8B5CF6' },
  { name: 'Campaign Alach', initial: 'Y', color: '#F59E0B' },
  { name: 'Tinkh Srovons', initial: 'A', color: '#EF4444' },
];

export const mockSubBreakdown = [
  { name: 'Starter', value: 12, color: '#14B7A6' },
  { name: 'Professional', value: 18, color: '#3B82F6' },
  { name: 'Enterprise', value: 15, color: '#0F172A' },
  { name: 'Enterprise+', value: 5, color: '#F59E0B' },
];
