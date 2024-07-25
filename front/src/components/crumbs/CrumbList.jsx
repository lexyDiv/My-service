import React, { useEffect } from "react";

import "./CrumbList.css";
import { useSelector } from "react-redux";
import Crumb from "./Crumb";
import { useNavigate } from "react-router-dom";

const CrumbList = function () {

    const { crumbs } = useSelector((store) => store.crumbs);
    // const fullPath = crumbs.reduce((acc, el) => acc + el.path, '').slice(1);
    // const navigate = useNavigate();

    
  //  useEffect(() => {
  //  // navigate(fullPath);
  //  }, [crumbs]);

    window.history.replaceState(
      {},
      '',
      '/'
    );

//console.log(document.location.href) // => is greate !!!

  return (
  <div id="crumbs-box">
    {crumbs.map((crumb, i, arr) => {
      arr[i].index = i;
      return <Crumb key={i} crumb={crumb}/>
    })}
  </div>
);
};

export default CrumbList;
