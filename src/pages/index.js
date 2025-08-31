import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "@/lib/useAuth";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--foreground);
  font-size: 2rem;
  margin: 10px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--foreground);
  border-radius: 10px;
  padding: 10px;
`;

export default function Home() {
  const { user } = useAuth();

  const logout = async () => {
    await fetch("/api/logout");
    window.location.href = "/";
  };
  return (
    <StyledContentWrapper>
      <StyledLink href="/download">How to play</StyledLink>
      <StyledLink href="/realms">Realms</StyledLink>
      <StyledLinkWrapper>
        {!user && <StyledLink href="/register">Register</StyledLink>}
        {!user && <StyledLink href="/login">Login</StyledLink>}
        {user && <StyledLink href="/profile">Profile</StyledLink>}
        {user && <button onClick={logout}>Logout</button>}
      </StyledLinkWrapper>
    </StyledContentWrapper>
  );
}
