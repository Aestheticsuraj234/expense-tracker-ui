"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Calendar, Layers3, Paperclip } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExpenseData = {
  amount: number;
  description: string;
  date: string;
  categoryName: string;
};

export const columns: ColumnDef<ExpenseData>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4 inline-flex space-x-2" />
          Amount
        </Button>
      )
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          <Layers3 className="ml-2 h-4 w-4 inline-flex space-x-2" />
          Category
        </Button>
      )
    }
  },
  {
    accessorKey: "date",
    header:({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          <Calendar className="ml-2 h-4 w-4 inline-flex space-x-2" />
          Date
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header:({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          <Paperclip className="ml-2 h-4 w-4 inline-flex space-x-2" />
          Description
        </Button>
      )
    },
  },
];
