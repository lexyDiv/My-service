import React from "react";
import "./AlienRComment.css";
import { Avatar } from "@mui/material";
import { getDateFormat } from "../../../../../Calendars/functions/getDateFormat";

const AlienRComment = function ({ comment }) {
  const date = new Date(Number(comment.date));
  return (
    <div className="alien-rcomment">
      <Avatar
        alt="Realien Sharp"
        src={comment.User.image}
        sx={{ marginRight: "5px" }}
      />
      <div className="alien-rcomment-body">
        <p className="alien-rcomment-body-title">{comment.User.name}</p>
        <p className="alien-rcomment-body-text">{comment.value}</p>
        <div className="alien-rcomment-body-meta">
          <p className="alien-rcomment-body-meta-date">{getDateFormat(date)}</p>
          <p className="alien-rcomment-body-meta-date">
            {date.toTimeString().slice(0, 8)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlienRComment;
