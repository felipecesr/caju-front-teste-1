export type Employee = {
  employeeName: string;
  email: string;
  cpf: string;
  admissionDate: string;
};

export type Registration = Employee & {
  id: string;
  status: string;
};
