import React, { useEffect, useState } from "react";
import SkinService from "../services/skin";
import { CS2Skin } from "@/types/skin";

export const useSkin = () => {
  const [skin, setSkin] = useState<CS2Skin[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkin = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await SkinService.getSkin();
        setSkin(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown Error!");
      } finally {
        setLoading(false);
      }
    };
    fetchSkin();
  }, []);

  return { skin, loading, error };
};
