import { HashRouter } from "react-router-dom";
import AppRouter from "./routes/app.router";

function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}
export default App;
