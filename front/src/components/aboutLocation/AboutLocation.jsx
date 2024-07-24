import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './AboutLocation.css';
import HouseList from "../houseList/HouseList";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import House from "../house/House";

const AboutLocation = function () {

const { locationId } = useParams();
const { locations } = useSelector((store) => store.locations);

const location = locations.find((el) => el.id === Number(locationId));

const houses = location.Houses.sort((a, b) => a.id - b.id);
const dispatch = useDispatch();

useEffect(() => {
   dispatch({ type: "SELECT", payload: 1 });

}, [dispatch]);

const  constCallBack = houses.map((house) => (
  <House key={house.id} house={house} />
))

  return (
    <div id="about-location-box">
      <NavBtn/>
      <ScrollContainer contCallBack={constCallBack} />
    </div>
  );
};

export default AboutLocation;
