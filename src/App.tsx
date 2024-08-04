import { Dialog } from "~/components/Dialog";
import { Dialog as ReachDialog } from "@reach/dialog";
import { FaRegCircleXmark } from "react-icons/fa6";
import Router from "~/router";
import { Header } from "./components/Header";
import { ActionType } from "./store/actionTypes";
import { useRegistrations } from "./store/registration";
import { SuccessDialog } from "./components/SuccessDialog";

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
      <SuccessDialog isOpen={state.status === "success"} />
      <ReachDialog isOpen={state.status === "failure"}>
        <FaRegCircleXmark />
        <p>Erro</p>
        <button type="button" onClick={close}>
          Fechar
        </button>
      </ReachDialog>
    </>
  );
}

export default App;
