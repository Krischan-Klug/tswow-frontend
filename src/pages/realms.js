import { useEffect, useState } from "react";
import RealmDisplay from "@/components/RealmDisplay";
import { jsonGet } from "@/lib/api";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Grid from "@/components/ui/Grid";
import { Muted } from "@/components/ui/Text";

export default function Realms() {
  const [realms, setRealms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await jsonGet("/api/realm");
        if (!mounted) return;
        setRealms(Array.isArray(data?.realms) ? data.realms : []);
      } catch (e) {
        if (!mounted) return;
        setError(e);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading realms…</div>;
  if (error) return <div>Error: {String(error.message || error)}</div>;

  return (
    <Container $max={960}>
      <Column $gap="var(--space-4)">
        <div>
          <h1>Realms</h1>
        </div>
        {realms.length === 0 ? (
          <div>No realms available.</div>
        ) : (
          <Grid $cols={2}>
            {realms.map((r) => (
              <RealmDisplay key={r.id} realm={r} />
            ))}
          </Grid>
        )}
      </Column>
    </Container>
  );
}
