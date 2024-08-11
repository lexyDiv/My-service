import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

const DialogWindow = function ({ dataArr, cb, cbItem, color }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        sx={{ color: `${color ? color : "blue"}` }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {cbItem()}
      </Button>
      <Menu
        sx={
          {
            // marginTop: "80px",
            // , marginLeft: "-40px"
          }
        }
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dataArr.map((el, i) => (
          <MenuItem
            onClick={() => {
              cb(el);
              handleClose();
             // console.log(el)
            }}
            key={i}
          >
            {el}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DialogWindow;
