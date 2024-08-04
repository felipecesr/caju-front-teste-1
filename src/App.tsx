import { ConfirmDialog } from "~/components/ConfirmDialog";
import Router from "~/router";
import { Header } from "./components/Header";
import { useRegistrations } from "./store/registration";
import { FeedbackDialog } from "./components/FeedbackDialog";

function App() {
  const { state } = useRegistrations();

  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
      <ConfirmDialog />
      <FeedbackDialog
        isOpen={state.status === "success" || state.status === "failure"}
        type={state.status}
      />
    </>
  );
}

export default App;
