import { useEmployees } from "./context";

export function useAddEmployee() {
  const { actions } = useEmployees();
  const { addEmployee } = actions;
  return addEmployee;
}
