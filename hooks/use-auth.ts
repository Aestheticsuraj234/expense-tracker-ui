import {create} from 'zustand';


// Define the AuthStore interface
interface AuthStore {
  isLoggedIn: boolean;
  userId: string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsUserId: (userId: string) => void;
}

// Create the Zustand store with correct initial state and setter
const authStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  userId: null,
  setIsLoggedIn: (isLoggedIn) => set({isLoggedIn}),
  setIsUserId: (userId) => set({userId}),
}));

export const useAuthStore = authStore;


