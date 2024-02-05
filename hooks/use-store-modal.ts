import { create } from "zustand";
import { UpdateExpenseForm } from "@/schema/schema";
import { ExpenseData } from "@/app/(root)/_components/table/column";

export type modalType =
  | "EXPENSE_ADD"
  | "CURRENCY_ADD"
  | "EXPENSE_UPDATE"
  | "CURRENCY_UPDATE";

interface useStoreModalInterface {
  modalData?:any; // Make data property optional
  type: modalType | null;
  isOpen: boolean;
  onOpen: (type: modalType,modalData?: any ) => void;
  onClose: () => void;
}

export const useStoreModal = create<useStoreModalInterface>((set) => ({
  // @ts-ignore
  modalData: null,
  type: null,
  isOpen: false,
// @ts-ignore

  onOpen: (type) => set({ isOpen: true, type, modalData: null}),
  onClose: () => set({ type: null, isOpen: false }),
}));
