// Realms.js
import React from "react";
import useRealmInfo from "../lib/useRealmInfo";

export default function Realms() {
  const { realm, loading, error } = useRealmInfo(1);
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
