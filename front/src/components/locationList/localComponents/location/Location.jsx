import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Location = function ({ location }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onBase() {
    const path = `/location/${location.id}`;
    dispatch({
      type: "ADD",
      payload: { name: location.name, path, id: location.id },
    });
    navigate(path);
  }

  return (
    <>
      <div
        className="card"
        style={{ maxWidth: "28rem", margin: "15px", padding: "5px" }}
      >
        <p className="card-title" style={{ fontStyle: "italic" }}>
          Расположение :{" "}
        </p>
        <p className="card-title">{location.address}</p>
        <img src={location.image} className="card-img-top" alt="img" />
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
