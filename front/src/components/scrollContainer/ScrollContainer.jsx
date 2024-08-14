import React, { Children, useEffect, useState } from "react";
import "./ScrollContainer.css";
import { useSelector } from "react-redux";

const ScrollContainer = function ({ contCallBack, hIndex }) {
  // const [height, setHeight] = useState(window.innerHeight);

  // const resizer = () => {
  //   setHeight(window.innerHeight);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", resizer);
  //   return () => window.removeEventListener("resize", resizer);
  // }, []);

const { wHeight: height } = useSelector(store => store.windowHeight);

  const index = hIndex ? hIndex : 160;
  const scrollContHeight = `${height - index}px`;

  return (
    <div id="scroll-container" style={{ height: `${scrollContHeight}` }}>
      {contCallBack}
    </div>
  );
};

export default ScrollContainer;
