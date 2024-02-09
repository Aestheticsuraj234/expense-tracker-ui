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

export const AddCurrencyModal = () => {
  const { type, isOpen, onClose } = useStoreModal();
  const {userId,authorizationHeader} = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const {
    currencies,
    fetchAllCurrencies,
  } = useAllCurrencyStore();
 
  const isModalOpen = isOpen && type === "CURRENCY_ADD";

  useEffect(() => {
    // Fetch currencies when the component mounts
    fetchAllCurrencies();
  }, [fetchAllCurrencies]);
  const form = useForm<Z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
    },
  });
 
  const onSubmit = async (values: Z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const { symbol } = currencies[values.symbol];

      const data = {
        symbol: symbol,
        user_id: userId,
      };
  
   const res = await axios.post("https://140.238.227.78:8080/currencies/create",data, {
        headers: {
          Authorization: `Basic ${authorizationHeader}`,
        },
      });
      console.log(res.data);
  
      toast.success("Currency added successfully");
      setLoading(false);
      onClose();
      window.location.href = '/';
    } catch (error) {
      console.log("Error While Adding Currency", error);
      toast.error("Something Went wrong");
    }
  };
  
  return (
    <Modal
      title="Add Your Currency"
      description=" Please select your currency to continue it is mandatory to select your currency to continue."
      isOpen={isModalOpen}
      onClose={onClose}
      type="CURRENCY_ADD"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-3 items-center justify-center gap-4">
                      <FormLabel className="text-right">
                        Currency Name
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent side="right" className="w-full">
                            {Object.keys(currencies)?.map((currencyCode) => (
                              <SelectItem
                                key={currencyCode}
                                value={currencyCode}
                                className="w-full"
                              >
                                <div>
                                  <SelectGroup className="flex justify-between items-center flex-row gap-4">
                                    <span>{currencies[currencyCode].name}</span>
                                    <Button variant={"outline"} size="icon">{currencies[currencyCode].symbol}</Button>
                                  </SelectGroup>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit" variant={"default"}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
