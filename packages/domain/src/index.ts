export type Caretaker = 'daddy' | 'mama' | 'buddy';
export type PlantStatus = 'happy' | 'attention' | 'critical';
export type DataMode = 'demo' | 'cloud' | 'hub';
export type AutomationMode = 'observe' | 'recommend' | 'approve' | 'auto';

export interface Site {
  id: string;
  name: string;
}

export interface Zone {
  id: string;
  siteId: string;
  name: string;
}

export interface Plant {
  id: string;
  siteId: string;
  zoneId: string;
  name: string;
  species: string;
  variety?: string;
  emoji: string;
  status: PlantStatus;
  moisturePct?: number;
  soilTempF?: number;
  preferredMoistureMin?: number;
  preferredMoistureMax?: number;
  lastReadingAt?: string;
  lastWateredAt?: string;
  daddySays: string;
  automationMode: AutomationMode;
}

export interface Device {
  id: string;
  kind: 'soil_sensor' | 'irrigation' | 'weather' | 'grow_light' | 'smart_plug' | 'other';
  displayName: string;
  integration: string;
  assignedPlantId?: string;
  online: boolean;
  batteryPct?: number;
  signal?: 'poor' | 'fair' | 'good' | 'excellent';
  // Hardware identity stays separate from the plant.
  hardwareId?: string;
}

export interface Reading {
  id: string;
  plantId: string;
  recordedAt: string;
  moisturePct?: number;
  soilTempF?: number;
  source: 'manual' | 'sensor' | 'synthetic';
}

export interface CareEvent {
  id: string;
  plantId: string;
  occurredAt: string;
  type: 'water' | 'fertilize' | 'repot' | 'prune' | 'pest' | 'move' | 'lighting' | 'propagate' | 'bloom' | 'harvest' | 'note' | 'photo';
  note?: string;
}
