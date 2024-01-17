import { useState } from "react";
import { Form } from "react-bootstrap";

export default function Home() {
  const [files, setFiles] = useState<string[]>([]);

  // transform files into data urls

  return (
    <div className="">
      {files.map((url, i) => (
        <img src={url} height={300} width={240} key={i} alt="FK" />
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
            setFiles(fileList.map((file: any) => URL.createObjectURL(file)));
          }
        }}
      />
      <label htmlFor="file-input">
        <div className="">LLLL</div>
      </label>
    </div>
  );
}
