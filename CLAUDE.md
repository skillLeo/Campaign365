# CAMPAIGN 365 — CLAUDE MEMORY FILE
## Read this FIRST before touching any file in this project

---

## WHAT THIS PROJECT IS

Campaign 365 is a **white-label, multi-tenant SaaS** political campaign management platform. It has TWO completely separate portals that look and behave differently:

1. **Super Admin Portal** — Used by Omar (the platform owner) to manage all clients
2. **Tenant Portal** — Used by each political party (SKNLP, JLP, BLP, etc.) with THEIR OWN brand colors

---

## MOST CRITICAL RULE — TWO SEPARATE COLOR SYSTEMS

### Super Admin Portal Colors (FIXED — never changes)
```
Sidebar background:     #0F172A  (dark navy)
Primary accent:         #2563EB  (ROYAL BLUE — NOT teal/green)
Active nav item:        #2563EB  background
Button primary:         #2563EB
Logo "365" color:       #2563EB
Hover states:           #1D4ED8
Content background:     #F8FAFC
Card background:        #FFFFFF
Dark card (client details): #1E293B
```

### Tenant Portal Colors (DYNAMIC — changes per party)
The tenant portal reads colors from the tenant's branding config. The DEFAULT demo uses SKNLP colors:
```
SKNLP sidebar:          #1A1A1A  (near black)
SKNLP accent/buttons:   #E30613  (bright red)
SKNLP active nav:       #E30613  background
SKNLP header banner:    #E30613  (red top bar)
SKNLP logo text:        White "SKNLP" with red/green/yellow flag icon
```

Other tenant color examples:
```
JLP (Jamaica Labour Party):    #00A651  (green)
BLP (Barbados Labour Party):   #FFD700  (gold/yellow)  
Generic independent:           #2563EB  (blue)
```

**HOW IT WORKS IN CODE:**
```typescript
// lib/tenantTheme.ts
export const tenantThemes: Record<string, TenantTheme> = {
  sknlp: {
    primary: '#E30613',
    sidebar: '#1A1A1A',
    name: 'SKNLP',
    fullName: 'St. Kitts and Nevis Labour Party',
    logo: '🇰🇳',
  },
  jlp: {
    primary: '#00A651',
    sidebar: '#0A1628',
    name: 'JLP',
    fullName: 'Jamaica Labour Party',
    logo: '🇯🇲',
  },
  default: {
    primary: '#E30613',
    sidebar: '#1A1A1A',
    name: 'SKNLP',
    fullName: 'Campaign Party',
    logo: '⚡',
  }
};
```

CSS variables must be applied dynamically:
```css
/* Applied via JS on mount in tenant layout */
--tenant-primary: [party color];
--tenant-sidebar: [party sidebar color];
```

---

## AUTH SYSTEM — NEVER REDIRECT ON REFRESH

**The refresh-to-login bug MUST NOT exist.** Rules:

1. Store token in `localStorage` with key `c365_token`
2. Store role in `localStorage` with key `c365_role` (values: `super_admin` or `tenant`)
3. Store user data in `localStorage` with key `c365_user`
4. ALL auth guards are CLIENT-SIDE ONLY using `useEffect`
5. NEVER use Next.js middleware for auth redirects
6. On mount: check `localStorage` BEFORE deciding to redirect
7. If token exists → show page content
8. If token missing → redirect to login

```typescript
// lib/auth.ts — EXACT IMPLEMENTATION
export const auth = {
  setSession: (token: string, role: 'super_admin' | 'tenant', user: object) => {
    localStorage.setItem('c365_token', token);
    localStorage.setItem('c365_role', role);
    localStorage.setItem('c365_user', JSON.stringify(user));
  },
  getToken: () => typeof window !== 'undefined' ? localStorage.getItem('c365_token') : null,
  getRole: () => typeof window !== 'undefined' ? localStorage.getItem('c365_role') : null,
  getUser: () => {
    if (typeof window === 'undefined') return null;
    const u = localStorage.getItem('c365_user');
    return u ? JSON.parse(u) : null;
  },
  isLoggedIn: () => typeof window !== 'undefined' && !!localStorage.getItem('c365_token'),
  isSuperAdmin: () => typeof window !== 'undefined' && localStorage.getItem('c365_role') === 'super_admin',
  logout: () => {
    ['c365_token', 'c365_role', 'c365_user'].forEach(k => localStorage.removeItem(k));
  }
};
```

Mock login credentials:
- Super Admin: `admin@campaign365.app` / `password` → role: `super_admin`
- SKNLP tenant: `admin@sknlp.campaign365.app` / `password` → role: `tenant`

---

## FOLDER STRUCTURE

