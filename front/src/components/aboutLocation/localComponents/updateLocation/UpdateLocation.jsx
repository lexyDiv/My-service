/* eslint-disable react-hooks/exhaustive-deps */
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
import { useUpdateLocationFetch } from "./functions/useUpdateLocationFetch";
import { useDeleteLocation } from "./functions/useDeleteLocation";

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

  const [draw, setDraw] = useState(false);

  const { wHeight } = useSelector((store) => store.windowHeight);

  const containerRef = useRef(null);

  let oldFilesData = JSON.parse(location.images);

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

  const [isDeleteBaseFile, setIsDeleteBaseFile] = useState("");
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [deleteKey, setDeleteKey] = useState("");

  const rand = Math.floor(Math.random() * 10000);
  const randId = useId();

  function getDefault() {
    setName(location.name);
    setAddress(location.address);
    setDescription(location.description);
    setBaseFile(location.image ? { url: location.image, file: null } : null);
    setFiles([]);
    setOldFiles(oldFilesData);
    setIsDeleteBaseFile("");
    setDeletedFiles([]);
    setDraw(false);
  }

  useEffect(() => {
    getDefault();
  }, [location]);

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
      setIsDeleteBaseFile(location.image);
    }
    setBaseFile(null);
  }

  const onChangeCB = baseFileOnChangeUpdate({
    baseFile,
    setBaseFile,
    setIsDeleteBaseFile,
    setUpdateMessage,
    location,
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
      cb: useUpdateLocationFetch({
        name,
        address,
        description,
        deletedFiles,
        isDeleteBaseFile,
        files,
        baseFile,
        locationId: location.id,
        oldFiles,
        setUpdateMessage,
        setMColor,
      }),
      color: "black",
    },
    {
      page: "нет",
      cb: (hc) => {
        hc();
      },
      color: "black",
    },
  ];

  const menuPunktsDefault = [
    {
      page: "да",
      cb: (hc) => {
        hc();
        getDefault();
      },
      color: "black",
    },
    {
      page: "нет",
      cb: (hc) => {
        hc();
      },
      color: "black",
    },
  ];

  const menuPunktsDelete = [
    {
      page: "да",
      cb: () => {
        setDraw((prev) => !prev);
      },
      color: "red",
    },
    {
      page: "нет",
      cb: (hc) => {
        hc();
      },
      color: "green",
    },
  ];

  const menuPunktsDelete2 = [
    {
      page: (
        <input
          onChange={(e) => setDeleteKey(e.target.value)}
          type="text"
          placeholder="корпаративный ключ"
          value={deleteKey}
        />
      ),
      cb: () => {},
    },
    {
      page: "подтвердить",
      cb: useDeleteLocation({
        setUpdateMessage,
        setMColor,
        deleteKey,
        locationId: location.id,
      }),
      color: "red",
    },
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
            label="Название базы"
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
            label="Адрес базы"
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
            label="Описание базы"
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
                      setDeletedFiles,
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

        {
          //namingOK &&
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
              {namingOK && (
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
              )}
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
          )
        }
      </div>

      <div
        style={{
          margin: "15px",
        }}
      >
        <ButtonWithQuestion
          buttonContent={() => {
            return (
              <>
                УДАЛИТЬ
                <DeleteIcon />
              </>
            );
          }}
          menuPunkt={!draw ? menuPunktsDelete : menuPunktsDelete2}
          color={"blue"}
          hcCB={() => {
            setDraw(false);
            setDeleteKey("");
          }}
          fontSize={15}
        />
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
