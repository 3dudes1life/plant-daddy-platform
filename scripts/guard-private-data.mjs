import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function walk(dir, base = root, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '.expo', '.wrangler', 'dist', 'coverage'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else out.push(path.relative(base, full).replaceAll('\\\\', '/'));
  }
  return out;
}

let files;
try {
  files = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    .split('\n').filter(Boolean);
} catch {
  // ZIP/local folder before `git init`: scan the repository tree directly.
  files = walk(root);
}

const blockedExtensions = /\.(db|sqlite|sqlite3|wal|shm|pem|p12|mobileprovision)$/i;
const blockedPath = /(^|\/)(zigbee2mqtt|mosquitto|home-assistant|hub-0001|local-hub-data|backups)(\/|$)/i;
const blockedContent = [
  /mqtt:\/\//i,
  /network_key\s*:/i,
  /pan_id\s*:/i,
  /secret_key\s*=/i,
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\/Users\/[A-Za-z0-9._-]+\//,
  /0x[0-9a-f]{16}/i
];

const allowContentIn = new Set([
  'docs/PRIVACY_BOUNDARY.md',
  'README.md',
  'scripts/guard-private-data.mjs'
]);

const failures = [];
for (const rel of files) {
  if (blockedExtensions.test(rel) || blockedPath.test(rel)) {
    failures.push(`${rel}: blocked private/local artifact type`);
    continue;
  }
  const full = path.join(root, rel);
  if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) continue;
  if (allowContentIn.has(rel)) continue;
  const stat = fs.statSync(full);
  if (stat.size > 1_000_000) continue;
  const text = fs.readFileSync(full, 'utf8');
  for (const pattern of blockedContent) {
    if (pattern.test(text)) failures.push(`${rel}: matches blocked private-data pattern ${pattern}`);
  }
}

if (failures.length) {
  console.error('\n❌ Plant Daddy privacy guard failed:\n');
  for (const failure of failures) console.error(` - ${failure}`);
  console.error('\nUse synthetic demo data only. Do not commit Hub #0001/private Mac data.\n');
  process.exit(1);
}

console.log('✅ Plant Daddy privacy guard passed — no blocked local/private artifacts detected.');
