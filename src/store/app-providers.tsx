import { ConfirmationProvider } from "./confirmation";
import { RegistrationsProvider } from "./registration";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfirmationProvider>
      <RegistrationsProvider>{children}</RegistrationsProvider>
    </ConfirmationProvider>
  );
};
