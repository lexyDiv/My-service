import React from "react";

import "./CrumbList.css";
import { useSelector } from "react-redux";
import Crumb from "./Crumb";

const CrumbList = function () {

    const { crumbs } = useSelector((store) => store.crumbs);



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
