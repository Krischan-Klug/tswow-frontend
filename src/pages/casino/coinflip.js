import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/useAuth";

function toPretty(copper) {
  const g = Math.floor(copper / 10000);
  const s = Math.floor((copper % 10000) / 100);
  const c = copper % 100;
  return { gold: g, silver: s, copper: c };
}

function formatPretty(pretty) {
  return `${pretty.gold}g ${pretty.silver}s ${pretty.copper}c`;
}

export default function CoinflipPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [characters, setCharacters] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [copper, setCopper] = useState(0);

  const [choice, setChoice] = useState("heads");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [result, setResult] = useState(null);

  const selectedChar = characters[selectedIdx] || null;

  const wagerCopper = useMemo(() => {
    const g = Number.isFinite(+gold) ? Math.max(0, parseInt(gold, 10) || 0) : 0;
    const s = Number.isFinite(+silver)
      ? Math.max(0, Math.min(99, parseInt(silver, 10) || 0))
      : 0;
    const c = Number.isFinite(+copper)
      ? Math.max(0, Math.min(99, parseInt(copper, 10) || 0))
      : 0;
    return g * 10000 + s * 100 + c;
  }, [gold, silver, copper]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?next=/casino/coinflip");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setFetching(true);
      setFetchError(null);
      try {
        const r = await fetch("/api/casino/characters");
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Failed to load characters");
        if (!cancelled) {
          setCharacters(data.characters || []);
          setSelectedIdx(0);
        }
      } catch (e) {
        if (!cancelled) setFetchError(e);
      } finally {
        if (!cancelled) setFetching(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const canSubmit = !!selectedChar && wagerCopper > 0 && !submitting;

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
      const r = await fetch("/api/casino/coin-flip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      setResult(data.result || null);
      // Update local balance
      if (data?.result) {
        const { realmId, characterGuid, updatedBalance, updatedBalancePretty } =
          data.result;
        setCharacters((prev) =>
          prev.map((ch) => {
            if (ch.realmId === realmId && ch.guid === characterGuid) {
              const pretty =
                updatedBalancePretty || toPretty(Number(updatedBalance || 0));
              return {
                ...ch,
                balanceCopper: Number(updatedBalance || 0),
                balancePretty: pretty,
              };
            }
            return ch;
          })
        );
      }
    } catch (e) {
      setSubmitError(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || fetching) {
    return (
      <div style={{ maxWidth: 640, margin: "40px auto" }}>
        <h1>Casino – Coinflip</h1>
        <p>Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ maxWidth: 640, margin: "40px auto" }}>
      <h1>Casino – Coinflip</h1>

      {fetchError && (
        <div
          style={{
            background: "#ffe6e6",
            border: "1px solid #ffb3b3",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <strong style={{ color: "#b30000" }}>Error:</strong>{" "}
          {String(fetchError.message || fetchError)}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label htmlFor="charSel">Character</label>
          <select
            id="charSel"
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(parseInt(e.target.value, 10))}
          >
            {characters.map((c, idx) => (
              <option key={`${c.realmId}:${c.guid}`} value={idx}>
                {c.realmName} – {c.name} ({formatPretty(c.balancePretty)})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="gold">Gold</label>
            <input
              id="gold"
              type="number"
              min={0}
              value={gold}
              onChange={(e) => setGold(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="silver">Silver</label>
            <input
              id="silver"
              type="number"
              min={0}
              max={99}
              value={silver}
              onChange={(e) => setSilver(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="copper">Copper</label>
            <input
              id="copper"
              type="number"
              min={0}
              max={99}
              value={copper}
              onChange={(e) => setCopper(e.target.value)}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-end", marginLeft: 8 }}
          >
            <div style={{ color: "#666" }}>
              = {wagerCopper} copper ({formatPretty(toPretty(wagerCopper))})
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <label>
            <input
              type="radio"
              name="choice"
              value="heads"
              checked={choice === "heads"}
              onChange={() => setChoice("heads")}
            />
            Heads
          </label>
          <label>
            <input
              type="radio"
              name="choice"
              value="tails"
              checked={choice === "tails"}
              onChange={() => setChoice("tails")}
            />
            Tails
          </label>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button type="submit" disabled={!canSubmit}>
            {submitting ? "Flipping…" : "Flip Coin"}
          </button>
          {!canSubmit && (
            <span style={{ color: "#666" }}>
              Select character and enter wager
            </span>
          )}
        </div>
      </form>

      {submitError && (
        <div
          style={{
            background: "#ffe6e6",
            border: "1px solid #ffb3b3",
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <strong style={{ color: "#b30000" }}>Error:</strong>{" "}
          {String(submitError.message || submitError)}
        </div>
      )}

      {result && (
        <div
          style={{
            background: result.win ? "#e6ffed" : "#fff7e6",
            border: `1px solid ${result.win ? "#8ce1a5" : "#ffd699"}`,
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            {result.win ? "You won! 🎉" : "You lost."}
          </div>
          <div>Outcome: {result.outcome}</div>
          <div>Choice: {result.choice}</div>
          <div>
            Wager: {formatPretty(toPretty(Number(result.wagerCopper || 0)))}
          </div>
          <div>
            Previous balance: {formatPretty(result.previousBalancePretty || toPretty(Number(result.previousBalance || 0)))}
          </div>
          <div>
            Updated balance: {formatPretty(result.updatedBalancePretty || toPretty(Number(result.updatedBalance || 0)))}
          </div>
        </div>
      )}
    </div>
  );
}

