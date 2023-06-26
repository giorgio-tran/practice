"use client";
import { useState, useRef, useEffect } from "react";

export default function FilePreviewer() {
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(0);
  const layerRef = useRef<number>(1);
  const filePicekerRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startRef = useRef<boolean>(true);
  function previewFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log(e.target.files);
      setVideoPreview(URL.createObjectURL(selectedFile));
    }
  }

  function drawCanvas(now: DOMHighResTimeStamp, metadata: VideoFrameCallbackMetadata) {
      startRef.current = false;
      console.log("metadata", metadata);
      const video = videoRef.current;
      if (video) {
        if (canvasRef.current && drawingRef.current) {
          canvasRef.current.height = video?.offsetHeight as number;
          canvasRef.current.width = video?.offsetWidth as number;
          const ctx = canvasRef.current?.getContext("2d");
          ctx?.drawImage(
            video as HTMLVideoElement,
            0,
            0,
            video?.offsetWidth as number,
            video?.offsetHeight as number
          );
          const drawContext = drawingRef.current?.getContext("2d") as CanvasRenderingContext2D;
              for (let i = 0; i < video.offsetWidth; i++) {
                const pixel = ctx?.getImageData(i, layerRef.current - 1, 1, 1).data as Uint8ClampedArray;
                console.log("metadata", metadata)
                drawContext.fillStyle = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`;
                drawContext.fillRect(i, layerRef.current - 1 as number, 1, 1);
              // console.log("layer:", layerRef.current);
              }
            }
          layerRef.current += 1;
          
          video?.requestVideoFrameCallback(drawCanvas)
      }
  }

  return (
    <div>
      <h1>Preview Image/Video</h1>
      <div className="btn-container">
        <input
          ref={filePicekerRef}
          accept="image/*, video/*"
          onChange={previewFile}
          type="file"
          hidden
        />
        <button className="btn" onClick={() => filePicekerRef.current?.click()}>
          Choose
        </button>
        <button className="btn">x</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
        <button
          onClick={() => {
            videoRef.current?.paused
              ? videoRef.current.play()
              : videoRef.current?.pause();
          }}
        >PLAY</button>
        <video controls src={videoPreview} ref={videoRef}  onPlay={drawCanvas}/>
        <canvas ref={canvasRef} />
        <canvas ref={drawingRef} height="2000px"/>
      </div>
    </div>
  );
}
