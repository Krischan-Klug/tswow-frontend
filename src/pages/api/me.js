// Reads cookie, calls backend /auth/me with Bearer token, returns account
export default async function handler(req, res) {
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)auth=([^;]+)/);
  const token = m ? decodeURIComponent(m[1]) : null;
  if (!token) return res.status(401).json({ error: "not logged in" });

  const base = process.env.BACKEND_URL || "http://127.0.0.1:3001";
  const upstream = `${base}/auth/me`;

  try {
    const r = await fetch(upstream, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await r.json().catch(() => ({}));
    return res.status(r.status).json(data);
  } catch {
    return res.status(502).json({ error: "Upstream not reachable" });
  }
}
