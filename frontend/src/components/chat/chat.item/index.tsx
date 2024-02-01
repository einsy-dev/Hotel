import { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

export default function ChatItem({ data, socket, user, setActive }: any) {
  const [input, setInput] = useState<string>("");
  const chatRef = useRef<any>();
  useEffect(() => {
    chatRef.current &&
      (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [data]);
  const sendMessage = () => {
    socket.emit("message", {
      message: input.trim(),
      supportId: data._id,
    });
  };
  return (
    <div
      className="border bg-white rounded-4 mb-4 shadow d-flex flex-column"
      style={{ minWidth: "300px", minHeight: "300px" }}
    >
      <div className="border-bottom border-primary shadow  d-flex">
        <Button className="m-2" onClick={() => setActive(undefined)}>
          {"<"}
        </Button>
        <div className="text-center w-75 align-self-center">Тех поддержка</div>
      </div>

      <div
        ref={chatRef}
        className=" d-flex flex-column p-2 overflow-auto"
        style={{ height: "500px" }}
      >
        {data &&
          data.messages.map((el: any, index: number) =>
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
        autoFocus
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
  );
}
