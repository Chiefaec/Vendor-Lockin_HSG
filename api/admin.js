const { Redis } = require('@upstash/redis');
const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const ADMIN_PW = process.env.ADMIN_PASSWORD || 'VLI-HSG-2025';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_PW) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Methode nicht erlaubt' });
  }

  try {
    const raw = await redis.get('firms:registry');
    let firms = Array.isArray(raw) ? raw
      : typeof raw === 'string' ? JSON.parse(raw) : [];

    // Normalise: old entries may be plain strings
    firms = firms.map(f =>
      typeof f === 'string' ? { name: f, sector: 'Nicht angegeben' } : f
    );

    // Load portfolios in parallel (max 20 at a time to stay within limits)
    const results = [];
    const BATCH = 20;
    for (let i = 0; i < firms.length; i += BATCH) {
      const batch = firms.slice(i, i + BATCH);
      const loaded = await Promise.all(batch.map(async f => {
        try {
          const key = `portfolio:${f.name.trim().toLowerCase()}`;
          const pRaw = await redis.get(key);
          const portfolio = Array.isArray(pRaw) ? pRaw
            : typeof pRaw === 'string' ? JSON.parse(pRaw) : [];
          return { firm: f.name, sector: f.sector || 'Nicht angegeben', portfolio };
        } catch {
          return { firm: f.name, sector: f.sector || 'Nicht angegeben', portfolio: [] };
        }
      }));
      results.push(...loaded);
    }

    return res.status(200).json({ firms: results });
  } catch (e) {
    console.error('admin error:', e);
    return res.status(500).json({ error: e.message });
  }
};
