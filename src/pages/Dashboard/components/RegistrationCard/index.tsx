import { useId } from "react";
import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useRegistrations } from "~/store/registration";
import { Employee } from "~/types";
import { updateEmployee } from "~/store/actionCreators";
import { useConfirmationDialog } from "~/hooks/useConfirmationDialog";
import { Dialog } from "~/components/Dialog";

type Props = {
  data: Employee;
};

const RegistrationCard = (props: Props) => {
  const cardId = useId();
  const { dispatch } = useRegistrations();
  const { isOpen, openDialog, closeDialog, confirm } = useConfirmationDialog();

  const handleClick = (status: string) => () =>
    openDialog(() => updateEmployee(dispatch, props.data, status));

  return (
    <S.Card aria-labelledby={cardId}>
      <S.IconAndText>
        <HiOutlineUser />
        <h3 id={cardId}>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {props.data.status === "REVIEW" && (
          <>
            <ButtonSmall
              onClick={handleClick("repprove")}
              bgcolor="rgb(255, 145, 154)"
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              onClick={handleClick("approve")}
              bgcolor="rgb(155, 229, 155)"
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {props.data.status !== "REVIEW" && (
          <ButtonSmall onClick={handleClick("review")} bgcolor="#ff8858">
            Revisar novamente
          </ButtonSmall>
        )}

        <S.ButtonDelete aria-label="Apagar" onClick={handleClick("delete")}>
          <HiOutlineTrash />
        </S.ButtonDelete>
      </S.Actions>
      <Dialog
        isOpen={isOpen}
        onClose={closeDialog}
        onConfirm={confirm}
        message="Certeza?"
      />
    </S.Card>
  );
};

export default RegistrationCard;
