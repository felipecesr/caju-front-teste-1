import { useId, useState } from "react";
import { Dialog } from "@reach/dialog";
import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useRegistrations } from "~/store/registration";
import { ActionType } from "~/store/actionTypes";
import { createPortal } from "react-dom";
import { Employee } from "~/types";
import { updateEmployee, deleteEmployee } from "~/store/actionCreators";

type Props = {
  data: Employee;
};

const RegistrationCard = (props: Props) => {
  const cardId = useId();
  const { dispatch } = useRegistrations();
  const [nextStatus, setNextStatus] = useState<string>("");

  const close = () => {
    setNextStatus("");
    dispatch({ type: ActionType.SET_STATUS, status: "idle" });
  };

  const confirm = (status: string) => {
    const payload = { ...props.data, status };
    updateEmployee(dispatch, payload).then(() => setNextStatus(""));
  };

  function updateRegistration(status: string) {
    setNextStatus(status);
    dispatch({ type: ActionType.SET_STATUS, status: "confiming" });
  }

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
              onClick={() => updateRegistration("REPROVED")}
              bgcolor="rgb(255, 145, 154)"
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              onClick={() => updateRegistration("APPROVED")}
              bgcolor="rgb(155, 229, 155)"
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {props.data.status !== "REVIEW" && (
          <ButtonSmall
            onClick={() => updateRegistration("REVIEW")}
            bgcolor="#ff8858"
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <S.ButtonDelete
          aria-label="Apagar"
          onClick={() => deleteEmployee(dispatch, props.data.id)}
        >
          <HiOutlineTrash />
        </S.ButtonDelete>
      </S.Actions>
      {nextStatus &&
        createPortal(
          <Dialog>
            <button type="button" onClick={close}>
              Cancelar
            </button>
            {nextStatus}
            <button type="button" onClick={() => confirm(nextStatus)}>
              Confirmar
            </button>
          </Dialog>,
          document.body
        )}
    </S.Card>
  );
};

export default RegistrationCard;
