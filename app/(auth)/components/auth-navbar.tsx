"use client";
import { ModeToggle } from "@/components/global/theme-toggle";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import AuthNavbarClock from "./auth-navbar-clock";

const AuthNavbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setIsMounted(true);
    let hours = new Date().getHours();
    if (hours <= 12) {
      setGreeting("Good Morning 🌅");
    } else if (hours < 17) {
      setGreeting("Good Afternoon 🚀");
    } else if (hours < 20) {
      setGreeting("Good Evening 🌃");
    } else {
      setGreeting("Good Night 🌙");
    }
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="fixed top-0 md:z-50 w-full shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur">
      <div className="flex  h-16 items-center px-4">
        <Link
          href={"#"}
          className="flex flex-row items-center space-x-2 cursor-pointer"
        >
          <h1 className="md:text-xl text-base flex-1 font-bold text-zinc-600 dark:text-zinc-100 cursor-pointer">
            {greeting}
          </h1>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <AuthNavbarClock />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
