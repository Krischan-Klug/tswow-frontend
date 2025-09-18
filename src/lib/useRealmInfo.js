import { useState, useEffect } from "react";
import { jsonGet } from "./api";

const useRealmInfo = (realmId) => {
  const [realm, setRealm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (realmId == null) return;
    const fetchRealm = async () => {
      setLoading(true);
      try {
        const data = await jsonGet("/api/realm");
        const list = Array.isArray(data?.realms) ? data.realms : [];
        const found = list.find((r) => Number(r.id) === Number(realmId)) || {};
        setRealm(found);
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
