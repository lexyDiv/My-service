import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "../../../slider/Slider";

import './Location.css'

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

  const images = [];
 
  location.image && images.push(location.image);

  location.Houses.forEach(house => {
    images.push(house.image);
    JSON.parse(house.images).forEach((image) => images.push(image));
  });



  return (
    <>
      <div
        className="card location-card"
        
        // style={{ 
        //   maxWidth: "28rem", 
        //   margin: "15px", 
        //   padding: "5px", 
        //   minWidth: "28rem" 
        // }}
      >
        {/* <p className="card-title" style={{ fontStyle: "italic" }}>
          Расположение :{" "}
        </p> */}
        <p className="card-title">{location.address}</p>
        {/* <img src={location.image} className="card-img-top" alt="img" /> */}
        <div className="location-slider-box">
        <Slider images={images} index={`loh${Math.floor(Math.random() * 1000)}`}/>
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
