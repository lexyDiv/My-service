import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPlayer from "react-player";

const TitleVideo = function ({ itemSize, image, deleteCB, width }) {
  return (
    <div
      style={{
        width: `${width ? width : "auto"}px`,
      }}
      className="title-image-contur"
    >
      <ReactPlayer width={"90%"} playing={true} url={image} />

      <DeleteIcon
        onClick={deleteCB}
        color="warning"
        sx={{
          position: "absolute",
          top: 5,
          right: 0,
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default TitleVideo;
