import React, { useEffect, useRef, useState } from "react";
import "./RMessageCreator.css";

const RMessageCreator = function ({ user, rent }) {
  const [winGab, setwinGab] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    type: "pan",
  });

  function resizeLestenner() {
    setwinGab((prev) => ({
      ...prev,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  }

  useEffect(() => {
    window.addEventListener("resize", resizeLestenner);
    return () => window.removeEventListener("onresize", resizeLestenner, true);
  }, []);

  return (
    <>
      {winGab.type === "pan" ? (
        <div
          onClick={() => setwinGab((prev) => ({ ...prev, type: "input" }))}
          style={{
            left: `${winGab.width - 70}px`,
            top: `${winGab.height - 270}px`,
          }}
          id="r-message-creator"
        >
          <img src="/pan.png" alt="img" />
        </div>
      ) : (
        <div 
        style={{
            left: `${(winGab.width - 310) / 2}px`,
            top: `${winGab.height - 170}px`,
          }}
        id="r-message-creator-imput">
          <textarea id="r-message-creator-imput-text" />
        </div>
      )}
    </>
  );
};

export default RMessageCreator;
