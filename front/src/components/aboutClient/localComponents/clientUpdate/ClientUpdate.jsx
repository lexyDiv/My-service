import React, { useState } from "react";
import './ClientUpdate.css';
import { createTheme } from "@mui/material";
import { phoneChange } from "../../../clients/localComponents/createClient/functions/phoneChange";
import { teleChange } from "../../../clients/localComponents/createClient/functions/teleChange";
import { emailChange } from "../../../clients/localComponents/createClient/functions/emailChange";
import { isEmailValid } from "../../../../functions/isEmailValid";

const ClientUpdate = function({ client }) {

  const theme = createTheme({
    palette: {
      background: {
        paper: "#212121",
      },
      text: {
        primary: "rgb(255,255,255)",
        secondary: "rgb(255,255,255)",
      },
      action: {
        active: "#001E3C",
      },
    },
  });

 // const { user } = useSelector((store) => store.user);

  const [phone, setPhone] = useState("");
  const [tele, setTele] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [infoColor, setInfoColor] = useState("white");
  const [infoCB, setInfoCB] = useState(() => {});

  const onPhoneChange = phoneChange(phone, setPhone);
  const onTeleChange = teleChange(setTele);
  const onEmailChange = emailChange(setEmail);

  const isReady =
    name && (phone.length === 14 || tele.length >= 2 || isEmailValid(email))
      ? true
      : false;

  const rand = Math.floor(Math.random() * 10000);


   return (
    <div id="client-update" >
      this is client update {client.id}
    </div>
   )
}

export default ClientUpdate;