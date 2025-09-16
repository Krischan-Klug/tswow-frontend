import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) setMsg({ ok: true, text: `Welcome ${data.account?.username}` });
    else setMsg({ ok: false, text: data.error || "Login failed" });
  };

  const me = async () => {
    const res = await fetch("/api/me");
    const data = await res.json();
    if (res.ok) {
      setMsg({ ok: true, text: JSON.stringify(data.account, null, 2) });
    } else {
      setMsg({ ok: false, text: data.error || "not logged in" });
    }
  };

  const logout = async () => {
    await fetch("/api/logout");
    setMsg({ ok: true, text: "Logged out" });
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1>Login</h1>
      <Card>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit">Login</Button>
        </form>
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <Button type="button" onClick={me}>Who am I?</Button>
          <Button type="button" onClick={logout}>Logout</Button>
        </div>
        {msg && (
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
            <span style={{ color: msg.ok ? "var(--success)" : "var(--danger)" }}>{msg.text}</span>
          </pre>
        )}
      </Card>
    </div>
  );
}
