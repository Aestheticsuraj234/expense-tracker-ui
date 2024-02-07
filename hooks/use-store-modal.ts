import { create } from "zustand";
import { UpdateExpenseForm } from "@/schema/schema";
import { ExpenseData } from "@/app/(root)/_components/table/column";

export type modalType =
  | "EXPENSE_ADD"
  | "CURRENCY_ADD"
  | "EXPENSE_UPDATE"
  | "CURRENCY_UPDATE"
  | "EXPENSE_DELETE";
interface ModalDatas {
  id?: string;
  data?: ExpenseData;
}

interface useStoreModalInterface {
  modalData: ModalDatas; // Make data property optional
  type: modalType | null;
  isOpen: boolean;
  onOpen: (type: modalType, modalData?: ModalDatas) => void;
  onClose: () => void;
}

export const useStoreModal = create<useStoreModalInterface>((set) => ({
  // @ts-ignore
  modalData: {},
  type: null,
  isOpen: false,
  // @ts-ignore
  onOpen: (type,modalData={}) => set({ isOpen: true, type, modalData }),
  onClose: () => set({ type: null, isOpen: false }),
}));
