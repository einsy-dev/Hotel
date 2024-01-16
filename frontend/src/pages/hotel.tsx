import { useLayoutEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getHotels } from "../axios/appApi";
import { useParams } from "react-router-dom";

interface IHotel {
  name: string;
  description: string;
}

export default function Hotel() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const param = useParams();
  console.log(param);
 /*  useLayoutEffect(() => {
    getHotels(limit, offset, name)
      .then((data) => setHotels(data))
      .then((data) => console.log(data));
  }, []); */
  return (
    <Container className="bg-white rounded-4 shadow p-4">
      {/* {hotels[0].name} */}
    </Container>
  );
}
