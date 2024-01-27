import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, PlusCircleIcon } from "lucide-react";
import axios from "axios";
import { useSession } from "@/hooks/useSession";
import { ExpenseData, columns } from "../_components/table/column";
import { DataTable } from "../_components/table/data-table";
import ExpenseTable from "@/components/global/expense-table";

const Home = async () => {
  return (
    <main className="px-4 py-4 w-full flex">
      <Tabs defaultValue="overview" className="w-full">
        <div className="inline-flex justify-between items-center w-full  space-x-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <Button variant={"default"} size={"default"} className="space-x-2" >
            <PlusCircleIcon size={24} />
            Add Expense
          </Button>
        </div>
        <TabsContent value="overview">
          Overview of your expense here.
        </TabsContent>
        <TabsContent value="categories">
          Categories of your expense here.
        </TabsContent>
        <TabsContent value="history">
          <Card className="shadow-md w-[72rem]">
            <CardHeader>
              <CardTitle>Your All Expenses💰</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {/* <DataTable columns={columns} data={data} /> */}
              <ExpenseTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Home;
