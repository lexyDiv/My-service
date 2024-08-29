import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./AboutHouse.css";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { useSetContentAboutHouse } from "./functions/useSetcontextAboutHouse";

const AboutHouse = function () {
  const { user } = useSelector((store) => store.user);
  const localPageData = [
    "создать бронь/найм в",
    "комменты по",
    "вся бронь/найм в",
    "редактировать/удалить",
  ];
  const { quickInterval } = useSelector((store) => store.quickInterval);

  // dispatch({ type: "SET_INTERVAL", payload: newInterval });
  // user && user.admin && localPageData.splice(1, 0, "редактировать/удалить");
  const dataPages = useRef([...localPageData]);
  const pages = dataPages.current;
  const loc = useLocation();
  const pageKey = loc.pathname;

  const saveLP = sessionStorage.getItem(pageKey);
  const [localPage, setLocalPage] = useState(
    quickInterval ? "создать бронь/найм в" : saveLP || pages[0]
  );
  const { locationId, houseId } = useParams();
  const { locations } = useSelector((store) => store.locations);

  const location = locations.find((el) => el.id === Number(locationId));
  const house = location
    ? location.Houses.find((el) => el.id === Number(houseId))
    : null;
  const navigate = useNavigate();

  setTimeout(() => {
    if (!house) {
      window.history.replaceState({}, "", "/");
      sessionStorage.removeItem(pageKey);
      navigate("/locations");
    }
  }, 10);

  const images = house ? JSON.parse(house.images) : [];

  house && images.push(house.image);

  const cb = (page) => {
    sessionStorage.setItem(pageKey, page);
    setLocalPage(page);
  };

  const text = house ? `${localPage}  ${location.name} ${house.name}` : "";

  const contCallBack = useSetContentAboutHouse(
    localPage,
    house,
    user,
    location
  );

  return (
    <div id="about-house-box">
      <NavBtn
        text={text}
        cb={cb}
        pages={pages.filter((el) => el !== localPage)}
        name={house ? `${location.name} ${house.name}` : ""}
      />
      <ScrollContainer localPage={localPage} contCallBack={contCallBack} />
    </div>
  );
};

export default AboutHouse;
