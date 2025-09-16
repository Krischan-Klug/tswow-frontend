import { useMemo, useState } from "react";
import useRequireAuth from "@/lib/useRequireAuth";
import useCharacters from "@/lib/useCharacters";
import { jsonPost } from "@/lib/api";
import { toCopper } from "@/lib/currency";
import Row from "@/components/ui/Row";
import Alert from "@/components/ui/Alert";
import CharacterSelect from "@/components/casino/CharacterSelect";
import WagerFields from "@/components/casino/WagerFields";
import TwoPickGrid from "@/components/casino/TwoPickGrid";
import ResultPanel from "@/components/casino/ResultPanel";

export default function TwoPickPage() {
  const { user, loading } = useRequireAuth("/casino/twopick");
  const { characters, loading: fetching, error: fetchError } = useCharacters({
    enabled: !!user,
  });
  const [selectedIdx, setSelectedIdx] = useState(0);

  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [copper, setCopper] = useState(0);

  const [choice, setChoice] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [result, setResult] = useState(null);

  const selectedChar = characters[selectedIdx] || null;
  const wagerCopper = useMemo(
    () => toCopper({ gold, silver, copper }),
    [gold, silver, copper]
  );

  const canSubmit =
    !!selectedChar &&
    wagerCopper > 0 &&
    !submitting &&
    selectedChar.realmId != null &&
    selectedChar.guid != null;

  const play = async (picked) => {
    if (!canSubmit) return;
    if (!selectedChar) return;
    setSubmitting(true);
    setSubmitError(null);
    setResult(null);
    setChoice(picked);
    try {
      const body = {
        realmId: selectedChar.realmId,
        characterGuid: selectedChar.guid,
        wagerCopper,
        choice: picked, // reuse coin-flip API: "heads" | "tails"
      };
      const data = await jsonPost("/api/casino/coin-flip", body);
      setResult(data);
    } catch (e) {
      setSubmitError(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in first.</div>;

  const pickedSide = choice === "heads" ? "left" : choice === "tails" ? "right" : undefined;
  const correctSide = result
    ? result.outcome === "heads"
      ? "left"
      : "right"
    : undefined;

  return (
    <div style={{ maxWidth: 720, margin: "40px auto" }}>
      <h1>Two Pick</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="character">Character</label>
          <CharacterSelect
            characters={characters}
            value={selectedIdx}
            onChange={setSelectedIdx}
            disabled={fetching}
          />
        </div>

        <WagerFields
          gold={gold}
          silver={silver}
          copper={copper}
          onChange={({ gold, silver, copper }) => {
            setGold(gold);
            setSilver(silver);
            setCopper(copper);
          }}
        />

        <div style={{ color: "var(--muted)" }}>
          Wähle eines der zwei Bilder. Aktuell sind Platzhalter – die Bilder kannst du später einfügen.
        </div>

        <TwoPickGrid
          canSubmit={canSubmit}
          pickedSide={pickedSide}
          correctSide={correctSide}
          onPick={play}
        />

        {!canSubmit && (
          <div style={{ color: "var(--muted)" }}>
            Charakter wählen und Einsatz eingeben, um zu spielen.
          </div>
        )}
      </div>

      {fetchError && (
        <Alert $variant="error" style={{ marginTop: 16 }}>
          <strong>Error:</strong> {String(fetchError.message || fetchError)}
        </Alert>
      )}
      {submitError && (
        <Alert $variant="error" style={{ marginTop: 16 }}>
          <strong>Error:</strong> {String(submitError.message || submitError)}
        </Alert>
      )}

      <ResultPanel result={result} />
    </div>
  );
}

