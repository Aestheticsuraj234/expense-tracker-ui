import axios from "axios";
import { create } from "zustand";

interface CategoryProps {
    id: number,
    name: string,
    description: string,
}

interface CategoryStore {
  categorydata: CategoryProps[] | null;
  setCategory: (categorydata: CategoryProps[] | null) => void;
}

const CategoryStore = create<CategoryStore>((set) => ({
  categorydata: null,
  setCategory: (categorydata) => set({ categorydata }),
}));

export const useCategoryStore = CategoryStore;
