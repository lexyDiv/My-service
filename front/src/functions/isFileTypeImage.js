export function isFileTypeImage(fileName) {
  const lastPointIndex = fileName.split("").findLastIndex((el) => el === ".");
  if (lastPointIndex === -1) {
    return false;
  }
  const type = fileName.slice(lastPointIndex + 1);
  if (type === "png" || type === "jpg" || type === "jpeg") {
    return true;
  }
  return false;
}

export function isFileTypeVideo(fileName) {
  const lastPointIndex = fileName.split("").findLastIndex((el) => el === ".");
  if (lastPointIndex === -1) {
    return false;
  }
  const type = fileName.slice(lastPointIndex + 1);
  if (type === "mp4" || type === "3gp") {
    return true;
  }
  return false;
}
