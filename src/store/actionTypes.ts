import { Employee } from "~/types";

export type AppStatus =
  | "idle"
  | "confiming"
  | "loading"
  | "success"
  | "failure";

export enum ActionType {
  SET_REGISTRATIONS = "SET_REGISTRATIONS",
  ADD_REGISTRATION = "ADD_REGISTRATIONS",
  UPDATE_REGISTRATION = "UPDATE_REGISTRATION",
  DELETE_REGISTRATION = "DELETE_REGISTRATION",
  SET_STATUS = "SET_STATUS",
  SET_SUCCESS = "SET_SUCCESS",
}

export type Action =
  | { type: ActionType.SET_REGISTRATIONS; registrations: Employee[] }
  | { type: ActionType.ADD_REGISTRATION; registration: Employee }
  | { type: ActionType.UPDATE_REGISTRATION; registration: Employee }
  | { type: ActionType.DELETE_REGISTRATION; id: string }
  | { type: ActionType.SET_STATUS; status: AppStatus };

export type InitialStateType = {
  status: AppStatus;
  employees: Employee[];
};
