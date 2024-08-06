import { Dialog } from "@reach/dialog";
import * as S from "./styles";
import { ButtonSmall } from "../Buttons";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

type Props = {
  isOpen: boolean;
  type: string;
  closeDialog: () => void;
};

export const FeedbackDialog = ({ isOpen, type, closeDialog }: Props) => {
  const isSuccess = type === "success";

  return (
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
    </Dialog>
  );
};
