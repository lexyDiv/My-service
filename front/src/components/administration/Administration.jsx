import React, { useRef, useState } from "react";
import './Administration.css';
import { useLocation } from "react-router-dom";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { administrationContCallBack } from "./functions/amistrationContCallBack";

const Administration = function() {

  //  const { user } = useSelector((store) => store.user);
    const localPageData = [
      "создать новость",
      "редактировать главную страницу",
    ];

    const dataPages = useRef([...localPageData]);
    const pages = dataPages.current;
    const loc = useLocation();
    const pageKey = loc.pathname;
    const saveLP = sessionStorage.getItem(pageKey);
    const [localPage, setLocalPage] = useState(saveLP ||  pages[0]);

    const contCallBack = administrationContCallBack(localPage);

    const text = localPage;
    const cb = (page) => {
        sessionStorage.setItem(pageKey, page);
        setLocalPage(page);
      };

    return (
        <div id="administration">
      <NavBtn
        text={text}
        cb={cb}
        pages={pages.filter((el) => el !== localPage)}
      //  name={house ? `${location.name} ${house.name}` : ""}
      />
      <ScrollContainer localPage={localPage} contCallBack={contCallBack} />
        </div>
    )
}

export default Administration;