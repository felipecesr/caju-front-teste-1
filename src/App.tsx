import { Dialog } from "~/components/Dialog";
import { Dialog as ReachDialog } from "@reach/dialog";
import Router from "~/router";
import { Header } from "./components/Header";
import { ActionType } from "./store/actionTypes";
import { useRegistrations } from "./store/registration";

function App() {
  const { state, dispatch } = useRegistrations();

  const close = () => dispatch({ type: ActionType.SET_STATUS, status: "idle" });

  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
      <Dialog />
      <ReachDialog
        isOpen={state.status === "success" || state.status === "failure"}
      >
        {state.status === "success" && <p>Sucesso</p>}
        {state.status === "failure" && <p>Erro</p>}
        <button type="button" onClick={close}>
          Fechar
        </button>
      </ReachDialog>
    </>
  );
}

export default App;
