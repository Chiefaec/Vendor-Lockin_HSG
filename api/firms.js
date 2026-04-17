const { Redis } = require('@upstash/redis');
const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const FIRMS_KEY = 'firms:registry';

  try {
    if (req.method === 'GET') {
      // Returns only count — NOT firm names (privacy)
      const raw = await redis.get(FIRMS_KEY);
      const firms = Array.isArray(raw) ? raw : (typeof raw === 'string' ? JSON.parse(raw) : []);
      return res.status(200).json({ count: firms.length });
    }

    if (req.method === 'POST') {
      const { firm, sector } = req.body || {};
      const name = (firm || '').trim();
      if (name.length < 2) return res.status(400).json({ error: 'Firmennamen ungültig' });

      const raw = await redis.get(FIRMS_KEY);
      let firms = Array.isArray(raw) ? raw : (typeof raw === 'string' ? JSON.parse(raw) : []);

      const existing = firms.findIndex(f => f.name.toLowerCase() === name.toLowerCase());
      if (existing >= 0) {
        // Update sector if provided
        if (sector) firms[existing].sector = sector;
      } else {
        firms.unshift({ name, sector: sector || '' });
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
