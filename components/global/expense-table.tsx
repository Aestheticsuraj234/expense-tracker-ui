"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { DataTable } from "@/app/(root)/_components/table/data-table";
import { columns } from "@/app/(root)/_components/table/column";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getAllExpenseOfCurrentUser } from "@/actions";

interface ExpenseData {
  id: string;
  amount: number;
  description: string;
  date: string; // Adjust type if needed
  category_id: number;
  user_id: string;
}

interface ExpenseDataResponse {
  data: ExpenseData[];
}

const ExpenseTable = () => {
  const { userId, authorizationHeader } = useSession();
  const [data, setData] = useState<ExpenseData[]>([]); // Corrected line
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);

  const fetchData = async ()=>{
    setIsLoading(true)
 const res =  await  getAllExpenseOfCurrentUser(userId , authorizationHeader)
 setData(res);
 setIsLoading(false);
  }
 
  useEffect(()=>{
     fetchData();
  })

  return (
    <div>
        <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ExpenseTable;
