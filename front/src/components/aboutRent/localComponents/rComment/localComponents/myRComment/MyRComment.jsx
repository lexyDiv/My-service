import React, { useState } from "react";
import "./MyRComment.css";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { getDateFormat } from "../../../../../Calendars/functions/getDateFormat";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { handleDeleter } from "./functions/handleDeleter";
import { handleCloser } from "./functions/handleCloser";
import { handleNoDeleter } from "./functions/handleNoDeleter";
import { handleChanger } from "./functions/handleChanger";
import { handleChangeCommenter } from "./functions/handleChangeCommenter";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const MyRComment = function ({ comment }) {
  const date = new Date(Number(comment.date));
  const { locationId, houseId, rentId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [toDo, setToDo] = useState("");
  const [messageText, setMessageText] = useState(comment.value);
  const dispatch = useDispatch();

  const handleClose = handleCloser({
    setAnchorEl,
    setMessageText,
    setToDo,
    comment,
  });
  const handleDelete = handleDeleter({
    setAnchorEl,
    setMessageText,
    setToDo,
    comment,
    dispatch,
    locationId,
    houseId,
    rentId,
    messageText,
  });
  const handleNoDelete = handleNoDeleter({ setToDo });
  const handleChange = handleChanger({ setToDo });
  const handleChangeComment = handleChangeCommenter({
    setAnchorEl,
    setMessageText,
    setToDo,
    comment,
    dispatch,
    locationId,
    houseId,
    rentId,
    messageText,
  });

  return (
    <div className="my-rcomment">
      <Avatar
        alt="Remy Sharp"
        src={comment.User.image}
        sx={{ marginRight: "5px" }}
      />
      <div className="my-rcomment-body">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <p className="my-rcomment-body-title">Вы :</p>
        <div
            style={{
              // backgroundColor: 'blue',
              display: "flex",
              justifyContent: "start",
              minWidth: "50px",
            }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <DehazeIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {!toDo && (
                <div>
                  <MenuItem onClick={handleChange}>редактировать</MenuItem>
                  <MenuItem sx={{ color: "red" }} onClick={handleChange}>
                    удалить
                  </MenuItem>
                </div>
              )}
              {toDo === "удалить" && (
                <div>
                  <MenuItem sx={{ color: "red" }} onClick={handleDelete}>
                    да
                  </MenuItem>
                  <MenuItem onClick={handleNoDelete}>нет</MenuItem>
                </div>
              )}
              {toDo === "редактировать" && (
                <div>
                  <textarea
                    style={{
                      margin: "5px",
                      minWidth: "250px",
                      borderRadius: "10px",
                      padding: "3px",
                    }}
                    value={messageText}
                    id="r-message-creator-imput-text"
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  {messageText !== comment.value && messageText && (
                    <MenuItem onClick={handleChangeComment}>изменить</MenuItem>
                  )}
                </div>
              )}
            </Menu>
          </div>
        </div>
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
