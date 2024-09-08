import {
  Button,
  createTheme,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import React, { useId, useState } from "react";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    //   success: {
    //     dark: '#009688',
    //   },
  },
});

const ButtonWithQuestion = function ({
  menuPunkt,
  color,
  fontSize,
  buttonContent,
  hcCB,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    hcCB &&
      setTimeout(() => {
        hcCB();
      }, 100);
  };

  const randId = useId();

  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={{
          color: `${color}`,
          fontSize: `${fontSize}px`,
        }}
        id={"basic-button" + randId}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {buttonContent()}
      </Button>
      <Menu
        id={"basic-menu" + randId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuPunkt.map((punkt) => {
          return (
            <MenuItem
              sx={{
                minWidth: "100px",
                justifyContent: "center",
                alignItems: "center",
                color: `${punkt.color ? punkt.color : "black"}`,
              }}
              onClick={() => {
                punkt.cb(handleClose);
              }}
              key={punkt.page}
            >
              <p className="nav-btn-text">{punkt.page}</p>
            </MenuItem>
          );
        })}
      </Menu>
    </ThemeProvider>
  );
};

export default ButtonWithQuestion;
