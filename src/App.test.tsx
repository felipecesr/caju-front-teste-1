import {
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import App from "./App";
import { render } from "./utils/test-utils";
import * as api from "~/services/employees";

beforeEach(() => {
  jest.clearAllMocks();
});

test("loads registration filtered by column", async () => {
  render(<App />);

  await waitForElementToBeRemoved(
    screen.getByRole("alert", { name: /carregando/i })
  );

  const column = screen.getByRole("region", { name: /aprovado/i });
  const registration = screen.getByRole("heading", { name: /luiz filho/i });

  expect(column).toContainElement(registration);
});

test("filters registrations by cpf", async () => {
  const { user } = render(<App />);

  await waitForElementToBeRemoved(
    screen.getByRole("alert", { name: /carregando/i })
  );

  const fieldEl = screen.getByPlaceholderText(/digite um cpf válido/i);
  await user.type(fieldEl, "56642105087");

  expect(
    screen.getByRole("heading", { name: /luiz filho/i })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: /filipe marins/i })
  ).not.toBeInTheDocument();
});

test("refatch data", async () => {
  jest.spyOn(api, "getEmployees");
  const { user } = render(<App />);

  await waitForElementToBeRemoved(
    screen.getByRole("alert", { name: /carregando/i })
  );

  await user.click(screen.getByRole("button", { name: /recarregar/i }));
  await user.click(screen.getByRole("button", { name: /confirmar/i }));

  expect(api.getEmployees).toHaveBeenCalledTimes(2);
});

test("changes registration status to repproved", async () => {
  const { user } = render(<App />);

  await waitForElementToBeRemoved(
    screen.getByRole("alert", { name: /carregando/i })
  );

  const approvedColumn = screen.getByRole("region", { name: /aprovado/i });
  await user.click(
    within(approvedColumn).getByRole("button", { name: /revisar novamente/i })
  );

  await user.click(screen.getByRole("button", { name: /confirmar/i }));

  screen.getByText(/sucesso/i);
  await user.click(screen.getByRole("button", { name: /fechar/i }));

  const reviewColumn = screen.getByRole("region", {
    name: /pronto para revisar/i,
  });
  await user.click(
    within(reviewColumn).getByRole("button", { name: /reprovar/i })
  );

  await user.click(screen.getByRole("button", { name: /confirmar/i }));

  screen.getByText(/sucesso/i);
  await user.click(screen.getByRole("button", { name: /fechar/i }));

  const employee = screen.getByRole("article", { name: /luiz filho/i });
  const reprovedColumn = screen.getByRole("region", { name: /reprovado/i });

  expect(reprovedColumn).toContainElement(employee);
});

test("deletes a registration", async () => {
  const { user } = render(<App />);

  await waitForElementToBeRemoved(
    screen.getByRole("alert", { name: /carregando/i })
  );

  const region = screen.getByRole("region", { name: /aprovado/i });
  within(region).getByRole("heading", { name: /luiz filho/i });

  await user.click(within(region).getByRole("button", { name: /apagar/i }));

  await user.click(screen.getByRole("button", { name: /confirmar/i }));
  await user.click(screen.getByRole("button", { name: /fechar/i }));

  expect(
    within(region).queryByRole("heading", { name: /luiz filho/i })
  ).not.toBeInTheDocument();
});

test("fails to delete a registration", async () => {
  jest.spyOn(api, "deleteEmployee").mockRejectedValue("error");
  const { user } = render(<App />);

  await waitForElementToBeRemoved(
    screen.getByRole("alert", { name: /carregando/i })
  );

  const region = screen.getByRole("region", { name: /aprovado/i });
  within(region).getByRole("heading", { name: /luiz filho/i });

  await user.click(within(region).getByRole("button", { name: /apagar/i }));

  await user.click(screen.getByRole("button", { name: /confirmar/i }));
  screen.getByText(/erro/i);
  await user.click(screen.getByRole("button", { name: /fechar/i }));

  expect(
    screen.getByRole("heading", { name: /luiz filho/i })
  ).toBeInTheDocument();
});

test("add new register", async () => {
  const { user } = render(<App />);

  await user.click(screen.getByRole("button", { name: /nova admissão/i }));

  await user.type(screen.getByLabelText(/nome/i), "José Leão");
  await user.type(screen.getByLabelText(/email/i), "jose@caju.com.br");
  await user.type(screen.getByLabelText(/cpf/i), "78502270001");
  await user.type(screen.getByLabelText(/data de admissão/i), "2023-10-22");

  await user.click(screen.getByRole("button", { name: /cadastrar/i }));
  await user.click(screen.getByRole("button", { name: /confirmar/i }));

  const column = await screen.findByRole("region", {
    name: /pronto para revisar/i,
  });
  const registration = await within(column).findByRole("heading", {
    name: /josé leão/i,
  });
  expect(column).toContainElement(registration);
});
