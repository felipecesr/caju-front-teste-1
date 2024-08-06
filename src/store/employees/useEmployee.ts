import { useEmployees } from "./context";

export function useEmployee(id: string) {
  const { state, actions } = useEmployees();
  const employee = state.data.find((e) => e.id === id);
  return {
    approveEmployee: () => actions.approveEmployee(employee!),
    reproveEmployee: () => actions.reproveEmployee(employee!),
    reviewEmployee: () => actions.reviewEmployee(employee!),
    removeEmployee: () => actions.removeEmployee(id),
  };
}
