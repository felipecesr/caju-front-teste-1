import { useState } from "react";
import { cpfIsValid } from "cpf-is-valid";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";
import { useAllEmployees } from "~/store/employees";

const DashboardPage = () => {
  const [query, setQuery] = useState<string>("");
  const employees = useAllEmployees();

  // useEffect(() => {
  //   getEmployees(dispatch, query);
  // }, [dispatch, query]);

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
      <Collumns registrations={employees} />
    </S.Container>
  );
};
export default DashboardPage;
