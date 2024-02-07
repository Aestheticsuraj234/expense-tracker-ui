"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { DataTable } from "@/app/(root)/_components/table/data-table";
import { ExpenseData, columns } from "@/app/(root)/_components/table/column";
import { getAllExpenseOfCurrentUser } from "@/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useHistory } from "@/hooks/use-history";

const ExpenseTable = () => {
  const { userId, authorizationHeader } = useSession();
  const {data,setData} = useHistory();
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
  }, []);

  console.log(data);
// TODO: Add Update Modal Popup with the current data
// TODO: Add Cancel Button to redirect to the history page into the update page of expense and fetch data as well 
  return (
    <div>
      {isLoading ? (
        <div className="justify-center items-center flex ">

          <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
          <h2>Loading...</h2>
        </div>
      ) : (
        // @ts-ignore
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default ExpenseTable;

