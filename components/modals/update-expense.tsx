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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { UpdateExpenseForm } from "@/schema/schema";
import { useSession } from "@/hooks/useSession";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useCategory } from "@/hooks/category/useCategory";

interface CategoryProps {
  id: number;
  name: string;
  description: string;
}

export const UpdateExpense = () => {
  const { authorizationHeader, userId } = useSession();
  const { category } = useCategory();
  const { type, isOpen, modalData, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const isModalOpen = isOpen && type === "EXPENSE_UPDATE";
  

  const form = useForm<Z.infer<typeof UpdateExpenseForm>>({
    resolver: zodResolver(UpdateExpenseForm),
    defaultValues: {
      amount: "",
      description: "",
      category: "",
      date: new Date(),
    },
  });

  const onSubmit = async (values: Z.infer<typeof UpdateExpenseForm>) => {
    console.log(values,modalData.id);
    
    // try {
    //   setLoading(true);

    //   const { amount, description, category, date } = values;

    //   const selectedCategory = category?.find(
    //     (categoryItem) => categoryItem.name === category
    //   );
      

    //   if (!selectedCategory) {
    //     throw new Error("Selected category not found.");
    //   }

    //   // Extract the categoryId and format the date
    //   const categoryId = selectedCategory.id;
    //   const formattedDate = format(date, "dd-MM-yyyy");

    //   // Construct the data payload
    //   const data = {
    //     id:modalData.id,
    //     amount: Number(amount),
    //     description,
    //     category_id: categoryId,
    //     date: formattedDate,
    //     user_id: userId,
    //   };

    //   // Send the POST request
    //   const response = await axios.put(
    //     "http://140.238.227.78:8080/expenses",
    //     data,
    //     {
    //       headers: {
    //         Authorization: `Basic ${authorizationHeader}`,
    //         contentType: "application/json",
    //       },
    //     }
    //   );

    //   if (response.status === 200) {
    //     toast.success("Expense updated successfully", {
    //       icon: "👏",
    //     });
    //     form.reset();
    //   } else {
    //     throw new Error("Failed to update expense. Please try again.");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Something went wrong ❌");
    // } finally {
    //   setLoading(false);
    //   onClose();
    // }
  };

  return (
    <Modal
      title="Update Expense"
      description="Update your expense details"
      isOpen={isModalOpen}
      onClose={onClose}
      type="EXPENSE_UPDATE"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 items-center justify-center gap-4">
                        <FormLabel className="text-right">Amount</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter amount"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>

                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 items-center justify-center gap-4">
                        <FormLabel className="text-right">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter Description"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>

                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 items-center justify-center gap-4">
                        <FormLabel className="text-right">
                          Category Name
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
                              {category?.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.name}
                                  className="w-full"
                                >
                                  <div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <span>{category.name}</span>
                                        </TooltipTrigger>
                                        <TooltipContent
                                          side="top"
                                          className="absolute"
                                        >
                                          <span className="text-muted-foreground">
                                            {category.description}
                                          </span>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
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
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 items-center justify-center gap-4">
                        <FormLabel className="text-right">Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[142px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "yyyy-MM-dd")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
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
