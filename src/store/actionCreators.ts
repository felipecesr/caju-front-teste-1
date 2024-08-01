import { Dispatch } from "react";
import { ActionTypes, Action } from "./registration/reducer";
import * as api from "~/services/employees";
import { Employee } from "~/types";

export const getEmployees = (dispatch: Dispatch<Action>, cpf = "") => {
  dispatch({ type: ActionTypes.SET_STATUS, status: "loading" });
  return api
    .getEmployees(cpf)
    .then((response) =>
      dispatch({
        type: ActionTypes.SET_REGISTRATIONS,
        registrations: response,
      })
    )
    .finally(() => dispatch({ type: ActionTypes.SET_STATUS, status: "idle" }));
};

export const createEmployee = (dispatch: Dispatch<Action>, data: Employee) => {
  return api.createEmployee(data).then((res) => {
    dispatch({
      type: ActionTypes.ADD_REGISTRATION,
      registration: res,
    });
  });
};

export const updateEmployee = (dispatch: Dispatch<Action>, data: Employee) => {
  dispatch({ type: ActionTypes.SET_STATUS, status: "loading" });
  return api.updateEmployee(data).then((res) => {
    dispatch({ type: ActionTypes.UPDATE_REGISTRATION, registration: res });
    dispatch({ type: ActionTypes.SET_STATUS, status: "success" });
  });
};

export const deleteEmployee = (dispatch: Dispatch<Action>, id: string) => {
  return api
    .deleteEmployee(id)
    .then(() => dispatch({ type: ActionTypes.DELETE_REGISTRATION, id }));
};
