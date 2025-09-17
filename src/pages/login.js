import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Row from "@/components/ui/Row";
import Alert from "@/components/ui/Alert";
import { Pre } from "@/components/ui/Text";
import LogoutButton from "@/components/auth/LogoutButton";

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

  const onLoggedOut = () => setMsg({ ok: true, text: "Logged out" });

  return (
    <Container $max={420}>
      <h1>Login</h1>
      <Card>
        <Column as="form" onSubmit={submit} $gap="var(--space-3)">
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
        </Column>
        <Column $gap="var(--space-3)">
          <Row $gap="var(--space-2)">
            <Button type="button" onClick={me}>Who am I?</Button>
            <LogoutButton onLoggedOut={onLoggedOut} />
          </Row>
          {msg && (
            <Alert $variant={msg.ok ? "success" : "error"}>
              <Pre $wrap>{msg.text}</Pre>
            </Alert>
          )}
        </Column>
      </Card>
    </Container>
  );
}
