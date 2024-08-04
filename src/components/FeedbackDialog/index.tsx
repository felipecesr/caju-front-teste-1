import { createPortal } from "react-dom";
import { Dialog } from "@reach/dialog";
import { useRegistrations } from "~/store/registration";
import { ActionType } from "~/store/actionTypes";
import * as S from "./styles";
import { ButtonSmall } from "../Buttons";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

type Props = {
  isOpen: boolean;
  type: string;
};

export const FeedbackDialog = ({ isOpen, type }: Props) => {
  const { dispatch } = useRegistrations();
  const closeDialog = () =>
    dispatch({ type: ActionType.SET_STATUS, status: "idle" });

  const isSuccess = type === "success";

  return createPortal(
    <Dialog isOpen={isOpen}>
      <S.Header>
        <ButtonSmall type="button" onClick={closeDialog}>
          Fechar
        </ButtonSmall>
      </S.Header>
      <S.Wrapper $isSuccess={isSuccess}>
        {isSuccess ? (
          <>
            <FaRegCircleCheck />
            <p>Sucesso</p>
          </>
        ) : (
          <>
            <FaRegCircleXmark />
            <p>Erro</p>
          </>
        )}
      </S.Wrapper>
    </Dialog>,
    document.body
  );
};
