# 🌱 Plant Daddy Platform

**Keep It Moist.**  
**Daddy handles the rest.™**

This repository is the clean-room, cloud/app foundation for the consumer Plant Daddy product.

## 🚧 Hard boundary: this repo does NOT touch Hub #0001

The existing Plant Daddy system on the Mac is a **reference prototype only**.

This repository must never contain or directly read:

- the live Mac SQLite database
- Zigbee2MQTT configuration or credentials
- MQTT credentials
- real sensor IEEE addresses
- real plant readings/history
- local filesystem paths from the Mac prototype
- copied `.env` files or secrets
- personal household/device data

Development starts with **synthetic demo data only**. A future Hub connector will be a separate, explicit, opt-in API boundary.

See [`docs/PRIVACY_BOUNDARY.md`](docs/PRIVACY_BOUNDARY.md).

## What is included

- **Expo client** — one app codebase for iOS, Android, and web
- **Cloudflare Worker API** — isolated cloud API service
- **Shared domain package** — Plant, Device, Site, Zone, Reading, Care Event, Automation types
- **Synthetic demo garden** — fake plant/device data safe for GitHub
- **D1 starter schema** — cloud schema only; not a copy of the Mac database
- **Privacy guard** — CI fails if risky local/private artifacts are committed
- **Product docs** — architecture, phases, Free vs Ultra, Hub integration contract

## Repo map

```text
PlantDaddy-Platform/
├── apps/
│   └── client/              # Expo iOS / Android / Web app
├── services/
│   └── api/                 # Cloudflare Worker API
├── packages/
│   ├── domain/              # shared TypeScript models
│   └── mock-data/           # synthetic demo-only fixtures
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PRIVACY_BOUNDARY.md
│   ├── HUB_INTEGRATION_CONTRACT.md
│   ├── PRODUCT_PHASES.md
│   └── FREE_VS_ULTRA.md
├── scripts/
│   └── guard-private-data.mjs
└── .github/workflows/
    └── privacy-guard.yml
```

## First run

From the repo root:

```bash
npm install
npm run app
```

For web:

```bash
npm run web
```

For the API:

```bash
npm run api
```

> The starter client uses local synthetic fixtures by default, so you can see the product even before the Worker is deployed.

## Current starter screens

The initial app prototype includes:

- caretaker picker: Daddy / Mama / Buddy
- garden dashboard
- happy / needs attention / critical summary
- plant cards with moisture + soil temperature
- attention view
- plant detail view
- Today / History / Care / Devices / Automation sections
- Free / Ultra value boundary
- obvious **DEMO DATA** environment badge

## Future Hub rule

When Hub integration is eventually enabled, the cloud app will never “crawl the Mac.” The Hub will deliberately publish only approved, normalized Plant Daddy events through a documented API.

**Hub → explicit connector → cloud API**

not

**cloud → reaches into Mac**

## Version

Starter foundation: **v0.1.0 — Clean Room**
