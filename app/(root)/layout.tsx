"use client";
import React, { use, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from './_components/navbar';
import { Loader2 } from 'lucide-react';
import { useCurrency } from '@/hooks/currency/useCurrency';
import { useCurrencyStore } from '@/hooks/currency/use-currency';



const DashboardLayout = ({ children }:{
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = useParams();
    const [isLoggedIn , setIsLoggedIn] = React.useState(false);
    const [userId , setIsUserId] = React.useState<string|null>(null);
 

    
    useEffect(() => {
      if (typeof window !== "undefined") {
        const user_id = sessionStorage.getItem("user_id");
      

        
        // @ts-ignore
        if (user_id && pathname !== '/sign-in') {
          setIsLoggedIn(true);
          setIsUserId(user_id);
        } else {
          setIsLoggedIn(false);
          setIsUserId(null);
    
          // Avoid redirecting if the current route is the sign-in page
          // @ts-ignore
          if (pathname !== '/sign-in') {
            router.push('/sign-in');
          }
        }
      }
    }, [userId, isLoggedIn, pathname]);
    

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
          <Loader2 className='animate-spin text-black dark:text-white' size={64} />
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      )
    );


  
};

export default DashboardLayout;
