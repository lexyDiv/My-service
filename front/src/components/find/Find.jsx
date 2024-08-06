import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import "./Find.css";
import DialogWindow from "../DialogWindow/DialogWindow";

const Find = function ({ cb }) {
  const [inputText, setInputText] = useState("");

  return (
    <div className="find">
      <div className="find-box">
        {/* <DialogWindow>
        <AutorenewIcon/>
        </DialogWindow> */}
        <input
          type="text"
          className="find-input"
          placeholder="fuck"
          onChange={(e) => setInputText(e.target.value)}
        />
        <SearchIcon
          sx={{
            scale: "calc(1.7)",
            width: 50,
            cursor: "pointer",
          }}
          onClick={() => cb(inputText)}
        />
      </div>
    </div>
  );
};

export default Find;
