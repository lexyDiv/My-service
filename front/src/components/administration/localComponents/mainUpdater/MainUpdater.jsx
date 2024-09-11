import React, { useState } from "react";
import "./MainUpdater.css";
import { useSelector } from "react-redux";
import VideosBlock from "./localComponents/videosBlock/VideoBlock";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { useVideoArr } from "./functions/useVideoArr";
import { titleCBCreator } from "./functions/titleCBCreator";

const MainUpdater = function () {
  const { main } = useSelector((store) => store.main);
  const [updateMessage, setUpdateMessage] = useState("");

  const videosArr = useVideoArr({ setUpdateMessage });

  return (
    <div id="main-updater">
      {videosArr.map((videoData, i) => (
        <VideosBlock
          key={i + "video"}
          titleCB={titleCBCreator(videoData.videoState)}
          videoData={videoData}
        />
      ))}
      {updateMessage && (
        <GlobalMessage
          updateMessage={updateMessage}
          color={"red"}
          cb={() => setUpdateMessage("")}
        />
      )}
    </div>
  );
};

export default MainUpdater;
