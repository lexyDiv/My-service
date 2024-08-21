/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import "./LocationList.css";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import NavBtn from "../navBtn/NavBtn";
import { useSetContent } from "./functions/useSetContent";
import { useLocation } from "react-router-dom";

const pages = ["наши базы", "создать базу"];

const LocationList = function () {
  const loc = useLocation();
  const pageKey = loc.pathname;
  
  const saveLP = sessionStorage.getItem(pageKey);
  const [localPage, setLocalPage] = useState(saveLP || pages[0]);


  const constCallBack = useSetContent(localPage);

  const cb = (page) => {
    setLocalPage(page);
    sessionStorage.setItem(pageKey, page);
  };

  return (
    <div className="locations-box">
      <NavBtn
        text={localPage}
        cb={cb}
        pages={pages.filter((el) => el !== localPage)}
      />
      <ScrollContainer
       contCallBack={constCallBack}
      // scrollLevel={scrollLevel}
       localPage={localPage}
       />
    </div>
  );
};

export default LocationList;
