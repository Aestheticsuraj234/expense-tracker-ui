"use client";
import React, { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { overviewSchema } from "@/schema/schema";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Text,
} from "recharts";

import toast from "react-hot-toast";
import CustomTooltip from "./custom-tooltip";
import EmptyOverView from "./empty_overview";
import { useCurrency } from "@/hooks/currency/useCurrency";
import { useOverViewStore } from "@/hooks/use-overview";

type expenseData = {
  amount: number;
  category: string;
  category_description: string;
};

export function OverviewGraph() {
  const { authorizationHeader, userId } = useSession();
  const dataRef = useRef<expenseData[]>([]);
  const { currency } = useCurrency();
  const [isPending, setIsPending] = useState(false);
  const { data, setData } = useOverViewStore();

  const form = useForm<z.infer<typeof overviewSchema>>({
    resolver: zodResolver(overviewSchema),
    defaultValues: {
      EndDate: new Date(),
      StartDate: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof overviewSchema>) => {
    try {
      setIsPending(true);
      const { StartDate, EndDate } = values;
      const from = format(StartDate, "yyyy-MM-dd");
      const to = format(EndDate, "yyyy-MM-dd");
      const response = await axios.get(
        `https://140.238.227.78:8080/expenses/by_category?from=${from}&to=${to}&user_id=${userId}`,
        {
          headers: {
            Authorization: `Basic ${authorizationHeader}`,
          },
        }
      );

      const fetchedData = response.data;
      setData(fetchedData); // Update state with fetched data
      dataRef.current = fetchedData; // Update dataRef
      toast.success("Fetched Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  };

  const numDataPoints = data?.length || 0; // Use optional chaining and fallback to 0 if data is null
  const containerWidth = Math.max(numDataPoints * 60, 1100); // Adjust as needed

  return (
    <div className="flex flex-col  md:items-center justify-between">
      {!data || data.length === 0 ? (
        <EmptyOverView />
      ) : (
        <>
          <Tabs defaultValue="bar-graph" className="flex-1 md:mx-4 mx-1 w-full">
            <TabsList className="dark:bg-zinc-800 mb-5">
              <TabsTrigger value="bar-graph">Bar Graph</TabsTrigger>
              <TabsTrigger value="line-graph">Line Graph</TabsTrigger>
            </TabsList>
            <TabsContent value="bar-graph">
              <div className="overflow-auto">
                <ResponsiveContainer width={containerWidth} height={400}>
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
  dataKey="category"
  stroke="#888888"
  fontSize={12}
  tickLine={false}
  interval={0}
  angle={0}
  dy={10}
  dx={0}
  
/>



                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={(value) => `${currency}${value}`}
                    />
                    {/* @ts-ignore */}
                    <Tooltip content={CustomTooltip}  />

                    <Bar
                    overflow={"visible"}
                      dataKey="amount"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                      barSize={60}
                    
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-lg font-semibold dark:text-gray-300 mt-4 mb-4">
  Total Amount:{" "}
  <span className="bg-emerald-500 ml-3 px-4 py-2 text-white rounded-md">
    {currency}
    {data.reduce((acc: number, cur: any) => acc + cur.amount, 0).toFixed(2)}
  </span>
</p>

            </TabsContent>
            <TabsContent value="line-graph">
              <div className="overflow-auto">
                <ResponsiveContainer width={containerWidth} height={400}>
                  <LineChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="category"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={(value) => `${currency}${value}`}
                    />
                    {/* @ts-ignore */}
                    <Tooltip content={CustomTooltip} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#888888"
                      fill="#000"
                      opacity={1}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-lg font-semibold dark:text-gray-300 mt-4 mb-4">
  Total Amount:{" "}
  <span className="bg-emerald-500 ml-3 px-4 py-2 text-white rounded-md">
    {currency}
    {data.reduce((acc: number, cur: any) => acc + cur.amount, 0).toFixed(2)}
  </span>
</p>
            </TabsContent>
          </Tabs>

          <Separator className="h-1 mt-6 mb-6" />
        </>
      )}
      <div className="fixed bottom-4 md:right-2 left-2 z-50  mr-auto  md:mb-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              size="icon"
              className="self-end border rounded-full mr-8 shadow-md"
            >
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto px-4 py-4 mx-10 dark:bg-zinc-800">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center gap-4 items-center flex-1"
              >
                <div className="flex md:flex-col flex-row justify-center items-center gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="StartDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>From</FormLabel>
                          {/* @ts-ignore */}
                          <Popover key={field.value}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "md:w-[240px] w-[120px] pl-3 text-left font-normal dark:bg-zinc-700",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "yyyy-MM-dd")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto md:flex hidden h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto dark:bg-zinc-800"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={field.value}
                                onSelect={field.onChange}
                                fromYear={1960}
                                toYear={2030}
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="EndDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>To</FormLabel>
                          {/* @ts-ignore */}
                          <Popover key={field.value}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "md:w-[240px] w-[120px] pl-3 text-left font-normal dark:bg-zinc-700",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "yyyy-MM-dd")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto md:flex hidden h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={field.value}
                                onSelect={field.onChange}
                                fromYear={1960}
                                toYear={2030}
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
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
      </div>
    </div>
  );
}








