import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export function useAdminLogOut({ setUpdateMessage }) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    if (user) {
      const formData = new FormData();
      formData.append("id");
      axios
        .put("/users/logout", formData)
        .then((res) => {
          const { message } = res.data;
          if (message === "ok") {
            window.location.reload();
          } else {
            setUpdateMessage(message);
          }
        })
        .catch((err) => {
          setUpdateMessage("Сервер временно не доступен!");
          console.log(err.message);
        })
        .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
}
