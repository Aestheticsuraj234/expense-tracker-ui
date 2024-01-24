import {create} from 'zustand';
import { useStore } from 'zustand';

// Define the AuthStore interface
interface AuthStore {
  isLoggedIn: boolean;
  userId: string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// Create the Zustand store with correct initial state and setter
const authStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  userId: null,
  setIsLoggedIn: (isLoggedIn: boolean) => {
    set({ isLoggedIn });
    if (typeof window !== 'undefined') {
      const user_id = sessionStorage.getItem('user_id');
      set({ userId: user_id });
    }
  },
}));

export const useAuthStore = authStore;

// Create the useAuth hook
export const useAuth = () => {
  const { isLoggedIn, userId, setIsLoggedIn } = useStore(authStore);

  const checkLogin = async () => {
    const user_id = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!user_id);
    return !!user_id;
  };

  return { isLoggedIn, checkLogin, setIsLoggedIn, userId };
};
