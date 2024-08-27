import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "../../../slider/Slider";

import "./Location.css";

const Location = function ({ location }) {
  const navigate = useNavigate();
  const locationData = useLocation();

  function onBase() {
    const path = `${locationData.pathname}/location/${location.id}`;
    navigate(path);
  }

  const images = JSON.parse(location.images);
  //location.image && images.push(location.image);

  const imagesData = images;
  location.image && imagesData.push(location.image);
  !imagesData.length && !location.image && imagesData.push("/nature.webp");

  return (
    <>
      <div className="card location-card">
        <p className="card-title">{location.address}</p>

        <div className="location-slider-box">
          <Slider
            images={imagesData}
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
