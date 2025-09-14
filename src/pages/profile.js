import { useAuth } from "../lib/useAuth";
import CharacterDisplay from "@/components/CharacterDisplay";

export default function Profile() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading…</p>;
  if (!user) return <p>Please log in first.</p>;
  return (
    <>
      <div style={{ maxWidth: 480, margin: "40px auto" }}>
        <h1>Profile</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <CharacterDisplay />
    </>
  );
}
