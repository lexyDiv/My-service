import React from "react";
import "./TitleFilesContainer.css";

export const TitleFilesContainer = function ({
  children,
  containerRef,
  itemSize,
  containerSize,
}) {
  
  const columns = Math.floor(containerSize / itemSize);
  const gap = (containerSize - itemSize * columns) / (columns - 1);

  return (
    <div
      ref={containerRef}
      style={{
        gridTemplateColumns: `repeat(${columns}, ${itemSize}px)`,
         gap: `${gap}px`,
      }}
      className="title-images-container"
    >
      {children}
    </div>
  );
};

export default TitleFilesContainer;
