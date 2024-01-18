import Auth from "../modal/auth";
import { useLayoutEffect, useState } from "react";
import { authUser } from "../../axios/userApi";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function LoginRegister() {
  const [modalShow, setModalShow] = useState(false);
  const [login, setLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    authUser()
      .then((res) => {
        dispatch({ type: "AUTH", payload: res });
      })
      .then(() => setIsAuth(true))
      .catch(() => {
        console.log("Авторизация не выполнена");
      });
  }, []);
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
            document.location.reload();
          }}
        >
          Выйти
        </div>
      )}
    </div>
  );
}
