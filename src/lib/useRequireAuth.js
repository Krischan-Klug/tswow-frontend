import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/useAuth";

export default function useRequireAuth(nextPath) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const encodedNext = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
      router.replace(`/login${encodedNext}`);
    }
  }, [loading, user, router, nextPath]);

  return { user, loading };
}