```
frontend/
├── CLAUDE.md                    ← THIS FILE — Read first always
├── app/
│   ├── super/                   ← Super Admin portal (blue theme)
│   │   ├── login/page.tsx
│   │   ├── login-success/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── tenants/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── subscription-tiers/page.tsx
│   │   ├── feature-flags/page.tsx
│   │   ├── branding/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── billing/page.tsx
│   │   ├── audit-logs/page.tsx
│   │   ├── ai-controls/page.tsx
│   │   ├── compliance/page.tsx
│   │   ├── platform-health/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── layout.tsx           ← SuperAdminLayout (blue sidebar)
│   ├── (tenant)/                ← Tenant portal (dynamic colors)
│   │   ├── dashboard/page.tsx
│   │   ├── campaigns/page.tsx
│   │   ├── voters/
│   │   │   ├── page.tsx
│   │   │   ├── import/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── canvassing/page.tsx
│   │   ├── tracking/page.tsx
│   │   ├── runners/page.tsx
│   │   ├── gotv/page.tsx
│   │   ├── communications/page.tsx
│   │   ├── fundraising/page.tsx
│   │   ├── events/page.tsx
│   │   ├── polling/page.tsx
│   │   ├── ai-insights/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── compliance/page.tsx
│   │   ├── team/page.tsx
│   │   ├── notifications/page.tsx
│   │   ├── settings/page.tsx
│   │   └── layout.tsx           ← TenantLayout (dynamic party colors)
│   ├── login/page.tsx           ← Tenant login
│   ├── forgot-password/page.tsx ← Tenant forgot password
│   └── layout.tsx               ← Root layout
├── components/
│   ├── layout/
│   │   ├── SuperAdminSidebar.tsx   ← Blue theme, fixed
│   │   ├── TenantSidebar.tsx       ← Dynamic party colors
│   │   └── TopBar.tsx
│   ├── ui/
│   │   ├── StatCard.tsx
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   └── Toggle.tsx
│   ├── charts/
│   │   ├── SparklineChart.tsx
│   │   ├── DonutChart.tsx
│   │   ├── BarChart.tsx
│   │   └── LineChart.tsx
│   └── PanicAlertModal.tsx
├── lib/
│   ├── auth.ts                  ← Auth system (localStorage only)
│   ├── tenantTheme.ts           ← Party color configs
│   ├── mockData.ts              ← All mock data
│   └── utils.ts
└── hooks/
    ├── useAuth.ts
    └── useTenantTheme.ts
```

---

## COMPLETE SCREEN LIST — ALL 46 SCREENS TO BUILD

### SUPER ADMIN PORTAL (20 screens)
1. Super Admin Login — dark navy bg, white card, blue "Sign In" button
2. Forgot Password — left sidebar + dark card with "Send Reset Link"
3. Login Success — white bg, green checkmark, "Continue to Dashboard" green button
4. Dashboard Overview — blue teal stat cards, recent clients, donut chart, feature grid
5. Subscription Tiers Manager — FULL DARK bg, 4 tier cards in amber titles
6. All Clients / Tenant Management — table + right summary panel, teal action buttons
7. Client Details — dark stat cards, tabs (Overview/Branding/Features/Users/Billing/Compliance)
8. Global Reports & Analytics — charts, turnout lift, revenue trend
9. User Roles & Permissions — table with checkboxes and teal checkmarks
10. AI Model Controls — left panel models list + right token usage + waveform preview
11. White-Label Branding Studio — phone mockup preview + right controls panel
12. Compliance & Data Export — 3-column: GDPR checklist + export table + calendar + audit trail
13. System Settings — maintenance mode toggle, email settings, security, backup
14. Audit Logs — data table with timestamp/user/client/action/IP, export CSV, detail panel
15. Global Offline & Multi-Region — world map, offline toggles, sync stats
16. Billing & Invoicing — revenue stats + invoice table + invoice preview panel
17. API Keys & Integrations — tabs (Active Keys/Webhooks/Integrations/Rate Limits) + usage chart
18. New Client Onboarding Wizard — 5-step wizard with progress indicators
19. Email & Notification Templates — left template list + center editor + right live preview
20. Platform Health & Maintenance — 4 status cards + 3 line charts + maintenance action buttons

