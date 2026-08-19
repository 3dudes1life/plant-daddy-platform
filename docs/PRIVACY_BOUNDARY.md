# Privacy Boundary — Hub #0001 vs. Plant Daddy Platform

## The rule

**The new GitHub platform does not read the existing Mac installation.**

The Mac prototype is treated as an independent private system called **Plant Daddy Hub #0001**.

## Forbidden in this repository

Never commit, copy, mount, upload, or import:

- the Mac's Plant Daddy SQLite database or backups
- MQTT usernames/passwords/tokens
- Zigbee2MQTT config, coordinator data, device database, network key, PAN IDs
- real IEEE / MAC / serial identifiers
- Home Assistant config or tokens
- screenshots/export files containing private household device data unless deliberately redacted
- `.env` files or API secrets
- filesystem paths that point to the private prototype
- raw historical readings from real plants

## Safe development sources

Allowed:

1. hand-created synthetic fixture data
2. public Plant Care Library data with provenance/license review
3. cloud test accounts created specifically for Plant Daddy development
4. fake hardware identities
5. future Hub test simulator events

## Future integration

Hub integration must be explicit and outbound-first.

```text
LOCAL DEVICES
   ↓
PLANT DADDY HUB #0001
   ↓  (explicit opt-in connector)
NORMALIZED EVENT API
   ↓
PLANT DADDY CLOUD
   ↓
APP / WEB
```

The cloud must not scan local network ranges, inspect Mac directories, or attach directly to the Hub SQLite file.

## Consent boundary

A Hub can only be linked after the account owner:

1. enables Hub linking locally
2. receives a one-time pairing code
3. confirms the target Plant Daddy account/site
4. approves what categories may sync
5. can revoke access at any time

## Default sync philosophy

Sync what the product needs, not everything the Hub knows.

Examples of reasonable normalized events:

- plant reading
- device online/offline
- battery state
- watering action proposed
- watering action executed
- irrigation failure
- care event

Do not sync unrelated machine telemetry, filenames, other apps, browser data, or household network inventory.

## Fail-safe watering

Local watering logic remains local whenever practical. Cloud/AI may advise, but loss of internet must not create unsafe watering behavior.
