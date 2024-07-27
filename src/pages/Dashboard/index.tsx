import { useEffect, useState } from "react";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { Spinner } from "~/components/Spinner";
import * as S from "./styles";
import axios from "axios";

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const response = await axios.get("http://localhost:3000/registrations");
        setRegistrations(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRegistrations();
  }, []);

  return (
    <S.Container>
      <SearchBar />
      {registrations.length === 0 ? <Spinner /> : <Collumns registrations={registrations} />}
    </S.Container>
  );
};
export default DashboardPage;
