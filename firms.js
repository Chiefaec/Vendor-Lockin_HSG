const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = 'firms:registry';

  try {
    if (req.method === 'GET') {
      const raw = await redis.get(key);
      const firms = Array.isArray(raw) ? raw : (typeof raw === 'string' ? JSON.parse(raw) : []);
      return res.status(200).json({ firms });
    }
    if (req.method === 'POST') {
      const name = (req.body?.firm || '').trim();
      if (name.length < 2) return res.status(400).json({ error: 'Ungültig' });
      const raw = await redis.get(key);
      let firms = Array.isArray(raw) ? raw : (typeof raw === 'string' ? JSON.parse(raw) : []);
      firms = firms.filter(f => f.toLowerCase() !== name.toLowerCase());
      firms.unshift(name);
      await redis.set(key, JSON.stringify(firms.slice(0, 20)));
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Methode nicht erlaubt' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};
