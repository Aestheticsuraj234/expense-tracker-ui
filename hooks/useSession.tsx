"use client";
import { useEffect } from "react";
import { useAuthStore } from "./use-auth";

export const useSession = () => {
  const { isLoggedIn, setIsLoggedIn, setIsUserId, userId , fullName ,setFullName , authorizationHeader,setAuthorizationHeader} = useAuthStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_id = sessionStorage.getItem("user_id");
      const full_name = sessionStorage.getItem("full_name");
      const authorization_header = sessionStorage.getItem("authorization_header");
      if (user_id) {
        setIsLoggedIn(true);
        setIsUserId(user_id);
        setFullName(full_name);
        setAuthorizationHeader(authorization_header);
        
      } else {
        setIsLoggedIn(false);
        setIsUserId("");
        setFullName("");
        setAuthorizationHeader("");
      }
    }
  }, [isLoggedIn, userId, fullName , authorizationHeader]);

  return {
    isLoggedIn,
    userId,
    fullName,
    authorizationHeader
  };
};
