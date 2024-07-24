import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./AboutHouse.css";
import Slider from "../slider/Slider";
import Calendar1 from "../Calendars/Calendar1";
import Calendar2 from "../Calendars/Calendar2";

const AboutHouse = function () {
  const { locationId, houseId } = useParams();
  const { locations } = useSelector((store) => store.locations);

  const location = locations.find((el) => el.id === Number(locationId));
  const house = location.Houses.find((el) => el.id === Number(houseId));
  const images = JSON.parse(house.images);

  images.push(house.image);

  return (
    <>
    <div id="about-house-box">
      <div id="about-house-slider-box">
        <Slider images={images} />
        <div id="about-house-slider-buttons">
          <button type="button" className="btn btn-primary about-house-btn">
            Редактировать
          </button>
          <button type="button" className="btn btn-primary about-house-btn">
            Удалить
          </button>
        </div>
      </div>
    </div>
  
    <Calendar2/>
   
    </>
  );
};

export default AboutHouse;
