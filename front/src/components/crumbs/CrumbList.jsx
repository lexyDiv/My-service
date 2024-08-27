import React from "react";

import "./CrumbList.css";
import { useSelector } from "react-redux";
import Crumb from "./Crumb";
import { useLocation, useParams } from "react-router-dom";

const CrumbList = function () {
  const { locations } = useSelector((store) => store.locations);
  const { locationId, houseId, rentId, clientId } = useParams();
  const locationData = locations.find((loc) => loc.id === Number(locationId));

  const getRusName = function (cr, path) {
    switch (cr.name) {
      case "quick":
        return {
          name: "БЫСТРЫЙ ПОИСК",
          id: 0,
          path,
        }
      case "client":
        return {
          name: `КЛИЕНТ-${clientId}`,
          id: clientId,
          path,
        };
      case "clients":
        return {
          name: "КЛИЕНТЫ",
          id: 0,
          path,
        };
      case "rent":
        return {
          name: `БРОНЬ-${rentId}`,
          id: rentId,
          path,
        };
      case "chat":
        return {
          name: "ЧАТ",
          id: 0,
          path,
        };
      case "locations":
        return {
          name: "БАЗЫ",
          id: 0,
          path,
        };
      case "location":
        return {
          name: locationData ? locationData.name.toUpperCase() : "",
          id: cr.id,
          path,
        };
      case "house": {
        const houseData = locationData
          ? locationData.Houses.find((house) => house.id === Number(houseId))
          : null;
        const name = houseData ? houseData.name.toUpperCase() : "";
        return {
          name,
          id: cr.id,
          path,
        };
      }

      default:
        return {};
    }
  };

  const location = useLocation();
  const crumbsArr = location.pathname.split("/").filter((crumb) => crumb);
  const crumbsData = [];
  crumbsArr.forEach((cr, i, arr) => {
    if (isNaN(Number(cr))) {
      const crd = { name: cr };
      if (arr[i + 1] && !isNaN(arr[i + 1])) {
        crd.id = Number(arr[i + 1]);
      } else {
        crd.id = 0;
      }
      crd.path = location.pathname;
      crumbsData.push(crd);
    }
  });
  // console.log(crumbsData);

  let path = "";
  let crumbs = crumbsData.map((el) => {
    path += `/${el.name}`;
    if (el.id) {
      path += `/${el.id}`;
    }
    return getRusName(el, path);
  });

  return (
    <div id="crumbs-box">
      {crumbs.map((crumb, i, arr) => {
        arr[i].index = i;
        return (
          <Crumb
            key={i}
            crumb={crumb}
            noHover={i < arr.length - 1 ? false : true}
          />
        );
      })}
    </div>
  );
};

export default CrumbList;
