import { useMemo, useState } from "react";
import useRequireAuth from "@/lib/useRequireAuth";
import useCharacters from "@/lib/useCharacters";
import { jsonPost } from "@/lib/api";
import { toCopper } from "@/lib/currency";
import Row from "@/components/ui/Row";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Column from "@/components/ui/Column";
import Container from "@/components/ui/Container";
import { Muted } from "@/components/ui/Text";
import CharacterSelect from "@/components/casino/CharacterSelect";
import WagerFields from "@/components/casino/WagerFields";
import CoinChoice from "@/components/casino/CoinChoice";
import ResultPanel from "@/components/casino/ResultPanel";

export default function CoinflipPage() {
  const { user, loading } = useRequireAuth("/casino/coinflip");

  const { characters, loading: fetching, error: fetchError } = useCharacters({
    enabled: !!user,
  });
  const [selectedIdx, setSelectedIdx] = useState(0);

  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [copper, setCopper] = useState(0);
  const [choice, setChoice] = useState("heads");

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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChar) return;
    setSubmitting(true);
    setSubmitError(null);
    setResult(null);
    try {
      const body = {
        realmId: selectedChar.realmId,
        characterGuid: selectedChar.guid,
        wagerCopper,
        choice,
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

  return (
    <Container $max={720}>
      <Column $gap="var(--space-4)">
        <h1>Coin Flip</h1>
        <Column as="form" onSubmit={onSubmit} $gap="var(--space-4)">
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

          <CoinChoice value={choice} onChange={setChoice} />

          <Row>
            <Button type="submit" disabled={!canSubmit}>
              {submitting ? "Flipping…" : "Flip Coin"}
            </Button>
            {!canSubmit && (
              <Muted>Select character and enter wager</Muted>
            )}
          </Row>
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

        <ResultPanel result={result} />
      </Column>
    </Container>
  );
}
