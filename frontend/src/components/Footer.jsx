import { useRef, useState, useEffect } from "react";

export default function Footer() {
  // const [state, setState] = useState({
  //   isDrawing: false,
  //   startX: 0,
  //   startY: 0,
  // });

  // const canvas = useRef();

  // useEffect = (()=> {
  //   const context = canvas.current.getContext("2d");
  //   canvas.addEventListener("mousedown", this.scratchStart);
  //   canvas.addEventListener("mousemove", this.scratch);
  //   canvas.addEventListener("mouseup", this.scratchEnd);

  //   canvas.addEventListener("touchstart", this.scratchStart);
  //   canvas.addEventListener("touchmove", this.scratch);
  //   canvas.addEventListener("touchend", this.scratchEnd);

  //   context.fillStyle = "#FFFF";
  //   context.fillRect(0, 0, window.outerwidth, window.outerHeight);
  //   context.lineWidth = 60;
  //   context.lineJoin = "round";
  // })

  // const scratch = e => {
  //   const { layerX, layerY } = e;
  //   const context = canvas.current.getContext("2d");

  //   if (!state.isDrawing) {
  //     return;
  //   }

  //   context.globalCompositeOperation = "destination-out";
  //   context.beginPath();
  //   context.moveTo(state.startX, state.startY);
  //   context.lineTo(layerX, layerY);
  //   context.closePath();
  //   context.stroke();

  //   setState({
  //     ...state,
  //     startX: layerX,
  //     startY: layerY
  //   });
  // };

  // const scratchEnd = e => {
  //   setState({
  //     ...state,
  //     isDrawing: false
  //   });
  // };

  return (
    <footer className="footer relative items-center p-4 m-3 mt-20 w-auto rounded-lg text-neutral-content bg-transparent -bottom-2 z-40 flex justify-between">
      <a
        className="z-40"
        href="https://github.com/mjstaus/Trotter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="transition hover:scale-110 ease-in-out duration-200 z-40"
          src="GitHub-Mark-32px.png"
          alt="Github-icon"
        ></img>
      </a>
      <div className="flex items-center z-40">
        <a href="/">
          <img
            className="transition ease-in-out duration-200 hover:scale-110"
            src="pig-dark.png"
            alt="Trotter-logo"
          ></img>
        </a>
        <p className="text-black">Trotter 2022</p>
      </div>
      {/* <div ref={canvas} className="absolute inset-0  h-full rounded-lg bg-green-900 z-20"></div> */}
      <div className="absolute inset-0  h-full rounded-lg bg-gradient-to-r from-white  to-purple-400 z-30"></div>
    </footer>
  );
}
