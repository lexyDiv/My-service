import axios from "axios";

export function handleDeleter({
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
  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("comment_id", comment.id);
    axios
      .delete(`/rcomment/${comment.id}`)
      .then((res) => {
        if (res.data.message === "ok") {
          dispatch({
            type: "DELETE_RCOMMENT",
            payload: {
              locationId: Number(locationId),
              houseId: Number(houseId),
              rentId: Number(rentId),
              commentId: comment.id,
            },
          });
        }
        setAnchorEl(null);
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        console.log(err.message);
        setAnchorEl(null);
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
}
