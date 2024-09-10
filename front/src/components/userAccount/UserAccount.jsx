/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
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
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import { nameValidatorStart } from "../../functions/nameValidator";
import TitleImage from "../titleImage/TitleImage";
import AddFile from "../addFile/AddFile";
import { baseFileOnChangeUpdate } from "../aboutLocation/localComponents/updateLocation/functions/baseFileOnChangeUpdate";
import ButtonWithQuestion from "../buttonWithQuestion/ButtonWithQuestion";
import { useUserUpdateFetch } from "./functions/useUserUpdateFetch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { noSpaceValid } from "../../functions/noSpaceValid";

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
  const [name, setName] = useState("");
  const [mColor, setMColor] = useState("white");
  const [passShow, setPassShow] = useState("password");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const fileRef = useRef(null);

  const [baseFile, setBaseFile] = useState(
    user && user.image ? { url: user.image, file: null } : null
  );
  const [isDeleteBaseFile, setIsDeleteBaseFile] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const onPhoneChange = phoneChange(phone, setPhone);
  const onTeleChange = teleChange(setTele);
  const onEmailChange = emailChange(setEmail);

  const toDefault = (hc) => {
    hc && hc();
    if (user) {
      let e = { target: { value: user.phone } };
      user.phone && onPhoneChange({ target: { value: user.phone } }, true);
      e = { target: { value: user.tele } };
      user.tele && onTeleChange(e);
      e = { target: { value: user.email } };
      onEmailChange(e);
      setName(user.name);
      setBaseFile(user.image ? { url: user.image, file: null } : null);
    }
  };

  useEffect(() => {
    toDefault();
  }, [user]);

  ///////////// logic

  const isBaseFileChange =
    user &&
    ((!user.image && baseFile) ||
      (user.image && !baseFile) ||
      (user.image && user.image !== baseFile.url));

  const isReady =
    user &&
    name &&
    isEmailValid(email) &&
    ((isPhoneValid(phone) && phone.length === 14) || phone.length <= 2) &&
    (name !== user.name ||
      user.email !== email ||
      (user.tele !== tele && ((!user.tele && tele.length > 1) || user.tele)) ||
      user.phone !== isPhoneValid(phone) ||
      isBaseFileChange ||
      (oldPass && newPass));

  function BaseFileDeleteCB() {
    if (!baseFile.file) {
      user && setIsDeleteBaseFile(user.image);
    }
    setBaseFile(null);
  }

  const onChangeCB = baseFileOnChangeUpdate({
    baseFile,
    setBaseFile,
    setIsDeleteBaseFile,
    setUpdateMessage,
    location: user ? user : null,
  });

  const titleCB = () => {
    return (
      <Button
        sx={{
          marginTop: 2,
        }}
        variant="outlined"
      >
        {!baseFile ? "Добавить титульное фото" : "Заменить титульное фото"}
        <CropOriginalIcon />
      </Button>
    );
  };

  const rand = Math.floor(Math.random() * 10000);

  const userUpdateFtch = useUserUpdateFetch({
    name,
    tele,
    phone,
    email,
    isDeleteBaseFile,
    baseFile,
    setUpdateMessage,
    setMColor,
    oldPass,
    newPass,
    setOldPass,
    setNewPass,
  });

  const contCallBack = (
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
        </div>

        {user && user.admin && (
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
              <TextField
                autoComplete="false"
                onChange={(e) => setNewPass(noSpaceValid(e.target.value))}
                value={newPass}
                id={"standard-password-input-3" + rand}
                label="новый корпоративный пароль"
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
        )}

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
              deleteCB={BaseFileDeleteCB}
            />
          </div>
        )}

        {isReady && (
          <div style={{ margin: "15px" }}>
            <ButtonWithQuestion
              menuPunkt={[
                {
                  page: "да",
                  cb: userUpdateFtch,
                },
                { page: "нет", cb: toDefault },
              ]}
              fontSize={15}
              color={"blue"}
              buttonContent={() => "Сохранить"}
            />
          </div>
        )}
      </div>
      {updateMessage && (
        <GlobalMessage
          updateMessage={updateMessage}
          color={mColor}
          cb={() => setUpdateMessage("")}
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
