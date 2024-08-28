import axios from "axios";
import { useDispatch } from "react-redux";

export function useSetUserFetch({ setUsers, userPers, level }) {
  const dispatch = useDispatch();
  return (hc) => {
    hc();
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("id", userPers.id);
    formData.append("level", level);
    axios
      .put("/users/set", formData)
      .then((res) => {
        console.log(res.data)
        const { message } = res.data;
        if (message === "ok") {
          setUsers((prev) =>
            prev.map((user) => {
              user.level = user.id === userPers.id ? level : user.level;
              return user;
            })
          );
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
