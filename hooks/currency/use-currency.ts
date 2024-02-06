import axios from "axios";
import { create } from "zustand";

interface CurrencyStore {
  id: string;
  currency: string | null;
  setCurrency: (currency: string) => void;
  setCurrencyId: (id: string) => void;
}

const currencyStore = create<CurrencyStore>((set) => ({
  currency: "",
  setCurrency: (currency) => set({ currency }),
  id: "",
  setCurrencyId: (id) => set({ id }),
}));

export const useCurrencyStore = currencyStore;
