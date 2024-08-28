import React from "react";
import ScrollContainer from "../scrollContainer/ScrollContainer";

const Users = function () {
  const localPage = "users";

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <ScrollContainer
        //contCallBack={constCallBack}
        localPage={localPage}
      />
    </div>
  );
};

export default Users;
