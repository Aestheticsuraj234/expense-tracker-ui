"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './_components/navbar';
import { Sidebar } from "./_components/sidebar";
import { useSession } from '@/hooks/useSession';


const DashboardLayout = ({ children }:{
  children: React.ReactNode;
}) => {
  const router = useRouter();
    const [isLoggedIn , setIsLoggedIn] = React.useState(false);
    const [userId , setIsUserId] = React.useState<string|null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_id = sessionStorage.getItem("user_id");
      if (user_id) {
        setIsLoggedIn(true);
        setIsUserId(user_id);
        router.push('/');
      } else {
        setIsLoggedIn(false);
        setIsUserId(null);
        router.push('/sign-in');
      }
    }
  }, [isLoggedIn, userId]);

  return (
    isLoggedIn ? ( // Render UI only if logged in
      <div className="h-full">
        <div className="h-[80px]  fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>

        <main className="px-10 pt-[80px] h-full relative">
          {children}
        </main>
      </div>
    ) : (
      null // Render nothing if not logged in
    )
  );
};

export default DashboardLayout;
