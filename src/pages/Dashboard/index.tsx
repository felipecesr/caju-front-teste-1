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
  const [query, setQuery] = useState<string>("");
  const { state, dispatch } = useRegistrations();

  function fetchData() {
    dispatch({ type: ActionTypes.SET_STATUS, status: "loading" });
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
      .finally(() =>
        dispatch({ type: ActionTypes.SET_STATUS, status: "idle" })
      );
  }

  useEffect(() => {
    fetchData();
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
      {state.status}
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
