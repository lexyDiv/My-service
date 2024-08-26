import axios from "axios";

export async function deleteRent(rent, dispatch, setRent) {
  dispatch({ type: "SET_LOADING", payload: true });
  if (rent && rent.id) {
    axios
      .delete(`/rent/${rent.id}`)
      .then((res) => {
        if (res.data.message === "ok") {
          setRent(null);
          dispatch({
            type: "DELETE_RENT",
            payload: {
              rentId: rent.id,
              locationId: rent.location_id,
              houseId: rent.house_id,
            },
          });
        }
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        dispatch({ type: "SET_LOADING", payload: false });
        console.log(err.message);
      });
  } else {
    dispatch({ type: "SET_LOADING", payload: false });
  }
}
