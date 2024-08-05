import React, { useState } from "react";
import "./NavBtn.css";
import { Button, Menu, MenuItem } from "@mui/material";

const NavBtn = function ({ text, cb, pages, name }) {
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
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div
          className="nav-btn"
          // onClick={cb}
        >
          <div className="nav-btn-data">{text}</div>
          <img className="nav-btn-vector" src="/vector.png" alt="img" />
        </div>
      </Button>
      <Menu
        sx={{
          marginTop: "80px",
          // , marginLeft: "-40px"
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {pages.map((page, i) => {
          const text = name ? `${page} ${name}` : page;
          return (
            <MenuItem
              page={page}
              onClick={() => {
                cb(page);
                handleClose();
              }}
              key={i}
            >
              <p className="nav-btn-text">{text}</p>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default NavBtn;
