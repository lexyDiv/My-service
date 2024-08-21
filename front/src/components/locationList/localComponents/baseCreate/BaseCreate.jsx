/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./BaseCreate.css";
import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { nameValidatorStart } from "../../../../functions/nameValidator";
import AddFile from "../../../addFile/AddFile";
import { baseFileOnChange } from "./functions/baseFileOnChange";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { baseCreateGlobalMessage } from "./functions/baseCreateGlobalMessage";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import TitleImage from "../../../titleImage/TitleImage";
import { filesOnChange } from "./functions/filesOnChange";
import TitleFilesContainer from "../../../titleFilesContainer/TitleFilesContainer";
import { useSelector } from "react-redux";

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

  const { wHeight } = useSelector((store) => store.windowHeight);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [baseFile, setBaseFile] = useState(null);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [updateMessage, setUpdateMessage] = useState("");
  const fileRef = useRef(null);
  const filesRef = useRef(null);
  

  const containerRef = useRef(null);

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

  const titleFilesCB = () => {
    return (
      <Button
        // onClick={goToClient}
        sx={{
          marginTop: 2,
        }}
        variant="outlined"
      >
        Добавить фотографии базы
        <CropOriginalIcon />
      </Button>
    );
  };

  const BaseFileDeleteCB = () => {
    setBaseFile(null);
    fileRef.current.value = "";
  };
  /////////////////////////

  const rand = Math.floor(Math.random() * 10000);

  const onChangeCB = baseFileOnChange({
    setBaseFile,
    setUpdateMessage,
  });

  const onChangeFilesCB = filesOnChange({
    setFiles,
    setImages,
    setUpdateMessage,
    images,
  });

  const globalMessageCB = baseCreateGlobalMessage({ setUpdateMessage });
  let [containerSize, setContainerSize] = useState(
    containerRef.current ? containerRef.current.clientWidth : 0
  );

  useEffect(() => {
    setContainerSize(
      containerRef.current ? containerRef.current.clientWidth : 0
    );
  }, [wHeight]);

  const itemSize = 135;

  return (
    <ThemeProvider theme={theme}>
      <div
        // ref={containerRef}
        id="base-create"
      >
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

        {baseFile && (
          <div
            style={{
              marginTop: "15px",
            }}
          >
            <TitleImage image={baseFile.url} width={270} deleteCB={BaseFileDeleteCB} />
          </div>
        )}

        <AddFile
          onChangeCB={onChangeFilesCB}
          fileRef={filesRef}
          titleCB={titleFilesCB}
        />

        <TitleFilesContainer
          containerRef={containerRef}
          containerSize={containerSize}
          itemSize={itemSize}
        >
          {images.map((image) => (
            <TitleImage
              key={image.image}
              image={image.image}
              itemSize={itemSize}
              // koof={koof}
              // deleteCB={BaseFileDeleteCB}
            />
          ))}
        </TitleFilesContainer>

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
