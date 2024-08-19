import React, { useState } from "react";
import "./CreateClient.css";
import { Box, createTheme, TextField, ThemeProvider } from "@mui/material";
import { phoneChange } from "./functions/phoneChange";
import { teleChange } from "./functions/teleChange";
import { emailChange } from "./functions/emailChange";
import { isEmailValid } from "./functions/isEmailValid";

const CreateClient = function () {
  const theme = createTheme({
    palette: {
      background: {
        paper: "#212121",
      },
      text: {
        primary: "white",
        secondary: "white",
      },
      action: {
        active: "#001E3C",
      },
    },
  });

  const [phone, setPhone] = useState("");
  const [tele, setTele] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const onPhoneChange = phoneChange(phone, setPhone);
  const onTeleChange = teleChange(setTele);
  const onEmailChange = emailChange(setEmail);

  return (
    <ThemeProvider theme={theme}>
      <div id="create-client">
        <TextField
          autoComplete="false"
          onFocus={() => {
            phone.length === 2 && setPhone("");
            tele.length === 1 && setTele("");
          }}
          sx={{
            "& fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            width: "90%",
          }}
          id="outlined-basic-1"
          label="Имя клиента"
          variant="outlined"
        />
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
                  borderColor: "white",
                },
                width: "90%",
              }}
              id="outlined-basic-phone"
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
                  borderColor: "white",
                },
                width: "90%",
                marginTop: "10px",
              }}
              id="outlined-basic-tele"
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
                  borderColor: "white",
                },
                width: "90%",
                marginTop: "10px",
              }}
              id="outlined-basic-email"
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
      </div>
    </ThemeProvider>
  );
};

export default CreateClient;
