import React, { useState } from "react";
import "./AboutClient.css";
import NavBtn from "../../../navBtn/NavBtn";
import ScrollContainer from "../../../scrollContainer/ScrollContainer";
import { useParams } from "react-router-dom";

const AboutClient = function () {

    const { clientId } = useParams();
    

    
    //const client = 

    const pages = ["подробно о клиенте", "редактировать клиента"];
    const [localPage, setLocalPage] = useState("подробно о клиенте");

    // const contCallBack = useSetContentAboutClient(

    //   );

  return (
    <div id="about-client">
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
  );
};

export default AboutClient;
