export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const base = process.env.BACKEND_URL || "http://127.0.0.1:3001";
  const upstream = `${base}/realm`;

  try {
    const r = await fetch(upstream, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const data = await r.json().catch(() => ({}));
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(502).json({ error: "Upstream nicht erreichbar" });
  }
}
