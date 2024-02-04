"use client";
import React, { useState } from "react";
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
} from "recharts";

import toast from "react-hot-toast";
import CustomTooltip from "./custom-tooltip";
import EmptyOverView from "./empty_overview";
import { useCurrency } from "@/hooks/currency/useCurrency";

type expenseData = {
  amount: number;
  category: string;
  category_description: string;
};

export function OverviewGraph() {
  const { authorizationHeader, userId } = useSession();
  const { currency } = useCurrency();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<expenseData[]>([]);
  const form = useForm<z.infer<typeof overviewSchema>>({
    resolver: zodResolver(overviewSchema),
    defaultValues: {
      EndDate: new Date(),
      StartDate: new Date(),
    },
  });

  // bargraph == overview
  const onSubmit = async (values: z.infer<typeof overviewSchema>) => {
    console.log(values);
    try {
      setIsPending(true);
      const { StartDate, EndDate } = values;
      const from = format(StartDate, "yyyy-MM-dd");
      const to = format(EndDate, "yyyy-MM-dd");
      const response = await axios.get(
        `http://140.238.227.78:8080/expenses/by_category?from=${from}&to=${to}&user_id=${userId}`,
        {
          headers: {
            Authorization: `Basic ${authorizationHeader}`,
          },
        }
      );

      console.log(response.data);
      setData(response.data);
      toast.success("Fetched Successfully");
      setIsPending(false);
      form.reset();
    } catch (error) {
      console.log(error);
      setIsPending(false);
      toast.error("Something went wrong!");
      form.reset();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-1 mx-4 ">
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
                name="StartDate"
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
                name="EndDate"
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
      {data.length === 0 ? (
        <EmptyOverView />
      ) : (
        <>
          <Tabs defaultValue="bar-graph" className="w-[100%] mx-4 ">
            <TabsList>
              <TabsTrigger value="bar-graph">Bar Graph</TabsTrigger>
              <TabsTrigger value="line-graph">Line Graph</TabsTrigger>
            </TabsList>
            <TabsContent value="bar-graph">
              <ResponsiveContainer width="100%" height={400}>
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
                  <Bar
                    dataKey="amount"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="line-graph">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  width={500}
                  height={600}
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
                    stroke="#000"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>

          <Separator className="h-1 mt-6 mb-6" />
        </>
      )}
    </div>
  );
}
