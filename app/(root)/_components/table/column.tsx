"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExpenseData = {
    id: string;
    amount: number;
    description: string;
    date: string;
    category_id: number;
    user_id: string;
   
  };

  

export const columns: ColumnDef<ExpenseData>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "category_id",
    header: "Category",
  },
  {
    accessorKey: "user_id",
    header: "User",
  }

]
