import { Dialog as ReachDialog } from "@reach/dialog";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: Function;
  onConfirm: Function;
  message: string;
};

export const Dialog = ({ onClose, onConfirm, message, isOpen }: Props) => {
  return createPortal(
    <ReachDialog isOpen={isOpen}>
      <p>{message}</p>
      <button type="button" onClick={() => onClose()}>
        Cancelar
      </button>
      <button type="button" onClick={() => onConfirm()}>
        Confirmar
      </button>
    </ReachDialog>,
    document.body
  );
};
