import React, { Children, useEffect, useState } from "react";
import "./ScrollContainer.css";

const ScrollContainer = function ({ contCallBack }) {
  const [height, setHeight] = useState(window.innerHeight);

  const resizer = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", resizer);
    return () => window.removeEventListener("resize", resizer);
  }, []);

  const scrollContHeight = `${height - 160}px`;

  return (
    <div id="scroll-container" style={{ height: `${scrollContHeight}` }}>
      {contCallBack}
    </div>
  );
};

export default ScrollContainer;
