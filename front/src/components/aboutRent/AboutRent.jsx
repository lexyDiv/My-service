import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./AboutRent.css";
import { useSelector } from "react-redux";
import { setLocalPageProg } from "../locationList/functions/setLocalPageProg";

const AboutRent = function () {
  const { user } = useSelector((store) => store.user);
  const localPageData = [
    "подробно по"
  ];
  user && user.admin && localPageData.splice(1, 0, "редактировать");
  const dataPages = useRef([...localPageData]);
  const pages = dataPages.current;
  const [localPage, setLocalPage] = useState(pages[0]);
  const { locations } = useSelector((store) => store.locations);
  const { locationId, houseId, rentId } = useParams();


  const location = locations.find((el) => el.id === Number(locationId));
  const house = location.Houses.find((el) => el.id === Number(houseId));
  const images = JSON.parse(house.images);

  images.push(house.image);

  const cb = () => {
    setLocalPageProg(setLocalPage, pages);
  };

  const text = `${localPage}  ${location.name} ${house.name} бронь- ${rentId}`;


  return (
    <div id="about-rent">
      <NavBtn cb={cb} text={text} />
      <ScrollContainer />
    </div>
  );
};

export default AboutRent;
