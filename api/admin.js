const { Redis } = require('@upstash/redis');
const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });

const ADMIN_PW = process.env.ADMIN_PASSWORD || 'VLI-HSG-2025';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Simple token auth via header
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_PW) {
    return res.status(401).json({ error: 'Nicht autorisiert' });
  }

  if (req.method === 'GET') {
    try {
      const raw = await redis.get('firms:registry');
      const firms = Array.isArray(raw) ? raw : (typeof raw === 'string' ? JSON.parse(raw) : []);

      // Load portfolio for each firm
      const results = await Promise.all(firms.map(async f => {
        const key = `portfolio:${f.name.trim().toLowerCase()}`;
        const pRaw = await redis.get(key);
        const portfolio = Array.isArray(pRaw) ? pRaw : (typeof pRaw === 'string' ? JSON.parse(pRaw) : []);
        return { firm: f.name, sector: f.sector || 'Nicht angegeben', portfolio };
      }));

      return res.status(200).json({ firms: results });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Methode nicht erlaubt' });
};
