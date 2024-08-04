import { Dialog as ReachDialog } from "@reach/dialog";
import { createPortal } from "react-dom";
import { useConfirmation } from "~/store/confirmation";
import Button from "../Buttons";
import * as S from "./styles";

export const ConfirmDialog = () => {
  const { isOpen, closeDialog, confirm } = useConfirmation();

  return createPortal(
    <ReachDialog isOpen={isOpen}>
      <S.Wrapper>
        <p>Tem certeza que deseja executar esta ação?</p>
        <S.Buttons>
          <Button
            type="button"
            onClick={closeDialog}
            bgcolor="#eee"
            color="#000"
          >
            Cancelar
          </Button>
          <Button type="button" onClick={confirm}>
            Confirmar
          </Button>
        </S.Buttons>
      </S.Wrapper>
    </ReachDialog>,
    document.body
  );
};
