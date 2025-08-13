import { useSession } from "next-auth/react";
import  axios  from "../axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  const refreshToken = async () => {
    const res = await axios.post("/api/v1/authentication/refresh", {
      refresh: session?.refresh,
    });
    if (session?.tokens) session.tokens = res.data.tokens;
  };
  return refreshToken;
};
