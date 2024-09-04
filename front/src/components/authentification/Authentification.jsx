import React, { useState } from "react";
import "./Authentification.css";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { noSpaceValid } from "../../functions/noSpaceValid";
import { isEmailValid } from "../../functions/isEmailValid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AdminAuth from "./localComponents/adminAuth/AdminAuth";
import ClientAuth from "./localComponents/clientAuth/ClientAuth";

const Authentification = function () {
  const [isAdmin, setIsAdmin] = useState(false);

  const contCallBack = isAdmin ? (
    <AdminAuth isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
  ) : (
    <ClientAuth isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
  );

  return (
    <div id="authentification">
      <ScrollContainer contCallBack={contCallBack} localPage={"auth"} />
    </div>
  );
};

export default Authentification;
