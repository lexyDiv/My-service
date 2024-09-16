import React from "react";

import "./CrumbList.css";
import { useSelector } from "react-redux";
import Crumb from "./Crumb";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";

const CrumbList = function () {
  const { locations } = useSelector((store) => store.locations);
  const { locationId, houseId, rentId, clientId } = useParams();
  const locationData = locations.find((loc) => loc.id === Number(locationId));

  const getRusName = function (cr, path) {
    switch (cr.name) {
      case "administration-room":
        return {
          name: "АДМИНИСТРИРОВАНИЕ",
          id: 0,
          path,
        }
      case "registration":
        return {
          name: "КОНТАКТНЫЕ ДАННЫЕ",
          id: 0,
          path,
        }
      case "authentification":
        return {
          name: "ВХОД",
          id: 0,
          path,
        }
      case "user-account":
        return {
          name: "ЛИЧНЫЙ КАБИНЕТ",
          id: 0,
          path,
        }
      case "/":
        return {
          name: "ГЛАВНАЯ СТРАНИЦА",
          id: 0,
          path,
        };
      case "users-list":
        return {
          name: "АДМИНИСТРАТОРЫ",
          id: 0,
          path,
        };
      case "quick":
        return {
          name: "БЫСТРЫЙ ПОИСК",
          id: 0,
          path,
        };
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
  !crumbsArr.length && crumbsArr.push("/");
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

  let path = "";
  let crumbs = crumbsData.map((el) => {
    path += `/${el.name}`;
    if (el.id) {
      path += `/${el.id}`;
    }
    return getRusName(el, path);
  });

  // const Crumb = ({ crumb }) => {
  //   return (
  //     <Link
  //       underline="hover"
  //       color="text.primary"
  //       href={crumb.path}
  //       aria-current="page"
  //     >
  //       {crumb.name}
  //     </Link>
  //   )
  // }

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
