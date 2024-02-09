import Auth from "../modal/auth";
import { useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function LoginRegister() {
  const [modalShow, setModalShow] = useState(false);
  const [login, setLogin] = useState(false);
  const { isAuth } = useSelector((state: any) => state.user);
  return (
    <div className="ms-4 p-3 bg-white text-decoration-none w-50 text-end rounded-4 shadow">
      {!isAuth ? (
        <>
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
          />{" "}
        </>
      ) : (
        <div
          className="btn text-primary"
          onClick={() => {
            Cookies.remove("token");
            document.location.replace("/");
          }}
        >
          Выйти
        </div>
      )}
    </div>
  );
}
