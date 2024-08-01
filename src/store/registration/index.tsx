import { createContext, Dispatch, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { InitialStateType, Action } from "../actionTypes";

const initialState: InitialStateType = {
  status: "idle",
  employees: [],
};

const RegistrationContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

type Props = {
  children: React.ReactNode;
};

export function RegistrationsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrations() {
  return useContext(RegistrationContext);
}
