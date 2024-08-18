/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AboutClient.css";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneClient } from "../../functions/getOneClient";
import { useSetContentAboutClient } from "./functions/useSetContentAboutClient";

const AboutClient = function () {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const dispatch = useDispatch();

  const loc = useLocation();
  const pageKey = loc.pathname;

  async function getClient() {
    dispatch({ type: "SET_LOADING", payload: true });
    const clientData = await getOneClient(clientId);
    if (clientData) {
      setClient(clientData);
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }

  useEffect(() => {
    getClient();
  }, []);

  const pages = [
    "редактировать клиента с",
    "все бронирования клиета с",
    "все заявки клиента с",
  ];
  const saveLP = sessionStorage.getItem(pageKey);
  const [localPage, setLocalPage] = useState(saveLP || pages[0]);

  const contCallBack = useSetContentAboutClient(client, localPage);

  const cb = (page) => {
    sessionStorage.setItem(pageKey, page);
    setLocalPage(page);
  };

  const text = client ? `${localPage} id: ${client.id}` : localPage;

  return (
    <div id="about-client">
      <NavBtn
        cb={cb}
        text={text}
        pages={pages.filter((el) => el !== localPage)}
        name={client && ` id: ${client.id}`}
      />
      <ScrollContainer 
      localPage={localPage}
      contCallBack={contCallBack} />
    </div>
  );
};

export default AboutClient;
