import React, { useEffect, useId, useRef, useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import "./UpdateLocation.css";
import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import AddFile from "../../../addFile/AddFile";
import TitleImage from "../../../titleImage/TitleImage";
import TitleFilesContainer from "../../../titleFilesContainer/TitleFilesContainer";
import ButtonWithQuestion from "../../../buttonWithQuestion/ButtonWithQuestion";
import GlobalMessage from "../../../globalMessage/GlobalMessage";
import { useSelector } from "react-redux";
import { nameValidatorStart } from "../../../../functions/nameValidator";
import { prevewFilesDelete } from "../../../../functions/prevewFilesDelete";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import { baseFileOnChangeUpdate } from "./functions/baseFileOnChangeUpdate";
import { prevewOldFilesDelete } from "../../../../functions/prevewOldFilesDelete";
import { filesOnChange } from "../../../../functions/filesOnChange";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const UpdateLocation = function ({ location }) {
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

  const containerRef = useRef(null);

  const oldFilesData = JSON.parse(location.images);

  const [name, setName] = useState(location.name);
  const [address, setAddress] = useState(location.address);
  const [description, setDescription] = useState(location.description);
  const [baseFile, setBaseFile] = useState(
    location.image ? { url: location.image, file: null } : null
  );

  const [files, setFiles] = useState([]);
  const [oldFiles, setOldFiles] = useState(oldFilesData);
  const [updateMessage, setUpdateMessage] = useState("");
  const [mColor, setMColor] = useState("red");
  const fileRef = useRef(null);
  const filesRef = useRef(null);

  const [isDeleteBaseFile, setIsDeleteBaseFile] = useState(false);
  const [deletedFiles, setDeletedFiles] = useState([]);

  const rand = Math.floor(Math.random() * 10000);
  const randId = useId();

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

  function BaseFileDeleteCB() {
    if (!baseFile.file) {
      setIsDeleteBaseFile(true);
    }
    setBaseFile(null);
  }

  const onChangeCB = baseFileOnChangeUpdate({
    baseFile,
    setBaseFile,
    setIsDeleteBaseFile,
    setUpdateMessage,
  });

  const onChangeFilesCB = filesOnChange({
    setFiles,
    setUpdateMessage,
    files,
  });
  // { url:  URL.createObjectURL(file), file}

  let [containerSize, setContainerSize] = useState(
    containerRef.current ? containerRef.current.clientWidth : 0
  );

  useEffect(() => {
    setContainerSize(
      containerRef.current ? containerRef.current.clientWidth : 0
    );
  }, [wHeight]);

  const itemSize = 135;

  const menuPunkts = [
    {
      page: "да",
      cb: () => {},
      color: "black",
    },
    { page: "нет", cb: () => {}, color: "black" },
  ];

  const menuPunktsDefault = [
    {
      page: "да",
      cb: () => {
        window.location.reload();
      },
      color: "black",
    },
    { page: "нет", cb: () => {}, color: "black" },
  ];

  ///////////// logic
  const namingOK = name && address && description;

  const isBaseFileChange =
    (!location.image && baseFile) ||
    (location.image && !baseFile) ||
    (location.image && location.image !== baseFile.url);

  const isNameChange = name !== location.name;
  const isAddressChange = address !== location.address;
  const isDescriptionChange = description !== location.description;
  const isFilesChange = files.length || false;
  const isOldFilesChange = oldFilesData.length !== oldFiles.length;

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

        {oldFiles.length ? (
          <>
            <div
              style={{
                marginTop: "15px",
              }}
              className="rent-client-info-hr"
            />

            <div
              style={{
                marginTop: "-15px",
              }}
            >
              <TitleFilesContainer
                containerRef={containerRef}
                containerSize={containerSize}
                itemSize={itemSize}
              >
                {oldFiles.map((file) => (
                  <TitleImage
                    key={file + randId}
                    image={file}
                    itemSize={itemSize}
                    deleteCB={prevewOldFilesDelete({
                      oldFile: file,
                      setOldFiles,
                    })}
                  />
                ))}
              </TitleFilesContainer>
            </div>
          </>
        ) : (
          false
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

        {namingOK &&
          (isNameChange ||
            isBaseFileChange ||
            isAddressChange ||
            isDescriptionChange ||
            isFilesChange ||
            isOldFilesChange) && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                margin: "15px",
              }}
            >
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
                fontSize={15}
              />
              <ButtonWithQuestion
                buttonContent={() => {
                  return (
                    <>
                      отменить
                      <DeleteIcon />
                    </>
                  );
                }}
                menuPunkt={menuPunktsDefault}
                color={"blue"}
                fontSize={15}
              />
            </div>
          )}
      </div>
      {updateMessage && (
        <GlobalMessage
          updateMessage={updateMessage}
          cb={() => setUpdateMessage("")}
          color={mColor}
        />
      )}
    </ThemeProvider>
  );
};

export default UpdateLocation;
