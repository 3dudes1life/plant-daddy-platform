# Architecture

## Clean-room split

```text
                        ┌─────────────────────────┐
                        │   Plant Daddy Client    │
                        │ iOS / Android / Web     │
                        └────────────┬────────────┘
                                     │ HTTPS
                                     ▼
                        ┌─────────────────────────┐
                        │ Plant Daddy Cloud API   │
                        │  Cloudflare Worker      │
                        └────────────┬────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
                 Cloud DB       Notifications     Ultra AI
                 (future)         (future)        (future)

---------------------- PRIVACY / TRUST BOUNDARY ----------------------

     NOTHING ABOVE CAN READ THE MAC PROTOTYPE BY DEFAULT

                                     ▲
                                     │ future explicit connector
                                     │ normalized events only
                        ┌────────────┴────────────┐
                        │ Plant Daddy Hub #0001  │
                        │ private local system    │
                        └────────────┬────────────┘
                                     │
                            Zigbee / MQTT / etc.
```

## Core domain rule

A plant is permanent. Hardware is replaceable.

```text
Plant
├── identity
├── care profile
├── history
├── photos
├── learning
├── automation policy
└── device assignments[]
       ├── Sensor A (retired)
       └── Sensor B (current)
```

## Client

The Expo client is intentionally universal for the first product phase:

- iOS
- Android
- web preview/admin-friendly testing

This lets the product experience evolve before duplicating logic across separate native codebases.

## Cloud API

The Worker is the only public backend boundary.

Responsibilities eventually include:

- authentication/session validation
- account/site/zone/plant CRUD
- normalized sensor ingestion from approved integrations
- plant-care library delivery
- subscription entitlements
- notification orchestration
- Ultra summary generation requests
- Hub pairing/registration
- audit trail

## Intelligence layers

1. **Static care knowledge** — structured Plant Care Library
2. **Deterministic intelligence** — thresholds, dry rate, trend, anomaly, sensor freshness
3. **Ultra AI** — explanation/reasoning over structured summaries

Do not send every raw reading to an LLM.
