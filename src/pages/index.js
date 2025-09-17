import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import ContentWrapper from "@/components/ui/ContentWrapper";
import NavLink from "@/components/ui/NavLink";
import Toolbar from "@/components/ui/Toolbar";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Home() {
  const { user } = useAuth();
  return (
    <ContentWrapper>
      <NavLink href="/download">How to play</NavLink>
      <NavLink href="/realms">Realms</NavLink>
      <Toolbar>
        {!user && <NavLink href="/register">Register</NavLink>}
        {!user && <NavLink href="/login">Login</NavLink>}
        {user && <NavLink href="/profile">Profile</NavLink>}
        {user && <NavLink href="/casino">Casino</NavLink>}
        {user && <LogoutButton />}
      </Toolbar>
    </ContentWrapper>
  );
}
