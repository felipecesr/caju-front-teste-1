import { Dialog as ReachDialog } from "@reach/dialog";
import { createPortal } from "react-dom";
import { useConfirmation } from "~/store/confirmation";

export const Dialog = () => {
  const { isOpen, closeDialog, confirm } = useConfirmation();

  return createPortal(
    <ReachDialog isOpen={isOpen}>
      <p>Certeza?</p>
      <button type="button" onClick={closeDialog}>
        Cancelar
      </button>
      <button type="button" onClick={confirm}>
        Confirmar
      </button>
    </ReachDialog>,
    document.body
  );
};
