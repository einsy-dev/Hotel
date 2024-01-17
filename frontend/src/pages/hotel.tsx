import { Container } from "react-bootstrap";
import HotelCardForm from "../components/hotel/hotel.card.form";

export default function Hotel() {
  return (
    <Container className="bg-white rounded-4 shadow p-4">
      <HotelCardForm />
    </Container>
  );
}
