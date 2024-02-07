"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { DataTable } from "@/app/(root)/_components/table/data-table";
import { ExpenseData, columns } from "@/app/(root)/_components/table/column";
import { getAllExpenseOfCurrentUser } from "@/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

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
  }, []);

  console.log(data);

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

const TableSkeleton = () => {
  return (
    <div className="w-full rounded-md border relative  overflow-auto">
      <Skeleton className="[&_tr]:border-b bg-zinc-600 dark:bg-gray-200 mb-2" />
      <Skeleton className="[&_tr:last-child]:border-0 bg-zinc-600 dark:bg-gray-200 mb-2" />
      <Skeleton className="border-t bg-muted w-[50%] font-medium [&>tr]:last:border-b-0 mb-2" />
    </div>
  );
};
