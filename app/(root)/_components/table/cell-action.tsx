"use client";

import { Button } from "@/components/ui/button";
import { ExpenseData } from "./column";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useStoreModal } from "@/hooks/use-store-modal";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: ExpenseData;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authorizationHeader } = useSession();
  const { onOpen } = useStoreModal();
  const router = useRouter();

  const onDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `http://140.238.227.78:8080/expenses/${id}`,
        {
          headers: {
            Authorization: `Basic ${authorizationHeader}`,
          },
        }
      );
      toast.success("Expense deleted");
      setIsLoading(false);
    } catch (error) {
      toast.error("Error deleting expense");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-zinc-900">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onOpen("EXPENSE_UPDATE",{
          id: data.id,
          data,
        })}>
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isLoading}
          onClick={() =>
            onOpen("EXPENSE_DELETE", {
              id: data.id,
              data,
            })
          }
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
