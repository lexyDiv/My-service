import axios from "axios";
import { useDispatch } from "react-redux";

export const useGetClientRents = (client, setClientRents) => {
    const dispatch = useDispatch();
  return () => {
    dispatch({ type: "SET_LOADING", payload: true });
    axios
      .get(`/clients/client/${client.id}/rents`)
      .then((res) => {
        const { message, rents } = res.data;
        if (message === "ok") {
          setClientRents(rents);
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};
