import { createPortal } from "react-dom";
import { Dialog } from "@reach/dialog";
import { useRegistrations } from "~/store/registration";
import { ActionType } from "~/store/actionTypes";
import * as S from "./styles";
import { ButtonSmall } from "../Buttons";

type Props = {
  isOpen: boolean;
};

export const SuccessDialog = ({ isOpen }: Props) => {
  const { dispatch } = useRegistrations();
  const closeDialog = () =>
    dispatch({ type: ActionType.SET_STATUS, status: "idle" });

  return createPortal(
    <Dialog isOpen={isOpen}>
      <S.Header>
        <ButtonSmall type="button" onClick={closeDialog}>
          Fechar
        </ButtonSmall>
      </S.Header>
      <S.Wrapper>
        <S.Icon />
        <p>Sucesso</p>
      </S.Wrapper>
    </Dialog>,
    document.body
  );
};
