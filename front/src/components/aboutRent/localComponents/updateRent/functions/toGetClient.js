import { getOneClient } from "../../../../../functions/getOneClient";

export const toGetClient = ({ dispatch, rent, setClient, clientRef }) => {
  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const clientData = await getOneClient(rent.client_id);
    if (clientData) {
      setClient(clientData);
      if (clientRef) {
        clientRef.current = clientData;
      }
      rent.Client = clientData;
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
