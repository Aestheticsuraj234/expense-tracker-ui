import { create } from "zustand";

export type modalType =
  | "EXPENSE_ADD"
  | "CURRENCY_ADD"
  | "EXPENSE_UPDATE"
  | "CURRENCY_UPDATE";
interface useStoreModalInterface {
  type: modalType | null;
  isOpen: boolean;
  onOpen: (type: modalType) => void;
  onClose: () => void;
}

export const useStoreModal = create<useStoreModalInterface>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),

  onClose: () => set({ isOpen: false }),
}));
