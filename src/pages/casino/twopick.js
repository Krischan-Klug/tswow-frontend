import { useMemo, useRef, useEffect, useState } from "react";
import useRequireAuth from "@/lib/useRequireAuth";
import useCharacters from "@/lib/useCharacters";
import { jsonPost } from "@/lib/api";
import { toCopper } from "@/lib/currency";
import Alert from "@/components/ui/Alert";
import Column from "@/components/ui/Column";
import Container from "@/components/ui/Container";
import { Muted } from "@/components/ui/Text";
import CharacterSelect from "@/components/casino/CharacterSelect";
import WagerFields from "@/components/casino/WagerFields";
import TwoPickGrid from "@/components/casino/TwoPickGrid";
import ResultPanel from "@/components/casino/ResultPanel";

export default function TwoPickPage() {
  const { user, loading } = useRequireAuth("/casino/twopick");
  const {
    characters,
    loading: fetching,
    error: fetchError,
    refresh,
    updateBalance,
  } = useCharacters({
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
  const [round, setRound] = useState(0);

  const selectedChar = characters[selectedIdx] || null;
  const selectedRef = useRef(null);
  useEffect(() => {
    if (selectedChar) {
      selectedRef.current = {
        realmId: selectedChar.realmId,
        guid: selectedChar.guid,
      };
    }
  }, [selectedChar]);
  useEffect(() => {
    const id = selectedRef.current;
    if (!id || !characters?.length) return;
    const idx = characters.findIndex(
      (c) => c.realmId === id.realmId && c.guid === id.guid
    );
    if (idx >= 0 && idx !== selectedIdx) setSelectedIdx(idx);
  }, [characters]);

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
      const res = data?.result || data;
      setResult(res);
      setRound((r) => r + 1);
      const updated = Number(res.updatedBalance);
      if (selectedChar && Number.isFinite(updated)) {
        updateBalance?.(selectedChar.realmId, selectedChar.guid, updated);
      } else {
        refresh?.();
      }
    } catch (e) {
      setSubmitError(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in first.</div>;

  const pickedSide =
    choice === "heads" ? "left" : choice === "tails" ? "right" : undefined;
  const out = result?.outcome;
  const correctSide =
    out === "heads" ? "left" : out === "tails" ? "right" : undefined;

  return (
    <Container $max={720}>
      <Column $gap="var(--space-4)">
        <h1>Two Pick</h1>
        <Column $gap="var(--space-4)">
          <Column $gap="var(--space-1)">
            <label htmlFor="character">Character</label>
            <CharacterSelect
              characters={characters}
              value={selectedIdx}
              onChange={setSelectedIdx}
              disabled={fetching}
            />
          </Column>

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

          <TwoPickGrid
            key={round}
            canSubmit={canSubmit}
            pickedSide={pickedSide}
            correctSide={correctSide}
            onPick={play}
          />

          {!canSubmit && <Muted>Please select a character and a wager.</Muted>}
        </Column>

        {fetchError && (
          <Alert $variant="error">
            <strong>Error:</strong> {String(fetchError.message || fetchError)}
          </Alert>
        )}
        {submitError && (
          <Alert $variant="error">
            <strong>Error:</strong> {String(submitError.message || submitError)}
          </Alert>
        )}

        <ResultPanel key={round} result={result} playerChoice={choice} />
      </Column>
    </Container>
  );
}
