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
import { useCurrency } from "@/hooks/currency/useCurrency";

const formSchema = Z.object({
  symbol: Z.string().min(1),
});

export const UpdateCurrencyModal = () => {
  const { type, isOpen, onClose } = useStoreModal();
  const {userId,authorizationHeader} = useSession();
  const [loading, setLoading] = useState(false);
  const {id} = useCurrency();
  const router = useRouter()
  const {
    currencies,
    fetchAllCurrencies,
  } = useAllCurrencyStore();
 
  const isModalOpen = isOpen && type === "CURRENCY_UPDATE";

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
        id: id,
        symbol: symbol,
        user_id: userId,
      };
  
   const res = await axios.put("https://140.238.227.78:8080/currencies/update",data, {
        headers: {
          Authorization: `Basic ${authorizationHeader}`,
        },
      });
      console.log(res.data);
  
      toast.success("Currency Updated successfully");
      setLoading(false);
      onClose();
      window.location.href = '/';
    } catch (error) {
      console.log("Error While Updating Currency", error);
      toast.error("Something Went wrong");
    }
  };
  
  return (
    <Modal
      title="Update Your Currency"
      description="
      You can update your currency symbol here. Please select your currency symbol from the dropdown and click on continue to update your currency symbol.
      "
      isOpen={isModalOpen}
      onClose={onClose}
      type="CURRENCY_UPDATE"
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
                            <SelectTrigger className="dark:bg-zinc-700">
                              <SelectValue placeholder="Select Category" className="w-auto" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent side="right" className="w-full dark:bg-zinc-800">
                            {Object.keys(currencies)?.map((currencyCode) => (
                              <SelectItem
                                key={currencyCode}
                                value={currencyCode}
                                className="w-full px-2 py-2"
                              >
                                <div>
                                  <SelectGroup className="flex justify-between items-center flex-row gap-4">
                                    <span>{currencies[currencyCode].name}</span>
                                    <Button variant={"outline"} size="icon" className="dark:bg-zinc-600">{currencies[currencyCode].symbol}</Button>
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
                  className="dark:bg-zinc-600"
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit" variant={"default"} className="dark:bg-white" >
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
