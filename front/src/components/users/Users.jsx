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
    setTimeout(() => {
      usersFetch({ setUsers, dispatch });
    }, 1000);
  }, []);

  const constCallBack = users.map((user) => (
    <UserItem key={user.id} userPers={user} setUsers={setUsers} />
  ));

  return (
    <div id="users">
      <ScrollContainer contCallBack={constCallBack} localPage={localPage} />
    </div>
  );
};

export default Users;
