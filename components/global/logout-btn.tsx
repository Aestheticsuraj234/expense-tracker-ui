"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import {  LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
const LogOutButton = () => {

  const onLogout = () => {
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('full_name');
    sessionStorage.removeItem('authorization_header');
    toast.success("Logout Successfully👋");
    window.location.href = '/sign-in';
  }

  return (
    <Button onClick={onLogout} variant={"outline"} size={"default"} className='flex justify-center items-center dark:bg-zinc-700 dark:hover:bg-zinc-600 gap-2' >
   <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white" />
    <span className="text-xs">Logout</span>

</Button>
  )
}

export default LogOutButton