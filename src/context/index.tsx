import { createContext, Dispatch, useContext, useReducer } from "react";
import { initialState, InitialStateType, reducer, Action } from "./reducer";

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
