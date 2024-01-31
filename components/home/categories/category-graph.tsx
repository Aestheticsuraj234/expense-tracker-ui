"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categorySchema } from "@/schema/schema";
import { useSession } from "@/hooks/useSession";
import axios from "axios";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CalendarIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import toast from "react-hot-toast";

import CategoryTooltip from "./category-tooltip";

const expenseData = [
  {
    id: "059349fd-4e03-4183-957a-d928048370bc",
    amount: 31.36,
    description: "Small Concrete Watch",
    date: "23-10-2002",
    category: "Healthcare",
    category_id: 1,
    user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
    category_description: "Medical expenses, insurance premiums, etc.",
  },
  {
    id: "9102a2c7-235a-4dd8-b678-47ae8b5102d2",
    amount: 33.82,
    description: "Aerodynamic Wooden Clock",
    date: "27-05-2003",
    category: "Healthcare",
    category_id: 1,
    user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
    category_description: "Medical expenses, insurance premiums, etc.",
  },
  {
    id: "cbc1b97b-7e24-4e7f-8046-4ae3397ea044",
    amount: 36.39,
    description: "Fantastic Concrete Bag",
    date: "14-08-2003",
    category: "Healthcare",
    category_id: 1,
    user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
    category_description: "Medical expenses, insurance premiums, etc.",
  },
  {
    id: "a221ad73-eb0e-456b-be79-9697838f84ed",
    amount: 27.59,
    description: "Ergonomic Plastic Coat",
    date: "09-04-2004",
    category: "Healthcare",
    category_id: 1,
    user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
    category_description: "Medical expenses, insurance premiums, etc.",
  },
  {
    id: "3eff5a38-7965-4249-8daf-ec5707c83ee1",
    amount: 92.73,
    description: "Rustic Marble Shirt",
    date: "13-06-2004",
    category: "Healthcare",
    category_id: 1,
    user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
    category_description: "Medical expenses, insurance premiums, etc.",
  },
];

export function CategoryGraph() {
  const { authorizationHeader, userId } = useSession();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      from: new Date(),
      to: new Date(),
      category_ids: [],
    },
  });

  // bargraph == overview
  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    console.log(values);
    try {
      setIsPending(true);
      const { from, to, category_ids } = values;
      const FormatedForm = format(from, "yyyy-MM-dd");
      const FormatedTo = format(to, "yyyy-MM-dd");
      const response = await axios.get(
        `http://140.238.227.78:8080/expenses/by_category`,
        {
          params: {
            from: FormatedForm,
            to: FormatedTo,
            user_id: userId,
            category_ids: category_ids,
          },
          headers: {
            Authorization: `Basic ${authorizationHeader}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setIsPending(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-2 mx-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className="self-end border rounded-full mr-8"
          >
            <MoreHorizontal size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto px-4 py-4 mx-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center gap-4 items-center flex-1"
            >
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>From</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>To</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_ids"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Categories</FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                type="submit"
                variant="default"
                className="w-full"
              >
                Apply
              </Button>
            </form>
          </Form>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResponsiveContainer  width="100%" height={400}>
        <LineChart
          width={500}
          height={600}
          data={expenseData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis   dataKey="date" />
          <YAxis />
          {/* @ts-ignore */}
          <Tooltip content={CategoryTooltip} />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#000"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="category" stroke="#000" />
        </LineChart>
      </ResponsiveContainer>
      <Separator className="h-1 mt-6 mb-6" />
    </div>
  );
}
