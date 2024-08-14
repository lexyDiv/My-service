import React, { useState } from "react";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./Clients.css";
import { useSetContentAboutClients } from "./functions/useSetContentAboutClients";
import { Pagination, Stack } from "@mui/material";

const Clients = function () {
  const pages = ["все клиенты", "создать клиента", "найти клиента"];
  const [localPage, setLocalPage] = useState("все клиенты");

  const cb = (page) => {
    //setLocalPageProg(setLocalPage, pages);
    setLocalPage(page);
  };

  const text = `papa loh`;

  const contCallBack = useSetContentAboutClients(localPage);

  const hIndex = localPage === "все клиенты" ? 200 : 160;

  return (
    <>
      <div id="clients">
        <NavBtn
          cb={cb}
          text={localPage}
          pages={pages.filter((el) => el !== localPage)}
        />
        <ScrollContainer contCallBack={contCallBack} hIndex={hIndex} />
        <Stack spacing={2} sx={{ zIndex: '1000', position: 'fixed', top: '93%', backgroundColor: 'white' }}>
      <Pagination count={10} variant="outlined" color="primary" />
    </Stack>
      </div>
      
    </>
  );
};

export default Clients;
