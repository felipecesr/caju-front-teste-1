import { createContext, useContext, useMemo, useState } from "react";
import { Employee } from "~/types";
import { useAPI } from "./useAPI";
import { Loader } from "~/components/Loader";
import { FeedbackDialog } from "~/components/FeedbackDialog";
import { Dialog } from "@reach/dialog";

type ContextType = {
  state: {
    data: Employee[];
  };
  actions: {
    loadEmployees: () => void;
    addEmployee: (employee: Employee) => Promise<void>;
    approveEmployee: (employee: Employee) => Promise<any>;
    reproveEmployee: (employee: Employee) => Promise<any>;
    reviewEmployee: (employee: Employee) => Promise<any>;
    removeEmployee: (id: string) => void;
  };
};

const EmployeesContext = createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function EmployeesProvider({ children }: Props) {
  const { API, isLoading, showSuccess, setShowSuccess } = useAPI();
  const [data, setData] = useState<Employee[]>([]);
  const [error, setError] = useState<boolean>(false);

  const editEmployee = (data: Employee[], newEmployee: Employee) =>
    data.map((e) => {
      if (e.id === newEmployee.id) {
        return newEmployee;
      } else {
        return e;
      }
    });

  const actions = useMemo(() => {
    const loadEmployees = () => API.loadEmployees().then(setData);
    const addEmployee = (employee: Employee) =>
      API.addEmployee(employee).then(() =>
        setData((data) => [...data, employee])
      );
    const approveEmployee = (employee: Employee) =>
      API.approveEmpployee(employee).then((e) => {
        setData((data) => editEmployee(data, e));
      });
    const reproveEmployee = (employee: Employee) =>
      API.reproveEmpployee(employee).then((e) =>
        setData((data) => editEmployee(data, e))
      );
    const reviewEmployee = (employee: Employee) =>
      API.reviewEmpployee(employee).then((e) =>
        setData((data) => editEmployee(data, e))
      );
    const removeEmployee = (id: string) =>
      API.removeEmployee(id)
        .then(() =>
          setData((prev) => prev.filter((employee) => employee.id !== id))
        )
        .catch(() => setError(true));

    return {
      loadEmployees,
      addEmployee,
      approveEmployee,
      reproveEmployee,
      reviewEmployee,
      removeEmployee,
    };
  }, [API]);

  const value = {
    state: { data },
    actions,
  };

  return (
    <EmployeesContext.Provider value={value}>
      {isLoading && <Loader />}
      <FeedbackDialog
        isOpen={showSuccess}
        type="success"
        closeDialog={() => setShowSuccess(false)}
      />
      <Dialog isOpen={error}>
        <button type="button" onClick={() => setError(false)}>
          Fechar
        </button>
        Erro
      </Dialog>
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployees should be used with EmployeesProvider");
  }
  return context;
}

// p. 296 - fetch
// https://www.reactindepth.dev/browse/ch09/things/browse
