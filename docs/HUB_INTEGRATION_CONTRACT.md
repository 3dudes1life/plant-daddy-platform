# Future Hub Integration Contract

Status: **DESIGN ONLY — DISABLED IN v0.1.0**

## Principle

Plant Daddy Cloud never reaches into Hub #0001.

The local Hub may later publish approved normalized events to the cloud after explicit pairing.

## Proposed flow

### 1. Pair

Local Hub creates a one-time code:

```json
{
  "code": "PD-ABCD-1234",
  "expiresInSeconds": 600
}
```

User enters it in the Plant Daddy app.

### 2. Cloud issues a Hub credential

Credential is scoped to one account/site and is revocable.

### 3. Hub publishes normalized events

Example synthetic contract:

```json
{
  "eventId": "evt_demo_123",
  "eventType": "plant.reading",
  "occurredAt": "2026-08-18T20:59:00-07:00",
  "plantExternalId": "local-plant-demo",
  "deviceExternalId": "local-device-demo",
  "metrics": {
    "moisturePct": 46,
    "soilTempF": 81
  }
}
```

## Never accepted

The connector must reject payloads containing:

- arbitrary filesystem paths
- database blobs
- MQTT config files
- shell history
- network scans
- non-Plant-Daddy device inventories
- unrelated documents/photos

## Idempotency

`eventId` is unique so reconnects can safely retry without duplicating readings/actions.

## Automation ownership

Safety-critical local watering rules stay on the Hub. Cloud can send a signed intent such as:

```json
{
  "intentType": "irrigation.proposal",
  "plantId": "plant_123",
  "requestedRuntimeSeconds": 480,
  "reason": "predicted watering point reached"
}
```

The Hub still evaluates local safety policy before acting.
