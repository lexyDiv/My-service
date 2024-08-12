import axios from "axios";

export async function deleteRent(rent, dispatch) {
  dispatch({ type: "SET_LOADING", payload: true });
  axios
    .delete(`/rent/${rent.id}`)
    .then((res) => {
      if (res.data.message === "ok") {
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
}
