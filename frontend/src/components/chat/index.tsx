import { Button } from "react-bootstrap";
import { ChatLeft } from "react-bootstrap-icons";

export default function Chat() {
  return (
    <Button className="position-fixed bottom-0 end-0 mb-5 me-5  rounded-4 p-3 pt-4 ">
      <ChatLeft width={"35px"} height={"35px"} color="white" />
    </Button>
  );
}
