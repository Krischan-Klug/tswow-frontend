import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "@/lib/useAuth";

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

const StyledGameList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid var(--foreground);
  border-radius: 10px;
  margin: 10px;
`;

export default function Casino() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading…</p>;
  if (!user) return <p>Please log in first.</p>;

  return (
    <>
      <StyledContentWrapper>
        <h1>Games</h1>
        <StyledGameList>
          <Link href={"/casino/coinflip"}>Coinflip</Link>
          <Link href={"/casino/twopick"}>Two Pick</Link>
        </StyledGameList>
      </StyledContentWrapper>
    </>
  );
}
