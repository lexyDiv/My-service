import { useDispatch } from "react-redux";
import { isPhoneValid } from "../../../../../functions/isPhoneValid";
import { isEmailValid } from "../../../../../functions/isEmailValid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { nameValidator } from "../../../../../functions/nameValidator";

export function useClientCreate({
  name,
  about,
  email,
  tele,
  phone,
  setInfoMessage,
  setInfoColor,
  setInfoCB,
  user,
  birthTime
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", nameValidator(name));
    formData.append("about", about);
    formData.append("email", isEmailValid(email));
    formData.append("tele", tele.length > 1 ? tele : "");
    formData.append("phone", isPhoneValid(phone));
    formData.append("user_id", user.id);
    formData.append("birthday", birthTime);
    axios
      .post("/clients", formData)
      .then((res) => {
        if (res.data.message !== "ok") {
          setInfoColor("red");
          setInfoMessage(res.data.message);
          setInfoCB(() => () => {
            setInfoColor("white");
            setInfoMessage("");
          });
        } else {
          setInfoColor("green");
          setInfoMessage("Новый клиет успешно создан!");
          setInfoCB(() => () => {
            setInfoColor("white");
            setInfoMessage("");
            navigate(`/clients/client/${res.data.clientId}`);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
