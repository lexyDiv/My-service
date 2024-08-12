import axios from "axios";

export function getClientOnDate(setClientsArr, dispatch, setGetClientMessage) {
  return async (text) => {
    if(!text) {
      setGetClientMessage("Введите данные в поле запроса!");
      return;
    }
    dispatch({ type: "SET_LOADING", payload: true });
    axios
      .get(`/clients/ondata/${text}`)
      .then((res) => {
        //console.log(res.data.clients);
        if(res.data.message === 'ok') {
          setClientsArr(res.data.clients);
          if(!res.data.clients.length) {
            setGetClientMessage("По вашему запросу ничего не нашлось. Введите телефон, электронную почту или телеграм клиента полностью.");
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
