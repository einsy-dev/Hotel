import AppRouter from "./routes/app.router";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./components/navigation";
import LoginRegister from "./components/login.register";
import Chat from "./components/chat";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { authUser } from "./axios/user.api";
import ComponentLoading from "./components/hoc/component.loading";

function App() {
  const { isAuth, role }: any = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isLoadind, setIsLoadind] = useState(true);

  useLayoutEffect(() => {
    setIsLoadind(true);
    authUser()
      .then(({ user }) => {
        dispatch({ type: "AUTH", payload: { ...user, isAuth: true } });
      })
      .finally(() => setIsLoadind(false))
      .catch(() => {
        console.log("Авторизация не выполнена");
      });
  }, []);

  return (
    <ComponentLoading isLoading={isLoadind}>
      <div className="bg-light" style={{ minHeight: "100vh" }}>
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
              <AppRouter role={role} />
            </div>
            {isAuth && process.env.REACT_APP_SOCKET_URL && <Chat />}
          </main>
        </Container>
      </div>
    </ComponentLoading>
  );
}
export default App;
