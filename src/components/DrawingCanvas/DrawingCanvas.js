import "./DrawingCanvas.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import tableColor from "../../assets/avatar.png";
import table from "../../assets/tableBlack.png";
// import ReactCanvas from "react-canvas"
import { saveAs } from "file-saver";
import DownloadMap from "./DownloadMap";
const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  // var koordinat = [];
  const [isDrawing, setIsDrawing] = useState(false);
  const [apimap, setApimap] = useState();
  const [koor, setKoor] = useState([]);
  const [dummy, setDummy] = useState({});
  useEffect(() => {
    getMapApi();
    getTable();

    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;

    const mapFoto = new Image();
    mapFoto.width = 400;
    mapFoto.height = 400;
    // console.log("MApppppp", mapFoto.width);
    mapFoto.src = tableColor;
    mapFoto.onload = function () {
      context.drawImage(mapFoto, 0, 400);

      // const avatar = new Image();
      // avatar.src = table;
      // avatar.onload = function () {
      //   context.drawImage(avatar, 50.5, 200.5);
      // };
      if (koor) {
        for (let index = 0; index < koor.length; index++) {
          // console.log(koor[index].x.$numberDecimal);
          // console.log(koor[index].y.$numberDecimal);
          const avatar = new Image();
          avatar.src = table;
          avatar.onload = function () {
            context.drawImage(
              avatar,
              koor[index].x.$numberDecimal * 20,
              koor[index].y.$numberDecimal * 20
            );
          };
        }
      }
    };
  }, [dummy]);
  function getMapApi() {
    fetch("http://127.0.0.1:5050/api/v1/images/getImage")
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = "../image.jpg";
        a.pathname = "./";
        console.log(a.pathname);
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        console.log("burası map function");
      });
  }
  // function getMapApi() {
  //   axios
  //     .get("http://127.0.0.1:5050/api/v1/images/getImage")
  //     .then((res) => {
  //       // const link = "https://wallpaperaccess.com/full/3538579.jpg";
  //       // const blob = new Blob([link], { type: "image/jpeg" });
  //       // saveAs(blob, "assets/image.jpg");
  //       // setApimap(res.data.link);
  //       // console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function getTable() {
    axios
      .get("http://127.0.0.1:5050/api/v1/ros/positionMarker")
      .then((res) => {
        setKoor(res.data.data.Position);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(apimap);
  const handleMap = () => {
    setDummy({});
    // canvasRef.current.drawImage(apimap,0,0,500,500)
    // contextRef.current.innerHTML = apimap;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    // contextRef.current.moveTo(40, 40);
    // contextRef.current.lineTo(500, 500);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };
  const setToDontknow = () => {
    contextRef.current.globalCompositeOperation = "destination-in";
  };
  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };
  return (
    <div>
      <canvas
        style={{ backgroundImage: `url(${apimap})` }}
        className="canvas-container"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>

      <div>
        <button onClick={setToDraw}>Draw</button>
        <button onClick={setToErase}>Erase</button>
        <button onClick={setToDontknow}>Clear All</button>
        <a
          id="download_image_link"
          href="download_link"
          onClick={saveImageToLocal}
        >
          Download Image
        </a>
        <button onClick={handleMap}>add map</button>
        {/* <DownloadMap apiMap={apimap} /> */}
        <button onClick={getMapApi}> arslan map</button>
      </div>
    </div>
  );
};

export default DrawingCanvas;

// // Get a reference to the canvas element
// const canvas = document.getElementById('canvas');

// // Get the 2D drawing context of the canvas
// const ctx = canvas.getContext('2d');

// // Create an Image object
// const avatar = new Image();

// // Set the src property of the Image object to the URL of the avatar image
// avatar.src = 'avatar.png';

// // When the image has finished loading, draw it onto the canvas
// avatar.onload = function() {
//   ctx.drawImage(avatar, 0, 0);
// }
