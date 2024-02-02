import axios from "axios";
import { create } from "zustand";

interface CategoryProps {
    id: number,
    name: string,
    description: string,
}

interface CategoryStore {
  category: CategoryProps[] | null;
  setCategory: (category: CategoryProps[] | null) => void;
}

const CategoryStore = create<CategoryStore>((set) => ({
  category: null,
  setCategory: (category) => set({ category }),
}));

export const useCategoryStore = CategoryStore;
