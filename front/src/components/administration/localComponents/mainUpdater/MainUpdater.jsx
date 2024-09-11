import React, { useRef, useState } from "react";
import "./MainUpdater.css";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import VideosBlock from "./localComponents/videosBlock/VideoBlock";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { videoFileOnChange } from "./functions/videoFileOnChange";

const MainUpdater = function () {
  const { main } = useSelector((store) => store.main);
  const [updateMessage, setUpdateMessage] = useState("");
  // console.log(main);
  const [video, setVideo] = useState(
    main.video ? { url: main.video, file: null } : null
  );
  const [video2, setVideo2] = useState(
    main.video2 ? { url: main.video2, file: null } : null
  );
  const [video3, setVideo3] = useState(
    main.video3 ? { url: main.video3, file: null } : null
  );
  const [video4, setVideo4] = useState(
    main.video4 ? { url: main.video4, file: null } : null
  );

  const videoRef = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  const videosArr = [
    {
      videoState: video,
      dataRef: videoRef,
      onChangeCB: videoFileOnChange({
        setVideoFile: setVideo,
        setUpdateMessage,
      }),
    },
    {
      videoState: video2,
      dataRef: video2Ref,
      onChangeCB: videoFileOnChange({
        setVideoFile: setVideo2,
        setUpdateMessage,
      }),
    },
    {
      videoState: video3,
      dataRef: video3Ref,
      onChangeCB: videoFileOnChange({
        setVideoFile: setVideo3,
        setUpdateMessage,
      }),
    },
    {
      videoState: video4,
      dataRef: video4Ref,
      onChangeCB: videoFileOnChange({
        setVideoFile: setVideo4,
        setUpdateMessage,
      }),
    },
  ];

  const titleCBCreator = (videoState) => {
    return () => {
      return (
        <Button
          sx={{
            marginBottom: '10px',
          }}
          variant="outlined"
        >
          {videoState ? "Заменить видео" : "Добавить видео"}
          <CropOriginalIcon />
        </Button>
      );
    };
  };

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
