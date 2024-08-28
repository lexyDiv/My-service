/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import "./Users.css";
import { usersFetch } from "./functions/usresFtch";
import { useDispatch } from "react-redux";
import UserItem from "./localComponents/UserItem";

const Users = function () {
  const localPage = "users";
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    usersFetch({ setUsers, dispatch });
  }, []);

  const constCallBack = (users.map(user => <UserItem key={user.id} user={user}/>));

  return (
    <div id="users">
      <ScrollContainer
        contCallBack={constCallBack}
        localPage={localPage}
      />
    </div>
  );
};

export default Users;
