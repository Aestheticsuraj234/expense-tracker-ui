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
      <Card className="shadow-lg">
        <CardContent>
          <div className="flex items-start justify-center mx-4 my-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-4 justify-start w-full">
                <Badge variant={"outline"}>category - </Badge>
                <h1 className="text-base text-zinc-700 font-bold">{category}</h1>
              </div>
              <div className="flex items-start gap-4 justify-start w-full">
                <Badge variant={"outline"}>amount - </Badge>
                <h1 className="text-base text-zinc-700 font-bold">
                  {currency} {amount}
                  how can  add this things even when no one is watching me
                </h1>
                </div>
                <div className="flex items-start gap-4 justify-start w-full">
                <Badge variant={"outline"}>Date - </Badge>
                <h1 className="text-base text-zinc-700 font-bold">
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
