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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface CategoryProps {
  id: number;
  name: string;
  description: string;
}

export const AddExpense = () => {
  const { authorizationHeader } = useSession();
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryProps[]>();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const fetchCategory = async () => {
    const res = await axios.get("http://localhost:8080/categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authorizationHeader}`,
      },
    });
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const form = useForm<Z.infer<typeof AddExpenseForm>>({
    resolver: zodResolver(AddExpenseForm),
    defaultValues: {
      description: "",
      amount: 0,
      category_id: 0,
      date: "",
    },
  });

  const onSubmit = async (values: Z.infer<typeof AddExpenseForm>) => {
    try {
      setLoading(true);

      // Create a lookup map for categories
      const categoryLookup: Record<string, number> = categories?.reduce(
        (acc, category) => {
          acc[category.name] = category.id;
          return acc;
        },
        {}
      );

      // Map the selected category name to its ID
      const categoryId = categoryLookup[values.category_id];

      // Assign the category ID to the form data
      values.category_id = categoryId;

      const response = await axios.post("http://localhost:8080/expenses", {
        values,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authorizationHeader}`,
        },
      });
      console.log(response.data);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong❌");
    } finally {
      setLoading(false);
      storeModal.onClose();
    }
  };

  return (
    <Modal
      title="Add Expense"
      description="Add your expense details"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
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
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 items-center justify-center gap-4">
                        <FormLabel className="text-right">Category</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger className="w-[144px]">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories &&
                                categories?.map((category) => (
                                  <SelectItem
                                    key={category?.id}
                                    value={category?.id}
                                  >
                                    {category?.id}
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
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                          />
                        </FormControl>

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
                  onClick={storeModal.onClose}
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
