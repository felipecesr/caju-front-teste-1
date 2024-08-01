import { Dialog } from "@reach/dialog";
import Router from "~/router";
import { Header } from "./components/Header";
import { useRegistrations } from "./context/registration";
import { ActionTypes } from "./context/registration/reducer";

function App() {
  const { state, dispatch } = useRegistrations();

  const close = () =>
    dispatch({ type: ActionTypes.SET_STATUS, status: "idle" });

  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
      <Dialog isOpen={state.status === "success"}>
        Sucesso!!!
        <button type="button" onClick={close}>
          Fechar
        </button>
      </Dialog>
    </>
  );
}

export default App;
