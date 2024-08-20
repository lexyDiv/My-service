import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TitleImage.css";

const TitleImage = function ({ width, image, deleteCB }) {
  return (
    <div
      style={{
        width: `${width + 40}px`,
      }}
      className="title-image-contur"
    >
      <img
        style={{
          width: `${width}px`,
        }}
        className="title-image"
        alt="preview"
        src={image}
      />

      <DeleteIcon
      onClick={deleteCB}
      color="warning"
        sx={{
          position: "absolute",
          top: 5,
          left: `${width + 10}px`,
          cursor: "pointer",
        }}
      />
 
    </div>
  );
};

export default TitleImage;
