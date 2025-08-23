import { useState } from "react";

export default function Realms() {
  const [realms, setRealms] = useState([]);
  const handleRealmInfo = async (realmId) => {
    const r = await fetch("/api/realm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: realmId }),
    });
    setRealms(await r.json());
  };

  return (
    <div>
      <button onClick={() => handleRealmInfo("1")}>Log</button>
      <pre>{JSON.stringify(realms, null, 2)}</pre>
    </div>
  );
}
