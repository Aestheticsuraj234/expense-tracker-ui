"use client";
import { useEffect } from "react";
import { useSession } from "../useSession";
import axios from "axios";
import { useCurrencyStore } from "./use-currency";

interface CurrencyProps {
  id: string;
  symbol: string;
  user_id: string;
}

export const useCurrency = () => {
  const { authorizationHeader, userId } = useSession();
  const { currency, setCurrency,id,setCurrencyId } = useCurrencyStore();
  // wanted to fetch the currency for the current user from the backend if the currency is not set then wanted to show modal to set the currency!

  const fetchCurrency = async () => {
    const currency = await axios.get<CurrencyProps>(
      `https://140.238.227.78:8080/currencies/${userId}`,
      {
        headers: {
          Authorization: `Basic ${authorizationHeader}`,
        },
      }
    );
    console.log(currency.data);
    setCurrency(currency.data.symbol);
    setCurrencyId(currency.data.id);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchCurrency();
    }
  }, [currency, id]);

  return {
    currency,
    id,
  };
};
