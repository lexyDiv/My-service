import React, { useState } from "react";
import "./Authentification.css";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import { Button } from "@mui/material";
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
      <Button
        sx={{
          marginTop: "-5px",
        }}
        onClick={() => setIsAdmin((prev) => !prev)}
        variant="text"
      >
        {isAdmin ? "я клиент" : "я администратор"}
      </Button>
    </div>
  );
};

export default Authentification;
