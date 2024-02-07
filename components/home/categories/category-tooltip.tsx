import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/hooks/currency/useCurrency";
import { Calendar } from "lucide-react";

// @ts-ignore
const CategoryTooltip = ({ active, payload }) => {
  const { currency } = useCurrency();
  if (active && payload && payload.length) {
    const { category, amount, date, category_description, description } =
      payload[0].payload;

    return (
      <Card className="shadow-lg dark:bg-zinc-800">
        <CardContent>
          <div className="flex items-start justify-center mx-4 my-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-4 justify-start w-full">
                <Badge variant={"outline"} className="dark:bg-zinc-500">category - </Badge>
                <h1 className="text-base text-zinc-700 dark:text-white font-bold">{category}</h1>
              </div>
              <div className="flex items-start gap-4 justify-start w-full">
                <Badge variant={"outline"} className="dark:bg-zinc-500">amount - </Badge>
                <h1 className="text-base text-zinc-700 dark:text-white font-bold">
                  {currency} {amount}
                
                </h1>
                </div>
                <div className="flex items-start gap-4 justify-start w-full">
                <Badge variant={"outline"} className="dark:bg-zinc-500">Date - </Badge>
                <h1 className="text-base text-zinc-700 dark:text-white font-bold">
                   {date}
                </h1>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default CategoryTooltip;
