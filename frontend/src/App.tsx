import AppRouter from "./routes/app.router";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./components/navigation";
import LoginRegister from "./components/login.register";

function App() {
  return (
    <div className="bg-light vh-100">
      <Container className="d-flex flex-column">
        <header className="d-flex my-4">
          <NavLink
            to="/"
            className="text-decoration-none w-25 bg-primary text-white py-4 text-center rounded-4 shadow"
          >
            logo
          </NavLink>
          <LoginRegister />
        </header>

        <main className="d-flex">
          <nav className="w-25">
            <Navigation />
          </nav>
          <div className="d-flex flex-column w-50 mx-4">
            <AppRouter />
          </div>
        </main>
      </Container>
    </div>
  );
}
export default App;
