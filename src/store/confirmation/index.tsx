import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  isOpen: boolean;
  openDialog: (cb: Function) => void;
  closeDialog: () => void;
  confirm: () => void;
};

const ConfirmationContext = createContext<ContextType | null>(null);

export function ConfirmationProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<Function>(() => {});

  const openDialog = (callback: Function) => {
    setIsOpen(true);
    setCallback(() => callback);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const confirm = () => {
    callback();
    closeDialog();
  };

  return (
    <ConfirmationContext.Provider
      value={{ isOpen, openDialog, closeDialog, confirm }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation should be used with ConfirmationProvider");
  }
  return context;
}
