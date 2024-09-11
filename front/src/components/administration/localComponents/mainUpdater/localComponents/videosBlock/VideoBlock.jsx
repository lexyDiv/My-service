import React from "react";
import AddFile from "../../../../../addFile/AddFile";
import TitleImage from "../../../../../titleImage/TitleImage";

const VideosBlock = function({ videoData, titleCB }) {
    return (
        <div>
          <AddFile titleCB={titleCB} fileRef={videoData.dataRef} onChangeCB={videoData.onChangeCB}/>
          {videoData.videoState && <TitleImage image={videoData.videoState.url} deleteCB={() => {}} width={300}/>}
        </div>
    )
}

export default VideosBlock;