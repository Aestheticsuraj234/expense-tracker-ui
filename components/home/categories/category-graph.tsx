"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { overviewSchema } from "@/schema/schema";
import { useSession } from "@/hooks/useSession";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CalendarIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import toast from "react-hot-toast";
import CustomTooltip from "../overview/custom-tooltip";

const expenseData =[
    {
        id: "3a1388dc-d585-427a-a658-95909bb99351",
        amount: 76.45,
        description: "Awesome Cotton Chair",
        date: "06-07-1959",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "70cab881-54f9-4429-9f9e-bf3363111dfe",
        amount: 74.02,
        description: "Durable Concrete Bag",
        date: "19-11-1960",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "b1a6ff83-82c7-49eb-8d82-bd40c2ac47b9",
        amount: 61.63,
        description: "Mediocre Bronze Keyboard",
        date: "23-11-1960",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "0c6178f6-04cc-479a-b044-428a07417a36",
        amount: 5.7,
        description: "Lightweight Paper Bottle",
        date: "19-06-1961",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "bca736c3-f64b-4e06-85db-813e7b501523",
        amount: 14.89,
        description: "Durable Bronze Bag",
        date: "03-07-1961",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "da3958f1-0503-4e54-b428-7e6605996218",
        amount: 93.37,
        description: "Ergonomic Iron Keyboard",
        date: "25-12-1961",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "9aec063d-b64e-494a-800a-a2280b31d052",
        amount: 70.43,
        description: "Synergistic Steel Car",
        date: "31-01-1962",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "7bf9d41c-68bc-424d-ab4d-a79bbdad6831",
        amount: 25.89,
        description: "Durable Rubber Lamp",
        date: "21-04-1963",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "462f6c9a-14bb-49aa-a426-b80c410865d0",
        amount: 90.23,
        description: "Durable Silk Watch",
        date: "20-05-1963",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "c571540b-83eb-4557-889e-c387fb21d9b5",
        amount: 23.23,
        description: "Aerodynamic Wool Shirt",
        date: "10-05-1964",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "547b1e7d-dfae-420e-a18a-96785f83a0e3",
        amount: 29.63,
        description: "Rustic Granite Knife",
        date: "15-10-1964",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "aaeb6f04-774d-46ef-85ac-3e488770cbea",
        amount: 45.89,
        description: "Ergonomic Marble Gloves",
        date: "24-08-1965",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "8a3f94c4-7e33-4ad0-a2c4-d6561d2136eb",
        amount: 97.66,
        description: "Heavy Duty Concrete Keyboard",
        date: "01-10-1965",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "d8f56a22-b584-45f6-92b6-1e50883da9bd",
        amount: 5.38,
        description: "Synergistic Wooden Gloves",
        date: "06-04-1966",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "04bb9f9b-e923-4612-8cb5-d3ce7a6e7e5b",
        amount: 34.74,
        description: "Lightweight Granite Chair",
        date: "28-06-1966",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "ca91fe77-3adc-47a8-ba5c-b0a1cd2730b6",
        amount: 88.57,
        description: "Small Wool Coat",
        date: "10-09-1966",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "23e76c2d-4066-4e8e-a27e-4198e46cfb76",
        amount: 30.73,
        description: "Rustic Bronze Table",
        date: "08-04-1968",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "2c47a347-6a25-4649-8fe3-dc054d54a257",
        amount: 85.16,
        description: "Rustic Leather Chair",
        date: "07-08-1968",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "3bc125ba-ef69-4c9e-8676-784d2419ff59",
        amount: 6.94,
        description: "Mediocre Wooden Table",
        date: "12-08-1968",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "6a9cb7ea-6833-4028-ac59-8c32b02a3dff",
        amount: 23.01,
        description: "Synergistic Silk Shirt",
        date: "04-09-1968",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "357cf7d6-787b-4c2f-a196-54f83213ddff",
        amount: 81.98,
        description: "Aerodynamic Steel Chair",
        date: "17-07-1971",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "af0a2155-d39f-4e21-a4fc-adc9ed7f6591",
        amount: 94.42,
        description: "Aerodynamic Granite Bottle",
        date: "08-11-1971",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "97b28d72-90f4-43f1-a3f7-9d94635e6b22",
        amount: 9.65,
        description: "Rustic Granite Plate",
        date: "22-07-1972",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "ec14cbe0-bc02-468e-a5e6-7b7483ea0001",
        amount: 30.87,
        description: "Practical Wool Car",
        date: "22-08-1972",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "15fa2c4e-8677-490a-9e4f-0ca95e8e5296",
        amount: 61.73,
        description: "Aerodynamic Silk Gloves",
        date: "27-08-1972",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "b50046d6-c497-48bf-bedd-cce57fd0c66a",
        amount: 2.7,
        description: "Ergonomic Rubber Hat",
        date: "25-09-1972",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "9953379a-fd5c-4b21-a21c-65d6b27ba5b1",
        amount: 42.83,
        description: "Rustic Bronze Wallet",
        date: "07-10-1972",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "8ff252d2-36ee-4906-9d0a-5d3a8f9e9f77",
        amount: 53.48,
        description: "Sleek Copper Knife",
        date: "13-04-1973",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "a3e21649-20cf-4422-a119-aae1a980806c",
        amount: 40.62,
        description: "Heavy Duty Marble Bag",
        date: "11-12-1973",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "67a96fa1-9ae8-4a79-b19c-0808a43ea4ca",
        amount: 66.32,
        description: "Aerodynamic Rubber Keyboard",
        date: "12-06-1974",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "d88423e5-5b38-4c8d-87b9-aa2324d286e9",
        amount: 44.72,
        description: "Sleek Bronze Shoes",
        date: "21-04-1975",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "9038b70b-9641-41c3-bf2d-11f50ca8266a",
        amount: 2.2,
        description: "Synergistic Plastic Clock",
        date: "14-06-1975",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "9b6715a2-f872-4688-a73d-fc7783d13820",
        amount: 69.48,
        description: "Small Linen Chair",
        date: "31-08-1975",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "3e324d02-ab96-428c-b660-4c36a97d04c6",
        amount: 68.89,
        description: "Aerodynamic Leather Pants",
        date: "10-09-1975",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "402b717b-a407-427d-be2c-7e6ff9ffc329",
        amount: 70.31,
        description: "Lightweight Granite Bag",
        date: "20-01-1976",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "ab1e466a-3fa2-405c-8716-74cb7d20276b",
        amount: 81.83,
        description: "Incredible Concrete Computer",
        date: "02-02-1976",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "77b30126-2913-4a63-94a5-65c2f16f18c8",
        amount: 50.52,
        description: "Synergistic Marble Bag",
        date: "21-05-1976",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "588401f1-c53d-4a35-8fb2-dcf1ec098978",
        amount: 95.11,
        description: "Aerodynamic Cotton Clock",
        date: "11-03-1978",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "3826ae7f-6bee-4b31-8e88-944ad069a31d",
        amount: 93.9,
        description: "Practical Cotton Car",
        date: "07-06-1978",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "073e12fc-3f25-47bc-9d7c-8451bf7c3428",
        amount: 0.95,
        description: "Incredible Plastic Car",
        date: "07-03-1981",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "a40b7ec7-4a59-4174-b779-d41510186ebc",
        amount: 13.29,
        description: "Gorgeous Wooden Gloves",
        date: "08-06-1981",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "834f24f8-76bc-4661-80f1-16a3fa2630fe",
        amount: 43.38,
        description: "Durable Silk Shoes",
        date: "18-06-1981",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "53df3861-bc21-4545-92e6-0f5a5951461a",
        amount: 36.68,
        description: "Aerodynamic Plastic Coat",
        date: "30-01-1982",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "bc43ba3f-c941-49b4-8016-83e8d41b794c",
        amount: 54.53,
        description: "Lightweight Silk Clock",
        date: "25-02-1982",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "5d667d35-0f6e-4887-8d6d-60625baa4f46",
        amount: 84.77,
        description: "Rustic Plastic Hat",
        date: "14-02-1983",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "be564cfa-c351-466d-be1a-28f99ff9c39a",
        amount: 32.3,
        description: "Ergonomic Copper Shirt",
        date: "18-03-1983",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "57d043f7-818b-4dd1-8ef4-883cb8f45865",
        amount: 74.98,
        description: "Ergonomic Paper Bottle",
        date: "01-05-1983",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "afd3f529-7692-43c3-b28e-5a26c2a3d581",
        amount: 34.63,
        description: "Aerodynamic Silk Hat",
        date: "09-03-1984",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "9fea3933-7f7d-45d1-8c8c-57984d1e28e9",
        amount: 39.03,
        description: "Sleek Aluminum Keyboard",
        date: "13-02-1985",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "dd46803d-fe23-470d-8ed2-b11e5c37c334",
        amount: 59.86,
        description: "Aerodynamic Marble Bench",
        date: "22-10-1985",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "cd868641-a7e4-4492-bf5b-8f700f0e9878",
        amount: 79.44,
        description: "Gorgeous Leather Bag",
        date: "30-03-1986",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "d8f1278a-132d-4144-bd7a-f2487b53225f",
        amount: 22.07,
        description: "Rustic Wooden Shirt",
        date: "19-02-1987",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "d20478ef-06cd-44f6-8770-95929c0b5a3b",
        amount: 35.42,
        description: "Fantastic Granite Pants",
        date: "14-09-1987",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "60116ef8-879e-4180-bda9-f20de2ef9022",
        amount: 78.57,
        description: "Practical Bronze Coat",
        date: "09-12-1989",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "6e49018d-ea42-489c-ae97-0abb9ad431d9",
        amount: 50.76,
        description: "Sleek Wool Table",
        date: "22-02-1990",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "e083bd41-b7e9-40b0-b6f0-6f2c30d3701c",
        amount: 69.85,
        description: "Ergonomic Plastic Knife",
        date: "30-05-1990",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "fbd6f63e-0251-4d38-88ad-19ad6b75645b",
        amount: 22.32,
        description: "Practical Wool Pants",
        date: "22-09-1990",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "ec284cda-6699-4f56-b363-a9514af6a62b",
        amount: 55.57,
        description: "Enormous Leather Gloves",
        date: "16-11-1990",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "06197ab9-991d-4157-9a6b-ae3de60ebad5",
        amount: 60.27,
        description: "Intelligent Wooden Gloves",
        date: "13-04-1991",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "4ac11d0c-e11e-476d-9ee2-10042f3d700a",
        amount: 26.82,
        description: "Incredible Marble Hat",
        date: "06-02-1992",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "a7205da1-6565-46e6-b589-cd65120a0d50",
        amount: 76.86,
        description: "Fantastic Plastic Clock",
        date: "04-02-1993",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "ed7ffdf1-123b-4de5-a9da-7ab148281c83",
        amount: 92.98,
        description: "Ergonomic Granite Chair",
        date: "09-01-1994",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "4148bc59-a0e4-4daa-b4f5-0c2006ee0f82",
        amount: 91.47,
        description: "Ergonomic Bronze Wallet",
        date: "05-02-1994",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "79074a40-575b-4634-a90c-450692262f5e",
        amount: 54.7,
        description: "Lightweight Wooden Computer",
        date: "16-09-1994",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "122c654e-2cee-4138-80b1-3f95647994cc",
        amount: 6.97,
        description: "Ergonomic Copper Pants",
        date: "16-09-1995",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "1aa1de7b-9900-469e-9de0-d1a4dce0b2e7",
        amount: 98.0,
        description: "Mediocre Paper Bottle",
        date: "30-12-1995",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "3767f247-a172-4cbb-89bb-2d81d54efd3c",
        amount: 17.8,
        description: "Rustic Copper Shirt",
        date: "31-03-1996",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "a7e9027a-f612-4a80-a0cc-5b00a555c4f7",
        amount: 19.39,
        description: "Rustic Rubber Bag",
        date: "22-11-1996",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "9f905e08-3378-489a-8781-2855c27e830d",
        amount: 2.89,
        description: "Awesome Marble Computer",
        date: "11-01-1997",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "670940c9-4043-4f27-bcf6-f8e11d3676fc",
        amount: 40.07,
        description: "Synergistic Linen Bag",
        date: "21-06-1997",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "a85c06b7-7ccd-42c6-a665-b0cc3f8beaf1",
        amount: 34.41,
        description: "Awesome Rubber Keyboard",
        date: "08-08-1998",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "9ff75336-01b9-438c-87e3-51586465bcb0",
        amount: 36.93,
        description: "Enormous Silk Table",
        date: "04-03-1999",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "e58f0c50-91a3-41e7-9e38-80e8279665e4",
        amount: 99.11,
        description: "Fantastic Wooden Hat",
        date: "09-03-1999",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "eb50de97-9be3-4f11-91d2-132a7dc2dafe",
        amount: 72.53,
        description: "Practical Aluminum Watch",
        date: "23-03-1999",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "8f298c48-47a3-413e-adf1-9fc26603e91a",
        amount: 46.26,
        description: "Mediocre Cotton Coat",
        date: "24-01-2000",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "61f1fbee-fe1d-4f55-8863-87ee57949910",
        amount: 38.94,
        description: "Enormous Wool Hat",
        date: "21-09-2000",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "fc4bf481-6bc4-4b37-b7f7-f659cee12952",
        amount: 12.22,
        description: "Incredible Wool Lamp",
        date: "29-03-2001",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "2e625636-ec42-486d-b942-d6f14e92b608",
        amount: 50.04,
        description: "Durable Linen Bench",
        date: "20-12-2001",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "d8eb0c04-8246-490d-adcc-53bbca866351",
        amount: 99.6,
        description: "Mediocre Aluminum Keyboard",
        date: "22-09-2002",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "059349fd-4e03-4183-957a-d928048370bc",
        amount: 31.36,
        description: "Small Concrete Watch",
        date: "23-10-2002",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "9102a2c7-235a-4dd8-b678-47ae8b5102d2",
        amount: 33.82,
        description: "Aerodynamic Wooden Clock",
        date: "27-05-2003",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "cbc1b97b-7e24-4e7f-8046-4ae3397ea044",
        amount: 36.39,
        description: "Fantastic Concrete Bag",
        date: "14-08-2003",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "a221ad73-eb0e-456b-be79-9697838f84ed",
        amount: 27.59,
        description: "Ergonomic Plastic Coat",
        date: "09-04-2004",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    },
    {
        id: "3eff5a38-7965-4249-8daf-ec5707c83ee1",
        amount: 92.73,
        description: "Rustic Marble Shirt",
        date: "13-06-2004",
        category: "Healthcare",
        category_id: 1,
        user_id: "45ea72f9-162c-460d-b154-2f9fc37c8dab",
        category_description: "Medical expenses, insurance premiums, etc."
    }
]

