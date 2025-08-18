import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--foreground);
  font-size: 2rem;
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
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50vh;
`;

export default function Home() {
  return (
    <StyledContentWrapper>
      <h1>KKs Azeroth</h1>
      <StyledLinkWrapper>
        <StyledLink href="/register">Register</StyledLink>
        <StyledLink href="/download">How to play</StyledLink>
      </StyledLinkWrapper>
    </StyledContentWrapper>
  );
}
