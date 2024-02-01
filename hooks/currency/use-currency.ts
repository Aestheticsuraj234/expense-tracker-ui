import axios from "axios";
import { create } from "zustand";

interface CurrencyStore {
  currency: string | null;
  setCurrency: (currency: string) => void;
}

const currencyStore = create<CurrencyStore>((set) => ({
  currency: "",
  setCurrency: (currency) => set({ currency }),
}));

export const useCurrencyStore = currencyStore;
