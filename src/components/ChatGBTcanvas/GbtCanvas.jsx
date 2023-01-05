// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageEditor = () => {
//   const [imageUrl, setImageUrl] = useState('');
//   const [imageData, setImageData] = useState(null);
//   const [brushColor, setBrushColor] = useState('#000000');
//   const [brushSize, setBrushSize] = useState(5);
//   const [tool, setTool] = useState('draw');
//   const [rotation, setRotation] = useState(0);

//   // useEffect hook to fetch image from API when component mounts
//   useEffect(() => {
//     axios.get('/api/image')
//       .then(response => {
//         setImageUrl(response.data.imageUrl);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   // handle drawing on the image
//   const handleDraw = (event) => {
//     // get canvas and context
//     const canvas = event.target;
//     const ctx = canvas.getContext('2d');

//     // set brush properties
//     ctx.strokeStyle = brushColor;
//     ctx.lineWidth = brushSize;

//     // start drawing path
//     ctx.beginPath();
//     ctx.moveTo(event.offsetX, event.offsetY);

//     // set event listeners for drawing
//     const onMouseMove = (moveEvent) => {
//       ctx.lineTo(moveEvent.offsetX, moveEvent.offsetY);
//       ctx.stroke();
//     };
//     const onMouseUp = () => {
//       // stop drawing and remove event listeners
//       canvas.removeEventListener('mousemove', onMouseMove);
//       canvas.removeEventListener('mouseup', onMouseUp);
//     };
//     canvas.addEventListener('mousemove', onMouseMove);
//     canvas.addEventListener('mouseup', onMouseUp);
//   };

//   // handle erasing on the image
//   const handleErase = (event) => {
//     // get canvas and context
//     const canvas = event.target;
//     const ctx = canvas.getContext('2d');

//     // set erase properties (same as brush size and color, but with a composite operation of 'destination-out')
//     ctx.globalCompositeOperation = 'destination-out';
//     ctx.strokeStyle = brushColor;
//     ctx.lineWidth = brushSize;

//     // start drawing path
//     ctx.beginPath();
//     ctx.moveTo(event.offsetX, event.offsetY);
//   }
//     // set event listeners for drawing
//     const onMouseMove = (moveEvent) => {
//       ctx.lineTo(moveEvent.offsetX, moveEvent.offsetY);
//       ctx.stroke();
//     };
//     const onMouseUp = () => {
//       // stop drawing and remove event listeners
//       canvas.removeEventListener('mousemove', onMouseMove);
//       canvas.removeEventListener('mouseup', onMouseUp);
//       // reset composite operation to default
//       ctx.globalCom
//     }      
//   return (
//     <div>
//       <canvas

//       ></canvas>
//       <div>
//         <button >Draw</button>
//         <button >Erase</button>


//         <button >add map</button>
//       </div>
//     </div>
//   );
// };

// export default ImageEditor;