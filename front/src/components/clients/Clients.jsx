import React, { useState } from "react";
import NavBtn from "../navBtn/NavBtn";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import './Clients.css';

const Clients = function() {

    const pages = ["все клиенты", "создать клиента", "найти клиента"];
    const [localPage, setLocalPage] = useState("все клиенты");
const text = 'papa loh'

    return (
        <div id="clients">
               <NavBtn
       // cb={cb}
        text={localPage}
        pages={pages.filter((el) => el !== localPage)}
       // name={`${location.name.slice(0, 14)}. ${house.name.slice(0, 14)}. бронь- ${rentId}`}
      />
      <ScrollContainer
      // contCallBack={contCallBack} 
       />
        </div>
    )
}

export default Clients;