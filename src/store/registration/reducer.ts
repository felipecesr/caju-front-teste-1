import { InitialStateType, Action, ActionType } from "../actionTypes";

export function reducer(state: InitialStateType, action: Action) {
  switch (action.type) {
    case ActionType.SET_STATUS: {
      return { ...state, status: action.status };
    }
    case ActionType.SET_REGISTRATIONS: {
      return { ...state, employees: action.registrations };
    }
    case ActionType.ADD_REGISTRATION: {
      return { ...state, employees: [...state.employees] };
    }
    case ActionType.UPDATE_REGISTRATION: {
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
    case ActionType.DELETE_REGISTRATION: {
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
