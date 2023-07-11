import React, { useEffect, useRef } from "react";

const ImageMaskingComponent = () => {
  const canvasRef = useRef(null);
  let isDrawing = false;

  const startDrawing = (e) => {
    isDrawing = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawing = false;
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set brush properties
    ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Black brush color
    ctx.globalCompositeOperation = "destination-out"; // Use destination-out composite mode for erasing

    // Draw the brush stroke
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load the transparent image
    const image = new Image();
    image.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGfy70ajGs7IZnGMilz5TWAf8cl_e0FyyyzttKK9QWbAzcTQHgBKNtpCm1c2bu0M_I0xQ&usqp=CAU";

    image.onload = () => {
      // Set the canvas size to match the image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0);
    };

    // Event listeners for drawing
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

    return () => {
      // Clean up event listeners
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mousemove", draw);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ImageMaskingComponent;
