import { useEffect, useState } from "react";
import { getExemplos } from "@/services/exemploService";
import { useAuth } from "@/contexts/AuthContext";

export function useExemplos() {
  const { user } = useAuth();
  const [exemplos, setExemplos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setExemplos([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getExemplos(user.uid).then(data => {
      setExemplos(data);
      setLoading(false);
    });
  }, [user]);

  return { exemplos, loading };
}