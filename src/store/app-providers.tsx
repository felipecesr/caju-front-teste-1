import { ConfirmationProvider } from "./confirmation";
import { RegistrationsProvider } from "./registration";
import { EmployeesProvider } from "./employees";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfirmationProvider>
      <EmployeesProvider>
        <RegistrationsProvider>{children}</RegistrationsProvider>
      </EmployeesProvider>
    </ConfirmationProvider>
  );
};
