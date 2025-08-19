// Clears the httpOnly cookie
export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    "auth=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0"
  );
  res.status(204).end();
}
