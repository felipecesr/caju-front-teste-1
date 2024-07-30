import { useEffect, useState } from "react";
import { cpfIsValid } from "cpf-is-valid";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { Spinner } from "~/components/Spinner";
import * as S from "./styles";
import { useRegistrations } from "~/context/registration";
import { Registration } from "~/types";
import { ActionTypes } from "~/context/registration/reducer";
import axios from "axios";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { state: registrations, dispatch } = useRegistrations();

  useEffect(() => {
    function fetchRegistrations() {
      setIsLoading(true);
      axios
        .get<Registration[]>("http://localhost:3000/registrations", {
          params: { cpf: query },
        })
        .then((response) => {
          dispatch({
            type: ActionTypes.SET_REGISTRATIONS,
            registrations: response.data,
          });
        })
        .finally(() => setIsLoading(false));
    }

    fetchRegistrations();
  }, [dispatch, query]);

  const filterByCPF = (cpf: string) => {
    if (!cpfIsValid(cpf) && query !== "") {
      setQuery("");
      return;
    }

    if (cpfIsValid(cpf)) {
      setQuery(cpf.replace(/[.-]/g, ''));
    }
  };

  return (
    <S.Container>
      <SearchBar filterByCPF={filterByCPF} />
      {isLoading ? <Spinner /> : <Collumns registrations={registrations} />}
    </S.Container>
  );
};
export default DashboardPage;
