import { useLayoutEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ChatLeft } from "react-bootstrap-icons";
import redux from "../../redux";
import io from "socket.io-client";
import ChatItem from "./chat.item";
import ChatList from "./chat.list";

export default function Chat() {
  const [dialog, setDialog] = useState(false);
  const [socket, setSocket] = useState<any>();
  const [data, setData] = useState<any>({});
  const [active, setActive] = useState<any>();
  const { user } = redux.getState();

  useLayoutEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_SOCKET_URL + "/?userId=" + user._id
    );
    setSocket(newSocket);

    newSocket.on("message", ({ message, supportId }) => {
      if (user.role === "client") {
        setData((prev: any) => {
          return { ...prev, messages: [...prev.messages, message] };
        });
      } else {
        setData((prev: any) =>
          prev.map((el: any) => {
            if (el._id === supportId) {
              el.messages = [...el.messages, message];
            }
            return el;
          })
        );
      }
    });

    newSocket.on("init", (res) => {
      setData(res);
    });

    newSocket.on("closeChat", (res) => {
      if (user.role === "client") {
        setData({});
      } else {
        setData((prev: any) => prev.filter((el: any) => el._id !== res._id));
      }
      setActive(undefined);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <div className="position-fixed bottom-0 end-0 mb-5 me-5 d-flex flex-column align-items-end">
      {dialog &&
        (user.role === "client" || active !== undefined ? (
          <ChatItem
            data={user.role === "client" ? data : data[active]}
            socket={socket}
            user={user}
            setActive={setActive}
          />
        ) : (
          <ChatList data={data} socket={socket} setActive={setActive} />
        ))}
      <Button
        className="rounded-4 p-3 pt-4 "
        onClick={() => setDialog(!dialog)}
      >
        <ChatLeft width={"35px"} height={"35px"} color="white" />
      </Button>
    </div>
  );
}
