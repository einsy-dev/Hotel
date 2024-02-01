import moment from "moment";
import { Button, Table } from "react-bootstrap";

export default function ChatList({ data, setActive, socket }: any) {
  return (
    <div
      className="border bg-white rounded-4 mb-4 shadow d-flex flex-column p-2"
      style={{ minWidth: "300px", minHeight: "300px" }}
    >
      <Table responsive>
        <thead>
          <tr className="text-center">
            <th>№</th>
            <th>Дата</th>
            <th>Сообщение</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((el: any, index: number) => (
              <tr
                className="text-center"
                key={index}
                onClick={() => setActive(index - 1)}
              >
                <td>{++index}</td>
                <td>
                  {moment(el.messages[el.messages.length - 1].sentAt).format(
                    "DD.MM.YYYY"
                  )}
                </td>
                <td>{el.messages[el.messages.length - 1].text}</td>
                <td>
                  <Button
                    onClick={() => {
                      socket.emit("closeChat", { supportId: el._id });
                    }}
                    variant="danger"
                  >
                    x
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
