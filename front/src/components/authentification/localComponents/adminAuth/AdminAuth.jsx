import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { noSpaceValid } from "../../../../functions/noSpaceValid";
import { isEmailValid } from "../../../../functions/isEmailValid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { useAdminAuthFetch } from "./functions/useAdminAuth";

const AdminAuth = function () {
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

  const [email, setEmail] = useState("");
  const [passShow, setPassShow] = useState("password");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const adminAuthFetch = useAdminAuthFetch({ email, pass, setMessage });

  return (
    <ThemeProvider theme={theme}>
      <div id="create-client">
        <p style={{ color: "orange" }}>Вход для администраторов</p>
        <div className="create-client-basic-item">
          <TextField
            autoComplete="false"
            value={email}
            onChange={(e) => {
              setEmail(noSpaceValid(e.target.value));
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
              autoComplete="false"
              onChange={(e) => setPass(noSpaceValid(e.target.value))}
              value={pass}
              id={"standard-password-input-2" + rand}
              label="корпоративный пароль"
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
        {isEmailValid(email) && pass && (
          <Button
            onClick={adminAuthFetch}
            sx={{
              marginTop: 2,
            }}
            variant="outlined"
          >
            войти
          </Button>
        )}
      </div>
      {message && (
        <GlobalMessage
          updateMessage={message}
          cb={() => setMessage("")}
          color={"red"}
        />
      )}
    </ThemeProvider>
  );
};

export default AdminAuth;
