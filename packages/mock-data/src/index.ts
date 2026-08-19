import type { Device, Plant, Site, Zone } from '@plant-daddy/domain';

// SYNTHETIC DEMO DATA ONLY.
// Names loosely demonstrate product use cases but values, IDs, hardware identities,
// timestamps and readings are fabricated and are not copied from any real installation.

export const demoSites: Site[] = [
  { id: 'site_demo_home', name: 'Demo Home' }
];

export const demoZones: Zone[] = [
  { id: 'zone_demo_tropicals', siteId: 'site_demo_home', name: 'Tropical Patio' },
  { id: 'zone_demo_indoor', siteId: 'site_demo_home', name: 'Living Room' }
];

export const demoPlants: Plant[] = [
  {
    id: 'plant_demo_coconut',
    siteId: 'site_demo_home',
    zoneId: 'zone_demo_tropicals',
    name: 'Coconut Palm',
    species: 'Cocos nucifera',
    emoji: '🌴',
    status: 'happy',
    moisturePct: 46,
    soilTempF: 81,
    preferredMoistureMin: 35,
    preferredMoistureMax: 60,
    lastReadingAt: '2026-08-18T20:59:00-07:00',
    lastWateredAt: '2026-08-17T21:15:00-07:00',
    daddySays: 'Everything looks good. Moisture is dropping at its normal demo rate.',
    automationMode: 'observe'
  },
  {
    id: 'plant_demo_plumeria',
    siteId: 'site_demo_home',
    zoneId: 'zone_demo_tropicals',
    name: 'Plumeria Bed West',
    species: 'Plumeria rubra',
    emoji: '🌺',
    status: 'attention',
    moisturePct: 24,
    soilTempF: 94,
    preferredMoistureMin: 28,
    preferredMoistureMax: 52,
    lastReadingAt: '2026-08-18T20:58:00-07:00',
    lastWateredAt: '2026-08-16T20:40:00-07:00',
    daddySays: 'Demo pattern: soil is running hot and moisture is approaching the preferred watering point.',
    automationMode: 'recommend'
  },
  {
    id: 'plant_demo_hibiscus',
    siteId: 'site_demo_home',
    zoneId: 'zone_demo_tropicals',
    name: 'Hibiscus Red',
    species: 'Hibiscus rosa-sinensis',
    emoji: '🌺',
    status: 'happy',
    moisturePct: 55,
    soilTempF: 84,
    preferredMoistureMin: 40,
    preferredMoistureMax: 65,
    lastReadingAt: '2026-08-18T20:57:00-07:00',
    lastWateredAt: '2026-08-18T07:30:00-07:00',
    daddySays: 'Happy and comfortably moist.',
    automationMode: 'observe'
  },
  {
    id: 'plant_demo_monstera',
    siteId: 'site_demo_home',
    zoneId: 'zone_demo_indoor',
    name: 'Mona',
    species: 'Monstera deliciosa',
    emoji: '🪴',
    status: 'happy',
    moisturePct: 41,
    soilTempF: 76,
    preferredMoistureMin: 32,
    preferredMoistureMax: 55,
    lastReadingAt: '2026-08-18T20:55:00-07:00',
    lastWateredAt: '2026-08-15T09:00:00-07:00',
    daddySays: 'No drama here. Mona is chilling.',
    automationMode: 'observe'
  }
];

export const demoDevices: Device[] = [
  {
    id: 'device_demo_001',
    kind: 'soil_sensor',
    displayName: 'Coconut Sensor',
    integration: 'Synthetic Demo',
    assignedPlantId: 'plant_demo_coconut',
    online: true,
    batteryPct: 91,
    signal: 'good',
    hardwareId: 'demo-hardware-001'
  },
  {
    id: 'device_demo_002',
    kind: 'soil_sensor',
    displayName: 'Plumeria Sensor',
    integration: 'Synthetic Demo',
    assignedPlantId: 'plant_demo_plumeria',
    online: true,
    batteryPct: 74,
    signal: 'excellent',
    hardwareId: 'demo-hardware-002'
  }
];
