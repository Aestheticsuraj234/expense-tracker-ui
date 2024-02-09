"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  type:string;
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  type,
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  if(type === "EXPENSE_ADD" || type==="CURRENCY_ADD"||type==="EXPENSE_UPDATE"||type==="CURRENCY_UPDATE"  )
  {
    return (
      <Dialog  open={isOpen} onOpenChange={onChange} >
        <DialogContent className="dark:bg-zinc-800  max-w-lg mx-auto" >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

};