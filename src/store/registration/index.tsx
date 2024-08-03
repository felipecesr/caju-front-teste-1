import { createContext, Dispatch, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { InitialStateType, Action } from "../actionTypes";

type ContextType = {
  state: InitialStateType;
  dispatch: Dispatch<Action>;
};

type Props = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  status: "idle",
  employees: [],
};

const RegistrationContext = createContext<ContextType | null>(null);

export function RegistrationsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrations() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrations should be used with RegistrationsProvider"
    );
  }
  return context;
}