### TENANT PORTAL — SKNLP (26 screens, RED/BLACK theme)
1. SKNLP Login — black left panel + white right panel, red "Log In" button
2. SKNLP Forgot Password — black left sidebar + white reset card, red "Send Reset Link"
3. SKNLP Dashboard — stat cards (Active Campaigns: 8, Voters Contacted: 14,872, Turnout Goal: 68%, Pending Runners: 12) + live map + "Launch New Campaign" red button
4. SKNLP Campaigns Overview — card grid showing Active/Upcoming/Completed campaigns
5. SKNLP Voter Targeting — interactive St Kitts map with constituency colors + segmentation panel
6. SKNLP Voter Management — table with Name/Constituency/Voting History/Tags + "View Profile" and "Assign Canvasser" red buttons
7. SKNLP Canvassing (Field Operations) — dark map + walk lists sidebar with Assign/Offline buttons
8. SKNLP Team Management — tabs (All Members/Canvassers/Runners/Phone Bank) + team member cards grid
9. SKNLP Communications Hub — left campaigns table + right new message form with "Send Now" red button
10. SKNLP Reports & Analytics — 4 chart panels (Voter Turnout, Canvassing Efficiency donut, Fundraising Progress bar, Sentiment Analysis line)
11. SKNLP Fundraising Dashboard — red/green banner + total raised + goal bar + donor donut + top donors + add donor form
12. SKNLP GOTV Command Center — full-width dark map + "LIVE UPDATES" badge + Live Metrics + Quick Actions (Send Final Push SMS, Assign Runners, End Day Report in red)
13. SKNLP Canvassing Tools — map with red highlighted constituency + Active Canvass Teams: 12 + Progress: 4,872 Doors + walk lists table + "Launch Mobile Canvass App" red button
14. SKNLP Live Runners — dark map with red pins showing runner positions + runners table (Name/Status/Current Task/ETA) + "Assign Urgent Pickup" red button
15. SKNLP Party Performance Reports — 4 KPI bars (Voter Contact Rate 75%, Turnout Projection 85%, Canvassing Efficiency 90%, Fundraising Raised $150,000) + 2 charts
16. SKNLP Compliance & Data Management — tabs (Data Privacy/Election Compliance/Export Requests) + pending requests table + St Kitts Election Law compliance checklist
17. SKNLP Settings & Feature Flags — 2-column (Party Profile + User Roles left, Feature Flags toggles + White-Label Appearance right)
18. SKNLP Fundraising Hub — detailed version with donation trend line chart + top donors table with amounts
19. SKNLP Communications Hub v2 — tabs (Email/SMS/Social Media/Push Notifications) + rich text editor + SKNLP flag image preview + audience selector + recent sent campaigns
20. SKNLP Party Calendar & Events — monthly calendar grid with color-coded events + right panel campaign quick links + event list below
21. SKNLP Team & Mobile App Management — tabs (All Users/Canvassers/Runners/Outdoor Agents/Mobile App Stats) + user table + right panel Mobile App status (Canvass App, Candidate App, Runner App, Outdoor Agent App)
22. SKNLP Final GOTV Command Center — turnout projection 72% + Voters Still Needed 4,821 + Runners Deployed 28 + polling station map + "Final Push Alert to All Teams" + "End Day Report"
23. SKNLP Notifications Center — "7 New" + filter tabs (All/Urgent/Canvassing/Runners/Fundraising) + notification list with "Quick Reply" buttons + red location tags
24. SKNLP AI Campaign Insights — Persuasion Rate +18% + Recommended Next Action 25-34 age group + Voter Sentiment Summary + AI insights panel + recommendations chart + donut
25. SKNLP Advanced Polling & Research — tabs (Live Polls/Historical Data/Micro-Segmentation) + bar chart + constituencies list + "Export Research Report" red button
26. SKNLP Party Profile & Branding — logo upload + party details form + live preview of dashboard + color scheme (red/black locked by admin) + email footer + "Publish Branding Changes" red button

---

## KEY DESIGN RULES PER PORTAL

