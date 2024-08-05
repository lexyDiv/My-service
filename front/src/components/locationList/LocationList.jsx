import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./LocationList.css";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import NavBtn from "../navBtn/NavBtn";
import { useSetContent } from "./functions/useSetContent";
import { setLocalPageProg } from "./functions/setLocalPageProg";

const pages = ["наши базы", "создать базу"];

const LocationList = function () {
  const [localPage, setLocalPage] = useState(pages[0]);
  //const dispatch = useDispatch();

  // useEffect(() => {
  //   // dispatch({ type: "FIRST", payload: [{ name: "БАЗЫ", path: "/", id: 0 }] });
  // }, [dispatch]);

  const constCallBack = useSetContent(localPage);

  const cb = (page) => {
    //setLocalPageProg(setLocalPage, pages);
   setLocalPage(page);
  // console.log(e.target.innerText)
    
  };

  return (
    <div className="locations-box">
      <NavBtn
        text={localPage}
        cb={cb}
        pages={pages.filter((el) => el !== localPage)}
      />
      <ScrollContainer contCallBack={constCallBack} />
    </div>
  );
};

export default LocationList;
