"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { DataTable } from "@/app/(root)/_components/table/data-table";
import { ExpenseData, columns } from "@/app/(root)/_components/table/column";
import { getAllExpenseOfCurrentUser } from "@/actions";
import { Skeleton } from "@/components/ui/skeleton"


const ExpenseTable = () => {
  const { userId, authorizationHeader } = useSession();
  const [data, setData] = useState<ExpenseData[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getAllExpenseOfCurrentUser(userId, authorizationHeader);
      setData(res);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching expenses. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    userId,
    authorizationHeader,
  ]); // Pass an empty dependency array to run the effect only once when the component mounts

  console.log(data);

  return (
    <div>
      {isLoading && 
        <Skeleton
          className="w-full h-4"
          style={{ height: "1rem" }}
          
         />
      }
      { <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default ExpenseTable;
