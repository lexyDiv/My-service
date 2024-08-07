import axios from "axios";

export function getClientOnDate(setClientsArr, dispatch) {
  return async (text) => {
    dispatch({ type: "SET_LOADING", payload: true });
    axios
      .get(`/clients/ondata/${text}`)
      .then((res) => {
        //console.log(res.data.clients);
        if(res.data.message === 'ok') {
          setClientsArr(res.data.clients);
        }
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
}
