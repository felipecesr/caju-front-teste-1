import { useState } from "react";

export const useConfirmationDialog = () => {
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

  return { isOpen, openDialog, closeDialog, confirm };
};
