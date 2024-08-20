import React, { useRef, useState } from "react";
import "./BaseCreate.css";
import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { nameValidatorStart } from "../../../../functions/nameValidator";
import AddFile from "../../../addFile/AddFile";
import { baseFileOnChange } from "./functions/baseFileOnChange";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { baseCreateGlobalMessage } from "./functions/baseCreateGlobalMessage";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import DeleteIcon from "@mui/icons-material/Delete";
import TitleImage from "../../../titleImage/TitleImage";

const BaseCreate = function () {
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

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [baseFile, setBaseFile] = useState(null);

  ////////////////////////  before fetch
  const [updateMessage, setUpdateMessage] = useState("");
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const titleCB = () => {
    return (
      <Button
        // onClick={goToClient}
        sx={{
          marginTop: 2,
        }}
        variant="outlined"
      >
        Добавить титульное фото
        <CropOriginalIcon />
      </Button>
    );
  };

  const BaseFileDeleteCB = () => {
    setImage(null);
    setBaseFile(null);
    fileRef.current.value = "";
  };
  /////////////////////////

  const rand = Math.floor(Math.random() * 10000);

  const onChangeCB = baseFileOnChange({
    setBaseFile,
    setImage,
    setUpdateMessage,
  });
  const globalMessageCB = baseCreateGlobalMessage({ setUpdateMessage });

  return (
    <ThemeProvider theme={theme}>
      <div id="base-create">
        <div className="create-client-basic-item">
          <TextField
            value={name}
            onChange={(e) => setName(nameValidatorStart(e.target.value))}
            autoComplete="false"
            sx={{
              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(255,255,255)",
              },
              width: "90%",
            }}
            id={"outlined-basic-1" + rand}
            label="Название новой базы"
            variant="outlined"
          />
          <div
            style={{
              backgroundColor: "green",
            }}
            className="create-client-basic-item-ok"
          />
        </div>
        <div className="create-client-basic-item">
          <TextField
            value={address}
            onChange={(e) => setAddress(nameValidatorStart(e.target.value))}
            autoComplete="false"
            sx={{
              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(255,255,255)",
              },
              width: "90%",
            }}
            id={"outlined-basic-1" + rand}
            label="Адрес новой базы"
            variant="outlined"
          />
          <div
            style={{
              backgroundColor: "green",
            }}
            className="create-client-basic-item-ok"
          />
        </div>
        <div className="create-client-basic-item">
          <TextField
            value={description}
            onChange={(e) => setDescription(nameValidatorStart(e.target.value))}
            autoComplete="false"
            multiline
            sx={{
              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(255,255,255)",
              },
              width: "90%",
            }}
            id={"outlined-basic-1" + rand}
            label="Описание новой базы"
            variant="outlined"
          />
          <div
            style={{
              backgroundColor: "green",
            }}
            className="create-client-basic-item-ok"
          />
        </div>

        <AddFile onChangeCB={onChangeCB} fileRef={fileRef} titleCB={titleCB} />

        {image && (
          <TitleImage image={image} width={150} deleteCB={BaseFileDeleteCB} />
        )}
        {updateMessage && (
          <GlobalMessage
            updateMessage={updateMessage}
            cb={globalMessageCB}
            color={"red"}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default BaseCreate;
