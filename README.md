# Campaign 365

**White-label, multi-tenant SaaS platform for political campaign management.**

Campaign 365 lets a platform owner onboard multiple political parties/campaigns onto a single system, each with fully isolated data and its own branded portal (colors, logo, domain). Each campaign runs voter targeting, canvassing, GOTV (get-out-the-vote) operations, fundraising, and AI-assisted voter outreach — all from one dashboard, backed by a dedicated mobile app for field teams.

---

## What it does

**For the platform owner (Super Admin)**
- Onboard and manage tenants (campaigns/parties), subscription tiers, and feature flags
- White-label branding studio — set each tenant's colors, logo, and domain without touching code
- Platform-wide billing (Stripe), analytics, audit logs, and system health monitoring

**For each campaign (Tenant Portal)**
- **Voter management** — import voter rolls (Excel), segment voters, track contact history
- **Canvassing & field operations** — build walk lists, assign canvassers, record door-knocks, offline sync
- **Live field tracking** — real-time GPS location of canvassers/runners and one-tap panic-button alerts
- **GOTV command center** — live turnout tracking and election-day coordination
- **Communications hub** — bulk SMS, email, and WhatsApp campaigns (queued for scale)
- **AI-powered outreach** — GPT-4o generates personalized voter messages and analyzes sentiment from voter feedback/notes, plus voice-note transcription
- **Fundraising** — donation tracking, donor management, campaign goal progress
- **Events & scheduling**, **polling/surveys**, **compliance & data export**, **team & role management**

**Mobile app** — a dedicated app for canvassers, runners, and outdoor agents to work their assignments and log activity from the field.

---

## Tech stack

| Layer | Stack |
|---|---|
| **Backend API** | Laravel 13 (PHP 8.3), Sanctum auth, multi-tenancy via `stancl/tenancy` |
| **Web frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS, Recharts, Mapbox GL |
| **Mobile app** | React Native (Expo), React Navigation |
| **Real-time** | Pusher (live GPS positions, panic alerts) |
| **AI** | OpenAI GPT-4o (message generation, sentiment analysis, transcription) |
| **Comms** | Twilio (SMS/WhatsApp), Mailgun/SMTP (email) |
| **Payments** | Stripe (subscription billing) |
| **Storage & files** | AWS S3, `barryvdh/laravel-dompdf` (PDF reports), `maatwebsite/excel` (import/export) |
| **Auth/permissions** | Laravel Sanctum, `spatie/laravel-permission`, `spatie/laravel-activitylog` |
| **Infra** | Docker (PHP-FPM + Nginx + Supervisor), Railway (API), Vercel (web), EAS (mobile builds) |

---

## Architecture

```
┌─────────────────────┐     ┌──────────────────────┐     ┌────────────────────┐
│   Web Dashboard      │     │   Mobile App          │     │   Super Admin       │
│   Next.js / React     │     │   Expo / React Native │     │   Console (Next.js) │
└──────────┬───────────┘     └──────────┬────────────┘     └──────────┬─────────┘
           │                             │                              │
           └─────────────┬───────────────┴──────────────┬───────────────┘
                          │      REST API (Sanctum)      │
                 ┌────────▼────────────────────────────────▼────────┐
                 │              Laravel 13 API                       │
                 │  Multi-tenant (stancl/tenancy) · Queues · Events  │
                 └───────┬──────────────┬──────────────┬────────────┘
                         │              │              │
                  ┌──────▼────┐  ┌──────▼──────┐ ┌─────▼──────┐
                  │  MySQL /   │  │  Pusher      │ │  OpenAI /   │
                  │  Database  │  │  (realtime)  │ │  Twilio /   │
                  │  per tenant│  │              │ │  Stripe/S3  │
                  └────────────┘  └──────────────┘ └─────────────┘
```

Each tenant (campaign) is fully data-isolated at the database level. Branding (colors/logo) is resolved per-tenant at request time and applied dynamically on the frontend — no per-client code branches.

---

## Project structure

```
Campaign365/
├── app/                    # Laravel application
│   ├── Http/Controllers/   # API controllers (Voter, Field, GOTV, Fundraising, AI, SuperAdmin, ...)
│   ├── Models/              # Eloquent models (Tenant, Voter, Campaign, Donation, Runner, ...)
│   ├── Services/            # OpenAIService, TwilioService, GPSTrackingService, PanicButtonService, ...
│   ├── Jobs/                 # Queued jobs (bulk SMS/email/WhatsApp, voter import, compliance reports)
│   └── Events/               # Broadcast events (GPS updates, panic alerts)
├── routes/
│   ├── api.php               # Tenant-facing API
│   └── tenant.php            # Tenant identification routes
├── database/migrations/      # Schema (25 migrations)
├── frontend/                  # Next.js web app (Super Admin + Tenant portals)
│   ├── app/
│   │   ├── super/             # Super Admin portal
│   │   └── (tenant)/          # Tenant portal (dynamic branding)
│   ├── components/            # Shared UI, layout, and chart components
│   └── lib/                    # auth.ts, tenantTheme.ts, api client
├── mobile/                     # Expo/React Native field app
│   └── src/
│       ├── screens/            # Auth + main field screens
│       ├── navigation/
│       └── store/               # Zustand auth store
├── docker/                      # Nginx, Supervisor, entrypoint for containerized deploy
├── Dockerfile
└── railway.json                 # Railway deployment config
```

---

## Getting started

### Backend (Laravel API)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate

composer run dev   # runs server + queue worker + log tail + Vite, concurrently
```

### Web frontend

```bash
cd frontend
npm install
npm run dev         # http://localhost:3000
```

### Mobile app

```bash
cd mobile
npm install
npm start            # Expo dev server — scan QR with Expo Go, or run --ios / --android
```

### Environment variables

Key integrations configured via `.env` (see `.env.example`):

- `DB_*` — database connection
- `AWS_*` — S3 file storage
- `MAIL_*` — transactional email
- Additional keys required at runtime: Stripe, Twilio, OpenAI, and Pusher credentials (see `config/services.php`, `config/openai.php`)

---

## Deployment

- **API** — Dockerized (PHP-FPM + Nginx + Supervisor), deployed to Railway (`railway.json`, `Dockerfile`)
- **Web frontend** — deployed to Vercel (`frontend/vercel.json`), or exported statically into the Laravel `public/` directory
- **Mobile** — built and distributed via EAS (`mobile/eas.json`)

---

## Portals at a glance

| | Super Admin | Tenant (Campaign) Portal |
|---|---|---|
| **Used by** | Platform owner | Each political party/campaign |
| **Theme** | Fixed (navy sidebar, royal blue accents) | Dynamic per-tenant brand colors |
| **Manages** | All tenants, billing, subscriptions, compliance, platform health | Voters, canvassing, GOTV, fundraising, communications, team |

---

*Campaign 365 — built for running data-driven, field-first political campaigns.*
