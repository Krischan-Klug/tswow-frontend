import useRealmInfo from "../lib/useRealmInfo";
import Card from "@/components/ui/Card";
import Row from "@/components/ui/Row";
import Column from "@/components/ui/Column";
import { Muted } from "@/components/ui/Text";

export default function RealmDisplay({ realmId, realm: realmProp }) {
  const needsFetch = !realmProp && realmId != null;
  const { realm, loading, error } = useRealmInfo(realmId);
  const data = realmProp || realm || {};

  if (needsFetch && loading) return <div>Loading…</div>;
  if (needsFetch && error) return <div>Error: {String(error.message || error)}</div>;

  const { id, name, address, port, population } = data;

  return (
    <Card>
      <Row $align="center" $gap="var(--space-4)">
        <Column $gap="var(--space-1)">
          <div style={{ fontWeight: 600, fontSize: 18 }}>
            {name || `Realm #${id ?? "?"}`}
          </div>
          <Muted>
            {address ? `${address}:${port ?? ""}` : "Address unknown"}
          </Muted>
        </Column>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontWeight: 500 }}>Population</div>
          <div>{population ?? "n/a"}</div>
        </div>
      </Row>
    </Card>
  );
}
