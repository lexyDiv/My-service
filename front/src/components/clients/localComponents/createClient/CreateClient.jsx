import React from "react";
import "./CreateClient.css";
import { Box, createTheme, TextField, ThemeProvider } from "@mui/material";

const CreateClient = function () {
  const theme = createTheme({
    palette: {
      background: {
        paper: "#212121",
      },
      text: {
        primary: "white",
        secondary: "white",
      },
      action: {
        active: "#001E3C",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div id="create-client">
        <TextField
          sx={{
            "& fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            width: "90%",
          }}
          id="outlined-basic-1"
          label="Имя клиента"
          variant="outlined"
        />
        <div id="create-client-basic">
            <p style={{
                color: 'orange'
            }}>* Заполните хотябы одно поле</p>
        <TextField
          sx={{
            "& fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            width: "90%",
          }}
          id="outlined-basic-phone"
          label="Телефон"
          variant="outlined"
        />
                <TextField
          sx={{
            "& fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            width: "90%",
            marginTop: '10px'
          }}
          id="outlined-basic-tele"
          label="Телеграм"
          variant="outlined"
        />
                        <TextField
          sx={{
            "& fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            width: "90%",
            marginTop: '10px'
          }}
          id="outlined-basic-email"
          label="Электронная почта"
          variant="outlined"
        />
        </div>
      </div>
   
    </ThemeProvider>
  );
};

export default CreateClient;
