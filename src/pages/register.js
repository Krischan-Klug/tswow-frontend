import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Alert from "@/components/ui/Alert";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: data.message || "Account erstellt",
        });
        setUsername("");
        setPassword("");
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Fehler" });
      }
    } catch {
      setMessage({ type: "error", text: "Server nicht erreichbar" });
    }
  };

  return (
    <Container $max={420}>
      <h1>Account register</h1>
      <Card>
        <Column as="form" onSubmit={handleRegister} $gap="var(--space-3)">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Register</Button>
        </Column>

        {message && (
          <Alert $variant={message.type === "success" ? "success" : "error"}>
            {message.text}
          </Alert>
        )}
      </Card>
    </Container>
  );
}
