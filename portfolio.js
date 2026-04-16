const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const firm = (req.query.firm || '').trim();
  if (firm.length < 2) return res.status(400).json({ error: 'Firmenname ungültig' });

  const key = `portfolio:${firm.toLowerCase()}`;

  try {
    if (req.method === 'GET') {
      const raw = await redis.get(key);
      const data = Array.isArray(raw) ? raw : (typeof raw === 'string' ? JSON.parse(raw) : []);
      return res.status(200).json({ portfolio: data });
    }
    if (req.method === 'POST') {
      const { portfolio } = req.body;
      if (!Array.isArray(portfolio)) return res.status(400).json({ error: 'Ungültige Daten' });
      await redis.set(key, JSON.stringify(portfolio));
      return res.status(200).json({ ok: true });
    }
    if (req.method === 'DELETE') {
      await redis.del(key);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Methode nicht erlaubt' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};
