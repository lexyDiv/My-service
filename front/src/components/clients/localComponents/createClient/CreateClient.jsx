import React, { useState } from "react";
import "./CreateClient.css";
import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { phoneChange } from "../../../../functions/phoneChange";
import { teleChange } from "../../../../functions/teleChange";
import { emailChange } from "../../../../functions/emailChange";
import { isEmailValid } from "../../../../functions/isEmailValid";
import { useClientCreate } from "./functions/clientCreate";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { useSelector } from "react-redux";
import { isPhoneValid } from "../../../../functions/isPhoneValid";

const CreateClient = function () {
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

  const { user } = useSelector((store) => store.user);

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
    name && (isPhoneValid(phone) || tele.length >= 2 || isEmailValid(email)) && 
    (
      ((isPhoneValid(phone) && phone.length === 14) || phone.length <= 2) &&
      (isEmailValid(email) || !email) &&
      (tele.length >= 2 || tele.length <= 1)
    )
      ? true
      : false;

  const rand = Math.floor(Math.random() * 10000);
  const toClientCreate = useClientCreate({
    name,
    email,
    tele,
    about,
    phone,
    setInfoMessage,
    setInfoCB,
    setInfoColor,
    user
  });

  return (
    <ThemeProvider theme={theme}>
      <div id="create-client">
         <div className="create-client-basic-item">
         <TextField
          onChange={(e) => setName(e.target.value)}
          autoComplete="false"
          onFocus={() => {
            phone.length === 2 && setPhone("");
            tele.length === 1 && setTele("");
          }}
          sx={{
            "& fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(255,255,255)",
            },
            width: "90%",
          }}
          id={"outlined-basic-1" + rand}
          label="Имя клиента"
          variant="outlined"
        />
        <div
              style={{
                backgroundColor: `${name? "green" : "red"}`,
              }}
              className="create-client-basic-item-ok"
            />
         </div>
        <div id="create-client-basic">
          <p
            style={{
              color: "orange",
            }}
          >
            * Заполните хотябы одно поле
          </p>

          <div className="create-client-basic-item">
            <TextField
              autoComplete="false"
              value={phone}
              onFocus={() => {
                if (!phone) {
                  setPhone("+7");
                }
                tele.length === 1 && setTele("");
              }}
              onChange={(e) => onPhoneChange(e)}
              sx={{
                "& fieldset.MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(255,255,255)",
                },
                width: "90%",
              }}
              id={"outlined-basic-phone" + rand}
              label="Телефон"
              variant="outlined"
            />
            <div
              style={{
                backgroundColor: `${phone.length === 14 ? "green" : "red"}`,
              }}
              className="create-client-basic-item-ok"
            />
          </div>
          <div className="create-client-basic-item">
            <TextField
              autoComplete="false"
              value={tele}
              onChange={(e) => onTeleChange(e)}
              onFocus={() => {
                phone.length === 2 && setPhone("");
                !tele && setTele("@");
              }}
              sx={{
                "& fieldset.MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(255,255,255)",
                },
                width: "90%",
                marginTop: "10px",
              }}
              id={"outlined-basic-tele" + rand}
              label="Телеграм"
              variant="outlined"
            />
            <div
              style={{
                backgroundColor: `${tele.length > 1 ? "green" : "red"}`,
              }}
              className="create-client-basic-item-ok"
            />
          </div>
          <div className="create-client-basic-item">
            <TextField
              autoComplete="false"
              value={email}
              onChange={(e) => {
                onEmailChange(e);
              }}
              onFocus={() => {
                phone.length === 2 && setPhone("");
                tele.length === 1 && setTele("");
              }}
              sx={{
                "& fieldset.MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(255,255,255)",
                },
                width: "90%",
                marginTop: "10px",
              }}
              id={"outlined-basic-email-2" + rand}
              label="Электронная почта"
              variant="outlined"
            />
            <div
              style={{
                backgroundColor: `${isEmailValid(email) ? "green" : "red"}`,
              }}
              className="create-client-basic-item-ok"
            />
          </div>
        </div>
        <TextField
          onChange={(e) => setAbout(e.target.value)}
          sx={{
            "& fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(255,255,255)",
            },
            width: "90%",
            marginTop: "10px",
          }}
          id={"outlined-textarea-about" + rand}
          label="Характеристика клиента"
          multiline
        />
        {isReady && (
          <Button
            onClick={toClientCreate}
            sx={{
              marginTop: 2,
            }}
            variant="outlined"
          >
            создать
          </Button>
        )}
      </div>
      {infoMessage && (
        <GlobalMessage
          updateMessage={infoMessage}
          color={infoColor}
          cb={infoCB}
        />
      )}
    </ThemeProvider>
  );
};

export default CreateClient;
