import React from "react";
import "./TitleFilesContainer.css";

export const TitleFilesContainer = function ({ children, width, koof }) {
  const gap = (width - 30 - (width / koof) * 4) / 3;

  return (
    <div
      style={{
        gridTemplateColumns: `${width / koof}px ${width / koof}px ${
          width / koof
        }px ${width / koof}px`,
        gap: `${gap}px`,
      }}
      className="title-images-container"
    >
      {children}
    </div>
  );
};

export default TitleFilesContainer;
