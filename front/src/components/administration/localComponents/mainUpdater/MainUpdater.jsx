import React, { useState } from "react";
import "./MainUpdater.css";
import { useSelector } from "react-redux";
import VideosBlock from "./localComponents/videosBlock/VideoBlock";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { useVideoArr } from "./functions/useVideoArr";
import { titleCBCreator } from "./functions/titleCBCreator";
import { isVideoChanged } from "./functions/isVideoChanged";
import ButtonWithQuestion from "../../../buttonWithQuestion/ButtonWithQuestion";
import { useVideoFetch } from "./functions/useVideoFetch";

const MainUpdater = function () {
  const { main } = useSelector((store) => store.main);
  const [updateMessage, setUpdateMessage] = useState("Активировать видео");
  const [messageColor, setMessageColor] = useState("green");
  const [deletedVideos, setDeletedVideos] = useState([]);

  const videosArr = useVideoArr({
    setUpdateMessage,
    setDeletedVideos,
    setMessageColor,
  });

  ///////// logic

  const needSave =
    deletedVideos.length || isVideoChanged({ main, videosArr }) ? true : false;


  const saveMenuPunkts = [
    {
      page: "да",
      cb: useVideoFetch({
        deletedVideos,
        videosArr,
        setUpdateMessage,
        setMessageColor,
        setDeletedVideos,
      }),
    },
    {
      page: "нет",
      cb: (hc) => {
        hc();
      },
    },
  ];

  return (
    <div id="main-updater">
      {updateMessage !== "Активировать видео" && videosArr.map((videoData, i) => (
        <VideosBlock
          key={i + "video"}
          titleCB={titleCBCreator(videoData.videoState)}
          videoData={videoData}
          setDeletedVideos={setDeletedVideos}
        />
      ))}
      {needSave && (
        <ButtonWithQuestion
          menuPunkt={saveMenuPunkts}
          fontSize={20}
          buttonContent={() => <p>сохранить</p>}
          hcCB={() => {}}
        />
      )}
      {updateMessage && (
        <GlobalMessage
          updateMessage={updateMessage}
          color={messageColor}
          cb={() => setUpdateMessage("")}
        />
      )}
    </div>
  );
};

export default MainUpdater;
