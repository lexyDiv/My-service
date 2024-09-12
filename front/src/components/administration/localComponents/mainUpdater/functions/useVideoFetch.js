import axios from "axios";
import { useDispatch } from "react-redux";

export function useVideoFetch({ deletedVideos, videosArr, main }) {
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
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
