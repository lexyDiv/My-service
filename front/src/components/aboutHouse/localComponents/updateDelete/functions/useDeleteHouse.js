import axios from "axios";
import { useDispatch } from "react-redux";

export function useDeleteHouse({
  setUpdateMessage,
  setMColor,
  deleteKey,
  houseId,
}) {
    const dispatch = useDispatch();
    return (hc) => {
        hc();
        dispatch({ type: "SET_LOADING", payload: true });
        const formData = new FormData();
        formData.append("deleteKey", deleteKey);
        formData.append("houseId", houseId);
        axios
          .put("/houses/del", formData)
          .then((res) => {
            const { message } = res.data;
            if (message === "ok") {
              dispatch({ type: "DELETE_HOUSE", payload: houseId });
              setMColor("green");
              setUpdateMessage("Дом удален!");
            } else {
              setMColor("red");
              setUpdateMessage(message);
            }
          })
          .catch((err) => {
            console.log(err.message);
          })
          .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
    }
}
