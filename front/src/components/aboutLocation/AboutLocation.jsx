/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./AboutLocation.css";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { setLocalPageProg } from "../locationList/functions/setLocalPageProg";
import { useSetContentAboutLocation } from "./functions/useSetContextAboutLocation";

const AboutLocation = function () {
  const navigate = useNavigate();

  const dataPages = useRef([
    "сводный каледарь по",
    "новый дом в",
    "комменты по",
    "дома в",
    "редактировать",
  ]);
  const pages = dataPages.current;
  const loc = useLocation();
  const pageKey = loc.pathname;

  const saveLP = sessionStorage.getItem(pageKey);
  const [localPage, setLocalPage] = useState(saveLP || pages[0]);
  const { locationId } = useParams();
  const { locations } = useSelector((store) => store.locations);
  const location = locations.find((el) => el.id === Number(locationId));
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const dispatch = useDispatch();

  setTimeout(() => {
    if (!location) {
      window.history.replaceState(
        {},
        '',
        '/'
      )
      sessionStorage.removeItem(pageKey);
      navigate("/locations");
    }
  }, 10);

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
    sessionStorage.setItem(pageKey, page);
    setLocalPage(page);
  };

  const text = location ? `${localPage}  ${location.name}` : "";

  return (
    <div id="about-location-box">
      <NavBtn
        text={text}
        cb={cb}
        pages={
          pages.filter((el) => el !== localPage)
          // .map((page) => `${page}  ${location.name}`)
        }
        name={location ? location.name : ""}
      />
      <ScrollContainer localPage={localPage} contCallBack={constCallBack} />
    </div>
  );
};

export default AboutLocation;
