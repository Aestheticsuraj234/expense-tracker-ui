"use client";
import { ModeToggle } from "@/components/global/theme-toggle";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// @ts-ignore
import AuthNavbarClock from "@/app/(auth)/components/auth-navbar-clock";
import { useSession } from "@/hooks/useSession";
import LogOutButton from "@/components/global/logout-btn";
import CurencyBadge from "@/components/global/currency-badge";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { fullName } = useSession();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setIsMounted(true);
    let hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning 🌅");
    } else if (hours < 17) {
      setGreeting("Good Afternoon 🚀");
    } else if (hours < 20) {
      setGreeting("Good Evening 🌃");
    } else {
      setGreeting("Are you Still Up 🌙");
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex top-0 z-50 w-full shadow-lg bg-white dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center px-4 h-16">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <div className="flex justify-center items-center space-x-4">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Hello👋 {fullName}!
            </span>
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              {greeting}
            </span>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <AuthNavbarClock />
          <CurencyBadge />
          <ModeToggle />
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
