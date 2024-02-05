import { Table } from "react-bootstrap";
import { format } from "../../utils/date.format";

export default function Reservations({ data }: any) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr className="text-center">
          <th>№</th>
          <th>От</th>
          <th>До</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el: any, index: number) => (
          <tr key={index} className="text-center">
            <td>{++index}</td>
            <td>{format(el.dateStart)}</td>
            <td>{format(el.dateEnd)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
