import axios from "axios";
import { useDispatch } from "react-redux";

export function useDeleteLocation({
  setUpdateMessage,
  setMColor,
  deleteKey,
  locationId,
}) {
  const dispatch = useDispatch();
  return (hc) => {
    hc();
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("deleteKey", deleteKey);
    formData.append("locationId", locationId);
    axios
      .put("/locations/del", formData)
      .then((res) => {
        const { message } = res.data;
        if (message === "ok") {
          dispatch({ type: "DELETE_LOCATION", payload: locationId });
          setMColor("green");
          setUpdateMessage("База удалена!");
        } else {
          setMColor("red");
          setUpdateMessage(message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
