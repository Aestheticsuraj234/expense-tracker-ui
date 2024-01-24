"use client";
import React from 'react'
import { SessionProvider, SessionProviderProps } from "next-auth/react";

const NextAuthSessionProvider = ({children , session}:SessionProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default NextAuthSessionProvider