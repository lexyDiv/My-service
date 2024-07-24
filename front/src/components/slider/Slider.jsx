import React, { useEffect, useRef } from "react";
import SliderImage from "./SliderImage";

import './Slider.css'

const Slider = function ({ images, index }) {
  const slideButton = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      slideButton.current.click();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  //console.log(window.innerWidth)

  return (
    <div
      id={index}
      className="carousel slide"
      data-bs-ride="carousel"
    //  style={{ maxWidth: "200px", height: "200px" }}
    >
      <div className="carousel-inner" >
        {images.map((image, index) => (
          <SliderImage key={index} index={index} image={image} />
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${index}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
      id={Math.floor(Math.random() * 100)}
        ref={slideButton}
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${index}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
