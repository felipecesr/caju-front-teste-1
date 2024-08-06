import { useEffect } from "react";
import { useEmployees } from "./context";

export function useAllEmployees() {
  const { state, actions } = useEmployees();
  const { loadEmployees } = actions;
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);
  return state.data;
}
