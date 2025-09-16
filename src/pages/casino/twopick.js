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

export default function TwoPickPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [characters, setCharacters] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [copper, setCopper] = useState(0);

  const [choice, setChoice] = useState(null);
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
      router.replace("/login?next=/casino/twopick");
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
          const chars = (data.characters || []).map((c, idx) => {
            const realmId =
              c.realmId ?? c.realm_id ?? c.realm?.id ?? c.realm ?? null;
            const guid =
              c.guid ?? c.characterGuid ?? c.character_guid ?? c.id ?? null;
            const realmName =
              c.realmName ?? c.realm_name ?? c.realm?.name ?? String(c.realm ?? "");
            const name = c.name ?? c.charName ?? c.characterName ?? "";
            const balanceCopper = Number(
              c.balanceCopper ?? c.balance_copper ?? c.balance ?? 0
            );
            const balancePretty = c.balancePretty || toPretty(balanceCopper);
            const _key = `${realmId ?? "r"}:${guid ?? "g"}:${name || idx}`;
            return {
              ...c,
              realmId,
              guid,
              realmName,
              name,
              balanceCopper,
              balancePretty,
              _key,
            };
          });
          setCharacters(chars);
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

  // Map coin choices to left/right to reveal which was correct
  const correctSide = result?.outcome === "heads" ? "left" : result?.outcome === "tails" ? "right" : null;
  const pickedSide = choice === "heads" ? "left" : choice === "tails" ? "right" : null;

  if (loading || fetching) {
    return (
      <div style={{ maxWidth: 640, margin: "40px auto" }}>
        <h1>Casino – Two Pick</h1>
        <p>Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ maxWidth: 640, margin: "40px auto" }}>
      <h1>Casino – Two Pick</h1>

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

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label htmlFor="charSel">Character</label>
          <select
            id="charSel"
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(parseInt(e.target.value, 10))}
          >
            {characters.map((c, idx) => (
              <option key={c._key || `${c.realmId ?? 'r'}:${c.guid ?? 'g'}:${idx}`} value={idx}>
                {(c.realmName || c.realm?.name || "Realm")} – {(c.name || `#${idx}`)} ({formatPretty(c.balancePretty)})
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
          <div style={{ display: "flex", alignItems: "flex-end", marginLeft: 8 }}>
            <div style={{ color: "#666" }}>
              = {wagerCopper} copper ({formatPretty(toPretty(wagerCopper))})
            </div>
          </div>
        </div>

        <div style={{ color: "#666" }}>
          Wähle eines der zwei Bilder. Aktuell werden Platzhalter-Texte angezeigt – die Bilder kannst du später einfügen.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {[
            { key: "heads", side: "left", label: "Bild 1 (links)" },
            { key: "tails", side: "right", label: "Bild 2 (rechts)" },
          ].map((opt) => {
            const isPicked = pickedSide === opt.side;
            const isCorrect = correctSide === opt.side;
            const borderColor = isCorrect
              ? "#22c55e"
              : isPicked
              ? "#3b82f6"
              : "#ccc";
            const bg = isCorrect
              ? "#e6ffed"
              : isPicked
              ? "#eef2ff"
              : "#f7f7f7";
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => play(opt.key)}
                disabled={!canSubmit}
                style={{
                  height: 200,
                  border: `2px solid ${borderColor}`,
                  borderRadius: 12,
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  position: "relative",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
                aria-label={opt.label}
                title={opt.label}
              >
                <span>{opt.label}</span>
                {result && (
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      padding: "2px 6px",
                      borderRadius: 6,
                      background: isCorrect ? "#22c55e" : isPicked ? "#3b82f6" : "#aaa",
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    {isCorrect ? "Richtig" : isPicked ? "Deine Wahl" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!canSubmit && (
          <div style={{ color: "#666" }}>
            Charakter wählen und Einsatz eingeben, um zu spielen.
          </div>
        )}
      </div>

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
            {result.win ? "Du hast gewonnen!" : "Leider verloren."}
          </div>
          <div>Aufgedeckt: {result.outcome === "heads" ? "Bild 1 (links)" : "Bild 2 (rechts)"}</div>
          <div>Deine Wahl: {choice === "heads" ? "Bild 1 (links)" : "Bild 2 (rechts)"}</div>
          <div>Einsatz: {formatPretty(toPretty(Number(result.wagerCopper || 0)))}</div>
          <div>
            Vorheriges Guthaben: {formatPretty(result.previousBalancePretty || toPretty(Number(result.previousBalance || 0)))}
          </div>
          <div>
            Neues Guthaben: {formatPretty(result.updatedBalancePretty || toPretty(Number(result.updatedBalance || 0)))}
          </div>
        </div>
      )}
    </div>
  );
}
