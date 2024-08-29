import React from "react";
import ShowCalendar from "../showCalendar/ShowCalendar";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "../slider/Slider";
import { useDispatch, useSelector } from "react-redux";

const House = function ({ house, newInterval, quick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function goHome() {
    if (quick) {
      dispatch({ type: "SET_INTERVAL", payload: newInterval });
    }
    const path = `/locations/location/${house.location_id}/house/${house.id}`;
    navigate(path);
  }

  const { locations } = useSelector(store => store.locations);
  const location = locations.find(l => l.id === house.location_id);

  let images = [];

  house.image ? images.push(house.image) : images.push("/nature.webp");

  images = images.concat(JSON.parse(house.images));

  return (
    <div className="card location-card">
      {location && <div 
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        color: 'orange'
      }}
      ><h5>{location.name}</h5></div>}
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
      <ShowCalendar rents={house.Rents} newInterval={newInterval}/>
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
