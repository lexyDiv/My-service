import React from "react";
import "./NavBtn.css";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ButtonWithQuestion from "../buttonWithQuestion/ButtonWithQuestion";

const NavBtn = function ({ text, cb, pages, name }) {
  return (
    <div id="nav-btn-box">
      <p id="nav-btn-info">{text}</p>

      <ButtonWithQuestion
        menuPunkt={pages.map((page) => ({
          page: name ? `${page} ${name}` : page,
          cb: (hc) => {
            hc();
            cb(page);
          },
          color: "black",
        }))}
        buttonContent={() => <DehazeIcon fontSize="large" />}
        hcCB={() => {}}
      />
    </div>
  );
};

export default NavBtn;
