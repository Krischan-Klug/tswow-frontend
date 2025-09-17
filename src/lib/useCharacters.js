import { useEffect, useState } from "react";
import { jsonGet } from "@/lib/api";
import { normalizeCharacters } from "@/lib/characters";

export default function useCharacters({ enabled = true } = {}) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jsonGet("/api/casino/characters");
      setCharacters(normalizeCharacters(data.characters || []));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = (realmId, guid, balanceCopper) => {
    setCharacters((prev) =>
      prev.map((c) =>
        c.realmId === realmId && c.guid === guid
          ? { ...c, balanceCopper: Number(balanceCopper) || 0 }
          : c
      )
    );
  };

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await jsonGet("/api/casino/characters");
        if (!cancelled) setCharacters(normalizeCharacters(data.characters || []));
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { characters, loading, error, refresh: load, updateBalance };
}
