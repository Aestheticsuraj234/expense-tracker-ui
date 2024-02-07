import {create} from 'zustand';


// Define the AuthStore interface
interface CategoryGraphs {
  data: any;
    setData: (data: any) => void;
  
}

// Create the Zustand store with correct initial state and setter
const CategoryGraphs = create<CategoryGraphs>((set) => ({
  data: null,
  setData: (data) => set({data}),
}));

export const useCategoryGraphs = CategoryGraphs;


