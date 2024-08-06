import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import "./Find.css";
import DialogWindow from "../DialogWindow/DialogWindow";

const Find = function ({ cb, dataArr }) {
  const [inputText, setInputText] = useState("");
  const [punkt, setPunkt] = useState(dataArr[0]);


  const sx = {
    scale: "calc(1.7)",
    width: 50,
    cursor: "pointer",
  };

  const cbItem = () => {
    return <AutorenewIcon sx={sx} />;
  };

  const typeCB = (punkt) => {
    setPunkt(punkt);
  };


  return (
    <div className="find">
      <div className="find-box">
        <DialogWindow
          cbItem={cbItem}
          dataArr={dataArr.filter((el) => el !== punkt)}
          cb={typeCB}
        />
        <input
          type="text"
          className="find-input"
          placeholder={punkt}
          onChange={(e) => setInputText(e.target.value)}
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
