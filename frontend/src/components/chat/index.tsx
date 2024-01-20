import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ChatLeft } from "react-bootstrap-icons";

export default function Chat() {
  const [dialog, setDialog] = useState(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState([
    { res: "Здравствуйте, здесь выможете задавать вопросы в поддержку" },
  ]);

  return (
    <div className="position-fixed bottom-0 end-0 mb-5 me-5 d-flex flex-column align-items-end">
      {dialog && (
        <div
          className="border bg-white rounded-4 mb-4 shadow d-flex flex-column"
          style={{ minWidth: "300px", minHeight: "300px" }}
        >
          <div className="text-center border-bottom border-primary shadow">
            Тех поддержка
          </div>
          <div
            className=" d-flex flex-column p-2 overflow-auto"
            style={{ height: "500px" }}
          >
            {messages.map((el: any) =>
              Object.keys(el)[0] === "req" ? (
                <div
                  className="align-self-end bg-success bg-opacity-50 shadow p-2 rounded-4 text-center  overflow-hidden mb-2"
                  style={{ maxWidth: "60%" }}
                >
                  {el.req}
                </div>
              ) : (
                <div
                  className="align-self-start bg-primary bg-opacity-50 shadow p-2 rounded-4 text-center mb-2 overflow-hidden"
                  style={{ maxWidth: "60%" }}
                >
                  {el.res}
                </div>
              )
            )}
          </div>
          <Form.Control
            type="text"
            className="mt-auto rounded-bottom-4 px-4"
            value={input}
            onChange={(e: any) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter" && input.trim().length) {
                setMessages((prev: any) => [...prev, { req: input.trim() }]);
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
