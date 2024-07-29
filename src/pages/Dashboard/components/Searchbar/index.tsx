import { ChangeEvent, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { setMask } from "react-input-mask-br";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";

type Props = {
  filterByCPF: (cpf: string) => void;
};

export const SearchBar = (props: Props) => {
  const history = useHistory();
  const [cpf, setCpf] = useState<string>("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        value={cpf}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const maskedCpf = setMask({ type: "cpf", value: e.target.value });
          setCpf(maskedCpf);
          props.filterByCPF(maskedCpf);
        }}
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
