import axios from "axios";

export function handleChangeCommenter({
  setAnchorEl,
  setMessageText,
  setToDo,
  comment,
  dispatch,
  locationId,
  houseId,
  rentId,
  messageText,
}) {
  return () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("comment_id", comment.id);
    formData.append("messageText", messageText);
    axios
      .put("/rcomment", formData)
      .then((res) => {
        if (res.data.message === "ok") {
          console.log(res.data.rComment);
          dispatch({
            type: "CHANGE_RCOMMENT",
            payload: {
              locationId: Number(locationId),
              houseId: Number(houseId),
              rentId: Number(rentId),
              comment: res.data.rComment,
            },
          });
        }
        dispatch({ type: "SET_LOADING", payload: false });
        setAnchorEl(null);
        setTimeout(() => {
          setToDo("");
        }, 500);
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({ type: "SET_LOADING", payload: false });
      });
    // setAnchorEl(null);
    // setMessageText(comment.value);
    // setTimeout(() => {
    //   setToDo("");
    // }, 500);
    console.log("message changed");
  };
}
