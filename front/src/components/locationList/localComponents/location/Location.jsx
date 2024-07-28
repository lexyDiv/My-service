import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "../../../slider/Slider";

import "./Location.css";

const Location = function ({ location }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationData = useLocation();
  
  function onBase() {
    const path = `${locationData.pathname}/location/${location.id}`;
    // dispatch({
    //   type: "ADD",
    //   payload: { name: location.name, path, id: location.id },
    // });
    navigate(path);
  }

  const images = [];

  location.image && images.push(location.image);

  location.Houses.forEach((house) => {
    images.push(house.image);
    JSON.parse(house.images).forEach((image) => images.push(image));
  });

  return (
    <>
      <div className="card location-card">
        <p className="card-title">{location.address}</p>

        <div className="location-slider-box">
          <Slider
            images={images}
            index={`loh${Math.floor(Math.random() * 1000)}`}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{location.name}</h5>
          <p className="card-text">{`Всего домов : ${location.Houses.length}`}</p>
          <p className="card-text">{location.description}</p>
          <button type="button" className="btn btn-primary" onClick={onBase}>
            На базу
          </button>
        </div>
      </div>
    </>
  );
};

export default Location;
