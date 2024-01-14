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
  return (
    <>
      <div className="bg-light">
        <Container className="d-flex flex-column">
          <header className="d-flex my-4">
            <NavLink
              to="/"
              className="text-decoration-none w-25 bg-primary text-white py-4 text-center rounded-4 shadow"
            >
              logo
            </NavLink>

            <div className="ms-4 p-3 bg-white text-decoration-none w-50 text-end rounded-4 shadow">
              <div
                className="btn text-primary"
                onClick={() => setModalShow(true)}
              >
                Войти
              </div>
              <Auth show={modalShow} onHide={() => setModalShow(false)} />
            </div>
          </header>

          <main className="d-flex">
            <Navigation />
            <div className="d-flex flex-column w-50 ms-4 ">
              <Calendar />
              <div className="mt-4 d-flex flex-wrap justify-content-center">
                <RoomCard img="fff" title="mein" description="lol" id="dd" />
                <RoomCard img="fff" title="mein" description="lol" id="dd" />
                <RoomCard img="fff" title="mein" description="lol" id="dd" />
                <RoomCard img="fff" title="mein" description="lol" id="dd" />
                <RoomCard img="fff" title="mein" description="lol" id="dd" />

                <Pagination limitPage={5} activePage={3} />
              </div>
            </div>
          </main>
        </Container>
      </div>
    </>
  );
}
