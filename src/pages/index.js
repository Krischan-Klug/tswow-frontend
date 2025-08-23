import Link from "next/link";
import styled from "styled-components";

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
  return (
    <StyledContentWrapper>
      <StyledLink href="/download">How to play</StyledLink>
      <StyledLink href="/realms">Realms</StyledLink>
      <StyledLinkWrapper>
        <StyledLink href="/register">Register</StyledLink>

        <StyledLink href="/login">Login</StyledLink>
        <StyledLink href="/profile">Profile</StyledLink>
      </StyledLinkWrapper>
    </StyledContentWrapper>
  );
}
