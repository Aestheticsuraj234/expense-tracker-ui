"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { useSession } from '@/hooks/useSession';


const DashboardLayout = ({ children }:{
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const {userId , isLoggedIn} = useSession();



  if(!userId)
  {
    router.push("/sign-in");
  }
  else
  {
    router.push("/");
  }


  return (
    isLoggedIn ? ( // Render UI only if logged in
      <div className="h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-56 pt-[80px] h-full relative">
          {children}
        </main>
      </div>
    ) : (
      null // Render nothing if not logged in
    )
  );
};

export default DashboardLayout;
