import React from "react";
import "./MyRComment.css";
import { Avatar } from "@mui/material";
import { getDateFormat } from "../../../../../Calendars/functions/getDateFormat";

const MyRComment = function ({ comment }) {
  const date = new Date(Number(comment.date));

  return (
    <div className="my-rcomment">
      <Avatar
        alt="Remy Sharp"
        src={comment.User.image}
        sx={{ marginRight: "5px" }}
      />
      <div className="my-rcomment-body">
        <p className="my-rcomment-body-title">Вы :</p>
        <p className="my-rcomment-body-text">{comment.value}</p>
        <div className="my-rcomment-body-meta">
          <p className="my-rcomment-body-meta-date">{getDateFormat(date)}</p>
          <p className="my-rcomment-body-meta-date">
            {date.toTimeString().slice(0, 8)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyRComment;
