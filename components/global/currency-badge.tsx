"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useCurrencyStore } from "@/hooks/currency/use-currency";
import { useCurrency } from "@/hooks/currency/useCurrency";

const CurencyBadge = () => {
  const { currency } = useCurrency();

  if (currency !== null && currency !== undefined && currency !== "") {
    return (
      <Button
        variant={"outline"}
        size={"default"}
        className="flex justify-center items-center gap-2"
      >
        <span className="text-base">{currency}</span>
      </Button>
    );
  } else {
    // You can customize what to return when currency is null
    return (
      null
    );
  }
};

export default CurencyBadge;
