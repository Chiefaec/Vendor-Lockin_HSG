import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = 'firms:registry';

  if (req.method === 'GET') {
    const firms = await kv.get(key);
    return res.status(200).json({ firms: firms || [] });
  }

  if (req.method === 'POST') {
    const { firm } = req.body;
    if (!firm || firm.trim().length < 2) {
      return res.status(400).json({ error: 'Ungültig' });
    }
    const name = firm.trim();
    let firms = await kv.get(key) || [];
    firms = firms.filter(f => f.toLowerCase() !== name.toLowerCase());
    firms.unshift(name);
    await kv.set(key, firms.slice(0, 20));
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Methode nicht erlaubt' });
}
