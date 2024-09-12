export const isVideoChanged = function ({ main, videosArr }) {
  for (let i = 0; i < videosArr.length; i++) {
    const url =
      videosArr[i].videoState && videosArr[i].videoState.url
        ? videosArr[i].videoState.url
        : "";
    if (url !== main[videosArr[i].mainKey]) {
      return true;
    }
  }
  return false;
};
