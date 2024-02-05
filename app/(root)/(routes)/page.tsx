"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircleIcon } from "lucide-react";
import ExpenseTable from "@/components/global/expense-table";
import { useStoreModal } from "@/hooks/use-store-modal";
import { OverviewGraph } from "@/components/home/overview/overview";
import { CategoryGraph } from "@/components/home/categories/category-graph";
import { useRouter } from "next/navigation";

import { useCurrency } from "@/hooks/currency/useCurrency";
import CheckboxList from "@/components/test";

const Home = () => {
  const { onOpen } = useStoreModal();

  const router = useRouter();
  const { currency } = useCurrency();

  if (currency === null) {
    router.push("/add-currency");
  }
 

  return (
    <main className="px-4 py-4 w-full flex">
      <Tabs defaultValue="overview" className="w-full">
        <div className="inline-flex justify-between items-center w-full  space-x-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => onOpen("EXPENSE_ADD")}
            variant={"default"}
            size={"default"}
            className="space-x-2"
          >
            <PlusCircleIcon size={24} />
            Add Expense
          </Button>
        </div>
        <TabsContent value="overview">
          <div className="mt-16">
            <OverviewGraph />
          </div>
        </TabsContent>
        <TabsContent value="categories">
          <div className="mt-16">
            <CategoryGraph />
            {/* <CheckboxList /> */}
          </div>
        </TabsContent>
        <TabsContent value="history">
          <Card className="shadow-md w-[72rem]">
            <CardHeader>
              <CardTitle>Your All Expenses</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ExpenseTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Home;
