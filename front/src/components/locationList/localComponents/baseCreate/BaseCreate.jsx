import React, { useState } from "react";
import './BaseCreate.css';
import { createTheme, TextField, ThemeProvider } from "@mui/material";


const BaseCreate = function() {

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


      const rand  = Math.floor(Math.random() * 10000);

    return (
        <ThemeProvider theme={theme}>
        <div id="base-create">
                   <div className="create-client-basic-item">
         <TextField
         value={name}
         // onChange={(e) => setName(e.target.value)}
          autoComplete="false"
        //   onFocus={() => {
        //     phone.length === 2 && setPhone("");
        //     tele.length === 1 && setTele("");
        //   }}
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
                backgroundColor: 'green',
              }}
              className="create-client-basic-item-ok"
            />
         </div>
        </div>
        </ThemeProvider>
    )
}

export default BaseCreate;