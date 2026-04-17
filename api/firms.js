const { Redis } = require('@upstash/redis');
const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const FIRMS_KEY = 'firms:registry';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const raw = await redis.get(FIRMS_KEY);
      const firms = Array.isArray(raw) ? raw
        : typeof raw === 'string' ? JSON.parse(raw) : [];
      return res.status(200).json({ count: firms.length });
    }

    if (req.method === 'POST') {
      // Parse body — handle both pre-parsed and raw string
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
      }
      body = body || {};

      const name = (body.firm || '').trim();
      const sector = (body.sector || '').trim();

      if (name.length < 2) {
        return res.status(400).json({ error: 'Firmenname ungültig' });
      }

      const raw = await redis.get(FIRMS_KEY);
      let firms = Array.isArray(raw) ? raw
        : typeof raw === 'string' ? JSON.parse(raw) : [];

      const idx = firms.findIndex(f =>
        (typeof f === 'string' ? f : f.name).toLowerCase() === name.toLowerCase()
      );

      if (idx >= 0) {
        // Upgrade old string entries to objects and update sector
        if (typeof firms[idx] === 'string') {
          firms[idx] = { name: firms[idx], sector };
        } else if (sector) {
          firms[idx].sector = sector;
        }
      } else {
        firms.unshift({ name, sector });
      }

      await redis.set(FIRMS_KEY, JSON.stringify(firms.slice(0, 200)));
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Methode nicht erlaubt' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};
