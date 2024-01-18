import Carousels from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

export default function Carousel({ images }: { images: string[] }) {
  return (
    <Carousels>
      {images.map((image, index) => (
        <Carousels.Item key={index}>
          <Image
            src={process.env.REACT_APP_SERVER_API + "/" + image}
            className="d-block w-100 rounded-4"
          />
        </Carousels.Item>
      ))}
    </Carousels>
  );
}
