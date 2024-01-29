"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const data = [
  {"category": "Recreation", "description": "Hobbies, subscription, etc.", "amount": 3875.0},
  {"category": "Transportation", "description": "Fuel, maintenance, public transit, etc.", "amount": 4105.0},
  {"category": "Savings", "description": "Emergency fund, retirement savings, etc.", "amount": 4176.0},
  {"category": "Home Maintenance", "description": "Repairs, cleaning supplies, etc.", "amount": 4231.0},
  {"category": "Healthcare", "description": "Medical expenses, insurance premiums, etc.", "amount": 4277.0},
  {"category": "Debt Payments", "description": "Credit cards, loans, etc.", "amount": 4285.0},
  {"category": "Gifts/Donations", "description": "Presents, charitable contributions, etc.", "amount": 4499.0},
  {"category": "Clothing and Personal Items", "description": "Apparel, toiletries, etc.", "amount": 4615.0},
  {"category": "Education", "description": "Tuition, books, supplies, etc.", "amount": 4774.0},
  {"category": "Other", "description": "nothing", "amount": 5444.0},
  {"category": "Communication", "description": "Phone bills, internet, etc.", "amount": 5963.0}
];

export function OverviewGraph() {
  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <XAxis dataKey="category" />
        <YAxis />
        {/* @ts-ignore */}
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#000" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    <div className='mt-10 flex justify-between items-center flex-row w-full mx-2  '>

    </div>
    </>
  );
}
// @ts-ignore
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, amount, description } = payload[0].payload;

    return (
      <Card>
        <CardContent>
          <div className="flex justify-between items-center space-x-5 px-2 py-4">
            <div className='flex flex-col justify-start items-start '>
              <h3 className='text-xl font-bold text-zinc-600'>{category}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <h1 className='text-3xl ml-3 font-semibold text-emerald-600'>₹{amount}</h1>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
