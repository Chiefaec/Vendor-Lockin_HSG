import { kv } from '@vercel/kv';

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
    const data = await kv.get(key);
    return res.status(200).json({ portfolio: data || [] });
  }

  if (req.method === 'POST') {
    const { portfolio } = req.body;
    if (!Array.isArray(portfolio)) {
      return res.status(400).json({ error: 'Ungültige Daten' });
    }
    await kv.set(key, portfolio);
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    await kv.del(key);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Methode nicht erlaubt' });
}
