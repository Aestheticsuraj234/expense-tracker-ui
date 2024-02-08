"use client";
import React, { useState , useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { categorySchema } from "@/schema/schema";
import { useSession } from "@/hooks/useSession";
import { useCurrency } from "@/hooks/currency/useCurrency";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";

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
import { Checkbox } from "@/components/ui/checkbox";
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
  Bar,
  BarChart,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip as ToolTipText,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import CategoryTooltip from "./category-tooltip";
import { Input } from "@/components/ui/input";
import MultiselectDropdown from "@/components/ui/multiselect-dropdown";
import EmptyOverView from "../overview/empty_overview";
import { useCategory } from "@/hooks/category/useCategory";
import { useCategoryGraphs } from "@/hooks/use-categoryBar";



export function CategoryGraph() {
  const { authorizationHeader, userId } = useSession();
  const [isPending, setIsPending] = useState(false);
  const {data , setData} = useCategoryGraphs();
  const {categorydata} = useCategory()
  const { currency } = useCurrency();
  const dataRef = useRef<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      from: new Date(),
      to: new Date(),
      category_ids: [],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "category_ids",
  });



  // bargraph == overview
  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      setIsPending(true);
      const { from, to, category_ids } = values;
      // format categoryIds into the comma separated string
      const formattedId = category_ids
        .map((category: any) => category.value)
        .join(",");
      const FormatedForm = format(from, "yyyy-MM-dd");
      const FormatedTo = format(to, "yyyy-MM-dd");
      const response = await axios.get(
        `http://140.238.227.78:8080/expenses`,
        {
          params: {
            from: FormatedForm,
            to: FormatedTo,
            user_id: userId,
            category_ids: formattedId,
          },
          headers: {
            Authorization: `Basic ${authorizationHeader}`,
          },
        }
      );
      if (response.status === 200) {
        setIsPending(false);
        setData(response.data);
        
        console.log(response.data);
        toast.success("Data fetched successfully");
        form.reset();
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setIsPending(false);
      toast.error("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  };

  const numDataPoints = data?.length || 0; // Use optional chaining and fallback to 0 if data is null
  const containerWidth = Math.max(numDataPoints * 60, 1100); // Adjust as needed

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
        <DropdownMenuContent className="w-auto px-4 py-4 mx-10 dark:bg-zinc-800" side="bottom" >
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
                              "w-[240px] pl-3 text-left font-normal dark:bg-zinc-700",
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
                     
                      <PopoverContent className="w-auto " align="start" >
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
                              "w-[240px] pl-3 text-left font-normal dark:bg-zinc-700",
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
                      <PopoverContent className="w-auto p-0" align="center">
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
              <FormField
                control={form.control}
                name="category_ids"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Categories</FormLabel>
                    <MultiselectDropdown
                    // @ts-ignore
                      options={categorydata}
                      name="category_ids"
                      placeholder="Select Your Categories"
                    />
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

      {!data || data?.length === 0 ? (
        <EmptyOverView />
      ) : (
        <>
      <Tabs defaultValue="bar-graph" className="w-[100%] mx-4 ">
        <TabsList className="dark:bg-zinc-800">
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
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${currency}${value}`} />
              {/* @ts-ignore */}
              <Tooltip content={CategoryTooltip} />
              <Legend />
              <Bar
                dataKey="amount"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
                barSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="
                  text-center
                  text-lg
                  font-semibold
                  dark:text-gray-300
                  mt-4
                  mb-4
                
              ">
                    Total Amount: 
                  <span className="bg-emerald-500 ml-3 px-4 py-2 text-white rounded-md">{currency}{data?.reduce((acc, cur) => acc + cur.amount, 0)}</span>
                  </p>
          </div>
        </TabsContent>
        <TabsContent value="line-graph">
        <div className="overflow-auto">
          <ResponsiveContainer width={containerWidth} height={400}>
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
              <XAxis dataKey="date" />
              <YAxis />
              {/* @ts-ignore */}
              <Tooltip content={CategoryTooltip} />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#888888"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="category" stroke="#888" />
            </LineChart>
          </ResponsiveContainer>
          <p className="
                  text-center
                  text-lg
                  font-semibold
                  dark:text-gray-300
                  mt-4
                  mb-4
                
              ">
                    Total Amount: 
                  <span className="bg-emerald-500 ml-3 px-4 py-2 text-white rounded-md">{currency}{data?.reduce((acc, cur) => acc + cur.amount, 0)}</span>
                  </p>
          </div>
        </TabsContent>
      </Tabs>
      </>
      )}
    </div>
  );
}
