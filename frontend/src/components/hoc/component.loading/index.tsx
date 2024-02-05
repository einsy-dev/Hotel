import { Spinner } from "react-bootstrap";

export default function ComponentLoading({ children, isLoading }: any) {
  return (
    <>
      {isLoading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="m-auto mt-5 d-flex"
        />
      ) : (
        children
      )}
    </>
  );
}
