/* eslint-disable react-hooks/exhaustive-deps */
import React, { Children, useEffect, useRef, useState } from "react";
import "./ScrollContainer.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ScrollContainer = function ({ contCallBack, hIndex, localPage, scroll }) {
  const { wHeight: height } = useSelector((store) => store.windowHeight);
  const { loading } = useSelector((store) => store.loading);
  const loc = useLocation();
  const pageKey = loc.pathname + localPage;
  const scrollKey = pageKey + "scroll";
  const index = hIndex ? hIndex : 148;
  const scrollContHeight = `${height - index}px`;
  const divRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if(divRef.current) {
        divRef.current.scrollTop = (scroll === 0 || scroll) ? scroll :
          Number(sessionStorage.getItem(scrollKey)) || 0;
        }
      }, 0);
    }
  }, [localPage, loading]);

  return (
    <div
      ref={divRef}
      onScroll={(e) => {
        !loading && sessionStorage.setItem(scrollKey, e.target.scrollTop);
      }}
      id="scroll-container"
      style={{ height: `${scrollContHeight}` }}
    >
      {contCallBack}
    </div>
  );
};

export default ScrollContainer;
