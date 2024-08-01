export function handleChangeCommenter({
  setAnchorEl,
  setMessageText,
  setToDo,
  comment,
  dispatch,
  locationId,
  houseId,
  rentId,
}) {
  return () => {
    setAnchorEl(null);
    setMessageText(comment.value);
    setTimeout(() => {
      setToDo("");
    }, 500);
    console.log("message changed");
  };
}
