import { ChangeEvent, useEffect, useState } from "react";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { Spinner } from "~/components/Spinner";
import * as S from "./styles";
import { useRegistrations } from "~/context";
import { Registration } from "~/types";
import { ActionTypes } from "~/context/reducer";
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "78502270001" || e.target.value === "") {
      setQuery(e.target.value);
    }
  };

  return (
    <S.Container>
      <SearchBar handleChange={handleChange} />
      {isLoading ? <Spinner /> : <Collumns registrations={registrations} />}
    </S.Container>
  );
};
export default DashboardPage;
