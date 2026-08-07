<p align="center">
  <img src="app/icon.svg" width="72" height="72" alt="SecureCycle AI" />
</p>

<h1 align="center">SecureCycle AI</h1>

<p align="center">
  <strong>Erase data. Restore trust. Sustain tomorrow.</strong><br />
  AI-powered secure data wiping & trustworthy IT asset recycling platform
</p>

<p align="center">
  Built for the <strong>Smart India Hackathon</strong> ·
  <a href="https://github.com/maddurvignesh">maddurvignesh</a>
</p>

---

## About

SecureCycle AI is an enterprise-grade platform for verified secure data wiping and circular IT asset recycling. Every device has a story — we make sure it ends securely, verifiably, and sustainably.

- **Secure data wiping** — NIST 800-88, DoD 5220.22-M, Gutmann and more, with a live animated wipe console
- **AI risk assessment** — device-level risk scoring with explainable factor weights
- **Digital certificates** — tamper-evident, QR-verified certificates for every wipe
- **Compliance** — ISO 27001, GDPR, R2 / e-Stewards readiness with gap tracking
- **Asset lifecycle & recycling** — circular economy tracking, material recovery and carbon impact
- **Analytics & reports** — fleet, compliance and forecast analytics with exportable reports
- **AI Copilot** — enterprise-safe assistant inside the workspace
- **Audit trail** — immutable, filterable audit logs with an integrity banner

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Framework  | Next.js 15 (App Router) + React 19 |
| Language   | TypeScript |
| Styling    | TailwindCSS + tailwindcss-animate |
| UI         | Radix UI primitives, shadcn-style components, Lucide icons |
| Motion     | Framer Motion, GSAP, Lenis |
| Data/State | TanStack Query, React Hook Form + Zod |
| Charts     | Recharts |
| Fonts      | Inter, Instrument Serif |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo sign-in

Sign in from the landing page via **Launch Platform**, or visit `/login` directly. The form is prefilled — pick a role and click **Sign in**.

- Email: `demo@securecycle.ai`
- Password: `securecycle`

Roles: Admin · IT Manager · Auditor · Technician

## Scripts

| Command        | Description            |
|----------------|------------------------|
| `npm run dev`  | Start dev server       |
| `npm run build`| Production build       |
| `npm run start`| Serve production build|
| `npm run lint` | Lint the codebase      |

## Pages

| Route              | Description                          |
|--------------------|--------------------------------------|
| `/`                | Marketing landing page               |
| `/login`           | Role-based demo sign-in              |
| `/app/dashboard`   | Executive overview                   |
| `/app/assets`      | Asset inventory & detail drawer      |
| `/app/secure-wipe` | Wipe console with live animation     |
| `/app/risk`        | Risk assessment & AI reasoning       |
| `/app/certificates`| Certificate gallery & verification   |
| `/app/compliance`  | Frameworks, controls & gaps          |
| `/app/analytics`   | Fleet, compliance & forecast charts  |
| `/app/reports`     | Templates & exportable reports       |
| `/app/audit`       | Immutable audit log                  |
| `/app/recycling`   | Lifecycle & material recovery        |
| `/app/notifications`| Notification feed                  |
| `/app/copilot`     | Enterprise AI assistant              |
| `/app/profile`     | User profile & achievements          |
| `/app/settings`    | Workspace preferences                |

## Author

**Maddur Vignesh**

## License

All rights reserved. Built for the Smart India Hackathon.
