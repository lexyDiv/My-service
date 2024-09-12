import React, { useState } from "react";
import "./MainUpdater.css";
import { useSelector } from "react-redux";
import VideosBlock from "./localComponents/videosBlock/VideoBlock";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { useVideoArr } from "./functions/useVideoArr";
import { titleCBCreator } from "./functions/titleCBCreator";
import { isVideoChanged } from "./functions/isVideoChanged";
import ButtonWithQuestion from "../../../buttonWithQuestion/ButtonWithQuestion";

const MainUpdater = function () {
  const { main } = useSelector((store) => store.main);
  const [updateMessage, setUpdateMessage] = useState("");
  const [deletedVideos, setDeletedVideos] = useState([]);

  const videosArr = useVideoArr({ setUpdateMessage, setDeletedVideos });

  ///////// logic

  const needSave =
    deletedVideos.length || isVideoChanged({ main, videosArr }) ? true : false;

  //   console.log(deletedVideos)
  //   console.log(videosArr[0])

  const saveMenuPunkts = [
    {page: "да", cb: (hc) => {hc(); console.log('save')}},
    {page: "нет", cb: (hc) => {hc();}},
  ];

  return (
    <div id="main-updater">
      {videosArr.map((videoData, i) => (
        <VideosBlock
          key={i + "video"}
          titleCB={titleCBCreator(videoData.videoState)}
          videoData={videoData}
          setDeletedVideos={setDeletedVideos}
        />
      ))}
      {updateMessage && (
        <GlobalMessage
          updateMessage={updateMessage}
          color={"red"}
          cb={() => setUpdateMessage("")}
        />
      )}
      {needSave && (
        <ButtonWithQuestion
          menuPunkt={saveMenuPunkts}
          fontSize={20}
          buttonContent={() => <p>сохранить</p>}
          hcCB={() => {}}
        />
      )}
    </div>
  );
};

export default MainUpdater;
