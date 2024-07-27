import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

const registrations = [
  {
    admissionDate: "22/10/2023",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: "APPROVED",
    cpf: "56642105087",
    id: "3",
  },
];

test("loads registrations", async () => {
  mockedAxios.get.mockResolvedValue({ data: registrations });
  render(<App />);

  await waitForElementToBeRemoved(
    screen.getByRole("alert", { name: /carregando/i })
  );

  const column = screen.getByRole("region", { name: /aprovado/i });
  const registration = screen.getByText(/luiz filho/i);

  expect(column).toContainElement(registration);
});
