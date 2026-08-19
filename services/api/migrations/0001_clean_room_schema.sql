-- Plant Daddy cloud schema — CLEAN ROOM ONLY.
-- This is not imported from, derived from, or attached to Hub #0001's SQLite database.

PRAGMA foreign_keys = ON;

CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  display_name TEXT,
  caretaker TEXT NOT NULL DEFAULT 'daddy' CHECK (caretaker IN ('daddy','mama','buddy')),
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free','ultra'))
);

CREATE TABLE sites (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE zones (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE plants (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  zone_id TEXT REFERENCES zones(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  species_key TEXT,
  variety TEXT,
  created_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE devices (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  integration_key TEXT NOT NULL,
  kind TEXT NOT NULL,
  hardware_identity TEXT,
  display_name TEXT NOT NULL,
  created_at TEXT NOT NULL,
  retired_at TEXT
);

CREATE TABLE device_assignments (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  plant_id TEXT NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  assigned_at TEXT NOT NULL,
  unassigned_at TEXT
);

CREATE TABLE readings (
  id TEXT PRIMARY KEY,
  plant_id TEXT NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES devices(id) ON DELETE SET NULL,
  recorded_at TEXT NOT NULL,
  moisture_pct REAL,
  soil_temp_f REAL,
  source TEXT NOT NULL
);

CREATE TABLE care_events (
  id TEXT PRIMARY KEY,
  plant_id TEXT NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  occurred_at TEXT NOT NULL,
  event_type TEXT NOT NULL,
  note TEXT
);

CREATE TABLE automation_policies (
  id TEXT PRIMARY KEY,
  plant_id TEXT NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  mode TEXT NOT NULL DEFAULT 'observe' CHECK (mode IN ('observe','recommend','approve','auto')),
  max_runtime_seconds INTEGER,
  max_daily_runtime_seconds INTEGER,
  min_seconds_between_runs INTEGER,
  enabled INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  occurred_at TEXT NOT NULL,
  actor_type TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  detail_json TEXT
);

CREATE INDEX idx_readings_plant_time ON readings(plant_id, recorded_at DESC);
CREATE INDEX idx_events_plant_time ON care_events(plant_id, occurred_at DESC);
CREATE INDEX idx_assignments_plant ON device_assignments(plant_id, assigned_at DESC);
