import { screen } from "@testing-library/react";
import { render } from "~/utils/test-utils";
import RegistrationCard from ".";

const data = {
  admissionDate: "22/10/2023",
  email: "luiz@caju.com.br",
  employeeName: "Luiz Filho",
  cpf: "56642105087",
  id: "3",
};

test("does not renders review button when status is review", () => {
  render(<RegistrationCard data={{ ...data, status: "REVIEW" }} />);
  expect(screen.getByRole("button", { name: /reprovar/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /aprovar/i })).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /revisar novamente/i })
  ).not.toBeInTheDocument();
});

test("renders only review button when status is not review", () => {
  render(<RegistrationCard data={{ ...data, status: "APPROVED" }} />);
  expect(
    screen.queryByRole("button", { name: /reprovar/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /aprovar/i })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /revisar novamente/i })
  ).toBeInTheDocument();
});
