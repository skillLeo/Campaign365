# Tenant Portal Redesign — Design Spec
**Date:** 2026-04-14  
**Goal:** Match super admin portal's boldness, bigness, and uniqueness. Each screen must look visually distinct.

---

## Design System

### Typography
- Hero numbers: `Plus Jakarta Sans`, weight 800, `clamp(36px,6vw,52px)`, letter-spacing `-0.04em`
- Page titles: `Plus Jakarta Sans`, weight 800, `clamp(22px,4vw,28px)`, letter-spacing `-0.03em`
- Section labels: `Inter`, 10px, weight 700, uppercase, `#94A3B8`, `0.08em` tracking
- Body: `Inter`

### Color Tokens (dynamic — never hardcoded)
- `var(--tenant-primary)` — party accent (red for SKNLP)
- `var(--tenant-sidebar)` — party sidebar/dark bg (near-black for SKNLP)
- White cards: `#FFFFFF` with `border: 1px solid #F1F5F9`
- Page backgrounds: `#F8FAFC` (light pages) or `var(--tenant-sidebar)` (dark pages)

### Stat Card Treatments (same pattern as super admin)
1. **Hero card** — solid `var(--tenant-primary)` background, white text, giant number, sparkline
2. **Standard card** — white `#FFFFFF`, dark number, primary-colored sparkline
3. **Dark card** — `var(--tenant-sidebar)` background, white text (for dark-theme pages)

### Sparkline
Recharts `AreaChart` embedded in every stat card, 48px height, no axes.

---

## Page-by-Page Design

### 1. Dashboard
- **Hero strip**: 3 big stats in a row — first card solid primary, others white with sparklines
- **Map section**: Dark sidebar-color background container, map inside
- **Sentiment donut**: Styled card with donut chart
- **Quick actions**: 4 big pill buttons in primary/variant colors
- **NO plain white identical cards** — mixed treatments

### 2. Campaigns
- **Header**: Dark `var(--tenant-sidebar)` banner with huge campaign count number
- **Campaign cards**: Replace progress bars with small donut/radial chart per campaign
- **Status tabs**: Pill-shaped filter tabs
- **Each card visually different** based on status (active=colored border, completed=muted, draft=dashed)

### 3. Canvassing (Field Operations)
- **Red full-width header banner** with title + star/map icon (matching inspiration image)
- **Dark map area** taking majority of content space
- **Walk lists sidebar** overlaid or below map
- "Assign" / "Offline" action buttons

### 4. Team
- **Dark content background** (`var(--tenant-sidebar)`)
- **Team member cards** in 2-column grid on dark bg
- Each card: avatar circle, name, role, online/offline badge, action buttons
- **Full-width primary CTA button** at bottom ("Add New Team Member")
- Tab bar: All Members / Canvassers / Runners / Phone Bank

### 5. Communications Hub
- **Two-panel layout**: Left = campaigns table, Right = "New Message" form
- Primary-colored "Send Now" button
- Status pills: Scheduled/Sent/Draft

### 6. Fundraising
- **Hero banner**: Flag-color gradient (primary + sidebar colors diagonal) with title + launch button
- **Raised card**: Solid primary-color card, big dollar number
- **Goal progress**: Thick bar with percentage
- **Donor donut** + **Top donors table** + **Add donor form**

### 7. Reports & Analytics
- **4 KPI columns** at top: Voter Contact Rate / Turnout Projection / Canvassing Efficiency / Fundraising Raised
  - Each has giant percentage in primary color, thin red progress bar below
- **Two charts**: Daily Voter Outreach (line) + Constituency Breakdown (bar)
- "Export Full Report" primary-color button

### 8. Voters
- **Clean two-panel feel**: Filter tabs (Constituency / Polling Division / Demographics)
- Table rows with primary-color "View Profile" and "Assign Canvasser" action buttons
- Checkbox column on left
- Search bar at top

### 9. GOTV Command Center
- **Full dark page** (`var(--tenant-sidebar)`) — command center feel
- "LIVE UPDATES" pulsing badge
- Large map taking center stage
- 3 big live metrics: Voters Contacted / Runners Deployed / Turnout Projection
- "Final Push Alert" + "End Day Report" primary-color buttons

### 10. AI Insights
- Dark header section
- Insight cards with large percentage stats
- Line chart for sentiment trend
- Recommendation cards with colored left border

### 11. Runners (Live)
- Dark background, map with primary-colored pins
- Runner status table below (Name / Status / Task / ETA)
- "Assign Urgent Pickup" button

### 12. Notifications
- Filter tabs (All / Urgent / Canvassing / Runners / Fundraising)
- Notification list with primary-color location tags
- "7 New" badge

---

## Rules
1. No two consecutive pages can look the same
2. Every page must have at least ONE dramatic visual element (hero section, dark bg, large number, or special chart)
3. All colors from `var(--tenant-primary)` and `var(--tenant-sidebar)` — never hardcoded
4. Sparklines in all stat cards (matching super admin)
5. `Plus Jakarta Sans` for all hero numbers, `Inter` for body
6. No plain progress bars — replace with donuts, sparklines, or thick bars with context
