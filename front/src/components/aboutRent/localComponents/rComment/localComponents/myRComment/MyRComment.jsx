import React from "react";
import "./MyRComment.css";
import { Avatar, Button, Menu, MenuItem,} from "@mui/material";
import { getDateFormat } from "../../../../../Calendars/functions/getDateFormat";

const MyRComment = function ({ comment }) {

  const date = new Date(Number(comment.date));
  let pages = ["редактировать", "удалить"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        меню
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {pages.map(page => <MenuItem key={page}>{page}</MenuItem>)}
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
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