export function CategoryGraph() {
  const { authorizationHeader, userId } = useSession();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);
  const form = useForm<z.infer<typeof overviewSchema>>({
    resolver: zodResolver(overviewSchema),
    defaultValues: {
      EndDate: new Date(),
      StartDate: new Date(),
    },
  });

  // bargraph == overview
  const onSubmit = async (values: z.infer<typeof overviewSchema>) => {
    console.log(values);
    try {
      setIsPending(true);
      const { StartDate, EndDate } = values;
      const from = format(StartDate, "yyyy-MM-dd");
      const to = format(EndDate, "yyyy-MM-dd");
      const response = await axios.get(
        "http://140.238.227.78:8080/expenses/by_category?from=1959-01-24&to=2005-12-02&user_id=45ea72f9-162c-460d-b154-2f9fc37c8dab"
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setIsPending(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-2 mx-4 ">
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className="self-end border rounded-full mr-8"
          >
            <MoreHorizontal size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto px-4 py-4 mx-10">
        <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-4 items-center flex-1"
        >
          <FormField
            control={form.control}
            name="StartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
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
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="EndDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
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
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" variant="default" className="w-full">
            Apply
          </Button>
        </form>
      </Form>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={expenseData}
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
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="date" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <Separator className="h-1 mt-6 mb-6" />

     
    </div>
  );
}


