import React from "react";
import { saveAs } from "file-saver";

function Image({ apimap }) {
  const handleSave = () => {
    // Create a Blob object from the image URL
    fetch(apimap)
      .then((response) => response.blob())
      .then((blob) => {

        
        // Use the FileSaver.js library to save the Blob object as an image file
        saveAs(blob, "image.jpg");
      });
  };

  return (
    <button type="button" onClick={handleSave}>
      Save
    </button>
  );
}
export default Image;