/* eslint-disable react-hooks/exhaustive-deps */
import React, { Children, useEffect, useRef, useState } from "react";
import "./ScrollContainer.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ScrollContainer = function ({ contCallBack, hIndex, localPage }) {
  const { wHeight: height } = useSelector((store) => store.windowHeight);
  const loc = useLocation();
  const pageKey = loc.pathname;
  const scrollKey = pageKey + "scroll";
  const index = hIndex ? hIndex : 148;
  const scrollContHeight = `${height - index}px`;
  const divRef = useRef(null);

  useEffect(() => {
    if(divRef.current) {
      setTimeout(() => {
        divRef.current.scrollTop = Number(sessionStorage.getItem(scrollKey)) || 0;
      }, 0);
    }
  }, [localPage]);

  return (
    <div
    ref={divRef}
      onScroll={(e) => {
       sessionStorage.setItem(scrollKey, e.target.scrollTop);
      }}
      id="scroll-container"
      style={{ height: `${scrollContHeight}` }}
    >
      {contCallBack}
    </div>
  );
};

export default ScrollContainer;
