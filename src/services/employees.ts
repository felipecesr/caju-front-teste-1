import { Employee } from "~/types";
import api from "./config";

export const getEmployees = async (cpf = ""): Promise<Employee[]> => {
  const response = await api.get("/registrations", { params: { cpf } });
  return response.data;
};

export const createEmployee = async (data: Employee): Promise<Employee> => {
  const response = await api.post("/registrations", data);
  return response.data;
};

export const updateEmployee = async (data: Employee): Promise<Employee> => {
  const response = await api.put(`/registrations/${data.id}`, data);
  return response.data;
};

export const deleteEmployee = async (id: string) => {
  await api.delete(`/registrations/${id}`);
};
