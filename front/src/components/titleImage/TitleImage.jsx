import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TitleImage.css";

const TitleImage = function ({ itemSize, image, deleteCB }) {
  return (
    <div
      style={{
       // width: `${itemSize}px`,
        
      }}
      className="title-image-contur"
    >
      <img
        style={{
          width: `80%`,
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
          right: 0,
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default TitleImage;
