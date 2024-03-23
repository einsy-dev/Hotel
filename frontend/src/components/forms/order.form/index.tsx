import { Button, Modal } from "react-bootstrap";
import Calendar from "../../calendar";
import { useState } from "react";
import { format } from "../../../utils/date.format";
import { createReservation } from "../../../axios/user.api";
import { useSelector } from "react-redux";

export default function OrderForm({ onHide, id, hotel }: any) {
  const [calendar, setCalendar] = useState(false);
  const { _id } = useSelector((state: any) => state.user);
  const { order } = useSelector((state: any) => state.store);
  async function reservation() {
    createReservation({ userId: _id, roomId: id, hotelId: hotel, order });
  }
  return (
    <div className="d-flex flex-column p-4">
      <div
        className=" d-flex justify-content-center user-select-none mb-3"
        onClick={() => setCalendar(true)}
      >
        <div className="border form-control text-center">
          {format(order.from)}
        </div>
        <div className="w-25 text-center my-auto">-</div>
        <div className="border form-control text-center">
          {format(order.to)}
        </div>
      </div>
      <Modal show={calendar} onHide={() => setCalendar(false)}>
        <Calendar onHide={() => setCalendar(false)} />
      </Modal>
      <Button
        onClick={() => {
          reservation();
          onHide();
        }}
      >
        Забронировать
      </Button>
    </div>
  );
}
