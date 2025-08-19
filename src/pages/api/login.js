// Calls backend /auth/login, then sets httpOnly cookie with JWT
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const upstream = process.env.BACKEND_URL_LOGIN || "127.0.0.1:3001/auth/login";

  try {
    const r = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(r.status).json(data);

    // Set httpOnly cookie on your site domain
    const maxAge = 60 * 60 * 24; // 1 day
    res.setHeader("Set-Cookie", [
      `auth=${data.token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`,
    ]);

    // You can return lightweight info to the client
    return res.status(200).json({ account: data.account });
  } catch {
    return res.status(502).json({ error: "Upstream not reachable" });
  }
}
