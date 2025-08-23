// useRealm.js
import { useState, useEffect } from "react";

const useRealmInfo = (realmId) => {
  const [realms, setRealms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRealm = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/realm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: realmId }),
        });
        const data = await response.json();
        setRealms(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRealm();
  }, [realmId]);

  return { realms, loading, error };
};

export default useRealmInfo;
