import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Crumb = function ({ crumb, noHover }) {
  const navigate = useNavigate();

  const reLocation = function () {
    navigate(crumb.path);
  };
  return (
    <>
      <p
        className={!noHover ? "crumb" : "crumb-last"}
        onClick={() => (!noHover ? reLocation() : false)}
      >
        {crumb.name}
      </p>

      <p 
      style={{
        // marginTop: "3px" 
        color: 'green'
        }}
      >{">>"}</p>
    </>
  );
};

export default Crumb;
