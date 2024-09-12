import React from "react";
import AddFile from "../../../../../addFile/AddFile";
import "./VideoBlock.css";
import TitleVideo from "../../../../../titleVideo/TitleVideo";
import { useSelector } from "react-redux";

const VideosBlock = function ({ videoData, titleCB, setDeletedVideos }) {
  const { main } = useSelector((store) => store.main);

  const deleteCB = () => {
    if (
      main[videoData.mainKey] &&
      videoData.videoState &&
      main[videoData.mainKey] === videoData.videoState.url
    ) {
      setDeletedVideos((prev) => [
        ...prev,
        { mainKey: videoData.mainKey, name: main[videoData.mainKey] },
      ]);
    }
    videoData.setVideoFile(null);
    videoData.dataRef.current.value = "";
  };

  return (
    <div className="add-video-block">
      <AddFile
        titleCB={titleCB}
        fileRef={videoData.dataRef}
        onChangeCB={videoData.onChangeCB}
      />
      {videoData.videoState && (
        <TitleVideo
          image={videoData.videoState.url}
          deleteCB={deleteCB}
          width={300}
        />
      )}
    </div>
  );
};

export default VideosBlock;
