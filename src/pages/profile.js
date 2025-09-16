import { useAuth } from "../lib/useAuth";
import CharacterDisplay from "@/components/CharacterDisplay";
import Card from "@/components/ui/Card";

export default function Profile() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading…</p>;
  if (!user) return <p>Please log in first.</p>;
  return (
    <>
      <div style={{ maxWidth: 480, margin: "40px auto" }}>
        <h1>Profile</h1>
        <Card>
          <pre style={{ margin: 0 }}>{JSON.stringify(user, null, 2)}</pre>
        </Card>
      </div>
      <CharacterDisplay />
    </>
  );
}
