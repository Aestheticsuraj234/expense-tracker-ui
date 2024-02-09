"use client";
// global
import * as Z from "zod";
import { useEffect, useState } from "react";
import axios from "axios";

// local
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useAllCurrencyStore } from "@/hooks/currency/use-All-Currency";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

const formSchema = Z.object({
  symbol: Z.string().min(1),
});

export const DeleteExpenseModal = () => {
    const { type, isOpen, onClose, modalData } = useStoreModal();
    const { authorizationHeader } = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const {id} = modalData;

  
    const onDelete = async (id: string) => {
      try {
        setLoading(true);
        const res = await axios.delete(
          `https://140.238.227.78:8080/expenses/${id}`,
          {
            headers: {
              Authorization: `Basic ${authorizationHeader}`,
            },
          }
        );
        toast.success("Expense deleted");
        setLoading(false);
        onClose();
      } catch (error) {
        toast.error("Error deleting expense");
      } finally {
        setLoading(false);
        onClose();
      }
    };
  
    return (
      <Modal
        title="Do you want to delete this expense?"
        description="This action cannot be undone."
        isOpen={isOpen && type === "EXPENSE_DELETE"} // Combine isOpen and type check
        onClose={onClose}
        type="CURRENCY_ADD"
      >
        <div className="space-y-4 py-2 pb-4">
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            {/* Pass id to onDelete function only if it exists */}
            <Button
              disabled={loading}
              onClick={() => id && onDelete(id)}
              type="submit"
              variant={"default"}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    );
  };
  
