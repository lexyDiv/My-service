import React from "react";
import { useSelector } from "react-redux";
import "./RComment.css";
import MyRComment from "./localComponents/myRComment/MyRComment";
import AlienRComment from "./localComponents/alienRComment/AlienRComment";

const RComment = function ({ comment }) {
  const { user } = useSelector((store) => store.user);

  return (
    <div
      className="rcomment"
      style={{
        color: "white",
        justifyContent: `${user.id === comment.User.id ? "start" : "end"}`,
      }}
    >
      {user.id === comment.User.id ? (
        <MyRComment comment={comment} />
      ) : (
        <AlienRComment comment={comment} />
      )}
    </div>
  );
};

export default RComment;
