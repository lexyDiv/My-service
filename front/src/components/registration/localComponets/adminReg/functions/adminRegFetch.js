import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isPhoneValid } from "../../../../../functions/isPhoneValid";
import axios from "axios";

export function useAdminRegFetch({
  name,
  tele,
  phone,
  email,
  baseFile,
  setUpdateMessage,
  oldPass,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return async () => {
    if (tele.length <= 1) {
      tele = "";
    }
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", isPhoneValid(phone));
    formData.append("email", email);
    formData.append("tele", tele);
    formData.append("pass", oldPass);
    baseFile && formData.append("baseFile", baseFile.file);
    axios
      .post("/usersmclife/reg", formData)
      .then((res) => {
        const { message, user, locations } = res.data;
        if (message === "ok") {
          navigate("/");
          dispatch({ type: "GET_USER", payload: user });
          dispatch({ type: "GET_LOCATIONS", payload: locations });
        } else {
          message === "bad"
            ? setUpdateMessage("проблемы на сервере!")
            : setUpdateMessage(message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
