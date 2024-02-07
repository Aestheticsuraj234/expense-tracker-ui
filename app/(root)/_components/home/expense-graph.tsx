"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const months = ["jan","feb","Sep", "Oct", "Nov", "Dec"];
const data = Array(10).fill({}).map(() => ({
  name: months[Math.floor(Math.random() * months.length)],
  total: Math.floor(Math.random() * 5000) + 1000,
}));


export function ExpenseGraph() {

const numDataPoints = data.length;
  const containerWidth = Math.max(numDataPoints * 60, 1100); // Adjust as needed

  return (
    <div className="overflow-auto">
      <ResponsiveContainer width={containerWidth} height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            g1={0}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
            barSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}