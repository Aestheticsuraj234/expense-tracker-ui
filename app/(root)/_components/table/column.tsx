"use client";

import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/currency/useCurrency";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Calendar, Layers3, Paperclip } from "lucide-react";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExpenseData = {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  category_id: string;
  category_description: string;
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
          {<Currency />}
          <ArrowUpDown className="ml-2 h-4 w-4 inline-flex space-x-2" />
          Amount
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          <Layers3 className="ml-2 h-4 w-4 inline-flex space-x-2" />
          Category
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          <Calendar className="ml-2 h-4 w-4 inline-flex space-x-2" />
          Date
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          <Paperclip className="ml-2 h-4 w-4 inline-flex space-x-2" />
          Description
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell:({row})=><CellAction data={row.original} />
  }
];

export const Currency = () => {
  const { currency } = useCurrency();
  return currency;
};
