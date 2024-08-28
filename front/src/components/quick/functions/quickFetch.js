import axios from "axios";

export async function quickFetch({
  newInterval,
  filterPunkt,
  setHouses,
  setFilterMessage,
  dispatch,
}) {
  setFilterMessage("");
  dispatch({ type: "SET_LOADING", payload: true });
  axios
    .get(`/quick/${filterPunkt}/${JSON.stringify(newInterval)}`)
    .then((res) => {
      const { message, freeHouses } = res.data;
      if (message === "ok") {
        setHouses(freeHouses);
        if (!freeHouses.length) {
          setFilterMessage("По вашему запросу ничего не нашлось!");
        }
      }
    })
    .catch((err) => console.log(err.message))
    .finally(() => {
      dispatch({ type: "SET_LOADING", payload: false });
    });
}
