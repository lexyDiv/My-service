import React from "react";
import Calendar1 from "../Calendars/Calendar1";
import ShowCalendar from "../showCalendar/ShowCalendar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const House = function ({ house }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { crumbs } = useSelector((store) => store.crumbs);

    const fullPath = crumbs.reduce((acc, el) => acc + el.path, '').slice(1);
   // console.log(fullPath);

function goHome() {
    const path = `${fullPath}/house/${house.id}`;
    dispatch({
      type: "ADD",
      payload: { name: house.name, path, id: house.id },
    });
    navigate(path);
}

  return (
    <div
      className="card"
      style={{ maxWidth: "50rem", margin: "15px", padding: "5px" }}
    >
      <img src={house.image} className="card-img-top" alt="img" />
      <div className="card-body">
        <h5 className="card-title">{house.name}</h5>
        <p className="card-text">{house.address}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
      </ul>
      <ShowCalendar />

      <div className="card-body">
        <button
          type="button"
          className="btn btn-primary"
           onClick={goHome}
        >
          В дом
        </button>
      </div>
    </div>
  );
};

export default House;
