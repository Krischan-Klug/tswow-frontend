import Link from "next/link";
import styled from "styled-components";
import useRealmInfo from "../lib/useRealmInfo";

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
  border: 1px solid var(--foreground);
  border-radius: 10px;
  margin: 10px;
`;

const StyledText = styled.p`
  text-align: center;
  padding-left: 50px;
  padding-right: 50px;
`;

export default function Download() {
  const { realm, loading, error } = useRealmInfo(1);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <StyledContentWrapper>
      <h1>Download</h1>
      <StyledLink href="https://google.com">Click here</StyledLink>

      <StyledRealmlist>
        <h3>Realmlist:</h3>
        <StyledText>{"set realmlist " + realm.address}</StyledText>
      </StyledRealmlist>
    </StyledContentWrapper>
  );
}
