import axios from "axios";

export const getClientsFetch = async function (dispatch, pagList) {
  dispatch({ type: "SET_LOADING", payload: true });
  axios
    .get(`/clients/pagList/${pagList}`)
    .then((res) => {
      if (res.data.message === "ok") {
        dispatch({
          type: "GET_CLIENTS",
          payload: {
            allClientsLength: res.data.allClientsLength,
            clients: res.data.clients,
          },
        });
      }
      dispatch({ type: "SET_LOADING", payload: false });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: "SET_LOADING", payload: false });
    });
};
