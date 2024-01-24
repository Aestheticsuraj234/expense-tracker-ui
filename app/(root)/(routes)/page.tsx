"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExpenseGraph } from '../_components/home/expense-graph';
import ExpenseForm from '../_components/home/expense-form';
import { useAuth } from '@/hooks/use-auth'; // Import the useAuth hook

const Home = () => {
  


  return (
    
      <main className="px-4 py-4 flex flex-col">
        <div className="mt-10 mx-4">
          <ExpenseGraph />
        </div>
        <div className="mt-10 mx-4">
          <ExpenseForm />
        </div>
      </main>
      );
};

export default Home;
