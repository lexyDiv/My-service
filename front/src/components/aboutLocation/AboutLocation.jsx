import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./AboutLocation.css";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { setLocalPageProg } from "../locationList/functions/setLocalPageProg";
import { useSetContentAboutLocation } from "./functions/useSetContextAboutLocation";

const AboutLocation = function () {
  const dataPages = useRef([
    "сводный каледарь по",
    "новый дом в",
    "комменты по",
    "дома в",
    "редактировать"
  ]);
  const pages = dataPages.current;
  const [localPage, setLocalPage] = useState(pages[0]);
  const { locationId } = useParams();
  const { locations } = useSelector((store) => store.locations);
  const location = locations.find((el) => el.id === Number(locationId));
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SELECT", payload: 1 });
  }, [dispatch]);

  const constCallBack = useSetContentAboutLocation(
    localPage,
    location,
    month,
    setMonth,
    year,
    setYear
  );

  const cb = (page) => {
    //setLocalPageProg(setLocalPage, pages);
    //setLocalPage(e.target.innerText);
    setLocalPage(page);
    
  };

  const text = `${localPage}  ${location.name}`;

  return (
    <div id="about-location-box">
      <NavBtn
        text={text}
        cb={cb}
        pages={pages
          .filter((el) => el !== localPage)
         // .map((page) => `${page}  ${location.name}`)
        }
        name={location.name}
      />
      <ScrollContainer contCallBack={constCallBack} />
    </div>
  );
};

export default AboutLocation;
