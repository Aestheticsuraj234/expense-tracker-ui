import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

// @ts-ignore
const CategoryTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, amount, date, category_description, description } =
      payload[0].payload;

    return (
      <Card className="shadow-lg">
        <CardContent>
          <div className="flex justify-between items-center space-x-5 px-2 py-4">
            <div className="flex flex-col justify-start items-start ">
              <h3 className="text-xl font-bold text-zinc-600">{category}</h3>
              <h3 className="text-lg font-semibold text-pink-500">
                {description}
              </h3>
              <p className="text-base text-muted-foreground mt-2 flex gap-2 justify-center items-center">
                <Calendar className="h-4 w-4" />
                {date}
                </p>
              <p className="text-sm text-muted-foreground">
                {category_description}
              </p>
            </div>
            <div className="px-4 py-4 h-20 w-20 border rounded-full flex justify-center items-center bg-emerald-600/20">
            <h1 className="text-xl  font-semibold text-emerald-600">
              ${amount}
            </h1>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default CategoryTooltip;
