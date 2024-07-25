import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./AboutHouse.css";
import Slider from "../slider/Slider";
import Calendar1 from "../Calendars/Calendar1";
import Calendar2 from "../Calendars/Calendar2";
import NavBtn from "../navBtn/NavBtn";

const AboutHouse = function () {
  const dataPages = useRef(["дома в", "новый дом в", "комменты по"]);
  const pages = dataPages.current;
  const [localPage, setLocalPage] = useState(pages[0]);
  const { locationId, houseId } = useParams();
  const { locations } = useSelector((store) => store.locations);

  const location = locations.find((el) => el.id === Number(locationId));
  const house = location.Houses.find((el) => el.id === Number(houseId));
  const images = JSON.parse(house.images);

  images.push(house.image);

// <Calendar2/> 


  return (

    <div id="about-house-box">
      <NavBtn/>
    </div>
  
  );
};

export default AboutHouse;
