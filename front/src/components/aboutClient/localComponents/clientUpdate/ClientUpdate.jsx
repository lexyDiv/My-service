/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ClientUpdate.css";
import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { phoneChange } from "../../../../functions/phoneChange";
import { teleChange } from "../../../../functions/teleChange";
import { emailChange } from "../../../../functions/emailChange";
import { isEmailValid } from "../../../../functions/isEmailValid";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import HttpsIcon from "@mui/icons-material/Https";
import { isPhoneValid } from "../../../../functions/isPhoneValid";
import { useClientUpdate } from "./functions/useClientUpdate";

const ClientUpdate = function ({ client }) {
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
  const [tele, setTele] = useState(client.tele);
  const [email, setEmail] = useState(client.email);
  const [name, setName] = useState(client.name);
  const [about, setAbout] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [infoColor, setInfoColor] = useState("white");
  const [infoCB, setInfoCB] = useState(() => {});

  const onPhoneChange = phoneChange(phone, setPhone);
  const onTeleChange = teleChange(setTele);
  const onEmailChange = emailChange(setEmail);

  useEffect(() => {
    setTimeout(() => {
      client.phone && onPhoneChange({ target: { value: client.phone } });
      client.about && setAbout(client.about);
    }, 0);
  }, []);

  const piceReady =
    phone.length === 14 || tele.length >= 2 || isEmailValid(email)
      ? true
      : false;

  const beforeReady =
    (tele.length >= 2 || piceReady) &&
    (isEmailValid(email) || (piceReady && !email.length)) &&
    (isPhoneValid(phone) || (piceReady && phone.length <= 2))
      ? true
      : false;

  const isReady =
    name &&
    beforeReady &&
    (name !== client.name ||
      client.about !== about ||
      client.email !== email ||
      (client.tele !== tele && tele.length >= 2) ||
      client.phone !== isPhoneValid(phone))
      ? true
      : false;

  const rand = Math.floor(Math.random() * 10000);

  const clientUpdate = useClientUpdate({
    name,
    email,
    tele,
    about,
    phone,
    setInfoMessage,
    setInfoCB,
    setInfoColor,
    clientId: client.id
  });

  return (
    <ThemeProvider theme={theme}>
      <div id="create-client">
        <div className="create-client-basic-item">
          <TextField
            value={name}
            onChange={(e) => !client.regDate && setName(e.target.value)}
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
          {client.regDate ? (
            <HttpsIcon />
          ) : (
            <div
              style={{
                backgroundColor: `${name ? "green" : "red"}`,
              }}
              className="create-client-basic-item-ok"
            />
          )}
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
              onChange={(e) => !client.regDate && onPhoneChange(e)}
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
            {client.regDate ? (
              <HttpsIcon />
            ) : (
              <div
                style={{
                  backgroundColor: `${phone.length === 14 ? "green" : "red"}`,
                }}
                className="create-client-basic-item-ok"
              />
            )}
          </div>
          <div className="create-client-basic-item">
            <TextField
              autoComplete="false"
              value={tele}
              onChange={(e) => {
                !client.regDate && onTeleChange(e);
              }}
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
            {client.regDate ? (
              <HttpsIcon />
            ) : (
              <div
                style={{
                  backgroundColor: `${tele.length > 1 ? "green" : "red"}`,
                }}
                className="create-client-basic-item-ok"
              />
            )}
          </div>
          <div className="create-client-basic-item">
            <TextField
              autoComplete="false"
              value={email}
              onChange={(e) => {
                !client.regDate && onEmailChange(e);
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
            {client.regDate ? (
              <HttpsIcon />
            ) : (
              <div
                style={{
                  backgroundColor: `${isEmailValid(email) ? "green" : "red"}`,
                }}
                className="create-client-basic-item-ok"
              />
            )}
          </div>
        </div>
        <TextField
          value={about}
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
            onClick={clientUpdate}
            sx={{
              marginTop: 2,
            }}
            variant="outlined"
          >
            сохранить изменения
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

export default ClientUpdate;
