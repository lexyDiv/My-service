export function handleCloser({
  setAnchorEl,
  setMessageText,
  comment,
  setToDo,
}) {
  return () => {
    setAnchorEl(null);
    setMessageText(comment.value);
    setTimeout(() => {
      setToDo("");
    }, 500);
  };
}
