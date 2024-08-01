import { Registration } from "~/types";

type Status = "idle" | "confiming" | "loading" | "success" | "failure";

export type InitialStateType = {
  status: Status;
  employees: Registration[];
};

export enum ActionTypes {
  SET_STATUS = "SET_STATUS",
  SET_SUCCESS = "SET_SUCCESS",
  SET_EMPLOYEES = "GET_EMPLOYEES",
  SET_REGISTRATIONS = "SET_REGISTRATIONS",
  ADD_REGISTRATION = "ADD_REGISTRATIONS",
  UPDATE_REGISTRATION = "UPDATE_REGISTRATION",
  DELETE_REGISTRATION = "DELETE_REGISTRATION",
}

export type Action =
  | { type: ActionTypes.SET_STATUS; status: Status }
  | { type: ActionTypes.SET_REGISTRATIONS; registrations: Registration[] }
  | { type: ActionTypes.ADD_REGISTRATION; registration: Registration }
  | { type: ActionTypes.UPDATE_REGISTRATION; registration: Registration }
  | { type: ActionTypes.DELETE_REGISTRATION; id: string };

export const initialState: InitialStateType = {
  status: "idle",
  employees: [],
};

export function reducer(state: InitialStateType, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_STATUS: {
      return { ...state, status: action.status, callback: action.callback };
    }
    case ActionTypes.SET_REGISTRATIONS: {
      return { ...state, employees: action.registrations };
    }
    case ActionTypes.ADD_REGISTRATION: {
      return { ...state, employees: [...state.employees] };
    }
    case ActionTypes.UPDATE_REGISTRATION: {
      return {
        ...state,
        employees: state.employees.map((r) => {
          if (r.id === action.registration?.id) {
            return action.registration;
          } else {
            return r;
          }
        }),
      };
    }
    case ActionTypes.DELETE_REGISTRATION: {
      return {
        ...state,
        employees: state.employees.filter((r) => r.id != action.id),
      };
    }
    default: {
      return state;
    }
  }
}
