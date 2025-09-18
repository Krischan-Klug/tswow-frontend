export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)auth=([^;]+)/);
  const token = m ? decodeURIComponent(m[1]) : null;
  if (!token) return res.status(401).json({ error: "not logged in" });

  const base = process.env.BACKEND_URL || "http://127.0.0.1:3001";
  const upstream = `${base}/character`;

  try {
    const r = await fetch(upstream, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body || {}),
    });
    const data = await r.json().catch(() => ({}));
    return res.status(r.status).json(data);
  } catch {
    return res.status(502).json({ error: "Upstream not reachable" });
  }
}
