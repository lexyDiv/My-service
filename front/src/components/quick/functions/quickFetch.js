import axios from "axios";

export async function quickFetch({
    newInterval,
    filterPunkt,
}) {
  const formData = new FormData();
 // formData.append("interval", JSON.stringify(newInterval));
 // formData.append("id", filterPunkt);
  axios.get(`/quick/${filterPunkt}/${JSON.stringify(newInterval)}`)
  .then(res => {
    const { message, freeHouses } = res.data;
    console.log(message, freeHouses);
  });
}