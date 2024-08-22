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
import { prevewFilesDelete } from "../../../../functions/prevewFilesDelete";
import ButtonWithQuestion from "../../../buttonWithQuestion/ButtonWithQuestion";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useCreateBaseFetch } from "./functions/useCreateBaseFetch";
import FileUpload from "../../../FileUpload";

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
  const [updateMessage, setUpdateMessage] = useState("");
  const [mColor, setMColor] = useState("red");
  const fileRef = useRef(null);
  const filesRef = useRef(null);

  const containerRef = useRef(null);

  const titleCB = () => {
    return (
      <Button
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

  const rand = Math.floor(Math.random() * 10000);

  const onChangeCB = baseFileOnChange({
    setBaseFile,
    setUpdateMessage,
  });

  const onChangeFilesCB = filesOnChange({
    setFiles,
    setUpdateMessage,
    files,
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

  const createBaseFetch = useCreateBaseFetch({
    name,
    description,
    address,
    setUpdateMessage,
    setName,
    setDescription,
    setAddress,
    baseFile,
    setBaseFile,
    files,
    setFiles,
    setMColor,
  });

  const menuPunkts = [
    {
      page: "yes",
      cb: createBaseFetch,
      color: "black",
    },
    { page: "no", cb: () => {}, color: "black" },
  ];

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
              backgroundColor: `${name ? "green" : "red"}`,
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
              backgroundColor: `${address ? "green" : "red"}`,
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
              backgroundColor: `${description ? "green" : "red"}`,
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
            <TitleImage
              image={baseFile.url}
              width={270}
              deleteCB={BaseFileDeleteCB}
            />
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
          {files.map((file) => (
            <TitleImage
              key={file.url}
              image={file.url}
              itemSize={itemSize}
              deleteCB={prevewFilesDelete({ file, setFiles })}
            />
          ))}
        </TitleFilesContainer>

        {name && address && description && (
          <ButtonWithQuestion
            buttonContent={() => {
              return (
                <>
                  сохранить
                  <SaveAsIcon />
                </>
              );
            }}
            menuPunkt={menuPunkts}
            color={"blue"}
            fontSize={20}
          />
        )}
      </div>
      {updateMessage && (
        <GlobalMessage
          updateMessage={updateMessage}
          cb={globalMessageCB}
          color={mColor}
        />
      )}
      {/* <FileUpload/> */}
    </ThemeProvider>
  );
};

export default BaseCreate;
