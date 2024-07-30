const registrations = [
  {
    admissionDate: "22/10/2023",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: "APPROVED",
    cpf: "56642105087",
    id: "3",
  },
  {
    id: "1",
    admissionDate: "22/10/2023",
    email: "filipe@caju.com.br",
    employeeName: "Filipe Marins",
    status: "REVIEW",
    cpf: "78502270001",
  },
];

const db = [...registrations];

export default {
  get: jest.fn(async (_: any, data: any) => {
    if (data?.params?.cpf) return { data: [db[0]] };
    return { data: db };
  }),
  put: jest.fn(async (_: any, data: any) => ({ data })),
  delete: jest.fn(async () => ({})),
  post: jest.fn(async (_: any, data: any) => {
    db.push(data);
    return { data };
  }),
};
