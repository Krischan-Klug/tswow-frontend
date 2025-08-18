import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("http://168.119.211.174:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setUsername("");
        setPassword("");
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Fehler" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server nicht erreichbar" });
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Account register</h1>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      {message && (
        <p
          style={{
            color: message.type === "success" ? "green" : "red",
            marginTop: "15px",
          }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
