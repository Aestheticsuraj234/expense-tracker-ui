"use client";
import { useEffect } from "react";
import { useAuthStore } from "./use-auth";

export const useSession = () => {
  const { isLoggedIn, setIsLoggedIn, setIsUserId, userId , fullName ,setFullName } = useAuthStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_id = sessionStorage.getItem("user_id");
      const full_name = sessionStorage.getItem("full_name");
      if (user_id) {
        setIsLoggedIn(true);
        setIsUserId(user_id);
        setFullName(full_name);
        
      } else {
        setIsLoggedIn(false);
        setIsUserId("");
        setFullName("");
      }
    }
  }, [isLoggedIn, userId, fullName]);

  return {
    isLoggedIn,
    userId,
    fullName,
  };
};
