import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [localPage, setLocalPage] = useState(pages[0]);
  const { locations } = useSelector((store) => store.locations);
  const { locationId, houseId, rentId } = useParams();

  const location = locations.find((el) => el.id === Number(locationId));
  const house = location.Houses.find((el) => el.id === Number(houseId));
 // let rent = house.Rents.find((el) => el.id === Number(rentId));
  const navigate = useNavigate();
  const [rent, setRent] = useState(house.Rents.find((el) => el.id === Number(rentId)));

  if(!rent.type) {
    navigate(-1);
  }

  const cb = (page) => {
    // setLocalPageProg(setLocalPage, pages);
    setLocalPage(page);
  };

  const text = `${localPage}  ${location.name} ${house.name} бронь- ${rentId}`;

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
        name={`${location.name.slice(0, 14)}. ${house.name.slice(0, 14)}. бронь- ${rentId}`}
      />
      <ScrollContainer contCallBack={contCallBack} />
      {localPage === "комменты по" && <RMessageCreator cb={goCB} />}
    </div>
  );
};

export default AboutRent;
