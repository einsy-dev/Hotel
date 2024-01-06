import Container from "react-bootstrap/Container";
import Calendar from "./components/calendar";

function App() {
  return (
    <Container
      className="bg-light border border-dark"
      style={{ minHeight: "100vh" }}
    >
      <Calendar />
    </Container>
  );
}
export default App;
