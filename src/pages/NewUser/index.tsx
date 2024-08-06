import { ChangeEvent } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useForm,
} from "react-hook-form";
import { setMask } from "react-input-mask-br";
import { cpfIsValid } from "cpf-is-valid";
import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";
import { Employee } from "~/types";
import { useConfirmation } from "~/store/confirmation";
import { useAddEmployee } from "~/store/employees/useAddEmployee";

const NewUserPage = () => {
  const history = useHistory();
  const { openDialog } = useConfirmation();
  const addEmployee = useAddEmployee();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Employee>();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const getRandomInteger = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return `${Math.floor(Math.random() * (max - min)) + min}`;
  };

  const onSubmit = (data: Employee) => {
    const payload = {
      ...data,
      cpf: data.cpf.replace(/[.-]/g, ""),
      id: getRandomInteger(0, 100),
      status: "REVIEW",
    };

    openDialog(() => addEmployee(payload).then(() => goToHome()));
  };

  const buildErrorProp = (
    fieldName: string,
    fieldError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  ) => {
    if (!fieldError) {
      return "";
    }

    if (fieldError.type === "required") {
      return `${fieldName} é obrigatório`;
    } else {
      return fieldError.message?.toString();
    }
  };

  return (
    <S.Container>
      <S.Card onSubmit={handleSubmit(onSubmit)}>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          id="nome"
          placeholder="Nome"
          label="Nome"
          {...register("employeeName", {
            required: true,
            pattern: {
              value: /^[A-Za-z]\S{1,}\s.+$/,
              message:
                "O valor inserido não corresponde ao formato de nome completo",
            },
          })}
          aria-invalid={errors.employeeName ? "true" : "false"}
          error={buildErrorProp("Nome completo", errors.employeeName)}
        />
        <TextField
          id="email"
          placeholder="Email"
          label="Email"
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "O valor inserido não corresponde ao formato de e-mail",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          error={buildErrorProp("Email", errors.email)}
        />
        <Controller
          control={control}
          rules={{
            required: true,
            validate: cpfIsValid,
          }}
          render={({ field: { value, onChange } }) => (
            <TextField
              id="cpf"
              placeholder="CPF"
              label="CPF"
              value={value || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.persist();
                const maskedCpf = setMask({
                  type: "cpf",
                  value: e.target.value,
                });
                onChange(maskedCpf);
              }}
              error={buildErrorProp("CPF", errors.cpf)}
            />
          )}
          name="cpf"
        />
        <TextField
          id="data"
          label="Data de admissão"
          type="date"
          {...register("admissionDate", { required: true })}
          aria-invalid={errors.admissionDate ? "true" : "false"}
          error={buildErrorProp("Data de admissão", errors.admissionDate)}
        />
        <Button type="submit">Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
