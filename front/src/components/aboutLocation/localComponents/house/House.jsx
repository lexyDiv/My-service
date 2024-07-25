import React from "react";
import ShowCalendar from "../../../showCalendar/ShowCalendar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "../../../slider/Slider";
import Calendar1 from "../../../Calendars/Calendar1";

const House = function ({ house }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { crumbs } = useSelector((store) => store.crumbs);
  const fullPath = crumbs.reduce((acc, el) => acc + el.path, "").slice(1);

  const { user } = useSelector((store) => store.user);

  function goHome() {
    const path = `${fullPath}/house/${house.id}`;
    dispatch({
      type: "ADD",
      payload: { name: house.name, path, id: house.id },
    });
    navigate(path);
  }

  let images = [];

  house.image && images.push(house.image);

  images = images.concat(JSON.parse(house.images));

  return (
    <div
      className="card location-card"
      // style={{ maxWidth: "30rem", margin: "15px", padding: "5px" }}
    >
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
        <li className="list-group-item">календарь сдачи и резервирования дома</li>
      </ul>
      <ShowCalendar />
      {/* <Calendar1/> ok !!! */}

      <div className="card-body">
        {user && user.level === 3 && (
          <button type="button" className="btn btn-primary" onClick={goHome}>
            В дом
          </button>
        )}
      </div>
    </div>
  );
};

export default House;
