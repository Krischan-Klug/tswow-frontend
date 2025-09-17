import { useAuth } from "../lib/useAuth";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { Pre } from "@/components/ui/Text";

export default function CharacterDisplay() {
  const { user, loading } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const r = await fetch("/api/character", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ realmId: 1 }),
        });

        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Failed to load characters");
        setCharacters(data.characters || []);
      } catch (e) {
        setError(e);
      }
    })();
  }, [user]);

  if (loading) return <p>Loading…</p>;
  if (!user) return <p>Please log in first.</p>;
  if (error) return <p>Error loading characters.</p>;

  return (
    <Container $max={480}>
      <h1>Your Characters</h1>
      <Card>
        <Pre>{JSON.stringify(characters, null, 2)}</Pre>
      </Card>
    </Container>
  );
}
