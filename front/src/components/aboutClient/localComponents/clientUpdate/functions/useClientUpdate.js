import { useDispatch } from "react-redux";
import { isEmailValid } from "../../../../../functions/isEmailValid";
import { isPhoneValid } from "../../../../../functions/isPhoneValid";
import axios from "axios";
import { nameValidator } from "../../../../../functions/nameValidator";

export function useClientUpdate({
  name,
  about,
  email,
  tele,
  phone,
  setInfoMessage,
  setInfoColor,
  setInfoCB,
  clientId,
  birthTime,
}) {
  const dispatch = useDispatch();
  return () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const formData = new FormData();
    formData.append("name", nameValidator(name));
    formData.append("about", about);
    formData.append("email", isEmailValid(email));
    formData.append("tele", tele.length > 1 ? tele : "");
    formData.append("phone", isPhoneValid(phone));
    formData.append("clientId", clientId);
    formData.append("birthday", birthTime);
    axios
      .put("/clients", formData)
      .then((res) => {
        const { message } = res.data;
        if (message !== "ok") {
          setInfoColor("red");
          setInfoMessage(message);
          setInfoCB(() => () => {
            setInfoColor("white");
            setInfoMessage("");
          });
        } else {
          setInfoColor("green");
          setInfoMessage("Все изменения успешно сохранены!");
          setInfoCB(() => () => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setInfoColor("red");
        setInfoMessage("Что-то пошло не так, попробуйте позже!");
        setInfoCB(() => () => {
          setInfoColor("white");
          setInfoMessage("");
        });
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  };
}
