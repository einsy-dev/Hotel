import Container from "react-bootstrap/Container";
import Calendar from "../components/calendar";
import RoomCard from "../components/card";
import Pagination from "../components/pagination";
import { NavLink } from "react-router-dom";
import Navigation from "../components/navigation";
import Auth from "../modal/auth";
import { useState } from "react";

export default function Main() {
  const [modalShow, setModalShow] = useState(false);
  const [login, setLogin] = useState(false);
  return (
    <>
      <div className="bg-light">
        <Container className="d-flex flex-column">
          <header className="d-flex mt-4">
            <NavLink
              to="/"
              className="text-decoration-none w-25 bg-primary text-white py-4 text-center rounded-4 shadow"
            >
              logo
            </NavLink>

            <div className="ms-4 p-3 bg-white text-decoration-none w-50 text-end rounded-4 shadow">
              <div
                className="btn text-primary"
                onClick={() => {
                  setModalShow(true);
                  setLogin(true);
                }}
              >
                Войти
              </div>

              <div
                className="btn text-primary"
                onClick={() => {
                  setModalShow(true);
                  setLogin(false);
                }}
              >
                Регистрация
              </div>
              <Auth
                show={modalShow}
                onHide={() => setModalShow(false)}
                login={login}
              />
            </div>
          </header>

          <main className="d-flex">
            <nav className="w-25">
              <Navigation />
              <Navigation />
            </nav>

            <div className="d-flex flex-column w-50 ms-4  mt-4">
              <Calendar />
              <div className="d-flex flex-wrap justify-content-center">
                <RoomCard
                  img="https://i.pinimg.com/736x/a5/27/7a/a5277abdcbfce15780f4fc587ca172ab.jpg"
                  title="mein"
                  description="lol"
                  id="dd"
                />
                <RoomCard
                  img="https://i.pinimg.com/736x/a5/27/7a/a5277abdcbfce15780f4fc587ca172ab.jpg"
                  title="mein"
                  description="lol"
                  id="dd"
                />
                <RoomCard
                  img="https://i.pinimg.com/736x/a5/27/7a/a5277abdcbfce15780f4fc587ca172ab.jpg"
                  title="mein"
                  description="lol"
                  id="dd"
                />
                <RoomCard
                  img="https://i.pinimg.com/736x/a5/27/7a/a5277abdcbfce15780f4fc587ca172ab.jpg"
                  title="mein"
                  description="lol"
                  id="dd"
                />
                <RoomCard
                  img="https://i.pinimg.com/736x/a5/27/7a/a5277abdcbfce15780f4fc587ca172ab.jpg"
                  title="mein"
                  description="lol"
                  id="dd"
                />

                <Pagination limitPage={8} activePage={7} />
              </div>
            </div>
          </main>
        </Container>
      </div>
    </>
  );
}
