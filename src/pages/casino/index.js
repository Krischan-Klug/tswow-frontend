import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import ContentWrapper from "@/components/ui/ContentWrapper";
import GameList from "@/components/ui/GameList";

export default function Casino() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading…</p>;
  if (!user) return <p>Please log in first.</p>;

  return (
    <ContentWrapper>
      <h1>Games</h1>
      <GameList>
        <Link href={"/casino/coinflip"}>Coinflip</Link>
        <Link href={"/casino/twopick"}>Two Pick</Link>
      </GameList>
    </ContentWrapper>
  );
}
