import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./AboutHouse.css";
import NavBtn from "../navBtn/NavBtn";
import { setLocalPageProg } from "../locationList/functions/setLocalPageProg";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { useSetContentAboutHouse } from "./functions/useSetcontextAboutHouse";

const AboutHouse = function () {
  const { user } = useSelector((store) => store.user);
  const localPageData = [
    "создать бронь/найм в",
    "комменты по",
    "вся бронь/найм в",
  ];
  user && user.admin && localPageData.splice(1, 0, "редактировать/удалить");
  const dataPages = useRef([...localPageData]);
  const pages = dataPages.current;
  const [localPage, setLocalPage] = useState(pages[0]);
  const { locationId, houseId } = useParams();
  const { locations } = useSelector((store) => store.locations);

  const location = locations.find((el) => el.id === Number(locationId));
  const house = location.Houses.find((el) => el.id === Number(houseId));
  const images = JSON.parse(house.images);

  images.push(house.image);

  const cb = (page) => {
    //setLocalPageProg(setLocalPage, pages);
    setLocalPage(page);
  };

  const text = `${localPage}  ${location.name} ${house.name}`;

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
        name={`${location.name} ${house.name}`}
      />
      <ScrollContainer contCallBack={contCallBack} />
    </div>
  );
};

export default AboutHouse;
