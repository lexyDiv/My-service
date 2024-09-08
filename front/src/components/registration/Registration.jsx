import React, { useState } from "react";
import "./Registration.css";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import AdminReg from "./localComponets/adminReg/AdminReg";
import { Button } from "@mui/material";

const Registration = function () {
  const [isAdmin, setIsAdmin] = useState(false);

  const contCallBack = isAdmin ? (
    <AdminReg />
  ) : (
    <div style={{ color: "red" }}>papa loh</div>
  );

  return (
    <div id="registration">
      <ScrollContainer contCallBack={contCallBack} localPage={"reg"} />
      <Button
        onClick={() => {
          setIsAdmin((prev) => !prev);
        }}
        sx={{
          marginTop: -1,
        }}
      >
        {!isAdmin ? "регистрация администратора" : "регистрация клиента"}
      </Button>
    </div>
  );
};

export default Registration;
