/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./AboutRent.css";
import { useDispatch, useSelector } from "react-redux";
import { useSetContentAboutRent } from "./functions/useSetContentAboutRent";
import RMessageCreator from "../RmessageCreator/RMessageCreator";
import { addRComment } from "./functions/addRMessage";

const AboutRent = function () {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const localPageData = ["подробно по", "комменты по"];
  // user && user.level === 3 &&
  localPageData.splice(1, 0, "редактировать");
  const dataPages = useRef([...localPageData]);
  const pages = dataPages.current;
  const loc = useLocation();
  const pageKey = loc.pathname;

  const saveLP = sessionStorage.getItem(pageKey);
  const [localPage, setLocalPage] = useState(saveLP || pages[0]);
  const { locations } = useSelector((store) => store.locations);
  const { locationId, houseId, rentId } = useParams();

  const location = locations.find((el) => el.id === Number(locationId));
  const house = location
    ? location.Houses.find((el) => el.id === Number(houseId))
    : null;
  // let rent = house.Rents.find((el) => el.id === Number(rentId));
  const navigate = useNavigate();
  const [rent, setRent] = useState(
    house ? house.Rents.find((el) => el.id === Number(rentId)) : null
  );

  useEffect(() => {
    if (!rent) {
      sessionStorage.removeItem(pageKey);
      window.history.replaceState({}, "", "/");
      navigate(location && house ? `/locations/location/${location.id}/house/${house.id}` : '/locations');
    }
  }, [rent]);

  const cb = (page) => {
    sessionStorage.setItem(pageKey, page);
    setLocalPage(page);
  };

  const text = house
    ? `${localPage}  ${location.name} ${house.name} бронь- ${rentId}`
    : "";

  const contCallBack = useSetContentAboutRent(
    localPage,
    rent,
    user,
    location,
    house,
    setRent
  );

  const goCB = addRComment(locationId, houseId, rentId, user, dispatch);

  return (
    <div id="about-rent">
      <NavBtn
        cb={cb}
        text={text}
        pages={pages.filter((el) => el !== localPage)}
        name={
          location && house
            ? `${location.name.slice(0, 14)}. ${house.name.slice(
                0,
                14
              )}. бронь- ${rentId}`
            : ""
        }
      />
      <ScrollContainer localPage={localPage} contCallBack={contCallBack} />
      {localPage === "комменты по" && <RMessageCreator cb={goCB} />}
    </div>
  );
};

export default AboutRent;
