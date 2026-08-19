const demoPlants = [
  { id: 'plant_demo_coconut', name: 'Coconut Palm', status: 'happy', moisturePct: 46, soilTempF: 81 },
  { id: 'plant_demo_plumeria', name: 'Plumeria Bed West', status: 'attention', moisturePct: 24, soilTempF: 94 }
];

export interface Env {
  DATA_MODE: string;
  HUB_CONNECTOR_ENABLED: string;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'no-store'
    }
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type,authorization' } });
    }

    if (url.pathname === '/health') {
      return json({ ok: true, service: 'plant-daddy-api', dataMode: env.DATA_MODE ?? 'demo', hubConnectorEnabled: env.HUB_CONNECTOR_ENABLED === 'true' });
    }

    if (url.pathname === '/v1/demo/plants' && request.method === 'GET') {
      return json({ dataMode: 'demo', plants: demoPlants });
    }

    if (url.pathname.startsWith('/v1/hubs')) {
      if (env.HUB_CONNECTOR_ENABLED !== 'true') {
        return json({ error: 'hub_connector_disabled', message: 'Hub integration is intentionally disabled in the clean-room starter.' }, 501);
      }
      return json({ error: 'not_implemented' }, 501);
    }

    return json({ error: 'not_found' }, 404);
  }
};
