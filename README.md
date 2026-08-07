<p align="center">
  <img src="app/icon.svg" width="72" height="72" alt="SecureCycle AI" />
</p>

<h1 align="center">SecureCycle AI</h1>

<p align="center">
  <strong>Erase data. Restore trust. Sustain tomorrow.</strong><br />
  AI-powered secure data wiping & trustworthy IT asset recycling platform
</p>

<p align="center">
  <a href="https://github.com/maddurvignesh/securecycle-ai"><img src="https://img.shields.io/github/stars/maddurvignesh/securecycle-ai?style=for-the-badge" alt="Stars" /></a>
  <a href="https://github.com/maddurvignesh/securecycle-ai"><img src="https://img.shields.io/github/license/maddurvignesh/securecycle-ai?style=for-the-badge" alt="License" /></a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=for-the-badge" alt="TailwindCSS" />
</p>

<p align="center">
  Built for the <strong>Smart India Hackathon</strong> · <a href="https://github.com/maddurvignesh">maddurvignesh</a>
</p>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Demo Sign-in](#demo-sign-in)
- [Scripts](#scripts)
- [Pages & Routes](#pages--routes)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Data Layer](#data-layer)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

---

## About

SecureCycle AI is an enterprise-grade platform for **verified secure data wiping** and **circular IT asset recycling**. Every device has a story — we make sure it ends securely, verifiably, and sustainably.

The platform covers the complete lifecycle of an IT asset: from **inventory and risk assessment**, through **standards-compliant secure wiping**, to **verified certificates**, **compliance**, **recycling**, and **analytics** — all with an **auditable trail** and an **enterprise-safe AI copilot**.

## Features

### Core Platform

- **Secure Data Wiping** — NIST 800-88, DoD 5220.22-M, Gutmann, Quick and Deep standards with a live, animated wipe console (progress ring, step stepper, real-time logs, AI reasoning)
- **Asset Inventory** — table + grid views, filters by status/department/type, search, pagination, and a rich detail drawer per asset
- **AI Risk Assessment** — device-level risk scoring with a gauge, weighted factor breakdown, distribution charts, and explainable AI reasoning
- **Digital Certificates** — tamper-evident, QR-verified certificates with a secure grid draw, tamper seal, share & verify actions
- **Compliance** — ISO 27001, GDPR, R2 / e-Stewards frameworks, control tracking, gap analysis, and recommendations
- **Asset Recycling** — lifecycle pipeline, carbon impact, material recovery, certified partners, and batch tracking
- **Analytics & Reports** — fleet, compliance, carbon, and forecast analytics with quarterly tables and exportable PDF/Excel reports
- **Audit Trail** — immutable, filterable audit logs with an integrity banner
- **AI Copilot** — enterprise-safe assistant chat inside the workspace with suggestion chips
- **Notifications** — severity-filterable feed with read/unread states
- **Role-based Sign-in** — Admin, IT Manager, Auditor, Technician

### Enterprise UX

- Responsive app shell with collapsible sidebar, command palette (`Ctrl/Cmd + K`), and notifications panel
- Dark/light theme, custom cursor glow, smooth Lenis scrolling, and Framer Motion micro-interactions
- Premium marketing site with cinematic intro, 3D laptop, interactive product screen, and animated statistics

## Tech Stack

| Layer         | Technology                                        |
|---------------|---------------------------------------------------|
| Framework     | Next.js 15 (App Router) + React 19                |
| Language      | TypeScript 5                                      |
| Styling       | TailwindCSS 3 + tailwindcss-animate               |
| UI            | Radix UI primitives, shadcn-style components, Lucide icons |
| Motion        | Framer Motion, GSAP, Lenis                        |
| Forms         | React Hook Form + Zod validation                  |
| Data/State    | TanStack Query, React Context                     |
| Charts        | Recharts                                          |
| Fonts         | Inter, Instrument Serif                           |

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Sign-in

From the landing page click **Launch Platform**, or go to `/login` directly. The form is prefilled with demo credentials — pick a role and click **Sign in**.

- Email: `demo@securecycle.ai`
- Password: `securecycle`

**Roles:** Admin · IT Manager · Auditor · Technician

## Scripts

| Command        | Description             |
|----------------|-------------------------|
| `npm run dev`  | Start the dev server    |
| `npm run build`| Production build        |
| `npm run start`| Serve the production build |
| `npm run lint` | Lint the codebase       |

## Pages & Routes

| Route                | Description                                |
|----------------------|--------------------------------------------|
| `/`                  | Marketing landing page                     |
| `/login`             | Role-based demo sign-in                    |
| `/app/dashboard`     | Executive overview with live KPIs & charts |
| `/app/assets`        | Asset inventory, filters & detail drawer   |
| `/app/secure-wipe`   | Animated secure wipe console               |
| `/app/risk`          | Risk assessment & AI reasoning             |
| `/app/certificates`  | Certificate gallery & verification         |
| `/app/compliance`    | Frameworks, controls & gap analysis        |
| `/app/analytics`     | Fleet, compliance & forecast analytics     |
| `/app/reports`       | Report templates & exportable reports      |
| `/app/audit`         | Immutable audit log                        |
| `/app/recycling`     | Lifecycle & material recovery              |
| `/app/notifications` | Notification feed                          |
| `/app/copilot`       | Enterprise AI assistant                    |
| `/app/profile`       | User profile & achievements                |
| `/app/settings`      | Workspace preferences (theme, security, API) |

## Project Structure

```
├── app/
│   ├── app/               # Protected app pages (dashboard → settings)
│   │   └── layout.tsx     # App shell (sidebar, topbar, command palette)
│   ├── login/             # Role-based sign-in
│   ├── layout.tsx         # Root layout + global providers
│   ├── page.tsx           # Marketing landing page
│   └── globals.css        # Global styles & design tokens
├── components/
│   ├── app/               # App-specific building blocks (charts, gauges, timeline…)
│   ├── app-shell/         # Sidebar, topbar, notifications, command menu
│   ├── app-ui/            # UI primitives (button, badge, table, dialog…)
│   ├── providers/         # AppProvider (state), ThemeProvider, ScrollProvider
│   └── ui/                # Landing page components (hero, features, footer…)
├── lib/
│   ├── mock/              # Mock data modules (assets, analytics, compliance…)
│   └── utils.ts           # Helpers (cn, formatters)
├── tailwind.config.ts     # Design tokens & custom shadows
└── package.json
```

## Design System

| Token     | Value                          |
|-----------|--------------------------------|
| Primary   | `#2563EB`                      |
| Success   | `#22C55E`                      |
| Ink       | `#111827`                      |
| Mist      | `#64748B`                      |
| Cloud     | `#F8FAFC`                      |

- Cards: `rounded-3xl`, `border-ink/6`
- Buttons: pill-shaped (`rounded-full`)
- Shadows: `shadow-card`, `shadow-soft`, `shadow-lift`, `shadow-glow`
- Gradient accents: primary → success

## Data Layer

The app ships with rich, deterministic mock data so every page works out of the box:

- **Assets** — a seeded generator produces a realistic fleet (~250 devices) across departments, brands, statuses, and risk levels
- **Analytics** — fleet distribution, compliance trends, carbon impact, and wipe forecast series
- **Compliance** — frameworks, controls, and gap data
- **Recycling** — lifecycle stages, partners, and batch records
- **Reports** — report templates and generation options
- **Copilot** — enterprise-safe suggestion content
- **Audit & Notifications** — realistic activity streams

State is managed via a global `AppProvider` (assets, certificates, notifications, audit logs) with actions such as `completeWipe`, `cancelWipe`, `markRead`, `logAudit`, and `pushNotification` — so interactions like wiping a device propagate across the app.

## Roadmap

- [x] Landing page & marketing experience
- [x] Role-based sign-in & app shell
- [x] Dashboard, assets, secure wipe, risk, certificates
- [x] Compliance, analytics, reports, audit, recycling
- [x] Notifications, copilot, profile, settings
- [ ] Backend API & real authentication
- [ ] Database-backed wipe history & certificates
- [ ] Live wipe progress via WebSockets
- [ ] PDF certificate generation & QR verification endpoint

## Author

**Maddur Vignesh**

- GitHub: [maddurvignesh](https://github.com/maddurvignesh)

## License

All rights reserved. Built for the Smart India Hackathon.
