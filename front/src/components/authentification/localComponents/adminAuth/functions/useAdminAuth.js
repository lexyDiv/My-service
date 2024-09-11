import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useAdminAuthFetch({ email, pass, setMessage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("email", email);
    formData.append("corPassword", pass);
    axios
      .post("/usersmclife/log", formData)
      .then((res) => {
        const { message, user, locations } = res.data;
        if (message === "ok") {
          dispatch({ type: "GET_USER", payload: user });
          dispatch({ type: "GET_LOCATIONS", payload: locations });
          navigate('/');
        } else {
          setMessage("Кривой пароль или электронная почта!");
        }
      })
      .catch((err) => {
        setMessage("Нет связи с сервером. Попробуйте позже!");
        console.log(err);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
