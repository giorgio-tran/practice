"use client";
import { useState, useRef } from "react";

export default function FilePreviewer() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");
  const filePicekerRef = useRef<HTMLInputElement>(null);
  function previewFile(e: React.ChangeEvent<HTMLInputElement>) {
    // Reading New File (open file Picker Box)
    const reader = new FileReader();
    // Gettting Selected File (user can select multiple but we are choosing only one)
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    // As the File loaded then set the stage as per the file type
    reader.onload = (readerEvent) => {
      if (selectedFile?.type.includes("image")) {
        setImagePreview((readerEvent.target as FileReader).result as string);
      } else if (selectedFile?.type.includes("video")) {
        setVideoPreview((readerEvent.target as FileReader).result as string);
      }
    };
  }
  
  return (
    <div>
      <h1>Preview Image/Video</h1>
      <div className="btn-container">
        <input ref={filePicekerRef} accept="image/*, video/*" onChange={previewFile} type="file" hidden />
        <button className="btn" onClick={() => filePicekerRef.current?.click()}>Choose</button>
        <button className="btn">x</button>
      </div>
      <div className="preview">
        <img src={imagePreview}></img>
        <video controls src={videoPreview}></video>
      </div>
    </div>
  );
}