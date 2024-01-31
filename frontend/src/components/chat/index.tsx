import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ChatLeft } from "react-bootstrap-icons";
import redux from "../../redux";
import io from "socket.io-client";

export default function Chat() {
  const [dialog, setDialog] = useState(false);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<any>();
  const [data, setData] = useState<any>({});
  const chatRef = useRef<any>();
  const { user } = redux.getState();

  const sendMessage = () => {
    socket.emit("message", {
      message: input.trim(),
      supportId: data._id,
    });
  };
  useEffect(() => {
    chatRef.current &&
      (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [data, dialog]);

  useLayoutEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_SOCKET_URL + "/?userId=" + user._id
    );
    setSocket(newSocket);

    newSocket.on("message", ({ message, supportId }) => {
      setData((prev: any) => {
        return { ...prev, messages: [...prev.messages, message] };
      });
    });

    newSocket.on("init", (res) => {
      setData(res);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <div className="position-fixed bottom-0 end-0 mb-5 me-5 d-flex flex-column align-items-end">
      {dialog && (
        <div
          className="border bg-white rounded-4 mb-4 shadow d-flex flex-column"
          style={{ minWidth: "300px", minHeight: "300px" }}
        >
          <div className="text-center border-bottom border-primary shadow py-2">
            Тех поддержка
          </div>
          <div
            ref={chatRef}
            className=" d-flex flex-column p-2 overflow-auto"
            style={{ height: "500px" }}
          >
            {data.messages.map((el: any, index: number) =>
              el.author === user._id ? (
                <div
                  className="align-self-end bg-success bg-opacity-50 shadow p-2 rounded-4 text-center  ms-5 mb-2"
                  key={index}
                >
                  {el.text}
                </div>
              ) : (
                <div
                  className="align-self-start bg-primary bg-opacity-50 shadow p-2 rounded-4 text-center me-5 mb-2 "
                  key={index}
                >
                  {el.text}
                </div>
              )
            )}
          </div>
          <Form.Control
            type="text"
            className="m-auto mb-3 px-2"
            style={{ width: "90%" }}
            value={input}
            onChange={(e: any) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter" && input.trim().length) {
                sendMessage();
                setInput("");
              }
            }}
          />
        </div>
      )}
      <Button
        className="rounded-4 p-3 pt-4 "
        onClick={() => setDialog(!dialog)}
      >
        <ChatLeft width={"35px"} height={"35px"} color="white" />
      </Button>
    </div>
  );
}
