import React from "react";
import AddFile from "../../../../../addFile/AddFile";
import './VideoBlock.css';
import TitleVideo from "../../../../../titleVideo/TitleVideo";

const VideosBlock = function ({ videoData, titleCB }) {
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
          deleteCB={() => {}}
          width={300}
        />
      )}
    </div>
  );
};

export default VideosBlock;
