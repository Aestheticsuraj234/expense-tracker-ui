"use client";
// global
import * as Z from "zod";
import { useEffect, useState } from "react";
import axios from "axios";

import Image from 'next/image'
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation"

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useCategory } from "@/hooks/category/useCategory";


const UpdateExpense = ({
  params
}:{params:{expenseId:string}}) => {
  const { authorizationHeader, userId } = useSession();
  const { categorydata } = useCategory();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  

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
   
    
    try {
      setLoading(true);

      const { amount, description, category, date } = values;

      const selectedCategory = categorydata?.find(
        (categoryItem) => categoryItem.name === category
      );
      

      if (!selectedCategory) {
        throw new Error("Selected category not found.");
      }

      // Extract the categoryId and format the date
      const categoryId = selectedCategory.id;
      const formattedDate = format(date, "dd-MM-yyyy");

      // Construct the data payload
      const data = {
        id: params.expenseId,
        amount: Number(amount),
        description,
        category_id: categoryId,
        date: formattedDate,
        user_id: userId,
      };

      // Send the POST request
      const response = await axios.put(
        "http://140.238.227.78:8080/expenses",
        data,
        {
          headers: {
            Authorization: `Basic ${authorizationHeader}`,
            contentType: "application/json",
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        toast.success("Expense updated successfully", {
          icon: "👏",
        });
        router.push("/")
        form.reset();
      } else {
        throw new Error("Failed to update expense. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
      form.reset();
      
    }
  };

  return (
    <>
    <h1 className='text-center mt-8 text-2xl font-bold text-zinc-600 dark:text-white'>Update Your Expense Here!</h1>
    <div className="flex justify-between items-center w-full mt-10 mx-4 gap-7">
      <Image src="update-expense.svg" alt="expense" width={560} height={560} />
     
        <div className="space-y-4 py-2 ml-10 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                            className="w-full dark:bg-zinc-700"

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
                            className="w-full dark:bg-zinc-700"
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
                              <SelectTrigger className="dark:bg-zinc-700">
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent side="right" className="w-full dark:bg-zinc-700">
                              {categorydata?.map((category) => (
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
                                  "w-[177px] pl-3 text-left font-normal dark:bg-zinc-700",
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
                              className="dark:bg-zinc-700"
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-6 space-x-2 flex items-center justify-center w-2/3">
              
                <Button disabled={loading} type="submit" variant={"default"} size={"default"} className="w-full">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      
    </div>
    </>

  )
}

export default UpdateExpense