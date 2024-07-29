import { RegistrationsProvider } from "./registration";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <RegistrationsProvider>{children}</RegistrationsProvider>;
};
