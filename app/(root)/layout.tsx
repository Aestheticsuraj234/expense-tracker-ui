"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './_components/navbar';
import { Loader2 } from 'lucide-react';


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
  }, []);

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
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader2 className='animate-spin' size={64} color='#000' />
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    )
  );
};

export default DashboardLayout;
