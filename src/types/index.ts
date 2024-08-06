export type Employee = {
  id: string;
  status: Status;
  employeeName: string;
  email: string;
  cpf: string;
  admissionDate: string;
};

export enum Status {
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED",
}
