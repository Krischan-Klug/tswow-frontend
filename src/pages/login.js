// pages/login.js
import { useState } from "react";

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
      console.log(data); //REMOVE !!!!
    } else {
      setMsg({ ok: false, text: data.error || "not logged in" });
    }
  };

  const logout = async () => {
    await fetch("/api/logout");
    setMsg({ ok: true, text: "Logged out" });
  };

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Login</h1>
      <form
        onSubmit={submit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={me}>Who am I?</button>
        <button onClick={logout}>Logout</button>
      </div>
      {msg && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#f4f4f4",
            padding: 12,
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          <span style={{ color: msg.ok ? "green" : "red" }}>{msg.text}</span>
        </pre>
      )}
    </div>
  );
}
