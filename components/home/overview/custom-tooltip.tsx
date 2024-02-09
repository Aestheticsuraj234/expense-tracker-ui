import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/hooks/currency/useCurrency";

// @ts-ignore
const CustomTooltip = ({ active, payload }) => {
  const {currency}  = useCurrency();
    if (active && payload && payload.length) {
      const { category, amount, description } = payload[0].payload;
  
      return (
        <Card className="rounded-md">
          <CardContent className="dark:bg-zinc-800">
            <div className="flex justify-between md:flex-row flex-col items-center md:space-x-5 px-2 py-4">
              <div className="flex flex-col justify-start items-start ">
                <h3 className="md:text-xl text-sm font-bold text-zinc-600 dark:text-white">{category}</h3>
              </div>
              <h1 className="md:text-3xl text-lg ml-3 font-semibold text-emerald-600">
                {currency}{amount}
              </h1>
            </div>
          </CardContent>
        </Card>
      );
    }
  
    return null;
  };

export default CustomTooltip;