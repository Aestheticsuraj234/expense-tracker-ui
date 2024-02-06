"use client";
import { ModeToggle } from "@/components/global/theme-toggle";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// @ts-ignore
import AuthNavbarClock from "@/app/(auth)/components/auth-navbar-clock";
import { useSession } from "@/hooks/useSession";
import LogOutButton from "@/components/global/logout-btn";
import { Currency } from "lucide-react";
import CurencyBadge from "@/components/global/currency-badge";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { fullName } = useSession();
  console.log("FULL_NAME:", fullName);

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
      setGreeting("Are you Still Up 🌙");
    }
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="md:fixed top-0 md:z-50 w-full shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur">
      <div className="md:flex hidden h-16 items-center px-4">
        <Link href="/" className="flex flex-row items-center space-x-2 cursor-pointer"
        >
          <div className="cursor-pointer flex justify-center items-center space-x-4">

          <span className="text-xl  font-bold text-zinc-600 dark:text-zinc-100 cursor-pointer">
           Hello👋 {fullName}!
          </span>
          <span className="text-lg  font-bold text-zinc-600 dark:text-zinc-100 cursor-pointer">
           {greeting}
          </span>
             
          </div>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
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
