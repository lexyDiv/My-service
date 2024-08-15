/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AboutClient.css";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneClient } from "../../functions/getOneClient";
import { useSetContentAboutClient } from "./functions/useSetContentAboutClient";

const AboutClient = function () {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const dispatch = useDispatch();

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
  const [localPage, setLocalPage] = useState("редактировать клиента с");

  const contCallBack = useSetContentAboutClient(client, localPage);

  const cb = (page) => {
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
      <ScrollContainer contCallBack={contCallBack} />
    </div>
  );
};

export default AboutClient;
