"use client";
import { useEffect } from "react";
import { useSession } from "../useSession";
import { useCurrencyStore } from "./use-currency";
import axios from "axios";

interface CurrencyProps {
  id: string;
  symbol: string;
  user_id: string;
}

export const useCurrency = () => {
  const { authorizationHeader, userId } = useSession();
  const { currency, setCurrency } = useCurrencyStore();
  // wanted to fetch the currency for the current user from the backend if the currency is not set then wanted to show modal to set the currency!

  const fetchCurrency = async () => {
    const currency = await axios.get<CurrencyProps>(
      `http://140.238.227.78:8080/currencies/${userId}`,
      {
        headers: {
          Authorization: `Basic ${authorizationHeader}`,
        },
      }
    );
    if (currency.status === 404) {
      setCurrency("");
    } else {
      setCurrency(currency.data.symbol);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchCurrency();
    }
  }, [currency]);

  return {
    currency,
  };
};
