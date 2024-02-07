import {create} from 'zustand';


// Define the AuthStore interface
interface OverViewStore {
  data: any;
    setData: (data: any) => void;
  
}

// Create the Zustand store with correct initial state and setter
const overViewStore = create<OverViewStore>((set) => ({
  data: null,
  setData: (data) => set({data}),
}));

export const useOverViewStore = overViewStore;


