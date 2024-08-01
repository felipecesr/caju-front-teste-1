import { render as renderRTL } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProviders } from "~/store/app-providers";

export function render(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...renderRTL(jsx, { wrapper: AppProviders }),
  };
}
