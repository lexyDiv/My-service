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
import { useDispatch } from "react-redux";
import BirthDay from "../../../birthDay/BirthDay";
import { getDateFormat } from "../../../aboutHouse/localComponents/createRent/localComponents/rentCalendar/functions/getDateFormat";

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

  const [phone, setPhone] = useState("");
  const [tele, setTele] = useState(client.tele ? client.tele : "");
  const [email, setEmail] = useState(client.email);
  const [name, setName] = useState(client.name);
  const [about, setAbout] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [infoColor, setInfoColor] = useState("white");
  const [infoCB, setInfoCB] = useState(() => {});

  const onPhoneChange = phoneChange(phone, setPhone);
  const onTeleChange = teleChange(setTele);
  const onEmailChange = emailChange(setEmail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    setTimeout(() => {
      client.phone && onPhoneChange({ target: { value: client.phone } });
      client.about && setAbout(client.about);
    }, 0);
    setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: false });
    }, 100);
  }, []);

  /////////////////  birth day

  const clientBirthday = Number(client.birthday)
    ? new Date(Number(client.birthday))
    : null;

  const [birthYear, setBirthYear] = useState(
    clientBirthday ? clientBirthday.getFullYear() : null
  );
  const [birthManth, setBirthManth] = useState(
    clientBirthday ? clientBirthday.getMonth() : 0
  );
  const [birthDay, setBirthDay] = useState(
    clientBirthday ? clientBirthday.getDate() : 1
  );
  const [birthTime, setBirthTime] = useState(
    clientBirthday ? clientBirthday.getTime() : 0
  );

  useEffect(() => {
    if (birthDay && birthYear) {
      const y = String(birthYear) + ".";
      const m =
        birthManth + 1 < 10
          ? "0" + String(birthManth + 1) + "."
          : String(birthManth + 1) + ".";
      const d = birthDay < 10 ? "0" + String(birthDay) : String(birthDay);
      setBirthTime(new Date(y + m + d).getTime());
    }
  }, [birthDay, birthYear, birthManth]);

  const isReady =
    name &&
    isPhoneValid(phone) &&
    phone.length === 14 &&
    (isEmailValid(email) || !email) &&
    (name !== client.name ||
      client.about !== about ||
      client.email !== email ||
      (client.tele !== tele &&
        ((!client.tele && tele.length > 1) || client.tele)) ||
      client.phone !== isPhoneValid(phone) ||
      Number(client.birthday) !== birthTime)
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
    clientId: client.id,
    birthTime,
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
        {!client.regDate ? (
          <BirthDay
            birthYear={birthYear}
            setBirthYear={setBirthYear}
            birthManth={birthManth}
            setBirthManth={setBirthManth}
            birthDay={birthDay}
            setBirthDay={setBirthDay}
            setBirthTime={setBirthTime}
            client={client}
            birthTime={birthTime}
          />
        ) : (
          <p
            style={{
              marginTop: "10px",
              marginBottom: "0px",
            }}
          >
            {" "}
            <span style={{ marginRight: "10px" }}>день рождения:</span>
            {client.birthday
              ? getDateFormat(new Date(Number(client.birthday)))
              : "---"}
          </p>
        )}
        <div id="create-client-basic">
          <p
            style={{
              color: "orange",
            }}
          >
            * Обязательное поле
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

        <TextField
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          sx={{
            "& fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(255,255,255)",
            },
            width: "90%",
            marginTop: "30px",
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
