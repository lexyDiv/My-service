/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalMessage from "../globalMessage/GlobalMessage";
import MainContainer from "../mainContainer/MainContainer";

let interval = null;
let vc = 0;

const Main = function () {
  const { wHeight, wWidth } = useSelector((store) => store.windowHeight);
  const { main, activate } = useSelector((store) => store.main);
  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const videoElement = React.useMemo(() => {
    if (main && main.video) {
      const element = document.createElement("video");
      element.src = main.video;
      return element;
    }
    return null;
  }, [main]);

  useEffect(() => {
    let videoStart = false;
    if (canvasRef.current && !interval && activate && videoElement) {
      ctxRef.current = canvasRef.current.getContext("2d");
      interval = setInterval(() => {
        if (!videoStart && videoElement.videoWidth) {
          videoStart = true;
          videoElement.play();
          videoElement.currentTime = vc;
        }
        if (Math.floor(videoElement.duration) <= videoElement.currentTime) {
          videoElement.currentTime = 0;
        }
        const canvasHeight =
          (wWidth * videoElement.videoHeight) / videoElement.videoWidth;
        canvasRef.current.height = canvasHeight;
        canvasRef.current.width = wWidth;
        const videoW = videoElement ? videoElement.videoWidth : 0;
        const videoH = videoElement ? videoElement.videoHeight : 0;
        ctxRef.current.drawImage(
          videoElement,
          0,
          0,
          videoW,
          videoH,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        if (videoElement) {
          vc = videoElement.currentTime;
        }
      }, 30);
    }

    return () => {
      clearInterval(interval);
      videoElement && videoElement.pause();
      interval = null;
      videoStart = false;
    };
  }, [activate, canvasRef, videoElement]);

  const content = !activate ? (
    <></>
  ) : (
    <>
      <canvas className="canvas" ref={canvasRef} />
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainContainer height={wHeight - 75} content={content} />
      {!activate && (
        <GlobalMessage
          updateMessage={"Добро пожаловать"}
          color={"rgb(1, 255, 1)"}
          cb={() => dispatch({ type: "ACTIVATE" })}
        />
      )}
    </div>
  );
};

export default Main;
