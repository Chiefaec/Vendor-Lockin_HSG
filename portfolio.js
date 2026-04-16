import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { firm } = req.query;
  if (!firm || firm.trim().length < 2) {
    return res.status(400).json({ error: 'Firmenname ungültig' });
  }

  const key = `portfolio:${firm.trim().toLowerCase()}`;

  if (req.method === 'GET') {
    const raw = await redis.get(key);
    const data = typeof raw === 'string' ? JSON.parse(raw) : (raw || []);
    return res.status(200).json({ portfolio: data });
  }

  if (req.method === 'POST') {
    const { portfolio } = req.body;
    if (!Array.isArray(portfolio)) {
      return res.status(400).json({ error: 'Ungültige Daten' });
    }
    await redis.set(key, JSON.stringify(portfolio));
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    await redis.del(key);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Methode nicht erlaubt' });
}
