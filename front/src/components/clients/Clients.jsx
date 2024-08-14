import React, { useState } from "react";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./Clients.css";
import { useSetContentAboutClients } from "./functions/useSetContentAboutClients";
import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Clients = function () {
  const pages = ["все клиенты", "создать клиента", "найти клиента"];
  const [localPage, setLocalPage] = useState("все клиенты");
  const dispatch = useDispatch();

  const { pagList, allClientsLength, clients } = useSelector(
    (store) => store.clientsData
  );

  const cb = (page) => {
    //setLocalPageProg(setLocalPage, pages);
    setLocalPage(page);
  };

  const contCallBack = useSetContentAboutClients(localPage);

  const hIndex = localPage === "все клиенты" ? 200 : 160;
  const { wHeight: height } = useSelector((store) => store.windowHeight);

  const count = Math.ceil(allClientsLength / 3);

  console.log(pagList)

  return (
    <div id="clients">
      <NavBtn
        cb={cb}
        text={localPage}
        pages={pages.filter((el) => el !== localPage)}
      />
      <ScrollContainer contCallBack={contCallBack} hIndex={hIndex} />
      {localPage === "все клиенты" && (
        <Stack
          spacing={2}
          sx={{
            position: "fixed",
            top: `${height - 47}px`,
            backgroundColor: "rgb(223, 220, 220)",
            padding: 0.5,
            borderRadius: "5px",
          }}
        >
          <Pagination
            onChange={(_, page) => dispatch({ type: "SET_PAGLIST", payload: page })}
            page={pagList}
            count={count}
            variant="outlined"
            color="primary"
            
          />
        </Stack>
      )}
    </div>
  );
};

export default Clients;
