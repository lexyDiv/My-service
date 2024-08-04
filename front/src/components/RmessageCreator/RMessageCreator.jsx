import React, { useEffect, useState } from "react";
import "./RMessageCreator.css";

const RMessageCreator = function ({ cb }) {
  const [winGab, setwinGab] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    type: "pan",
  });

  const [messageText, setMessageText] = useState("");

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
  //console.log(cb)
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
          id="r-message-creator-imput"
        >
          <textarea
            value={messageText}
            id="r-message-creator-imput-text"
            onChange={(e) => setMessageText(e.target.value)}
          />

          <div id="r-message-creator-imput-buttons">
            <div
              className="r-message-creator-imput-go-box"
              onClick={() => setwinGab((prev) => ({ ...prev, type: "pan" }))}
            >
              <img
                className="r-message-creator-imput-go"
                src="/close.png"
                alt="img"
              />
            </div>
            {messageText && (
              <div
                className="r-message-creator-imput-go-box"
                onClick={() => {
                  cb(messageText);
                  setwinGab((prev) => ({ ...prev, type: "pan" }));
                  setMessageText("");
                }}
              >
                <img
                  className="r-message-creator-imput-go"
                  src="/goMessage.png"
                  alt="img"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {winGab.type !== 'pan' && <div id="blockator"/>}
    </>
  );
};

export default RMessageCreator;
