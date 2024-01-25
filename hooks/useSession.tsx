"use client";
import { useEffect } from "react";
import { useAuthStore } from "./use-auth";

export const useSession = () => {
  const { isLoggedIn, setIsLoggedIn, setIsUserId, userId } = useAuthStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_id = sessionStorage.getItem("user_id");
      if (user_id) {
        setIsLoggedIn(true);
        setIsUserId(user_id);
      } else {
        setIsLoggedIn(false);
        setIsUserId("");
      }
    }
  }, [isLoggedIn, setIsLoggedIn, setIsUserId, userId]);

  return {
    isLoggedIn,
    setIsLoggedIn,
    setIsUserId,
    userId,
  };
};
