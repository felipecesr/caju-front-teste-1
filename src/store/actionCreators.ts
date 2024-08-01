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

export const updateEmployee = (dispatch: Dispatch<Action>, data: Employee) => {
  dispatch({ type: ActionType.SET_STATUS, status: "loading" });
  return api.updateEmployee(data).then((res) => {
    dispatch({ type: ActionType.UPDATE_REGISTRATION, registration: res });
    dispatch({ type: ActionType.SET_STATUS, status: "success" });
  });
};

export const deleteEmployee = (dispatch: Dispatch<Action>, id: string) => {
  return api
    .deleteEmployee(id)
    .then(() => dispatch({ type: ActionType.DELETE_REGISTRATION, id }));
};
