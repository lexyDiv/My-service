export function handleDeleter(setAnchorEl) {
  return () => {
    console.log("comment deleted");
    setAnchorEl(null);
  };
}
