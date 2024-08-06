import { useMemo, useState } from "react";
import {
  deleteEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
} from "~/services/employees";
import { Employee, Status } from "~/types";

export function useAPI() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const API = useMemo(() => {
    const wrap = async <T>(promise: Promise<T>, feedback = true) => {
      setIsLoading(true);
      try {
        const data = await promise;
        feedback && setShowSuccess(true);
        return data;
      } finally {
        setIsLoading(false);
      }
    };

    const loadEmployees = () => wrap(getEmployees(), false);
    const addEmployee = (employee: Employee) => wrap(createEmployee(employee));
    const approveEmpployee = (employee: Employee) =>
      wrap(updateEmployee({ ...employee, status: Status.APPROVED }));
    const reproveEmpployee = (employee: Employee) =>
      wrap(updateEmployee({ ...employee, status: Status.REPROVED }));
    const reviewEmpployee = (employee: Employee) =>
      wrap(updateEmployee({ ...employee, status: Status.REVIEW }));
    const removeEmployee = (id: string) => wrap(deleteEmployee(id));

    return {
      loadEmployees,
      addEmployee,
      approveEmpployee,
      reproveEmpployee,
      reviewEmpployee,
      removeEmployee,
    };
  }, []);

  return { API, isLoading, showSuccess, setShowSuccess };
}
