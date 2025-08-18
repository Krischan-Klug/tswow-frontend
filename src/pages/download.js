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

const StyledRealmlist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 50vh;
  border: 1px solid var(--foreground);
  border-radius: 10px;
  padding: 10px;
`;

const StyledText = styled.p`
  text-align: center;
  padding-left: 50px;
  padding-right: 50px;
`;

export default function Download() {
  return (
    <StyledContentWrapper>
      <h1>Download</h1>
      <StyledLink href="https://gofile.io/d/Cjz7aN">Click here</StyledLink>

      <StyledRealmlist>
        <h3>Realmlist:</h3>
        <StyledText>set realmlist 168.119.211.174</StyledText>
      </StyledRealmlist>
    </StyledContentWrapper>
  );
}
