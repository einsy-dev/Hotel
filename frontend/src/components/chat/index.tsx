import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ChatLeft } from "react-bootstrap-icons";
import io from "socket.io-client";

export default function Chat({ id }: any) {
  const [dialog, setDialog] = useState(false);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<any>();
  const [data, setData] = useState<any>([]);
  const chatRef = useRef<any>();

  const sendMessage = () => {
    socket.emit("message", {
      message: input.trim(),
      supportId: data[0]._id,
    });
  };
  useEffect(() => {
    chatRef.current &&
      (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [data, dialog]);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL + "/?userId=" + id);
    setSocket(newSocket);

    newSocket.on("init", (res) => {
      setData(res);
    });

    newSocket.on("message", ({ message, supportId }) => {
      setData((prev: any) => {
        return prev.map((el: any) => {
          if (el._id === supportId) {
            return {
              ...el,
              messages: [...el.messages, message],
            };
          } else {
            return el;
          }
        });
      });
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
            {data[0].messages.map((el: any, index: number) =>
              el.author === id ? (
                <div
                  className="align-self-end bg-success bg-opacity-50 shadow p-2 rounded-4 text-center  ms-4 mb-2"
                  key={index}
                >
                  {el.text}
                </div>
              ) : (
                <div
                  className="align-self-start bg-primary bg-opacity-50 shadow p-2 rounded-4 text-center me-4 mb-2 "
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
