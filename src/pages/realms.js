import RealmDisplay from "@/components/RealmDisplay";
import React from "react";

export default function Realms() {
  return (
    <div>
      <RealmDisplay realmId={1} />
      <RealmDisplay realmId={2} />
    </div>
  );
}
