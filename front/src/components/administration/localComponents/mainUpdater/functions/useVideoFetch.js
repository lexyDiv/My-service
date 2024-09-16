import axios from "axios";
import { useDispatch } from "react-redux";

export function useVideoFetch({
  deletedVideos,
  videosArr,
  setUpdateMessage,
  setMessageColor,
  setDeletedVideos,
}) {
  const dispatch = useDispatch();
  return (hc) => {
    hc();
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("deleted", JSON.stringify(deletedVideos));
    videosArr.forEach((el) => {
      const { videoState, mainKey } = el;
      if (videoState && videoState.file) {
        formData.append(mainKey, videoState.file);
      }
    });
    axios
      .put("/main", formData)
      .then((res) => {
        const { data } = res;
        console.log(data);
        if (data.message === "ok") {
          const { main } = data;
          videosArr.forEach((el) => {
            el.dataRef.current.value = "";
            el.setVideoFile(
              main[el.mainKey] ? { url: main[el.mainKey], file: null } : null
            );
          });
          setDeletedVideos([]);
          dispatch({ type: "SET_MAIN", payload: main });
        } else {
          setMessageColor("red");
          setUpdateMessage(data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
