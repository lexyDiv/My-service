import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import "./Find.css";
import DialogWindow from "../DialogWindow/DialogWindow";
import { useDispatch } from "react-redux";

const Find = function ({ cb, timeCB, inputText, fildClickCB }) {

  const sx = {
    scale: "calc(1.7)",
    width: 50,
    cursor: "pointer",
  };

  return (
    <div className="find">
      <div className="find-box">
        <input
          value={inputText}
          type="text"
          className="find-input"
          placeholder="телефон, почта или телега"
          onChange={(e) => timeCB(e)}
          onClick={fildClickCB}
        />
        <SearchIcon
          sx={sx}
          onClick={() => cb(inputText)}
        />
      </div>
    </div>
  );
};

export default Find;
