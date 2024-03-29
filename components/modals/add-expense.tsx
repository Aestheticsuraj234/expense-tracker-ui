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
import { AddExpenseForm } from "@/schema/schema";
import { useSession } from "@/hooks/useSession";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useCategory } from "@/hooks/category/useCategory";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

interface CategoryProps {
  id: number;
  name: string;
  description: string;
}

export const AddExpense = () => {
  const { authorizationHeader, userId } = useSession();
  const { categorydata } = useCategory();
  const { type, isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState<Date | undefined>(new Date());

  const isModalOpen = isOpen && type === "EXPENSE_ADD";
  console.log(categorydata, "categorydata");

  const form = useForm<Z.infer<typeof AddExpenseForm>>({
    resolver: zodResolver(AddExpenseForm),
    defaultValues: {
      amount: "",
      description: "",
      categoryName: "",
      date: new Date(),
    },
  });

  const onSubmit = async (values: Z.infer<typeof AddExpenseForm>) => {
    try {
      setLoading(true);

      const { amount, description, categoryName, date } = values;

      // Find the category by name
      const selectedCategory = categorydata?.find(
        (category) => category.name === categoryName
      );

      if (!selectedCategory) {
        throw new Error("Selected category not found.");
      }

      // Extract the categoryId and format the date
      const categoryId = selectedCategory.id;
      const formattedDate = format(date, "dd-MM-yyyy");

      // Construct the data payload
      const data = {
        amount: Number(amount),
        description,
        category_id: categoryId,
        date: formattedDate,
        user_id: userId,
      };

      // Send the POST request
      const response = await axios.post(
        "https://140.238.227.78:8080/expenses",
        data,
        {
          headers: {
            Authorization: `Basic ${authorizationHeader}`,
            contentType: "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Expense added successfully", {
          icon: "👏",
        });
        form.reset();
      } else {
        throw new Error("Failed to add expense. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      title="Add Expense"
      description="Add your expense details"
      isOpen={isModalOpen}
      onClose={onClose}
      type="EXPENSE_ADD"
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="text-sm">
                                {field.value
                                  ? field.value.length > 15
                                    ? `${field.value.slice(0, 15)}...`
                                    : field.value
                                  : "Description"}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md dark:bg-zinc-800">
                              <DialogHeader>
                                <DialogTitle>Description</DialogTitle>
                              </DialogHeader>
                              <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                  <Textarea
                                    placeholder="Type your description here."
                                    {...field}
                                    className="w-full dark:bg-zinc-700"
                                  />
                                </div>
                              </div>
                              <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Done
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </FormControl>

                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 items-center justify-center gap-4">
                        <FormLabel className="text-right">
                          Category
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

                            <SelectContent
                              side="right"
                              className="dark:bg-zinc-800"
                              position="item-aligned"
                            >
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
                                          className="absolute dark:bg-zinc-600 dark:text-white"
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
                                  "w-[142px] pl-3 text-left font-normal dark:bg-zinc-700",
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
                          <PopoverContent className="w-auto p-0" align="start" >
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
                  className="dark:bg-zinc-700 dark:text-white"
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
