import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./AboutRent.css";
import { useSelector } from "react-redux";
import { setLocalPageProg } from "../locationList/functions/setLocalPageProg";
import { useSetContentAboutRent } from "./functions/useSetContentAboutRent";
import RMessageCreator from "../RmessageCreator/RMessageCreator";

const AboutRent = function () {
  const { user } = useSelector((store) => store.user);
  const localPageData = ["подробно по", "комменты по"];
  user && user.admin && localPageData.splice(1, 0, "редактировать");
  const dataPages = useRef([...localPageData]);
  const pages = dataPages.current;
  const [localPage, setLocalPage] = useState(pages[0]);
  const { locations } = useSelector((store) => store.locations);
  const { locationId, houseId, rentId } = useParams();

  const location = locations.find((el) => el.id === Number(locationId));
  const house = location.Houses.find((el) => el.id === Number(houseId));
  const rent = house.Rents.find((el) => el.id === Number(rentId));

  const cb = () => {
    setLocalPageProg(setLocalPage, pages);
  };

  const text = `${localPage}  ${location.name} ${house.name} бронь- ${rentId}`;

  const contCallBack = useSetContentAboutRent(
    localPage,
    rent,
    user,
    location,
    house
  );

  const goCB = (message) => {
    console.log(message);
  }

  return (
    <div id="about-rent">
      <NavBtn cb={cb} text={text} />
      <ScrollContainer contCallBack={contCallBack} />
      {localPage === "комменты по" && (
        <RMessageCreator cb={goCB} />
      )}
    </div>
  );
};

export default AboutRent;
