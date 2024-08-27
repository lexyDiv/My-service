import React from "react";
import ShowCalendar from "../../../showCalendar/ShowCalendar";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "../../../slider/Slider";

const House = function ({ house }) {
  const navigate = useNavigate();
  const location = useLocation();

  function goHome() {
    const path = `${location.pathname}/house/${house.id}`;
    navigate(path);
  }

  let images = [];

  house.image ? images.push(house.image) : images.push("/nature.webp");

  images = images.concat(JSON.parse(house.images));

  return (
    <div className="card location-card">
      <div className="location-slider-box">
        <Slider
          images={images}
          index={`loh${Math.floor(Math.random() * 1000)}`}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{house.name}</h5>
        <p className="card-text">{house.address}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          календарь сдачи и резервирования дома
        </li>
      </ul>
      <ShowCalendar rents={house.Rents}/>
      {/* <Calendar1/> ok !!rents! */}

      <div className="card-body">
        <button type="button" className="btn btn-primary" onClick={goHome}>
          В дом
        </button>
      </div>
    </div>
  );
};

export default House;
