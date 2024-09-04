import { createTheme, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { noSpaceValid } from "../../../../functions/noSpaceValid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { phoneChange } from "../../../../functions/phoneChange";

const ClientAuth = function ({ isAdmin, setIsAdmin }) {
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

  const rand = Math.floor(Math.random() * 10000);

  const [phone, setPhone] = useState("");
  const [passShow, setPassShow] = useState("password");
  const [pass, setPass] = useState("");

  const onPhoneChange = phoneChange(phone, setPhone);

  return (
    <ThemeProvider theme={theme}>
      <div id="create-client">
        <div className="create-client-basic-item">
          <TextField
            autoComplete="false"
            value={phone}
            onFocus={() => {
              if (!phone) {
                setPhone("+7");
              }
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
        <>
          <div
            style={{
              marginTop: "15px",
            }}
          >
            {passShow === "password" ? (
              <VisibilityIcon
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setPassShow("text")}
              />
            ) : (
              <VisibilityOffIcon
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setPassShow("password")}
              />
            )}
          </div>
          <form action="">
            <TextField
              onFocus={() => {
                if (!phone || phone.length <= 2) {
                  setPhone("");
                }
              }}
              autoComplete="false"
              onChange={(e) => setPass(noSpaceValid(e.target.value))}
              value={pass}
              id={"standard-password-input-2" + rand}
              label="пароль"
              type={passShow}
              variant="standard"
              sx={{
                "& fieldset.MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(255,255,255)",
                },
                width: "90%",
                margin: 1,
              }}
            />
          </form>
        </>
      </div>
    </ThemeProvider>
  );
};

export default ClientAuth;
