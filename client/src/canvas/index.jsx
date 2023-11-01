import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import React, { useRef } from "react";
import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import Customizer from "../pages/Customizer";

const CanvasModel = () => {
  // Reference to the canvas element
  const canvasRef = useRef();

  // Function to handle the download button click
  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");

    // Convert the canvas content to a data URL
    const dataUrl = canvas.toDataURL();

    // Set the data URL as the href attribute of the anchor element
    link.href = dataUrl;

    // Set the filename for the downloaded image
    link.download = "canvas_image.png";

    // Simulate a click event on the anchor element to trigger the download
    link.click();
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      {/*<Environment preset="city" />*/}

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
