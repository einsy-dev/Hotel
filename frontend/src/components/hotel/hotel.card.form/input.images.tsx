import Image from "react-bootstrap/Image";
import { PlusCircle, X } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useState } from "react";

export default function InputImages({ setInputFiles }: any) {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className="d-flex align-items-center overflow-auto pb-3">
      {files.map((url: string, i: number) => (
        <div
          className="border position-relative rounded-4 me-4"
          style={{ width: "fit-content" }}
          key={i}
        >
          <Image src={url} width={200} height={200} className="rounded-4" />

          <Button
            variant="danger"
            className="position-absolute top-0 end-0 mt-2 me-2 rounded-4 px-2 py-0"
            onClick={() => {
              setFiles((prev: any) =>
                prev.filter((_: any, index: number) => index !== i)
              );
            }}
          >
            <X width="25px" height="25px" />
          </Button>
        </div>
      ))}
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        id="file-input"
        onChange={(e) => {
          if (e.target.files) {
            const fileList = Array.from(e.target.files);
            setInputFiles((prev: any) => prev.concat(fileList));
            setFiles((prev: any) => {
              return prev.concat(
                fileList.map((file: any) => URL.createObjectURL(file))
              );
            });
          }
        }}
      />
      <label htmlFor="file-input">
        <div
          className="btn bg-secondary rounded-4 d-flex justify-content-center align-items-center"
          style={{ height: "100px", width: "100px" }}
        >
          <PlusCircle color="white" width="50px" height="50px" />
        </div>
      </label>
    </div>
  );
}
