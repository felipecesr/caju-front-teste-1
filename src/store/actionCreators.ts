import { Dispatch } from "react";
import * as api from "~/services/employees";
import { Employee } from "~/types";
import { ActionType, Action } from "./actionTypes";

export const getEmployees = (dispatch: Dispatch<Action>, cpf = "") => {
  dispatch({ type: ActionType.SET_STATUS, status: "loading" });
  return api
    .getEmployees(cpf)
    .then((response) =>
      dispatch({
        type: ActionType.SET_REGISTRATIONS,
        registrations: response,
      })
    )
    .finally(() => dispatch({ type: ActionType.SET_STATUS, status: "idle" }));
};

export const createEmployee = (dispatch: Dispatch<Action>, data: Employee) => {
  return api.createEmployee(data).then((res) => {
    dispatch({
      type: ActionType.ADD_REGISTRATION,
      registration: res,
    });
  });
};

export const updateEmployee = (
  dispatch: Dispatch<Action>,
  data: Employee,
  action: string
) => {
  dispatch({ type: ActionType.SET_STATUS, status: "loading" });

  if (action === "delete") {
    return api
      .deleteEmployee(data.id)
      .then(() => {
        dispatch({ type: ActionType.DELETE_REGISTRATION, id: data.id });
        dispatch({ type: ActionType.SET_STATUS, status: "success" });
      })
      .catch(() => {
        dispatch({ type: ActionType.SET_STATUS, status: "failure" });
      });
  }

  const mapping: { [key: string]: string } = {
    approve: "APPROVED",
    repprove: "REPROVED",
    review: "REVIEW",
  };

  const payload = { ...data, status: mapping[action] };
  return api.updateEmployee(payload).then((res) => {
    dispatch({
      type: ActionType.UPDATE_REGISTRATION,
      registration: res,
    });
    dispatch({ type: ActionType.SET_STATUS, status: "success" });
  });
};
