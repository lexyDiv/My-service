/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./UserAccount.css";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { useSelector } from "react-redux";
import { Button, createTheme, TextField } from "@mui/material";
import { phoneChange } from "../../functions/phoneChange";
import { teleChange } from "../../functions/teleChange";
import { emailChange } from "../../functions/emailChange";
import { isEmailValid } from "../../functions/isEmailValid";
import { isPhoneValid } from "../../functions/isPhoneValid";
import GlobalMessage from "../globalMessage/GlobalMessage";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  nameValidator,
  nameValidatorEnd,
  nameValidatorStart,
} from "../../functions/nameValidator";

const UserAccount = function () {
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        window.history.replaceState({}, "", "/");
        navigate("/locations");
      }, 0);
    }
  }, []);

  const localPage = "user-account";

  const [phone, setPhone] = useState("");
  const [tele, setTele] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState(user ? user.name : "");
  const [infoMessage, setInfoMessage] = useState("");
  const [infoColor, setInfoColor] = useState("white");
  const [infoCB, setInfoCB] = useState(() => {});

  const onPhoneChange = phoneChange(phone, setPhone);
  const onTeleChange = teleChange(setTele);
  const onEmailChange = emailChange(setEmail);

  useEffect(() => {
    if (user) {
      let e = { target: { value: user.phone } };
      onPhoneChange(e);
      e = { target: { value: user.tele } };
      onTeleChange(e);
      e = { target: { value: user.email } };
      onEmailChange(e);
    }
  }, []);

  const isReady =
    name &&
    (phone.length === 14 || tele.length >= 2 || isEmailValid(email)) &&
    (isPhoneValid(phone) || phone.length <= 2) &&
    (isEmailValid(email) || !email) &&
    (tele.length >= 2 || tele.length <= 1)
      ? true
      : false;

  const rand = Math.floor(Math.random() * 10000);

  const contCallBack = (
    <ThemeProvider theme={theme}>
      <div id="create-client">
        <div className="create-client-basic-item">
          <TextField
            value={name}
            onChange={(e) => setName(nameValidatorStart(e.target.value))}
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
            label="Имя"
            variant="outlined"
          />
          <div
            style={{
              backgroundColor: `${name ? "green" : "red"}`,
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
        {isReady && (
          <Button
            // onClick={toClientCreate}
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

  return (
    <div id="user-account">
      <ScrollContainer contCallBack={contCallBack} localPage={localPage} />
    </div>
  );
};

export default UserAccount;
