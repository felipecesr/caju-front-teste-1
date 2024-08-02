import { useEffect, useState } from "react";
import { cpfIsValid } from "cpf-is-valid";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { Spinner } from "~/components/Spinner";
import * as S from "./styles";
import { useRegistrations } from "~/store/registration";
import { getEmployees } from "~/store/actionCreators";

const DashboardPage = () => {
  const [query, setQuery] = useState<string>("");
  const { state, dispatch } = useRegistrations();

  useEffect(() => {
    getEmployees(dispatch, query);
  }, [dispatch, query]);

  const filterByCPF = (cpf: string) => {
    if (!cpfIsValid(cpf) && query !== "") {
      setQuery("");
      return;
    }

    if (cpfIsValid(cpf)) {
      setQuery(cpf.replace(/[.-]/g, ""));
    }
  };

  return (
    <S.Container>
      <SearchBar filterByCPF={filterByCPF} />
      {state.status === "loading" ? (
        <Spinner />
      ) : (
        <Collumns registrations={state.employees} />
      )}
    </S.Container>
  );
};
export default DashboardPage;
