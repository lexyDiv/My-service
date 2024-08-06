import axios from "axios";

export async function getOneClient(clientId) {
  return axios
    .get(`/clients/${clientId}`)
    .then((res) => {
      if (res.data.message && res.data.message === "ok") {
        return res.data.client;
      }
    })
    .catch((err) => console.log(err.massage));
}
