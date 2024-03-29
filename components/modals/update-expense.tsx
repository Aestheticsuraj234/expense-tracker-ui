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
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface CategoryProps {
  id: number;
  name: string;
  description: string;
}

export const UpdateExpense = () => {
  const { authorizationHeader, userId } = useSession();
  const { categorydata } = useCategory();
  const { type, isOpen, modalData, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isModalOpen = isOpen && type === "EXPENSE_UPDATE";
  const { id, data } = modalData || {}; // Destructure id and data with default value as an empty object

  // TODO: ADD TEXTAREA FOR DESCRIPTION IN MODAL POPUP IN UPDATE & CREATE EXPENSE
  // TODO: ADD INPUT BOX

  useEffect(() => {
    if (data) {
      // Check if data exists
      form.setValue("amount", data.amount.toString() || "0"); // Set default value if data.amount is undefined
      form.setValue("description", data.description || ""); // Set default value if data.description is undefined
      form.setValue("category", data.category || ""); // Set default value if data.category is undefined
      form.setValue("date", new Date(data.date) || new Date()); // Set default value if data.date is undefined
    }
  }, [data]); // Add data as dependency for useEffect

  const form = useForm<Z.infer<typeof UpdateExpenseForm>>({
    resolver: zodResolver(UpdateExpenseForm),
    defaultValues: {
      amount: "0",
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
        id: id,
        amount: amount,
        description,
        category_id: categoryId,
        date: formattedDate,
        user_id: userId,
      };

      // Send the POST request
      const response = await axios.put(
        "https://140.238.227.78:8080/expenses",
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
        router.push("/");
        form.reset();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
      form.reset();
      onClose();
    }
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="truncate px-3"
                              >
                                {field.value
                                  ? field.value.length > 15
                                    ? `${field.value.slice(0, 15)}...`
                                    : field.value
                                  : "Edit Description"}
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-md">
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
                  name="category"
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
                              <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent side="right" className="w-full" position="item-aligned">
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
                        {/* @ts-ignore */}
                        <Popover key={field.value}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[142px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value &&
                                !isNaN(new Date(field.value).getTime()) ? (
                                  format(new Date(field.value), "yyyy-MM-dd")
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
