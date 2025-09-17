import { useAuth } from "../lib/useAuth";
import CharacterDisplay from "@/components/CharacterDisplay";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { Pre } from "@/components/ui/Text";

export default function Profile() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading…</p>;
  if (!user) return <p>Please log in first.</p>;
  return (
    <>
      <Container $max={480}>
        <h1>Profile</h1>
        <Card>
          <Pre>{JSON.stringify(user, null, 2)}</Pre>
        </Card>
      </Container>
      <CharacterDisplay />
    </>
  );
}
