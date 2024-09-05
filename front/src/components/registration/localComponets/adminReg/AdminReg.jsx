import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { phoneChange } from "../../../../functions/phoneChange";
import { teleChange } from "../../../../functions/teleChange";
import { emailChange } from "../../../../functions/emailChange";
import { isEmailValid } from "../../../../functions/isEmailValid";
import { isPhoneValid } from "../../../../functions/isPhoneValid";
import { baseFileOnChangeUpdate } from "../../../aboutLocation/localComponents/updateLocation/functions/baseFileOnChangeUpdate";
import { nameValidatorStart } from "../../../../functions/nameValidator";
import { noSpaceValid } from "../../../../functions/noSpaceValid";
import AddFile from "../../../addFile/AddFile";
import TitleImage from "../../../titleImage/TitleImage";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";

const AdminReg = function () {
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
  const [tele, setTele] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passShow, setPassShow] = useState("password");
  const [oldPass, setOldPass] = useState("");

  const fileRef = useRef(null);

  const [baseFile, setBaseFile] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");

  const onPhoneChange = phoneChange(phone, setPhone);
  const onTeleChange = teleChange(setTele);
  const onEmailChange = emailChange(setEmail);

  const isReady =
    name &&
    isEmailValid(email) &&
    oldPass &&
    ((isPhoneValid(phone) && phone.length === 14) || phone.length <= 2)

  const onChangeCB = baseFileOnChangeUpdate({
    baseFile,
    setBaseFile,
    setUpdateMessage,
  });

  const titleCB = () => {
    return (
      <Button
        sx={{
          marginTop: 2,
        }}
        variant="outlined"
      >
        {!baseFile ? "Добавить фото" : "Заменить фото"}
        <CropOriginalIcon />
      </Button>
    );
  };

  const rand = Math.floor(Math.random() * 10000);

  const userUpdateFtch = () => {};
  //    useUserUpdateFetch({
  //     name,
  //     tele,
  //     phone,
  //     email,
  //     isDeleteBaseFile,
  //     baseFile,
  //     setUpdateMessage,
  //     setMColor,
  //     oldPass,
  //     newPass,
  //     setOldPass,
  //     setNewPass,
  //   });

  return (
    <ThemeProvider theme={theme}>
      <div id="create-client">
        <p style={{
          color: 'orange'
        }}>регистрация администратора</p>
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
              // marginTop: "10px",
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
        <div id="create-client-basic">
          <p
            style={{
              color: "orange",
            }}
          >
            * Обязательные поля
          </p>
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
                onChange={(e) => setOldPass(noSpaceValid(e.target.value))}
                value={oldPass}
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
        </div>

        <AddFile onChangeCB={onChangeCB} fileRef={fileRef} titleCB={titleCB} />

        {baseFile && (
          <div
            style={{
              marginTop: "15px",
            }}
          >
            <TitleImage
              image={baseFile.url}
              width={270}
              deleteCB={() => setBaseFile(null)}
            />
          </div>
        )}

        {isReady && (
          <div style={{ margin: "15px" }}>
            <Button
              onClick={() => {}}
              sx={{
                marginTop: 1,
                color: "orange",
              }}
              variant="outlined"
            >
              зарегистрироваться
            </Button>
          </div>
        )}
      </div>
      {updateMessage && (
        <GlobalMessage
          updateMessage={updateMessage}
          color={"red"}
          cb={() => setUpdateMessage("")}
        />
      )}
    </ThemeProvider>
  );
};

export default AdminReg;
