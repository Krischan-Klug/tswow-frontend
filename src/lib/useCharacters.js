import { useEffect, useState } from "react";
import { jsonGet } from "@/lib/api";
import { normalizeCharacters } from "@/lib/characters";

export default function useCharacters({ enabled = true } = {}) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
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

  return { characters, loading, error };
}

