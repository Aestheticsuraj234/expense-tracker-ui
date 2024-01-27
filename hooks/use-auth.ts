import {create} from 'zustand';


// Define the AuthStore interface
interface AuthStore {
  isLoggedIn: boolean;
  userId: string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsUserId: (userId: string) => void;
  fullName: string | null;
  setFullName: (fullName: string|null) => void;
  authorizationHeader: string | null;
  setAuthorizationHeader: (authorizationHeader: string|null) => void;
  
}

// Create the Zustand store with correct initial state and setter
const authStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  userId: null,
  fullName: null,
  setIsLoggedIn: (isLoggedIn) => set({isLoggedIn}),
  setIsUserId: (userId) => set({userId}),
  setFullName: (fullName:string|null) => set({fullName}),
  authorizationHeader: null,
  setAuthorizationHeader: (authorizationHeader:string|null) => set({authorizationHeader}),
}));

export const useAuthStore = authStore;


