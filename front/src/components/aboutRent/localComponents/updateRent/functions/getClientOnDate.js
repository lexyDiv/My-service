import axios from "axios";
import { isEmailValid } from "../../../../../functions/isEmailValid";
import { isPhoneValid } from "../../../../../functions/isPhoneValid";

export function getClientOnDate(setClientsArr, dispatch, setGetClientMessage) {
  return async (text) => {
    let typeData = "";
    const isE = isEmailValid(text);
    const isP = isPhoneValid(text);
    if (text[0] === "@" && text.length >= 2) {
      typeData = "tele";
    } else if (isE) {
      typeData = "email";
      text = isE;
    } else if (isP) {
      typeData = "phone";
      text = isP;
    } else {
      setGetClientMessage("Введите полные данные в поле запроса!");
      setClientsArr([]);
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    axios
      .get(`/clients/ondata/${text}/${typeData}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "ok") {
          setClientsArr(res.data.clients);
          if (!res.data.clients.length) {
            setGetClientMessage(
              "По вашему запросу ничего не нашлось. Введите телефон, электронную почту или телеграм клиента полностью."
            );
          }
        }
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
}
