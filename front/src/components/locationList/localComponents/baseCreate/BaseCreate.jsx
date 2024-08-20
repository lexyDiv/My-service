import React, { useRef, useState } from "react";
import "./BaseCreate.css";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import {
  nameValidator,
  nameValidatorCenter,
  nameValidatorEnd,
  nameValidatorStart,
} from "../../../../functions/nameValidator";
import AddFile from "../../../addFile/AddFile";

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

  const basePhotoRef = useRef();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [basePhoto, setBasePhoto] = useState(null);

  const rand = Math.floor(Math.random() * 10000);

  const handleChangeBasePhoto = (e) => {
    //  setProgess(0)
    const file = e.target.files[0]; // доступ к файлу
    console.log(file);
    setBasePhoto(file); // сохранение файла
  };

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

      <AddFile/>

        {/* <input
          type="file"
          ref={basePhotoRef}
          onChange={handleChangeBasePhoto}
        /> */}

        
      </div>
    </ThemeProvider>
  );
};

export default BaseCreate;
