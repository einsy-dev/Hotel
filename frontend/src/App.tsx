import { useState } from "react";
import Button from "react-bootstrap/Button";

function App() {
  let [count, setCount] = useState(0);

  return (
    <Button variant="primary" onClick={() => setCount(count++)}>
      {count}
    </Button>
  );
}

export default App;
