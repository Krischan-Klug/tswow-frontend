// Clears the httpOnly cookie
export default async function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    `auth=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  );
  res.status(204).end();
}
