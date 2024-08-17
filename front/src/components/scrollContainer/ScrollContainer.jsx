/* eslint-disable react-hooks/exhaustive-deps */
import React, { Children, useEffect, useRef, useState } from "react";
import "./ScrollContainer.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ScrollContainer = function ({ contCallBack, hIndex, localPage }) {
  const { wHeight: height } = useSelector((store) => store.windowHeight);
  const { loading } = useSelector((store) => store.loading);
  const loc = useLocation();
  const pageKey = loc.pathname + localPage;
  const scrollKey = pageKey + "scroll";
  const index = hIndex ? hIndex : 148;
  const scrollContHeight = `${height - index}px`;
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current && !loading) {
      // const saveScroll = Number(sessionStorage.getItem(scrollKey));
      // if (saveScroll) {
      //   const sh = divRef.current.scrollHeight;
      //   const deltaH = Number(saveScroll) - sh;
      //   let koof = 0;
      //   const interval = setInterval(() => {
      //     if (divRef.current) {
      //       divRef.current.scrollTop -= deltaH / (10 + koof);
      //       if (divRef.current.scrollTop >= saveScroll) {
      //         clearInterval(interval);
      //       }
      //       koof += 2;
      //     }
      //   }, 30);
      // } else {
      //   divRef.current.scrollTop = 0;
      // }
       divRef.current.scrollTop = Number(sessionStorage.getItem(scrollKey)) || 0;
    }
  }, [localPage, loading]);

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
