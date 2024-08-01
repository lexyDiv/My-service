import React, { useState } from "react";
import "./MyRComment.css";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { getDateFormat } from "../../../../../Calendars/functions/getDateFormat";
import DehazeIcon from "@mui/icons-material/Dehaze";

const MyRComment = function ({ comment }) {
  const date = new Date(Number(comment.date));
  //let pages = ["редактировать", "удалить"];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [toDo, setToDo] = useState("");

  const handleClose = (e) => {
   // console.log(e.target.innerText);
   // setToDo(e.target.innerText);
    setAnchorEl(null); // closing
    setTimeout(() => {
      setToDo("");
    }, 500);
  };

  const handleDelete = () => {
    console.log("comment deleted");
    setAnchorEl(null)
  }

  const handleNoDelete = () => {
    console.log("comment no deleted");
   // setAnchorEl(null)
   setToDo(prev => "");
  }

  const handleChange = (e) => {
    setToDo(e.target.innerText);
  }

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
          <div style={{
           // backgroundColor: 'blue', 
            display: 'flex', 
            justifyContent: 'start',
            
            minWidth: '50px'
            }}>
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
          //  sx={{marginRight: '-20px'}}
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
              {toDo === 'удалить' && 
              <div>
              <MenuItem sx={{ color: 'red' }} onClick={handleDelete}>да</MenuItem>
              <MenuItem onClick={handleNoDelete}>нет</MenuItem>
              </div>}

            </Menu>
          </div>
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
