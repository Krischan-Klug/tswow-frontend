import { useState, useEffect } from "react";

const useRealmInfo = (realmId) => {
  const [realm, setRealm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRealm = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/realm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ realmId }),
        });
        const data = await response.json();
        setRealm(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRealm();
  }, [realmId]);

  return { realm, loading, error };
};

export default useRealmInfo;
