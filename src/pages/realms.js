// Realms.js
import React from "react";
import useRealmInfo from "../lib/useRealmInfo";

export default function Realms() {
  const { realms, loading, error } = useRealmInfo("1");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(realms, null, 2)}</pre>
    </div>
  );
}