### Super Admin — What makes it look right:
- Sidebar: `#0F172A` dark navy, Royal Blue (`#2563EB`) active items
- Dashboard stat cards: first card is SOLID BLUE (#2563EB), others are white with blue sparklines
- Subscription Tiers page: ENTIRE PAGE is dark (`#1a2535`), tier cards are `#243044`
- Tier card titles are AMBER/GOLD color (#F59E0B): Starter, Professional, Enterprise, Enterprise+
- Buttons on tier cards are teal-green (#14B7A6) — NOTE: only tier cards keep teal, rest of super admin is BLUE
- Client Details stat cards: ALL DARK (`#1E293B`) with white text

### Tenant (SKNLP) — What makes it look right:
- Sidebar: near black `#1A1A1A`, RED (`#E30613`) active items
- Top header on some pages: solid RED banner
- ALL primary buttons: RED (`#E30613`)
- Map pins: RED
- Active status badges: RED background
- Charts accent: RED lines/bars
- The SKNLP logo has a flag icon (red/green/yellow stripes of St Kitts flag)
- Some pages have a dramatic red hero section at the top (Fundraising has red/green/yellow gradient banner)

---

## MOCK DATA — USE EXACTLY THESE VALUES

```typescript
// Super Admin
activeTenants: 47
totalRevenue: '$184K'  
campaignsRunning: 312

// SKNLP Dashboard
activeCampaigns: 8
votersContacted: 14872
turnoutGoal: '68%'
pendingRunners: 12
userName: 'Hon. General Secretary'
candidateName: 'Hon. Dr. Terrence Drew'

// SKNLP Campaigns
campaigns: [
  { name: '2026 General Election — National', status: 'Active', votersTargeted: 15432, responses: 8721 },
  { name: '2025 Constituency Campaign — St. Christopher 1', status: 'Upcoming', votersTargeted: 8722, responses: 8721 }
]

// SKNLP Canvassing
totalDoors: 1415
doorsKnocked: 870
activeTeams: 3
completionRate: '61%'

walkLists: [
  { name: 'St. Christopher North — Zone A', team: 'Team Alpha', status: 'active', progress: 88, doors: '280/320' },
  { name: 'St. Christopher North — Zone B', team: 'Team Beta', status: 'completed', progress: 100, doors: '290/290' },
  { name: 'Basseterre Central Walk', team: 'Team Gamma', status: 'active', progress: 44, doors: '180/410' }
]

// SKNLP GOTV
votersContacted: 1248
turnoutGoal: '92%'
turnoutProjection: '72%'
votersStillNeeded: 4821
runnersDeployed: 28

// SKNLP Reports
voterContactRate: '75%'
turnoutProjection: '85%'
canvassingEfficiency: '90%'
fundraisingRaised: '$150,000'

// SKNLP Fundraising
totalRaisedCycle: '$248,750'
goalAmount: '$365K'
goalProgress: '68%'
topDonors: [
  { name: 'John Doe', amount: '$50,000' },
  { name: 'Jann Smith', amount: '$30,000' },
  { name: 'Jane Smith', amount: '$30,000' }
]

// SKNLP Runners
liveRunners: 18
runners: [
  { name: 'John Doe (Active)', status: 'Active', task: '#E30613', currentTask: 'Door-to-Door', eta: '10 min' },
  { name: 'John Doe (Active)', status: 'Active', task: '#E30613', currentTask: 'Door-to-Door', eta: '15 min' }
]

// Notifications
newNotifications: 7
notifications: [
  { text: 'Urgent runner assignment in', location: 'Basseterre', type: 'urgent' },
  { text: 'Voter feedback from', location: 'Nevis', type: 'canvassing' },
  { text: 'New donation received', location: 'Online', type: 'fundraising' }
]
```

---

## RECHARTS USAGE — Required for all charts

```typescript
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

// Colors for Super Admin charts: #2563EB (blue)
// Colors for SKNLP charts: #E30613 (red)
```

---

## WHAT CLAUDE CODE MUST NEVER DO

1. ❌ Never use the same color theme for Super Admin and Tenant portals
2. ❌ Never redirect to login on page refresh — check localStorage first
3. ❌ Never leave any page empty or as a placeholder
4. ❌ Never use teal/green as the Super Admin primary color — it must be ROYAL BLUE #2563EB
5. ❌ Never use blue as the SKNLP tenant primary color — it must be RED #E30613
6. ❌ Never hardcode party colors in the tenant portal — always use CSS variables from tenantTheme
7. ❌ Never build only some pages and leave others — ALL 46 screens must be built
8. ❌ Never use `router.push('/login')` in middleware — only in client useEffect
9. ❌ Never show empty tables — always use the mock data defined above
10. ❌ Never make the Subscription Tiers page light/white — it must be full dark theme

---

## BUILD ORDER (Follow Exactly)

**Phase 1 — Foundation (build first, test auth flow)**
1. `lib/auth.ts`
2. `lib/tenantTheme.ts`
3. `lib/mockData.ts`
4. `globals.css` with CSS variables
5. All shared UI components (Button, Badge, StatCard, Table, Toggle)
6. All chart components
7. SuperAdminSidebar + TenantSidebar + TopBar

**Phase 2 — Super Admin Portal**
8. Super Admin Login → Login Success → Dashboard (verify no refresh-to-login)
9. All Super Admin pages (screens 4-20 from list above)

**Phase 3 — Tenant Portal**
10. SKNLP Login → Dashboard (verify red theme applied correctly)
11. All 26 SKNLP tenant pages

**Phase 4 — Polish**
12. Verify all pages have correct colors
13. Verify refresh on any page keeps you on that page
14. Verify no TypeScript errors
15. `npm run build` must pass

---

*Last updated: April 2026 | Campaign 365 v1.0*