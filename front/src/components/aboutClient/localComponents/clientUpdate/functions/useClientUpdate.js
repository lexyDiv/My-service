import { useDispatch } from "react-redux";
import { isEmailValid } from "../../../../../functions/isEmailValid";
import { isPhoneValid } from "../../../../../functions/isPhoneValid";
import axios from "axios";

export function useClientUpdate({
  name,
  about,
  email,
  tele,
  phone,
  setInfoMessage,
  setInfoColor,
  setInfoCB,
}) {
  const dispatch = useDispatch();
  return () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("email", isEmailValid(email));
    formData.append("tele", tele.length > 1 ? tele : "");
    formData.append("phone", isPhoneValid(phone));
    axios
      .put("/clients", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
