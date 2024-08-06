import { useId } from "react";
import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Employee } from "~/types";
import { useConfirmation } from "~/store/confirmation";
import { useEmployee } from "~/store/employees";

type Props = {
  data: Employee;
};

const RegistrationCard = (props: Props) => {
  const cardId = useId();
  const { openDialog } = useConfirmation();
  const { approveEmployee, reproveEmployee, reviewEmployee, removeEmployee } =
    useEmployee(props.data.id);

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
              onClick={() => openDialog(reproveEmployee)}
              bgcolor="rgb(255, 145, 154)"
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              onClick={() => openDialog(approveEmployee)}
              bgcolor="rgb(155, 229, 155)"
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {props.data.status !== "REVIEW" && (
          <ButtonSmall
            onClick={() => openDialog(reviewEmployee)}
            bgcolor="#ff8858"
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <S.ButtonDelete
          aria-label="Apagar"
          onClick={() => openDialog(removeEmployee)}
        >
          <HiOutlineTrash />
        </S.ButtonDelete>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
