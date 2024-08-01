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
import { useRegistrations } from "~/context/registration";
import { Registration } from "~/types";
import { ActionTypes } from "~/context/registration/reducer";
import axios from "axios";
import { createPortal } from "react-dom";

type Props = {
  data: Registration;
};

const RegistrationCard = (props: Props) => {
  const cardId = useId();
  const { dispatch } = useRegistrations();
  const [nextStatus, setNextStatus] = useState<string>("");

  const close = () => {
    setNextStatus("");
    dispatch({ type: ActionTypes.SET_STATUS, status: "idle" });
  };

  const confirm = (status: string) => {
    const payload = { ...props.data, status };
    fetchData(
      dispatch,
      axios.put(`http://localhost:3000/registrations/${payload.id}`, payload)
    ).then(() => setNextStatus(""));
  };

  const fetchData = async (dispatch, promise) => {
    dispatch({ type: ActionTypes.SET_STATUS, status: "loading" });
    try {
      const response = await promise;
      dispatch({
        type: ActionTypes.UPDATE_REGISTRATION,
        registration: response.data,
      });
      dispatch({ type: ActionTypes.SET_STATUS, status: "success" });
    } catch (error) {
      // dispatch(fetchDataFailure(error));
    }
  };

  function updateRegistration(status: string) {
    setNextStatus(status);
    dispatch({ type: ActionTypes.SET_STATUS, status: "confiming" });
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
          onClick={() => deleteRegistration(props.data.id)}
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
