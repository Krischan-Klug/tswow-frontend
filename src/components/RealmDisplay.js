import useRealmInfo from "../lib/useRealmInfo";

export default function RealmDisplay({ realmId }) {
  const { realm, loading, error } = useRealmInfo(realmId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(realm, null, 2)}</pre>
    </div>
  );
}
