import { ExpenseData } from '@/app/(root)/_components/table/column';
import {create} from 'zustand';


// Define the AuthStore interface
interface History {
  data: ExpenseData[] | null;
    setData: (data: ExpenseData[]) => void;
   
  
}

// Create the Zustand store with correct initial state and setter
const History = create<History>((set) => ({
  data: null,
  setData: (data) => set({data}),
}));

export const useHistory = History;


