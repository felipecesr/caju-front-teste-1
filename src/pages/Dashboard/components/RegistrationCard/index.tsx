import { useId } from "react";
import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useRegistrations } from "~/context/registration";
import { Registration } from "~/types";
import { ActionTypes } from "~/context/registration/reducer";
import axios from "axios";

type Props = {
  data: Registration;
};

const RegistrationCard = (props: Props) => {
  const cardId = useId();
  const { dispatch } = useRegistrations();

  function updateRegistration(data: Registration, status: string) {
    const payload = { ...data, status };
    return axios
      .put(`http://localhost:3000/registrations/${data.id}`, payload)
      .then((response) =>
        dispatch({
          type: ActionTypes.UPDATE_REGISTRATION,
          registration: response.data,
        })
      );
  }

  function deleteRegistration(id: string) {
    return axios
      .delete(`http://localhost:3000/registrations/${id}`)
      .then(() => dispatch({ type: ActionTypes.DELETE_REGISTRATION, id }));
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
              onClick={() => updateRegistration(props.data, "REPROVED")}
              bgcolor="rgb(255, 145, 154)"
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              onClick={() => updateRegistration(props.data, "APPROVED")}
              bgcolor="rgb(155, 229, 155)"
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {props.data.status !== "REVIEW" && (
          <ButtonSmall
            onClick={() => updateRegistration(props.data, "REVIEW")}
            bgcolor="#ff8858"
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <S.ButtonDelete
          aria-label="Apagar"
          onClick={() => deleteRegistration(props.data.id)}
        >
          <HiOutlineTrash />
        </S.ButtonDelete>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
