import React from "react";

const SliderImage = function ({ index, image }) {
  return (
    <>
      {!index ? (
        <div
          className="carousel-item active"
         // style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          <img
            src={image}
            className="d-block w-100"
            alt="img"
           // style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <div className="carousel-item"
       // style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          <img
            src={image}
            className="d-block w-100"
            alt="img"
            //style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </>
  );
};

export default SliderImage;
