import React from "react";
import "./UserItem.css";

const UserItem = function ({ user }) {
  return (
    <div className="user-item">
      <div className="user-item-image-box">
        <img
          className="user-item-image"
          src={user.image || "/img.png"}
          alt="img"
        />
      </div>
      <div className="user-item-info">
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default UserItem;
