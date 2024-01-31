import axios from 'axios';
import { create } from 'zustand';

interface Currency {
  name: string;
  symbol: string;
}

interface AllCurrencyStore {
  currencies: Record<string, Currency>;
  selectedCurrencyCode: string;
  setSelectedCurrencyCode: (currencyCode: string) => void;
  fetchAllCurrencies: () => Promise<void>;
}

const AllCurrencyStore = create<AllCurrencyStore>((set) => ({
  currencies: {},
  selectedCurrencyCode: 'USD',
  setSelectedCurrencyCode: (currencyCode) => set({ selectedCurrencyCode: currencyCode }),
  fetchAllCurrencies: async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=currencies');
      const countriesData = response.data;

      const currencies: Record<string, Currency> = {};
      countriesData.forEach((country: any) => {
        const currencyCode = Object.keys(country.currencies)[0];
        if (currencyCode) {
          currencies[currencyCode] = {
            name: country.currencies[currencyCode].name,
            symbol: country.currencies[currencyCode].symbol,
          };
        }
      });

      set({ currencies });
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  },
}));

export const useAllCurrencyStore = AllCurrencyStore;
