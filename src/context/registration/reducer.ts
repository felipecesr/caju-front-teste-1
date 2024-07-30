import { Registration } from "~/types";

export type InitialStateType = Registration[];

export enum ActionTypes {
  SET_REGISTRATIONS = "SET_REGISTRATIONS",
  ADD_REGISTRATION = "ADD_REGISTRATIONS",
  UPDATE_REGISTRATION = "UPDATE_REGISTRATION",
  DELETE_REGISTRATION = "DELETE_REGISTRATION",
}

export type Action =
  | { type: ActionTypes.SET_REGISTRATIONS; registrations: Registration[] }
  | { type: ActionTypes.ADD_REGISTRATION; registration: Registration }
  | { type: ActionTypes.UPDATE_REGISTRATION; registration: Registration }
  | { type: ActionTypes.DELETE_REGISTRATION; id: string };

export const initialState: InitialStateType = [];

export function reducer(state: InitialStateType, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_REGISTRATIONS: {
      return [...action.registrations];
    }
    case ActionTypes.ADD_REGISTRATION: {
      return [...state, action.registration];
    }
    case ActionTypes.UPDATE_REGISTRATION: {
      return state.map((r) => {
        if (r.id === action.registration?.id) {
          return action.registration;
        } else {
          return r;
        }
      });
    }
    case ActionTypes.DELETE_REGISTRATION: {
      return state.filter((r) => r.id != action.id);
    }
    default: {
      return state;
    }
  }
}
