import { ConfirmationProvider } from "./confirmation";
import { EmployeesProvider } from "./employees";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfirmationProvider>
      <EmployeesProvider>{children}</EmployeesProvider>
    </ConfirmationProvider>
  );
};
