import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import ContentWrapper from "@/components/ui/ContentWrapper";
import Row from "@/components/ui/Row";
import NavLink from "@/components/ui/NavLink";
import Button from "@/components/ui/Button";

export default function Home() {
  const { user } = useAuth();

  const logout = async () => {
    await fetch("/api/logout");
    window.location.href = "/";
  };
  return (
    <ContentWrapper>
      <NavLink href="/download">How to play</NavLink>
      <NavLink href="/realms">Realms</NavLink>
      <Row style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "var(--space-2) var(--space-3)" }}>
        {!user && <NavLink href="/register">Register</NavLink>}
        {!user && <NavLink href="/login">Login</NavLink>}
        {user && <NavLink href="/profile">Profile</NavLink>}
        {user && <NavLink href="/casino">Casino</NavLink>}
        {user && <Button onClick={logout}>Logout</Button>}
      </Row>
    </ContentWrapper>
  );
}
